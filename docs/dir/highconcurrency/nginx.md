# Nginx配置集合

## nginx 常用命令

~~~shell
#查看配置文件是否正常
nginx -t
#启动nginx
start nginx
#重新加载nginx
nginx -s reload
#停止nginx
nginx -s stop
#重新启动nginx
nginx -s restart
~~~

## 1、配置监听80端口


~~~shell
   server {   
        listen       80;   
        server_name  api.biyeno.com;  
        location / {   
            proxy_pass http://127.0.0.1:8003;   
            proxy_set_header   Host    $host;   
            proxy_set_header   X-Real-IP   $remote_addr;   
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;   
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
       }
       
       
#图片站点 
    server {   
        listen       80;   
        server_name  images.sh-zyy.com;  
        location / {   
            root  /root/WebProgram/images.sh-zyy.com/upload;
            autoindex on; 
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
       }
       
#静态站点配置
      server {   
        listen       80;   
        server_name  m.sh-zyy.com;  
        location / {   
            root  /root/WebProgram/m.sh-zyy.com/;
            index  index.html;  
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
       }
~~~



## 2、配置监听443端口

### 1、特别需要注意文件夹中带有notify的路径需要双\\ \转义， 否则\n会被识别为换行导致无法识别该路径

### 2、申请的SSL证书必须是nginx版，把证书放至nginx\conf\ssl文件夹下

~~~shell
	#支付回调地址
		server {
        listen       443 ssl;
        server_name  notify.biyeno.com;

        ssl_certificate      \ssl\\notify.biyeno.com\\notify.biyeno.com_bundle.crt;
        ssl_certificate_key  \ssl\\notify.biyeno.com\\notify.biyeno.com.key;

        #ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

		location / {
			proxy_pass http://127.0.0.1:8003; 
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }	

~~~

## 3、解决上传最大文件限制

nginx默认的上传文件大小是有限制的，一般为2MB，如果你要上传的文件超出了这个值，将可能上传失败。

client_max_body_size 500m; 为上传最大文件限制，可加在http、server、location分别对应不同的作用域

~~~shell
	#后台管理端接口
	   server {   
        listen       80;   
        server_name  api.admin.laigongyi.cn;  
        client_max_body_size 500m;
        location / {   
            proxy_pass http://127.0.0.1:8002;   
            proxy_set_header   Host    $host;   
            proxy_set_header   X-Real-IP   $remote_addr;   
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;   
            client_max_body_size 50m;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
       }

~~~



## 4、手机端访问PC端网站强制跳转到手机端



~~~shell
	   server {   
        listen       80;   
        server_name  lvyinqiangpei.flyuse.cn lvyinqiangpei.com www.lvyinqiangpei.com;  
		if ($http_user_agent ~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {
          rewrite  ^(.*)    http://h5.lvyinqiangpei.com$1 permanent;
		}
        location / {   
			proxy_pass http://127.0.0.1:8012;   
			proxy_set_header   Host    $host;   
			proxy_set_header   X-Real-IP   $remote_addr;   
			proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;   
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
       } 
       
#rewrite ^/test.php /new permanent; //重定向带参数的地址
#rewrite ^/test.php /new? permanent; //重定向后不带参数
#rewrite ^/test.php /new?id=$arg_id? permanent; //重定向后带指定的参数 

~~~



## 5、HTTP强制跳转到HTTPS

~~~shell
server
{
    listen 80;
    server_name web.heyonggs.com;
    rewrite ^/(.*)$ http://web.heyonggs.com/$1 permanent;
}
或者
server
{
    listen 80;
    server_name web.heyonggs.com;
    rewrite ^ http://web.heyonggs.com$request_uri? permanent;
}
#最新的写法
server
{
    listen 80;
    server_name web.heyonggs.com;
    return 301 https://$server_name$request_uri;
}
#这种方式适用于多域名的时候，即访问heyonggs.com的http也会强制跳转到https://web.heyonggs.com上面
server
{
    listen 80;
    server_name heyonggs.com web.heyonggs.com;
    if ($host ~* "^heyonggs.com$") {
    	rewrite ^/(.*)$ https://web.heyonggs.com/ permanent;
    }
}
#最简单的一种配置
server
{
    listen 80;
    server_name web.heyonggs.com;
    if ($host = "web.heyonggs.com") {
   		rewrite ^/(.*)$ http://web.heyonggs.com permanent;
    }
}
~~~





## 6、Nginx 静态资源缓存设置



参考链接：https://www.w3cschool.cn/nginxsysc/nginxsysc-cache.html

对于站点中不经常修改的静态内容（如图片，JS，CSS），可以在服务器中静态资源缓存并设置expires过期时间，控制浏览器缓存，达到有效减小带宽流量，降低服务器压力的目的。另外还可利用CDN加速页面加载速度

以Nginx服务器为例：

~~~shell
 location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
    #过期时间为30天，
    #图片文件不怎么更新，过期可以设大一点，
    #如果频繁更新，则可以设置得小一点。
    expires 30d;
}

location ~ .*\.(js|css)$ {
	expires 10d;
}

#只缓存image文件夹下的文件
 location /image {
    expires 30d;
}


~~~


## 7、一种域名多种用途

此情况适用以下业务场景：

同一个域名多种用途，www.duolian-nfc.com作为官网展示，http://duolian-nfc.com?MerChantId=ff907261-5b14-4efe-a00a-877dacceea32&TableId=6fa6b423-3aa5-49bc-8dc9-c33ffdd59a69&TableNumber=01&AccessType=1跳转到http://h5.duolian-nfc.com并带上参数

~~~shell
server {   
        listen       80;   
        server_name  duolian-nfc.com www.duolian-nfc.com;  
		
        location / {
        	#带参数跳转
			if ($args ~* "MerChantId"){
			rewrite ^/(.*)$ http://h5.duolian-nfc.com/$1 permanent;
			}
			proxy_pass http://127.0.0.1:8002;   
			proxy_set_header   Host    $host;   
			proxy_set_header   X-Real-IP   $remote_addr;   
			proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;   
        }
	
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
       }
~~~



## 8、开启网站gzip压缩，增加访问速度



~~~shell
#是否启动gzip压缩,on代表启动,off代表开启
gzip  on;
  
#需要压缩的常见静态资源
gzip_types text/plain application/javascript   application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  
#由于nginx的压缩发生在浏览器端而微软的ie6很坑爹,会导致压缩后图片看不见所以该选项是禁止ie6发生压缩
gzip_disable "MSIE [1-6]\.";
  
#如果文件大于1k就启动压缩
gzip_min_length 1k;
  
#以16k为单位,按照原始数据的大小以4倍的方式申请内存空间,一般此项不要修改
gzip_buffers 4 16k;
  
#压缩的等级,数字选择范围是1-9,数字越小压缩的速度越快,消耗cpu就越大
gzip_comp_level 2;
  
#引导的在/etc/nginx/conf.d目录下所有后缀为.conf的子配置文件
include /etc/nginx/conf.d/*.conf;
~~~





## 9、设置超时时间

~~~shell
server {
        listen       *:65531;
        server_name  0.0.0.0;

        error_log   stderr warn;
        access_log  stdout main;
        proxy_send_timeout 180s;     # 设置发送超时时间，
        proxy_read_timeout 180s;	 # 设置读取超时时间。

~~~



## 10、负载均衡

### 10.1 ip_hash

在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的。

我们可以采用ip_hash指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。

每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。

```shell
#配置上游服务器
upstream webserlist {
    ip_hash;
    server    127.0.0.1:8003;
    server    127.0.0.1:8006;
}

 location / {   
           	#proxy_pass http://127.0.0.1:8003; 
           	proxy_pass http://webserlist; 
           }

```

### 10.2轮询

每个请求**按时间顺序逐一分配**到不同的后端服务器，如果后端服务器down掉，能自动剔除。

~~~shell
upstream webserlist {
    server 192.168.0.14;
    server 192.168.0.15;
} 
location / {   
           	#proxy_pass http://127.0.0.1:8003; 
           	proxy_pass http://webserlist; 
           }
~~~

### 10.3 weight权重

指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的
情况。

```shell
upstream webserlist {
    server 192.168.0.14 weight=3;
    server 192.168.0.15 weight=7;
}
 location / {   
           	#proxy_pass http://127.0.0.1:8003; 
           	proxy_pass http://webserlist; 
           }
```


::: tip 参考资料：
http://aijishu.com/a/1060000000008890
:::


## 11、worker_processes和worker_connections性能优化配置，增加吞吐量

worker_processes，工作进程数

- 1.默认：worker_processes: 1
- 2.调大：worker_processes: CPU核心数，(双核4线程，可以设置为4)



worker_connections，单个工作进程可以允许同时建立外部连接的数量

数字越大，能同时处理的连接越多

- 1.默认：worker_connections: 1024

- 2.调大：worker_connections: 100000，（调大到10万连接）

- 3.connections不是随便设置的，而是与两个指标有重要关联，一是内存，二是操作系统级别的“进程最大可打开文件数”。

- 4.内存：每个连接数分别对应一个read_event、一个write_event事件，一个连接数大概占用232字节，2个事件总占用96字节，那么一个连接总共占用328字节，通过数学公式可以算出100000个连接数大概会占用 31M = 100000 * 328 / 1024 / 1024，当然这只是nginx启动时，connections连接数所占用的nginx。

- 5.进程最大可打开文件数：进程最大可打开文件数受限于操作系统，可通过 ulimit -n 命令查询，以前是1024，现在是65535,
  nginx提供了worker_rlimit_nofile指令，这是除了ulimit的一种设置可用的描述符的方式。 该指令与使用ulimit对用户的设置是同样的效果。此指令的值将覆盖ulimit的值，如：worker_rlimit_nofile 20960;
  设置ulimits：ulimit -SHn 65535

  

~~~shell
user root;
worker_processes 4;

events {
    worker_connections 90000;
}
~~~



::: tip 参考资料：
https://blog.csdn.net/zhuyu19911016520/article/details/90714429
:::



