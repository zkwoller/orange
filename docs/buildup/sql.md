---
group: 基础
order: 7
toc: content
---
# sql

**<font style="color:rgb(18, 18, 18);">SQL语句，根据其功能，主要分为四类：DDL、DML、DQL、DCL。</font>**

| **<font style="color:rgb(18, 18, 18);">分类</font>** | **<font style="color:rgb(18, 18, 18);">全称</font>** | **<font style="color:rgb(18, 18, 18);">说明</font>** |
| :--- | :--- | :--- |
| <font style="color:rgb(18, 18, 18);">DDL</font> | <font style="color:rgb(18, 18, 18);">Data Definition Language</font> | <font style="color:rgb(18, 18, 18);">数据定义语言，用来定义数据对象(数据库，表，字段)</font> |
| <font style="color:rgb(18, 18, 18);">DML</font> | <font style="color:rgb(18, 18, 18);">Data Manipulation Language</font> | <font style="color:rgb(18, 18, 18);">数据操作语言，用来对数据库表中的数据进行增删改</font> |
| <font style="color:rgb(18, 18, 18);">DQL</font> | <font style="color:rgb(18, 18, 18);">Data Query Language</font> | <font style="color:rgb(18, 18, 18);">数据查询语言，用来查询数据库中表的记录</font> |
| <font style="color:rgb(18, 18, 18);">DCL</font> | <font style="color:rgb(18, 18, 18);">Data Control Language</font> | <font style="color:rgb(18, 18, 18);">数据控制语言，用来创建数据库用户、控制数据库的访问权限</font> |


## DDL—数据定义语言(create，alter，drop)


数据库连接：`mysql -h 127.0.0.1 -u root -p`



```plain
  -A 不预读数据库信息，提高连接和切换数据库速度,使用--disable-auto-rehash代替
  --default-character-set  使用的默认字符集
  -e 执行命令并退出
  -h 主机地址
  -p 连接到服务器时使用的密码
  -P 连接的端口号
```



创建数据库: `create database test1 ;`



查看数据库:`show databases;`



选择数据库:`use mysql;`



删除数据库:`drop database test1;`



创建表:`create table emp( ename varchar(20), hiredate date, sal decimal(10,2), deptno int(2) );`



查看表定义:`desc emp;`



查看创建表SQL:`show create table emp ;`



更新表名:`alter table emp rename users;`



删除表:`drop table emp;`



修改表字段:`alter table emp modify ename varchar(30);`



增加表字段:`alter table emp add column age int(3);`



修改表字段:`alter table emp change age age int(4);`



删除表字段:`alter table emp drop column age;`



change和modify:



```plain
  1 前者可以修改列名称,后者不能. 
  2 change需要写两次列名称.
```



字段增加修改 add/change/modify/ 添加顺序:



```plain
  1 add 增加在表尾.
  2 change/modify 不该表字段位置.
  3 修改字段可以带上以下参数进行位置调整(frist/after column_name);

  alter table emp change age age int(2) after ename;
  alter table emp change age age int(3) first;
```



## DML—数据操纵语言(delete，update，insert)


插入记录:



```javascript
  //指定字段,
  //自增,默认值等字段可以不用列出来,没有默认值的为自动设置为NULL
  insert into emp (ename,hiredate,sal,deptno) values ('jack','2000-01-01','2000',1);

  //可以不指定字段,但要一一对应
  insert into emp values ('lisa','2010-01-01','8000',2);
```



批量记录:



```javascript
  insert into emp values ('jack chen','2011-01-01','18000',2),('andy lao','2013-01-01','18000',2);
```



更新记录:



```javascript
  update emp set sal="7000.00" where ename="jack";

  update emp e,dept d set e.sal="10000",d.deptname=e.ename where e.deptno=d.deptno and e.ename="lisa";
```



删除记录:



```javascript
  //请仔细检查where条件,慎重
  delete from emp where ename='jack';
```

## <font style="color:rgb(18, 18, 18);">DQL—数据查询语言，用来查询数据库中表的记录</font>
+ **<font style="color:rgb(18, 18, 18);">基本查询（不带任何条件）</font>**
+ **<font style="color:rgb(18, 18, 18);">条件查询（WHERE）</font>**
+ **<font style="color:rgb(18, 18, 18);">聚合函数（count、max、min、avg、sum）</font>**
+ **<font style="color:rgb(18, 18, 18);">分组查询（group by）</font>**
+ **<font style="color:rgb(18, 18, 18);">排序查询（order by）</font>**
+ **<font style="color:rgb(18, 18, 18);">分页查询（limit）</font>**



查看记录:



```javascript
  //查看所有字段
  select * from emp;

  //查询不重复记录
  select distinct(deptno) from emp ;
  select distinct(deptno),emp.* from emp ;

  //条件查询
  //比较运算符: > < >= <= <> != ...
  //逻辑运算符: and or ...
  select * from emp where sal="18000" and deptno=2;
```



排序



```javascript
  //desc降序,asc 升序(默认)
  select * from emp order by deptno ;
  select * from emp order by deptno asc;
  select * from emp order by deptno desc,sal desc;
```



限制记录数:



```javascript
  select * from emp limit 1;
  select * from emp limit 100,10;
  select * from emp order by deptno desc,sal desc limit 1;
```



聚合:



```javascript
  //函数:count():记录数 / sum(总和); / max():最大值 / min():最小值
  select count(id) from emp ;
  select sum(sal) from emp ;
  select max(sal) from emp ;
  select min(sal) from emp ;
```



分组group by:



```javascript
  //分组统计
  select count(deptno) as count from emp group by deptno;
  select count(deptno) as count,deptno from emp group by deptno;
  select count(deptno) as count,deptno,emp.* from emp group by deptno;
```



对分组结果二次过滤 having:



```javascript
  select count(deptno) as count,deptno from emp group by deptno having count > 2;
```



对分组结果二次汇总:with rollup



```javascript
  select count(sal),emp.*  from emp group by sal, deptno with rollup ;
```



内连接:关联表都要有匹配记录



```javascript
  select * from emp as e,dept as d where e.deptno=d.deptno;
  select * from emp as e inner join dept as d on e.deptno=d.deptno;
```



左外连接:包含左表的全部记录和右表不存在的记录



```javascript
  select * from emp as e left join dept as d on e.deptno=d.deptno;
```



右外连接:包含右表的全部记录和左表不存在的记录



```javascript
  select * from emp as e right join dept as d on e.deptno=d.deptno;
```



子查询:



```javascript
  //=, !=
  select * from emp where deptno = (select deptno from dept where deptname="技术部");
  select * from emp where deptno != (select deptno from dept where deptname="技术部");

  //in, not in 
  //当需要使用里面的结果集的时候必须用in(); 
  select * from emp where deptno in (select deptno from dept where deptname="技术部");
  select * from emp where deptno not in (select deptno from dept where deptname="技术部");

  //exists , not exists
  //当需要判断后面的查询结果是否存在时使用exists();
  select * from emp where exists (select deptno from dept where deptno > 5);
  select * from emp where not exists (select deptno from dept where deptno > 5);
```



记录联合:



```javascript
  //union:返回去重之后的结果
  select ename from emp union select ename from emp;

  //union all:返回所有结果
  select ename from emp union all select ename from emp;
```



  


## DCL—数据控制语言(grant，revoke)


### <font style="color:rgb(18, 18, 18);"> 管理用户</font>
#### <font style="color:rgb(18, 18, 18);"> 查询用户</font>
```sql
select * from mysql.user;
```

**<font style="color:rgb(18, 18, 18);">其中Host代表当前访问的主机，如果为localhost，仅代表只能够在当前本机访问，是不可以远程访问的。User代表的是访问该数据库的用户名。在Mysql中需要通过Host和User来唯一标识一个用户。</font>**

#### <font style="color:rgb(18, 18, 18);"> 创建用户</font>
```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
```

**<font style="color:rgb(18, 18, 18);">案例1：创建一个名为"yun3k"的用户，设置密码为”123456”，并且只能本地访问。</font>**

```sql
CREATE USER 'yun3k'@'localhost' IDENTIFIED BY '123456';
```

**<font style="color:rgb(18, 18, 18);">案例2：创建一个名为”yun3k_com”的用户，可以在任意主机访问该数据库</font>**

```sql
CREATE USER 'yun3k_com'@'%' IDENTIFIED BY '123456';
```

#### <font style="color:rgb(18, 18, 18);">修改用户密码</font>
```sql
ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';
```

**<font style="color:rgb(18, 18, 18);">案例1：修改”yun3k”的用户密码为”654321”。</font>**

```sql
ALTER USER 'yun3k'@'localhost' IDENTIFIED WITH mysql_native_password BY '654321';
```

#### <font style="color:rgb(18, 18, 18);">删除用户</font>
```sql
DROP USER '用户名'@'主机名' ;
```

**<font style="color:rgb(18, 18, 18);">案例1：删除”yun3k”用户。</font>**

```sql
DROP USER 'yun3k'@'localhost';
```

**<font style="color:rgb(18, 18, 18);">注：</font>**

+ **<font style="color:rgb(18, 18, 18);">在Mysql中需要通过用户名@主机名的方式来唯一标识一个用户。</font>**
+ **<font style="color:rgb(18, 18, 18);">主机名可以使用%通配</font>**

### <font style="color:rgb(18, 18, 18);">权限控制</font>
**<font style="color:rgb(18, 18, 18);">常用权限如下：</font>**

| **<font style="color:rgb(18, 18, 18);">权限</font>** | **<font style="color:rgb(18, 18, 18);">说明</font>** |
| :--- | :--- |
| <font style="color:rgb(18, 18, 18);">ALL，ALL PRIVILEGES</font> | <font style="color:rgb(18, 18, 18);">所有权限</font> |
| <font style="color:rgb(18, 18, 18);">SELECT</font> | <font style="color:rgb(18, 18, 18);">查询数据</font> |
| <font style="color:rgb(18, 18, 18);">INSERT</font> | <font style="color:rgb(18, 18, 18);">插入数据</font> |
| <font style="color:rgb(18, 18, 18);">UPDATE</font> | <font style="color:rgb(18, 18, 18);">修改数据</font> |
| <font style="color:rgb(18, 18, 18);">DELETE</font> | <font style="color:rgb(18, 18, 18);">删除数据</font> |
| <font style="color:rgb(18, 18, 18);">ALTER</font> | <font style="color:rgb(18, 18, 18);">修改表</font> |
| <font style="color:rgb(18, 18, 18);">DROP</font> | <font style="color:rgb(18, 18, 18);">删除数据库/表</font> |
| <font style="color:rgb(18, 18, 18);">CREATE</font> | <font style="color:rgb(18, 18, 18);">创建数据库/表</font> |


#### <font style="color:rgb(18, 18, 18);">查询权限</font>
```sql
SHOW GRANTS FOR '用户名'@'主机名' ;
```

**<font style="color:rgb(18, 18, 18);">案例1：查询'yun3k_com'@'%'用户的权限</font>**

```sql
SHOW GRANTS FOR 'yun3k_com'@'%' ;
```

#### <font style="color:rgb(18, 18, 18);">授予权限</font>
```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
```

**<font style="color:rgb(18, 18, 18);">案例1：授予'yun3k_com'@'%'用户yun3k数据库所有表的所有操作权限</font>**

```sql
grant all on yun3k.* to 'yun3k_com'@'%';
```

#### <font style="color:rgb(18, 18, 18);">撤销权限</font>
```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

**<font style="color:rgb(18, 18, 18);">案例1：撤销'yun3k_com'@'%'用户的yun3k数据库的所有权限</font>**

```sql
revoke all on yun3k.* from 'yun3k_com'@'%';
```

**<font style="color:rgb(18, 18, 18);">注：</font>**

+ **<font style="color:rgb(18, 18, 18);">多个权限之间，使用逗号分隔</font>**
+ **<font style="color:rgb(18, 18, 18);">授权事时，数据库名和表名可以使用*进行通配，代表所有</font>**

添加权限:



```javascript
  grant select,insert on test.* to 'db_user_1'@'localhost'  identified by '123456';
  flush privileges;
```



回收权限:



```javascript
  revoke insert on test.* from 'db_user_1'@'localhost';
```



`use database` 选择数据库



`set name utf8` 设置使用的字符集



事务

+  当一个业务逻辑需要多个sql完成时，如果其中某条sql出错希望整个操作退回 
+  事务的四大特性 
    1. 原子性：操作不可分割，要么全部完成，要么都不执行
    2. 一致性：执行结果语按某一顺序执行结果一致
    3. 隔离性：不受其他事务干扰，
    4. 持久性：对于已提交事务，系统必须保证该事务对数据库的改变不被丢失；
+  要求：表必须是innodb或者bdb类型，才可以对此表使用事务 
+  查看表创建语句`show create table students` 
+  修改表的类型 `alter table 表名 engine = innodb` 
+  事务语句 



```javascript
  bengin //开启
  commit //提交
  rollback //回滚
```

