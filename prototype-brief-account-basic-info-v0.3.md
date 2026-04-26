# 账户基础信息页 Prototype Brief（v0.3）

## 1) 页面名称
`账户中心 > 账户基础信息页`（[New]）

## 2) 页面目标
- 用户在单页维护个人资料：头像、昵称、手机号、邮箱、个性签名。
- 用户在“承制方 / 需求方”间切换身份，并进入对应身份首页。
- 成功标志：资料保存成功；身份切换后跳转正确；全局身份、权限、导航一致刷新。

## 3) 使用角色
- 登录用户（编辑本人资料）。
- 多身份用户（承制方 / 需求方）。
- 风控冻结用户（只读，禁止编辑与切换）。

## 4) 页面入口 / 出口
- **入口**
  - 顶部头像下拉：`个人中心 / 账户设置`
  - 侧边栏：`账户中心 > 基础信息`
  - 资料未完善引导页
- **面包屑**
  - `首页 > 账户中心 > 基础信息`
- **出口**
  - 保存成功：留在当前页 + Toast `保存成功`
  - 取消：返回上一页（无历史则回账户中心首页）
  - 身份切换成功：跳转服务端下发的身份首页路由

## 5) 页面信息架构
- 顶部区：标题 + 说明 + 保存按钮
- 基础资料区：
  - 头像上传
  - 昵称
  - 绑定手机号（展示 + 变更）
  - 绑定邮箱（展示 + 变更）
  - 个性签名
- 身份区：
  - 当前身份展示
  - 身份切换控件
- 状态提示区：
  - 风控冻结提示条（显示冻结原因模板文案）

## 6) 核心模块说明
- **资料编辑模块**：加载、编辑、校验、提交、反馈。
- **绑定信息模块**：手机号/邮箱通过验证码二次验证更新。
- **身份切换模块**：切换、确认、跳转、全局刷新。
- **风控状态模块**：冻结态禁用操作并展示原因。
- **配置热更新模块**：敏感词词库、身份首页路由、冻结原因模板按配置拉取。

## 7) 字段与规则

| 字段 | 规则 |
|---|---|
| 头像 | 单图；`jpg/jpeg/png/webp`；<=5MB；支持预览/替换/删除；支持上传前压缩 |
| 昵称 | 必填；2-20字；trim；支持中英文/数字/下划线；前端敏感词拦截（词库服务端热更新） |
| 手机号 | 脱敏展示；仅通过验证码流程变更 |
| 邮箱 | 脱敏展示；仅通过验证码流程变更 |
| 个性签名 | 非必填；0-80字；支持中英文与常见标点 |

## 8) 手机号/邮箱二次验证交互
- 点击 `更换手机号/更换邮箱` -> 弹窗（或抽屉）
- 输入新值 -> 发送验证码 -> 输入验证码 -> 提交
- 成功：回填并脱敏展示
- 失败提示：
  - `验证码错误或已失效，请重新获取`
  - `发送过于频繁，请 60 秒后重试`

## 9) 身份切换交互
- 控件：`Segmented` / `RadioGroup`
- 未保存拦截弹窗：
  - 标题：`切换身份前确认`
  - 正文：`你有未保存的资料修改，切换身份将丢失未保存内容。是否继续？`
  - 按钮：`继续切换` / `留在当前页`
- 切换成功后流程：
  1. Toast：`已切换为{身份}`
  2. 读取服务端下发路由（按租户/配置）
  3. 跳转至对应身份首页
  4. 刷新全局身份、菜单、权限缓存
- 路由兜底：
  - 下发缺失或非法时，跳租户默认首页 + 记录告警埋点

## 10) 头像上传规则
- 格式：`jpg/jpeg/png/webp`
- 大小：<=5MB
- 数量：1
- 支持：预览、替换、删除、上传前压缩
- 失败文案：
  - `仅支持 JPG/PNG/WEBP 格式`
  - `图片大小不能超过 5MB`
  - `图片处理失败，请更换图片重试`
  - `上传失败，请检查网络后重试`

## 11) 异常态 / 权限态 / 空态
- 加载态：表单骨架屏
- 空态：字段为空时显示 placeholder
- 提交失败：字段错误 + 全局 Toast
- 风控冻结态（本页展示）：
  - 显示警示条，文案由“冻结原因枚举码 + 模板”渲染
  - 示例模板：`账号当前处于冻结状态：{reasonText}，暂无法修改资料或切换身份。`
  - 冻结时禁用：资料编辑、手机号/邮箱变更、身份切换
- 单身份账号：切换控件禁用 + 提示 `当前账号仅开通一个身份`

## 12) 冻结原因枚举码与模板机制
- 服务端返回：
  - `isFrozen: boolean`
  - `freezeReasonCode: string`
  - `freezeReasonParams: object`（可选）
- 前端渲染：
  - 根据 `freezeReasonCode` 命中模板
  - 用 `freezeReasonParams` 填充变量
- 兜底：
  - 未命中 code -> 通用模板：`账号状态受限，请联系客服处理。`
- 模板管理：
  - 支持配置中心下发与多租户差异化文案

## 13) 昵称敏感词词库热更新机制
- 数据来源：服务端下发词库与版本号
- 运行策略：
  - 启动拉取全量或基线版本
  - 运行期定时检查版本并增量更新
  - 提交与失焦校验都使用最新词库
- 失败兜底：
  - 拉取失败使用本地兜底词库
  - 上报错误日志与埋点

## 14) 组件复用 / Design System
- 复用：`Form`、`Upload`、`Modal`、`Alert`、`Toast`、`Skeleton`、`Segmented/Radio`
- 建议沉淀：
  - `IdentitySwitcher`
  - `VerifyCodeBinder`
  - `FreezeBanner`

## 15) 给 AI coding 工具的实现提示
- **适配范围**：PC 优先，基准宽度 `1440px`，首版可不做移动端。
- **开发顺序**
  1. 静态骨架 + mock
  2. 表单校验 + 未保存拦截
  3. 验证码弹窗流程
  4. 身份切换 + 动态路由跳转
  5. 冻结态模板渲染 + 词库热更新
- **建议接口**
  - `GET /account/profile`
  - `PUT /account/profile`
  - `POST /account/avatar/upload`
  - `POST /account/phone/change/request-code`
  - `POST /account/phone/change/confirm`
  - `POST /account/email/change/request-code`
  - `POST /account/email/change/confirm`
  - `POST /account/identity/switch`
  - `GET /config/identity-home-routes?tenantId=...`
  - `GET /config/freeze-reason-templates`
  - `GET /config/nickname-sensitive-words?version=...`
- **状态建议**
  - `profileLoadState`、`saveState`、`verifyState`、`identitySwitchState`
  - `sensitiveWordsVersion`、`freezeReasonCode`、`identityHomeRoute`
- **埋点建议**
  - `identity_switch_route_resolved`
  - `identity_switch_route_fallback`
  - `sensitive_words_hot_update_success`
  - `sensitive_words_hot_update_fail`
  - `freeze_banner_rendered`
- **A11y**
  - 关键按钮 `aria-label`
  - 头像 `alt`
  - 表单 `label` 完整
  - 错误提示与输入关联 `aria-describedby`
- **i18n**
  - 文案全部 key 化
  - 模板文案支持变量插值
  - 预留长文案换行空间

## 16) 原型版本信息
- 版本：`v0.3`
- 日期：`2026-04-22`
- 变更：
  - [Update] 冻结原因改为“枚举码 + 模板”
  - [Update] 身份首页路由改为按租户/配置动态下发
  - [Update] 昵称敏感词改为服务端词库热更新
