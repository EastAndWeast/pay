# 任务与测试记录 (2026-06-04) - API Docs 与集团链接动态跳转路由

## 任务列表
- [x] 重构 `index.html` 中的 `changeLang` 和初始化事件以支持语言关联跳转。
- [x] 重构 `coverage.html` 中的 `changeLang` 和初始化事件以支持语言关联跳转。
- [x] 验证切换语言时，Header、Mobile Menu、Footer 中的 API Docs 链接跳转地址是否正确。
- [x] 验证页脚的 Aurellix Group 链接跳转地址是否携带正确的语言参数。
- [x] 验证浏览器首选语言不在中/英文时，回退到英文页面。
- [x] 调整页脚布局，将 演示 Demo 和 商户管理后台 移至 API 接口文档下，并验证排版。
- [x] 优化国旗渲染，将国旗 Emoji 替换为 FlagCDN SVG 图标，并验证 Windows/Chrome/Edge 下的显示。

## 测试步骤与结果

### 1. 动态切换与排版及国旗显示测试
- 访问本地服务。
- 初始为中文状态下，审查元素：
  - API Docs 链接的 `href` 为 `https://docs.rail.aurellix.com/zh/`。
  - Aurellix Group 链接的 `href` 为 `https://www.aurellix.com/?lang=zh`。
  - 检查页面底部页脚（Footer）布局，演示 Demo（带有跳转小箭头图标）及 商户管理后台 已成功从“产品”（Product）列移除，排布于“资源”（Resources）列的 API 接口文档下方。
  - **国旗效果检查**：原先的 HK, TW 等字符黑框已被完全替代，呈现为带有轻微投影和细腻边框的精美彩色矢量 SVG 国旗图标，在 Windows、Chrome、Edge 浏览器中显示完美。
- 切换语言至 English：
  - API Docs 链接的 `href` 变更为 `https://docs.rail.aurellix.com/`。
  - Aurellix Group 链接的 `href` 变更为 `https://www.aurellix.com/`。
- 切换正常，且中英文状态下，各链接中原有的 `<i>` FontAwesome 箭头/纸飞机图标在更新文字后被完美复原，并未发生消失。
- 布局在手机端和 PC 端均可完美适配，显示效果极佳。

### 2. 默认语言自适应测试
- 清空 `localStorage` 中的 `pref-lang`，修改浏览器首选语言首位为中文，重新加载页面，页面自动以中文渲染。
- 修改浏览器首选语言为其它不支持语言（如西班牙语 `es`），页面自动以英文（默认语言）渲染。


