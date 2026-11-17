# AI沟通记录 - 2026-11-16 (官方网站项目阅读与梳理)

- **日期**：2026-11-16
- **记录人**：Antigravity

---

## 1. 用户需求与输入摘要
- 用户原始输入：「请你阅读一下这个项目，因为接下来我要和你一起来调整一下我们的官方网站。」（附带截图指向 `AurellixPay_new_website` 目录）。
- 当前阶段任务：只读梳理官网项目现状、代码架构、历史决策与可优化/联动点，**暂不修改业务代码**，等待用户明确下一步官网调整需求。

---

## 2. 官网项目 (`AurellixPay_new_website`) 现状梳理

### 2.1 工程、Git 与部署架构
- **项目路径**：`AurellixPay_new_website/build/`
- **独立 Git 仓库**：远端 `origin` 为 `https://github.com/EastAndWeast/pay`，当前分支 `dev`，最新已提交 Commit 为 `7684214`（`fix: adapt og:image fallback urls and add og:image:secure_url for Telegram`）；工作区未提交变动仅为 `提示词.txt`（追加历史记录）及 `.vscode/`。
- **线上域名配置**：主域名配置为 `rail.aurellix.com`（`canonical`、`hreflang`、`og:url`），静态分享图兜底引用 Cloudflare Pages 地址 `https://pay-52p.pages.dev/static/share_en.png` / `share_zh.png`。
- **技术栈**：纯静态多页面 HTML5 + Tailwind CSS CDN + FontAwesome 6.5.1 + Google Fonts (`Inter`) + 原生 JavaScript。
- **双语与路由机制**：支持 `en` / `zh` 双语，通过 `URL ?lang=` 参数 -> `localStorage('pref-lang')` -> `navigator.language` 浏览器语言自适应；跳转 `.html` 内链时动态透传 `?lang=` 参数。

### 2.2 现有 5 个核心页面结构
1. **`build/index.html`（官网首页）**：
   - **顶部导航（PC + 移动端）**：`Home / 首页`、`Coverage / 覆盖范围`、`OTC / 全球承兑`、`API Docs / API 接口文档`（随语言动态切换 `/` 与 `/zh/`）、`Demo / 演示 Demo`、语言切换下拉、`Contact / 咨询`（`https://t.me/cs_aurellix`）、`Merchant Portal / 商户管理后台`（`https://merchant.rail.aurellix.com/`）。
   - **Hero 首屏**：左侧平台定位与 `Merchant Portal` / `Talk to Sales` 双按钮，右侧浮动 `Aurellix Pay Checkout` 卡片（展示 USDT / USDC / EURC / PYUSD）。
   - **解决方案（`#features`）**：法币收单·稳定币结算、稳定币收单·法币结算、收款码 / 支付链接、商户 API 与平台化接入、Mini-app 社交内置钱包。
   - **全球承兑与清结算精选（`#otc-spotlight`）**：呈现三大兑换形态徽章（`Fiat ⇄ Stablecoin`、`Fiat ⇄ Fiat FX`、`Crypto ⇄ Crypto`）、3 项核心卖点、双行动按钮，以及右侧深色 3 步双向清算架构卡片（1. VA 收款 → 2. 稳定币清算 → 3. POBO/Local Rail 下发）。
   - **行业解决方案与 RWA 生态（`#cases`）**：跨境电商、游戏娱乐、MCN 网红经纪、线下连锁门店，以及 5 类 RWA 资产代币化案例（美股、实物黄金、矿产资源、企业信贷、跨境地产）。
   - **全球合规与统计（`#compliance`）**：瑞士 SRO、迪拜 PSP、波兰 VASP 合规说明，以及 `150+` 国家、`50+` 法币、`30+` 本地通道指标。
   - **多列页脚**：含品牌说明、Telegram 与 `Aurellix Group` 链接（随语言附加 `?lang=zh`）、`Product`（Home / Coverage / OTC）、`Resources`（API Docs / Demo / Merchant Portal）、`Contact` 及隐私/条款链接。

2. **`build/coverage.html`（覆盖范围 - 收单 On-ramp 通道）**：
   - 异步加载交互式世界地图 `build/static/world_map.svg`，带 4 大区域脉冲热点按钮（APAC / Europe & UK / LatAm / Others），支持地图与下方卡片悬停及点击跳转联动。
   - 统计指标卡（`150+` 国家、`50+` 法币、`30+` APMs）及 5 大推荐已跑通市场（中国香港 HK、中国台湾 TW、澳大利亚 AU、美国 US、墨西哥 MX）。
   - 全球多区域支持目录（`countriesData` 共收录 **94** 个国家/地区：APAC 26、Europe & UK 32、LatAm 17、Others 19），每张卡片展示 FlagCDN 国旗与本地通道/卡支付标签，底部附可用性免责声明。

3. **`build/otc.html`（全球承兑 - 机构级法币与稳定币清结算）**：
   - Hero 区 + 4 维核心指标（`26+` 清算币种、`T+0` 实时交割、`4 Rails` 银行通道、`100%` 持牌合规）。
   - 3 大兑换业务卡片（法币⇄稳定币双向承兑、全球跨币种法币兑换 FX、大额稳定币互兑）。
   - 4 大核心基础设施卡片（多币种 VA 收款、全球法币极速下发 POBO、T+0 机构级深度流动性、持牌合规与防冻卡风控）。
   - 26 国多币种承兑与银行清算矩阵表（`currenciesList` 共 **26** 项：主流币种 `10` 项 + 本地及新兴市场 `16` 项），支持 `全部 / 主流 / 本地及新兴` Tab 筛选，按 `Global VA`、`Local VA`、`SWIFT Payout (POBO)`、`Local Rail` 展示 `Live` / `POBO` / `—` 状态，已全面完成供应商脱敏与简化标识。
   - 底部转化横幅（引导联系 `https://t.me/cs_aurellix`）。

4. **`build/privacy.html` & `build/terms.html`（合规法律页）**：
   - 中英双语静态正文切换（`#content-en` / `#content-zh`），包含 `@cs_aurellix` 联系方式与基础页脚。

---

## 3. 联动视角与存量细节发现（供后续调整参考，暂未改动代码）

### 3.1 与主项目（PC/App 端）近期演进的业务差异
- 主工作区（`AurellixPay-PC/` 与移动端 `app-global-fx.html`）已从单通道演进为：**「收单」** + **「资金」双渠道**（第 1 渠道 **「全球承兑（法币·稳定币）」** + 第 2 渠道 **「全球收付（外贸·本币）」**，含 22 国 B2B 收款、19 币种换汇、33 种 Local / 11 种 SWIFT / 11 国 19 电子钱包付款、CNY 贸易申报结汇，以及 6 大地区 36 国分地区双渠道对比矩阵）。
- `AurellixPay-PC/public/logo.png` 已更换为新版深蓝白 `A` 品牌徽标，而官网 `build/static/` 仍沿用既有 `headerLogo.png` / `logo.png` / `vite.png` / `favicon.svg`。
- 后续可与用户确认是否将「全球收付」业务、双渠道对比或最新品牌 Logo 纳入官网。

### 3.2 官网代码巡检发现的既有小问题
1. **移动端抽屉菜单样式错位**：`coverage.html`（271 行）、`privacy.html`（83 行）、`terms.html`（83 行）的 `#mobile-menu` 内，`otc.html` 链接仍保留桌面端小字 class（`text-link text-[0.75rem] uppercase font-bold tracking-widest text-slate-500`），与移动端同级大号菜单不一致。
2. **动态分享 Meta 未全站同步**：`otc.html` 的 `changeLang()` 目前只更新了 `document.title`，未像 `index.html`、`coverage.html` 那样同步更新 `meta[name="description"]`、`og-title`、`og-desc`、`og-image` 等标签。
3. **法律页结构与语言逻辑未完全对齐**：`privacy.html` 与 `terms.html` 的页脚仍将 `Demo` 与 `Merchant Portal` 放在 `Product` 列（未移至 `Resources` 列），`API Docs` 未接入随语言切换 `/zh/` 逻辑，默认语言兜底缺少 `navigator.language` 自适应。

---

## 4. 当前状态
- 已完成 `AurellixPay_new_website` 全部页面、静态资源、Git 状态与历史文档的读取归档，等待用户明确下一步具体调整方向。


---

## 5. 官网全面重构需求讨论与方案规划 (17:16)
- **用户核心诉求**：
  1. 业务战略转型：以前官网主打“收单”，现在收单不再是主业，要重点打造 **「收款 · 付款 · 兑换」** 三大业务。
  2. 双供应商底座：已接入 **Pyvio**（全球收付：外贸本币 VA 收款、实时换汇、Local/SWIFT/电子钱包付款、CNY 贸易结汇）与 **MCE**（全球承兑：26 币种法币⇄稳定币双向承兑与全球清算）。
  3. 要求结合现有商户后台（`AurellixPay-PC`）给出内容、结构、UI、展现重点及旧内容保留部分的全面重构建议，先讨论需求不直接改代码。
- **调研与规划产出**：
  - 通读商户后台核心页面：`ConsoleLayout.tsx`、`FxGatewaysPage.tsx`、`GlobalAccountIntro.tsx`、`GlobalFxIntro.tsx`、`SupportPage.tsx`、`FxSupportPage.tsx`、`fxMockData.ts`、`OverviewPage.tsx`、`FxOverviewPage.tsx`、`DashboardPage.tsx`。
  - 产出详细规划方案：[文档/2026-11-16-官网全面重构规划方案.md](../%E6%96%87%E6%A1%A3/2026-11-16-%E5%AE%98%E7%BD%91%E5%85%A8%E9%9D%A2%E9%87%8D%E6%9E%84%E8%A7%84%E5%88%92%E6%96%B9%E6%A1%88.md)。
- **待确认事项**：等待用户针对导航结构（是否新增 `fx.html` 全球收付页）、双渠道 36 国对照表放置位置、旧版收单/RWA 内容保留程度、Favicon 图标统一及 CNY 结汇合规对外口径 5 个问题拍板。


---

## 6. 任务完成：重构版官网独立草稿 (`build_v2/`) 搭建与验证 (17:38)
- **用户指令**：在 `AurellixPay_new_website` 下新建独立文件夹起草重构版本（不改动原 `build/`），沿用相同技术栈，并指出在 UI/素材上需要用户配合的事项。
- **落地内容**：
  - 新建 [build_v2/](../build_v2/) 目录，复制原有静态资源及新版商户后台品牌徽标 [brand_icon.png](../build_v2/static/brand_icon.png)，抽取共享样式 [v2.css](../build_v2/static/v2.css) 与交互脚本 [v2-common.js](../build_v2/static/v2-common.js)。
  - 完成 6 个全新/升级页面：[index.html](../build_v2/index.html)、[fx.html](../build_v2/fx.html)、[otc.html](../build_v2/otc.html)、[coverage.html](../build_v2/coverage.html)、[privacy.html](../build_v2/privacy.html)、[terms.html](../build_v2/terms.html)，全面落地 `modern-web-guidance`（`responsive-table`、`tabs`、`navbar`、`motion`、`color`）规范。
- **验收状态**：`verify_v2.js` 全量校验 **695 / 695 PASS**，`git diff --name-only -- build/` 为 **0**（原线上目录完好未动）；详见 [2026-11-16-V2-Website-Redesign-Test.md](../%E4%BB%BB%E5%8A%A1%E5%92%8C%E6%B5%8B%E8%AF%95%E8%BF%87%E7%A8%8B/2026-11-16-V2-Website-Redesign-Test.md)。


---

## 7. 启动新旧官网本地预览并引导决策确认 (17:46)
- **用户指令**：「需要我确定什么内容，请你引导我进行操作」
- **执行动作**：
  1. 启动本地双端口静态对比预览服务：`http://127.0.0.1:5180`（V2 重构草稿版 `build_v2/`）与 `http://127.0.0.1:5181`（原版 `build/`），方便用户同屏对比验收。
  2. 发起 4 项关键业务与 UI 决策确认（顶部导航栏结构、CNY 结汇对外表述尺度、旧版收单/RWA 板块保留程度、首屏右侧视觉形式），等待用户确认后推进精调或替换上线。


---

## 8. 保留 V2 导航结构并强化聚合收单展示 (17:55)
- **用户指令**：「`Recommended) 保持 V2 当前方案：首页 | 全球收付(B2B Fiat) | 全球承兑(Stablecoin) | 覆盖范围 | API文档 | 演示Demo， 但是收单什么要展示出来。`」
- **执行结果**：
  1. 在不改变 V2 核心架构的前提下，为全部 6 个页面（桌面导航、移动端抽屉、页脚）补充 `聚合收单` (`index.html#acquiring`) 显性直达入口，并保留 `?lang=` 语言状态透传。
  2. 在 `index.html` 首页工作台补充 `04 · 聚合收单` 标签面板，同时升级 `#acquiring` 板块，完整呈现 5 大收单能力卡、可交互 4 币种 `$1,200.00` 收银台及 HK/TW/AU/US/MX 五大已跑通核心市场。
  3. 复测 `verify_v2.js` 达到 **774 / 774 PASS**，原 `build/` 保持 **0 Diff**，本地对比预览 `http://127.0.0.1:5180` 保持 `200 OK`。
- **待确认事项**：请用户在 `http://127.0.0.1:5180/index.html?lang=zh` 刷新验收当前中英文导航、工作台及 `#acquiring` 展示效果，并确认其余 3 个口径问题（CNY 贸易结汇表述、RWA 板块保留程度、Hero 工作台样式）。


---

## 9. 参考 Pyvio / MCE 视觉风格重构为「字少图多 + 分组下拉导航」版本 (18:25)
- **用户反馈**：「说实话感觉首页有点乱，导航栏也不是特别好……能看一下 pyvio 的官网吗（`pyvio.com/zh/assets/partners`、`mce.sg`）……尽量字少，图多。我们新的官网字太多了。」
- **问题定位**：原 V2 草稿首页文本量偏重且把多张对比表/工作台堆在首页，顶部导航 7 项平铺加徽标也显拥挤，同时未能充分利用 `static/` 中的行业与 RWA 实景图片资源。
- **落地改造**：
  1. 全面收敛顶部导航为 **5 项极简分组下拉栏**（`首页` | `产品服务 ▾` | `解决方案 ▾` | `全球覆盖` | `开发与生态 ▾`），6 页全站对齐并保留 `aria-current="page"` 与无障碍键盘支持。
  2. 首页重塑为「字少图多」的左右图文穿插 + macOS UI 模拟窗 + 实景行业摄影墙结构：Hero 玻璃拟态三卡流转板 → 4 大粗体指标 → 全球收款/换汇承兑/全球付款/全球收单（含交互式 `$1,200.00` 收银台与 HK/TW/AU/US/MX 核心市场标签）→ 四步极速开通 → 4 张行业摄影卡 + 5 张 RWA 摄影卡 → 6 项合规与清算网络牌照板。
  3. 同步精简 `fx.html`、`otc.html`、`coverage.html` 首屏导语文案，同时保留全部交互式地区/币种数据表。
- **验收状态**：`verify_v2.js` **1073 / 1073 PASS**，原 `build/` 目录 **0 Diff**，本地 `http://127.0.0.1:5180` 与 `5181` 均返回 `HTTP/1.1 200 OK`。


---

## 10. 重启本地对比预览服务与浏览器打开请求 (18:35)
- **用户指令**：「请你打开这个官网我看一下」
- **执行结果**：
  1. 因服务重启后原后台预览进程终止，已重新启动后台本地双端口预览服务（`task-421`）：
     - V2 重构版官网：`http://127.0.0.1:5180/index.html?lang=zh`
     - 原版官网对照：`http://127.0.0.1:5181/index.html?lang=zh`
  2. 已调用浏览器子代理尝试自动在 Chrome 中打开预览页面，但本机 Chrome 未开启远程调试连接（报错：`Could not find DevToolsActivePort`），无法由工具侧直接拉起/接管用户的 Chrome 窗口。
- **下一步**：已向用户直接提供可访问的本地预览链接与 Chrome 远程调试开启指引（`chrome://inspect/#remote-debugging`），等待用户打开查看新版官网视觉与交互后给出反馈。


---

## 11. 「产品服务与解决方案」子页改版为图多字少 + 收纳折叠 + 一页一板块 (19:08)
- **用户指令**：「产品服务，解决方案里面。的一些内容是否可以图片多一些，文字少一些。如果一定需要文字，采用收纳的方式。或者一个页面一个板块。」（附导航栏截图标注「产品服务 / 解决方案」）
- **落地改动**：
  1. **下拉菜单极简对齐**：收紧导航下拉框至「图标 + 单行短标题」，去掉次级两行说明。
  2. **`fx.html` 单板块视图重构**：采用顶部 4 板块 Tab（`01 · 全球收款` / `02 · 全球付款与电子钱包` / `03 · 实时换汇与合规结汇` / `04 · B2B 外贸解决方案`），单屏仅展示一个板块的模拟界面/实景摄影与简短要点，22 国 VA/11 国钱包/20 币种/KYB 说明均收纳至默认折叠抽屉 (`details.ax-accordion`)。
  3. **`otc.html` & `coverage.html` 视觉前置与长表收纳**：`otc.html` 首屏升级为图文并茂 50/50 布局并收纳 4 项合规长文案及 26 国矩阵；`coverage.html` 将世界地图与 5 大核心市场前置为视觉首屏，94 国目录与 36 国双渠道表格默认收纳折叠，点击地图可自动展开定位。
- **验收状态**：`verify_v2.js` **1109 / 1109 PASS**，`build/` **0 Diff**，`5180` 端口全部页面 `200 OK`。


---

## 12. GitHub 上传与 Cloudflare Pages 部署操作指引 (19:41)
- **用户咨询**：「我想要把这个官方网站上传到 github，然后到 cloudflare 部署，如何操作。」
- **仓库现状核查**：
  - `AurellixPay_new_website` 已绑定 GitHub 远端 `origin`（`https://github.com/EastAndWeast/pay`），当前本地分支 `dev`（远端存在 `main` 与 `dev`）。
  - 当前未提交变动包括 `build_v2/`、`提示词.txt`、文档及 `.vscode/`；无 `.gitignore`。
- **提供方案**：给出先在分支/独立目录 `build_v2` 部署预览再切换上线，或定稿后替换 `build/` 推送自动部署两种方案，以及 Cloudflare Pages（`Framework: None`、构建命令留空、输出目录填 `build_v2` 或 `build`）完整操作步骤，待用户确认是否由助手协助执行 Git 提交与推送或替换 `build/`。


---

## 13. 集团主站定位升级与四大核心需求修改 (2026-11-17)
- **用户指令**：「1.全球覆盖范围：是之前针对收单的，实际要区分收单、收款这些…… 2.RWA: 当前的域名：www.aurellix.com（未来要改），希望导航和页脚能有体现。 3.解决方案的一些跳转以后，颜色还是显示到产品服务。 4.合规资质：红色这两个没有。备注：未来我们这个网站就当成集团网站，之前的RWA网站当成一个子网站。」
- **用户确认口径**：
  - **A1**：将收款、付款、承兑、收单拆成 **4 个独立 Tab** 切换世界地图与国家列表；
  - **A2**：顶部导航栏独立显示 **`RWA 生态 ↗` (`RWA Ecosystem`)**，页脚及首页 `#rwa` 区同步体现；
  - **A3**：升级为 **`Aurellix 集团`** 官网主站口径，统筹 Pay（收付/收单）+ 全球承兑 + RWA（资产子站）三大板块，且**承兑环节不体现 `"OTC"` 字样**（非 OTC 模式）。
- **已落地改动与校验**：
  1. 在 [v2-common.js](../build_v2/static/v2-common.js) 中以 `RWA_SITE_URL = 'https://www.aurellix.com/'` 集中管理 RWA 子站外链，新增 `updateNavHighlight()` 修复解决方案路径高亮，全站清除所有可见 `"OTC"` 字样并升级集团主站文案。
  2. 将 [coverage.html](../build_v2/coverage.html) 重构为 4 业务独立 Tab（`01 · 全球收款` / `02 · 全球付款` / `03 · 全球承兑` / `04 · 全球收单`）动态重绘 `world_map.svg` 与下方国家/通道面板。
  3. 移除 [index.html](../build_v2/index.html) `#compliance` 前两张卡片（瑞士 SRO、迪拜 PSP），调整为 4 栏布局并在 `#rwa` 增加子站直达按钮。
  4. 同步镜像替换 `build/` 并通过 `verify_v2.js` 全量校验（`1240 / 1240 PASS`）、`0` 敏感词/`OTC` 命中及 `5180/5181` 端口 `200 OK` 检查。


---

## 14. 「RWA 平台」文案统一、去除 PYUSD、页脚双官网入口及隐私/条款条款升级 (2026-11-17 14:05)
- **用户指令**：「1.图1：不要叫RWA官网子站：改为RWA平台 2.图2：RWA平台 3.图3：去掉PYUSD（全站） 4.图4：显示支付官网，RWA官网，Telegram就不要了。(左边这个） 5.图5图6邮箱改为：info@aurellix.com, 隐私政策和服务条款请进行完善优化。内容稍微多一些，最近更新时间不要写了。」
- **执行落地**：
  1. **RWA 文案与平台命名统一**（[v2-common.js](../build_v2/static/v2-common.js)、[index.html](../build_v2/index.html) 等 6 页）：顶部导航与 `#rwa` 按钮统一改为 **`RWA 平台`** / **`RWA Platform`**，中英文彻底移除 `官网子站` / `子网站` / `Sub-site`。
  2. **全站移除 `PYUSD`**：精简首页 `#checkout-token-grid` 为 3 列代币按钮（`USDT`、`USDC`、`EURC`）、首页 `#compliance` 合规币种卡片改为 `USDT · USDC`、并更新 [otc.html](../build_v2/otc.html) Mode 3 卡片为 `EURC / Local FX` 与 `USDT ⇄ USDC ⇄ EURC`。
  3. **页脚左侧品牌入口改版**：全部 6 页 `<footer>` 左侧移除圆形 Telegram 按钮，改为 **`支付官网`** (`Pay Website`, `#pay-site-link`) 与 **`RWA 官网`** (`RWA Website`, `#group-link`) 并排双入口（右侧咨询顾问列 `@cs_aurellix` 保留不变）。
  4. **[privacy.html](../build_v2/privacy.html) 与 [terms.html](../build_v2/terms.html) 内容充实与邮箱统一**：删除「最近更新时间 / Last updated」字样，中英文均扩展至 8 大完整条款（覆盖 KYB 准入、贸易真实性单据、锁汇与链上白名单、退汇与拒付、API 与知识产权、风控与责任限制及数据合规权利等），官方邮箱统一变更为 `info@aurellix.com`。
  5. **构建与验证**：`build_v2/` 镜像覆盖 `build/`，`verify_v2.js build_v2` 与 `verify_v2.js build` 均取得 **`PASSED: 1310 | FAILED: 0`**，静态扫描第三方词、`OTC`、`PYUSD`、`官网子站/Sub-site` 与旧邮箱均 `0` 命中。


---

## 15. 全站折叠区默认展开、人民币汇率更新与 API 文档 404 修复 (2026-11-17 14:42)
- **用户反馈**：
  1. 将 `fx.html` 图 1/2/3/5 及其他页面收起的折叠内容全部改为默认展开；
  2. 人民币汇率 `7.2450` 较早，查询最新汇率后更新；
  3. 中文模式下点击 API 文档进入 `https://docs.rail.aurellix.com/zh/` 显示 `404 PAGE NOT FOUND`，点击 `Take me home` 回到根域名才正常。
- **处理结果**：
  1. 为 `fx.html`（4 处）、`otc.html`（2 处）与 `coverage.html`（2 处）共 8 个 `<details class="ax-accordion">` 全部加上 `open` 默认展开。
  2. 联网检索当前 USD/CNY 最新中间价（约 `6.665–6.671`），将 `index.html` 与 `fx.html` 演示牌价更新为 **`1 USD = 6.6700 CNY`**，试算金额同步更新为 **`667,000`**。
  3. 验证 `docs.rail.aurellix.com` 为 VitePress `v1.6.4` 文档站（仅根路由 `/` 有效，无 `/zh/` 页面），将 `v2-common.js` 中英文下 `nav_api` / `[data-api-link="true"]` 统一改为 `https://docs.rail.aurellix.com/`。
  4. 同步覆盖 `build/` 并运行 `verify_v2.js` 取得 **`PASSED: 1319 | FAILED: 0`**。


---

## 16. 官网开发经验总结与通道扩展维护指南归档 (2026-11-17 14:48)
- **用户指令**：「请你把官网的经验总结一下，未来我可能给你新的支付通道，到时覆盖范围之类的可能要进行更新。」
- **执行结果**：已整理并输出 [2026-11-17-官网开发维护与通道扩展指南.md](../文档/2026-11-17-官网开发维护与通道扩展指南.md)，系统梳理 `build_v2/` → `build/` 发布流、四大业务线（收款 / 付款 / 承兑 / 收单）新增通道对应的数据数组与地图映射清单，以及口径红线、i18n 图标防丢失、外部 SPA 文档路由检验、SVG 全清重绘与自动化校验等 6 条实战经验。


---

## 17. API 文档站语言路由实测与双语映射修正 (2026-11-17 15:00)
- **实测结论**：经检查线上文档站 `https://docs.rail.aurellix.com/`：
  - 根路径 `/` 为 **简体中文**（`AurellixPay 提供基于稳定币的快速、安全、合规的端到端支付解决方案...`）；
  - `/en/` (`https://docs.rail.aurellix.com/en/`) 为 **English**（`AurellixPay Docs Center`）；
  - `/zh/` 路径未部署，访问会由 VitePress 客户端路由渲染 `404 PAGE NOT FOUND`。
- **修复**：在 [v2-common.js](../build_v2/static/v2-common.js#L160-L163) 将 `zh` 指向 `https://docs.rail.aurellix.com/`、`en` 指向 `https://docs.rail.aurellix.com/en/`，并同步覆盖 `build/`、通过 `verify_v2.js` 校验及推送至 `origin/dev`。
