# GEO 商业平台 - 系统架构设计 (简化版)

| 版本 | 日期 | 作者 | 变更记录 |
|------|------|------|----------|
| v2.0 | 2026-05-22 | 架构团队 | 简化为单体架构，使用MySQL |
| v1.0 | 2026-05-21 | 架构团队 | 初始版本 |

---

## 1. 系统总体架构

### 1.1 架构视图

```mermaid
graph TB
    subgraph 客户端层
        Web[Web 浏览器]
        Mobile[移动 APP]
    end

    subgraph 接入层
        Nginx[Nginx 反向代理]
    end

    subgraph 应用层
        Frontend[Next.js 前端应用<br/>(官网 + 客户端 + 管理后台)]
        Backend[FastAPI 单体后端应用]
    end

    subgraph 数据层
        MySQL[(MySQL 8.0)]
        Redis[(Redis 7 缓存)]
        FileStorage[本地文件存储 / OSS]
    end

    Web --> Nginx
    Mobile --> Nginx
    Nginx --> Frontend
    Frontend --> Backend
    Backend --> MySQL
    Backend --> Redis
    Backend --> FileStorage
```

### 1.2 设计原则

- **单体架构** - 快速开发、易于部署
- **简化技术栈** - 最小化运维成本
- **高内聚低耦合** - 模块划分清晰
- **安全性** - 基础安全防护
- **可扩展** - 为未来演进预留空间

---

## 2. 技术栈选型

### 2.1 前端技术栈

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 框架 | Next.js 14 | React 框架、SSR 支持 |
| UI 组件库 | shadcn/ui + Tailwind CSS | 现代化设计系统 |
| 状态管理 | Zustand | 轻量级状态管理 |
| 数据请求 | TanStack Query | 服务端状态管理 |
| 图表 | Recharts | 数据可视化 |
| 富文本编辑 | TipTap | 现代富文本编辑器 |

### 2.2 后端技术栈

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 语言 | Python 3.11+ | 主业务逻辑 |
| Web 框架 | FastAPI | 高性能异步框架 |
| ORM | SQLAlchemy 2.0 | 类型安全的 ORM |
| 数据库 | MySQL 8.0 | 主数据库 |
| 缓存 | Redis 7 | 缓存和会话 |
| 任务调度 | APScheduler | 定时任务调度 |
| 文件存储 | 本地文件系统 / 阿里云OSS | 文件存储 |

### 2.3 GEO 引擎技术栈

| 组件 | 技术选型 | 说明 |
|------|---------|------|
| LLM 集成 | LangChain | 多 LLM 统一接口 |
| 内容分析 | 直接调用LLM | 简化NLP处理 |
| 监控调度 | APScheduler | 定时任务调度 |

### 2.4 基础设施

| 组件 | 技术选型 | 说明 |
|------|---------|------|
| 容器化 | Docker Compose | 本地开发和部署 |
| 部署 | 传统服务器部署 | 简单部署 |
| 日志 | Python logging + 日志文件 | 简单日志管理 |
| 监控 | 系统自带监控 | 基础监控 |

---

## 3. 数据库设计

### 3.1 核心实体关系图

```mermaid
erDiagram
    USER ||--o{ CAMPAIGN : 创建
    USER ||--o{ CONTENT : 上传
    USER ||--o{ SUBSCRIPTION : 拥有
    CAMPAIGN ||--o{ RANKING_RECORD : 产生
    CAMPAIGN ||--o{ OPTIMIZATION_LOG : 记录
    CONTENT ||--o{ CONTENT_VERSION : 有
    CONTENT ||--o{ RANKING_RECORD : 被追踪
    PLATFORM ||--o{ RANKING_RECORD : 产生
    SUBSCRIPTION ||--o{ PLAN : 使用

    USER {
        char id PK
        string email UK
        string password_hash
        string name
        string avatar_url
        json settings
        datetime created_at
        datetime updated_at
    }

    CAMPAIGN {
        char id PK
        char user_id FK
        string name
        text description
        json target_keywords
        json target_platforms
        enum status
        json config
        datetime start_date
        datetime end_date
        datetime created_at
        datetime updated_at
    }

    CONTENT {
        char id PK
        char user_id FK
        string title
        text content
        string content_type
        string source_url
        json metadata
        float geo_score
        datetime created_at
        datetime updated_at
    }

    CONTENT_VERSION {
        char id PK
        char content_id FK
        int version
        text content
        json diff
        char created_by FK
        datetime created_at
    }

    PLATFORM {
        char id PK
        string name
        string code UK
        string api_endpoint
        json config
        boolean active
    }

    RANKING_RECORD {
        char id PK
        char campaign_id FK
        char content_id FK
        char platform_id FK
        string keyword
        int rank_position
        json metrics
        datetime recorded_at
    }

    OPTIMIZATION_LOG {
        char id PK
        char campaign_id FK
        char content_id FK
        string action_type
        json before_state
        json after_state
        text suggestions
        datetime created_at
    }

    SUBSCRIPTION {
        char id PK
        char user_id FK
        char plan_id FK
        enum status
        datetime start_date
        datetime end_date
        json metadata
    }

    PLAN {
        char id PK
        string name
        text description
        decimal price_monthly
        decimal price_yearly
        json features
        int max_campaigns
        int max_platforms
        boolean active
    }
```

### 3.2 关键表设计

#### 用户表 (users)

```sql
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    avatar_url VARCHAR(500),
    settings JSON DEFAULT ('{}'),
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 推广计划表 (campaigns)

```sql
CREATE TABLE campaigns (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    target_keywords JSON DEFAULT ('[]'),
    target_platforms JSON DEFAULT ('[]'),
    status VARCHAR(50) DEFAULT 'draft',
    config JSON DEFAULT ('{}'),
    start_date DATETIME,
    end_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_campaigns_user_id (user_id),
    INDEX idx_campaigns_status (status),
    INDEX idx_campaigns_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 内容表 (contents)

```sql
CREATE TABLE contents (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    content_type VARCHAR(50),
    source_url VARCHAR(1000),
    metadata JSON DEFAULT ('{}'),
    geo_score DECIMAL(5,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_contents_user_id (user_id),
    INDEX idx_contents_geo_score (geo_score DESC),
    INDEX idx_contents_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 排名记录表 (ranking_records)

```sql
CREATE TABLE ranking_records (
    id CHAR(36) PRIMARY KEY,
    campaign_id CHAR(36) NOT NULL,
    content_id CHAR(36),
    platform_id CHAR(36) NOT NULL,
    keyword VARCHAR(500) NOT NULL,
    rank_position INTEGER,
    metrics JSON DEFAULT ('{}'),
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
    FOREIGN KEY (content_id) REFERENCES contents(id),
    FOREIGN KEY (platform_id) REFERENCES platforms(id),
    INDEX idx_ranking_campaign_id (campaign_id),
    INDEX idx_ranking_platform_id (platform_id),
    INDEX idx_ranking_recorded_at (recorded_at DESC),
    INDEX idx_ranking_keyword (keyword)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 4. API 设计

### 4.1 API 规范

- **协议**: HTTPS
- **格式**: JSON
- **认证**: JWT / OAuth2.0
- **版本**: `/api/v1/`

### 4.2 核心 API 接口

#### 认证模块

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/v1/auth/register` | 用户注册 |
| POST | `/api/v1/auth/login` | 用户登录 |
| POST | `/api/v1/auth/logout` | 用户登出 |
| POST | `/api/v1/auth/refresh` | 刷新令牌 |
| GET | `/api/v1/auth/me` | 获取当前用户信息 |

#### 用户模块

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/v1/users/profile` | 获取用户资料 |
| PUT | `/api/v1/users/profile` | 更新用户资料 |
| GET | `/api/v1/users/settings` | 获取用户设置 |
| PUT | `/api/v1/users/settings` | 更新用户设置 |

#### 推广计划模块

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/v1/campaigns` | 获取计划列表 |
| POST | `/api/v1/campaigns` | 创建新计划 |
| GET | `/api/v1/campaigns/:id` | 获取计划详情 |
| PUT | `/api/v1/campaigns/:id` | 更新计划 |
| DELETE | `/api/v1/campaigns/:id` | 删除计划 |
| POST | `/api/v1/campaigns/:id/start` | 启动计划 |
| POST | `/api/v1/campaigns/:id/pause` | 暂停计划 |

#### 内容模块

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/v1/contents` | 获取内容列表 |
| POST | `/api/v1/contents` | 上传新内容 |
| GET | `/api/v1/contents/:id` | 获取内容详情 |
| PUT | `/api/v1/contents/:id` | 更新内容 |
| DELETE | `/api/v1/contents/:id` | 删除内容 |
| POST | `/api/v1/contents/:id/analyze` | 分析内容 |
| POST | `/api/v1/contents/:id/optimize` | 优化内容 |

#### 平台集成模块

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/v1/platforms` | 获取平台列表 |
| POST | `/api/v1/platforms/:id/bind` | 绑定平台 |
| DELETE | `/api/v1/platforms/:id/bind` | 解绑平台 |
| GET | `/api/v1/platforms/:id/status` | 获取平台状态 |

#### 分析报告模块

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/v1/analytics/dashboard` | 仪表盘数据 |
| GET | `/api/v1/analytics/campaigns/:id` | 计划分析 |
| GET | `/api/v1/analytics/rankings` | 排名趋势 |
| GET | `/api/v1/analytics/export` | 导出报告 |

---

## 5. 应用模块设计

### 5.1 模块划分

| 模块名称 | 职责 |
|---------|------|
| auth | 用户认证、权限管理 |
| user | 用户管理、组织管理 |
| content | 内容管理、内容分析 |
| campaign | 推广计划、任务调度 |
| platform | 平台集成、API 封装 |
| analytics | 数据分析、报表生成 |
| billing | 订阅管理、账单支付 |
| notification | 消息通知、推送 |

### 5.2 目录结构

```
geo-platform/
├── frontend/              # Next.js 前端应用
│   ├── app/
│   │   ├── (website)/     # 官网
│   │   ├── (client)/      # 客户端
│   │   └── (admin)/       # 管理后台
│   └── ...
├── backend/               # FastAPI 后端应用
│   ├── app/
│   │   ├── api/           # API 路由
│   │   ├── models/        # 数据模型
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # 业务逻辑
│   │   ├── core/          # 核心配置
│   │   └── tasks/         # 定时任务
│   └── ...
└── docker-compose.yml
```

---

## 6. GEO 引擎设计

### 6.1 内容优化流程

```mermaid
flowchart LR
    A[接收内容] --> B[内容预处理]
    B --> C[多维度分析]
    C --> D[生成优化建议]
    D --> E[用户确认]
    E --> F[应用优化]
    F --> G[效果追踪]
    G --> H[迭代优化]

    subgraph 分析维度
        C1[结构分析]
        C2[关键词分析]
        C3[权威度分析]
        C4[可读性分析]
    end

    C --> C1
    C --> C2
    C --> C3
    C --> C4
```

### 6.2 排名监控架构

```mermaid
graph TB
    Scheduler[调度器 Airflow] --> Worker[监控 Worker]
    Worker --> Platform_API[平台 API]
    Platform_API --> Parser[结果解析器]
    Parser --> DataProcessor[数据处理器]
    DataProcessor --> DB[(数据库)]
    DataProcessor --> Alert[告警模块]
    Alert --> Notification[通知推送]
```

---

## 7. 安全设计

### 7.1 安全架构层次

```
┌─────────────────────────────────────────┐
│         应用层安全                        │
│  - 输入验证、输出编码                    │
│  - CSRF、XSS 防护                        │
│  - 权限控制                              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         服务层安全                        │
│  - API 认证、限流                        │
│  - 服务间通信加密                        │
│  - 审计日志                              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         数据层安全                        │
│  - 数据加密存储                          │
│  - 备份和恢复                            │
│  - 数据脱敏                              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         基础设施安全                      │
│  - 网络隔离                              │
│  - 主机加固                              │
│  - 安全补丁                              │
└─────────────────────────────────────────┘
```

### 7.2 数据加密

- **传输加密**: TLS 1.3
- **存储加密**: AES-256
- **密钥管理**: KMS / HashiCorp Vault
- **敏感字段**: 加密存储、访问审计

---

## 8. 部署架构

### 8.1 Docker Compose 部署

```yaml
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: geo_platform
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    environment:
      - DATABASE_URL=mysql://root:root@mysql:3306/geo_platform
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./uploads:/app/uploads
    ports:
      - "8000:8000"
    depends_on:
      - mysql
      - redis

  frontend:
    build: ./frontend
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    ports:
      - "3000:3000"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend

volumes:
  mysql_data:
  redis_data:
```

### 8.2 简化部署方式

| 部署方式 | 说明 | 适用场景 |
|---------|------|---------|
| Docker Compose | 一键启动所有服务 | 本地开发、测试环境 |
| 传统服务器 | 直接部署到云服务器 | 生产环境（小型规模） |
| 云平台部署 | 阿里云/腾讯云容器服务 | 生产环境（中型规模） |

### 8.3 环境划分

| 环境 | 用途 | URL |
|------|------|-----|
| 开发环境 | 本地开发 | localhost:3000 |
| 测试环境 | 功能测试 | test.geo-platform.com |
| 生产环境 | 正式对外 | www.geo-platform.com |
