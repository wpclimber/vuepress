# centos常用命令集合

## 1、Centos系统目录

~~~shell
#系统管理员目录，对于系统来说，系统管理员就好比是上帝，它能对系统做任何事情，甚至包括删除你的文件
/root
#这里主要存放了系统配置方面的文件，举个例子：你安装了nginx，当你想要修改nginx配置文件的时候，你会发现他们就是/etc/nginx目录下
/etc
#这里主要存放与设备（包括外设）有关的文件（unix和linux系统均把设备当成文件）。想连线打印机嘛？系统就是从这个目录开始工作的。另外还有一些包括磁盘确定、USB驱动等都放在这个目录
/dev
#这里主要存放你的个人数据。具体每个用户的设置文件，用户的桌面文件夹，还有用户的数据都放在这里。每个用户都有自己的用户目录，位置为：、home/用户名。当然，root用户除外。
/home
#这是临时目录。对于某些程序来说，有些文件杯用了一次两次之后，就不会再杯用到，像这样的文件就放在这里。有些linux系统会定期自动对这个目录进行清理，因此，千万不要把重要的数据放在这里。
/tmp
#在这个怒目下，你可以找到那些不适合放在/bin或/etc目录下的额外的工具。比如像游戏，一些打印工具等等。/usr目录包含了许多子目录：/usr/bin目录用于存放程序;/usr/share用于存放一些共享的数据
#比如音乐文件或者图标等等；/usr/lib目录用于存放那些不能直接运行的，但确实许多程序运行所必须得一些函数库文件。
/usr
#这里主要存放那些可选的程序。你想尝试最新的firefox测试版嘛?那就撞到/opt目录下吧，这样，当你尝试玩，想删掉firefox的时候，你就可以直接删除他，二部影响系统其他任何设置、
#安装到/opt目录下的程序，它所有的数据、库文件等的呢都是放在同个目录下面、
#举个例子：刚才装的测试版firefox，就可以安装到/opt/firefox_beta目录下，/opt/firefox_beta目录下面就包含了运行firefox所需要的所有文件、库、数据等等。要删除firefox的时候 ，你只需要删除/opt/firefox_beta目录即可
/opt

/usr/local
~~~


## 2、Nginx常用命令

~~~shell
#查看nginx配置文件是否正常
nginx -t
#启动nginx
start nginx
#停止nginx
nginx -s stop
#重启nginx
nginx -s reload

~~~

~~~shell
#查看nginx工作进程数
#以下说明本台服务器有1个master主进程，2个worker工作进程
[root@VM-0-16-centos bin]# ps -elf |grep nginx
5 S root      1341 12628  1  80   0 - 10693 ep_pol 14:42 ?        00:00:20 nginx: worker process
5 S root      1342 12628  1  80   0 - 10693 ep_pol 14:42 ?        00:00:19 nginx: worker process
5 S root     12628     1  0  80   0 - 10195 sigsus Feb10 ?        00:00:00 nginx: master process /usr/sbin/nginx
0 S root     29285  5622  0  80   0 - 28204 pipe_w 15:04 pts/0    00:00:00 grep --color=auto nginx

~~~

## 3、Pm2常用命令


~~~shell
#查看pm2所有进程列表
pm2 list

#重启id为9进程
pm2 reload [9]

#重新加载所有进程
pm2 reload all
#停止所有进程
pm2 stop all
#重启所有应用程序
pm2 restart all

# 保存当前应用列表
pm2 save                      
# 重新加载保存的应用列表
pm2 resurrect             


#删除进程
pm2 delete [9]
#关闭并删除所有应用程序
pm2 delete all

#创建并启动vue项目
pm2 start app.js --name admin

#pm2创建.net core项目
pm2 start "dotnet yyhy.userapi.dll --urls=http://*:8001" --name userapi

#查看pm2的日志 
pm2 logs

~~~

## 4、tar命令


~~~shell
tar -zcvf /file.*tar*.gz /directoryname
~~~



## 5、firewalld常用命令

~~~shell
#查看防火墙开启/关闭状态
systemctl status firewalld
#开启防火墙
systemctl start firewalld
#防火墙开放1433端口
firewall-cmd --zone=public --add-port=1433/tcp --permanent
#删除防火墙1433端口
firewall-cmd --zone=public --remove-port=1433/tcp --permanent
#重新加载防火墙配置
sudo  firewall-cmd --reload 
#查看开放端口列表
firewall-cmd --zone=public --list-ports
~~~


