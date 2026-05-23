# GEO 平台部署指南

## 1. Docker Compose 部署（推荐用于开发环境）

### 1.1 快速启动

```bash
# 克隆项目
git clone <repository-url>
cd GEO-Platform

# 启动所有服务
docker-compose up -d

# 等待服务启动（约1分钟）
# 访问地址：
# - 官网/前端: http://localhost:3000
# - API文档: http://localhost:8000/docs
```

### 1.2 常用命令

```bash
# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 停止服务
docker-compose down

# 清理数据（谨慎使用）
docker-compose down -v

# 重新构建
docker-compose up -d --build
```

### 1.3 环境变量配置

在 `backend/.env` 文件中配置：

```env
DATABASE_URL=mysql+pymysql://root:root@mysql:3306/geo_platform
REDIS_URL=redis://redis:6379/0
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 2. 宝塔面板部署（推荐用于生产环境）

### 2.1 环境要求

- 服务器：CentOS 7+ / Ubuntu 18.04+
- 宝塔面板：7.0+
- 内存：至少 2GB
- 硬盘：至少 20GB

### 2.2 安装宝塔面板

```bash
# CentOS
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh

# Ubuntu/Debian
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
```

### 2.3 安装必要软件

登录宝塔面板后，在「软件商店」安装：

| 软件 | 版本 | 说明 |
|------|------|------|
| Nginx | 1.20+ | Web服务器 |
| MySQL | 8.0+ | 数据库 |
| Redis | 7.0+ | 缓存 |
| Python项目管理器 | 最新 | Python应用管理 |

### 2.4 创建数据库

1. 进入「数据库」→「添加数据库」
2. 数据库名：`geo_platform`
3. 用户名：`geo_user`
4. 密码：设置安全密码
5. 权限：本地访问

### 2.5 部署后端应用

#### 步骤1：创建项目

1. 进入「Python项目管理器」→「添加项目」
2. **项目名称**: GEO-Backend
3. **域名**: api.yourdomain.com（可先使用IP）
4. **项目路径**: /www/wwwroot/geo-backend
5. **Python版本**: 3.11
6. **框架**: FastAPI
7. **启动方式**: uWSGI

#### 步骤2：上传代码

1. 在项目目录上传后端代码
2. 安装依赖：

```bash
cd /www/wwwroot/geo-backend
pip install -r requirements.txt
```

#### 步骤3：配置环境变量

在项目设置中添加环境变量：

```
DATABASE_URL=mysql+pymysql://geo_user:password@localhost:3306/geo_platform
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-production-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=http://yourdomain.com
```

#### 步骤4：启动服务

点击「重启项目」，确保服务正常运行。

### 2.6 部署前端应用

#### 步骤1：创建网站

1. 进入「网站」→「添加站点」
2. **域名**: yourdomain.com
3. **根目录**: /www/wwwroot/geo-frontend/out
4. **PHP版本**: 纯静态（无需PHP）

#### 步骤2：上传代码并构建

```bash
cd /www/wwwroot/geo-frontend
npm install
npm run build
```

#### 步骤3：配置反向代理

在网站设置中添加反向代理：

- **代理名称**: GEO-API
- **目标URL**: http://127.0.0.1:8000
- **代理目录**: /api

### 2.7 配置SSL证书

1. 在网站设置中进入「SSL」
2. 选择「Let's Encrypt」
3. 勾选自动续签
4. 部署证书

---

## 3. 传统服务器部署

### 3.1 安装依赖

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Python 3.11
sudo apt install python3.11 python3.11-venv python3.11-dev -y

# 安装 MySQL 8.0
sudo apt install mysql-server -y

# 安装 Redis
sudo apt install redis-server -y

# 安装 Nginx
sudo apt install nginx -y
```

### 3.2 配置数据库

```sql
CREATE DATABASE geo_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'geo_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON geo_platform.* TO 'geo_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3.3 部署后端

```bash
# 创建项目目录
mkdir -p /opt/geo-platform/backend
cd /opt/geo-platform/backend

# 克隆代码
git clone <repo-url> .

# 创建虚拟环境
python3.11 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 设置环境变量
export DATABASE_URL=mysql+pymysql://geo_user:password@localhost:3306/geo_platform
export REDIS_URL=redis://localhost:6379/0
export SECRET_KEY=your-secret-key

# 启动服务
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 3.4 配置 Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 前端静态文件
    location / {
        root /opt/geo-platform/frontend/out;
        try_files $uri $uri/ /index.html;
    }

    # API 反向代理
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 4. 首次部署检查清单

- [ ] 数据库连接正常
- [ ] Redis 连接正常
- [ ] 后端服务启动成功
- [ ] 前端构建成功
- [ ] API 文档可访问 (http://yourdomain.com/docs)
- [ ] SSL 证书配置完成
- [ ] 防火墙开放端口 (80, 443)
- [ ] 定时备份任务配置
- [ ] 日志记录配置

---

## 5. 常见问题

### 5.1 数据库连接失败

检查数据库配置是否正确，确保：
- 数据库用户名密码正确
- 数据库已创建
- 数据库用户有足够权限
- 防火墙允许本地连接

### 5.2 前端无法访问 API

检查：
- Nginx 反向代理配置是否正确
- 后端服务是否正常运行
- CORS 配置是否包含前端域名

### 5.3 性能问题

优化建议：
- 启用 Redis 缓存
- 配置 Nginx 静态资源缓存
- 使用 CDN 加速
- 数据库添加索引