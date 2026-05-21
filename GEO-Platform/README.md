# GEO 商业平台 - Generative Engine Optimization Platform

## 项目概述

这是一个专业的 GEO（生成式搜索引擎优化）商业化平台，帮助企业和内容创作者优化其内容在 AI 聊天模型和生成式搜索中的可见度。

## 核心价值

- **长期稳定的 GEO 过程** - 不同于短期的 SEO 操作，我们提供持续优化的 GEO 策略
- **跨平台监控** - 在多个大模型平台跟踪内容排名和表现
- **数据驱动优化** - 基于实际表现数据优化内容策略
- **团队协作** - 完善的权限管理和团队协作功能

## 文档导航

| 文档 | 说明 |
|------|------|
| [PRD.md](docs/PRD.md) | 完整的产品需求文档 |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | 系统架构设计 |
| [TECH_STACK.md](docs/TECH_STACK.md) | 技术栈选择 |
| [DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md) | 详细开发计划 |

## 快速开始

### 环境要求

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### 安装启动

```bash
# 克隆项目
git clone <repo-url>
cd GEO-Platform

# 启动开发环境
docker-compose up -d

# 访问应用
# - 前台官网: http://localhost:3000
# - 客户端: http://localhost:3001
# - 管理后台: http://localhost:3002
```

## 项目结构

```
GEO-Platform/
├── frontend/                # 前端应用
│   ├── website/            # 官网
│   ├── client/             # 客户端
│   └── admin/              # 管理后台
├── backend/                # 后端服务
│   ├── api/                # API 服务
│   ├── workers/            # 异步任务
│   └── services/           # 核心业务
├── geo-engine/             # GEO 优化引擎
│   ├── core/               # 核心算法
│   └── integrations/       # 平台集成
├── docs/                   # 文档
└── deployment/             # 部署配置
```
