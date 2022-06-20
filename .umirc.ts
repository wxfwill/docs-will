import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'will笔记',
  favicon: 'https://raw.githubusercontent.com/wxfwill/blog-img/main/logo.png',
  logo: '/docs-will/images/logo.png',
  outputPath: 'docs-will',
  mode: 'site',
  exportStatic: {},
  base: '/docs-will/',
  publicPath: '/docs-will/',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/wxfwill/docs-will',
    },
  ],
  menus: {
    '/components': [
      {
        title: 'SVG',
        children: [
          'components/svg/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
      {
        title: '测试二',
        children: [
          'components/foo/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
      {
        title: '测试三',
        children: [
          'components/world/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
    ],
  },
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
