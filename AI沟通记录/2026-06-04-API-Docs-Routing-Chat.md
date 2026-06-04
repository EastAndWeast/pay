# AI沟通记录 (2026-06-04) - API Docs 与集团链接动态跳转路由

## 用户需求
- API Docs：当页面语言是中文的时候跳转中文文档（`https://docs.rail.aurellix.com/zh/`），页面是英文的时候跳转英文文档（`https://docs.rail.aurellix.com/`），默认打开是英文。
- 网站默认语言逻辑：根据浏览器语言自适应，若浏览器语言不在中/英文内，则默认显示英文。
- 页脚的集团跳转链接也有语言逻辑（中文跳转 `https://www.aurellix.com/?lang=zh`，英文跳转 `https://www.aurellix.com/`）。
- 把“演示DEMO”和“商户管理后台”移动至“API 接口文档”下方（即移入资源/Resources列）。
- 优化国旗图标：解决 Windows 平台下 Chrome/Edge 不原生支持国旗 Emoji 从而显示为两字母黑框的体验问题，采用 FlagCDN 提供的精美 SVG 国旗替代全站原有国旗 Emoji。

## 实施方案与过程
1. 在 `changeLang` 中加入了 API Docs (`[data-i18n="nav_api"]`) 动态 `href` 替换逻辑。
2. 页脚集团链接 (`#group-link`) 动态配置。
3. 修正了 `changeLang` 中 `el.innerText` 覆盖导致 FontAwesome 图标丢失的 Bug，新增图标自动留存逻辑。
4. 重构了 `DOMContentLoaded` 事件，添加浏览器首选语言判断的降级 fallback。
5. 在 `index.html` 和 `coverage.html` 的页脚中将“演示DEMO”和“商户管理后台”移动至“API 接口文档”下方。
6. 将 `coverage.html` 推荐市场卡片、140+全球国家地区目录的国旗 Emoji 以及 `index.html` 底部合规标志的国旗 Emoji 替换为 FlagCDN SVG 图片。

## 确认状态
- 用户于 2026-06-04 确认执行，并追加优化国旗渲染的要求，目前已修改完成且验证完毕。
