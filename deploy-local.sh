#!/bin/bash

# Event Management System - Quick Local Deploy
# This script builds images locally and deploys to local Kubernetes (Minikube/Kind)

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

NAMESPACE=${1:-event-management}
RELEASE_NAME="event-management"

echo -e "${GREEN}=== Event Management System - Local Deployment ===${NC}"
echo -e "This script will build images locally and deploy to your local cluster\n"

# Check for Minikube or Kind
if command -v minikube &> /dev/null && minikube status &> /dev/null; then
    CLUSTER_TYPE="minikube"
    echo -e "${GREEN}Detected Minikube cluster${NC}"
elif command -v kind &> /dev/null && kind get clusters 2>/dev/null | grep -q .; then
    CLUSTER_TYPE="kind"
    CLUSTER_NAME=$(kind get clusters | head -n 1)
    echo -e "${GREEN}Detected Kind cluster: $CLUSTER_NAME${NC}"
else
    echo -e "${YELLOW}Warning: Neither Minikube nor Kind detected${NC}"
    echo -e "Proceeding with standard Docker build...\n"
    CLUSTER_TYPE="standard"
fi

# Build images
echo -e "\n${GREEN}Step 1: Building Docker images${NC}"

# Build Backend
echo -e "${BLUE}Building backend...${NC}"
cd Backend
if [ "$CLUSTER_TYPE" = "minikube" ]; then
    eval $(minikube docker-env)
fi
docker build -t event-management-backend:local .
echo -e "${GREEN}✓ Backend built${NC}"
cd ..

# Build Frontend
echo -e "${BLUE}Building frontend...${NC}"
cd frontend
docker build -t event-management-frontend:local .
echo -e "${GREEN}✓ Frontend built${NC}"
cd ..

# Load images to Kind if using Kind
if [ "$CLUSTER_TYPE" = "kind" ]; then
    echo -e "\n${BLUE}Loading images to Kind cluster...${NC}"
    kind load docker-image event-management-backend:local --name $CLUSTER_NAME
    kind load docker-image event-management-frontend:local --name $CLUSTER_NAME
    echo -e "${GREEN}✓ Images loaded to Kind${NC}"
fi

# Update values.yaml for local images
echo -e "\n${GREEN}Step 2: Configuring for local deployment${NC}"
cp helm-chart/values.yaml helm-chart/values.yaml.backup

cat > helm-chart/values-local.yaml << 'EOF'
# MySQL Configuration
mysql:
  image: mysql:8.0
  storage: 2Gi
  storageClass: standard
  rootPassword: root
  database: event

# Backend Configuration
backend:
  image: event-management-backend:local
  replicas: 1
  port: 2025
  nodePort: 30025

# Frontend Configuration
frontend:
  image: event-management-frontend:local
  replicas: 1
  port: 80
  nodePort: 30080

# Ingress Configuration
ingress:
  enabled: false

# Horizontal Pod Autoscaler Configuration
autoscaling:
  backend:
    enabled: false
  frontend:
    enabled: false

# Resource Limits and Requests (reduced for local)
resources:
  backend:
    requests:
      memory: "256Mi"
      cpu: "100m"
    limits:
      memory: "512Mi"
      cpu: "500m"
  frontend:
    requests:
      memory: "128Mi"
      cpu: "50m"
    limits:
      memory: "256Mi"
      cpu: "250m"
  mysql:
    requests:
      memory: "256Mi"
      cpu: "100m"
    limits:
      memory: "512Mi"
      cpu: "500m"
EOF

echo -e "${GREEN}✓ Local values file created${NC}"

# Deploy with Helm
echo -e "\n${GREEN}Step 3: Deploying to Kubernetes${NC}"

kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

cd helm-chart
helm upgrade --install $RELEASE_NAME . \
    --namespace $NAMESPACE \
    --values values-local.yaml \
    --set backend.image=event-management-backend:local \
    --set frontend.image=event-management-frontend:local

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Deployment successful${NC}"
else
    echo -e "${RED}✗ Deployment failed${NC}"
    exit 1
fi
cd ..

# Wait for deployments
echo -e "\n${GREEN}Step 4: Waiting for pods to be ready${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/mysql -n $NAMESPACE 2>/dev/null || true
kubectl wait --for=condition=available --timeout=300s deployment/backend -n $NAMESPACE 2>/dev/null || true
kubectl wait --for=condition=available --timeout=300s deployment/frontend -n $NAMESPACE 2>/dev/null || true

# Show status
echo -e "\n${GREEN}=== Deployment Status ===${NC}"
kubectl get pods -n $NAMESPACE

# Access information
echo -e "\n${GREEN}=== Access Your Application ===${NC}"

if [ "$CLUSTER_TYPE" = "minikube" ]; then
    MINIKUBE_IP=$(minikube ip)
    echo -e "Frontend: ${BLUE}http://$MINIKUBE_IP:30080${NC}"
    echo -e "Backend:  ${BLUE}http://$MINIKUBE_IP:30025${NC}"
    echo -e "\nOr run these commands to open in browser:"
    echo -e "  ${YELLOW}minikube service frontend -n $NAMESPACE${NC}"
    echo -e "  ${YELLOW}minikube service backend -n $NAMESPACE${NC}"
elif [ "$CLUSTER_TYPE" = "kind" ]; then
    echo -e "${YELLOW}For Kind, use port-forwarding:${NC}"
    echo -e "  Frontend: ${BLUE}kubectl port-forward -n $NAMESPACE svc/frontend 8080:80${NC}"
    echo -e "  Backend:  ${BLUE}kubectl port-forward -n $NAMESPACE svc/backend 2025:2025${NC}"
    echo -e "\nThen access at:"
    echo -e "  Frontend: ${BLUE}http://localhost:8080${NC}"
    echo -e "  Backend:  ${BLUE}http://localhost:2025${NC}"
fi

echo -e "\n${GREEN}=== Quick Commands ===${NC}"
echo -e "View logs:    ${BLUE}kubectl logs -n $NAMESPACE -l app=backend -f${NC}"
echo -e "List pods:    ${BLUE}kubectl get pods -n $NAMESPACE${NC}"
echo -e "Uninstall:    ${BLUE}helm uninstall $RELEASE_NAME -n $NAMESPACE${NC}"

echo -e "\n${GREEN}=== Local Deployment Complete! ===${NC}"
