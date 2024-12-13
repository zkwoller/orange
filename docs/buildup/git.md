---
group: 基础
order: 5
toc: content
---
# git

C:\Users\zk767\AppData\Roaming\npm  
[git]((./README.md))



+ 控制面板==>用户账户==>管理Windows凭证==>选择相应的地址可进行修改账号和密码
+ github username:`zkwoller` password:`zhang@0622`
+ npmjs username:`zkwoller` password:`zhangkun1357`



清除远程分支：`git fetch -p`

清除本地缓存分支：`git branch | grep -v 'master' | xargs git branch -D`

删除本地所有与远程仓库同步分支（本地修改过未提交的不会删除）：`git branch |xargs git branch -d`

本地分支带有2017的都会被删除：`git branch |grep "2017"|xargs git branch -d`  

`git clone url`

`git checkout -b dev`

`git add [.] | [dir] | [file]`

`git commit [file] -m [message]`

`git commit -amend -m [message]`  

`git status`  查看当前工作区暂存区变动

`git status -s`  查看当前工作区暂存区变动，概要信息

`git status --show-stash` 查询工作区中是否有stash（暂存的文件）

`git log` 查看提交历史

`git reflog` 可查看修改数据（包括git reset 的回退记录）

`git log --oneline` 以精简模式显示查看提交历史

`git log -p <file>` 查看指定文件的提交历史

`git blame <file>` 一列表方式查看指定文件的提交历史

`git diff` 显示暂存区和工作区的差异

`git diff filepath filepath`路径文件中，工作区与暂存区的比较差异

`git diff HEAD filepath` 工作区与HEAD ( 当前工作分支)的比较差异

`git diff branchName filepath`当前分支的文件与branchName分支的文件的比较差异

`git diff commitId filepath` 与某一次提交的比较差异

`git pull`  拉取远程仓库所有分支更新并合并到本地分支。

`git pull origin master` 将远程master分支合并到当前本地分支

`git pull origin master:master` 将远程master分支合并到当前本地master分支，冒号后面表示本地分支

`git fetch --all` 拉取所有远端的最新代码

`git fetch origin master` 拉取远程最新master分支代码

`git push origin master` 将本地分支的更新全部推送到远程仓库master分支。

`git push origin -d <branchname>`删除远程branchname分支

`git push --tags` 推送所有标签

`git checkout -b dev2`  新建一个分支，并且切换到新的分支dev2

`git branch dev2` 新建一个分支，但是仍停留在原来分支

`git branch`    查看本地所有的分支

`git branch -r`  查看所有远程的分支

`git branch -a`  查看所有远程分支和本地分支

`git branch -D <branchname>`  删除本地branchname分支

`git merge master`  在当前分支上合并master分支过来

`git merge --no-ff origin/dev`  在当前分支上合并远程分支dev

`git merge --abort` 终止本次merge，并回到merge前的状态

`git checkout [file]` 丢弃某个文件file

`git checkout .`  丢弃所有文件

`git reset HEAD --file`  
回退暂存区里的某个文件，回退到当前版本工作区状态

`git reset –-soft` 目标版本号 可以把版本库上的提交回退到暂存区，修改记录保留

`git reset –-mixed` 目标版本号 可以把版本库上的提交回退到工作区，修改记录保留

`git reset –-hard`  可以把版本库上的提交彻底回退，修改的记录全部revert。

`git reset HEAD file` 取消暂存

`git checkout file` 撤销修改

`git log` 获取到想要回退的commit_id  
`git reset --hard commit_id`  想回到过去，回到过去的commit_id

代码已经push到远程仓库回退

`git log`

`git reset --hard commit_id`

`git push origin HEAD --force`

如果代码已经推送到远程的话，还可以考虑revert回滚

`git log`  得到你需要回退一次提交的commit id

`git revert -n <commit_id>`  撤销指定的版本，撤销也会作为一次提交进行保存

`git tag` 列出所有tag

`git tag [tag]` 新建一个tag在当前commit

`git tag [tag] [commit]` 新建一个tag在指定commit

`git tag -d [tag]` 删除本地tag

`git push origin [tag]` 推送tag到远程

`git show [tag]` 查看tag

`git checkout -b [branch] [tag]` 新建一个分支，指向某个tag

`git stash`  把当前的工作隐藏起来 等以后恢复现场后继续工作

`gitb stash apply` 还原

`git stash list` 显示保存的工作进度列表

`git stash pop stash@{num}` 恢复工作进度到工作区

`git stash show`：显示做了哪些改动

`git stash drop stash@{num}` ：删除一条保存的工作进度

`git stash clear` 删除所有缓存的stash。

`git reflog` 显示当前分支的最近几次提交

`git blame filepath`

`git blame` 记录了某个文件的更改历史和更改人

`git remote`   查看关联的远程仓库的名称

`git remote add 远程别名 url`   添加一个远程仓库

`git fetch 远程别名`   从远端库获取

`git checkout -b 分支名 地址`   从远端库获取

`git remote show [remote]` 显示某个远程仓库的信息

`git remote add origin-qqzx http://gitlab2.cspiretech.com/gep/web-qqdz-gov-pc-frame.git`

`git fetch origin-qqzx`

`git checkout -b qqzx-develop origin-qqzx/develop`

`git branch --set-upstream-to=origin-qqzx/develop qqzx-develop`

获取git 密钥  
`ssh-keygen -t rsa -C "767405372@qq.com"`

SHA256:qjZIJLLMWYFs8zCGfRvohL4NFQzCD8PKPwW43vfNNbY 767405372@qq.com

`cat ~/.ssh/id_rsa.pub`

