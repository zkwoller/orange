---
nav:
  title: 积累
  order: 2
group: 基础
order: 1
toc: content
---
# mac

## mac终端操作

### 1. 操作终端的常用命令
+ 快速打开：command+空格，输入ter回车
+ 多窗口：command+N（光标在终端执行此操作）
+ 多个标签页： command+T（光标在终端执行此操作）

### 2. 文件操作
| 命令 | 功能描述 | 举例或备注 |
| :--- | ---: | ---: |
| cd | 进入指定文件夹路径 | cd ～/Desktop |
| pwd | 显示当前目录路径 | /users |
| ls | 显示当前目录下内容 | /users |
| ls -la | 显示当前目录下的详细内容 | /users |
| ls -A | 显示当前目录下的详细内容 | 含（.）开头的文件 |
| mkdir | 创建目录 | mkdir dir_name |
| touch file.format | 创建指定格式的文件 | |
| mvdir | 移除目录 | mvdir dir1 dir2 |
| mv | 移除目录 | mv dir1 dir2 |
| rm/rmdir | 删除文件或空目录 | rm dir1 dir2 |
| rm -rf dir | 删除一个非空目录 | rm -rf dir |
| cp | 复制文件或目录 | cp dir |
| file | 显示文件类型 | file file_name |
| find | 使用匹配表达式查找文件 | find *.file_format |
| open | 使用默认程序打开文件 | open file_name |
| cat | 显示或链接文件内容 | cat file |
| ln | 为文件创建链接 | ln -s file1 file2 s表示软连接 |
| head | 显示文件的最初几行 | head -20 file_name |
| tail | 显示文件的最后几行 | tail -10 file_name |
| paste | 横向拼接文件内容 | paste file1 file2 |
| diff | 比较并显示两个文件的内容差异 | diff file1 file2 |
| wc | 统计文件的字符数、词数和行数 | wc file_name |
| uniq | 去掉文件中的重复行 | uniq file_name |
| grep | 通过简单正则表达式搜索文件 | |

## mac环境变量配置

<font style="color:rgb(77, 77, 77);">配置环境，在终端通过vim 来编辑.zshrc 配置文件</font>

```plsql
zhangkun@B-PCFVLVCF-2029 ~ % sudo vim ~/.zshrc
```

<font style="color:rgb(77, 77, 77);">点击 i 键，进入编辑模式，在配置文件中添加如下路径：</font>

```plsql
export PATH=$PATH:/usr/local/mysql/bin

export NODE_OPTIONS="--max-old-space-size=10240"

```

<font style="color:rgb(77, 77, 77);">然后按 esc 退出编辑模式，输入 :wq 保存退出</font>

<font style="color:rgb(77, 77, 77);">接着在终端执行source ~/.zshrc 使配置生效</font>

```plsql
zhangkun@B-PCFVLVCF-2029 ~ % source ~/.zshrc
```

<font style="color:rgb(77, 77, 77);">此时在终端查看 mysql 版本可以看到已经可以查到我们安装的版本了，说明环境已经配好</font>

```plsql
zhangkun@B-PCFVLVCF-2029 ~ % mysql --version
mysql  Ver 8.0.31 for macos12 on x86_64 (MySQL Community Server - GPL)
```
## macOS安装mysql压缩包
1. 下载mysql-**-x86_64.tar.gz,并将该压缩包移动至/usr/local目录下

```plsql
 sudo mv mysql-******-x86_64 /usr/local/mysql
```
2. 更改 mysql 安装目录所属用户与用户组,调整目录权限

```plain
# cd /usr/local 
# sudo chown -R root:wheel mysql
```

3. 初始化数据库 (记录初始密码 root@localhost: 7YdUpnGfbH/t)

```plain
# cd /usr/local/mysql 
# sudo bin/mysqld --initialize --user=mysql
```
4. 启动mysql数据库，并检测mysql是否启动成功

```plain
# cd /usr/local/mysql 
# 启动
# sudo support-files/mysql.server start
# 重启
# sudo support-files/mysql.server restart
# 停止
# sudo support-files/mysql.server stop
#  检查 MySQL 运行状态
# sudo support-files/mysql.server status
```
5. 修改mysql初始密码

```plain
# cd /usr/local/mysql
# 该命令会让你输入初始密码，接着输入两次新密码，则密码就修改成功为你的新密码
# /bin/mysqladmin -u root -p password
```
6. 利用mysql自带客户端连接mysql

```plain
# bin/mysql -u root -p

#mysql> show databases;
#mysql> use sys;
#mysql> show tables;
# 退出mysql
#mysql> > exit
```

7. 安装好后，新建库表，发现不能存入汉字。说明，mysql在安装的时候，没有设置数据库编码为utf-8  
链接上mysql，执行如下命令，查看数据库编码

```plain
#mysql> show variables like 'character%';
```

发现编码不对，可以通过创建配置文件，重启mysql服务即可；

+ 目标：将 mysql 的 character_set_server 的值由 latin1 更改为 utf8

暂时性：SET character_set_server=utf8 即可，一次性。

永久性：需要更改配置文件，见第2步骤。

+ mysql 5.7.21 的 support-files里没有配置文件。  
新建my.cnf。可以建文本文件后直接改扩展名为cnf。用Xcode或subline打开为佳。内容如下：


```plain
[mysqld]
#设置3306端口
port = 3306
#设置mysql客户端默认字符集
character-set-server=utf8
# 设置mysql的安装目录
basedir=/usr/local/mysql
# 设置mysql数据库的数据的存放目录
datadir=/usr/local/mysql/data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
 
[client]
default-character-set=utf8
 
[mysql]
default-character-set=utf8
```
+ 复制 my.cnf 到 /private/etc/

```javascript
sudo cp /usr/local/mysql/support-files/my.cnf /private/etc/my.cnf
```

注意：其实 /etc 是 /private/etc 的一个替身，复制到两者皆可。

+ 重启 mysql 服务器，进入mysql

```plain
mysql>show variables like '%char%';
```

+ 验证结果
```plain
#mysql> show variables like 'character%';
```
## macOS配置安装redis

1. 下载

+ 打开官网：[https://redis.io/](https://redis.io/)
+ 选择下载你要的版本压缩包

2.  解压  
`tar zxvf Downloads/redis-4.0.1.tar.gz` 
3.  安装  
打开终端，`cd ～`  
将下载的压缩包拷贝到local目录下：`sudo mv Downloads/redis-4.0.1.tar.gz /usr/local/redis`  （注意gz后有空格）  
`cd /usr/local/redis` 
4.  编译测试  
`sudo make test` 
5.  编译安装  
`sudo make install` 
6.  启动Redis  
`redis-server` 

## 配置
+ 在redis目录下建立bin，etc，db三个目录

```plain
sudo mkdir  /usr/local/redis/bin
sudo mkdir  /usr/local/redis/etc
sudo mkdir  /usr/local/redis/db
```
+ 把/usr/local/redis/src目录下的mkreleasehdr.sh，redis-benchmark， redis-check-rdb， redis-cli， redis-server拷贝到bin目录

```plain
cp /usr/local/redis/src/mkreleasehdr.sh .
cp /usr/local/redis/src/redis-benchmark .
cp /usr/local/redis/src/redis-check-rdb .
cp /usr/local/redis/src/redis-cli .
cp /usr/local/redis/src/redis-server .
```
+ 拷贝 redis.conf 到 /usr/local/redis/etc下

```plain
cp /usr/local/redis/redis.conf /usr/local/redis/etc
```

+ 修改redis.conf

```plain
#修改为守护模式
daemonize yes
#设置进程锁文件
pidfile /usr/local/redis-3.2.8/redis.pid
#端口
port 6379
#客户端超时时间
timeout 300
#日志级别
loglevel debug
#日志文件位置
logfile /usr/local/redis-3.2.8/log-redis.log
#设置数据库的数量，默认数据库为0，可以使用SELECT <dbid>命令在连接上指定数据库id
databases 16
##指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合
#save <seconds> <changes>
#Redis默认配置文件中提供了三个条件：
save 900 1
save 300 10
save 60 10000
#指定存储至本地数据库时是否压缩数据，默认为yes，Redis采用LZF压缩，如果为了节省CPU时间，
#可以关闭该#选项，但会导致数据库文件变的巨大
rdbcompression yes
#指定本地数据库文件名
dbfilename dump.rdb
#指定本地数据库路径
dir /usr/local/redis-3.2.8/db/
#指定是否在每次更新操作后进行日志记录，Redis在默认情况下是异步的把数据写入磁盘，如果不开启，可能
#会在断电时导致一段时间内的数据丢失。因为 redis本身同步数据文件是按上面save条件来同步的，所以有
#的数据会在一段时间内只存在于内存中
appendonly no
#指定更新日志条件，共有3个可选值：
#no：表示等操作系统进行数据缓存同步到磁盘（快）
#always：表示每次更新操作后手动调用fsync()将数据写到磁盘（慢，安全）
#everysec：表示每秒同步一次（折衷，默认值）
appendfsync everysec
```
+ 启动服务

`./bin/redis-server etc/redis.conf`

+ 查看日志

`tail -f log-redis.log`

+ 打开redis客户端

`./bin/redis-cli`

+ 执行redis命令

```ruby
# set superman tao
# OK
# get superman
# tao
```

