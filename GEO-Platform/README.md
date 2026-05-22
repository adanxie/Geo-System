# GEO 商业平台 - Generative Engine Optimization Platform

## 项目概述

这是一个专业的 GEO（生成式搜索引擎优化）商业化平台，帮助企业和内容创作者优化其内容在 AI 聊天模型和生成式搜索中的可见度。

**架构特点：** 采用单体架构设计，简化部署成本，快速启动和迭代。

## 核心价值

- **长期稳定的 GEO 过程** - 不同于短期的 SEO 操作，我们提供持续优化的 GEO 策略
- **跨平台监控** - 在多个大模型平台跟踪内容排名和表现
- **数据驱动优化** - 基于实际表现数据优化内容策略
- **团队协作** - 完善的权限管理和团队协作功能

## 文档导航

| 文档 | 说明 |
|------|------|
| [PRD.md](docs/PRD.md) | 完整的产品需求文档 |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | 系统架构设计（简化版） |
| [DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md) | 详细开发计划 |

## 快速开始

### 环境要求

- Docker & Docker Compose
- Node.js 20+ (本地开发)
- Python 3.11+ (本地开发)

### 一键启动

```bash
# 克隆项目
git clone <repo-url>
cd GEO-Platform

# 启动所有服务
docker-compose up -d

# 初始化数据库
docker-compose exec backend alembic upgrade head

# 访问应用
# - 官网/客户端/管理后台: http://localhost:3000
# - API 文档: http://localhost:8000/docs
```

## 技术栈

- **前端**: Next.js 14 + shadcn/ui + Tailwind CSS
- **后端**: FastAPI + SQLAlchemy 2.0
- **数据库**: MySQL 8.0
- **缓存**: Redis 7
- **任务调度**: APScheduler
- **部署**: Docker Compose

## 项目结构

```
GEO-Platform/
├── frontend/                # Next.js 前端应用（包含官网、客户端、管理后台）
├── backend/                 # FastAPI 后端应用（单体架构）
│   ├── app/
│   │   ├── api/            # API 路由
│   │   ├── models/         # 数据模型
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # 业务逻辑
│   │   ├── core/           # 核心配置
│   │   └── tasks/          # 定时任务
│   └── ...
├── docs/                    # 文档
└── docker-compose.yml       # Docker Compose 配置
```
