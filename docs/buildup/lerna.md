---
group: 基础
order: 9
toc: content
---

# lerna

lerna 是一个优化基于git+npm的多package项目管理工具

> lerna 是架构优化的产物，项目复杂度提升后，就需要对项目进行架构优化，架构优化的主要目标都是提高效能
>

+ 优势 
    - 大幅减少重复操作
    - 提升操作的标准化

## 原生脚手架开发痛点分析
> package 越多管理越复杂
>

+  重复操作 
    - 多package本地link
    - 多package依赖安装
    - 多package单元测试
    - 多package代码提交
    - 多package代码发布
+  版本一致性 
    - 发布时版本一致性
    - 发布后相互依赖版本升级
+  lerna 开发脚手架流程 
    - 脚手架项目初始化  
`初始话npm项目`->`安装lerna`->`lerna init初始化项目`
    - 创建package  
`lerna create创建package`->`lerna add 安装依赖`->`lerna link 链接依赖`
    - 脚手架开发和测试  
`lerna exec 执行shell脚本`->`lerna run 执行npm 命令`->`lerna clean 清空依赖`->`lerna bootstrap重新依赖`
    - 脚手架发布上线  
`lerna version bump version` ->`lerna changed查看上版本以来所有变更`->`lerna diff 查看diff` -> `lerna publish项目发布`

```plain
  You must sign up for private packages
  
  这个当你的包名为@your-name/your-package时才会出现，原因是当包名以@your-name开头时，npm publish会默认发布为私有包，但是 npm 的私有包需要付费，所以需要添加如下参数进行发布:
  npm publish --access public
```
## Lerna命令
Lerna中的两个主要命令是`lerna bootstrap`和`lerna publish`。  
`lerna init` 初始化lerna库  
`lerna publish`   发布最新commit的修改  
`lerna publish <commit-id>` 发布指定commit-id的代码  
`lerna bootstrap` 为每个包安装依赖 链接相互依赖的库到具体的目录 执行 npm run prepublish 执行 npm run prepare  
`lerna list` 列举当前lerna 库包含的包  
`lerna changed` 显示自上次relase tag以来有修改的包， 选项通 list  
`lerna diff` 显示自上次relase tag以来有修改的包的差异， 执行 git diff  
`lerna exec` 在每个包目录下执行任意命令

```plain
$ lerna exec -- <command> [..args] # runs the command in all packages
$ lerna exec -- rm -rf ./node_modules
$ lerna exec -- protractor conf.js
$ lerna exec -- npm view \$LERNA_PACKAGE_NAME
$ lerna exec -- node \$LERNA_ROOT_PATH/scripts/some-script.js
```

`lerna run`  执行每个包package.json中的脚本命令  
`lerna add <package>[@version] [--dev] [--exact]` 添加一个包的版本为各个包的依赖  
`lerna clean` 删除各个包下的node_modules  
`lerna import` 导入指定git仓库的包作为lerna管理的包  
`lerna link` 链接互相引用的库  
`lerna create` 新建包  
`lerna info` 打印本地环境信息，特别是在提交bug报告时

```json
//默认是固定模式
{
  "version": "1.1.3",//当前库的版本
  "npmClient": "npm",//允许指定命令使用的client， 默认是 npm， 可以设置成 yarn
  "command": {
    "publish": {
      "ignoreChanges": [// 可以指定那些目录或者文件的变更不会被publish
        "ignored-file",
        "*.md"
      ],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",// 指定不受 bootstrap 命令影响的包
      "npmClientArgs": ["--no-package-lock"],  // 指定默认传给 lerna bootstrap 命令的参数    
      "scope":[] //指定那些包会受 lerna bootstrap 命令影响
    }
  },
  "packages": ["packages/*"]//指定包所在的目录
}
--independent
{
  "packages": [
    "packages/*"
  ],
  "version": "independent"
}
```

