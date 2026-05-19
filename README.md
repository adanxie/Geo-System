# QGIS 地理信息系统 - 自动化部署

这是一个完整的 QGIS（Quantum GIS）地理信息系统的自动化部署方案，包含 QGIS 桌面版、QGIS Server、PostGIS 空间数据库和 pgAdmin 管理工具。

## 📦 项目结构

```
.
├── QGIS/                  # QGIS 官方源码仓库
├── data/                  # 数据存储目录
├── projects/              # QGIS 项目文件目录
├── plugins/               # QGIS 插件目录
├── sql/                   # SQL 初始化脚本目录
├── docker-compose.yml     # Docker Compose 配置文件
├── deploy.sh             # 自动化部署脚本
├── stop.sh               # 停止服务脚本
└── README.md             # 本文件
```

## 🚀 快速开始

### 前置要求

- Docker 20.10+
- Docker Compose 1.29+ 或 Docker Compose v2
- Linux/macOS/Windows (WSL2)

### 一键部署

```bash
# 克隆本仓库后，直接运行部署脚本
./deploy.sh all
```

### 部署选项

```bash
# 部署所有服务（桌面版 + 服务器 + 数据库）
./deploy.sh all

# 仅部署服务器端（QGIS Server + PostGIS + pgAdmin）
./deploy.sh server

# 仅部署桌面开发环境
./deploy.sh desktop
```

## 📋 服务说明

### 1. QGIS Server
- **访问地址**: http://localhost:8080
- **功能**: 提供 WMS/WFS/WCS 等标准 OGC 服务
- **用途**: 发布 QGIS 项目为 Web 地图服务

### 2. PostGIS
- **连接地址**: localhost:5432
- **数据库**: qgis
- **用户名**: qgis
- **密码**: qgis123
- **功能**: 空间数据库，存储地理空间数据

### 3. pgAdmin
- **访问地址**: http://localhost:5050
- **登录邮箱**: admin@qgis.local
- **登录密码**: admin123
- **功能**: Web 端 PostgreSQL/PostGIS 管理工具

### 4. QGIS Desktop
- **启动方式**: `docker exec -it qgis-desktop qgis`
- **功能**: 完整的 QGIS 桌面应用（需要 X11 支持）

## 🛠️ 使用指南

### 停止服务

```bash
# 停止服务但保留容器
./stop.sh stop

# 停止并删除容器
./stop.sh down

# 停止并删除容器和数据卷（警告：数据会丢失）
./stop.sh down-v
```

### 查看服务状态

```bash
# 使用 Docker Compose 查看状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 访问 pgAdmin

1. 打开浏览器访问 http://localhost:5050
2. 使用邮箱 `admin@qgis.local` 和密码 `admin123` 登录
3. 添加新服务器连接：
   - 名称: QGIS PostGIS
   - 主机: postgis
   - 端口: 5432
   - 维护数据库: qgis
   - 用户名: qgis
   - 密码: qgis123

### 使用 QGIS Server

将你的 QGIS 项目文件（.qgs 或 .qgz）放入 `projects/` 目录，然后通过以下 URL 访问：

```
http://localhost:8080/ogc?MAP=/projects/your_project.qgs&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
```

## 📚 关于 QGIS

QGIS 是一个自由开源的地理信息系统（GIS）软件，支持：

- 查看、编辑、分析和发布地理空间数据
- 多种数据格式支持（Shapefile、GeoTIFF、PostGIS 等）
- 强大的空间分析功能
- Python 脚本扩展
- Web 地图服务发布

更多信息请访问 [QGIS 官网](https://www.qgis.org)。

## 📄 许可证

- QGIS: GNU General Public License v2+
- 本部署方案: MIT License
