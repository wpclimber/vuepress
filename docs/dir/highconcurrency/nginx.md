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



# 12、缓存配置

> 参考资料：
>
> https://sunnyfan.cn/dir/centos/nginx_optimize.html#%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A4
>
> https://www.cnblogs.com/itzgr/p/13327861.html
>
> https://www.knowledgedict.com/tutorial/nginx-cache.html

><font color="green">nginx 针对缓存的配置分为两个层面，一个是**基于客户端的缓存机制的设置**，主要利用消息头进行配置，另一个就是**服务端的缓存机制**，即将要缓存的内容在 nginx 服务器上进行保存，在其磁盘上存储，并根据有效时长加载在共享内存中，客户端请求 nginx 服务器后，直接从缓存内存返回。</font>

<h4>问题：</h4>

当达到500QPS 的时候很难继续压测上去。

<h4>分析原因：</h4>

一个详情页html 主体达平均150 kb 那么在500QPS 已接近千M局域网宽带极限。必须减少内网通信。

<h4>基于Nginx 静态缓存的解决方案：</h4>

![nginx_op_4](https://raw.githubusercontent.com/wpclimber/MyCloudImg/main/img/nginx_op_4.png)

## 12.1 服务端配置

<font color="green">nginx 服务器在接收到被代理服务器的响应数据之后，一方面将数据再返回给客户端，另一方面根据 proxy cache  的配置将这些数据缓存到本地磁盘上。当客户端再次访问相同的数据时，nginx  直接从硬盘检索到相应的数据返回给客户端，从而减少与被代理服务器交互的时间。</font>

<h3>配置步骤</h3>

- 客户端、代理请求缓存
- 设置缓存空间，存储缓存文件
- 在 location 中使用缓存空间
- 打开文件的缓存配置

~~~shell
#客户端请求主体的缓冲区大小
client_body_buffer_size 512k;
#客户端请求头部的缓冲区大小，这个可以根据系统分页大小来设置
client_header_buffer_size 4k;
client_max_body_size 512k;
large_client_header_buffers 2 8k;
proxy_buffer_size 16k;
proxy_buffers 4 64k;
proxy_busy_buffers_size 128k;
proxy_temp_file_write_size 128k;
#指定在何种情况下一个失败的请求应该被发送到下一台后端服务器
proxy_next_upstream http_502 http_504 http_404 error timeout invalid_header;

#设置缓存空间，存储缓存文件
# 缓存目录：cache/
# 缓存名称：one
# 缓存占用内存空间：10m
# 缓存目录级别为2
# 缓存最大时间为120分钟
# 加载器每次迭代过程最多执行300毫秒
# 加载器每次迭代过程中最多加载200个文件
# 缓存硬盘空间最多为 200m
#设置缓存空间，存储缓存文件
proxy_cache_path D:/nginx/cache  levels=1:2 keys_zone=user-cache:200m inactive=120m loader_threshold=300 loader_files=200 max_size=20g;

#在location中使用缓存空间，pathname是项目的目录，请自定义
location /pathname { 
	#过期时间
	expires 3d;
	proxy_cache nginx-cache;
	proxy_cache_valid 200 304 302 5d;
	proxy_cache_valid any 5d;
	#被请求3次以上时才缓存
	proxy_cache_min_uses 3;
	proxy_cache_key '$host:$server_port$request_uri';
	add_header X-Cache '$upstream_cache_status from $host';
	
	proxy_set_header X-Real-IP $remote_addr;
	proxy_pass http://localhost/pathname;
}

#打开文件的缓存配置
#为打开文件指定缓存，默认是没有启用的，max 指定缓存数量，建议和打开文件数一致，inactive 是指经过多长时间文件没被请求后删除缓存。
open_file_cache max=65535 inactive=60s;

#文件描述符一直是在缓存中打开的，如果有一个文件在inactive时间内一次没被使用，它将被移除。
open_file_cache_min_uses 1;

#指定多长时间检查一次缓存的有效信息。
open_file_cache_valid 80s;
~~~

<h4>缓存参数详细说明</h4>

| 父元素   | 名称              | 描述                                                         |
| -------- | ----------------- | ------------------------------------------------------------ |
| http     | proxy_cache_path  | 指定缓存区的根路径                                           |
|          | levels            | 缓存目录层级最高三层，每层1~2个字符表示。如1:1:2 表示三层。  |
|          | keys_zone         | 缓存块名称 及内存块大小。如 cache_item:500m 。表示声明一个名为cache_item 大小为500m。超出大小后最早的数据将会被清除。 |
|          | inactive          | 最长闲置时间 如:10d 如果一个数据被闲置10天将会被清除         |
|          | max_size          | 缓存区硬盘最大值。超出闲置数据将会被清除                     |
| location | proxy_cache       | 指定缓存区，对应keys_zone 中设置的值                         |
|          | proxy_cache_key   | 通过参数拼装缓存key 如：hosthosthosturiisargsis_argsisargsargs 则会以全路径md5值做做为Key |
|          | proxy_cache_valid | 为不同的状态码设置缓存有效期                                 |

### 12.1.1`proxy_cache_path`

`proxy_cache_path` 配置项顾名思义是指定缓存的存放路径，语法如下：

~~~shell
语法：proxy_cache_path path keys_zone=zone_name:zone_size [levels=number] [use_temp_path=on|off] [inactive=time] [max_size=size] [min_free=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time];
默认值：无
位置：http
~~~

~~~shell
	# 缓存目录：cache/
	# 缓存名称：one
	# 缓存占用内存空间：10m
	# 缓存目录级别为2
	# 缓存最大时间为120分钟
	# 加载器每次迭代过程最多执行300毫秒
	# 加载器每次迭代过程中最多加载200个文件
	# 缓存硬盘空间最多为 200m
	#设置缓存空间，存储缓存文件
	proxy_cache_path D:/nginx/cache  levels=1:2 keys_zone=user-cache:200m inactive=120m loader_threshold=300 loader_files=200 max_size=20g;

~~~



其中必选的参数具体如下：

- path：第一个参数，必选，如上 path，其指定缓存内容的本地文件系统路径；
- `keys_zone`：必选，指定缓存的区域 key，它在共享内存中设置一块存储区域来存放缓存的 key 字符串，如此 nginx 就可以快速判断一个 request 是否命中或者未命中缓存，其后通过冒号再指定 key 的个数，`1m` 表示可以存储 8000个 key，`10m` 可以存储 80000个 key。

常用的可选参数如下：

- `levels`：可选参数，指定该缓存控件对应的目录层次，最多可以设置3层，每层取值为 `1` 或 `2`；多层用冒号 `:` 隔开；
   默认所有缓存文件都放在同一个目录下时，会影响缓存的性能，大部分场景推荐使用2级目录来存储缓存文件，`1` 和 `2` 表示用1位和2位16进制来命名目录名称。第一级目录用1位16进制命名，如 `b`；第二级目录用2位16进制命名，如 `2b`。所以一级目录有16个，二级目录有 16*16=256个，总目录数为 16*256=4096个。
   如果设置 `level=1:2`，那么该密文资源缓存存放在如 `/tmp/nginx/my_cache/e/83` 目录下；
   如果设置 `level=2:1:2`，那么该密文资源缓存存放在如 `/tmp/nginx/my_cache/3e/8/f8` 目录下；
- `inactive`：可选参数，指定缓存的数据多久时间未被访问就会被删除，如：`inactive=1d` 表示缓存数据在1天内没有被访问就会被删除；
- `max_size`：可选参数，设置最大 cache 空间，如果不指定，会使用掉所有磁盘空间；如果缓存空间存满，会删除最少使用的缓存文件。如：`max_size=20g`。

其他的可选参数如下：

- `use_temp_path`：可选参数，是否将缓存写在临时文件中，该参数从 1.7.10 版本开始支持；如果为 `off`，则 nginx 会将缓存文件直接写入指定的 cache 文件中，而不是使用 temp_path 存储，官方建议为 `off`，避免文件在不同文件系统中不必要的拷贝；
- `min_free`：可选参数，最小可用空间，该参数从 1.19.1 版本开始支持；当可用空间小于该值时，nginx 会删除最近最少使用的数据，删除数据基于 `manager_files`、`manager_threshold` 和 `manager_sleep` 三个参数；
- `manager_files`：缓存管理器（cache manager）的可选参数，该参数从 1.11.5 版本开始支持；在一次缓存迭代（操作）中，删除不会超过该设定值，默认为 100；
- `manager_threshold`：缓存迭代的持续时间阈值，即不要超过该值，同样，该参数从 1.11.5 版本开始支持，默认为 200 毫秒；
- `manager_sleep`：缓存暂停的时间，同样，该参数从 1.11.5 版本开始支持，默认为 50 毫秒；
- `loader_files`：缓存机制在启动一分钟后，“cache loader”进程被激活，它将有关存储在文件系统上的先前缓存数据的信息加载到缓存区域中。加载也是在迭代中完成的。在一次迭代中，加载的项目数不超过该值（默认情况下为 100）；
- `loader_sleep`：此外，一次迭代的持续时间受该参数限制（默认为 200 毫秒）；
- `loader_threshold`：在迭代之间，加载的暂停时间由该值限制（默认为 50 毫秒）；
- `purger`：purger 开头的是商业版支持的，都是从 1.7.12 版本开始支持，是否启用缓存清除功能，可设置 `on` 或 `off`（默认）；
- `purger_files`：每次迭代清除时，清除缓存目录中缓存数据的最大文件数，默认是 `10`；
- `purger_sleep`：连续两次迭代清除间的最短时间间隔，默认是 `50`ms；
- `purger_threshold`：每次迭代清除时的最大执行时间，默认是 `50`ms。

> 如果是针对 uwsgi 服务的缓存，需要把上面的 `proxy_cache_path` 改为 `uwsgi_cache_path` 即可，nginx 通过 ngx_http_uwsgi_module 模块实现与 uWSGI 服务器的数据交换并完成 Python 网站的请求处理。

除了在 http 节点下配置 `proxy_cache_path` 之外，其它还需要在具体 url 匹配配置下，进行如下主要参数的设置：

### 12.1.2 proxy_cache

该指令用来开启或关闭代理缓存，如果开启则指定使用上面配置的哪个缓存区来进行缓存； 	

~~~shell
# 语法：proxy_cache zone_name|off;
# 默认：off
# 位置：http、server、location
~~~

### 12.1.3 `proxy_cache_key`

设置 nginx 服务器在共享内存中为缓存数据建立索引时使用的关键字，nginx 会根据该设置结合 md5 算法生成真正的缓存 key； 

~~~shell
# 语法：proxy_cache_key key;
# 默认：proxy_cache_key $scheme$proxy_host$request_uri;
# 位置：http、server、location
~~~

如下示例： 	

```shell
proxy_cache_key "$host$request_uri $cookie_user";
proxy_cache_key '$host:$server_port$request_uri';
proxy_cache_key $scheme$proxy_host$uri$is_args$args;
```

### 12.1.4 `proxy_cache_valid`

通过该参数，可以配置不同返回响应状态码的请求，生成的缓存的过期时间，可以配置多条； 

~~~shell
# 语法：proxy_cache_valid [code ...] time;
# 默认：无
# 位置：http、server、location
~~~

如：为 200 和 302 的响应 URL 设置10分钟缓存，为 404 的响应 URL 设置60秒缓存： 	

```
proxy_cache_valid 200 302 10m;
proxy_cache_valid 404 60s;
proxy_cache_valid any 1h;
```

### 12.1.5 `proxy_cache_min_uses`

该指令用来设置资源被访问多少次后被缓存； 	

```
# 语法：proxy_cache_min_uses number;
# 默认值：1;  
# 位置：http、server、location
```

~~~shell
#被请求3次以上时才缓存
proxy_cache_min_uses 3;
~~~

### 12.1.6 `proxy_cache_methods`

该指令用户设置缓存哪些 HTTP 方法； 

```
# 语法：proxy_cache_methods GET | HEAD | POST ...;
# 默认值：GET HEAD;
# 位置：http、server、location
# 版本支持：0.7.59 开始
```

### 12.1.7 `proxy_cache_bypass`

该指令是用来设置不从缓存中获取数据的条件；当字符串中有一个不为空且不等于0，就不会从缓存中获取响应； 

```
# 语法：proxy_cache_bypass string ...;
# 默认值：无;
# 位置：http、server、location
```

​	示例： 	

```
proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
proxy_cache_bypass $http_pragma    $http_authorization
```



### 12.1.8小结 

一般在调试 nginx 服务端缓存时，会使用 `upstream_cache_status` 变量，它存储了缓存是否命中的信息，可以设置在响应头信息中，在调试中非常有用。其变量值意义如下：

- `MISS`：未命中缓存；
- `HIT`：命中缓存；
- `EXPIRED`：缓存过期；
- `STALE`：命中了旧的缓存；
- `REVALIDDATED`：nginx 验证旧的缓存仍然有效；
- `UPDATING`：内容陈旧，但正在更新；
- `BYPASS`：X 响应从原始服务器获取。

如下是一个完整带有 nginx 服务端缓存的配置示例：

~~~shell
http {
    ...
    proxy_cache_path /tmp/nginx/my_cache keys_zone=my_cache:10m levels=1:2 inactive=60s max_size=10g;
    server {
        listen 80;
        server_name  www.xxx.com

        access_log	/var/log/nginx/access.log;

        location / {
            proxy_pass http://192.168.1.135:8080;
            proxy_connect_timeout   30;
            proxy_read_timeout      5;

            # 指定缓存区域
            proxy_cache my_cache;
            # 指定缓存 key 组成规则
            proxy_cache_key 	$request_uri;
            # 针对返回 200 和 302 进行 60分钟缓存
            proxy_cache_valid 200 302 60m;
            # 响应消息头增加 Nginx-Cache-Status 信息，用于 debug 缓存是否命中
	        add_header Nginx-Cache-Status $upstream_cache_status;
            ...
        }
    }
    ...
}
~~~

一个可用的缓存，如上四项配置（`proxy_cache_path`、`proxy_cache`、`proxy_cache_key`、`proxy_cache_valid`）即可，其余配置走默认。

## 12.2客户端配置

<font color="green">客户端缓存指的是浏览器缓存，浏览器缓存是最快的缓存，因为它直接从本地获取（但有可能需要发送一个协商缓存的请求），它的优势是可以减少网络流量，加快请求速度。</font>

### 12.2.1客户端分类

浏览器缓存再分为两种模式，**强缓存**和**协商缓存**。

1. 强缓存（无 HTTP 请求，无需协商）

   直接读取本地缓存，无需向服务端发送请求确认，HTTP 返回状态码是 200（from memory cache 或者 from disk cache，不同浏览器返回的信息不一致的）。相关的 http 消息头 有： 

   ```
   Cache-Control
   Expires
   ```

2. 协商缓存（有 HTTP 请求，需协商）

   浏览器虽然发现了本地有该资源的缓存，但是缓存已经过期，于是向服务器询问缓存内容是否还可以使用，若服务器认为浏览器的缓存内容还可用，那么便会返回 304（Not Modified）HTTP  状态码，告诉浏览器读取本地缓存；如果服务器认为浏览器的缓存内容已经改变，则返回新的请求的资源。相关的 http 消息头 有： 

   ```
   Last-Modified
   ETag
   ```

### 12.2.2强缓存

强制缓存原理：浏览器在加载资源的时候，会先根据本地缓存资源的 header 中的信息（`Cache-Control` 和 `Expires`）来判断缓存是否过期。如果缓存没有过期，则会直接使用缓存中的资源；否则，会向服务端发起协商缓存的请求。

nginx 强缓存示例如下：

~~~shell
if ($request_uri ~* "^/$|^/search/.+/|^/company/.+/") {
  add_header Cache-Control max-age=3600;
}

location ~ .*\.(css|js|swf|php|htm|html )$ {
  add_header Cache-Control no-store;
}

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

主要消息头的具体意义如下：

- ```
  Cache-Control
  ```

  - `Cache-Control: max-age=x` 客户端缓存时间超出 x 秒后则缓存过期；
  - `Cache-Control: no-cache` 客户端不能直接使用本地缓存的响应，需要进行协商缓存，发送请求到服务器确认是否可以使用缓存。如果 Web 服务器返回 304，则客户端使用本地缓存，如果返回 200，则使用 Web 服务器返回的新的数据；
  - `Cache-Control: no-store` 客户端不能对响应进行缓存；
  - `Cache-Control: public` 可以被所有的用户缓存，包括终端用户和 CDN 等中间代理服务器；
  - `Cache-Control:private` 只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存；

- ```
  Expires
  ```

  - `Expires x` 客户端缓存时间超出x秒后则缓存过期，优先级比 `Cache-Control: max-age=x` 低。

### 12.2.3协商缓存

协商缓存原理：当客户端向服务端发起请求时，服务端会检查请求中是否有对应的标识（`If-Modified-Since` 或 `Etag`），如果没有对应的标识，服务器端会返回标识给客户端，客户端下次再次请求的时候，把该标识带过去，然后服务器端会验证该标识，如果验证通过了，则会响应 304，告诉浏览器读取缓存。如果标识没有通过，则返回请求的资源。

`Last-Modified` 与 `If-Modified-Since` 属于  HTTP/1.0，是用于服务端对响应数据修改时间进行校验的服务端校验方法。Last-Modified  的值是由服务端生成后传递给客户端的，客户端发送请求时，会将本地内容缓存中的 Last-Modified 的值由请求消息头的  If-Modified-Since 字段传递给服务端，如果服务端的被请求的内容的最后修改时间和 If-Modified-Since 的（默认是  exact 精确匹配）值不一致，则将返回新的内容，否则返回响应状态码 304，客户端将使用本地缓存。

`Etag` 与 `If-None-Match` 属于 HTTP/1.1，优先级高于  Last-Modified 的验证，是用于服务端对响应数据进行实体标签校验的服务端校验方法。Etag 类似于身份指纹，是一个可以与 Web  资源关联的记号。当客户端第一次发起请求时，Etag  的值在响应头中传递给客户端；当客户端再次发起请求时，如果验证完本地内容缓存后需要发起服务端验证，Etag 的值将由请求消息头的  If-None-Match 字段传递给服务端。如果服务端验证 If-None-Match 的值与服务端的 Etag  值不匹配，则认为请求的内容已经更新，服务端将会返回新的内容，否则返回响应状态码 304，客户端将使用本地缓存。

### 12.2.4用户操作浏览器影响缓存

当按下 F5 或者刷新时，客户端浏览器会添加请求消息头字段 `Cache-Control: max-age=0`，该请求不进行内容缓存的本地验证，会直接向 Web 服务器发起请求，服务端根据 `If-Modified-Since` 或者 `If-None-Match` 的值进行验证。

当按下 Ctrl+F5 或者强制刷新时，客户端浏览器会添加请求消息头字段 `Cache-Control: no-cache`，并且忽略所有服务端验证的消息头字段（`Etag` 和 `Last-Modified`），该请求不进行内容缓存的本地验证，它会直接向 Web 服务器发起请求，因为请求中没有携带服务端验证的消息头字段，服务端会直接返回新的内容。

