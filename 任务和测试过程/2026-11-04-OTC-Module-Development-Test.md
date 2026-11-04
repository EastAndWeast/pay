# 任务与测试记录 (2026-11-04) - 全球承兑 (OTC) 模块与独立页面开发

## 1. 任务目标
1. 创建全新的独立承兑页面 `build/otc.html`：
   - 导航菜单及浏览器 Tab 命名：中文「全球承兑」、英文「OTC」，浏览器 Tab 为 `Aurellix Pay | OTC`（中文态自动切换为 `Aurellix Pay | 全球承兑`）。
   - 包含 Hero 介绍、4 维核心数据指标、四大核心卖点卡片（VA 收款、POBO 下发、T+0 流动性、纯净合规风控）。
   - 完整展示 26 种主流及本地法币承兑清算矩阵（带 FlagCDN 矢量高清国旗、支持全部/主流/本地分类切换、各清算维度状态已完全脱敏并去除 `*` 与上游名称）。
   - 底部高转化 CTA 横幅，引导联系 Telegram (`https://t.me/cs_aurellix`)。
2. 首页 `build/index.html`：
   - 导航栏及移动端菜单加入「全球承兑 / OTC」链接（指向 `otc.html`）。
   - 新增「全球法币与稳定币双向承兑网络」精选引流板块（左侧核心价值+双按钮，右侧双向流转卡片）。
   - 页脚 Product 列加入「全球承兑 / OTC」链接。
3. 全站其它页面（`coverage.html`, `privacy.html`, `terms.html`）：
   - 顶部导航栏、移动端菜单及页脚同步加入「全球承兑 / OTC」链接，保持全站一致。
   - `translations` 字典补充 `nav_otc` 等多语言词条。

## 2. Task List
- [x] 1. 创建 `build/otc.html` 独立页面并集成 26 币种数据与交互
- [x] 2. 在 `build/index.html` 增加全球承兑精选板块并更新导航与页脚
- [x] 3. 在 `build/coverage.html`、`build/privacy.html`、`build/terms.html` 中同步更新导航与页脚
- [x] 4. 验证中英文切换、页面跳转、Telegram 链接及响应式布局
- [x] 5. 检查 Git Diff，确认无无关改动，更新文档与测试记录

## 3. 测试验证与结果

### 3.1 独立页面 (`build/otc.html`) 功能验证
- **浏览器 Tab 标题验证**：
  - 英文状态：`<title>` 为 `Aurellix Pay | OTC`。
  - 中文状态：`<title>` 动态切换为 `Aurellix Pay | 全球承兑`。
- **26 国多币种矩阵表验证**：
  - 默认展示全部 26 个币种；点击「主流币种 (10)」切换为 10 大主流法币（AUD, CAD, CHF, CNY Offshore, EUR, GBP, HKD, JPY, SGD, USD）；点击「本地及新兴市场 (16)」切换为 16 种本地币种（AED, ARS, BRL, IDR, ILS, INR, KRW, MXN, MYR, NGN, PHP, PKR, SAR, THB, VND, ZAR）。
  - 各清算维度（Global VA / Local VA / SWIFT POBO / Local Rail）展示清晰绿底 Live 徽章或蓝底 POBO 徽章，完全脱敏，无 MetaComp/StableX 残留。
- **双语切换与本地存储验证**：
  - 点击中英切换，所有文案（Hero、4 维指标、四大核心能力卡片、表头及币种名称括号描述）均完成实时无刷新切换。
  - 链接动态携带 `?lang=` 参数且持久化到 `localStorage`。
- **商务咨询链接验证**：
  - 顶部导航、Hero 主按钮、底部 Banner 按钮均正确跳转 `https://t.me/cs_aurellix`。

### 3.2 首页 (`build/index.html`) 新增板块验证
- **导航与移动端菜单**：新增 `OTC`（中文为 `全球承兑`），点击跳转至 `./otc.html`。
- **精选承兑引流板块 (`#otc-spotlight`)**：
  - 左侧展示 3 核心亮点及双按钮（「联系专属顾问」跳转 Telegram，「查看 26 国支持币种矩阵」跳转 `otc.html#currency-matrix`）。
  - 右侧展示深色高科技双向承兑架构卡片（1. 多币种法币虚拟账户 VA ⇄ 双向智能路由 ⇄ 2. 稳定币清算池 ⇄ POBO/本地清算 ⇄ 3. 全球法币极速下发 POBO）。
- **页脚 Product 列**：成功加入 `OTC / 全球承兑` 链接。

### 3.3 全站导航一致性检查
- 检查 `coverage.html`、`privacy.html`、`terms.html`，确认桌面导航栏、移动端汉堡菜单、页脚友情链接均已统一追加 `OTC / 全球承兑` 链接，且 `translations` 中英文翻译正常。
