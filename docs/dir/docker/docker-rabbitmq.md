# [Docker安装RabbitMQ](#docker安装rabbitmq)

## [查看仓库里的RabbitMQ](#查看仓库里的rabbitmq)

```
#搜索可安装的rabbitmq镜像
docker search rabbitmq
```

## [拉取RabbitMQ](#拉取rabbitmq)

```
#拉取指定版本的镜像，建议指定版本，最新的不太好控制
docker pull rabbitmq:3.8.7
```

这里是直接安装最新的，如果需要安装其他版本在rabbitmq后面跟上版本号即可

## [启动RabbitMQ](#启动rabbitmq)

```
docker run -d --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq
```

## [安装插件](#安装插件)

```
先执行docker ps 拿到当前的镜像ID
进入容器
安装插件
ctrl+p+q退出当前容器
docker ps 
docker exec -it 镜像ID /bin/bash
rabbitmq-plugins enable rabbitmq_management
```

## [访问验证](#访问验证)