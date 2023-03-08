
# NETCore引入雪花飘逸雪花Id

::: tip 参考资料：
https://gitee.com/laobiao/idgenerator
:::



## 1、Nuget搜索Yitter.IdGenerator 安装

## 2、Startup-ConfigureServices定义雪花飘逸服务

~~~C#
public void ConfigureServices(IServiceCollection services)
{
    // 雪花漂移算法
    // 创建 IdGeneratorOptions 对象，请在构造函数中输入 WorkerId：
    var options = new IdGeneratorOptions(1);
    // 保存参数（必须的操作，否则以上设置都不能生效）：
    YitIdHelper.SetIdGenerator(options);
}
~~~



## 3、方法中使用

~~~c#
YitIdHelper.NextId();
~~~

