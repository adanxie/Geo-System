# 环境变量配置说明

## 配置文件位置

环境变量需要配置在以下位置：

1. **本地开发**：`/workspace/GEO-Platform/backend/.env`
2. **生产部署（宝塔）**：在 Python 项目配置中设置
3. **Docker 部署**：在 `docker-compose.yml` 中配置

## 配置文件说明

项目提供了模板文件：`/workspace/GEO-Platform/backend/.env.example`

## 配置项详解

### 数据库配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| DB_HOST | 数据库地址 | localhost |
| DB_PORT | 数据库端口 | 3306 |
| DB_USER | 数据库用户名 | root |
| DB_PASSWORD | 数据库密码 | root |
| DB_NAME | 数据库名称 | geo_platform |

### Redis 配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| REDIS_HOST | Redis 地址 | localhost |
| REDIS_PORT | Redis 端口 | 6379 |
| REDIS_DB | Redis 数据库编号 | 0 |

### JWT 配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| SECRET_KEY | JWT 密钥 | (生产环境必须修改) |
| ALGORITHM | 加密算法 | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | 令牌过期时间（分钟） | 30 |

### 应用配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| LOG_LEVEL | 日志级别 | INFO |
| UPLOAD_DIR | 文件上传目录 | uploads |

### CORS 配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| ALLOWED_ORIGINS | 允许的来源地址，多个用逗号分隔 | http://localhost:3000,http://127.0.0.1:3000 |

### LLM API 配置（可选）

| 变量名 | 说明 |
|--------|------|
| OPENAI_API_KEY | OpenAI API 密钥 |
| ANTHROPIC_API_KEY | Anthropic API 密钥 |
| GOOGLE_API_KEY | Google API 密钥 |

## 配置示例

### 本地开发环境

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=geo_platform

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

SECRET_KEY=your-dev-secret-key
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 生产环境

```env
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=geo_user
DB_PASSWORD=your-strong-password
DB_NAME=geo_platform

REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_DB=0

SECRET_KEY=your-production-secret-key-here
ALLOWED_ORIGINS=https://yourdomain.com
```

## 快速开始

1. 复制模板文件：
   ```bash
   cp backend/.env.example backend/.env
   ```

2. 根据实际需求修改 `backend/.env` 文件中的配置

3. 重启应用使配置生效
