#!/bin/bash

set -e

echo "========================================="
echo "停止 QGIS 系统服务"
echo "========================================="

# 颜色定义
GREEN='\033[0;32m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

# 确定 Docker Compose 命令
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

case "${1:-stop}" in
    stop)
        print_info "停止所有服务..."
        $COMPOSE_CMD stop
        ;;
    down)
        print_info "停止并删除所有服务容器..."
        $COMPOSE_CMD down
        ;;
    down-v)
        print_info "停止并删除所有服务容器和数据卷..."
        $COMPOSE_CMD down -v
        ;;
    *)
        echo "用法: $0 [stop|down|down-v]"
        echo "  stop    - 停止服务（保留容器）"
        echo "  down    - 停止并删除服务容器"
        echo "  down-v  - 停止并删除服务容器和数据卷（警告：数据会丢失）"
        exit 1
        ;;
esac

print_info "操作完成！"
