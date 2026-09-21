# 工程部落地项目前端

站点名称：**AI 研发与应用成果**。仓库标识：`engineering-project-showcase-frontend`。

面向客户和外部访客的部门项目成果网站。交付目录为 `dist/`，包含首页、五个独立详情页和全部本地素材，直接由普通静态服务器提供服务即可，无安装或构建步骤。

## 本地预览

在当前目录运行：

```powershell
.\preview.ps1
```

浏览器访问 <http://127.0.0.1:4173/>。终端中按 `Ctrl+C` 停止服务。如果端口被占用，运行 ` .\preview.ps1 -Port 4174`。

也可以使用 Python 3：

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

所有内部页面、图片和脚本均使用相对路径，支持本地 HTTP 预览和部署在网站子目录中。建议使用 HTTP 预览，不依赖直接双击 HTML 的浏览器行为。

## GitHub Pages 部署

访问地址：[AI 研发与应用成果](https://recklessnolove117.github.io/engineering-project-showcase-frontend/)。

部署工作流为 `.github/workflows/deploy-pages.yml`，将 `dist/` 内的文件直接发布到站点根路径，无需安装依赖或执行构建。仓库的 **Settings → Pages → Build and deployment → Source** 应设为 **GitHub Actions**。

向 `master` 推送 `dist/` 或部署工作流的修改后，会自动发布；也可在 **Actions → Deploy frontend to GitHub Pages → Run workflow** 手动部署。只发布 `dist/`，README、验收记录和历史页面截图不属于线上站点内容。

不要将 Pages 设置为从 `master` 的根目录发布：根目录没有网站入口，GitHub 会把 README 渲染成首页。真正的网站入口是 `dist/index.html`，由工作流发布后对应上述访问地址。

## 页面与文件

| 文件 | 用途 |
| --- | --- |
| `dist/index.html` | 首页：三个已落地项目、精选落地案例、两个研发与评测方向 |
| `dist/projects/world-model.html` | 世界模型与 Policy，四条技术路线、验证回放与研究方向 |
| `dist/projects/coding-agent.html` | 私有化辅助编程，Agent 与模型说明、评测与作品展示 |
| `dist/projects/manufacturing-agent.html` | 制造业通用智能体落地案例 |
| `dist/projects/knowledge-agent.html` | 本地知识应用智能体落地案例 |
| `dist/projects/model-training.html` | 行业模型训练与优化工程案例 |
| `dist/assets/styles.css` | 基础布局、交互组件与响应式规则 |
| `dist/assets/editorial.css` | 当前字体、字号层级、横向项目目录及详情排版；加载于基础样式之后 |
| `dist/assets/project-stage.css` | 首页按项目阶段分区的布局：落地项目桌面三列，研发与评测单独展示 |
| `dist/assets/site.js` | 导航、路线标签、图片预览、目录定位 |
| `dist/assets/demos.js` | 外部演示地址配置 |
| `dist/assets/images/` | 本地 WebP 截图和插图 |
| `research/`（仅本地） | 前期调研、PPT 提取、原始预览资料，不提交到 GitHub，也不属于网站发布目录 |

页面正文直接写入 HTML。JavaScript 用于增强交互；关闭 JavaScript 后仍可阅读主要内容，世界模型的四条路线将同时显示。没有服务端 API、外部字体、CDN 脚本或自动模型服务请求。

## 内容维护

- **修改文字**：编辑对应 HTML。首页项目摘要、页脚和相关项目链接在各页保留静态副本，调整项目名称时应同步修改。
- **品牌名称**：当前使用“AI 研发与应用成果”文字标识。正式名称确定后，更新六页的页面标题、导航名称和页脚；浏览器图标为 `assets/favicon.svg`。
- **字体与版式**：当前采用 `Noto Sans SC` / 思源黑体优先的本地字体序列，回退到苹方或微软雅黑；标题字重以 400–500 为主。数字优先使用本地 Bahnschrift / Arial。字体不从网络加载，也不打包操作系统字体。首页优先以三个并列条目展示落地项目，再展示精选案例和研发评测；详情页使用留白、细分隔线与章节标题组织正文。
- **演示地址**：修改 `assets/demos.js` 中 `worldModel` 或 `codingAgent` 的值，不需要修改交互代码。正常浏览器访问时链接会统一更新。HTML 中同时保留无需 JavaScript 的链接后备值；如需支持禁用 JavaScript 后的最新地址，也同步更新两页相应 `data-demo` 链接的 `href`。
- **替换截图**：使用真实项目截图，保存到 `assets/images/` 并更新 HTML 的图片路径、替代文字、图注。维持原图纵横比；正文截图使用 `image-zoom` 按钮包装即可复用放大功能。
- **更新数值**：同时更新首页、训练详情页、图表柱高度和来源说明。柱高度表示 100 分制分数；`--score` 与显示数值需一致。首页默认值定义在 CSS，详情图表也有局部 `--score` 属性。
- **增加页面**：沿用详情页结构，补齐独立标题、描述、面包屑、目录、相关项目、页脚导航。长页使用桌面侧栏目录和移动端可展开目录。

## 内容口径与素材来源

- 训练工程案例以用户提供的《模型训练与优化案例_对外脱敏插图升级_校验版.pptx》为依据，指标来源页码见训练详情页。65.94 → 81.975 为平均得分变化；约 16.0 分为差值；88.2% 为得分提高至少 5 分的样本比例；32 小时 → 3.5 小时为该案例记录的训练耗时。统计指标仅属于该案例。
- 首页落地项目区使用应用流程示意及训练飞轮插图；研发与评测区使用世界模型和辅助编程演示的真实截图。训练架构与数据飞轮素材来自用户提供的 PPT 及其本地素材文件，作为方案或流程示意，与真实运行截图区分。
- 世界模型、辅助编程的截图来自用户提供的演示站点，作为已保存界面预览，点击“打开演示”在新标签页进入原站。外部站点可用性不影响本站正文和本地截图。
- 用户明确确认后面三个项目均已落地：制造业通用智能体、本地知识应用智能体、模型训练与微调。首页将三项统一放在“客户案例”中，置于研发项目之前；训练详情保留“高端装备制造行业模型训练与优化”的具体案例名称。世界模型与辅助编程放入独立的“研发与评测”区。OpenSora、WAN 是验证演示，尚未正式交付；LingbotVA 为研发中；Cosmos 为引入中。流程图继续标注为示意，不补写未经确认的客户名称、指标或技术机制。
- DotsOCR、Llmsys、OpenCompass、llmsys_eval 是用户补充的技术信息，未将 PPT 指标直接归因于这些工具。多模态输入列为后续规划。

## 验收与后续维护

浏览器验收记录见 `验收记录.md`，页面截图保存在 `artifacts/screenshots/`。更新内容后建议在 1440、1024、768、390 像素宽度检查布局，检查目录与站内链接，并验证路线切换、图片放大、Esc 关闭、键盘焦点恢复和移动导航。

## 静态交付包

仓库直接维护 `dist/` 源文件，无需构建。需要压缩包时，在项目根目录运行：

```powershell
Compress-Archive -Path dist\* -DestinationPath ai-project-portal-static.zip -Force
```

压缩包为本地产物，不纳入 Git 版本管理。
