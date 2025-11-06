#!/bin/bash

# Event Management System - Build and Push Script
# This script builds Docker images and pushes them to Docker registry

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker Hub username is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Docker Hub username not provided${NC}"
    echo "Usage: ./build-and-push.sh <dockerhub-username>"
    echo "Example: ./build-and-push.sh myusername"
    exit 1
fi

DOCKERHUB_USERNAME=$1
VERSION=${2:-v1}

echo -e "${GREEN}=== Event Management System - Build and Push ===${NC}"
echo -e "Docker Hub Username: ${YELLOW}$DOCKERHUB_USERNAME${NC}"
echo -e "Version: ${YELLOW}$VERSION${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Login to Docker Hub
echo -e "${GREEN}Step 1: Login to Docker Hub${NC}"
docker login

# Build Backend
echo -e "\n${GREEN}Step 2: Building Backend Image${NC}"
cd Backend
docker build -t $DOCKERHUB_USERNAME/event-management-backend:$VERSION .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend image built successfully${NC}"
else
    echo -e "${RED}✗ Backend build failed${NC}"
    exit 1
fi
cd ..

# Build Frontend
echo -e "\n${GREEN}Step 3: Building Frontend Image${NC}"
cd frontend
docker build -t $DOCKERHUB_USERNAME/event-management-frontend:$VERSION .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend image built successfully${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi
cd ..

# Push Backend
echo -e "\n${GREEN}Step 4: Pushing Backend Image${NC}"
docker push $DOCKERHUB_USERNAME/event-management-backend:$VERSION
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend image pushed successfully${NC}"
else
    echo -e "${RED}✗ Backend push failed${NC}"
    exit 1
fi

# Push Frontend
echo -e "\n${GREEN}Step 5: Pushing Frontend Image${NC}"
docker push $DOCKERHUB_USERNAME/event-management-frontend:$VERSION
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend image pushed successfully${NC}"
else
    echo -e "${RED}✗ Frontend push failed${NC}"
    exit 1
fi

# Update values.yaml
echo -e "\n${GREEN}Step 6: Updating helm-chart/values.yaml${NC}"
sed -i.bak "s|image: .*event-management-backend.*|image: $DOCKERHUB_USERNAME/event-management-backend:$VERSION|g" helm-chart/values.yaml
sed -i.bak "s|image: .*event-management-frontend.*|image: $DOCKERHUB_USERNAME/event-management-frontend:$VERSION|g" helm-chart/values.yaml
rm -f helm-chart/values.yaml.bak
echo -e "${GREEN}✓ values.yaml updated${NC}"

echo -e "\n${GREEN}=== Build and Push Complete! ===${NC}"
echo -e "\nNext steps:"
echo -e "1. Review helm-chart/values.yaml"
echo -e "2. Run: ${YELLOW}./deploy.sh${NC}"
echo -e "\nImages created:"
echo -e "  - $DOCKERHUB_USERNAME/event-management-backend:$VERSION"
echo -e "  - $DOCKERHUB_USERNAME/event-management-frontend:$VERSION"
