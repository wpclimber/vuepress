# Certbot自动生成SSL证书

::: tip 参考资料：
https://certbot.eff.org/instructions?ws=nginx&os=centosrhel7&commit=%3E

https://snapcraft.io/docs/installing-snap-on-centos
:::


# 生成证书前提必须保证网站可以正常打开否则会生成失败


## 1、添加EPEL存储库到系统中。

```
yum install epel-release
```

## 2、安装snapd包。

```
yum install snapd
```

## 3、创建快速启动连接。

```
systemctl enable --now snapd.socket
ln -s /var/lib/snapd/snap /snap
```

## 4、确保是最新版本（可以不执行此命令）

```
sudo snap install core; sudo snap refresh core
```

## 5、安装证书生成工具（服务器在国外有时候回连接不稳定，多试几次就好了）

```
snap install --classic certbot
```

## 6、创建全局链接（不创建不能使用命令）

```
ln -s /snap/bin/certbot /usr/bin/certbot
```

## 7、生成证书

```
certbot --nginx
#第一次生成
#1、输入邮箱接收消息
#2、同意协议 y
#3、拒绝发送推广消息 n
#4、选择域名数字序号生成证书
```

## 8、测试证书自动续期状态

```
certbot renew --dry-run
```

::: tip 本文档提供者
公众号：爱上羊毛侠
:::
