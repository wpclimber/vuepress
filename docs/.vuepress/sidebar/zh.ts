import { sidebar } from "vuepress-theme-hope";

export const zhSidebarConfig = sidebar({
    "/dir/": [
            {
            text: "指南",
            prefix: "/dir/centos7/README.md",
            link: "/dir/centos7/README.md",
            icon: "creative",
            collapsible: false,
            children: [
                {
                    text: "Centos7",
                    collapsible: true,
                    children: [
                        "/dir/centos7/centos-col.md",
                        "/dir/centos7/update-yum.md",
                        "/dir/centos7/yum-nginx.md",
                        "/dir/centos7/yum-redis.md",
                        "/dir/centos7/yum-mongodb.md",
                        "/dir/centos7/yum-rabbitmq.md",
                        "/dir/centos7/publish-vueproject.md",
                        "/dir/centos7/install-sqlserver2019.md",
                        "/dir/centos7/certbot-ssl.md",
                        "/dir/centos7/normal-nginx.md",
                        "/dir/centos7/normal-redis6.md",
                        "/dir/centos7/normal-mongodb.md",
                        "/dir/centos7/normal-kafka.md",
                        "/dir/centos7/normal-rabbitmq.md",
                    ],
                },
                {
                    text: "NET Core",
                    collapsible: true,
                    children: [
                        "/dir/netcore/log4net.md",
                        "/dir/netcore/publish-netcore.md",
                        "/dir/netcore/publish-iis.md",
                        "/dir/netcore/snowflake.md",
                        "/dir/netcore/automapper.md",
                        "/dir/netcore/mongodb.md",
                        "/dir/netcore/quartznet.md",
                    ],
                },
                {
                    text: "高并发组件",
                    collapsible: true,
                    children: [
                        "/dir/highconcurrency/nginx.md",
                        "/dir/highconcurrency/redis.md",
                        "/dir/highconcurrency/rabbitmq-info.md",
                        // "/dir/netcore/snowflake.md",
                        // "/dir/netcore/automapper.md",
                        // "/dir/netcore/publish-vueproject.md",
                    ],
                },
                {
                    text: "Docker",
                    collapsible: true,
                    children: [
                        "/dir/docker/install-docker.md",
                        "/dir/docker/install-doker-compoe.md",
                        "/dir/docker/docker-mongodb.md",
                        "/dir/docker/docker-nginx.md",
                        "/dir/docker/docker-rabbitmq.md",
                        "/dir/docker/docker-redis.md",
                    ],
                },
                {
                    text: "K8s",
                    collapsible: true,
                    children: [
                        // "/dir/highconcurrency/nginx.md",
                        // "/dir/netcore/publish-netcore.md",
                        // "/dir/netcore/publish-iis.md",
                        // "/dir/netcore/snowflake.md",
                        // "/dir/netcore/automapper.md",
                        // "/dir/netcore/publish-vueproject.md",
                    ],
                },
                {
                    text: "前端",
                    collapsible: true,
                    children: [
                        {
                            text: "VUE",
                            icon: "creative",
                            collapsible: true,
                            children:[
                                
                            ]
                        },
                        {
                            text: "ElementUI",
                            icon: "creative",
                            collapsible: true,
                            children:[
                              
                            ]
                        },
                        {
                            text: "LayUI",
                            icon: "creative",
                            collapsible: true,
                            children:[
                              
                            ]
                        },
                        {
                            text: "EasyUI",
                            icon: "creative",
                            collapsible: true,
                            children:[
                                
                            ]
                        },
                        {
                            text: "JQuery",
                            icon: "creative",
                            collapsible: true,
                            children:[
                                
                            ]
                        },
                    ],
                },

            ],
        },
    ]
});
