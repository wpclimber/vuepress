# AutoMapper的使用


AutoMapper对象映射，AutoMapper是以.NET(C#)语言开发的一个轻量的处理一个实体对象到另一个实体对象之间映射关系的组件库



## 1、.NET项目中的使用

### 1.1项目右键-管理Nuget程序包-安装AutoMapper，本次安装版本9.0.0

### 1.2页面中引用 using AutoMapper;

~~~c#
//简单映射
//G_GoodsEntity是原类型Source type，RespGoodsEntity是目标类型Destination type
var config = new MapperConfiguration(cfg => { cfg.CreateMap<G_GoodsEntity, RespGoodsEntity>(); });
var mapper = config.CreateMapper();
//TDestination Map<TSource, TDestination>(TSource source);
var GoodsInfo = mapper.Map<G_GoodsEntity, RespGoodsEntity>(Entity);
~~~



参考：https://www.cnblogs.com/CoderLinkf/archive/2018/04/19/8881133.html



## 2、.NET Core项目中的使用

### 1.1项目右键-管理Nuget程序包-

安装AutoMapper，本次安装版本12.0.0

安装AutoMapper.Extensions.Microsoft.DependencyInjection

### 1.2新建类AutoMapperProfiles

~~~c#
public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //构造函数中创建映射关系
            CreateMap<D_OfficeEntity, D_DepartmentsEntity>().ForMember(d => d.Dep_Name, opt => { opt.MapFrom(s => s.Office_Name); }).ForMember(d => d.Dep_Content, opt => { opt.MapFrom(s => s.Office_Content); });

            CreateMap<View_D_Office_Departments, D_DepartmentsEntity>().ForMember(d => d.Id, opt => { opt.MapFrom(s => s.Department_Id); });


        }
    }
~~~



### 1.3 Startup类注册automapper服务

~~~c#
public void ConfigureServices(IServiceCollection services)
{
     //注册AotuMapper服务
     services.AddAutoMapper(typeof(AutoMapperProfiles));

}
~~~



### 1.4开始使用

~~~c#
using AutoMapper;

private readonly IMapper _iMapper;//AutoMapper

/// <summary>
///  构造方法，注入依赖项
/// </summary>
/// <param name="d_DepartmentsIBLLL"></param>
/// <param name="iHttpContextAccessor">请求上下文</param>
public D_DepartmentsController(
    IMapper mapper)
{
    _iMapper = mapper;
}

//单实体简单映射
var dep_entity = _iMapper.Map<D_DepartmentsEntity>(item);

//列表映射
var newson_list = _iMapper.Map<List<D_DepartmentsEntity>>(Son_List);
~~~




::: tip 参考资料：
https://blog.csdn.net/sinat_16998945/article/details/103072259
http://t.zoukankan.com/xiaojinFat-p-13362353.html
https://www.donet5.com/Doc/12/2272
:::



