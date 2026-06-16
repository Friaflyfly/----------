/* ============================================================================
 * _shared.js  ——  骋风天合 demo 公共底座
 *   - 所有页面的 demoApp / demoToast / fmtMoney 单一来源
 *   - 顶部栏（空间切换 / 工作台模式：需求方·承制方·管理后台·运营后台 / 钱包 chip / 头像下拉）SharedHeader.mount()
 *   - 默认 mock 数据扩展了 contractor / members / categoryConfig，给 B/C/D 组用
 *
 * 用法：
 *   <header class="topbar" id="topbar-shared"></header>
 *   <div id="toastWrap" class="toasts"></div>
 *   <script src="_shared.js"></script>
 *   <script>
 *     SharedHeader.mount({ activeNav: "home" });
 *   </script>
 * ============================================================================
 */
(function () {
  "use strict";

  // 一次性数据迁移：旧版 mock 里"李雪琴" → "昭岚"
  try {
    ["demoWallets", "demoOrders", "demoFlows"].forEach(function (k) {
      var v = localStorage.getItem(k);
      if (v && v.indexOf("李雪琴") >= 0) localStorage.setItem(k, v.replace(/李雪琴/g, "昭岚"));
    });
  } catch (e) {}

  // ============================================================
  // 团队 mock 配置（共享 source of truth）
  // 注：内部字段名仍叫 workspace / WORKSPACES（避免重命名带来的连锁改动），UI 文案统一称「团队」。
  // 「项目空间」（projectSpaceId / project-space.html）是另一个概念，单订单协同区。
  // ============================================================
  var WORKSPACES = {
    "personal": {
      id: "personal", name: "个人", shortName: "个人", type: "personal",
      icon: "👤", iconClass: "personal",
      accountType: "个人账户", accountBalance: 3200,
      payerLabel: "个人账户", roleLabel: "个人创作者",
      canPublish: true, canViewMarket: true,
      walletKey: "personal-account-lixueqin",
      payer: { type: "personal", name: "个人账户", balance: 3200 }
    },
    "cf-drama": {
      id: "cf-drama", name: "骋风天合 · 短剧制作中心", shortName: "骋风天合·短剧组",
      type: "team", icon: "🎬", iconClass: "team",
      accountType: "团队预算账户", accountBalance: 185000,
      payerLabel: "本团队预算账户", roleLabel: "制作主管",
      enterpriseName: "骋风天合",
      canPublish: true, canViewMarket: true,
      walletKey: "team-budget-cf-drama",
      payer: { type: "team-budget", name: "短剧制作中心 - 团队预算账户", balance: 185000 }
    },
    "cf-marketing": {
      id: "cf-marketing", name: "骋风天合 · 市场宣传组", shortName: "骋风天合·市场组",
      type: "team", icon: "📢", iconClass: "team",
      accountType: "团队预算账户", accountBalance: 62000,
      payerLabel: "本团队预算账户", roleLabel: "市场专员",
      enterpriseName: "骋风天合",
      canPublish: true, canViewMarket: true,
      walletKey: "team-budget-cf-marketing",
      payer: { type: "team-budget", name: "市场宣传组 - 团队预算账户", balance: 62000 }
    },
    "cf-ip": {
      id: "cf-ip", name: "骋风天合 · IP 孵化组", shortName: "骋风天合·IP 组",
      type: "team", icon: "💎", iconClass: "team",
      accountType: "（未配置 → 走企业主账户）", accountBalance: 1250000,
      payerLabel: "回退至企业主账户", roleLabel: "IP 主理人",
      enterpriseName: "骋风天合",
      canPublish: true, canViewMarket: true,
      budgetMissing: true,
      walletKey: "enterprise-main-cf",
      payer: { type: "enterprise-main", name: "骋风天合 - 企业主账户（团队未配预算回退）", balance: 1250000 }
    },
    "cf-admin": {
      id: "cf-admin", name: "骋风天合 · 企业管理员视角", shortName: "骋风天合·管理员",
      type: "admin", icon: "👑", iconClass: "admin",
      accountType: "企业主账户", accountBalance: 1250000,
      payerLabel: "企业主账户", roleLabel: "企业管理员",
      enterpriseName: "骋风天合",
      canPublish: true, canViewMarket: true, canAllocateBudget: true,
      walletKey: "enterprise-main-cf",
      payer: { type: "enterprise-main", name: "骋风天合 - 企业主账户", balance: 1250000 }
    }
  };

  // ============================================================
  // 默认 mock 数据
  // ============================================================
  var defaultDemands = [
    // 平台套餐 · 系统自动审核通过 · 已创建项目空间（演示新流程）
    { id: "DM-2026042705", title: "营销短视频制作包 · 进阶档 · 164 条", category: "营销短视频制作包 / 进阶档 · 164 条", catId: "marketing-video", subCatId: "advanced", workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组", status: "auto-approved", quotesCount: 0, budget: 30000, createTime: "2026-04-27 09:05", deadline: "35 天内完成全部交付", payerLabel: "本团队预算账户", requirementType: "PLATFORM_SKU", spuId: "spu_marketing_video", skuId: "sku_mv_164", auditMode: "auto", auditedBy: "system-auto", auditedAt: "2026-04-27 09:05", projectSpaceId: "PS-202604277721", projectSpaceCreatedAt: "2026-04-27 09:05" },
    { id: "DM-2026042512", title: "三集短剧解说视频（修仙题材）", category: "视频制作 / 解说视频", catId: "video", subCatId: "drama-explain", workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心", status: "quoting", quotesCount: 4, budget: 18000, createTime: "2026-04-25 15:32", deadline: "2026-05-08", payerLabel: "本团队预算账户", requirementType: "CUSTOM", auditMode: "manual", auditedBy: "运营-小李", auditedAt: "2026-04-25 17:10", projectSpaceId: "PS-202604253410", projectSpaceCreatedAt: "2026-04-25 17:10" },
    { id: "DM-2026042214", title: "品牌宣传短片脚本", category: "文案服务 / 营销文案", catId: "copy", subCatId: "marketing-copy", workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组", status: "matching", quotesCount: 0, budget: 5000, createTime: "2026-04-22 09:14", deadline: "2026-05-02", payerLabel: "本团队预算账户", requirementType: "CUSTOM", auditMode: "manual", auditedBy: "运营-小李", auditedAt: "2026-04-22 11:30", projectSpaceId: "PS-202604222218", projectSpaceCreatedAt: "2026-04-22 11:30" },
    { id: "DM-2026042103", title: "新剧 IP 海报系列", category: "图片设计 / 海报设计", catId: "image", subCatId: "poster", workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心", status: "in-progress", quotesCount: 5, budget: 28000, contractor: "星辰创作工作室", createTime: "2026-04-21 11:00", deadline: "2026-04-30", payerLabel: "本团队预算账户", requirementType: "CUSTOM", auditMode: "manual", auditedBy: "运营-小王", auditedAt: "2026-04-21 14:25", projectSpaceId: "PS-202604215107", projectSpaceCreatedAt: "2026-04-21 14:25" },
    { id: "DM-2026041807", title: "广告片配音", category: "内容创作 / 配音", catId: "content", subCatId: "voice", workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组", status: "completed", quotesCount: 3, budget: 8000, contractor: "声海传媒", createTime: "2026-04-18 16:20", deadline: "2026-04-25", payerLabel: "本团队预算账户", requirementType: "CUSTOM", auditMode: "manual", auditedBy: "运营-小李", auditedAt: "2026-04-18 18:00", projectSpaceId: "PS-202604186804", projectSpaceCreatedAt: "2026-04-18 18:00" },
    { id: "DM-2026041602", title: "新剧广电备案许可证办理", category: "资质服务 / 广播电视节目制作许可证", catId: "license", subCatId: "broadcast", workspace: "cf-ip", workspaceName: "骋风天合 · IP 孵化组", status: "auditing", quotesCount: 0, budget: 12000, createTime: "2026-04-16 10:05", deadline: "2026-05-15", payerLabel: "回退至企业主账户", requirementType: "CUSTOM", auditMode: "manual", auditedBy: null, auditedAt: null, projectSpaceId: null, projectSpaceCreatedAt: null },
    { id: "DM-2026041501", title: "个人公众号头图设计", category: "图片设计 / 封面 / 缩略图", catId: "image", subCatId: "cover", workspace: "personal", workspaceName: "个人", status: "completed", quotesCount: 2, budget: 800, contractor: "色彩工坊", createTime: "2026-04-15 22:13", deadline: "2026-04-20", payerLabel: "个人账户", requirementType: "CUSTOM", auditMode: "manual", auditedBy: "运营-小王", auditedAt: "2026-04-15 23:50", projectSpaceId: "PS-202604159932", projectSpaceCreatedAt: "2026-04-15 23:50" }
  ];

  var defaultOrders = [
    { id: "OD-2026042307", demandId: "DM-2026042103", projectName: "新剧 IP 海报系列", contractor: "星辰创作工作室", contractorId: "starlight", workspace: "cf-drama", payerType: "team-budget", payerName: "短剧制作中心 - 团队预算账户", payerWalletKey: "team-budget-cf-drama", amount: 28000, status: "review-v3", createTime: "2026-04-23 10:00" },
    { id: "OD-2026042009", demandId: "DM-2026041807", projectName: "广告片配音", contractor: "声海传媒", contractorId: "soundsea", workspace: "cf-marketing", payerType: "team-budget", payerName: "市场宣传组 - 团队预算账户", payerWalletKey: "team-budget-cf-marketing", amount: 8000, status: "completed", createTime: "2026-04-20 14:30" }
  ];

  // ============================================================
  // 钱包数据结构（v2，对齐《统一账户与资金中心 一期架构设计方案》）
  // 设计文档字段（source of truth）：
  //   available_balance  可用余额（含充值余额 + 收益）
  //   frozen_balance     冻结余额（TCC 锁定）
  //   recharge_balance   充值余额（可退款部分）
  //   total_earnings     累计收益（承制方收入入账累计）
  //   total_withdrawn    累计已提现
  //   pending_withdraw   提现处理中（锁定，防重复提现）
  //   points_balance     积分可用
  //   points_frozen      积分冻结
  // 不变量：
  //   available_balance >= recharge_balance
  //   total_earnings    >= total_withdrawn + pending_withdraw
  //   可提现金额 = total_earnings - total_withdrawn - pending_withdraw
  //   退款上限 = min(recharge_order.remaining_refundable, wallet.recharge_balance)
  // 兼容字段（不要在新代码中读，仅作为旧页面 backfill）：
  //   balance       = available_balance
  //   lockedAmount  = frozen_balance
  // ============================================================
  var defaultWallets = {
    "personal-account-lixueqin": {
      // ¥300 退款冻结（FRZ-202605101430），等待平台回退至原付款账户
      type: "personal", name: "昭岚 - 个人账户",
      available_balance: 2900, frozen_balance: 300,
      recharge_balance: 1900, total_earnings: 1800,
      total_withdrawn: 800, pending_withdraw: 0,
      points_balance: 350, points_frozen: 0,
      // 兼容
      balance: 2900, lockedAmount: 300
    },
    "team-budget-cf-drama": {
      // 冻结 ¥40,000 = ¥28,000(订单 FRZ-202604231000) + ¥12,000(纠纷 FRZ-202605120920)
      type: "team-budget", name: "短剧制作中心 - 团队预算账户",
      available_balance: 173000, frozen_balance: 40000,
      // 团队预算来自上游划拨，不是充值，所以 recharge_balance = 0；不可提现
      recharge_balance: 0, total_earnings: 0,
      total_withdrawn: 0, pending_withdraw: 0,
      points_balance: 1840, points_frozen: 0,
      allocated: 200000,
      balance: 173000, lockedAmount: 40000
    },
    "team-budget-cf-marketing": {
      // 8000 元 OD-2026042009 已通过 TCC 完成（F-010 lock + F-011 settle），
      // 已从冻结划走到平台，frozen_balance 现为 0；available = allocated - settled
      type: "team-budget", name: "市场宣传组 - 团队预算账户",
      available_balance: 62000, frozen_balance: 0,
      recharge_balance: 0, total_earnings: 0,
      total_withdrawn: 0, pending_withdraw: 0,
      points_balance: 620, points_frozen: 0,
      allocated: 70000,
      balance: 62000, lockedAmount: 0
    },
    "enterprise-main-cf": {
      type: "enterprise-main", name: "骋风天合 - 企业主账户",
      available_balance: 1250000, frozen_balance: 0,
      // 企业主账户的可用余额几乎全部由充值产生
      recharge_balance: 1250000, total_earnings: 0,
      total_withdrawn: 0, pending_withdraw: 0,
      points_balance: 5200, points_frozen: 0,
      balance: 1250000, lockedAmount: 0
    }
  };

  // ---- 给 B 组准备：承制方相关 ----
  var defaultContractorProfile = {
    id: "starlight",
    name: "星辰创作工作室",
    type: "team",
    logo: "🎨",
    intro: "8 年短视频 / 短剧 / 海报设计经验，擅长奇幻、修仙、玄幻题材。已服务 200+ 品牌方与制片方。",
    contact: "starlight@example.com",
    quoteRange: "¥3,000 - ¥80,000",
    categories: ["视频制作", "图片设计"],
    tags: ["古代", "玄幻", "修仙", "2D", "3D"],
    cases: [
      { title: "《九霄录》IP 海报", thumb: "https://api.dicebear.com/9.x/shapes/svg?seed=case1", year: 2025 },
      { title: "短剧《长安幻夜》分镜", thumb: "https://api.dicebear.com/9.x/shapes/svg?seed=case2", year: 2025 },
      { title: "玄幻系列宣传片", thumb: "https://api.dicebear.com/9.x/shapes/svg?seed=case3", year: 2024 }
    ],
    stats: { ordersCompleted: 187, rating: 4.9, responseTimeHours: 2 }
  };

  // 承制方视角的订单（实际是同一份 orders，按 contractorId 过滤；这里再补几条不同状态的）
  var defaultContractorInbox = [
    { id: "INV-2026042701", demandId: "DM-2026042512", projectName: "三集短剧解说视频（修仙题材）", demanderName: "骋风天合 · 短剧制作中心", budget: 18000, deadline: "2026-05-08", status: "to-quote", invitedAt: "2026-04-27 09:12" },
    { id: "INV-2026042602", demandId: "DM-2026042214", projectName: "品牌宣传短片脚本", demanderName: "骋风天合 · 市场宣传组", budget: 5000, deadline: "2026-05-02", status: "quoted", quotedAmount: 4800, invitedAt: "2026-04-26 14:30" }
  ];

  // ---- 给 C 组准备：企业成员 / 角色 ----
  var defaultMembers = [
    { id: "U-001", name: "昭岚",   email: "zhaolan@cf.com",   role: "production-lead", roleName: "制作主管", workspaces: ["cf-drama"],                  status: "active", lastLogin: "2026-04-27 08:14" },
    { id: "U-002", name: "陈思齐", email: "chensq@cf.com",     role: "marketing",        roleName: "市场专员", workspaces: ["cf-marketing"],              status: "active", lastLogin: "2026-04-26 17:42" },
    { id: "U-003", name: "林子墨", email: "linzm@cf.com",      role: "ip-owner",         roleName: "IP 主理人", workspaces: ["cf-ip"],                     status: "active", lastLogin: "2026-04-25 11:30" },
    { id: "U-004", name: "周晓",   email: "zhouxiao@cf.com",   role: "finance",          roleName: "财务",      workspaces: ["cf-drama", "cf-marketing"],   status: "active", lastLogin: "2026-04-27 10:02" },
    { id: "U-005", name: "孙伟",   email: "sunwei@cf.com",     role: "publisher",        roleName: "发布员",    workspaces: ["cf-drama"],                  status: "frozen", lastLogin: "2026-04-12 09:11" }
  ];

  var defaultRoles = [
    { id: "admin",           name: "企业管理员",   perms: ["space.create", "space.delete", "member.invite", "member.freeze", "budget.allocate", "wallet.recharge", "wallet.withdraw", "demand.publish", "order.review", "category.config"] },
    { id: "finance",         name: "财务",         perms: ["wallet.recharge", "wallet.withdraw", "budget.allocate", "invoice.manage"] },
    { id: "production-lead", name: "制作主管",     perms: ["demand.publish", "order.review", "contractor.invite"] },
    { id: "publisher",       name: "发布员",       perms: ["demand.publish"] },
    { id: "marketing",       name: "市场专员",     perms: ["demand.publish"] },
    { id: "ip-owner",        name: "IP 主理人",    perms: ["demand.publish", "order.review"] }
  ];

  // ============================================================
  // 持久化
  // ============================================================
  var KEY = {
    ws: "demoCurrentWorkspace",
    identity: "demoCurrentIdentity",
    demands: "demoDemands",
    orders: "demoOrders",
    wallets: "demoWallets",
    flows: "demoFlows",
    draft: "demoPublishDraft",
    contractorProfile: "demoContractorProfile",
    contractorInbox: "demoContractorInbox",
    members: "demoMembers",
    roles: "demoRoles",
    profileComplete: "demoProfileComplete",
    spendReviewConfig: "demoSpendReviewConfig",
    spendApprovals:    "demoSpendApprovals",
    spendApprovalHistory: "demoSpendApprovalHistory",
    pointsBalance:       "demoPointsBalance",
    pointsExchanges:     "demoPointsExchanges",
    pointsConsumptions:  "demoPointsConsumptions",
    // v2 新增（对齐《统一账户与资金中心 一期架构设计方案》）
    accountUser:    "demoAccountUser",     // 统一操作人 + 实名状态
    rechargeOrders: "demoRechargeOrders",  // 充值订单（remaining_refundable 跟踪）
    freezeOrders:   "demoFreezeOrders",    // TCC 冻结单
    transferOrders: "demoTransferOrders",  // 划拨单（企业总→团队预算）
    withdrawOrders: "demoWithdrawOrders"   // 提现单（pending → approved/rejected）
  };

  // ============================================================
  // 积分中心：阶梯兑换包 + 个人池/团队池余额 + 收支记录
  // ============================================================
  // 兑换基准：¥1 = 10 积分；高档位送积分激励大额兑换
  var POINTS_PACKAGES = [
    { id: "pkg-starter",    name: "入门档", price: 10,   points: 100,    bonus: 0,    icon: "🌱", recommend: false, badge: "",        desc: "约 10-50 次工具调用" },
    { id: "pkg-standard",   name: "标准档", price: 99,   points: 1100,   bonus: 100,  icon: "⭐", recommend: true,  badge: "送 10%",  desc: "约 100-500 次工具调用" },
    { id: "pkg-pro",        name: "高级档", price: 499,  points: 6000,   bonus: 1010, icon: "🚀", recommend: false, badge: "送 20%",  desc: "约 600-3,000 次调用" },
    { id: "pkg-enterprise", name: "企业档", price: 1999, points: 26000,  bonus: 6010, icon: "🏢", recommend: false, badge: "送 30%",  desc: "约 2,600-13,000 次 · 仅企业管理员", adminOnly: true }
  ];

  // 积分余额：按 walletKey 索引（个人 + 团队两层共用同一表）
  var defaultPointsBalance = {
    "personal-account-lixueqin": 350,
    "team-budget-cf-drama":      1840,
    "team-budget-cf-marketing":  620,
    "team-budget-cf-ip":         0,
    "enterprise-main-cf":        5200
  };

  // 兑换历史
  var defaultPointsExchanges = [
    { id: "EX-202605120902", time: "2026-05-12 09:02", walletKey: "team-budget-cf-drama",      packageId: "pkg-standard",   price: 99,   points: 1100,  operator: "昭岚" },
    { id: "EX-202604280915", time: "2026-04-28 09:15", walletKey: "personal-account-lixueqin", packageId: "pkg-starter",    price: 10,   points: 100,   operator: "昭岚" },
    { id: "EX-202604200800", time: "2026-04-20 08:00", walletKey: "team-budget-cf-marketing",  packageId: "pkg-pro",        price: 499,  points: 6000,  operator: "陈薇" },
    { id: "EX-202604010900", time: "2026-04-01 09:00", walletKey: "enterprise-main-cf",        packageId: "pkg-enterprise", price: 1999, points: 26000, operator: "李总（企业管理员）" }
  ];

  // 消耗历史（AI 工具调用）
  var defaultPointsConsumptions = [
    { id: "C-202605131420", time: "2026-05-13 14:20", walletKey: "team-budget-cf-drama",      tool: "AI 文案生成", cost: 5,  callId: "AI-2026051301", operator: "昭岚", relatedDemand: "DM-2026042512" },
    { id: "C-202605131358", time: "2026-05-13 13:58", walletKey: "team-budget-cf-drama",      tool: "AI 配音转写", cost: 8,  callId: "AI-2026051302", operator: "林涛", relatedDemand: "DM-2026041807" },
    { id: "C-202605131015", time: "2026-05-13 10:15", walletKey: "team-budget-cf-drama",      tool: "AI 海报建议", cost: 3,  callId: "AI-2026051303", operator: "昭岚", relatedDemand: "DM-2026042103" },
    { id: "C-202605120930", time: "2026-05-12 09:30", walletKey: "team-budget-cf-marketing",  tool: "AI 文案生成", cost: 5,  callId: "AI-2026051201", operator: "陈薇", relatedDemand: "DM-2026042214" },
    { id: "C-202605120815", time: "2026-05-12 08:15", walletKey: "personal-account-lixueqin", tool: "AI 翻译",     cost: 2,  callId: "AI-2026051202", operator: "昭岚", relatedDemand: null },
    { id: "C-202605101100", time: "2026-05-10 11:00", walletKey: "team-budget-cf-drama",      tool: "AI 剪辑建议", cost: 10, callId: "AI-2026051001", operator: "昭岚", relatedDemand: "DM-2026042512" }
  ];

  // ============================================================
  // 消费审核（事前审批）默认数据
  // ============================================================
  var defaultSpendReviewConfig = {
    enabled: true,
    singleAmountCap: 10000,      // 单笔金额上限 ¥
    budgetPctCap: 40,            // 团队预算占用比例上限 %
    monthlyCapPerMember: 80000,  // 单成员月度累计上限 ¥
    autoExpireHours: 24,         // 自动到期小时数
    expireAction: "reject"       // 'reject' | 'remind'
  };

  var defaultSpendApprovals = [
    {
      id: "PA-2026051301", demandId: "DM-2026051301", title: "春节档广告片 · 50 条短视频拼盘",
      applicant: "昭岚", applicantRole: "制作主管",
      workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心",
      amount: 48000, hitRules: ["单笔金额超 ¥10,000", "占用本团队预算 26%"],
      submittedAt: "2026-05-13 14:32",
      note: "春节档刚需，预算来源已和财务对齐，请尽快审批",
      status: "pending"
    },
    {
      id: "PA-2026051302", demandId: "DM-2026051302", title: "IP 海报新系列 5 套",
      applicant: "林涛", applicantRole: "创作者",
      workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心",
      amount: 25000, hitRules: ["单笔金额超 ¥10,000"],
      submittedAt: "2026-05-13 11:08",
      note: "",
      status: "pending"
    },
    {
      id: "PA-2026051303", demandId: "DM-2026051303", title: "广电备案咨询服务",
      applicant: "陈薇", applicantRole: "市场专员",
      workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组",
      amount: 12000, hitRules: ["单笔金额超 ¥10,000"],
      submittedAt: "2026-05-12 17:45",
      note: "外部资质办理，时间相对宽裕",
      status: "pending"
    }
  ];

  var defaultSpendApprovalHistory = [
    {
      id: "PA-2026051001", demandId: "DM-2026051001", title: "老剧重制项目 - 后期预算",
      applicant: "昭岚", workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心",
      amount: 65000, hitRules: ["单笔金额超 ¥10,000", "占用本团队预算 35%"],
      decision: "approved", decidedBy: "李总（企业管理员）",
      decidedAt: "2026-05-10 09:32", note: "已确认预算来源 OK，批准"
    },
    {
      id: "PA-2026050802", demandId: "DM-2026050802", title: "新人编剧合作探索",
      applicant: "林涛", workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心",
      amount: 18000, hitRules: ["单笔金额超 ¥10,000"],
      decision: "rejected", decidedBy: "李总（企业管理员）",
      decidedAt: "2026-05-08 16:20", note: "建议先做小规模试点（< ¥10,000）验证后再扩大投入"
    },
    {
      id: "PA-2026050501", demandId: "DM-2026050501", title: "产品发布会主视觉",
      applicant: "陈薇", workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组",
      amount: 32000, hitRules: ["单笔金额超 ¥10,000"],
      decision: "approved", decidedBy: "李总（企业管理员）",
      decidedAt: "2026-05-05 10:15", note: ""
    }
  ];

  // ============================================================
  // 统一操作人（account_user）+ 实名认证（v2 新增）
  // 状态机：unverified → pending → basic_verified → liveness_verified → enterprise_verified
  //         （rejected 允许修正后重提；状态不可降级）
  // 提现要求：>= liveness_verified
  // ============================================================
  var defaultAccountUser = {
    id: "AU-100",
    name: "昭岚",
    phone: "138****8826",
    email: "zhaolan@cf.com",
    real_name_status: "basic_verified",        // 当前演示：二要素已通过，未做活体
    real_name_method: "identity",
    real_name_vendor: "aliyun",
    real_name_biz_id: "ALI-RN-2026041030001",
    real_name_verified_at: "2026-04-10 09:30",
    reject_reason: null,
    id_card_name_masked: "昭**",                // 仅展示用，真实文档要 AES-256
    id_card_number_masked: "1101**********1234"
  };

  // ============================================================
  // 充值订单（recharge_order）
  // 与 defaultFlows 中 type="recharge" 的几条对应；按充值订单维度跟踪可退额度
  // remaining_refundable = amount - refunded_amount
  // status: pending（对公审核中）/ success / failed
  // ============================================================
  var defaultRechargeOrders = [
    {
      id: "RC-202604221831", out_recharge_no: "RC_20260422_001",
      time: "2026-04-22 18:31", walletKey: "personal-account-lixueqin",
      amount: 1000, refunded_amount: 0, remaining_refundable: 1000,
      status: "success", channel: "alipay", channelLabel: "支付宝",
      voucher_no: "V-202604221831"
    },
    {
      id: "RC-202604180915", out_recharge_no: "RC_20260418_001",
      time: "2026-04-18 09:15", walletKey: "enterprise-main-cf",
      amount: 500000, refunded_amount: 0, remaining_refundable: 500000,
      status: "success", channel: "bank", channelLabel: "对公转账",
      voucher_no: "V-202604180915"
    },
    {
      id: "RC-202604051000", out_recharge_no: "RC_20260405_001",
      time: "2026-04-05 10:00", walletKey: "enterprise-main-cf",
      amount: 1250000, refunded_amount: 0, remaining_refundable: 1250000,
      status: "success", channel: "bank", channelLabel: "对公转账",
      voucher_no: "V-202604051000"
    },
    {
      id: "RC-202604261732", out_recharge_no: "RC_20260426_001",
      time: "2026-04-26 17:32", walletKey: "enterprise-main-cf",
      amount: 200000, refunded_amount: 0, remaining_refundable: 0,
      status: "pending", channel: "bank", channelLabel: "对公转账",
      voucher_no: null,
      auditNote: "财务审核中"
    }
  ];

  // ============================================================
  // 冻结单（freeze_order，TCC Try 阶段产物）
  // 状态机：frozen → confirmed（不可逆）
  //         frozen → cancelled（主动取消 / 超时自动）
  // expire_at：超时未 confirm/cancel 时由定时任务自动 cancel
  // ============================================================
  var defaultFreezeOrders = [
    {
      id: "FRZ-202604231000", out_freeze_no: "FRZ_20260423_001",
      walletKey: "team-budget-cf-drama", amount: 28000, recharge_deduct: 0,
      biz_type: "cash_consume", status: "frozen",
      created_at: "2026-04-23 10:00", expire_at: "2026-04-30 10:00",
      relatedDemand: "DM-2026042103", relatedOrder: "OD-2026042307",
      voucher_no: "V-202604231000",
      operator: "昭岚"
    },
    {
      id: "FRZ-202604220930", out_freeze_no: "FRZ_20260422_001",
      walletKey: "team-budget-cf-marketing", amount: 8000, recharge_deduct: 0,
      biz_type: "cash_consume", status: "confirmed",
      created_at: "2026-04-22 09:30", expire_at: "2026-04-29 09:30",
      confirmed_at: "2026-04-25 11:08",
      relatedDemand: "DM-2026041807", relatedOrder: "OD-2026042009",
      voucher_no: "V-202604220930",
      operator: "陈默"
    },
    {
      id: "FRZ-202604141030", out_freeze_no: "FRZ_20260414_001",
      walletKey: "team-budget-cf-drama", amount: 15000, recharge_deduct: 0,
      biz_type: "cash_consume", status: "confirmed",
      created_at: "2026-04-14 10:30", expire_at: "2026-04-21 10:30",
      confirmed_at: "2026-04-12 17:42",
      relatedDemand: "DM-2026041401", relatedOrder: "OD-2026041401",
      voucher_no: "V-202604141030",
      operator: "昭岚"
    },
    {
      // 注：状态故意保留 cancelled 而非 frozen，确保 cf-drama 的 frozen_balance(28000)
      // 与活跃冻结单求和(28000) 严格一致；该 demand 仍在 quoting，可演示"冻结取消重锁"路径
      id: "FRZ-202604251548", out_freeze_no: "FRZ_20260425_001",
      walletKey: "team-budget-cf-drama", amount: 18000, recharge_deduct: 0,
      biz_type: "cash_consume", status: "cancelled",
      created_at: "2026-04-25 15:48", expire_at: "2026-05-02 15:48",
      cancelled_at: "2026-04-25 16:30", cancel_reason: "需求方撤回再编辑",
      relatedDemand: "DM-2026042512", relatedOrder: null,
      voucher_no: "V-202604251548",
      operator: "昭岚"
    },
    // ---- 二期演示：退款冻结 / 纠纷冻结（biz_type 不同） ----
    {
      id: "FRZ-202605101430", out_freeze_no: "FRZ_20260510_REF1",
      walletKey: "personal-account-lixueqin", amount: 300, recharge_deduct: 300,
      biz_type: "refund_lock", status: "frozen",
      created_at: "2026-05-10 14:30", expire_at: "2026-05-17 14:30",
      relatedDemand: "DM-2026050908", relatedOrder: "OD-2026050912",
      voucher_no: "V-202605101430",
      operator: "昭岚",
      note: "退款审核中，待原付款账户回退"
    },
    {
      id: "FRZ-202605120920", out_freeze_no: "FRZ_20260512_DSP1",
      walletKey: "team-budget-cf-drama", amount: 12000, recharge_deduct: 0,
      biz_type: "dispute_lock", status: "frozen",
      created_at: "2026-05-12 09:20", expire_at: null,
      relatedDemand: "DM-2026050203", relatedOrder: "OD-2026050501",
      voucher_no: "V-202605120920",
      operator: "平台介入",
      note: "需求方质疑交付物质量，平台仲裁中"
    }
  ];

  // ============================================================
  // 默认资金流水（资金中心 / 项目空间结算分账演示用）
  // v2 字段（对齐复式记账）：
  //   voucher_no    凭证号（一证至少两分录；同一凭证下多条 ledger 共用此号）
  //   subject_code  科目编码（见设计文档 6.5 节）
  //   direction     debit | credit  借/贷方向
  //
  // 编码速查：1001 可用 / 1002 冻结 / 2001 充值本金 / 3001 经营收益
  //          5001 消耗 / 6001 平台收入
  // ============================================================

  // ============================================================
  // 划拨单（transfer_order）— 二期 P2 跟随后端落地
  // 状态机：success（划拨即时生效，无审核中态；如需审核走另一通道 budget_request）
  // ============================================================
  var defaultTransferOrders = [
    {
      id: "TF-202603250900", out_transfer_no: "TF_20260325_001",
      time: "2026-03-25 09:00",
      from_walletKey: "enterprise-main-cf", to_walletKey: "team-budget-cf-drama",
      amount: 200000, biz_type: "budget_allocate",
      status: "success", operator: "周总（企业管理员）",
      memo: "Q2 短剧制作中心预算下达",
      voucher_no: "V-202603250900"
    },
    {
      id: "TF-202603251000", out_transfer_no: "TF_20260325_002",
      time: "2026-03-25 10:00",
      from_walletKey: "enterprise-main-cf", to_walletKey: "team-budget-cf-marketing",
      amount: 80000, biz_type: "budget_allocate",
      status: "success", operator: "周总（企业管理员）",
      memo: "Q2 市场宣传组预算下达",
      voucher_no: "V-202603251000"
    }
  ];

  // ============================================================
  // 提现单（withdraw_order）— 二期 P2 跟随后端落地
  // 状态机：pending → reviewing → approved → success
  //         pending → reviewing → rejected
  // 仅 personal / contractor 钱包可发起；扣减 total_earnings、累加 total_withdrawn
  // ============================================================
  var defaultWithdrawOrders = [
    {
      id: "WD-202604180821", out_withdraw_no: "WD_20260418_001",
      time: "2026-04-18 08:21",
      walletKey: "personal-account-lixueqin",
      amount: 800,
      status: "success", risk_level: "low",
      bank_card: "中国建设银行 (尾号 8826)",
      memo: "三月配音稿酬",
      submitted_at: "2026-04-15 14:00",
      risk_check_at: "2026-04-15 14:08",
      reviewed_at: "2026-04-16 10:30",
      arrived_at:  "2026-04-18 08:21",
      voucher_no: "V-202604180821",
      operator: "昭岚",
      reviewer: "财务-赵静"
    },
    {
      id: "WD-202604261410", out_withdraw_no: "WD_20260426_002",
      time: "2026-04-26 14:10",
      walletKey: "personal-account-lixueqin",
      amount: 35000,
      status: "reviewing", risk_level: "low",
      bank_card: "中国建设银行 (尾号 8826)",
      memo: "Q2 项目结款",
      submitted_at: "2026-04-26 14:10",
      risk_check_at: "2026-04-26 14:12",
      operator: "昭岚"
    },
    {
      id: "WD-202604220955", out_withdraw_no: "WD_20260422_003",
      time: "2026-04-22 09:55",
      walletKey: "personal-account-lixueqin",
      amount: 80000,
      status: "rejected", risk_level: "high",
      bank_card: "招商银行 (尾号 1234)",
      memo: "代付他人款项",
      submitted_at: "2026-04-22 09:55",
      risk_check_at: "2026-04-22 10:02",
      reviewed_at: "2026-04-22 10:30",
      reject_reason: "风控审核未通过：高金额提现需补充更详细的资金来源说明 + 实际收款人需与本人一致",
      reviewer: "风控-自动 + 风控-王浩",
      operator: "昭岚"
    }
  ];

  var defaultFlows = [
    { id: "F-001", time: "2026-04-26 17:32", type: "recharge", desc: "对公转账充值（待财务审核）", account: "enterprise-main-cf", amount: 0, lockedNote: "审核中 ¥200,000", operator: "周总（企业管理员）", voucher_no: null, subject_code: "1001", direction: "debit", related_recharge: "RC-202604261732" },
    { id: "F-002", time: "2026-04-25 15:48", type: "lock", desc: "下单锁定 - DM-2026042512「三集短剧解说视频」", account: "team-budget-cf-drama", amount: -18000, operator: "昭岚", voucher_no: "V-202604251548", subject_code: "1002", direction: "debit", related_freeze: "FRZ-202604251548" },
    { id: "F-003", time: "2026-04-25 11:08", type: "settle", desc: "订单分账 - OD-2026041807「广告片配音」承制方入账", account: "team-budget-cf-marketing", amount: 0, operator: "系统", voucher_no: "V-202604251108", subject_code: "1002", direction: "credit" },
    { id: "F-004", time: "2026-04-25 11:08", type: "settle", desc: "订单分账 - 平台服务费 5%", account: "enterprise-main-cf", amount: -400, operator: "系统", voucher_no: "V-202604251108", subject_code: "6001", direction: "credit" },
    { id: "F-005", time: "2026-04-24 16:30", type: "refund", desc: "部分退款 - DM-2026031908「电商主图」交付不达标", account: "team-budget-cf-marketing", amount: 1500, operator: "陈默", voucher_no: "V-202604241630", subject_code: "2001", direction: "debit" },
    { id: "F-006", time: "2026-04-24 14:20", type: "allocate", desc: "企业管理员划拨预算 → 短剧制作中心", account: "team-budget-cf-drama", amount: 50000, operator: "周总（企业管理员）", voucher_no: "V-202604241420", subject_code: "1001", direction: "debit" },
    { id: "F-007", time: "2026-04-24 14:20", type: "allocate", desc: "从企业主账户划拨至 短剧制作中心", account: "enterprise-main-cf", amount: -50000, operator: "周总（企业管理员）", voucher_no: "V-202604241420", subject_code: "1001", direction: "credit" },
    { id: "F-008", time: "2026-04-23 10:00", type: "lock", desc: "下单锁定 - OD-2026042307「新剧 IP 海报系列」", account: "team-budget-cf-drama", amount: -28000, operator: "昭岚", voucher_no: "V-202604231000", subject_code: "1002", direction: "debit", related_freeze: "FRZ-202604231000" },
    { id: "F-009", time: "2026-04-22 18:20", type: "withdraw", desc: "提现申请 - 个人账户至建行 8826（已打款）", account: "personal-account-lixueqin", amount: -800, operator: "昭岚", voucher_no: "V-202604221820", subject_code: "3001", direction: "debit" },
    { id: "F-010", time: "2026-04-22 09:30", type: "lock", desc: "下单锁定 - OD-2026042009「广告片配音」", account: "team-budget-cf-marketing", amount: -8000, operator: "陈默", voucher_no: "V-202604220930", subject_code: "1002", direction: "debit", related_freeze: "FRZ-202604220930" },
    { id: "F-011", time: "2026-04-20 16:40", type: "settle", desc: "订单结算入账 - OD-2026042009「广告片配音」验收完成", account: "team-budget-cf-marketing", amount: -8000, operator: "系统", voucher_no: "V-202604201640", subject_code: "5001", direction: "debit" },
    { id: "F-012", time: "2026-04-19 15:00", type: "invoice", desc: "开具增值税专票 - OD-2026031502「品牌片拍摄」¥120,000", account: "enterprise-main-cf", amount: 0, operator: "周总（企业管理员）", voucher_no: null, subject_code: null, direction: null },
    { id: "F-013", time: "2026-04-18 09:15", type: "recharge", desc: "对公转账充值（财务审核通过）", account: "enterprise-main-cf", amount: 500000, operator: "周总（企业管理员）", voucher_no: "V-202604180915", subject_code: "1001", direction: "debit", related_recharge: "RC-202604180915" },
    { id: "F-014", time: "2026-04-16 14:50", type: "settle", desc: "订单结算 - OD-2026031502「品牌片拍摄」", account: "team-budget-cf-marketing", amount: -120000, operator: "系统", voucher_no: "V-202604161450", subject_code: "5001", direction: "debit" },
    { id: "F-015", time: "2026-04-15 22:25", type: "recharge", desc: "支付宝充值", account: "personal-account-lixueqin", amount: 1000, operator: "昭岚", voucher_no: "V-202604221831", subject_code: "1001", direction: "debit", related_recharge: "RC-202604221831" },
    { id: "F-016", time: "2026-04-14 10:30", type: "lock", desc: "下单锁定 - OD-2026041401「IP 形象设计」", account: "team-budget-cf-drama", amount: -15000, operator: "昭岚", voucher_no: "V-202604141030", subject_code: "1002", direction: "debit", related_freeze: "FRZ-202604141030" },
    { id: "F-017", time: "2026-04-12 17:42", type: "settle", desc: "订单结算 - OD-2026041401「IP 形象设计」", account: "team-budget-cf-drama", amount: -15000, operator: "系统", voucher_no: "V-202604121742", subject_code: "5001", direction: "debit" },
    { id: "F-018", time: "2026-04-08 11:20", type: "allocate", desc: "企业管理员划拨预算 → 市场宣传组（季度初配置）", account: "team-budget-cf-marketing", amount: 70000, operator: "周总（企业管理员）", voucher_no: "V-202604081120", subject_code: "1001", direction: "debit" },
    { id: "F-019", time: "2026-04-08 11:20", type: "allocate", desc: "从企业主账户划拨至 市场宣传组（季度初）", account: "enterprise-main-cf", amount: -70000, operator: "周总（企业管理员）", voucher_no: "V-202604081120", subject_code: "1001", direction: "credit" },
    { id: "F-020", time: "2026-04-08 11:18", type: "allocate", desc: "企业管理员划拨预算 → 短剧制作中心（季度初配置）", account: "team-budget-cf-drama", amount: 150000, operator: "周总（企业管理员）", voucher_no: "V-202604081118", subject_code: "1001", direction: "debit" },
    { id: "F-021", time: "2026-04-08 11:18", type: "allocate", desc: "从企业主账户划拨至 短剧制作中心（季度初）", account: "enterprise-main-cf", amount: -150000, operator: "周总（企业管理员）", voucher_no: "V-202604081118", subject_code: "1001", direction: "credit" },
    { id: "F-022", time: "2026-04-05 10:00", type: "recharge", desc: "对公转账充值 - 季度预算补充", account: "enterprise-main-cf", amount: 1250000, operator: "周总（企业管理员）", voucher_no: "V-202604051000", subject_code: "1001", direction: "debit", related_recharge: "RC-202604051000" }
  ];

  function readJson(k, fallback) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch (_) { return fallback; }
  }
  function writeJson(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {}
  }

  // 兼容老数据：为已存在的 demands 回填 auditMode / auditedAt / projectSpaceId 等新字段
  // 仅做一次性"加字段"，不覆盖已有值
  function migrateDemands() {
    var migKey = "demoDemandsSchemaV2";
    if (localStorage.getItem(migKey)) return;
    var list = readJson(KEY.demands, null);
    if (!list || !list.length) { localStorage.setItem(migKey, "1"); return; }
    var APPROVED = ["matching", "auto-approved", "quoting", "in-progress", "completed"];
    list.forEach(function (d) {
      if (d.requirementType == null) d.requirementType = "CUSTOM";
      if (d.auditMode == null) d.auditMode = (d.requirementType === "PLATFORM_SKU" ? "auto" : "manual");
      if (d.auditedBy === undefined) d.auditedBy = APPROVED.indexOf(d.status) >= 0 ? (d.auditMode === "auto" ? "system-auto" : "运营-小李") : null;
      if (d.auditedAt === undefined) d.auditedAt = APPROVED.indexOf(d.status) >= 0 ? (d.createTime || null) : null;
      if (d.projectSpaceId === undefined) {
        d.projectSpaceId = APPROVED.indexOf(d.status) >= 0
          ? "PS-" + (d.id || "").replace(/[^0-9]/g, "").slice(0, 8) + Math.floor(Math.random() * 9000 + 1000)
          : null;
      }
      if (d.projectSpaceCreatedAt === undefined) d.projectSpaceCreatedAt = d.projectSpaceId ? (d.auditedAt || d.createTime) : null;
    });
    writeJson(KEY.demands, list);
    localStorage.setItem(migKey, "1");
  }

  // 钱包数据 v2 schema 迁移：给已有 localStorage 中的 wallets 回填新字段
  // 仅一次性"加字段"，不覆盖已有值；同时把 balance/lockedAmount 与 available_balance/frozen_balance 双向同步
  function migrateWalletsSchemaV2() {
    var migKey = "demoWalletsSchemaV2";
    if (localStorage.getItem(migKey)) return;
    var wallets = readJson(KEY.wallets, null);
    if (!wallets) { localStorage.setItem(migKey, "1"); return; }
    var ptsMap = readJson(KEY.pointsBalance, defaultPointsBalance);
    Object.keys(wallets).forEach(function (k) {
      var w = wallets[k];
      // 主字段（设计文档 source of truth）
      if (w.available_balance == null) w.available_balance = w.balance || 0;
      if (w.frozen_balance == null)    w.frozen_balance    = w.lockedAmount || 0;
      if (w.recharge_balance == null) {
        // 团队预算无充值；个人/企业主默认按"全部可用"作为充值余额（保守上限）
        w.recharge_balance = (w.type === "team-budget") ? 0 : (w.available_balance || 0);
      }
      if (w.total_earnings == null) {
        // 仅个人/承制方有收益；其他默认 0。个人账户 demo 给 1800（用于演示提现拦截）
        w.total_earnings = (w.type === "personal") ? 1800 : 0;
      }
      if (w.total_withdrawn == null)  w.total_withdrawn  = (w.type === "personal") ? 800 : 0;
      if (w.pending_withdraw == null) w.pending_withdraw = 0;
      if (w.points_balance == null)   w.points_balance   = ptsMap[k] || 0;
      if (w.points_frozen == null)    w.points_frozen    = 0;
      // 兼容字段同步
      w.balance      = w.available_balance;
      w.lockedAmount = w.frozen_balance;
    });
    writeJson(KEY.wallets, wallets);
    localStorage.setItem(migKey, "1");
  }

  function initDemoState() {
    if (!localStorage.getItem(KEY.ws))       localStorage.setItem(KEY.ws, "cf-drama");
    if (!localStorage.getItem(KEY.identity)) localStorage.setItem(KEY.identity, "demander");
    if (!localStorage.getItem(KEY.demands))  writeJson(KEY.demands,  defaultDemands);
    migrateDemands();
    if (!localStorage.getItem(KEY.orders))   writeJson(KEY.orders,   defaultOrders);
    if (!localStorage.getItem(KEY.wallets))  writeJson(KEY.wallets,  defaultWallets);
    migrateWalletsSchemaV2();
    if (!localStorage.getItem(KEY.flows))    writeJson(KEY.flows,    defaultFlows);
    if (!localStorage.getItem(KEY.contractorProfile)) writeJson(KEY.contractorProfile, defaultContractorProfile);
    if (!localStorage.getItem(KEY.contractorInbox))   writeJson(KEY.contractorInbox,   defaultContractorInbox);
    if (!localStorage.getItem(KEY.members))  writeJson(KEY.members,  defaultMembers);
    if (!localStorage.getItem(KEY.roles))    writeJson(KEY.roles,    defaultRoles);
    if (!localStorage.getItem(KEY.profileComplete)) localStorage.setItem(KEY.profileComplete, "1");
    if (!localStorage.getItem(KEY.spendReviewConfig))    writeJson(KEY.spendReviewConfig,    defaultSpendReviewConfig);
    if (!localStorage.getItem(KEY.spendApprovals))       writeJson(KEY.spendApprovals,       defaultSpendApprovals);
    if (!localStorage.getItem(KEY.spendApprovalHistory)) writeJson(KEY.spendApprovalHistory, defaultSpendApprovalHistory);
    if (!localStorage.getItem(KEY.pointsBalance))        writeJson(KEY.pointsBalance,        defaultPointsBalance);
    if (!localStorage.getItem(KEY.pointsExchanges))      writeJson(KEY.pointsExchanges,      defaultPointsExchanges);
    if (!localStorage.getItem(KEY.pointsConsumptions))   writeJson(KEY.pointsConsumptions,   defaultPointsConsumptions);
    // v2 新增 mock 表（一期 batch A）
    if (!localStorage.getItem(KEY.accountUser))    writeJson(KEY.accountUser,    defaultAccountUser);
    if (!localStorage.getItem(KEY.rechargeOrders)) writeJson(KEY.rechargeOrders, defaultRechargeOrders);
    if (!localStorage.getItem(KEY.freezeOrders))   writeJson(KEY.freezeOrders,   defaultFreezeOrders);
    // 二期 batch B 跟随后端落地
    if (!localStorage.getItem(KEY.transferOrders)) writeJson(KEY.transferOrders, defaultTransferOrders);
    if (!localStorage.getItem(KEY.withdrawOrders)) writeJson(KEY.withdrawOrders, defaultWithdrawOrders);
    // 迁移：B-4 引入了 reviewing/rejected 种子，旧版只有 1 条 success，自动追加（不覆盖用户演示中产生的真实单）
    (function migrateWithdrawSeedV2() {
      var migKey = "demo_migrated_withdraw_seed_v2";
      if (localStorage.getItem(migKey)) return;
      var existing = readJson(KEY.withdrawOrders, []);
      var existingIds = new Set(existing.map(function (o) { return o.id; }));
      var added = 0;
      defaultWithdrawOrders.forEach(function (seed) {
        if (!existingIds.has(seed.id)) { existing.push(seed); added++; }
      });
      if (added) writeJson(KEY.withdrawOrders, existing);
      localStorage.setItem(migKey, "1");
    })();
  }

  // ============================================================
  // 全局 demoApp
  // ============================================================
  window.demoApp = {
    WORKSPACES: WORKSPACES,
    KEY: KEY,
    initDemoState: initDemoState,
    getCurrentWorkspaceId: function () { return localStorage.getItem(KEY.ws) || "cf-drama"; },
    getCurrentWorkspace:   function () { return WORKSPACES[localStorage.getItem(KEY.ws) || "cf-drama"]; },
    setCurrentWorkspace:   function (id) { localStorage.setItem(KEY.ws, id); },
    getCurrentIdentity:    function () { return localStorage.getItem(KEY.identity) || "demander"; },
    setCurrentIdentity:    function (v) { localStorage.setItem(KEY.identity, v); },

    getDemands: function () { return readJson(KEY.demands, defaultDemands); },
    setDemands: function (v) { writeJson(KEY.demands, v); },
    addDemand:  function (d) { var l = readJson(KEY.demands, defaultDemands); l.unshift(d); writeJson(KEY.demands, l); },
    updateDemand: function (id, partial) {
      var l = readJson(KEY.demands, defaultDemands);
      var idx = l.findIndex(function (x) { return x.id === id; });
      if (idx >= 0) { l[idx] = Object.assign({}, l[idx], partial); writeJson(KEY.demands, l); }
    },

    getOrders: function () { return readJson(KEY.orders, defaultOrders); },
    setOrders: function (v) { writeJson(KEY.orders, v); },
    addOrder:  function (o) { var l = readJson(KEY.orders, defaultOrders); l.unshift(o); writeJson(KEY.orders, l); },
    updateOrder: function (id, partial) {
      var l = readJson(KEY.orders, defaultOrders);
      var idx = l.findIndex(function (x) { return x.id === id; });
      if (idx >= 0) { l[idx] = Object.assign({}, l[idx], partial); writeJson(KEY.orders, l); }
    },

    getWallets: function () { return readJson(KEY.wallets, defaultWallets); },
    // 同步规则：以 balance / lockedAmount 为最新值（旧页面直接写它们），
    // setWallets 时把 v2 主字段（available_balance / frozen_balance）拉齐。
    // 新代码若想更新可用余额，请同时写 balance 和 available_balance（或只写 balance）。
    setWallets: function (v) {
      Object.keys(v || {}).forEach(function (k) {
        var w = v[k]; if (!w) return;
        if (w.balance != null)      w.available_balance = w.balance;
        if (w.lockedAmount != null) w.frozen_balance    = w.lockedAmount;
      });
      writeJson(KEY.wallets, v);
    },
    lockBudget: function (walletKey, amount) {
      var w = readJson(KEY.wallets, defaultWallets);
      if (!w[walletKey]) return false;
      if ((w[walletKey].available_balance || w[walletKey].balance || 0) < amount) return false;
      w[walletKey].available_balance = (w[walletKey].available_balance || w[walletKey].balance || 0) - amount;
      w[walletKey].frozen_balance    = (w[walletKey].frozen_balance    || w[walletKey].lockedAmount || 0) + amount;
      // 兼容
      w[walletKey].balance      = w[walletKey].available_balance;
      w[walletKey].lockedAmount = w[walletKey].frozen_balance;
      writeJson(KEY.wallets, w);
      return true;
    },

    // ---- v2 新增：基于设计文档的资金能力 ----

    // 可提现金额 = total_earnings - total_withdrawn - pending_withdraw
    // 注意：设计文档明确"提现仅针对收益部分"，充值余额不能提现，只能退款
    getWithdrawableAmount: function (walletKey) {
      var w = readJson(KEY.wallets, defaultWallets)[walletKey];
      if (!w) return 0;
      return Math.max(0, (w.total_earnings || 0) - (w.total_withdrawn || 0) - (w.pending_withdraw || 0));
    },

    // 统一操作人 + 实名状态
    getAccountUser:    function () { return readJson(KEY.accountUser, defaultAccountUser); },
    setAccountUser:    function (v) { writeJson(KEY.accountUser, v); },
    getRealNameStatus: function () { return (readJson(KEY.accountUser, defaultAccountUser) || {}).real_name_status || "unverified"; },
    setRealNameStatus: function (status, extra) {
      var u = readJson(KEY.accountUser, defaultAccountUser) || {};
      u.real_name_status = status;
      if (extra) Object.keys(extra).forEach(function (k) { u[k] = extra[k]; });
      writeJson(KEY.accountUser, u);
    },
    // 实名等级权重（不可降级；用于"是否满足提现/AIGC 等门槛"判定）
    realNameLevel: function (status) {
      var rank = { unverified: 0, pending: 0, rejected: 0, expired: 0,
                   basic_verified: 1, liveness_verified: 2, enterprise_verified: 3 };
      return rank[status] != null ? rank[status] : 0;
    },
    // 提现合规检查：必须 >= liveness_verified（中级实名）
    canWithdraw: function () {
      return this.realNameLevel(this.getRealNameStatus()) >= 2;
    },

    // 充值订单
    getRechargeOrders: function () { return readJson(KEY.rechargeOrders, defaultRechargeOrders); },
    setRechargeOrders: function (v) { writeJson(KEY.rechargeOrders, v); },
    addRechargeOrder:  function (o) { var l = readJson(KEY.rechargeOrders, defaultRechargeOrders); l.unshift(o); writeJson(KEY.rechargeOrders, l); },
    // 按充值订单维度退款（前端模拟）：扣减 remaining_refundable + 钱包 recharge_balance + available_balance
    refundByRechargeOrder: function (rechargeOrderId, amount, outRefundNo) {
      var orders = readJson(KEY.rechargeOrders, defaultRechargeOrders);
      var idx = orders.findIndex(function (o) { return o.id === rechargeOrderId; });
      if (idx < 0) return { ok: false, error: "充值订单不存在" };
      var ro = orders[idx];
      if (ro.status !== "success") return { ok: false, error: "充值订单状态非 success，不可退款" };
      if (amount > ro.remaining_refundable) return { ok: false, error: "超过该笔充值剩余可退额度（" + ro.remaining_refundable + "）" };
      var wallets = readJson(KEY.wallets, defaultWallets);
      var w = wallets[ro.walletKey];
      if (!w) return { ok: false, error: "钱包不存在" };
      if (amount > (w.recharge_balance || 0)) return { ok: false, error: "钱包充值余额不足（已部分消费）" };
      // 扣减
      ro.refunded_amount = (ro.refunded_amount || 0) + amount;
      ro.remaining_refundable = ro.remaining_refundable - amount;
      writeJson(KEY.rechargeOrders, orders);
      w.recharge_balance  = (w.recharge_balance || 0) - amount;
      w.available_balance = (w.available_balance || w.balance || 0) - amount;
      w.balance = w.available_balance;
      writeJson(KEY.wallets, wallets);
      return { ok: true, remaining: ro.remaining_refundable, walletBalance: w.available_balance };
    },

    // 冻结单（TCC）
    getFreezeOrders: function () { return readJson(KEY.freezeOrders, defaultFreezeOrders); },
    setFreezeOrders: function (v) { writeJson(KEY.freezeOrders, v); },
    addFreezeOrder:  function (o) { var l = readJson(KEY.freezeOrders, defaultFreezeOrders); l.unshift(o); writeJson(KEY.freezeOrders, l); },
    // 按钱包过滤当前 status=frozen 的冻结单
    getActiveFreezeOrders: function (walletKey) {
      var l = readJson(KEY.freezeOrders, defaultFreezeOrders);
      return l.filter(function (o) { return o.walletKey === walletKey && o.status === "frozen"; });
    },

    // ------ B-3：TCC 三段联动（Try / Confirm / Cancel）------
    // 业务语义：
    //   tccTry      = 下单冻结：钱包 available -= amt, frozen += amt + 写凭证（1002 借 / 1001 贷）+ 落 freeze_order(frozen)
    //   tccConfirm  = 订单完成：钱包 frozen -= amt + 写结算凭证（5001 借 / 1002 贷）+ freeze_order.status="confirmed"
    //   tccCancel   = 订单取消：钱包 available += amt, frozen -= amt + 写解冻凭证（1001 借 / 1002 贷）+ freeze_order.status="cancelled"
    // 入参 ctx：{ walletKey, amount, demandId?, orderId?, biz_type?, operator?, expireDays? }
    tccTry: function (ctx) {
      ctx = ctx || {};
      var amt = Number(ctx.amount) || 0;
      var walletKey = ctx.walletKey;
      if (!amt || !walletKey) return { ok: false, error: "参数不全" };

      var wallets = readJson(KEY.wallets, defaultWallets);
      var w = wallets[walletKey];
      if (!w) return { ok: false, error: "钱包不存在" };
      var avail = (w.available_balance != null ? w.available_balance : w.balance) || 0;
      if (amt > avail) return { ok: false, error: "可用余额不足" };

      var ts = (function () {
        var d = new Date();
        function p(n) { return String(n).padStart(2,"0"); }
        return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
      })();
      var ymd = ts.slice(0,10).replace(/-/g,"");
      var seq = String(Date.now()).slice(-4);
      var frzId = "FRZ-" + Date.now();
      var voucherNo = "V-" + Date.now();
      var expireDays = ctx.expireDays || 7;
      var expireAt = (function () {
        var d = new Date(); d.setDate(d.getDate() + expireDays);
        function p(n){ return String(n).padStart(2,"0"); }
        return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
      })();

      // 1) 钱包：available -= amt, frozen += amt
      w.available_balance = avail - amt;
      w.frozen_balance    = (w.frozen_balance || 0) + amt;
      w.lockedAmount      = (w.lockedAmount || 0) + amt; // 兼容字段
      w.balance           = w.available_balance;
      wallets[walletKey] = w;
      writeJson(KEY.wallets, wallets);

      // 2) freeze_order 入库
      var fo = {
        id: frzId, out_freeze_no: "FRZ_" + ymd + "_" + seq,
        walletKey: walletKey, amount: amt, recharge_deduct: 0,
        biz_type: ctx.biz_type || "cash_consume",
        status: "frozen",
        created_at: ts, expire_at: expireAt,
        relatedDemand: ctx.demandId || null,
        relatedOrder:  ctx.orderId  || null,
        voucher_no: voucherNo,
        operator: ctx.operator || "昭岚"
      };
      var fos = readJson(KEY.freezeOrders, defaultFreezeOrders);
      fos.unshift(fo);
      writeJson(KEY.freezeOrders, fos);

      // 3) 双向凭证：1002 冻结 借（资产内部转移） / 1001 可用 贷
      var flows = readJson(KEY.flows, defaultFlows);
      flows.unshift({
        id: "F-FRZ-T-" + Date.now(),
        time: ts, type: "lock",
        desc: "下单锁定" + (ctx.demandId ? " - " + ctx.demandId : "") + (ctx.orderTitle ? "「" + ctx.orderTitle + "」" : ""),
        account: walletKey,
        amount: -amt, operator: ctx.operator || "昭岚",
        voucher_no: voucherNo, subject_code: "1002", direction: "debit",
        related_freeze: frzId, relatedDemand: ctx.demandId || null
      });
      flows.unshift({
        id: "F-FRZ-T-OFFSET-" + Date.now(),
        time: ts, type: "lock",
        desc: "（对手方）下单锁定 - 可用余额减少",
        account: walletKey,
        amount: 0, _voucherAmt: amt, operator: "system",
        voucher_no: voucherNo, subject_code: "1001", direction: "credit",
        related_freeze: frzId, lockedNote: "对手方记账（贷方）"
      });
      writeJson(KEY.flows, flows);

      return { ok: true, freezeId: frzId, voucherNo: voucherNo };
    },

    tccConfirm: function (freezeId, opts) {
      opts = opts || {};
      var fos = readJson(KEY.freezeOrders, defaultFreezeOrders);
      var idx = fos.findIndex(function (o) { return o.id === freezeId; });
      if (idx < 0) return { ok: false, error: "冻结单不存在" };
      var fo = fos[idx];
      if (fo.status !== "frozen") return { ok: false, error: "冻结单已 " + fo.status + "，无法 confirm" };

      var wallets = readJson(KEY.wallets, defaultWallets);
      var w = wallets[fo.walletKey];
      if (!w) return { ok: false, error: "钱包不存在" };

      var ts = (function () {
        var d = new Date();
        function p(n) { return String(n).padStart(2,"0"); }
        return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
      })();
      var voucherNo = "V-" + Date.now();

      // 1) freeze_order: frozen → confirmed
      fo.status = "confirmed";
      fo.confirmed_at = ts;
      fo.relatedOrder = opts.orderId || fo.relatedOrder;
      fos[idx] = fo;
      writeJson(KEY.freezeOrders, fos);

      // 2) 钱包：frozen -= amt（资金真正出账）
      w.frozen_balance = Math.max(0, (w.frozen_balance || 0) - fo.amount);
      w.lockedAmount   = Math.max(0, (w.lockedAmount   || 0) - fo.amount);
      wallets[fo.walletKey] = w;
      writeJson(KEY.wallets, wallets);

      // 3) 结算凭证：5001 已结算消耗 借 / 1002 冻结余额 贷
      var flows = readJson(KEY.flows, defaultFlows);
      flows.unshift({
        id: "F-FRZ-C-" + Date.now(),
        time: ts, type: "settle",
        desc: "订单结算" + (fo.relatedOrder ? " - " + fo.relatedOrder : ""),
        account: fo.walletKey,
        amount: -fo.amount, operator: opts.operator || "system",
        voucher_no: voucherNo, subject_code: "5001", direction: "debit",
        related_freeze: freezeId, relatedDemand: fo.relatedDemand
      });
      flows.unshift({
        id: "F-FRZ-C-OFFSET-" + Date.now(),
        time: ts, type: "settle",
        desc: "（对手方）订单结算 - 冻结余额释放",
        account: fo.walletKey,
        amount: 0, _voucherAmt: fo.amount, operator: "system",
        voucher_no: voucherNo, subject_code: "1002", direction: "credit",
        related_freeze: freezeId, lockedNote: "对手方记账（贷方）"
      });
      writeJson(KEY.flows, flows);
      return { ok: true, voucherNo: voucherNo };
    },

    tccCancel: function (freezeId, opts) {
      opts = opts || {};
      var fos = readJson(KEY.freezeOrders, defaultFreezeOrders);
      var idx = fos.findIndex(function (o) { return o.id === freezeId; });
      if (idx < 0) return { ok: false, error: "冻结单不存在" };
      var fo = fos[idx];
      if (fo.status !== "frozen") return { ok: false, error: "冻结单已 " + fo.status + "，无法 cancel" };

      var wallets = readJson(KEY.wallets, defaultWallets);
      var w = wallets[fo.walletKey];
      if (!w) return { ok: false, error: "钱包不存在" };

      var ts = (function () {
        var d = new Date();
        function p(n) { return String(n).padStart(2,"0"); }
        return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
      })();
      var voucherNo = "V-" + Date.now();

      // 1) freeze_order: frozen → cancelled
      fo.status = "cancelled";
      fo.cancelled_at = ts;
      fo.cancel_reason = opts.reason || "主动取消";
      fos[idx] = fo;
      writeJson(KEY.freezeOrders, fos);

      // 2) 钱包：frozen -= amt + available += amt（资金回到可用）
      w.frozen_balance    = Math.max(0, (w.frozen_balance    || 0) - fo.amount);
      w.lockedAmount      = Math.max(0, (w.lockedAmount      || 0) - fo.amount);
      w.available_balance = (w.available_balance || w.balance || 0) + fo.amount;
      w.balance           = w.available_balance;
      wallets[fo.walletKey] = w;
      writeJson(KEY.wallets, wallets);

      // 3) 解冻凭证：1001 可用余额 借 / 1002 冻结余额 贷
      var flows = readJson(KEY.flows, defaultFlows);
      flows.unshift({
        id: "F-FRZ-X-" + Date.now(),
        time: ts, type: "unlock",
        desc: "订单取消解冻" + (fo.relatedDemand ? " - " + fo.relatedDemand : "") + "（" + (opts.reason || "主动取消") + "）",
        account: fo.walletKey,
        amount: fo.amount, operator: opts.operator || "system",
        voucher_no: voucherNo, subject_code: "1001", direction: "debit",
        related_freeze: freezeId, relatedDemand: fo.relatedDemand
      });
      flows.unshift({
        id: "F-FRZ-X-OFFSET-" + Date.now(),
        time: ts, type: "unlock",
        desc: "（对手方）订单取消 - 冻结余额释放",
        account: fo.walletKey,
        amount: 0, _voucherAmt: fo.amount, operator: "system",
        voucher_no: voucherNo, subject_code: "1002", direction: "credit",
        related_freeze: freezeId, lockedNote: "对手方记账（贷方）"
      });
      writeJson(KEY.flows, flows);
      return { ok: true, voucherNo: voucherNo };
    },

    // 划拨单（transfer_order）— B-2
    getTransferOrders: function () { return readJson(KEY.transferOrders, defaultTransferOrders); },
    setTransferOrders: function (v) { writeJson(KEY.transferOrders, v); },
    addTransferOrder:  function (o) { var l = readJson(KEY.transferOrders, defaultTransferOrders); l.unshift(o); writeJson(KEY.transferOrders, l); },

    // 提现单（withdraw_order）— B-4
    getWithdrawOrders: function () { return readJson(KEY.withdrawOrders, defaultWithdrawOrders); },
    setWithdrawOrders: function (v) { writeJson(KEY.withdrawOrders, v); },
    addWithdrawOrder:  function (o) { var l = readJson(KEY.withdrawOrders, defaultWithdrawOrders); l.unshift(o); writeJson(KEY.withdrawOrders, l); },

    getFlows: function () { return readJson(KEY.flows, defaultFlows); },
    setFlows: function (v) { writeJson(KEY.flows, v); },
    addFlow:  function (f) { var l = readJson(KEY.flows, defaultFlows); l.unshift(f); writeJson(KEY.flows, l); },

    getDraft:   function () { return readJson(KEY.draft, null); },
    setDraft:   function (v) { writeJson(KEY.draft, v); },
    clearDraft: function () { try { localStorage.removeItem(KEY.draft); } catch (_) {} },

    getContractorProfile: function () { return readJson(KEY.contractorProfile, defaultContractorProfile); },
    setContractorProfile: function (v) { writeJson(KEY.contractorProfile, v); },
    getContractorInbox:   function () { return readJson(KEY.contractorInbox,   defaultContractorInbox); },
    setContractorInbox:   function (v) { writeJson(KEY.contractorInbox,   v); },

    getMembers: function () { return readJson(KEY.members, defaultMembers); },
    setMembers: function (v) { writeJson(KEY.members, v); },
    getRoles:   function () { return readJson(KEY.roles, defaultRoles); },

    // ---- 积分中心 ----
    POINTS_PACKAGES: POINTS_PACKAGES,
    getPointsPackages: function () { return POINTS_PACKAGES.slice(); },
    getPointsBalances: function () { return readJson(KEY.pointsBalance, defaultPointsBalance); },
    getPointsBalance: function (walletKey) {
      var m = readJson(KEY.pointsBalance, defaultPointsBalance);
      return m[walletKey] || 0;
    },
    setPointsBalance: function (walletKey, value) {
      var m = readJson(KEY.pointsBalance, defaultPointsBalance);
      m[walletKey] = Math.max(0, value);
      writeJson(KEY.pointsBalance, m);
    },
    getPointsExchanges:    function () { return readJson(KEY.pointsExchanges, defaultPointsExchanges); },
    getPointsConsumptions: function () { return readJson(KEY.pointsConsumptions, defaultPointsConsumptions); },

    // 兑换：从指定钱包余额扣除现金，对应账户加积分
    exchangePoints: function (walletKey, packageId, operator) {
      var pkg = POINTS_PACKAGES.find(function (p) { return p.id === packageId; });
      if (!pkg) return { ok: false, error: "套餐不存在" };
      var wallets = readJson(KEY.wallets, defaultWallets);
      var w = wallets[walletKey];
      if (!w) return { ok: false, error: "钱包不存在" };
      if (w.balance < pkg.price) return { ok: false, error: "账户余额不足，请先充值" };
      // 扣余额
      w.balance -= pkg.price;
      writeJson(KEY.wallets, wallets);
      // 加积分
      var balances = readJson(KEY.pointsBalance, defaultPointsBalance);
      balances[walletKey] = (balances[walletKey] || 0) + pkg.points;
      writeJson(KEY.pointsBalance, balances);
      // 记一笔兑换历史
      var exchanges = readJson(KEY.pointsExchanges, defaultPointsExchanges);
      var now = new Date();
      var pad = function (n) { return n < 10 ? "0" + n : n; };
      var ts = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate())
        + " " + pad(now.getHours()) + ":" + pad(now.getMinutes());
      exchanges.unshift({
        id: "EX-" + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate())
          + pad(now.getHours()) + pad(now.getMinutes()),
        time: ts, walletKey: walletKey, packageId: pkg.id,
        price: pkg.price, points: pkg.points, operator: operator || "昭岚"
      });
      writeJson(KEY.pointsExchanges, exchanges);
      // 同时写一笔资金流水（让资金流水里看得到）
      var flows = readJson(KEY.flows, defaultFlows);
      flows.unshift({
        id: "F-EX-" + Date.now(),
        time: ts, type: "withdraw",
        desc: "兑换积分 · " + pkg.name + "（+" + pkg.points + " 积分）",
        account: walletKey, amount: -pkg.price,
        operator: operator || "昭岚"
      });
      writeJson(KEY.flows, flows);
      return { ok: true, newPoints: balances[walletKey], newBalance: w.balance };
    },

    // 消耗：扣积分 + 写消耗记录
    consumePoints: function (walletKey, tool, cost, operator, relatedDemand) {
      var balances = readJson(KEY.pointsBalance, defaultPointsBalance);
      var cur = balances[walletKey] || 0;
      if (cur < cost) return { ok: false, error: "积分不足", current: cur, need: cost };
      balances[walletKey] = cur - cost;
      writeJson(KEY.pointsBalance, balances);
      var consumptions = readJson(KEY.pointsConsumptions, defaultPointsConsumptions);
      var now = new Date();
      var pad = function (n) { return n < 10 ? "0" + n : n; };
      var ts = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate())
        + " " + pad(now.getHours()) + ":" + pad(now.getMinutes());
      var seq = pad(now.getHours()) + pad(now.getMinutes());
      consumptions.unshift({
        id: "C-" + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + seq,
        time: ts, walletKey: walletKey, tool: tool, cost: cost,
        callId: "AI-" + Date.now(), operator: operator || "昭岚",
        relatedDemand: relatedDemand || null
      });
      writeJson(KEY.pointsConsumptions, consumptions);
      return { ok: true, newPoints: balances[walletKey] };
    },

    // ---- 消费审核（事前审批） ----
    getSpendReviewConfig: function () { return readJson(KEY.spendReviewConfig, defaultSpendReviewConfig); },
    setSpendReviewConfig: function (v) { writeJson(KEY.spendReviewConfig, v); },
    getSpendApprovals:    function () { return readJson(KEY.spendApprovals, defaultSpendApprovals); },
    setSpendApprovals:    function (v) { writeJson(KEY.spendApprovals, v); },
    addSpendApproval:     function (p) {
      var l = readJson(KEY.spendApprovals, defaultSpendApprovals);
      l.unshift(p);
      writeJson(KEY.spendApprovals, l);
    },
    getSpendApprovalHistory: function () { return readJson(KEY.spendApprovalHistory, defaultSpendApprovalHistory); },
    setSpendApprovalHistory: function (v) { writeJson(KEY.spendApprovalHistory, v); },
    decideSpendApproval: function (id, decision, decidedBy, note) {
      // decision: 'approved' | 'rejected'
      var pending = readJson(KEY.spendApprovals, defaultSpendApprovals);
      var idx = pending.findIndex(function (x) { return x.id === id; });
      if (idx < 0) return false;
      var item = pending[idx];
      pending.splice(idx, 1);
      writeJson(KEY.spendApprovals, pending);
      var history = readJson(KEY.spendApprovalHistory, defaultSpendApprovalHistory);
      history.unshift({
        id: item.id, demandId: item.demandId, title: item.title,
        applicant: item.applicant, workspace: item.workspace, workspaceName: item.workspaceName,
        amount: item.amount, hitRules: item.hitRules,
        decision: decision, decidedBy: decidedBy || "李总（企业管理员）",
        decidedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        note: note || ""
      });
      writeJson(KEY.spendApprovalHistory, history);
      return true;
    },
    // 判定一笔下单金额是否会触发审批
    evaluateSpendReview: function (amount, walletKey, applicant) {
      var cfg = readJson(KEY.spendReviewConfig, defaultSpendReviewConfig);
      if (!cfg.enabled) return { triggered: false, hitRules: [] };
      var hits = [];
      if (cfg.singleAmountCap > 0 && amount > cfg.singleAmountCap) {
        hits.push("单笔金额超 ¥" + cfg.singleAmountCap.toLocaleString());
      }
      var wallets = readJson(KEY.wallets, defaultWallets);
      var w = wallets[walletKey];
      if (w && w.allocated && cfg.budgetPctCap > 0) {
        var pct = (amount / w.allocated) * 100;
        if (pct > cfg.budgetPctCap) {
          hits.push("占用本团队预算 " + pct.toFixed(0) + "%（超 " + cfg.budgetPctCap + "%）");
        }
      }
      // monthlyCapPerMember 真实实现需汇总该成员本月所有订单，这里 mock 留为占位规则
      return { triggered: hits.length > 0, hitRules: hits };
    },

    isProfileComplete: function () { return localStorage.getItem(KEY.profileComplete) === "1"; },
    setProfileComplete: function (v) { localStorage.setItem(KEY.profileComplete, v ? "1" : "0"); },

    requireProfile: function (action, cb) {
      if (window.demoApp.isProfileComplete()) { if (cb) cb(); return true; }
      window.demoApp._showProfileGate(action, cb);
      return false;
    },

    _showProfileGate: function (action, cb) {
      var existing = document.getElementById("profileGateOverlay");
      if (existing) existing.remove();

      var overlay = document.createElement("div");
      overlay.id = "profileGateOverlay";
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:2000;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s";
      var labels = { publish: "发布需求", quote: "提交报价", accept: "接受订单" };
      var actionLabel = labels[action] || action || "继续操作";
      overlay.innerHTML = '<div style="background:#fff;border-radius:16px;max-width:440px;width:92%;padding:28px 24px;box-shadow:0 8px 30px rgba(0,0,0,.18);text-align:center">'
        + '<div style="font-size:48px;margin-bottom:12px">📋</div>'
        + '<div style="font-size:18px;font-weight:700;margin-bottom:8px">请先完善入驻资料</div>'
        + '<div style="font-size:13px;color:#8c8c8c;line-height:1.7;margin-bottom:20px">'
        +   '您在入驻时选择了"稍后完善"，<b>' + actionLabel + '</b>前需先补充认证材料。<br>'
        +   '完善后即可正常使用平台全部功能。'
        + '</div>'
        + '<div style="display:flex;gap:10px;justify-content:center">'
        +   '<button id="pgClose" style="height:36px;border:1px solid #d9d9d9;background:#fff;border-radius:8px;padding:0 20px;font-size:13px;cursor:pointer;color:#595959">稍后再说</button>'
        +   '<button id="pgGo" style="height:36px;border:none;background:linear-gradient(135deg,#1890ff,#722ed1);border-radius:8px;padding:0 20px;font-size:13px;cursor:pointer;color:#fff;font-weight:500">📋 立即完善</button>'
        +   '<button id="pgSkip" style="height:36px;border:1px solid #52c41a;background:#f6ffed;border-radius:8px;padding:0 20px;font-size:13px;cursor:pointer;color:#389e0d">⏩ Demo 跳过</button>'
        + '</div>'
        + '</div>';
      document.body.appendChild(overlay);

      document.getElementById("pgClose").onclick = function () { overlay.remove(); };
      overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
      document.getElementById("pgGo").onclick = function () { location.href = "enterprise-onboarding.html"; };
      document.getElementById("pgSkip").onclick = function () {
        window.demoApp.setProfileComplete(true);
        overlay.remove();
        window.demoToast("✅ 已标记资料完善（Demo 快捷跳过）", "ok");
        if (cb) setTimeout(cb, 200);
      };
    },

    reset: function () {
      Object.keys(KEY).forEach(function (k) { localStorage.removeItem(KEY[k]); });
      initDemoState();
      location.reload();
    }
  };

  // ============================================================
  // 全局 demoToast
  // ============================================================
  window.demoToast = function (msg, kind) {
    kind = kind || "ok";
    var wrap = document.getElementById("toastWrap");
    if (!wrap) { console.log("[toast]", kind, msg); return; }
    var t = document.createElement("div");
    t.className = "toast " + kind;
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () {
      t.style.opacity = "0"; t.style.transform = "translateX(20px)";
      setTimeout(function () { t.remove(); }, 280);
    }, 2400);
  };

  // ============================================================
  // 数字格式化
  // ============================================================
  window.fmtMoney = function (n) {
    if (n == null || isNaN(n)) return "¥0";
    return "¥" + Number(n).toLocaleString("zh-CN", { maximumFractionDigits: 2 });
  };

  initDemoState();

  // ============================================================
  // SharedHeader：根据当前 URL 推断工作台模式（与 localStorage 同步）
  // ============================================================
  function inferTopbarIdentity() {
    var file = (window.location.pathname || "").split("/").pop() || "";
    if (file === "admin-console.html") return "admin";
    if (file.indexOf("admin-") === 0) return "ops";
    if (file === "platform-home-contractor.html" || file.indexOf("contractor-") === 0) return "contractor";
    return "demander";
  }

  // ============================================================
  // SharedHeader：渲染 + 装配顶部全局栏
  //   pages 需要预先有一个 <header class="topbar" id="topbar-shared"></header>
  //   以及 <div id="toastWrap" class="toasts"></div>
  // ============================================================
  function buildTopbarHTML(opts) {
    var identity = opts.identity != null ? opts.identity : window.demoApp.getCurrentIdentity();
    var brandHref = opts.brandHref;
    if (!brandHref) {
      if (identity === "contractor") brandHref = "platform-home-contractor.html";
      else if (identity === "admin") brandHref = "admin-console.html";
      else if (identity === "ops") brandHref = "admin-demand-review.html";
      else brandHref = "platform-home-demander.html";
    }
    var brandLabel = opts.brandLabel || "🎬 骋风天合";
    var brandSub = opts.brandSub || "创作门户交易平台";

    return ''
      + '<a href="' + brandHref + '" class="brand">' + brandLabel + '<span class="brand-sub">' + brandSub + '</span></a>'
      + '<div class="ws-switcher">'
      +   '<button type="button" class="ws-trigger" id="wsTrigger">'
      +     '<span class="ws-icon" id="wsIcon"></span>'
      +     '<span class="ws-name" id="wsName"></span>'
      +     '<span class="ws-arrow">▼</span>'
      +   '</button>'
      +   '<div class="ws-dropdown" id="wsDropdown"></div>'
      + '</div>'
      + '<div class="identity-switch" id="identitySwitch" title="进入管理 / 运营后台">'
      +   '<button type="button" data-identity="admin"' + (identity === "admin" ? ' class="active"' : '') + '>👑 管理后台</button>'
      +   '<button type="button" data-identity="ops"' + (identity === "ops" ? ' class="active"' : '') + '>🔍 运营后台</button>'
      + '</div>'
      + '<a href="finance-center-prototype/accounts.html" class="wallet-chip" id="walletChip" title="点击进入资金中心">'
      +   '<span>💰</span>'
      +   '<span><span class="wallet-amount" id="walletAmount">¥0</span> <span class="wallet-account" id="walletAccount"></span></span>'
      + '</a>'
      + '<div class="avatar-wrap">'
      +   '<div class="avatar-trigger" id="avatarTrigger">'
      +     '<img src="https://api.dicebear.com/9.x/lorelei/svg?seed=account" alt="头像">'
      +     '<span class="avatar-name">' + (opts.userName || "昭岚") + '</span>'
      +     '<span class="ws-arrow">▼</span>'
      +   '</div>'
      +   '<div class="avatar-dropdown" id="avatarDropdown">'
      +     '<a href="account-center.html"><span>⚙️</span> 账号中心</a>'
      +     '<a href="finance-center-prototype/accounts.html"><span>💰</span> 资金中心</a>'
      +     '<div class="divider"></div>'
      +     '<a href="admin-console.html"><span>👑</span> 管理后台</a>'
      +     '<a href="admin-demand-review.html"><span>🔍</span> 运营后台</a>'
      +     '<div class="divider"></div>'
      +     '<a href="#" id="logoutLink"><span>🚪</span> 退出登录</a>'
      +   '</div>'
      + '</div>';
  }

  function renderWsDropdown() {
    var dd = document.getElementById("wsDropdown");
    if (!dd) return;
    var cur = window.demoApp.getCurrentWorkspaceId();
    var groups = [
      { label: "个人", items: ["personal"] },
      { label: "骋风天合", items: ["cf-drama", "cf-marketing", "cf-ip", "cf-admin"] }
    ];
    var html = "";
    groups.forEach(function (g) {
      html += '<div class="ws-group-label">' + g.label + '</div>';
      g.items.forEach(function (id) {
        var ws = WORKSPACES[id]; if (!ws) return;
        var desc = id === "cf-admin"
          ? "成员、权限、预算与平台审核；进入管理总览"
          : ws.accountType + (ws.accountBalance != null ? "：" + window.fmtMoney(ws.accountBalance) : "");
        html += '<div class="ws-item ' + (id === cur ? "active" : "") + '" data-ws="' + id + '">'
          +    '<div class="ws-item-icon ' + ws.iconClass + '">' + ws.icon + '</div>'
          +    '<div class="ws-item-main"><div class="ws-item-name">' + ws.name + '</div><div class="ws-item-desc">' + desc + '</div></div>'
          +    '<span class="ws-item-check">' + (id === cur ? "✓" : "") + '</span>'
          +  '</div>';
      });
    });
    dd.innerHTML = html;
    Array.prototype.forEach.call(dd.querySelectorAll(".ws-item"), function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-ws");
        var prev = window.demoApp.getCurrentWorkspaceId();
        if (id === prev) { dd.classList.remove("open"); return; }
        if (id === "cf-admin") {
          window.demoApp.setCurrentWorkspace("cf-admin");
          window.demoApp.setCurrentIdentity("admin");
          dd.classList.remove("open");
          window.demoToast("进入企业管理员视角…", "info");
          setTimeout(function () { location.href = "admin-console.html"; }, 320);
          return;
        }
        window.demoApp.setCurrentWorkspace(id);
        refreshTopbar();
        renderWsDropdown();
        dd.classList.remove("open");
        window.demoToast("已切换到「" + WORKSPACES[id].name + "」，刷新中…", "info");
        setTimeout(function () { location.reload(); }, 350);
      });
    });
  }

  function refreshTopbar() {
    var ws = window.demoApp.getCurrentWorkspace();
    var $ = function (id) { return document.getElementById(id); };
    if ($("wsName"))         $("wsName").textContent = ws.name;
    if ($("wsIcon"))         $("wsIcon").textContent = ws.icon;
    if ($("walletAmount"))   $("walletAmount").textContent = window.fmtMoney(ws.accountBalance);
    if ($("walletAccount"))  $("walletAccount").textContent = ws.accountType;
  }

  function wireHeaderEvents() {
    var $ = function (id) { return document.getElementById(id); };
    var wsDropdown = $("wsDropdown");
    var wsTrigger = $("wsTrigger");
    var avatarDropdown = $("avatarDropdown");
    var avatarTrigger = $("avatarTrigger");
    var identitySwitch = $("identitySwitch");

    if (wsTrigger && wsDropdown) {
      wsTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        wsDropdown.classList.toggle("open");
        if (avatarDropdown) avatarDropdown.classList.remove("open");
      });
    }
    if (avatarTrigger && avatarDropdown) {
      avatarTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        avatarDropdown.classList.toggle("open");
        if (wsDropdown) wsDropdown.classList.remove("open");
      });
    }
    document.addEventListener("click", function () {
      if (wsDropdown) wsDropdown.classList.remove("open");
      if (avatarDropdown) avatarDropdown.classList.remove("open");
    });

    // 工作台模式切换：真路由
    if (identitySwitch) {
      Array.prototype.forEach.call(identitySwitch.querySelectorAll("button"), function (b) {
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          var next = b.getAttribute("data-identity");
          var cur = window.demoApp.getCurrentIdentity();
          if (next === cur) return;
          window.demoApp.setCurrentIdentity(next);
          if (next === "admin") {
            window.demoApp.setCurrentWorkspace("cf-admin");
            window.demoToast("正在进入管理后台…", "info");
            setTimeout(function () { location.href = "admin-console.html"; }, 350);
          } else if (next === "ops") {
            window.demoToast("正在进入平台运营后台…", "info");
            setTimeout(function () { location.href = "admin-demand-review.html"; }, 350);
          }
        });
      });
    }

    // 退出登录占位
    var logout = $("logoutLink");
    if (logout) {
      logout.addEventListener("click", function (e) {
        e.preventDefault();
        window.demoToast("演示环境，未实现退出", "warn");
      });
    }
  }

  window.SharedHeader = {
    mount: function (opts) {
      opts = opts || {};
      var identity = opts.identity != null ? opts.identity : inferTopbarIdentity();
      window.demoApp.setCurrentIdentity(identity);
      opts = Object.assign({}, opts, { identity: identity });
      var host = document.getElementById("topbar-shared");
      if (!host) {
        // 兼容旧页：找到第一个 <header class="topbar">，整体接管并替换内容
        host = document.querySelector("header.topbar");
        if (host) {
          host.id = "topbar-shared";
        } else {
          host = document.createElement("header");
          host.id = "topbar-shared";
          host.className = "topbar";
          document.body.insertBefore(host, document.body.firstChild);
        }
      }
      host.innerHTML = buildTopbarHTML(opts);
      renderWsDropdown();
      refreshTopbar();
      wireHeaderEvents();

      // 高亮侧边栏当前菜单
      if (opts.activeNav) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-nav="' + opts.activeNav + '"]'), function (el) {
          el.classList.add("active");
        });
      }
    },
    refresh: refreshTopbar
  };
})();
