# micro-app
微前端应用


#### 启动项目
```shell
pnpm dev
```
##### 根目录安装
```shell
pnpm add webpack -w
```
##### 给packages/vue2 安装 vue2.x版本
```shell
pnpm --filter vue2 add vue@2.6.14 -S

```
##### 给packages/vue3 安装 vue3.x版本
```shell
pnpm --filter vue3 add vue@3.3.9 -S
```

#### 删除子包依赖
```shell
pnpm --filter vue2 rm vue
```
