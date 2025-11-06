#!/bin/bash

# Event Management System - Docker Compose Deployment Script
# Simple deployment using Docker Compose

set -e

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Event Management System - Docker Deployment ===${NC}\n"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose is not installed.${NC}"
    echo "Install it with: brew install docker-compose"
    exit 1
fi

# Parse command line arguments
ACTION=${1:-up}

case $ACTION in
    up|start)
        echo -e "${GREEN}Starting Event Management System...${NC}\n"
        docker-compose up -d --build
        
        echo -e "\n${GREEN}Waiting for services to be healthy...${NC}"
        sleep 10
        
        echo -e "\n${GREEN}=== Deployment Status ===${NC}"
        docker-compose ps
        
        echo -e "\n${GREEN}=== Access Information ===${NC}"
        echo -e "Frontend:  ${BLUE}http://localhost${NC}"
        echo -e "Backend:   ${BLUE}http://localhost:2025${NC}"
        echo -e "MySQL:     ${BLUE}localhost:3306${NC}"
        
        echo -e "\n${YELLOW}Useful Commands:${NC}"
        echo -e "  View logs:     ${BLUE}docker-compose logs -f${NC}"
        echo -e "  Stop services: ${BLUE}docker-compose down${NC}"
        echo -e "  Restart:       ${BLUE}docker-compose restart${NC}"
        ;;
        
    down|stop)
        echo -e "${YELLOW}Stopping Event Management System...${NC}\n"
        docker-compose down
        echo -e "${GREEN}✓ Services stopped${NC}"
        ;;
        
    restart)
        echo -e "${YELLOW}Restarting Event Management System...${NC}\n"
        docker-compose restart
        echo -e "${GREEN}✓ Services restarted${NC}"
        ;;
        
    logs)
        SERVICE=${2:-}
        if [ -z "$SERVICE" ]; then
            docker-compose logs -f
        else
            docker-compose logs -f $SERVICE
        fi
        ;;
        
    clean)
        echo -e "${RED}Cleaning up Event Management System (including volumes)...${NC}\n"
        docker-compose down -v
        echo -e "${GREEN}✓ All resources cleaned up${NC}"
        ;;
        
    status)
        echo -e "${GREEN}=== Service Status ===${NC}"
        docker-compose ps
        ;;
        
    *)
        echo -e "${YELLOW}Usage: $0 {up|down|restart|logs|clean|status}${NC}"
        echo ""
        echo "Commands:"
        echo "  up/start  - Start all services"
        echo "  down/stop - Stop all services"
        echo "  restart   - Restart all services"
        echo "  logs      - View logs (add service name for specific service)"
        echo "  clean     - Stop and remove all containers and volumes"
        echo "  status    - Show service status"
        exit 1
        ;;
esac
