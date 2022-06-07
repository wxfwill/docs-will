import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'will笔记',
  favicon: 'https://raw.githubusercontent.com/wxfwill/blog-img/main/logo.png',
  logo: '/images/logo.png',
  outputPath: 'docs-will',
  mode: 'site',
  exportStatic: {},
  base: '/docs-will/',
  publicPath: '/docs-will/',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  extraBabelPlugins: [
    // 配置额外的babel插件
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  hash: true, // 配置生成文件包含hash后缀
});
