# yum安装Redis


## 安装redis
~~~shell
#查看yum源可安装的redis版本
yum info redis
#执行安装命令
yum install redis -y
#3、 启动redis
systemctl start redis
#4、设置开机启动
systemctl enable redis redis
#查看redis进程
ps -aux | grep redis

#如下是redis服务地址
/usr/bin/redis-server
#redis配置文件地址
/etc/redis.conf
~~~



## 修改redis.conf配置文件

~~~shell
#将里面的daemonize no 改成yes,以后台进程方式启动redis
#修改daemonize为yes，即默认以后台程序方式运行（还记得前面手动使用&号强制后台运行吗）。
daemonize yes
#将protected-mode yes改为no
protected-mode no
#bind 127.0.0.1前面加上#  注释掉这一行，127.0.0.1限制只能本机访问
#给redis设置密码，尽可能的复杂写，不要出现root 123   等简单的密码
requirepass foobared
~~~



## 防火墙放行Redis的端口6379，让外网可以访问

~~~shell
#查看防火墙目前的放行端口列表
firewall-cmd --list-ports
#添加防火墙放行端口（permanent代表永久生效）
firewall-cmd --add-port=6379/tcp --permanent
#重新加载防火墙（添加完放行端口一定要重新加载防火墙）
firewall-cmd --reload
~~~



## 常用命令

~~~shell
#查看服务状态
systemctl status redis
#停止服务
systemctl stop redis
#重启服务
systemctl restart redis
#查看reids服务信息
ps -ef | grep redis
#设置redis开机启动
systemctl enable redis
~~~



::: tip 参考
http://www.kaotop.com/it/173684.html

https://zhuanlan.zhihu.com/p/525533682
:::