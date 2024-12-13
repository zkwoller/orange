---
group: 基础
order: 2
toc: content
---
# window

## windows系统如何给命令起别名

比如Windows命令行cmd中没有`ls`命令只有`dir`，类似Linus中设置别名alias。
另外，若可以设置的别名，保存别名的文件位置在哪？
CMD设置别名是用doskey命令。
doskey ls=dir $* 

这个命令只对当前对话有效，如果想打开cmd就能使用的话修改一下注册表，使得每次启动cmd都先运行一下你的脚本就行。

把这个保存为env.cmd或者env.bat（自己随便命个名啦。）然后在注册表HKEY_CURRENT_USER\Software\Microsoft\Command Processor下面加一项AutoRun，把值设为你的脚本路径。
懒得找的话，把下面AutoRun的路径改成你自己的路径，保存为.reg文件双击运行就行。

Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Command Processor]
"AutoRun"="%USERPROFILE%\\env.cmd"


- cd: 轻松更改目录

- dir: 列出目录内容  dir [drive:][path][filename] [/a[[:]attributes]] [/o[[:]sortorder]] [/t[[:]timefield]] [/s] [/b] [/l] [/n] [/x] [/c] [/4]

- md/mkdir: 创建新目录 md [drive:]path

- rd/rmdir: 删除目录 rd [/s] [/q] [drive:]path

- del: 删除一个或多个文件 del [/p] [/f] [/s] [/q] [/a[[:]attributes]] names

- copy: 将文件复制到另一个位置  copy [/y | /-y] [source] [destination]

- move: 将文件移动到新位置

- type: 显示文本文件的内容

- systeminfo: 查看系统信息

- tree: 显示目录结构

- ren / rename 重命名文件和目录 ren [drive:][path] filename1 filename2

- shutdown 关机、重启或注销计算机。shutdown [/i | /l | /s | /r | /g | /a | /p | /h | /e | /m \\computer [/t xxx] [/c "comment"] [/f] [/d [p|u:]xx:yy]]

- color help: 获取颜色的帮助

- ipconfig /all: 所有的网络设备的IP信息

- start xx: 打开网站

- attrib [+/-]shr xx: 隐藏文件夹

- tree: 制动生成目录树

- compmgmt.msc: 计算机管理

- calc: 启动计算器

- mmc: 打开控制台

- utilman: 辅助工具管理器

- ping ip(或域名):  向对方主机发送默认大小为32字节的数据

- where vue: 查看命令所在目录

- path: 查看环境变量

- type: 文件名 命令行打开文件 显示文本文件的内容


- md/rd 文件夹名 mkdir/rmdir 文件夹名 创建/删除文件夹(rd只能删除空文件夹 /s子文件 /q 安静模式)

- mklink /J D:\target-dir E:\src-dir: 为文件、文件夹创建软链接
