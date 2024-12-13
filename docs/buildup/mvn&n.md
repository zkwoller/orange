---
group: 基础
order: 4
toc: content
---
# nvm&n

## nvm命令行操作命令

1：nvm list 是查找本电脑上所有的node版本

- nvm list 查看已经安装的版本

- nvm list installed 查看已经安装的版本

- nvm list available 查看网络可以安装的版本

2：nvm install 安装最新版本nvm

3：nvm use <version> ## 切换使用指定的版本node

4：nvm ls 列出所有版本

5：nvm current显示当前版本

6：nvm alias <name> <version> ## 给不同的版本号添加别名

7：nvm unalias <name> ## 删除已定义的别名

8：nvm reinstall-packages <version> ## 在当前版本node环境下，重新全局安装指定版本号的npm包

9：nvm on 打开nodejs控制

10：nvm off 关闭nodejs控制

11：nvm proxy 查看设置与代理

12：nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/

　　nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror：如果不设置的话默认的是： https://github.com/npm/npm/archive/.

13：nvm uninstall <version> 卸载制定的版本

14：nvm use [version] [arch] 切换制定的node版本和位数

15：nvm root [path] 设置和查看root路径

16：nvm version 查看当前的版本

## n

n --version/-V  查看 n 版本

node --version/-v 查看 node 本地当前使用版本

n lsr/ls-remote [--all]  查看 node 远程版本 默认20个，--all展示所有

n [ls/list/--all] 查看 n 管理的 node 版本

n [install/i] <version> 安装指定版本

n lts/stable 安装稳定版本

n latest/current 安装最新版本

n auto 安装文件中对应 node 版本 [.n-node-version, .node-version, .nvmrc, or package.json]

n engine 安装 package.json 对应 node 版本

n boron/carbon 通过发布流的代码名 例如[ boron, carbon]

n uninstall 删除当前版本

n rm/- <version> 删除指定版本

n prune 删除除当前版本之外的所有版本

n run/use/as <version> [args...] 使用指定 node 版本

n exec <vers> <cmd> [args...] 先下载node和npm，使用修改过的PATH执行命令

输入 n 命令 通过上下方向键选择想要切换的版本后点击 Enter 键；
