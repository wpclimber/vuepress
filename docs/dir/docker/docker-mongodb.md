# Docker安装MongoDb

查询mongo镜像

```
docker search mongo
```

拉取镜像

```
docker pull mongo
```

运行容器

```
#/root/Downloads/monogodb/db是客户机mongodb的挂载目录
docker run --name mongodb -p 27017:27017 -v /root/Downloads/monogodb/db:/data/db -d mongo:latest
```

#### 1.以 admin 用户身份进入mongo ：

```
docker exec -it  mongodb  mongo admin
```

#### 2.创建一个 admin 管理员账号 ：

```
db.createUser({ user: 'admin', pwd: 'admin123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
```

#### 3.对 admin 用户 进行身份认证

```
db.auth("admin","admin123456");
```

#### 4.创建 用户、密码和数据库

用户zero
密码123456
数据库app

```
db.createUser({ user: 'zero', pwd: '123456', roles: [ { role: "readWrite", db: "app" } ] });
```

#### 5.对 zero 进行身份认证

```
db.auth("zero","123456");
```

#### 6.切换数据库

```
use app
```

#### 7.添加数据

向表test中添加数据

```
db.test.save({name:"zhangsan"});
```

#### 8.查询数据

```
db.test.find();
```