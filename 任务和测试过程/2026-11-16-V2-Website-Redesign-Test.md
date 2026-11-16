# 任务与测试记录 (2026-11-16) - 官网重构独立草稿版 (`build_v2/`)

## 1. 任务目标与隔离规范
1. **零改动保护原站**：严格保持原线上版本目录 `AurellixPay_new_website/build/` 零变动。
2. **新建独立版本目录**：在 `AurellixPay_new_website/build_v2/` 内构建全新重构版官方网站，沿用相同纯静态技术栈（HTML5 + Tailwind CSS CDN + FontAwesome 6.5.1 + Google Fonts Inter + 原生 JS）。
3. **业务与双渠道脱敏落地**：
   - 将主业从“聚合收单”重构为 **「全球收款 · 全球付款 · 多维兑换」**，同步整合 **全球收付 (`Global FX` · 22国VA / 19+1币种FX / 33币种本地及POBO / 11国电子钱包 / CNY贸易结汇)** 与 **全球承兑 (`Global OTC` · 26币种6大地区 / USDT & USDC TRC20 & ERC20 充提兑)**，并精炼保留聚合收单、行业案例、RWA 生态与合规布局。
   - 全站严格脱敏（不出现任何上游供应商名称）。
4. **工程与可访问性规范**：依据 `modern-web-guidance`（`responsive-table`、`tabs`、`navbar`、`motion`、`color`）升级交互式工作台、吸顶表头矩阵、单行不折行可键盘导航 Tab、`aria-current="page"` 指示器、减少动态效果兼容及高对比度图标+文字状态标识。

---

## 2. 创建与变更文件清单
- **全新页面与共享资源（`AurellixPay_new_website/build_v2/`）**：
  - `static/v2.css` & `static/v2-common.js`（共享样式 Token、响应式吸顶表格、无障碍 Tab、`prefers-reduced-motion` 动效控制、双语与动态链接切换引擎）
  - `static/brand_icon.png`（同步自 `AurellixPay-PC/public/logo.png` 用作工作台标识与 Favicon）
  - `index.html`（重构版官网首页：Hero + 交互式 3 步资金工作台 + 收款/兑换/付款三大主引擎 + 双渠道对比卡片及 10 维矩阵 + 保留聚合收单、行业用例、RWA 与合规）
  - `fx.html`（新增全球收付独立页：3 大贸易场景、提现 vs 付款、22 国 VA 分区筛选表、19+1 换汇币种墙、11 国移动电子钱包秒付专区、6 大准入企业主体）
  - `otc.html`（升级全球承兑独立页：新增 6 大地理区域筛选与 2026-10 口径状态标识、补全动态 SEO 分享图切换）
  - `coverage.html`（升级覆盖范围页：新增 36 国双渠道分地区对照表 + 保留 `world_map.svg` 交互地图与 94 国收单目录）
  - `privacy.html` & `terms.html`（对齐新版导航、移动端抽屉样式、页脚与动态语言逻辑）

---

## 3. 执行命令与验证结果

### 执行命令
```powershell
$env:NODE_PATH = (Resolve-Path "node_modules").Path
node "C:\Users\tiana\.gemini\antigravity\brain\f56ed157-b850-4153-8cf8-e37cd313459b\scratch\verify_v2.js"
git -C "AurellixPay_new_website" diff --name-only -- build/
```

### 验证发现与修复过程
1. 初轮静态与 JSDOM 检验捕获两项问题：
   - `index.html` 的 Workbench 第 3 个面板 `wb-panel-payout` 缺少初始 `hidden` 属性，且状态徽标使用了 FontAwesome Pro 图标 `fa-shield-check` / `fa-arrow-down-to-bracket`；已修正为 `hidden` 初始状态及 Free 版兼容图标 `fa-shield-halved`、`fa-building-columns`。
   - `coverage.html` 在无 `fetch` 环境下加载 SVG 地图未做能力判断；已补充 `if (typeof fetch === 'function')` 守卫并在测试脚本内挂载真实 `world_map.svg` 进行端到端验证。
2. 终轮验证结果（全部代码定稿后执行）：
   - **`verify_v2.js`**：`VERIFICATION SUMMARY -> PASSED: 695 | FAILED: 0`（覆盖 6 页无脚本错误、零供应商敏感词、全部静态资源与内链可达、全量 `data-i18n` 中英文词条完整、`index.html` 10 维对比与工作台切换、`fx.html` 22 国 VA / 20 币种 / 11 国钱包 / 6 类主体、`otc.html` 26 币种 6 区筛选、`coverage.html` 36 国双渠道对照 + 94 国收单目录）。
   - **`git diff --name-only -- build/`**：`BUILD_DIFF_COUNT=0`（原 `build/` 目录零改动）。


---

## 4. 聚合收单强化回填与全站导航同步测试 (17:55)

### 变更摘要
- **导航与页脚显性接入收单**：在 [v2-common.js](../build_v2/static/v2-common.js) 新增 `nav_acquiring`（`Acquiring` / `聚合收单`），并在全部 6 个页面（`index.html`、`fx.html`、`otc.html`、`coverage.html`、`privacy.html`、`terms.html`）的桌面端导航栏、移动端抽屉 `#mobile-menu` 及页脚 `Solutions` 栏目加入 `index.html#acquiring` 入口；桌面端 `B2B Fiat` / `Stablecoin` 徽标调整为 `hidden xl:inline-block` 以保证 `1024px` 宽度不拥挤。
- **首屏工作台与 `#acquiring` 板块强化**：在 [index.html](../build_v2/index.html) 资金工作台新增第 4 个标签页 `04 · 聚合收单`（`wb-tab-acquiring` / `wb-panel-acquiring`）；并将页面 `#acquiring` 板块恢复升级为完整 **5 张收单方案卡片**（法币收单·稳定币结算、稳定币收单·法币结算、收款码/支付链接、含 SDK 示例的宽卡商户 API 与平台化接入、Mini-app 社交内置钱包）、右侧可交互 **`$1,200.00` 收银台演示卡片**（`#checkout-token-grid` 支持 `USDT / USDC / EURC / PYUSD` 切换）以及 **5 大核心已跑通收单市场（HK / TW / AU / US / MX）**。

### 检验过程与修复
1. **首轮复测发现与修复**：增加全站 6 页导航锚点与收单交互断言后首轮运行 `verify_v2.js` 出现 `PASSED: 756 | FAILED: 18`；原因为 `v2-common.js` 在语言切换后会将内链重写为 `index.html?lang=en#acquiring`，导致测试脚本原精确子串选择器 `a[href*="index.html#acquiring"]` 未命中。已将测试脚本更新为匹配 `a[href*="index.html"][href*="#acquiring"]` 并同步校验 `data-i18n="nav_acquiring"`。
2. **终轮验收命令与结果**：
   - 执行 `$env:NODE_PATH = (Resolve-Path "node_modules").Path; node "C:\Users\tiana\.gemini\antigravity\brain\f56ed157-b850-4153-8cf8-e37cd313459b\scratch\verify_v2.js"` -> **`VERIFICATION SUMMARY -> PASSED: 774 | FAILED: 0`**（含第 4 个工作台 Tab `wb-tab-acquiring` 切换、`#checkout-token-grid .token-btn` 4 币种 `aria-pressed` 切换及全部 6 页桌面导航/移动端抽屉/页脚锚点一致性）。
   - 执行 `git -C 'AurellixPay_new_website' diff --name-only -- build/` -> **`BUILD_DIFF_COUNT=0`**（原版零改动）。
   - 执行 `curl.exe -sI http://127.0.0.1:5180/index.html` 与 `http://127.0.0.1:5181/index.html` -> 均返回 **`HTTP/1.1 200 OK`** (`Content-Type: text/html; charset=utf-8`)。


---

## 5. 极简视觉升级重构（「字少图多 + 分组下拉导航栏」）(18:25)

### 变更摘要
- **极简分组下拉导航栏（全站 6 页同步）**：在 [v2.css](../build_v2/static/v2.css)、[v2-common.js](../build_v2/static/v2-common.js) 及全部 6 个页面（`index.html`、`fx.html`、`otc.html`、`coverage.html`、`privacy.html`、`terms.html`）的桌面导航栏，从原先 7 项平铺加徽标的拥挤排布收敛为 **5 项极简分组菜单**：`首页` | `产品服务 ▾`（全球收款 / 全球付款 / 换汇与承兑 / 全球收单）| `解决方案 ▾`（B2B 外贸收付 / 法币⇄稳定币清结算 / 跨境电商与泛娱 / RWA 代币化）| `全球覆盖` | `开发与生态 ▾`（API 文档 / Demo / 合规与清算生态）；移动端抽屉同步按产品与方案分组展示。
- **首页「字少图多」布局重塑（[index.html](../build_v2/index.html)）**：
  - **Hero 视觉板**：精简文字（短主标题 + 3 项对勾标签 `更安全 / 更高效 / 成本更优`），右侧升级为深蓝玻璃拟态三卡串联实时流转视觉面板（`ax-hero-board` + 3 张 `ax-glass-card`）。
  - **大数字指标带**：顶线装饰 + 4 个大号指标（`150+`、`50+`、`T+0`、`100%`）。
  - **4 大核心模块图文穿插（50% 极简文案 + 50% macOS UI 模拟窗口）**：「全球收款」、「换汇与承兑」、「全球付款（深海蓝专场）」与「全球收单（内嵌可点击交互 4 币种 `$1,200.00` 收银台 + HK/TW/AU/US/MX 已跑通标签）」，移除首页冗长纯文字卡片和 10 行大对比表（表格细节由独立子页承接）。
  - **4 步开通流程图 + 实景行业摄影墙 + 合规与清算牌照墙**：启用 `industry1.png`–`industry4.png`、`usStocks.jpg`、`cold.png`、`minerals.png`、`credit.jpg`、`real.png` 全套实景图片配合一句话短文案，以及 6 项全球合规与清算网络卡片。
- **子页 Hero 精简**：同步精简 [fx.html](../build_v2/fx.html)、[otc.html](../build_v2/otc.html)、[coverage.html](../build_v2/coverage.html) 的首屏说明文字并补充 3 项短标签；全部交互筛选表（22 国 VA / 20 币种 / 11 国钱包 / 26 币种承兑 / 36 国双通道对照 / 94 国收单地图）完整保留。

### 检验过程与修复
1. **首轮扫描发现与修复**：运行扩展后的 `verify_v2.js` 返回 `VERIFICATION SUMMARY -> PASSED: 1072 | FAILED: 1`，捕获 `index.html` 中 2 处注释（第 587、952 行）及 `v2.css`（第 72 行）含参考对标注释词；已将全站 HTML/JS/CSS 全部注释脱敏。
2. **终轮验证结果（全部代码定稿后执行）**：
   - 敏感词扫描（`Select-String` 检查 `build_v2/*.html`、`static/*.js`、`static/*.css`）：**0 命中**。
   - **`verify_v2.js` 全站检验**：`VERIFICATION SUMMARY -> PASSED: 1073 | FAILED: 0`（覆盖 6 页零报错、零供应商敏感词、全部 `#hash` 锚点存在性、全量中英文 `data-i18n`、Hero 3 视觉卡、4 大指标、4 个图文模块窗口、4 币种交互收银台、4 步开通卡、4 行业摄影卡、5 项 RWA 摄影卡，及 `fx/otc/coverage` 交互筛选表）。
   - **`git -C 'AurellixPay_new_website' diff --name-only -- build/`**：`BUILD_DIFF_COUNT=0`（原线下/线上版本目录 `build/` 零改动）。
   - **`curl.exe -sI http://127.0.0.1:5180/index.html` 与 `http://127.0.0.1:5181/index.html`**：均返回 `HTTP/1.1 200 OK`。


---

## 6. 「产品服务与解决方案」子页视觉化 + 收纳折叠 + 单板块视图重构 (19:08)

### 变更摘要
- **下拉菜单精简 & 可收纳抽屉引擎（[v2.css](../build_v2/static/v2.css)、[v2-common.js](../build_v2/static/v2-common.js)）**：
  - 全站顶部下拉导航收紧为紧凑视觉图标 + 单行标题（隐藏第二行冗长描述），提升交互轻盈度。
  - 新增 `details.ax-accordion` 折叠收纳组件样式与 `#hash` 锚点自动激活/展开逻辑（切换子页锚点或同一页面点击下拉链接时自动切换对应板块 Tab 并展开目标抽屉）。
- **[fx.html](../build_v2/fx.html) 改为「一页一板块」单模块切换 + 视觉主导**：
  - 顶部新增 4 板块切换栏（`#fx-module-tablist`）：`01 · 全球收款 (22国VA)`、`02 · 全球付款与电子钱包`、`03 · 实时换汇与合规结汇`、`04 · B2B 外贸解决方案`，每次仅显示当前选中模块。
  - 板块 1～3 采用「极简短文案 + 模拟账户/锁汇/钱包路由大视觉窗」排版，板块 4 使用 `industry2.png`、`industry1.png`、`industry3.png` 实景摄影大图展示 3 类贸易场景。
  - 22 国 VA 列表、11 国电子钱包、20 种换汇币种、三大贸易单据与 6 类 KYB 主体全部收纳于 4 组默认闭合的 `<details class="ax-accordion">` 抽屉内。
- **[otc.html](../build_v2/otc.html) & [coverage.html](../build_v2/coverage.html) 视觉优先与列表收纳**：
  - `otc.html` Hero 改版为 50/50 左右分栏配深色双向清结算视觉卡片，3 种兑换模式配国旗/稳定币图形顶条与单行短述，4 项基建能力说明及 26 币种清单均采用 `.ax-accordion` 默认折叠收纳。
  - `coverage.html` 将交互式 `world_map.svg` 世界地图与 5 大核心已跑通市场卡片前置展示（图在前），并将 94 国收单名录与 36 国双渠道对照矩阵分别放入 `.ax-accordion` 收纳抽屉（点击地图国家时自动打开名录抽屉并定位高亮）。
  - 全站 6 页导航内「B2B 外贸收付」链接统一指向 `fx.html#fx-b2b`。

### 验证命令与最终结果
- `Select-String` 全量敏感词扫描（`build_v2/*.html`、`static/*.js`、`static/*.css`）：**0 命中**。
- `verify_v2.js` 全站检验：**`VERIFICATION SUMMARY -> PASSED: 1109 | FAILED: 0`**（含 `fx.html` 4 板块 Tab 互斥显隐切换与 4 组收纳抽屉、3 张 B2B 实景图卡片、`otc.html` 与 `coverage.html` 各 2 组收纳抽屉，以及全套原表行数/筛选断言）。
- `git -C 'AurellixPay_new_website' diff --name-only -- build/`：**`BUILD_DIFF_COUNT=0`**。
- `curl.exe -sI` 检查 `fx.html`、`otc.html`、`coverage.html`：均返回 **`HTTP/1.1 200 OK`**。


---

## 7. 定稿替换 `build/` 目录并准备推送 `origin/dev` (19:45)
- **执行动作**：按用户确认（「1. 用原来的仓库 2. 直接替换 build」），将经全量校验通过的 `build_v2/` 完整镜像覆盖至 `build/`，并创建 `.gitignore`（排除 `.vscode/`）。
- **`build/` 替换后实测**：
  - 敏感词扫描（`build/*.html`、`build/static/*.js`、`build/static/*.css`）：**0 命中**。
  - `verify_v2.js build`：**`VERIFICATION SUMMARY -> PASSED: 1109 | FAILED: 0`**。
  - `http://127.0.0.1:5181/index.html` 与 `fx.html` 均返回 **`HTTP/1.1 200 OK`**。
