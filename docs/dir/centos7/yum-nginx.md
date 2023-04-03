# yum安装nginx


::: tip 说明
运行yum命令前先更新yum源，参考文档 [更新yum源](update-yum.md)
:::


## 安装nginx
~~~shell
#查看yum源是否有匹配的nginx版本
yum info nginx
#如果没有可安装的版本，执行以下命令添加CentOS 7 Nginx yum资源库
rpm -Uvh  http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

#安装nginx
yum -y install nginx
~~~


## 配置
~~~shell
#安装成功后nginx配置文件路径
/etc/nginx/nginx.conf
#nginx网站默认存放目录
/usr/share/nginx/html  
#网站默认主页路径
/usr/share/nginx/html/index.html
~~~



## 常用命令

~~~shell
#设置开机自启动
systemctl enable nginx
#启动nginx
systemctl start nginx
#查看nginx状态
systemctl status nginx
#重启nginx状态
systemctl restart nginx
#停止nginx状态
systemctl stop nginx
#查看nginx配置文件是否正常
nginx -t
#查看进程apache/httpd
ps -ef | grep nginx  
#查看服务端口
netstat -anpl | grep 'nginx' 
~~~



