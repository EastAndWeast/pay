# 任务与测试记录 (2026-11-04) - Telegram 客服链接配置更新

## 1. 任务目标
将全站（`index.html`、`coverage.html`、`privacy.html`、`terms.html`）中所有指向旧 Telegram 客服号 `https://t.me/cs_aurellixpay`（及正文展示的 `@cs_aurellixpay`）的配置统一更新为 `https://t.me/cs_aurellix`（及 `@cs_aurellix`）。

## 2. Task List
- [x] 分析现有实现，检索 `build/*.html` 中所有 `cs_aurellixpay` 引用
- [x] 完成最小修改（更新 `index.html`、`coverage.html`、`privacy.html`、`terms.html` 中的 Telegram 链接与账号标识）
- [x] 执行相关检查与验证（确认无残留旧链接，检查 Git Diff）
- [x] 更新文档和沟通记录

## 3. 实际执行命令与测试验证结果
- **执行命令**：`Select-String -Path "build\*.html" -Pattern "t\.me|cs_aurellix"; git diff build/`
- **验证结果**：
  1. `build/index.html`（共 5 处：PC 顶部咨询按钮、移动端咨询链接、页脚品牌区 Telegram 图标、页脚 Contact 列按钮、`handleTalk()` JS 跳转函数）已全部更新为 `https://t.me/cs_aurellix`。
  2. `build/coverage.html`（共 4 处：PC 顶部咨询按钮、移动端咨询链接、页脚品牌区 Telegram 图标、页脚 Contact 列按钮）已全部更新为 `https://t.me/cs_aurellix`。
  3. `build/privacy.html` 与 `build/terms.html`（各 6 处链接 + 2 处正文 `@cs_aurellix` 文本）已全部同步更新为 `https://t.me/cs_aurellix` 及 `@cs_aurellix`。
  4. `git diff build/` 检查确认仅包含上述链接替换，无任何无关格式化或多余修改。
