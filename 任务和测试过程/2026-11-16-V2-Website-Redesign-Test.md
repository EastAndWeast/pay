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


---

## 8. 集团主站升级、4 业务覆盖地图、RWA 生态入口、导航高亮修复与去 OTC 字样 (2026-11-17)

### 变更摘要
1. **集团主站定位升级与全站清除可见 `"OTC"` 字样**：
   - 在 [v2-common.js](../build_v2/static/v2-common.js) 及 6 个页面（[index.html](../build_v2/index.html)、[fx.html](../build_v2/fx.html)、[otc.html](../build_v2/otc.html)、[coverage.html](../build_v2/coverage.html)、[privacy.html](../build_v2/privacy.html)、[terms.html](../build_v2/terms.html)）的中英文文案、页面标题、Meta 标签与页脚中，统一升级为 **Aurellix 集团**主站口径，覆盖 Pay（全球收付及聚合收单）、全球承兑（法币 ⇄ 稳定币清结算）及 RWA 子网站三大板块；全部可见 UI、标题与描述中的 `"OTC"` 字样均替换为 `全球承兑` / `Global Conversion` / `Fiat ⇄ Stablecoin Clearing` 等合规清结算表述（保留内部文件名 `otc.html` 不影响链接）。
2. **`coverage.html` 拆分为 4 业务独立 Tab 联动世界地图**：
   - 新增 `#cov-biz-tablist`（`01 · 全球收款` | `02 · 全球付款` | `03 · 全球承兑` | `04 · 全球收单`），点击切换同步重绘 `static/world_map.svg` 高亮国家与地图图例，并对应展示 22 国本地 VA 卡片 (`#cov-va-grid`)、33+ 本地银行与 11 国 19 种电子钱包卡片 (`#cov-payout-grid`)、26 国承兑 KPI 与 36 国双渠道矩阵 (`#dm-matrix-details`)、以及 5 大已跑通核心市场与 94 国收单目录 (`#cov-dir-details`)；同步将首页 `#acquiring` 「查看全部 94+ 个收单通道国家」锚点指向 `coverage.html#cov-panel-acquiring`。
3. **`RWA 生态 ↗` 独立导航与全站统一域名常量**：
   - 在 [v2-common.js](../build_v2/static/v2-common.js) 定义单一配置常量 `RWA_SITE_URL = 'https://www.aurellix.com/'`，供全站 `[data-rwa-link="true"]` 与 `#group-link` 同步读取（未来更换 RWA 子站域名仅需修改此行）。
   - 在 6 页桌面端 `<nav>`、`#mobile-menu` 及页脚核心菜单区新增独立 `RWA 生态` (`RWA Ecosystem`) 入口，并在首页 `#rwa` 区块新增直达子站按钮。
4. **修复「解决方案」跳转后导航高亮误亮「产品服务」问题**：
   - 在 `v2-common.js` 实现 `updateNavHighlight(forcedGroup, forcedSubKey)`，结合路径、`#hash` 及 `fx.html` Tab 状态动态维护桌面端及移动端 `aria-current="page"`（访问 `fx.html#fx-b2b`、点击 Tab 4 `B2B 外贸解决方案`、访问 `otc.html#solution`、`index.html#scenarios`、`index.html#rwa` 时均正确高亮 **解决方案**）。
5. **合规资质精简（`index.html#compliance`）**：
   - 移除 `瑞士 SRO 合规` 与 `迪拜 PSP 牌照` 两张卡片，保留 `波兰 VASP 资质`、`PCI DSS & KYT`、`SWIFT · SEPA · PIX`、`USDT · USDC · PYUSD` 共 4 张卡片并改为 4 列自适应网格（`grid-cols-2 lg:grid-cols-4`）。

### 实测执行命令与验收结果（`build_v2/` 镜像覆盖 `build/` 后复测）
- **同步 `build/` 命令**：`Remove-Item -Path "AurellixPay_new_website\build\*" -Recurse -Force; Copy-Item -Path "AurellixPay_new_website\build_v2\*" -Destination "AurellixPay_new_website\build" -Recurse -Force`
- **自动化功能、i18n 与合规检查**：
  - `node "...\verify_v2.js" build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1240 | FAILED: 0`**（退出码 `0`）
  - `node "...\verify_v2.js" build` → **`VERIFICATION SUMMARY -> PASSED: 1240 | FAILED: 0`**（退出码 `0`，涵盖中英文无 `OTC` 校验、4 合规卡校验、RWA 链接校验、`fx.html#fx-b2b` / `otc.html#solution` / `index.html#rwa` 导航高亮校验、`coverage.html` 4 业务 Tab 与 SVG 地图高亮联动及深链路由校验）
- **敏感词与可见 `OTC` 静态扫描**：
  - `Select-String -Path "AurellixPay_new_website\build\*.html","AurellixPay_new_website\build\static\v2-common.js" -Pattern "pyvio|mce|metacomp|stablex|unlimit|gatefi|visionx"` → **0 命中**
  - `Select-String -Path "AurellixPay_new_website\build\*.html","AurellixPay_new_website\build\static\v2-common.js" -Pattern "\bOTC\b" -CaseSensitive` → **0 命中**
- **本地预览双端口 HTTP 校验（`5180` = `build_v2`，`5181` = `build`）**：
  - `index.html`、`fx.html`、`otc.html`、`coverage.html`、`privacy.html`、`terms.html`、`static/v2-common.js`、`static/v2.css`、`static/world_map.svg` 共 18 个端点 `curl.exe` 请求全部返回 **`200`**。


---

## 9. RWA 平台命名统一、全站去 PYUSD、页脚双官网入口与隐私/服务条款完善 (2026-11-17 14:05)

### 变更摘要
1. **RWA 平台统一命名**：全站 6 页顶部导航、移动端抽屉、页脚业务列与首页 `#rwa` 按钮统一改为 **`RWA 平台`** / **`RWA Platform`**，全面去除 `官网子站` / `子网站` / `Sub-site` 表述（[v2-common.js](../build_v2/static/v2-common.js)、[index.html](../build_v2/index.html) 等）。
2. **全站移除 `PYUSD`**：
   - `index.html#checkout-token-grid` 改为 `grid grid-cols-3 gap-2.5 mb-5`（仅保留 `USDT`、`USDC`、`EURC`）。
   - `index.html#compliance` 卡片由 `USDT · USDC · PYUSD` 改为 `USDT · USDC`。
   - [otc.html](../build_v2/otc.html) Mode 3 卡片改为 `EURC / Local FX` 与 `USDT ⇄ USDC ⇄ EURC`。
3. **页脚左侧改版**：6 页 `<footer>` 左侧移除圆形 Telegram 按钮，改为 **`支付官网`** (`#pay-site-link`, `href="index.html"`) 与 **`RWA 官网`** (`#group-link`, `data-rwa-link="true"`) 并排显示（右侧咨询顾问 `@cs_aurellix` 保持不变）。
4. **[privacy.html](../build_v2/privacy.html) 与 [terms.html](../build_v2/terms.html) 完善**：
   - 删除顶部「最近更新 / Last updated」字样及对应 i18n 键。
   - 中英文均扩充至 8 章企业级合规条款（覆盖 KYB/UBO、贸易佐证单据、Cookie 与本地存储、锁汇与链上白名单规则、退汇与拒付、API 与知识产权、风控中止与责任限制及信息安全/权利保障）。
   - 联系方式邮箱统一更改为 `info@aurellix.com`（清理旧 `privacy@aurellix.com` 与 `legal@aurellix.com`）。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `node "...\verify_v2.js" build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1310 | FAILED: 0`**（退出码 `0`）
- `node "...\verify_v2.js" build` → **`VERIFICATION SUMMARY -> PASSED: 1310 | FAILED: 0`**（退出码 `0`）
- `Select-String`（检查 `build/*.html` 与 `build/static/v2-common.js` 中的第三方词、`\bOTC\b`、`\bPYUSD\b`、`官网子站|子网站|Sub-site`、`privacy@aurellix|legal@aurellix`）→ **0 命中**
- `curl.exe` 请求 `http://127.0.0.1:5180/`（`build_v2`）与 `http://127.0.0.1:5181/`（`build`）下全部 6 页 HTML 与 `static/v2-common.js` 共 14 个端点 → 全部返回 **`200`**


---

## 10. 全站折叠区块默认展开、人民币汇率更新至 6.6700 与 API 文档 `/zh/` 404 修复 (2026-11-17 14:42)

### 变更摘要
1. **全站 8 处折叠详情默认展开**：为 [fx.html](../build_v2/fx.html) 全部 4 组（22 国本地 VA、11 国电子钱包、20 币种全览、三大贸易单据与 6 类 KYB 主体）、[otc.html](../build_v2/otc.html) 全部 2 组（4 项清结算能力、26 国多币种矩阵）与 [coverage.html](../build_v2/coverage.html) 全部 2 组（36 国双渠道矩阵、94 国收单名录）`<details class="ax-accordion">` 统一添加 `open` 属性。
2. **USD/CNY 汇率更新至最新参考汇率 (`6.6700`)**：将 [index.html](../build_v2/index.html) 与 [fx.html](../build_v2/fx.html) 演示卡片的中英文汇率 `1 USD = 7.2450 CNY` 同步更新为 `1 USD = 6.6700 CNY`（实时查询最新在岸/中间价参考约 `6.665–6.671`），对应 `$100,000.00` 试算金额同步更新为 `667,000.00` / `667,000 CNY`。
3. **修复中文态点击 API 文档跳转 404**：排查确认 `https://docs.rail.aurellix.com/` 为 VitePress (`v1.6.4`) SPA 文档站，无 `/zh/` 路由导致访问 `/zh/` 时客户端渲染 404；已将 [v2-common.js](../build_v2/static/v2-common.js) 中中英文 `API 文档` 链接统一指向 `https://docs.rail.aurellix.com/`。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `node "...\verify_v2.js" build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1319 | FAILED: 0`**（退出码 `0`）
- `node "...\verify_v2.js" build` → **`VERIFICATION SUMMARY -> PASSED: 1319 | FAILED: 0`**（退出码 `0`，新增全站 8 组 `details.ax-accordion` `open === true` 与旧汇率清理断言）
- `Select-String` 扫描 `build/*.html` 与 `build/static/v2-common.js`（旧汇率 `7.2450`/`724,500`、`docs.rail.aurellix.com/zh`、第三方词、`PYUSD`）→ **0 命中**
- `curl.exe` 请求 `5180` 与 `5181` 端口下 6 页 HTML 与 `v2-common.js` 共 14 个端点 → 全部返回 **`200`**


---

## 11. 官网接入 App 钱包入口（方案 B）(2026-11-17 15:39)

### 变更摘要
1. **单点外链常量与双语自动拼接**：在 [v2-common.js](../build_v2/static/v2-common.js) 新增 `WALLET_SITE_URL = 'https://www.aurellix.com/wallet'`，补充 `nav_wallet`（`App Wallet` / `App 钱包`）与 `nav_wallet_desc`（`Multi-asset payment & RWA wallet app` / `多资产支付与 RWA 钱包客户端`）词条；`applyLang` 统一为所有 `a[data-wallet-link="true"]` 在中文态追加 `?lang=zh`，英文态保持根地址，并导出 `AurellixV2.getWalletUrl`。
2. **全站 6 页低干扰入口落位（方案 B）**：保持首页 B2B 收付主链路不变，在 `index.html`、`fx.html`、`otc.html`、`coverage.html`、`privacy.html`、`terms.html` 全部 6 个页面的桌面端 `开发与生态 ▾` 下拉菜单、移动端抽屉菜单 `#mobile-menu`（`Demo` 下方）以及页脚 `开发与入口` 列（`商户管理后台` 下方）统一接入 `App Wallet / App 钱包` 外链入口（`data-wallet-link="true"`，`target="_blank" rel="noopener noreferrer"`）。
3. **测试脚本覆盖**：在 `verify_v2.js` 新增桌面端导航、移动端抽屉、页脚 `a[data-wallet-link="true"]` 存在性及中英文 `?lang=zh` / 无参数切换断言（每页 `>= 3` 处）。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `$env:NODE_PATH = (Resolve-Path "node_modules").Path; node "...\verify_v2.js" build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1379 | FAILED: 0`**
- `$env:NODE_PATH = (Resolve-Path "node_modules").Path; node "...\verify_v2.js" build` → **`VERIFICATION SUMMARY -> PASSED: 1379 | FAILED: 0`**
- `Select-String` 禁用词扫描（`PYUSD|官网子站|子网站|Sub-site|privacy@aurellix\.com|legal@aurellix\.com`）→ **`PROHIBITED_TERMS_HITS: 0`**
- `curl.exe` 请求 `http://127.0.0.1:5180/`（`build_v2`）与 `http://127.0.0.1:5181/`（`build`）下全部 6 页 HTML（共 12 个端点）→ 全部返回 **`200`**


---

## 12. 新增独立 App 钱包介绍页 `wallet.html`（沿用主站 UI，内链直达）(2026-11-17 15:53)

### 变更摘要
1. **新增独立静态页 [wallet.html](../build_v2/wallet.html)**：沿用主站 `v2.css` + `v2-common.js` 视觉体系与中英文双语机制，构建包含 Hero 玻璃拟态钱包总览卡（流动支付余额 + RWA 持仓 + 快捷操作 + 近期动态）、三大核心能力卡片（多链稳定币收付 / 直连法币清结算网络 / RWA 资产一户管理）、三步运作架构 + macOS 通道预览窗口以及底部行动横幅（内含 `data-wallet-link="true"` 跳转 `https://www.aurellix.com/wallet` 按钮）。
2. **全站导航改为内链跳转**：将全站全部页面（`index.html`、`fx.html`、`otc.html`、`coverage.html`、`privacy.html`、`terms.html`、`wallet.html`）桌面端 `开发与生态 ▾` 下拉、移动端抽屉 `#mobile-menu` 及页脚 `开发与入口` 列中的 `App 钱包` 统一指向站内 `wallet.html`（自动透传 `?lang=`）。
3. **动态路由高亮适配**：在 [v2-common.js](../build_v2/static/v2-common.js) `updateNavHighlight` 新增 `page === 'wallet.html'` 分支，自动高亮 `开发与生态 ▾` 及 `App 钱包` 子项。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `verify_v2.js build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1598 | FAILED: 0`**（7 页全覆盖）
- `verify_v2.js build` → **`VERIFICATION SUMMARY -> PASSED: 1598 | FAILED: 0`**（7 页全覆盖）
- `Select-String` 禁用词扫描 → **`PROHIBITED_TERMS_HITS: 0`**
- `curl.exe` 请求 `5180` 与 `5181` 端口下全部 7 页 HTML（共 14 个端点）→ 全部返回 **`200`**


---

## 13. 修复 `wallet.html` UI 样式并改为直接提供 App 下载入口 (2026-11-17 16:03)

### 问题与修复摘要
1. **UI 样式对齐主站 `v2.css`**：
   - 修复原版误用不存在的 `ax-pill`、`btn-outline`、`ax-card`、`ax-mockup` 类名导致的 Hero 按钮直角、无边框、能力卡片无阴影边框及预览窗框线缺失问题；改为完整对齐 `index.html` 的 Tailwind 胶囊徽标、`btn-primary px-7 py-4 rounded-xl`、`btn-contact px-6 py-4 rounded-xl`、白色描边能力卡片及 `.ax-visual-stage` + `.ax-dashed-frame` + `.ax-window` macOS 预览窗。
   - 为 Hero 右侧 `.ax-hero-board` 补齐 `p-6 sm:p-8` 与内层 `.ax-glass-card` 的 `p-5` / `p-4`、`sm:col-span-5` / `sm:col-span-7` 栅格及 `shrink-0` 金额排版，彻底消除右侧卡片贴边与数字截断溢出。
2. **去除外部跳转，改为站内直装下载入口（`#wallet-download`）**：
   - Hero 主按钮改为锚点平滑定位至 `#wallet-download`（`立即下载 App` / `Download App`），彻底移除跳转到 `https://www.aurellix.com/wallet` 的外链。
   - 在 `#wallet-download` 预览窗内置 **iOS 客户端（iOS 14.0+ · App Store / TestFlight）** 与 **Android APK（Android 8.0+ · 官方直装安装包）** 双下载入口卡片（由 `APP_DOWNLOAD_URLS = { ios, android }` 统一配置），未配置直链包前点击 `triggerAppDownload()` 会在当前页内动态更新下载状态提示并引导获取安装包，不跳转离站。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `verify_v2.js build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1604 | FAILED: 0`**
- `verify_v2.js build` → **`VERIFICATION SUMMARY -> PASSED: 1604 | FAILED: 0`**
- `curl.exe` 请求 `http://127.0.0.1:5180/wallet.html` 与 `http://127.0.0.1:5181/wallet.html` → 均返回 **`200`**


---

## 14. 对齐 `aurellix.com/download` 实现 `wallet.html` 弹出二维码与官方直链下载 (2026-11-17 16:18)

### 变更摘要
1. **对标 `https://www.aurellix.com/download` 提取真实下载配置**：
   - 核实并接入 iOS TestFlight 链接 `https://testflight.apple.com/join/DFSw6TPa` 与 Android 官方企业直链 `https://download.aurellix.com` 至 `APP_DOWNLOAD_URLS`。
2. **新增弹出二维码模态窗 `#wallet-qr-modal`**：
   - 点击 `#wallet-download` 下的 **iOS 客户端** 或 **Android APK** 按钮时，弹出居中二维码弹窗（使用 `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=...` 动态编码对应平台下载地址），同时在弹窗内附带简洁安装指引与「直接打开下载」链接（支持点击遮罩或 `Esc` 键关闭）。
   - 下载窗口底部同时保留「直接下载 APK」快捷按钮指向 `https://download.aurellix.com`。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `verify_v2.js build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1609 | FAILED: 0`**
- `verify_v2.js build` → **`VERIFICATION SUMMARY -> PASSED: 1609 | FAILED: 0`**（已覆盖点击 Android 弹窗检验二维码 URL 与直链 `https://download.aurellix.com`）
- `curl.exe` 请求 `5180` 与 `5181` 端口 `wallet.html` → 均返回 **`200`**


---

## 15. 全站 SEO 升级与 Telegram / WhatsApp 社交分享卡片优化 (2026-11-17 16:35)

### 变更摘要
1. **重制双语社交分享主图（`1200×630`）**：
   - 排查发现原 [share_en.png](../build_v2/static/share_en.png) 与 [share_zh.png](../build_v2/static/share_zh.png) 仍为旧版收银台截图（含 `PYUSD`、`share_zh.png` 左上角 Logo 破图且英文版实为中文）。已按新版集团主站风格重新渲染生成 `1200×630` 全新 `share_en.png`（英文）与 `share_zh.png`（中文），彻底清除 `PYUSD` 与破图问题。
2. **修复静态 HTML OG/Twitter 分享域名与 Telegram/WhatsApp 字段**：
   - 将全站 7 页 `<head>` 与 [v2-common.js](../build_v2/static/v2-common.js) 默认分享图地址从旧域名 `https://pay-52p.pages.dev/static/share_*.png` 统一修正为线上主域 `https://rail.aurellix.com/static/share_*.png?v=20261117`（附带版本参数刷新 Telegram `@WebpageBot` 与 WhatsApp 缓存）。
   - 为全部 7 页补齐 `og:url`、`og:locale` (`en_US`)、`og:locale:alternate` (`zh_CN`)、`og:image:secure_url`、`og:image:type`、`og:image:width`、`og:image:height`、`og:image:alt`、`og:site_name`。
3. **技术 SEO 与结构化数据**：
   - 新增 [robots.txt](../build_v2/robots.txt) 与多语言 `xhtml:link` [sitemap.xml](../build_v2/sitemap.xml)（覆盖全站 7 页及 `en`/`zh`/`x-default`）。
   - 为全站 7 页补齐 `meta[name="robots"]`、`meta[name="theme-color"]` 与 `hreflang="x-default"`，并在 `index.html`、`fx.html`、`otc.html`、`coverage.html`、`wallet.html` 植入 Schema.org `JSON-LD` 结构化数据（`Organization` / `WebSite` / `FinancialService` / `SoftwareApplication`）。

### 实测命令与最终结果（`build_v2/` 镜像覆盖 `build/` 后执行）
- `verify_v2.js build_v2` → **`VERIFICATION SUMMARY -> PASSED: 1632 | FAILED: 0`**
- `verify_v2.js build` → **`VERIFICATION SUMMARY -> PASSED: 1632 | FAILED: 0`**（含 `robots.txt`、`sitemap.xml`、7 页完整 SEO/OG/Twitter 标签及无旧 `pay-52p.pages.dev` 残留断言）
- `curl.exe` 请求 `5180` 与 `5181` 端口下 `robots.txt`、`sitemap.xml`、`static/share_en.png`、`static/share_zh.png`、`index.html` 共 10 个端点 → 全部返回 **`200`**
