# 硬装Redis6


::: tip 参考

https://www.cnblogs.com/zuidongfeng/p/8032505.html
:::



## 1、下载Redis6.x的安装包 

 ~~~
#进入下载文件夹

wget https://download.redis.io/releases/redis-6.2.5.tar.gz
 ~~~



## 2、安装Redis的依赖环境

redis6跟之前有些不同，先要升级gcc的版本，输入以下命令

~~~shell
yum install gcc y
~~~

## 3、安装Redis 

### 3.1解压

~~~shell
tar -zxvf redis-6.2.5.tar.gz
~~~

3.1进入解压目录进行编译和安装

~~~shell
cd redis-6.2.5
#编译安装
make MALLOC=libc
#将/root/Downloads/redis-6.2.5/src/目录下的文件加到/usr/local/bin目录
cd src && make install




~~~





## 4、以后台进程方式启动redis ,并设置开机自启动

### 4.1修改redis.conf配置文件

~~~shell
#将里面的daemonize no 改成yes,以后台进程方式启动redis
#修改daemonize为yes，即默认以后台程序方式运行（还记得前面手动使用&号强制后台运行吗）。
daemonize yes

--------------设置外网访问-----------------------------
#bind 127.0.0.1前面加上#  注释掉这一行，127.0.0.1限制只能本机访问
#将protected-mode yes改为no
protected-mode no

#给redis设置密码，尽可能的复杂写，不要出现root 123   等简单的密码
requirepass foobared
~~~

### 4.2启动基于配置文件启动Redis

~~~shell
#redis.conf在上一层文件夹下
cd /root/Downloads/redis-6.2.5/src/
./redis-server ../redis.conf

#1、在/etc目录下新建redis目录
mkdir /etc/redis
#2、将/root/Downloads/redis-6.2.5/redis.conf 文件复制一份到/etc/redis目录下，并命名为6379.conf　　
cp /root/Downloads/redis-6.2.5/redis.conf /etc/redis/6379.conf
#3、将redis的启动脚本复制一份放到/etc/init.d目录下
cp /root/Downloads/redis-6.2.5/utils/redis_init_script /etc/init.d/redis


#设置redis开机自启动
#先切换到/etc/init.d目录下
cd /etc/init.d
#然后执行自启命令
[root@iZwz991stxdwj560bfmadtZ init.d]# chkconfig redis on

#配置文件路径
/etc/redis/6379.conf
~~~

### 4.3防火墙放行Redis的端口6379

~~~shell
#查看防火墙目前的放行端口列表
firewall-cmd --list-ports
#添加防火墙放行端口（permanent代表永久生效）
firewall-cmd --add-port=6379/tcp --permanent
#重新加载防火墙（添加完放行端口一定要重新加载防火墙）
firewall-cmd --reload
~~~





常用命令

~~~shell
systemctl status redis 查看服务状态
systemctl stop redis 停止服务
systemctl restart redis 重启服务
ps -ef | grep redis 查看reids服务信息
systemctl enable redis 设置redis开机启动
~~~

