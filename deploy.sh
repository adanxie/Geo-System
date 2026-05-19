#!/bin/bash

set -e

echo "========================================="
echo "QGIS 系统自动化部署脚本"
echo "========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 函数定义
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 Docker 是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    print_info "Docker 已安装: $(docker --version)"
}

# 检查 Docker Compose 是否安装
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
    if docker compose version &> /dev/null; then
        print_info "Docker Compose (v2) 已安装"
        COMPOSE_CMD="docker compose"
    else
        print_info "Docker Compose (v1) 已安装"
        COMPOSE_CMD="docker-compose"
    fi
}

# 创建必要的目录
create_directories() {
    print_info "创建必要的目录..."
    mkdir -p data projects plugins sql
    print_info "目录创建完成"
}

# 配置 X11 转发（用于桌面版）
setup_x11() {
    if [ "$(uname)" = "Linux" ]; then
        print_info "配置 X11 转发..."
        xhost +local:docker || true
        touch /tmp/.docker.xauth
        xauth nlist $DISPLAY | sed -e 's/^..../ffff/' | xauth -f /tmp/.docker.xauth nmerge -
    fi
}

# 启动服务
start_services() {
    print_info "启动 QGIS 相关服务..."
    
    if [ "$1" = "server" ]; then
        $COMPOSE_CMD up -d qgis-server postgis pgadmin
    elif [ "$1" = "desktop" ]; then
        setup_x11
        $COMPOSE_CMD up -d postgis pgadmin
        print_info "桌面版容器已准备就绪，运行 'docker exec -it qgis-desktop qgis' 启动 QGIS"
    else
        $COMPOSE_CMD up -d
    fi
    
    print_info "服务启动完成！"
}

# 显示服务状态
show_status() {
    print_info "服务状态："
    $COMPOSE_CMD ps
}

# 显示访问信息
show_access_info() {
    echo ""
    echo "========================================="
    echo "服务访问信息"
    echo "========================================="
    echo "QGIS Server:   http://localhost:8080"
    echo "pgAdmin:       http://localhost:5050"
    echo "PostgreSQL:    localhost:5432"
    echo ""
    echo "pgAdmin 登录信息："
    echo "  邮箱: admin@qgis.local"
    echo "  密码: admin123"
    echo ""
    echo "PostgreSQL 连接信息："
    echo "  主机: localhost"
    echo "  端口: 5432"
    echo "  数据库: qgis"
    echo "  用户: qgis"
    echo "  密码: qgis123"
    echo "========================================="
}

# 主函数
main() {
    check_docker
    check_docker_compose
    create_directories
    
    case "${1:-all}" in
        all)
            start_services all
            ;;
        server)
            start_services server
            ;;
        desktop)
            start_services desktop
            ;;
        *)
            print_error "无效参数: $1"
            echo "用法: $0 [all|server|desktop]"
            exit 1
            ;;
    esac
    
    show_status
    show_access_info
    
    print_info "部署完成！"
}

# 执行主函数
main "$@"
