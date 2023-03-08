# 硬装Nginx

### [1、下载Nginx](#1-下载nginx)

```
#进入Downloads文件夹下面，如果没有Downloads创建，以后所有文件下载均下载在Downloads文件夹
cd /root/Downloads/
#下载
wget http://nginx.org/download/nginx-1.21.1.tar.gz
```

### [2、安装Nginx依赖](#2-安装nginx依赖)

> nginx是C语言开发，建议在linux上运行，本教程使用Centos7.9为安装环境。
>
> n gcc
>
> 安装nginx需要先将官网下载的源码进行编译，编译依赖gcc环境，如果没有gcc环境，需要安装gcc：yum install gcc-c++
>
> n PCRE
>
> PCRE(Perl Compatible Regular Expressions)是一个Perl库，包括 perl 兼容的正则表达式库。nginx的http模块使用pcre来解析正则表达式，所以需要在linux上安装pcre库。
>
> yum install -y pcre pcre-devel
>
> 注：pcre-devel是使用pcre开发的一个二次开发库。nginx也需要此库。
>
> n zlib
>
> zlib库提供了很多种压缩和解压缩的方式，nginx使用zlib对http包的内容进行gzip，所以需要在linux上安装zlib库。
>
> yum install -y zlib zlib-devel
>
> n openssl
>
> OpenSSL 是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用。
>
> nginx不仅支持http协议，还支持https（即在ssl协议上传输http），所以需要在linux安装openssl库。

安装依赖：

```
yum install -y gcc-gcc++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

如果以上操作没有报错则安装成功

### [3、安装Nginx](#3-安装nginx)

#### 3.1 解压

```
tar xf nginx-1.21.1.tar.gz
```

#### 3.2 进行configure配置

```
./configure --prefix=/usr/local/nginx 
```

#### 3.3 编译和安装

```
make & make install -j 4
```

如果以上操作没有报错则安装成功



#### 3.4 启动nginx

```
./nginx -c #指定配置文件位置
eg: ./nginx -c /usr/local/conf/nginx.conf 
./nginx 默认使用NGINX_HOME/config/nginx.conf配置文件
```

#### 3.5 停止niginx

```shell
./nginx -s stop   停止
./nginx -s quit    退出
./nginx -s reload 重新加载nginx.conf （很常用）
发送信号量 （找不到nginx安装位置，但是想要停止nginx服务器情况下使用）
kill -TERM master进程号
kill -QUIT master进程号

#查看nginx状态
ps -ef | grep nginx
```

> nginx 常用命令
>
> ./nginx -v 查看nginx版本
>
> ./nginx -V 查看nginx的编译版本及配置的参数
>
> ./nginx -t 主要验证nginx.conf配置文件是否有问题
>
> ./nginx -c 根据配置文件的位置启动nginx
>
> ./nginx -s 发送对应信号处理master进程
>
> -s signal : send signal to a master process: stop, quit, reopen, reload





参考：

https://www.cnblogs.com/cqwiu/p/16572046.html