# 任务与测试记录 (2026-11-04) - 全站 SEO 补全与中英文独立分享图生成

## 1. 任务目标
1. **生成独立的中文和英文社媒分享图**：
   - 提取首页关键 Hero 区，分别截取标准 1200×630 比例的英文分享图 `build/static/share_en.png` 与中文分享图 `build/static/share_zh.png`。
2. **全站补全 SEO 与对外分享文案（Open Graph / Twitter Card）**：
   - 涵盖首页 (`index.html`)、全球覆盖范围 (`coverage.html`)、全球承兑 (`otc.html`)、隐私政策 (`privacy.html`) 与服务条款 (`terms.html`)。
   - 补充标准 `<meta name="description">`、`<meta name="keywords">`、`<link rel="canonical">`、`<link rel="alternate" hreflang="...">`。
   - 补全 `og:title`、`og:description`、`og:image` (1200x630)、`og:site_name` 及 Twitter/Telegram 卡片标签。
   - `changeLang` 支持切换语言时，动态同步更新当前页面的 Title、Description、Open Graph 与分享图片指向。

## 2. 执行步骤与命令
- **截取分享图**：
  - 启动无头 Chromium（Headless Chrome），设定 `--window-size=1200,630` 与独立用户数据缓存，分别渲染 `index.html` 英文态与中文态。
  - 生成 `build/static/share_en.png` (1200×630, ~180KB) 与 `build/static/share_zh.png` (1200×630, ~180KB)。
- **全站注入 SEO 标签**：
  - 更新各页面 `<head>`，注入规范化的 SEO 元数据。
  - 更新各页面底部的 `changeLang` 逻辑，确保客户端动态语言切换时 Meta 标签同步更新。

## 3. 测试与验证结果
- **图片尺寸校验**：
  - `share_en.png`：宽度 1200px，高度 630px（符合 Telegram / WhatsApp / Facebook 官方推荐的最佳宽高比 1.91:1）。
  - `share_zh.png`：宽度 1200px，高度 630px。
- **SEO 标签与文案校验**：
  - 首页、覆盖范围页、承兑页均已正确包含完整的 `og:image`、`og:description` 与 `twitter:card`。
  - 检查中英文文案，已全面覆盖收单、26 国承兑、多币种 VA 账户及全球合规业务。

