import { defineUserConfig } from "@vuepress/cli";
import theme from "./theme";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

const base = (process.env.BASE as "/" | `/${string}/`) || "/";

export default defineUserConfig({
    port: 8099,
    locales: {
        "/": {
            lang: "zh-CN",
            title: "Climber 技术文档 | .NET",
            description: "Climber的在线技术说明文档，本文档仅仅是各种学习工作中整理记录",
        }
    },
    base: base,
    head: [
        [
            "link",
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: `/logo-16.png`,
            },
        ],
        ['meta', { name: 'application-name', content: 'Climber' }],
        ['meta', { name: 'keywords', content: 'Climber,.NET' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'Climber' }],
        [
            'meta',
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        ],
        [
            'link',
            { rel: 'apple-touch-icon', href: `/apple-touch-icon.png` },
        ],
        ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css' }],
        [
            'script', {
                type: 'text/javascript',
                crossorigin: 'anonymous',
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7223766210897652'
            }
        ],
        [
            'script', {
                type: 'text/javascript',
                src: '/js/base.js'
            }
        ]
    ],
    theme,
    shouldPrefetch: false,
    plugins: [
        docsearchPlugin({
            appId: "8QM97XX5VE",
            apiKey: "4f26d8ac064a7f23065db5354cb5cfe6",
            indexName: "freesql",
            locales: {
                "/zh/": {
                    placeholder: "搜索文档",
                    translations: {
                        button: {
                            buttonText: "搜索文档",
                            buttonAriaLabel: "搜索文档",
                        },
                        modal: {
                            searchBox: {
                                resetButtonTitle: "清除查询条件",
                                resetButtonAriaLabel: "清除查询条件",
                                cancelButtonText: "取消",
                                cancelButtonAriaLabel: "取消",
                            },
                            startScreen: {
                                recentSearchesTitle: "搜索历史",
                                noRecentSearchesText: "没有搜索历史",
                                saveRecentSearchButtonTitle: "保存至搜索历史",
                                removeRecentSearchButtonTitle: "从搜索历史中移除",
                                favoriteSearchesTitle: "收藏",
                                removeFavoriteSearchButtonTitle: "从收藏中移除",
                            },
                            errorScreen: {
                                titleText: "无法获取结果",
                                helpText: "你可能需要检查你的网络连接",
                            },
                            footer: {
                                selectText: "选择",
                                navigateText: "切换",
                                closeText: "关闭",
                                searchByText: "搜索提供者",
                            },
                            noResultsScreen: {
                                noResultsText: "无法找到相关结果",
                                suggestedQueryText: "你可以尝试查询",
                                reportMissingResultsText: "你认为该查询应该有结果？",
                                reportMissingResultsLinkText: "点击反馈",
                            },
                        },
                    },
                },
            },
        }),
        googleAnalyticsPlugin({
            id: 'G-DBKD2VY1WB'
        })
    ],
});
