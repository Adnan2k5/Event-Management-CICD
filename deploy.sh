#!/bin/bash

# Event Management System - Deployment Script
# This script deploys the application to Kubernetes using Helm

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

NAMESPACE=${1:-event-management}
RELEASE_NAME="event-management"

echo -e "${GREEN}=== Event Management System - Kubernetes Deployment ===${NC}"
echo -e "Namespace: ${YELLOW}$NAMESPACE${NC}"
echo -e "Release Name: ${YELLOW}$RELEASE_NAME${NC}"
echo ""

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed or not in PATH${NC}"
    exit 1
fi

# Check if helm is available
if ! command -v helm &> /dev/null; then
    echo -e "${RED}Error: helm is not installed or not in PATH${NC}"
    exit 1
fi

# Check cluster connectivity
echo -e "${GREEN}Step 1: Checking Kubernetes cluster connectivity${NC}"
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: Cannot connect to Kubernetes cluster${NC}"
    echo "Please ensure your kubectl is configured correctly"
    exit 1
fi
echo -e "${GREEN}✓ Connected to cluster${NC}"

# Create namespace if it doesn't exist
echo -e "\n${GREEN}Step 2: Creating namespace (if not exists)${NC}"
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
echo -e "${GREEN}✓ Namespace ready${NC}"

# Validate Helm chart
echo -e "\n${GREEN}Step 3: Validating Helm chart${NC}"
cd helm-chart
helm lint .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Helm chart validation passed${NC}"
else
    echo -e "${RED}✗ Helm chart validation failed${NC}"
    exit 1
fi

# Show what will be deployed (dry-run)
echo -e "\n${BLUE}Performing dry-run...${NC}"
helm install $RELEASE_NAME . --namespace $NAMESPACE --dry-run > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dry-run successful${NC}"
else
    echo -e "${RED}✗ Dry-run failed${NC}"
    exit 1
fi

# Check if release already exists
if helm list -n $NAMESPACE | grep -q $RELEASE_NAME; then
    echo -e "\n${YELLOW}Release already exists. Upgrading...${NC}"
    helm upgrade $RELEASE_NAME . --namespace $NAMESPACE
    ACTION="upgraded"
else
    echo -e "\n${GREEN}Step 4: Installing Helm chart${NC}"
    helm install $RELEASE_NAME . --namespace $NAMESPACE
    ACTION="installed"
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Application $ACTION successfully${NC}"
else
    echo -e "${RED}✗ Installation failed${NC}"
    exit 1
fi

cd ..

# Wait for deployments to be ready
echo -e "\n${GREEN}Step 5: Waiting for deployments to be ready${NC}"
echo -e "${BLUE}Waiting for MySQL...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/mysql -n $NAMESPACE

echo -e "${BLUE}Waiting for Backend...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/backend -n $NAMESPACE

echo -e "${BLUE}Waiting for Frontend...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/frontend -n $NAMESPACE

echo -e "${GREEN}✓ All deployments are ready${NC}"

# Display deployment status
echo -e "\n${GREEN}=== Deployment Status ===${NC}"
kubectl get all -n $NAMESPACE

# Get access information
echo -e "\n${GREEN}=== Access Information ===${NC}"

# Check if we're using Minikube
if command -v minikube &> /dev/null && minikube status &> /dev/null; then
    MINIKUBE_IP=$(minikube ip)
    echo -e "${YELLOW}Running on Minikube${NC}"
    echo -e "Frontend URL: ${BLUE}http://$MINIKUBE_IP:30080${NC}"
    echo -e "Backend URL:  ${BLUE}http://$MINIKUBE_IP:30025${NC}"
    echo -e "\nOr use port-forward:"
    echo -e "  ${BLUE}minikube service frontend -n $NAMESPACE${NC}"
    echo -e "  ${BLUE}minikube service backend -n $NAMESPACE${NC}"
else
    # Get node information
    NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
    if [ -z "$NODE_IP" ]; then
        NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
    fi
    
    echo -e "Frontend NodePort: ${BLUE}http://$NODE_IP:30080${NC}"
    echo -e "Backend NodePort:  ${BLUE}http://$NODE_IP:30025${NC}"
fi

echo -e "\n${YELLOW}Alternative: Use port-forwarding${NC}"
echo -e "Frontend: ${BLUE}kubectl port-forward -n $NAMESPACE svc/frontend 8080:80${NC}"
echo -e "Backend:  ${BLUE}kubectl port-forward -n $NAMESPACE svc/backend 2025:2025${NC}"

# Display useful commands
echo -e "\n${GREEN}=== Useful Commands ===${NC}"
echo -e "View logs:"
echo -e "  Backend:  ${BLUE}kubectl logs -n $NAMESPACE -l app=backend -f${NC}"
echo -e "  Frontend: ${BLUE}kubectl logs -n $NAMESPACE -l app=frontend -f${NC}"
echo -e "  MySQL:    ${BLUE}kubectl logs -n $NAMESPACE -l app=mysql -f${NC}"
echo -e "\nCheck pods:"
echo -e "  ${BLUE}kubectl get pods -n $NAMESPACE${NC}"
echo -e "\nDelete deployment:"
echo -e "  ${BLUE}helm uninstall $RELEASE_NAME -n $NAMESPACE${NC}"
echo -e "\nAccess MySQL:"
echo -e "  ${BLUE}kubectl exec -n $NAMESPACE -it deploy/mysql -- mysql -uroot -proot event${NC}"

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}"
