
# 更新yum源


### 1.安装wget
 ```
yum install -y wget
 ```

### 2.备份配置文件
 ```
 mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
 ```

### 3.下载国内yum源文件（centOs7，比如阿里）

 ```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
 ```

### 4.清理缓存
 ```
yum clean all
 ```

### 5.重新生成缓存
 ```
yum makecache
 ```


### 6.查看启用的yum源和所有的yum源
 ```
yum repolist enabled
yum repolist all
 ```

### 7.更新yum
 ```
yum -y update
 ```

