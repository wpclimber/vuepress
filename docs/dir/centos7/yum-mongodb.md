# yum安装mongodb


::: tip 参考
官方安装说明 https://www.mongodb.com/docs/v5.0/tutorial/install-mongodb-on-red-hat/

https://blog.csdn.net/weixin_45351743/article/details/114370670
:::




## 配置MongoDB的[yum源](https://so.csdn.net/so/search?q=yum源&spm=1001.2101.3001.7020)

## 创建yum源文件

~~~shell
cd /etc/yum.repos.d
vim mongodb-org-5.0.repo

~~~

## 添加下载配置文件（这里使用阿里云的源），保存退出

~~~shell
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
~~~


## 更新yum源

```shell
yum update -y
```



## 下载mongodb

~~~shell
sudo yum install -y mongodb-org
~~~

## 查看安装目录

```bash
whereis mongodb
```



## 配置MongoDB

###  1、没有账户密码的配置

#### 修改配置文件
bindIp: 172.0.0.1 改为 `bindIp: 0.0.0.0`（注意冒号与ip之间需要一个空格），保存退出

```bash
vim /etc/mongod.conf
```

#### 开放端口，并重启防火墙端口

```bash
firewall-cmd --zone=public --add-port=27017/tcp --permanent
firewall-cmd --reload
```

#### 开启mongodb服务

```bash
systemctl start mongod
```



### 2、有账户密码的配置

#### 进入数据库

~~~shell
mongo
~~~

#### 切换admin数据库

~~~shell
use admin
~~~

#### 创建用户与密码

~~~shell
db.createUser({user:"mongo",pwd:"mongo",roles:[{role:"userAdminAnyDatabase",db:"admin"}]});

Successfully added user: {
        "user" : "mongo",
        "roles" : [
                {
                        "role" : "userAdminAnyDatabase",
                        "db" : "admin"
                }
        ]
}
~~~

#### 测试创建的用户，添加完成

~~~shell
db.auth("mongo","mongo")
~~~

