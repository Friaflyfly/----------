/* ============================================================================
 * _shared.js  ——  骋风天合 demo 公共底座
 *   - 所有页面的 demoApp / demoToast / fmtMoney 单一来源
 *   - 顶部栏（空间切换 / 身份切换 / 钱包 chip / 头像下拉）SharedHeader.mount()
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
  // 工作空间 mock 配置（共享 source of truth）
  // ============================================================
  var WORKSPACES = {
    "personal": {
      id: "personal", name: "个人空间", shortName: "个人空间", type: "personal",
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
      canPublish: false, canViewMarket: true, canAllocateBudget: true,
      walletKey: "enterprise-main-cf",
      payer: { type: "enterprise-main", name: "骋风天合 - 企业主账户", balance: 1250000 }
    }
  };

  // ============================================================
  // 默认 mock 数据
  // ============================================================
  var defaultDemands = [
    { id: "DM-2026042512", title: "三集短剧解说视频（修仙题材）", category: "视频制作 / 解说视频", catId: "video", subCatId: "drama-explain", workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心", status: "quoting", quotesCount: 4, budget: 18000, createTime: "2026-04-25 15:32", deadline: "2026-05-08", payerLabel: "本团队预算账户" },
    { id: "DM-2026042214", title: "品牌宣传短片脚本", category: "文案服务 / 营销文案", catId: "copy", subCatId: "marketing-copy", workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组", status: "matching", quotesCount: 0, budget: 5000, createTime: "2026-04-22 09:14", deadline: "2026-05-02", payerLabel: "本团队预算账户" },
    { id: "DM-2026042103", title: "新剧 IP 海报系列", category: "图片设计 / 海报设计", catId: "image", subCatId: "poster", workspace: "cf-drama", workspaceName: "骋风天合 · 短剧制作中心", status: "in-progress", quotesCount: 5, budget: 28000, contractor: "星辰创作工作室", createTime: "2026-04-21 11:00", deadline: "2026-04-30", payerLabel: "本团队预算账户" },
    { id: "DM-2026041807", title: "广告片配音", category: "内容创作 / 配音", catId: "content", subCatId: "voice", workspace: "cf-marketing", workspaceName: "骋风天合 · 市场宣传组", status: "completed", quotesCount: 3, budget: 8000, contractor: "声海传媒", createTime: "2026-04-18 16:20", deadline: "2026-04-25", payerLabel: "本团队预算账户" },
    { id: "DM-2026041602", title: "新剧广电备案许可证办理", category: "资质服务 / 广播电视节目制作许可证", catId: "license", subCatId: "broadcast", workspace: "cf-ip", workspaceName: "骋风天合 · IP 孵化组", status: "auditing", quotesCount: 0, budget: 12000, createTime: "2026-04-16 10:05", deadline: "2026-05-15", payerLabel: "回退至企业主账户" },
    { id: "DM-2026041501", title: "个人公众号头图设计", category: "图片设计 / 封面 / 缩略图", catId: "image", subCatId: "cover", workspace: "personal", workspaceName: "个人空间", status: "completed", quotesCount: 2, budget: 800, contractor: "色彩工坊", createTime: "2026-04-15 22:13", deadline: "2026-04-20", payerLabel: "个人账户" }
  ];

  var defaultOrders = [
    { id: "OD-2026042307", demandId: "DM-2026042103", projectName: "新剧 IP 海报系列", contractor: "星辰创作工作室", contractorId: "starlight", workspace: "cf-drama", payerType: "team-budget", payerName: "短剧制作中心 - 团队预算账户", payerWalletKey: "team-budget-cf-drama", amount: 28000, status: "review-v3", createTime: "2026-04-23 10:00" },
    { id: "OD-2026042009", demandId: "DM-2026041807", projectName: "广告片配音", contractor: "声海传媒", contractorId: "soundsea", workspace: "cf-marketing", payerType: "team-budget", payerName: "市场宣传组 - 团队预算账户", payerWalletKey: "team-budget-cf-marketing", amount: 8000, status: "completed", createTime: "2026-04-20 14:30" }
  ];

  var defaultWallets = {
    "personal-account-lixueqin": { type: "personal", name: "昭岚 - 个人账户", balance: 3200, lockedAmount: 0 },
    "team-budget-cf-drama":      { type: "team-budget", name: "短剧制作中心 - 团队预算账户", balance: 185000, lockedAmount: 28000, allocated: 200000 },
    "team-budget-cf-marketing":  { type: "team-budget", name: "市场宣传组 - 团队预算账户", balance: 62000, lockedAmount: 8000, allocated: 70000 },
    "enterprise-main-cf":        { type: "enterprise-main", name: "骋风天合 - 企业主账户", balance: 1250000, lockedAmount: 0 }
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
    profileComplete: "demoProfileComplete"
  };

  // 默认资金流水（钱包页 / 项目空间结算分账演示用）
  var defaultFlows = [
    { id: "F-001", time: "2026-04-26 17:32", type: "recharge", desc: "对公转账充值（待财务审核）", account: "enterprise-main-cf", amount: 0, lockedNote: "审核中 ¥200,000", operator: "周总（企业管理员）" },
    { id: "F-002", time: "2026-04-25 15:48", type: "lock", desc: "下单锁定 - DM-2026042512「三集短剧解说视频」", account: "team-budget-cf-drama", amount: -18000, operator: "昭岚" },
    { id: "F-003", time: "2026-04-25 11:08", type: "settle", desc: "订单分账 - OD-2026041807「广告片配音」承制方入账", account: "team-budget-cf-marketing", amount: 0, operator: "系统" },
    { id: "F-004", time: "2026-04-25 11:08", type: "settle", desc: "订单分账 - 平台服务费 5%", account: "enterprise-main-cf", amount: -400, operator: "系统" },
    { id: "F-005", time: "2026-04-24 16:30", type: "refund", desc: "部分退款 - DM-2026031908「电商主图」交付不达标", account: "team-budget-cf-marketing", amount: 1500, operator: "陈默" },
    { id: "F-006", time: "2026-04-24 14:20", type: "allocate", desc: "企业管理员划拨预算 → 短剧制作中心", account: "team-budget-cf-drama", amount: 50000, operator: "周总（企业管理员）" },
    { id: "F-007", time: "2026-04-24 14:20", type: "allocate", desc: "从企业主账户划拨至 短剧制作中心", account: "enterprise-main-cf", amount: -50000, operator: "周总（企业管理员）" },
    { id: "F-008", time: "2026-04-23 10:00", type: "lock", desc: "下单锁定 - OD-2026042307「新剧 IP 海报系列」", account: "team-budget-cf-drama", amount: -28000, operator: "昭岚" },
    { id: "F-009", time: "2026-04-22 18:20", type: "withdraw", desc: "提现申请 - 个人账户至建行 8826（已打款）", account: "personal-account-lixueqin", amount: -800, operator: "昭岚" },
    { id: "F-010", time: "2026-04-22 09:30", type: "lock", desc: "下单锁定 - OD-2026042009「广告片配音」", account: "team-budget-cf-marketing", amount: -8000, operator: "陈默" },
    { id: "F-011", time: "2026-04-20 16:40", type: "settle", desc: "订单结算入账 - OD-2026042009「广告片配音」验收完成", account: "team-budget-cf-marketing", amount: -8000, operator: "系统" },
    { id: "F-012", time: "2026-04-19 15:00", type: "invoice", desc: "开具增值税专票 - OD-2026031502「品牌片拍摄」¥120,000", account: "enterprise-main-cf", amount: 0, operator: "周总（企业管理员）" },
    { id: "F-013", time: "2026-04-18 09:15", type: "recharge", desc: "对公转账充值（财务审核通过）", account: "enterprise-main-cf", amount: 500000, operator: "周总（企业管理员）" },
    { id: "F-014", time: "2026-04-16 14:50", type: "settle", desc: "订单结算 - OD-2026031502「品牌片拍摄」", account: "team-budget-cf-marketing", amount: -120000, operator: "系统" },
    { id: "F-015", time: "2026-04-15 22:25", type: "recharge", desc: "支付宝充值", account: "personal-account-lixueqin", amount: 1000, operator: "昭岚" },
    { id: "F-016", time: "2026-04-14 10:30", type: "lock", desc: "下单锁定 - OD-2026041401「IP 形象设计」", account: "team-budget-cf-drama", amount: -15000, operator: "昭岚" },
    { id: "F-017", time: "2026-04-12 17:42", type: "settle", desc: "订单结算 - OD-2026041401「IP 形象设计」", account: "team-budget-cf-drama", amount: -15000, operator: "系统" },
    { id: "F-018", time: "2026-04-08 11:20", type: "allocate", desc: "企业管理员划拨预算 → 市场宣传组（季度初配置）", account: "team-budget-cf-marketing", amount: 70000, operator: "周总（企业管理员）" },
    { id: "F-019", time: "2026-04-08 11:20", type: "allocate", desc: "从企业主账户划拨至 市场宣传组（季度初）", account: "enterprise-main-cf", amount: -70000, operator: "周总（企业管理员）" },
    { id: "F-020", time: "2026-04-08 11:18", type: "allocate", desc: "企业管理员划拨预算 → 短剧制作中心（季度初配置）", account: "team-budget-cf-drama", amount: 150000, operator: "周总（企业管理员）" },
    { id: "F-021", time: "2026-04-08 11:18", type: "allocate", desc: "从企业主账户划拨至 短剧制作中心（季度初）", account: "enterprise-main-cf", amount: -150000, operator: "周总（企业管理员）" },
    { id: "F-022", time: "2026-04-05 10:00", type: "recharge", desc: "对公转账充值 - 季度预算补充", account: "enterprise-main-cf", amount: 1250000, operator: "周总（企业管理员）" }
  ];

  function readJson(k, fallback) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch (_) { return fallback; }
  }
  function writeJson(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {}
  }

  function initDemoState() {
    if (!localStorage.getItem(KEY.ws))       localStorage.setItem(KEY.ws, "cf-drama");
    if (!localStorage.getItem(KEY.identity)) localStorage.setItem(KEY.identity, "demander");
    if (!localStorage.getItem(KEY.demands))  writeJson(KEY.demands,  defaultDemands);
    if (!localStorage.getItem(KEY.orders))   writeJson(KEY.orders,   defaultOrders);
    if (!localStorage.getItem(KEY.wallets))  writeJson(KEY.wallets,  defaultWallets);
    if (!localStorage.getItem(KEY.flows))    writeJson(KEY.flows,    defaultFlows);
    if (!localStorage.getItem(KEY.contractorProfile)) writeJson(KEY.contractorProfile, defaultContractorProfile);
    if (!localStorage.getItem(KEY.contractorInbox))   writeJson(KEY.contractorInbox,   defaultContractorInbox);
    if (!localStorage.getItem(KEY.members))  writeJson(KEY.members,  defaultMembers);
    if (!localStorage.getItem(KEY.roles))    writeJson(KEY.roles,    defaultRoles);
    if (!localStorage.getItem(KEY.profileComplete)) localStorage.setItem(KEY.profileComplete, "1");
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
    setWallets: function (v) { writeJson(KEY.wallets, v); },
    lockBudget: function (walletKey, amount) {
      var w = readJson(KEY.wallets, defaultWallets);
      if (!w[walletKey]) return false;
      if (w[walletKey].balance < amount) return false;
      w[walletKey].balance -= amount;
      w[walletKey].lockedAmount = (w[walletKey].lockedAmount || 0) + amount;
      writeJson(KEY.wallets, w);
      return true;
    },

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
  // SharedHeader：渲染 + 装配顶部全局栏
  //   pages 需要预先有一个 <header class="topbar" id="topbar-shared"></header>
  //   以及 <div id="toastWrap" class="toasts"></div>
  // ============================================================
  function buildTopbarHTML(opts) {
    var identity = opts.identity || window.demoApp.getCurrentIdentity();
    var brandHref = opts.brandHref || (identity === "contractor" ? "platform-home-contractor.html" : "platform-home-demander.html");
    var brandLabel = opts.brandLabel || "🎬 骋风天合";
    var brandSub = opts.brandSub || "创作门户交易平台";

    return ''
      + '<a href="' + brandHref + '" class="brand">' + brandLabel + '<span class="brand-sub">' + brandSub + '</span></a>'
      + '<div class="ws-switcher">'
      +   '<button class="ws-trigger" id="wsTrigger">'
      +     '<span class="ws-icon" id="wsIcon"></span>'
      +     '<span class="ws-name" id="wsName"></span>'
      +     '<span class="ws-arrow">▼</span>'
      +   '</button>'
      +   '<div class="ws-dropdown" id="wsDropdown"></div>'
      + '</div>'
      + '<div class="identity-switch" id="identitySwitch" title="切换身份">'
      +   '<button data-identity="demander"' + (identity === "demander" ? ' class="active"' : '') + '>📥 需求方</button>'
      +   '<button data-identity="contractor"' + (identity === "contractor" ? ' class="active"' : '') + '>🛠 承制方</button>'
      + '</div>'
      + '<a href="wallet-overview.html" class="wallet-chip" id="walletChip" title="点击进入钱包">'
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
      +     '<a href="account-basic-info-prototype-platform-style.html"><span>👤</span> 账户基础信息</a>'
      +     '<a href="enterprise-verification-prototype.html"><span>🏢</span> 企业认证</a>'
      +     '<a href="account-security-prototype.html"><span>🔐</span> 账号安全</a>'
      +     '<a href="wallet-overview.html"><span>💰</span> 我的钱包</a>'
      +     '<div class="divider"></div>'
      +     '<a href="admin-console.html"><span>👑</span> 切换到管理员后台</a>'
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
        var desc = ws.accountType + (ws.accountBalance != null ? "：" + window.fmtMoney(ws.accountBalance) : "");
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

    // 身份切换：真路由（不是 toast 假切换）
    if (identitySwitch) {
      Array.prototype.forEach.call(identitySwitch.querySelectorAll("button"), function (b) {
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          var next = b.getAttribute("data-identity");
          var cur = window.demoApp.getCurrentIdentity();
          if (next === cur) return;
          window.demoApp.setCurrentIdentity(next);
          if (next === "contractor") {
            window.demoToast("已切换为承制方，正在跳转...", "info");
            setTimeout(function () { location.href = "platform-home-contractor.html"; }, 400);
          } else {
            window.demoToast("已切换为需求方，正在跳转...", "info");
            setTimeout(function () { location.href = "platform-home-demander.html"; }, 400);
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
