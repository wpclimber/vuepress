# 硬装RabbitMQ



## 1、安装Erlang

~~~shell
#第一步安装源
curl -s https://packagecloud.io/install/repositories/rabbitmq/erlang/script.rpm.sh | sudo bash
#第二部安装erlang
yum install erlang
#第三步 查看erlang版本号,在命令行直接输入erl
erl
#结果
Erlang/OTP 23 [erts-11.2.2.10] [source] [64-bit] [smp:4:4] [ds:4:4:10] [async-threads:1] [hipe]
Eshell V11.2.2.10  (abort with ^G)
~~~



## 2、安装RabbitMQ

~~~shell
#第一步 先导入两个key
rpm --import https://packagecloud.io/rabbitmq/rabbitmq-server/gpgkey
rpm --import https://packagecloud.io/gpg.key
#第二步
curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.rpm.sh | sudo bash

#第三步,如果连不上把https改成http，或者手动下载上传至服务器
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.5/rabbitmq-server-3.8.5-1.el8.noarch.rpm

#第四步
rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc

#第五步 安装RabbitMQ依赖
yum -y install epel-release
yum -y install socat

#第六步
rpm -ivh rabbitmq-server-3.8.5-1.el8.noarch.rpm

#第七步 启用管理平台插件，启用插件后，可以可视化管理RabbitMQ
rabbitmq-plugins enable rabbitmq_management

#第八步 启动应用
systemctl start rabbitmq-server

如果报以下错误：
ERROR: epmd error for host “192”:badarg (unknown POSIX error)
解决办法：
vi /etc/rabbitmq/rabbitmq-env.conf
在文件里面添加这一行：NODENAME=rabbit@localhost，保存
(注意：rabbitmq-env.conf这个文件没有，打开之后自动创建)

#内部访问以下rabbitmq 可视化web地址
curl http://localhost:15672
~~~



### 3.防火墙放开端口

~~~shell
#5672 ：这是rabbitMQ的端口号；
#15672 ：这是RabbitMQ的web页面的端口号；
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --add-port=15672/tcp --permanent
firewall-cmd --reload

~~~



### 4.添加新用户(默认guest/guest只能本地访问) 

~~~shell
#添加新用户admin/admin
rabbitmqctl add_user admin admin 
#设置为管理员和用户权限
rabbitmqctl set_user_tags admin administrator 
#授权远程访问
rabbitmqctl  set_permissions -p "/" admin '.*' '.*' '.*' 
#查看用户权限
rabbitmqctl list_user_permissions admin
#重启服务
systemctl restart rabbitmq-server
~~~

