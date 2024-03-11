import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "文档演示",
  description: "vuepress-theme-hope 的文档演示",

  theme,
  plugins: [
    //搜索
searchProPlugin({
  
    // 索引全部内容
    indexContent: true,
    // 为分类和标签添加索引
    customFields: [
      {
        getter: (page) => page.frontmatter.category as any,
        formatter: "分类：$content",
      },
      {
        getter: (page) => page.frontmatter.tag as any,
        formatter: "标签：$content",
      },
    ],
  }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
