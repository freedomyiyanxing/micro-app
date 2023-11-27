# micro-app
微前端应用   
- 代码组织方式： pnpm monorepo
- 代码架构：无界微前端框架
- 公共库：webpack MF 联邦模块

#### pnpm 基本命令
```shell
# 启动
pnpm dev

#根目录安装
pnpm add webpack -w

# 给packages/项目 安装 依赖 到 dependencies
pnpm --filter 项目 add 依赖 -S

#  给packages/项目 安装 依赖 到 devDependencies
pnpm -F 项目 add 依赖 -D

# 删除子包依赖
pnpm --filter 项目 rm 依赖
```
