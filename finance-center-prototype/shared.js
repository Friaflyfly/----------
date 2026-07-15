(function () {
  "use strict";

  const PAGES = {
    index: {
      title: "原型总览",
      desc: "这是一套独立于现有站点导航的资金中心原型目录。先拆成多页面，再逐页深化到可评审状态。",
      actions: [
        { label: "进入资金首页", href: "overview.html", tone: "primary" },
        { label: "查看深化计划", href: "PAGE-ENRICHMENT-PLAN.md", tone: "" }
      ],
      section: "landing"
    },
    overview: {
      title: "资金首页",
      desc: "聚焦团队预算、当月节奏、待处理事项和最近交易。",
      actions: [
        { label: "去充值", href: "recharge.html", tone: "primary" },
        { label: "查看账单", href: "bills.html", tone: "secondary" },
        { label: "查看流水", href: "transactions.html", tone: "" }
      ],
      section: "front"
    },
    accounts: {
      title: "账户总览",
      desc: "按账户看资金归属与结构。",
      actions: [
        { label: "充值", modal: "action", tone: "primary" },
        { label: "提现", href: "withdraw.html", tone: "" },
        { label: "查看账单", href: "bills.html", tone: "" },
        { label: "充值记录", href: "recharge.html", tone: "" },
        { label: "提现记录", href: "withdraw.html", tone: "" },
        { label: "账户设置", href: "security.html", tone: "" },
        { label: "发票中心", href: "invoices.html", tone: "" }
      ],
      section: "front"
    },
    transactions: {
      title: "交易流水",
      desc: "记录平台内发生的一笔交易事件，关注交易是否发生、关联了哪个业务单、付款方和收款方是谁。",
      actions: [],
      section: "front"
    },
    fundFlows: {
      title: "资金流水",
      desc: "记录账户某个资金科目的真实余额变化，关注变动前后余额与关联交易流水。",
      actions: [],
      section: "front"
    },
    bills: {
      title: "账单明细",
      desc: "面向用户展示资金变动结果，强调用户能否看懂这笔钱为什么变化、能否查看详情和联系客服。",
      actions: [],
      section: "front"
    },
    points: {
      title: "积分中心",
      desc: "管理积分余额、余额兑换积分、充值并兑换积分，以及 AIGC token 消费记录。",
      actions: [
        { label: "兑换积分", modal: "pointsExchange", tone: "primary" },
        { label: "充值并兑换", modal: "pointsRechargeExchange", tone: "" }
      ],
      section: "front"
    },
    invoices: {
      title: "发票中心",
      desc: "可开票订单、申请记录、已开具发票与抬头信息集中处理。",
      actions: [],
      section: "front"
    },
    recharge: {
      title: "充值中心",
      desc: "向当前钱包账户发起在线充值，并跟踪最近充值到账结果。",
      actions: [
        { label: "立即充值", tone: "primary", modal: "action" }
      ],
      section: "front"
    },
    withdraw: {
      title: "提现管理",
      desc: "仅面向个人收益账户，展示可提现余额与申请记录。",
      actions: [
        { label: "提交提现", tone: "primary", modalType: "withdraw", modalValue: "action" }
      ],
      section: "front"
    },
    security: {
      title: "账户设置",
      desc: "支付工具、支付密码、限额与二次校验。",
      actions: [
        { label: "新增银行卡", href: "#", tone: "primary" },
        { label: "修改支付密码", href: "#", tone: "" }
      ],
      section: "front"
    },
    orderDetail: {
      title: "订单资金详情",
      desc: "订单视角查看金额、付款主体、锁资轨迹、结算与发票。",
      actions: [
        { label: "查看关联流水", href: "transactions.html", tone: "primary" },
        { label: "返回总览", href: "overview.html", tone: "" }
      ],
      section: "order"
    },
    adminOverview: {
      title: "财务总览",
      desc: "企业总池、预算分配、待审核事项与当月支出趋势。",
      actions: [
        { label: "导出企业报表", href: "#", tone: "primary" },
        { label: "查看异常事件", href: "#", tone: "" }
      ],
      section: "admin"
    },
    adminBudget: {
      title: "预算管理",
      desc: "查看各团队预算分配、使用率、冻结额和追加动作。",
      actions: [
        { label: "新增划拨", href: "#", tone: "primary" },
        { label: "回收预算", href: "#", tone: "" }
      ],
      section: "admin"
    },
    adminAudit: {
      title: "审核中心",
      desc: "集中承接对公充值审核与提现打款审核。",
      actions: [
        { label: "批量通过", href: "#", tone: "primary" },
        { label: "导出待审列表", href: "#", tone: "" }
      ],
      section: "admin"
    },
    adminSettlement: {
      title: "结算与发票",
      desc: "查看待结算订单、平台服务费、待开发票与已回传票据。",
      actions: [
        { label: "执行结算", href: "#", tone: "primary" },
        { label: "开票处理", href: "#", tone: "" }
      ],
      section: "admin"
    },
    adminReconciliation: {
      title: "每日对账",
      desc: "按日查看天合与汇付的对账结果，快速识别存在差异或执行失败的批次。",
      actions: [
        { label: "查看差异明细", href: "admin-reconciliation-differences.html", tone: "primary" },
        { label: "导出当日汇总", href: "#", tone: "" }
      ],
      section: "admin"
    },
    adminReconciliationDiffs: {
      title: "差异明细",
      desc: "跨日期集中查看并处理支付、退款、分账、提现差异，适合财务日常跟进。",
      actions: [
        { label: "返回每日对账", href: "admin-reconciliation.html", tone: "primary" },
        { label: "导出差异数据", href: "#", tone: "" }
      ],
      section: "admin"
    },
    adminReconciliationDetail: {
      title: "对账批次详情",
      desc: "查看批次汇总、各业务明细、差异处理进度和单笔交易双方数据。",
      actions: [],
      section: "admin"
    }
  };

  const NAV = {
    finance: [
      { title: "资金首页", items: [
        ["overview", "资金首页", "◎"]
      ] },
      { title: "账户与余额", items: [
        ["accounts", "账户总览", "◌"],
        ["recharge", "充值中心", "＋"],
        ["withdraw", "提现管理", "－"]
      ] },
      { title: "明细与流水", items: [
        ["bills", "账单明细", "◫"],
        ["transactions", "交易流水", "↹"],
        ["fundFlows", "资金流水", "≋"]
      ] },
      { title: "积分与发票", items: [
        ["points", "积分中心", "◒"],
        ["invoices", "发票中心", "▣"]
      ] },
      { title: "设置", items: [
        ["security", "账户设置", "⌘"]
      ] }
    ],
    order: [
      ["orderDetail", "订单资金详情", "≣"]
    ],
    admin: [
      { title: "财务后台", items: [
        ["adminOverview", "财务总览", "◍"],
        ["adminBudget", "预算管理", "▤"],
        ["adminAudit", "审核中心", "▥"],
        ["adminSettlement", "结算与发票", "▦"]
      ] },
      { title: "对账管理", items: [
        ["adminReconciliation", "每日对账", "◫"],
        ["adminReconciliationDiffs", "差异明细", "≠"]
      ] }
    ]
  };

  const COLUMN_CONFIGS = {
    transactions: {
      title: "定制列",
      groups: [
        { name: "基础信息", columns: [
          ["flowNo", "交易流水号", true],
          ["type", "流水类型", true],
          ["direction", "交易方向", true],
          ["bizNo", "关联业务单号", true],
          ["bizName", "业务名称", true],
          ["time", "发生时间", true]
        ]},
        { name: "交易双方", columns: [
          ["from", "付款方", true],
          ["to", "收款方", true],
          ["payMethod", "支付方式", false],
          ["channel", "支付渠道", false]
        ]},
        { name: "状态与金额", columns: [
          ["amount", "交易金额", true],
          ["tradeStatus", "交易状态", true],
          ["fundStatus", "资金处理状态", true],
          ["operator", "操作人", false],
          ["source", "操作来源", false]
        ]}
      ]
    },
    fundFlows: {
      title: "定制列",
      groups: [
        { name: "基础信息", columns: [
          ["fundFlowNo", "资金流水号", true],
          ["owner", "账户主体", true],
          ["accountType", "账户类型", true],
          ["subject", "资金科目", true]
        ]},
        { name: "变动信息", columns: [
          ["changeType", "变动类型", true],
          ["changeDirection", "变动方向", true],
          ["changeAmount", "变动金额", true],
          ["beforeBalance", "变动前余额", true],
          ["afterBalance", "变动后余额", true]
        ]},
        { name: "关联信息", columns: [
          ["bizNo", "关联业务单号", true],
          ["tradeFlowNo", "关联交易流水号", true],
          ["status", "流水状态", true],
          ["time", "发生时间", true]
        ]}
      ]
    },
    bills: {
      title: "定制列",
      groups: [
        { name: "账单信息", columns: [
          ["time", "发生时间", true],
          ["title", "账单标题", true],
          ["type", "账单类型", true],
          ["relatedBiz", "关联业务", true]
        ]},
        { name: "收支信息", columns: [
          ["direction", "收支方向", true],
          ["amount", "展示金额", true],
          ["status", "账单状态", true]
        ]},
        { name: "操作信息", columns: [
          ["actions", "操作", true]
        ]}
      ]
    },
    points: {
      title: "定制列",
      groups: [
        { name: "积分信息", columns: [
          ["pointNo", "积分流水号", true],
          ["type", "积分动作", true],
          ["direction", "变动方向", true],
          ["points", "积分变动", true]
        ]},
        { name: "业务信息", columns: [
          ["cash", "关联金额", true],
          ["token", "关联 token", true],
          ["bizNo", "关联业务单号", true],
          ["status", "状态", true],
          ["time", "发生时间", true]
        ]}
      ]
    }
  };

  const columnState = Object.fromEntries(
    Object.entries(COLUMN_CONFIGS).map(([page, config]) => [
      page,
      Object.fromEntries(config.groups.flatMap(group => group.columns.map(column => [column[0], column[2]])))
    ])
  );

  const TEAM_DATA = {
    drama: {
      name: "短剧制作中心",
      accountLabel: "团队预算账户",
      status: "团队预算正常",
      monthlyBurn: 156240,
      overview: {
        title: "短剧制作中心 - 团队预算账户",
        available: 2140064,
        frozen: 186200,
        pending: 48200,
        invoiceReady: 79195,
        caption: "当前团队预算充足，5 月集中支出来自 3 个在制项目与 1 笔争议冻结。",
        metrics: [
          { label: "本月支出", value: "¥ 168,240", foot: "较上月 +12.8%" },
          { label: "本月已结算", value: "¥ 92,510", foot: "7 笔" },
          { label: "待开票金额", value: "¥ 79,195", foot: "3 笔订单" },
          { label: "异常冻结", value: "¥ 12,000", foot: "1 笔争议" }
        ],
        trendLabels: ["01", "02", "03", "04", "05", "06"],
        trendIn: [42000, 36000, 58000, 18000, 42000, 30000],
        trendOut: [98000, 102000, 88000, 132880, 168240, 74100],
        composition: [
          { name: "短视频制作", values: [62, 22, 10, 6], meta: "制作 62%" },
          { name: "海报与视觉", values: [48, 28, 14, 10], meta: "视觉 48%" },
          { name: "配音与后期", values: [35, 40, 12, 13], meta: "后期 35%" }
        ],
        pending: [
          { kind: "warn", title: "4 笔锁资超过 7 天", meta: "涉及 OD-2026052607、OD-2026051902、OD-2026051809、OD-2026051702。", action: "查看订单" },
          { kind: "danger", title: "Q2 剩余预算低于安全阈值", meta: "若 6 月维持当前消耗节奏，系统将自动通知团队负责人。", action: "申请追加" },
          { kind: "ok", title: "3 笔订单进入可开票池", meta: "合计 ¥79,195，可批量申请专票。", action: "去开票" }
        ],
        recent: [
          ["2026-05-26 18:14", "订单锁资", "三集短剧解说视频", "-¥ 48,000", "锁资中", "OD-2026052607"],
          ["2026-05-25 15:08", "预算划拨", "企业总池追加预算", "+¥ 200,000", "已到账", "AL-2026052502"],
          ["2026-05-24 11:41", "订单结算", "IP 海报系列", "-¥ 28,000", "已结算", "OD-2026051809"],
          ["2026-05-21 16:00", "退款回补", "海报重制争议", "+¥ 6,000", "处理中", "RF-2026052103"]
        ]
      },
      accounts: [
        { name: "短剧制作中心 - 团队预算账户", badge: "当前团队主账户", amount: "¥ 2,140,064", sub: "业务消费、锁资、退款回补", current: true, stats: [["可用余额", "¥ 2,140,064"], ["冻结金额", "¥ 186,200"], ["本月已用", "¥ 168,240"], ["待入账", "¥ 48,200"]] },
        { name: "昭岚 - 个人收益账户", badge: "个人收益账户", amount: "¥ 29,800", sub: "结算收入与提现", current: false, stats: [["可提现", "¥ 21,000"], ["审核中提现", "¥ 8,000"], ["本月收入", "¥ 17,800"], ["结算单数", "4 笔"]] },
        { name: "骋风天合 - 企业总池", badge: "企业总池", amount: "¥ 12,500,000", sub: "预算来源与统一补给", current: false, stats: [["已分配预算", "¥ 4,560,000"], ["待审核充值", "¥ 300,000"], ["团队数", "6 个"], ["本月划拨", "¥ 850,000"]] }
      ],
      accountStructure: [
        { name: "可用余额", values: [68, 18, 9, 5], meta: "可用 / 锁资 / 待入账 / 争议冻结" },
        { name: "预算来源", values: [72, 14, 14, 0], meta: "企业划拨 / 在线充值 / 回补" },
        { name: "支出构成", values: [62, 18, 11, 9], meta: "制作 / 视觉 / 后期 / 服务费" }
      ],
      transactions: {
        totals: [["收入与回补", "¥ 206,000"], ["支出与结算", "¥ 88,000"], ["锁资中", "¥ 48,000"]],
        rows: [
          ["2026-05-26 18:14", "锁资", "短剧制作中心 - 团队预算账户", "平台锁资池", "锁资中", "-¥ 48,000", "OD-2026052607", "voucher_8012"],
          ["2026-05-25 15:08", "预算划拨", "企业总池", "短剧制作中心 - 团队预算账户", "已到账", "+¥ 200,000", "AL-2026052502", "voucher_7998"],
          ["2026-05-24 11:41", "结算", "短剧制作中心 - 团队预算账户", "星辰创作工作室", "已结算", "-¥ 28,000", "OD-2026051809", "voucher_7984"],
          ["2026-05-21 16:00", "退款", "平台退款池", "短剧制作中心 - 团队预算账户", "处理中", "+¥ 6,000", "RF-2026052103", "voucher_7941"],
          ["2026-05-20 09:33", "锁资", "短剧制作中心 - 团队预算账户", "平台锁资池", "已解冻", "-¥ 12,000", "OD-2026051702", "voucher_7927"],
          ["2026-05-18 09:32", "充值", "招商银行尾号 2048", "短剧制作中心 - 团队预算账户", "已到账", "+¥ 50,000", "RC-2026051801", "voucher_7886"],
          ["2026-05-18 09:36", "积分兑换", "短剧制作中心 - 团队预算账户", "平台积分账户", "已完成", "-¥ 2,000", "PT-2026051801", "voucher_7887"],
          ["2026-05-17 14:26", "提现", "昭岚 - 个人收益账户", "中国建设银行 8826", "已到账", "-¥ 8,000", "WD-2026051701", "voucher_7872"]
        ],
        selected: {
          title: "voucher_8012",
          type: "锁资",
          time: "2026-05-26 18:14",
          accountOut: "短剧制作中心 - 团队预算账户",
          accountIn: "平台锁资池",
          amount: "-¥ 48,000",
          order: "OD-2026052607 / 三集短剧解说视频",
          operator: "昭岚",
          stateFlow: ["创建锁资单", "余额校验通过", "冻结团队预算", "等待履约推进"]
        }
      },
      bills: {
        summary: [["本月支出", "¥ 168,240"], ["退款回补", "¥ 12,000"], ["平台服务费", "¥ 11,840"], ["本月净支出", "¥ 156,240"]],
        trendLabels: ["2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
        trendValues: [88000, 92000, 76000, 98000, 132880, 168240],
        segments: [
          { name: "短视频制作", values: [62, 22, 10, 6], meta: "主支出" },
          { name: "海报与视觉", values: [48, 28, 14, 10], meta: "设计费用" },
          { name: "配音与后期", values: [35, 40, 12, 13], meta: "后期处理" }
        ],
        monthly: [
          ["2026-05", "¥ 42,000", "¥ 168,240", "¥ 12,000", "¥ 11,840", "¥ -126,240", "¥ 79,195"],
          ["2026-04", "¥ 18,000", "¥ 132,880", "¥ 0", "¥ 9,420", "¥ -124,300", "¥ 58,000"],
          ["2026-03", "¥ 0", "¥ 98,000", "¥ 15,500", "¥ 7,100", "¥ -89,600", "¥ 44,200"]
        ]
      },
      invoices: {
        summary: [["可开票金额", "¥ 79,195"], ["已申请开票", "¥ 26,800"], ["已开票金额", "¥ 112,000"], ["待补资料", "2 笔"]],
        orderList: [
          ["OD-2026051809", "IP 海报系列", "2026-05-24", "¥ 28,000", "骋风天合（北京）文化传媒有限公司"],
          ["OD-2026051105", "角色海报重绘", "2026-05-19", "¥ 16,300", "骋风天合（北京）文化传媒有限公司"],
          ["OD-2026050203", "预告片后期包装", "2026-05-12", "¥ 34,895", "骋风天合（北京）文化传媒有限公司"]
        ],
        records: [
          ["2026-05-24 16:32", "INV-2026052402", "专票", "¥ 26,800", "审核中", "OD-2026051105 / OD-2026050203"],
          ["2026-05-10 11:08", "INV-2026051001", "普票", "¥ 18,400", "已开具", "OD-2026042604"]
        ],
        issued: [
          ["051002600412", "骋风天合（北京）文化传媒有限公司", "专票", "¥ 18,400", "2026-05-12", "电子票已回传"],
          ["051002600301", "骋风天合（北京）文化传媒有限公司", "普票", "¥ 12,000", "2026-04-16", "纸票已寄出"]
        ],
        titles: [
          ["骋风天合（北京）文化传媒有限公司", "91110108MA01XXXXXX", "专票默认抬头"],
          ["骋风天合数字内容中心", "91110108MA01YYYYYY", "普票备用抬头"]
        ]
      },
      recharge: {
        accountInfo: {
          workspace: "短剧制作中心",
          subjectType: "团队",
          subjectName: "短剧制作中心",
          walletId: "WAL-TEAM-10021",
          available: "¥ 2,140,064",
          frozen: "¥ 186,200",
          pendingSettlement: "¥ 48,200",
          currency: "CNY",
          updatedAt: "2026-05-29 10:20"
        },
        operation: {
          amount: "50,000",
          quickAmounts: ["10,000", "50,000", "100,000", "300,000"],
          payMethods: ["在线支付", "对公转账"],
          payChannels: ["支付宝", "微信"],
          targetAccount: "短剧制作中心 - 团队预算账户",
          note: "用于 5 月下旬锁资补充"
        },
        result: {
          status: "支付成功",
          amount: "¥ 50,000",
          rechargeNo: "RC-2026052901",
          transactionNo: "TX-2026052901",
          externalNo: "ALI2026052900008812",
          payMethod: "在线支付",
          payChannel: "支付宝官方直连",
          targetAccount: "短剧制作中心 - 团队预算账户",
          createdAt: "2026-05-29 10:12",
          paidAt: "2026-05-29 10:14",
          creditedAt: "2026-05-29 10:14",
          failureReason: "-"
        },
        records: [
          ["RC-2026052901", "2026-05-29 10:12", "¥ 50,000", "在线支付", "支付宝官方直连", "已到账", "短剧制作中心 - 团队预算账户"],
          ["RC-2026052502", "2026-05-25 15:08", "¥ 200,000", "企业总池划拨", "企业总池", "已到账", "短剧制作中心 - 团队预算账户"],
          ["RC-2026051201", "2026-05-12 09:32", "¥ 300,000", "对公转账", "银行转账", "审核中", "短剧制作中心 - 团队预算账户"],
          ["RC-2026050301", "2026-05-03 20:05", "¥ 50,000", "在线支付", "微信支付", "已到账", "短剧制作中心 - 团队预算账户"]
        ],
        notes: [
          "充值金额将进入当前工作空间钱包账户。",
          "余额可用于发布需求、订单支付、预算冻结等场景。",
          "在线支付成功后自动到账。",
          "对公转账需要平台确认后到账。",
          "已冻结、已消费、已结算金额不可直接退款。",
          "支付成功但余额未到账时，请联系客服并提供充值单号。"
        ]
      },
      withdraw: {
        available: "¥ 21,000",
        account: "昭岚 - 个人收益账户",
        summary: [["累计收益", "¥ 29,800"], ["已提现", "¥ 8,800"], ["处理中", "¥ 8,000"], ["本次可提", "¥ 21,000"]],
        records: [
          ["2026-05-21 14:02", "WD-2026052101", "¥ 8,000", "审核中", "中国建设银行 8826"],
          ["2026-05-08 10:20", "WD-2026050802", "¥ 6,000", "已到账", "招商银行 2091"],
          ["2026-04-27 18:44", "WD-2026042701", "¥ 4,500", "已驳回", "中国建设银行 8826"]
        ]
      },
      security: [
        ["支付方式", "已绑定 2 张银行卡与 1 个企业对公账户。", "已配置"],
        ["支付密码", "最近修改 2026-04-21。", "已开启"],
        ["支付限额", "单笔支付上限 ¥200,000。", "运行中"],
        ["二次校验", "大额与异常设备会触发短信校验。", "已开启"]
      ],
      orderDetail: {
        orderNo: "OD-2026052607",
        title: "三集短剧解说视频（修仙题材）",
        amount: "¥ 48,000",
        payer: "短剧制作中心 - 团队预算账户",
        contractor: "星辰创作工作室",
        status: "锁资中",
        summary: [["订单金额", "¥ 48,000"], ["已锁资", "¥ 48,000"], ["已结算", "¥ 0"], ["可开票", "¥ 0"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-26 18:10", meta: "订单创建成功，付款主体已锁定到短剧制作中心。" },
          { state: "done", title: "发起锁资", time: "2026-05-26 18:14", meta: "冻结团队预算 ¥48,000，生成 voucher_8012。" },
          { state: "warn", title: "等待履约推进", time: "进行中", meta: "当前处于创作阶段，尚未进入验收与结算。" },
          { state: "", title: "验收后结算", time: "待发生", meta: "结算后将进入承制方收益账户，并产生可开票金额。" }
        ],
        vouchers: [
          ["voucher_8012", "锁资", "-¥ 48,000", "2026-05-26 18:14", "已生效"],
          ["voucher_8013", "服务费预估", "¥ 2,880", "2026-05-26 18:14", "待结算"]
        ]
      }
    },
    marketing: {
      name: "市场宣传组",
      accountLabel: "团队预算账户",
      status: "待补预算",
      monthlyBurn: 76210,
      overview: {
        title: "市场宣传组 - 团队预算账户",
        available: 624300,
        frozen: 82000,
        pending: 16000,
        invoiceReady: 31880,
        caption: "5 月营销支出更加碎片化，以多笔小额锁资和快速结算为主。",
        metrics: [
          { label: "本月支出", value: "¥ 84,210", foot: "较上月 +6.3%" },
          { label: "本月已结算", value: "¥ 71,600", foot: "9 笔" },
          { label: "待开票金额", value: "¥ 31,880", foot: "2 笔订单" },
          { label: "异常冻结", value: "¥ 0", foot: "无争议冻结" }
        ],
        trendLabels: ["01", "02", "03", "04", "05", "06"],
        trendIn: [8000, 12000, 0, 0, 6000, 4000],
        trendOut: [62000, 70000, 64300, 76330, 84210, 31000],
        composition: [
          { name: "短视频投放", values: [58, 22, 11, 9], meta: "投放 58%" },
          { name: "视觉物料", values: [46, 34, 10, 10], meta: "物料 46%" },
          { name: "传播文案", values: [29, 51, 8, 12], meta: "文案 29%" }
        ],
        pending: [
          { kind: "warn", title: "可用余额接近安全阈值", meta: "若下周继续上线 2 个视频包，预计需追加预算 ¥80,000。", action: "去充值" },
          { kind: "ok", title: "2 笔订单进入可开票池", meta: "合计 ¥31,880，可在月末合并开票。", action: "去开票" }
        ],
        recent: [
          ["2026-05-26 09:20", "订单结算", "营销短视频制作包", "-¥ 22,000", "已结算", "OD-2026052603"],
          ["2026-05-24 13:50", "退款回补", "视频改版取消", "+¥ 8,000", "处理中", "RF-2026052401"],
          ["2026-05-22 10:03", "订单锁资", "海报素材包", "-¥ 12,000", "锁资中", "OD-2026052202"]
        ]
      },
      accounts: [
        { name: "市场宣传组 - 团队预算账户", badge: "当前团队主账户", amount: "¥ 624,300", sub: "营销投放、素材采购、活动支出", current: true, stats: [["可用余额", "¥ 624,300"], ["冻结金额", "¥ 82,000"], ["本月已用", "¥ 84,210"], ["待入账", "¥ 16,000"]] },
        { name: "市场素材采购个人收益账户", badge: "个人收益账户", amount: "¥ 9,200", sub: "个人收益提现", current: false, stats: [["可提现", "¥ 9,200"], ["审核中提现", "¥ 0"], ["本月收入", "¥ 3,100"], ["结算单数", "2 笔"]] },
        { name: "骋风天合 - 企业总池", badge: "企业总池", amount: "¥ 12,500,000", sub: "统一预算来源", current: false, stats: [["已分配预算", "¥ 4,560,000"], ["待审核充值", "¥ 300,000"], ["团队数", "6 个"], ["本月划拨", "¥ 850,000"]] }
      ],
      accountStructure: [
        { name: "可用余额", values: [61, 20, 12, 7], meta: "可用 / 锁资 / 待入账 / 预留" },
        { name: "预算来源", values: [77, 9, 14, 0], meta: "企业划拨 / 在线充值 / 回补" },
        { name: "支出构成", values: [58, 22, 12, 8], meta: "投放 / 视觉 / 文案 / 服务费" }
      ],
      transactions: {
        totals: [["收入与回补", "¥ 8,000"], ["支出与结算", "¥ 22,000"], ["锁资中", "¥ 12,000"]],
        rows: [
          ["2026-05-26 09:20", "结算", "市场宣传组 - 团队预算账户", "内容承接方", "已结算", "-¥ 22,000", "OD-2026052603", "voucher_9102"],
          ["2026-05-24 13:50", "退款", "平台退款池", "市场宣传组 - 团队预算账户", "处理中", "+¥ 8,000", "RF-2026052401", "voucher_9070"],
          ["2026-05-22 10:03", "锁资", "市场宣传组 - 团队预算账户", "平台锁资池", "锁资中", "-¥ 12,000", "OD-2026052202", "voucher_9021"],
          ["2026-05-14 10:08", "充值", "企业总池", "市场宣传组 - 团队预算账户", "已到账", "+¥ 100,000", "RC-2026051401", "voucher_8964"],
          ["2026-05-14 10:12", "积分兑换", "市场宣传组 - 团队预算账户", "平台积分账户", "已完成", "-¥ 1,000", "PT-2026051401", "voucher_8965"],
          ["2026-05-06 11:12", "提现", "市场素材采购个人收益账户", "招商银行 2091", "已到账", "-¥ 3,000", "WD-2026050601", "voucher_8820"]
        ],
        selected: {
          title: "voucher_9102",
          type: "结算",
          time: "2026-05-26 09:20",
          accountOut: "市场宣传组 - 团队预算账户",
          accountIn: "内容承接方收益账户",
          amount: "-¥ 22,000",
          order: "OD-2026052603 / 营销短视频制作包",
          operator: "陈思齐",
          stateFlow: ["锁资完成", "交付验收通过", "平台服务费拆分", "结算完成"]
        }
      },
      bills: {
        summary: [["本月支出", "¥ 84,210"], ["退款回补", "¥ 8,000"], ["平台服务费", "¥ 5,260"], ["本月净支出", "¥ 76,210"]],
        trendLabels: ["2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
        trendValues: [62000, 70000, 64300, 70080, 76330, 84210],
        segments: [
          { name: "短视频投放", values: [58, 22, 11, 9], meta: "主支出" },
          { name: "视觉物料", values: [46, 34, 10, 10], meta: "设计物料" },
          { name: "传播文案", values: [29, 51, 8, 12], meta: "文案执行" }
        ],
        monthly: [
          ["2026-05", "¥ 6,000", "¥ 84,210", "¥ 8,000", "¥ 5,260", "¥ -78,210", "¥ 31,880"],
          ["2026-04", "¥ 0", "¥ 76,330", "¥ 0", "¥ 4,820", "¥ -81,150", "¥ 26,300"]
        ]
      },
      invoices: {
        summary: [["可开票金额", "¥ 31,880"], ["已申请开票", "¥ 12,000"], ["已开票金额", "¥ 86,000"], ["待补资料", "0 笔"]],
        orderList: [
          ["OD-2026052603", "营销短视频制作包", "2026-05-26", "¥ 22,000", "骋风天合（北京）文化传媒有限公司"],
          ["OD-2026051904", "海报素材包", "2026-05-19", "¥ 9,880", "骋风天合（北京）文化传媒有限公司"]
        ],
        records: [["2026-05-20 15:20", "INV-2026052001", "普票", "¥ 12,000", "已开具", "OD-2026051101"]],
        issued: [["051002601115", "骋风天合（北京）文化传媒有限公司", "普票", "¥ 12,000", "2026-05-21", "电子票已回传"]],
        titles: [["骋风天合（北京）文化传媒有限公司", "91110108MA01XXXXXX", "普票默认抬头"]]
      },
      recharge: {
        accountInfo: {
          workspace: "市场宣传组",
          subjectType: "团队",
          subjectName: "市场宣传组",
          walletId: "WAL-TEAM-10057",
          available: "¥ 624,300",
          frozen: "¥ 82,000",
          pendingSettlement: "¥ 16,000",
          currency: "CNY",
          updatedAt: "2026-05-29 09:46"
        },
        operation: {
          amount: "20,000",
          quickAmounts: ["5,000", "20,000", "50,000", "100,000"],
          payMethods: ["在线支付", "对公转账"],
          payChannels: ["支付宝", "微信"],
          targetAccount: "市场宣传组 - 团队预算账户",
          note: "用于 6 月短视频投放预算补充"
        },
        result: {
          status: "待平台确认",
          amount: "¥ 120,000",
          rechargeNo: "RC-2026052802",
          transactionNo: "TX-2026052802",
          externalNo: "BANK2026052800981",
          payMethod: "对公转账",
          payChannel: "银行转账",
          targetAccount: "市场宣传组 - 团队预算账户",
          createdAt: "2026-05-28 14:20",
          paidAt: "2026-05-28 14:52",
          creditedAt: "-",
          failureReason: "-"
        },
        records: [
          ["RC-2026052802", "2026-05-28 14:20", "¥ 120,000", "对公转账", "银行转账", "审核中", "市场宣传组 - 团队预算账户"],
          ["RC-2026051401", "2026-05-14 10:08", "¥ 100,000", "企业总池划拨", "企业总池", "已到账", "市场宣传组 - 团队预算账户"],
          ["RC-2026050901", "2026-05-09 08:32", "¥ 20,000", "在线支付", "支付宝官方直连", "已到账", "市场宣传组 - 团队预算账户"]
        ],
        notes: [
          "充值金额将进入当前工作空间钱包账户。",
          "余额可用于发布需求、订单支付、预算冻结等场景。",
          "在线支付成功后自动到账。",
          "对公转账需要平台确认后到账。",
          "已冻结、已消费、已结算金额不可直接退款。",
          "支付成功但余额未到账时，请联系客服并提供充值单号。"
        ]
      },
      withdraw: {
        available: "¥ 9,200",
        account: "市场素材采购个人收益账户",
        summary: [["累计收益", "¥ 9,200"], ["已提现", "¥ 3,000"], ["处理中", "¥ 0"], ["本次可提", "¥ 9,200"]],
        records: [["2026-05-06 11:12", "WD-2026050601", "¥ 3,000", "已到账", "招商银行 2091"]]
      },
      security: [
        ["支付方式", "已绑定 1 张银行卡与企业对公账户。", "已配置"],
        ["支付密码", "最近修改 2026-03-18。", "已开启"],
        ["支付限额", "单笔支付上限 ¥100,000。", "运行中"],
        ["二次校验", "超过 ¥50,000 自动通知团队负责人。", "已开启"]
      ],
      orderDetail: {
        orderNo: "OD-2026052603",
        title: "营销短视频制作包",
        amount: "¥ 22,000",
        payer: "市场宣传组 - 团队预算账户",
        contractor: "内容承接方",
        status: "已结算",
        summary: [["订单金额", "¥ 22,000"], ["已锁资", "¥ 22,000"], ["已结算", "¥ 22,000"], ["可开票", "¥ 22,000"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-18 10:06", meta: "确认付款主体为市场宣传组。" },
          { state: "done", title: "完成锁资", time: "2026-05-18 10:10", meta: "冻结团队预算 ¥22,000。" },
          { state: "done", title: "验收通过", time: "2026-05-25 17:20", meta: "交付验收通过，进入结算。" },
          { state: "done", title: "结算完成", time: "2026-05-26 09:20", meta: "承接方收益入账，可开票金额同步生成。" }
        ],
        vouchers: [
          ["voucher_9098", "锁资", "-¥ 22,000", "2026-05-18 10:10", "已生效"],
          ["voucher_9102", "结算", "-¥ 22,000", "2026-05-26 09:20", "已结算"]
        ]
      }
    }
  };

  const ADMIN_DATA = {
    summary: [["企业总池可用", "¥ 12,500,000"], ["已分配预算", "¥ 4,560,000"], ["待审核充值", "¥ 300,000"], ["待审核提现", "¥ 86,000"]],
    trendLabels: ["01", "02", "03", "04", "05", "06"],
    trendValues: [312000, 288000, 352000, 404000, 468000, 252000],
    teams: [
      ["短剧制作中心", "¥ 2,140,064", "¥ 186,200", "¥ 168,240", "18%", "追加中"],
      ["市场宣传组", "¥ 624,300", "¥ 82,000", "¥ 84,210", "9%", "正常"],
      ["IP 孵化组", "¥ 210,000", "¥ 0", "¥ 32,800", "5%", "低使用率"],
      ["品牌合作组", "¥ 870,000", "¥ 44,000", "¥ 121,900", "26%", "正常"]
    ],
    queues: {
      recharge: [
        ["RC-2026051201", "对公转账充值", "¥ 300,000", "短剧制作中心", "待财务审核"],
        ["RC-2026051103", "对公转账充值", "¥ 120,000", "品牌合作组", "待补凭证"]
      ],
      withdraw: [
        ["WD-2026052101", "昭岚", "¥ 8,000", "中国建设银行 8826", "待打款"],
        ["WD-2026052004", "陈思齐", "¥ 12,000", "招商银行 2091", "待风控复核"]
      ],
      settlement: [
        ["SET-2026052601", "OD-2026052607", "¥ 48,000", "短剧制作中心", "待验收后结算"],
        ["SET-2026052503", "OD-2026052202", "¥ 12,000", "市场宣传组", "待退款处理"]
      ],
      invoice: [
        ["INV-2026052402", "骋风天合（北京）文化传媒有限公司", "¥ 26,800", "专票", "待开票"],
        ["INV-2026052307", "骋风天合数字内容中心", "¥ 18,400", "普票", "待回传电子票"]
      ]
    }
  };

  const RECONCILIATION_DATA = {
    overviewMetrics: [
      ["对账批次数", "28", "当前筛选范围内已生成的对账批次"],
      ["差异批次数", "6", "存在差异或执行失败的批次"],
      ["差异笔数", "19", "支付、退款、分账、提现累计差异"],
      ["未处理差异", "7", "待处理与处理中差异总和"]
    ],
    batches: [
      {
        id: "batch_001",
        date: "2026-07-15",
        batchNo: "DZ20260715001",
        scope: "支付 / 退款 / 分账 / 提现",
        businessTypes: ["all", "payment", "refund", "sharing", "withdraw"],
        platformCount: 128,
        huifuCount: 128,
        platformAmount: 100000,
        huifuAmount: 99800,
        matchedCount: 125,
        diffCount: 3,
        diffAmount: 200,
        unresolvedCount: 2,
        reconStatus: "存在差异",
        processingStatus: "处理中",
        completedAt: "2026-07-16 02:06:21",
        version: "v3",
        exportSummary: "已导出 2 次",
        rows: [
          {
            id: "detail_001",
            businessType: "分账",
            businessOrderNo: "PS202607150001",
            platformTransactionNo: "TH202607150001",
            huifuTransactionNo: "HF202607150001",
            originalTransactionNo: "PAY202607140001",
            counterpartyName: "承制方 A",
            platformAmount: 900,
            huifuAmount: 899,
            diffAmount: -1,
            platformStatus: "分账成功",
            huifuStatus: "分账成功",
            transactionTime: "2026-07-15 14:21:00",
            huifuCompletedAt: "2026-07-15 14:21:15",
            reconciliationResult: "差异",
            differenceType: "金额不一致",
            riskLevel: "中",
            processingStatus: "待处理",
            ownerName: "未分配"
          },
          {
            id: "detail_002",
            businessType: "支付",
            businessOrderNo: "OD202607150013",
            platformTransactionNo: "TH202607150002",
            huifuTransactionNo: "HF202607150003",
            originalTransactionNo: "-",
            counterpartyName: "需求方企业账户",
            platformAmount: 1280,
            huifuAmount: 1280,
            diffAmount: 0,
            platformStatus: "支付失败",
            huifuStatus: "支付成功",
            transactionTime: "2026-07-15 09:52:11",
            huifuCompletedAt: "2026-07-15 09:52:15",
            reconciliationResult: "差异",
            differenceType: "状态不一致",
            riskLevel: "高",
            processingStatus: "处理中",
            ownerName: "王敏"
          },
          {
            id: "detail_003",
            businessType: "退款",
            businessOrderNo: "RF202607150019",
            platformTransactionNo: "TH202607150007",
            huifuTransactionNo: "-",
            originalTransactionNo: "PAY202607140208",
            counterpartyName: "需求方企业账户",
            platformAmount: 560,
            huifuAmount: 0,
            diffAmount: -560,
            platformStatus: "退款成功",
            huifuStatus: "未匹配到汇付流水",
            transactionTime: "2026-07-15 18:06:03",
            huifuCompletedAt: "-",
            reconciliationResult: "差异",
            differenceType: "汇付流水缺失",
            riskLevel: "中",
            processingStatus: "待处理",
            ownerName: "未分配"
          },
          {
            id: "detail_004",
            businessType: "支付",
            businessOrderNo: "OD202607150025",
            platformTransactionNo: "TH202607150010",
            huifuTransactionNo: "HF202607150018",
            originalTransactionNo: "-",
            counterpartyName: "需求方企业账户",
            platformAmount: 3280,
            huifuAmount: 3280,
            diffAmount: 0,
            platformStatus: "支付成功",
            huifuStatus: "支付成功",
            transactionTime: "2026-07-15 20:15:09",
            huifuCompletedAt: "2026-07-15 20:15:10",
            reconciliationResult: "一致",
            differenceType: "无",
            riskLevel: "低",
            processingStatus: "无需处理",
            ownerName: "-"
          }
        ],
        diffStats: [
          ["金额不一致", "1 笔", "分账手续费与汇付侧记录相差 1 元"],
          ["状态不一致", "1 笔", "支付结果未同步回天合"],
          ["汇付流水缺失", "1 笔", "退款流水仍未在汇付账单中出现"],
          ["疑似重复交易", "0 笔", "当前批次未命中重复支付或重复退款"]
        ],
        progressStats: [
          ["待处理", "2", "需财务或研发进一步排查"],
          ["处理中", "1", "已由王敏跟进回调链路"],
          ["已处理", "0", "当前批次暂无闭环项"],
          ["人工确认关闭", "0", "暂无需要人工关闭的异常"]
        ],
        executionLogs: [
          ["v3", "2026-07-16 02:06:21", "系统自动执行", "存在差异", "本次重新比对后仍保留 3 笔差异"],
          ["v2", "2026-07-16 02:03:03", "系统自动重试", "执行中断", "汇付账单文件延迟 3 分钟到达"],
          ["v1", "2026-07-16 02:00:00", "系统自动执行", "执行失败", "汇付账单拉取接口超时"]
        ]
      },
      {
        id: "batch_002",
        date: "2026-07-14",
        batchNo: "DZ20260714001",
        scope: "支付 / 分账",
        businessTypes: ["all", "payment", "sharing"],
        platformCount: 92,
        huifuCount: 92,
        platformAmount: 84200,
        huifuAmount: 84200,
        matchedCount: 92,
        diffCount: 0,
        diffAmount: 0,
        unresolvedCount: 0,
        reconStatus: "对账一致",
        processingStatus: "无需处理",
        completedAt: "2026-07-15 02:01:08",
        version: "v1",
        exportSummary: "已导出 1 次",
        rows: [],
        diffStats: [],
        progressStats: [],
        executionLogs: []
      },
      {
        id: "batch_003",
        date: "2026-07-13",
        batchNo: "DZ20260713002",
        scope: "提现",
        businessTypes: ["all", "withdraw"],
        platformCount: 14,
        huifuCount: 13,
        platformAmount: 25600,
        huifuAmount: 17600,
        matchedCount: 12,
        diffCount: 2,
        diffAmount: 8000,
        unresolvedCount: 1,
        reconStatus: "执行失败",
        processingStatus: "待处理",
        completedAt: "2026-07-14 02:11:44",
        version: "v2",
        exportSummary: "未导出",
        rows: [],
        diffStats: [],
        progressStats: [],
        executionLogs: []
      }
    ],
    differenceMetrics: [
      ["待处理差异", "4", "尚未开始处理的差异单笔记录"],
      ["处理中差异", "3", "已领取但尚未闭环的差异"],
      ["高风险差异", "2", "状态错判、天合流水缺失等高风险异常"],
      ["差异总金额", "¥ 8,760", "当前筛选范围内的金额差绝对值汇总"]
    ],
    differences: [
      {
        detailId: "detail_002",
        date: "2026-07-15",
        batchNo: "DZ20260715001",
        businessType: "支付",
        businessOrderNo: "OD202607150013",
        platformTransactionNo: "TH202607150002",
        huifuTransactionNo: "HF202607150003",
        originalTransactionNo: "-",
        counterpartyName: "需求方企业账户",
        platformAmount: 1280,
        huifuAmount: 1280,
        diffAmount: 0,
        platformStatus: "支付失败",
        huifuStatus: "支付成功",
        transactionTime: "2026-07-15 09:52:11",
        huifuCompletedAt: "2026-07-15 09:52:15",
        reconciliationResult: "差异",
        differenceType: "状态不一致",
        riskLevel: "高",
        processingStatus: "处理中",
        ownerName: "王敏",
        lastProcessedAt: "2026-07-16 09:10:00"
      },
      {
        detailId: "detail_005",
        date: "2026-07-14",
        batchNo: "DZ20260714003",
        businessType: "支付",
        businessOrderNo: "OD202607140208",
        platformTransactionNo: "-",
        huifuTransactionNo: "HF202607140119",
        originalTransactionNo: "-",
        counterpartyName: "需求方企业账户",
        platformAmount: 0,
        huifuAmount: 8000,
        diffAmount: 8000,
        platformStatus: "无记录",
        huifuStatus: "支付成功",
        transactionTime: "-",
        huifuCompletedAt: "2026-07-14 18:19:23",
        reconciliationResult: "差异",
        differenceType: "天合流水缺失",
        riskLevel: "高",
        processingStatus: "待处理",
        ownerName: "未分配",
        lastProcessedAt: "-"
      },
      {
        detailId: "detail_001",
        date: "2026-07-15",
        batchNo: "DZ20260715001",
        businessType: "分账",
        businessOrderNo: "PS202607150001",
        platformTransactionNo: "TH202607150001",
        huifuTransactionNo: "HF202607150001",
        originalTransactionNo: "PAY202607140001",
        counterpartyName: "承制方 A",
        platformAmount: 900,
        huifuAmount: 899,
        diffAmount: -1,
        platformStatus: "分账成功",
        huifuStatus: "分账成功",
        transactionTime: "2026-07-15 14:21:00",
        huifuCompletedAt: "2026-07-15 14:21:15",
        reconciliationResult: "差异",
        differenceType: "金额不一致",
        riskLevel: "中",
        processingStatus: "待处理",
        ownerName: "未分配",
        lastProcessedAt: "-"
      },
      {
        detailId: "detail_003",
        date: "2026-07-15",
        batchNo: "DZ20260715001",
        businessType: "退款",
        businessOrderNo: "RF202607150019",
        platformTransactionNo: "TH202607150007",
        huifuTransactionNo: "-",
        originalTransactionNo: "PAY202607140208",
        counterpartyName: "需求方企业账户",
        platformAmount: 560,
        huifuAmount: 0,
        diffAmount: -560,
        platformStatus: "退款成功",
        huifuStatus: "未匹配到汇付流水",
        transactionTime: "2026-07-15 18:06:03",
        huifuCompletedAt: "-",
        reconciliationResult: "差异",
        differenceType: "汇付流水缺失",
        riskLevel: "中",
        processingStatus: "待处理",
        ownerName: "未分配",
        lastProcessedAt: "-"
      }
    ],
    detailMap: {
      detail_001: {
        title: "分账金额不一致",
        riskLevel: "中",
        date: "2026-07-15",
        businessType: "分账",
        businessOrderNo: "PS202607150001",
        platformTransactionNo: "TH202607150001",
        huifuTransactionNo: "HF202607150001",
        originalTransactionNo: "PAY202607140001",
        reconciliationResult: "差异",
        processingStatus: "待处理",
        ownerName: "未分配",
        overview: [
          ["差异类型", "金额不一致"],
          ["风险等级", "中风险"],
          ["对账日期", "2026-07-15"],
          ["业务类型", "分账"]
        ],
        platformFacts: [
          ["业务单号", "PS202607150001"],
          ["交易流水号", "TH202607150001"],
          ["交易金额", "¥ 900"],
          ["交易状态", "分账成功"],
          ["交易时间", "2026-07-15 14:21:00"],
          ["付款方", "平台主账户"],
          ["分账接收方", "承制方 A"],
          ["应分账金额", "¥ 900"],
          ["平台服务费", "¥ 120"],
          ["汇付手续费", "¥ 6"],
          ["最近更新时间", "2026-07-15 14:21:20"],
          ["规则版本", "share_rule_v202607"]
        ],
        huifuFacts: [
          ["汇付交易流水号", "HF202607150001"],
          ["商户订单号", "PS202607150001"],
          ["原交易流水号", "PAY202607140001"],
          ["交易金额", "¥ 899"],
          ["交易状态", "分账成功"],
          ["交易完成时间", "2026-07-15 14:21:15"],
          ["付款方标识", "plat_01"],
          ["分账接收方", "承制方 A"],
          ["实际分账金额", "¥ 899"],
          ["汇付手续费", "¥ 7"],
          ["汇付返回码", "000000"],
          ["最近查询时间", "2026-07-16 09:05:10"]
        ],
        snapshot: [
          ["订单实付金额", "¥ 1,020"],
          ["平台服务费费率", "11.76%"],
          ["平台服务费金额", "¥ 120"],
          ["汇付手续费", "¥ 6"],
          ["承制方应分账金额", "¥ 900"],
          ["分账比例", "88.24%"],
          ["小数处理规则", "向下取整到分"],
          ["规则版本", "share_rule_v202607"]
        ],
        processingForm: {
          status: "待处理",
          owner: "未分配",
          reason: "金额计算规则不一致",
          action: "待研发核查汇付手续费取整规则与平台结算快照。",
          conclusion: "尚未闭环，先按待处理保留。",
          ticket: "FIN-20260716-003",
          remark: "需要同时检查分账接收方配置版本。"
        },
        logs: [
          ["2026-07-16 09:05", "系统", "重新查询汇付状态", "汇付返回金额仍为 ¥899，未发生变化"],
          ["2026-07-16 09:12", "王敏", "记录差异原因", "初步判断为手续费取整口径不一致"],
          ["2026-07-16 09:18", "系统", "重新对账", "结果仍为金额不一致"]
        ]
      },
      detail_002: {
        title: "支付状态不一致",
        riskLevel: "高",
        date: "2026-07-15",
        businessType: "支付",
        businessOrderNo: "OD202607150013",
        platformTransactionNo: "TH202607150002",
        huifuTransactionNo: "HF202607150003",
        originalTransactionNo: "-",
        reconciliationResult: "差异",
        processingStatus: "处理中",
        ownerName: "王敏",
        overview: [
          ["差异类型", "状态不一致"],
          ["风险等级", "高风险"],
          ["对账日期", "2026-07-15"],
          ["业务类型", "支付"]
        ],
        platformFacts: [
          ["业务单号", "OD202607150013"],
          ["交易流水号", "TH202607150002"],
          ["交易金额", "¥ 1,280"],
          ["交易状态", "支付失败"],
          ["交易时间", "2026-07-15 09:52:11"],
          ["付款方", "天合主账户"],
          ["收款方", "汇付商户户头"],
          ["最近更新时间", "2026-07-15 09:52:13"],
          ["规则版本", "payment_callback_v2"]
        ],
        huifuFacts: [
          ["汇付交易流水号", "HF202607150003"],
          ["商户订单号", "OD202607150013"],
          ["原交易流水号", "-"],
          ["交易金额", "¥ 1,280"],
          ["交易状态", "支付成功"],
          ["交易完成时间", "2026-07-15 09:52:15"],
          ["付款方标识", "payer_138****8888"],
          ["收款方标识", "merchant_cfth"],
          ["汇付失败原因", "-"],
          ["汇付返回码", "000000"],
          ["最近查询时间", "2026-07-16 09:08:22"]
        ],
        snapshot: [],
        processingForm: {
          status: "处理中",
          owner: "王敏",
          reason: "汇付回调处理失败",
          action: "已补查回调日志并通知研发修复回调消费异常。",
          conclusion: "等待修复后重新同步订单状态，再执行单笔对账。",
          ticket: "FIN-20260716-001",
          remark: "同批次另有 1 笔退款异常，建议一起复盘。"
        },
        logs: [
          ["2026-07-16 08:55", "系统", "重新查询汇付状态", "汇付状态仍为支付成功"],
          ["2026-07-16 09:02", "王敏", "开始处理", "处理状态由待处理改为处理中，负责人自动分配为当前用户"],
          ["2026-07-16 09:10", "研发值班", "备注", "确认回调消费队列在 09:00 前有积压"]
        ]
      },
      detail_003: {
        title: "汇付流水缺失",
        riskLevel: "中",
        date: "2026-07-15",
        businessType: "退款",
        businessOrderNo: "RF202607150019",
        platformTransactionNo: "TH202607150007",
        huifuTransactionNo: "-",
        originalTransactionNo: "PAY202607140208",
        reconciliationResult: "差异",
        processingStatus: "待处理",
        ownerName: "未分配",
        overview: [
          ["差异类型", "汇付流水缺失"],
          ["风险等级", "中风险"],
          ["对账日期", "2026-07-15"],
          ["业务类型", "退款"]
        ],
        platformFacts: [
          ["业务单号", "RF202607150019"],
          ["交易流水号", "TH202607150007"],
          ["交易金额", "¥ 560"],
          ["交易状态", "退款成功"],
          ["交易时间", "2026-07-15 18:06:03"],
          ["付款方", "平台主账户"],
          ["收款方", "需求方企业账户"],
          ["最近更新时间", "2026-07-15 18:06:09"],
          ["规则版本", "refund_v1"]
        ],
        huifuFacts: [
          ["汇付交易流水号", "-"],
          ["商户订单号", "RF202607150019"],
          ["原交易流水号", "PAY202607140208"],
          ["交易金额", "¥ 0"],
          ["交易状态", "未匹配到汇付账单"],
          ["交易完成时间", "-"],
          ["付款方标识", "merchant_cfth"],
          ["收款方标识", "payer_139****2020"],
          ["汇付失败原因", "账单延迟或流水未返回"],
          ["汇付返回码", "-"],
          ["最近查询时间", "2026-07-16 09:02:45"]
        ],
        snapshot: [],
        processingForm: {
          status: "待处理",
          owner: "未分配",
          reason: "汇付账单延迟",
          action: "建议等待下一轮账单同步后再次查询。",
          conclusion: "待确认账单是否跨日返回。",
          ticket: "FIN-20260716-005",
          remark: "退款原流水状态正常。"
        },
        logs: [
          ["2026-07-16 09:02", "系统", "重新查询汇付状态", "仍未拉取到对应退款流水"],
          ["2026-07-16 09:03", "系统", "重新对账", "仍判定为汇付流水缺失"]
        ]
      },
      detail_005: {
        title: "天合流水缺失",
        riskLevel: "高",
        date: "2026-07-14",
        businessType: "支付",
        businessOrderNo: "OD202607140208",
        platformTransactionNo: "-",
        huifuTransactionNo: "HF202607140119",
        originalTransactionNo: "-",
        reconciliationResult: "差异",
        processingStatus: "待处理",
        ownerName: "未分配",
        overview: [
          ["差异类型", "天合流水缺失"],
          ["风险等级", "高风险"],
          ["对账日期", "2026-07-14"],
          ["业务类型", "支付"]
        ],
        platformFacts: [
          ["业务单号", "未匹配到天合业务"],
          ["交易流水号", "-"],
          ["交易金额", "¥ 0"],
          ["交易状态", "无记录"],
          ["交易时间", "-"],
          ["付款方", "-"],
          ["收款方", "-"],
          ["最近更新时间", "-"],
          ["规则版本", "-"]
        ],
        huifuFacts: [
          ["汇付交易流水号", "HF202607140119"],
          ["商户订单号", "OD202607140208"],
          ["原交易流水号", "-"],
          ["交易金额", "¥ 8,000"],
          ["交易状态", "支付成功"],
          ["交易完成时间", "2026-07-14 18:19:23"],
          ["付款方标识", "payer_138****7632"],
          ["收款方标识", "merchant_cfth"],
          ["汇付失败原因", "-"],
          ["汇付返回码", "000000"],
          ["最近查询时间", "2026-07-15 10:18:17"]
        ],
        snapshot: [],
        processingForm: {
          status: "待处理",
          owner: "未分配",
          reason: "汇付回调未收到",
          action: "需要研发确认回调日志与订单创建链路。",
          conclusion: "暂未确认真实业务归属，不可直接修改支付结果。",
          ticket: "FIN-20260715-009",
          remark: "属于高风险差异，优先级需提升。"
        },
        logs: [
          ["2026-07-15 10:18", "系统管理员", "重新查询汇付状态", "确认汇付成功事实存在"],
          ["2026-07-15 10:22", "财务", "备注", "禁止人工补单或直接改余额"]
        ]
      }
    }
  };

  const ORDER_DETAIL_FIXTURES = {
    drama: {
      "OD-2026052607": {
        ...TEAM_DATA.drama.orderDetail,
        relatedBizNos: ["OD-2026052607"],
        relatedTradeNos: ["FL-2026052601"],
        relatedFundNos: ["FF-2026052601", "FF-2026052602"]
      },
      "OD-2026051809": {
        orderNo: "OD-2026051809",
        title: "IP 海报系列",
        amount: "¥ 28,000",
        payer: "短剧制作中心 - 团队预算账户",
        contractor: "星辰创作工作室",
        status: "已结算",
        summary: [["订单金额", "¥ 28,000"], ["已锁资", "¥ 28,000"], ["已结算", "¥ 28,000"], ["可开票", "¥ 28,000"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-18 10:18", meta: "订单创建成功，付款主体锁定为短剧制作中心。" },
          { state: "done", title: "完成锁资", time: "2026-05-18 10:22", meta: "冻结团队预算 ¥28,000，等待视觉物料交付。" },
          { state: "done", title: "验收通过", time: "2026-05-24 11:36", meta: "海报系列验收完成，触发结算流程。" },
          { state: "done", title: "结算完成", time: "2026-05-24 11:41", meta: "承制方收益入账，可开票金额同步进入发票池。" },
          { state: "warn", title: "退款争议处理中", time: "2026-05-21 16:00", meta: "因海报重制争议发起 RF-2026052103，当前退款回补仍在处理中。" }
        ],
        vouchers: [
          ["voucher_7962", "锁资", "-¥ 28,000", "2026-05-18 10:22", "已生效"],
          ["voucher_7984", "结算", "-¥ 28,000", "2026-05-24 11:41", "已结算"],
          ["voucher_7985", "服务费", "¥ 1,680", "2026-05-24 11:41", "已结转"]
        ],
        relatedBizNos: ["OD-2026051809", "RF-2026052103"],
        relatedTradeNos: ["FL-2026052403", "FL-2026052104"],
        relatedFundNos: ["FF-2026052401", "FF-2026052101"]
      },
      "OD-2026051105": {
        orderNo: "OD-2026051105",
        title: "角色海报重绘",
        amount: "¥ 16,300",
        payer: "短剧制作中心 - 团队预算账户",
        contractor: "云上视觉工作室",
        status: "已结算，开票申请中",
        summary: [["订单金额", "¥ 16,300"], ["已锁资", "¥ 16,300"], ["已结算", "¥ 16,300"], ["可开票", "¥ 16,300"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-11 09:12", meta: "确认角色海报重绘范围与付款主体。" },
          { state: "done", title: "完成锁资", time: "2026-05-11 09:16", meta: "冻结团队预算 ¥16,300。" },
          { state: "done", title: "验收通过", time: "2026-05-19 15:20", meta: "重绘稿通过验收，进入结算。" },
          { state: "done", title: "结算完成", time: "2026-05-19 15:26", meta: "承制方收益到账，系统生成可开票金额。" },
          { state: "warn", title: "开票申请处理中", time: "2026-05-24 16:32", meta: "已并入 INV-2026052402 开票申请，等待财务处理。" }
        ],
        vouchers: [
          ["voucher_7908", "锁资", "-¥ 16,300", "2026-05-11 09:16", "已生效"],
          ["voucher_7948", "结算", "-¥ 16,300", "2026-05-19 15:26", "已结算"],
          ["voucher_8019", "开票占用", "¥ 16,300", "2026-05-24 16:32", "处理中"]
        ],
        relatedBizNos: ["OD-2026051105"],
        relatedTradeNos: ["FL-2026051906"],
        relatedFundNos: ["FF-2026051902"]
      },
      "OD-2026050203": {
        orderNo: "OD-2026050203",
        title: "预告片后期包装",
        amount: "¥ 34,895",
        payer: "短剧制作中心 - 团队预算账户",
        contractor: "逐帧后期工作室",
        status: "已结算，开票申请中",
        summary: [["订单金额", "¥ 34,895"], ["已锁资", "¥ 34,895"], ["已结算", "¥ 34,895"], ["可开票", "¥ 34,895"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-02 14:05", meta: "预告片包装需求下单成功。" },
          { state: "done", title: "完成锁资", time: "2026-05-02 14:08", meta: "冻结团队预算 ¥34,895。" },
          { state: "done", title: "验收通过", time: "2026-05-12 18:30", meta: "后期包装版本通过验收。" },
          { state: "done", title: "结算完成", time: "2026-05-12 18:42", meta: "结算完成并同步生成发票池额度。" },
          { state: "warn", title: "开票申请处理中", time: "2026-05-24 16:32", meta: "当前与其他结算单合并申请专票。" }
        ],
        vouchers: [
          ["voucher_7831", "锁资", "-¥ 34,895", "2026-05-02 14:08", "已生效"],
          ["voucher_7866", "结算", "-¥ 34,895", "2026-05-12 18:42", "已结算"],
          ["voucher_8018", "开票占用", "¥ 34,895", "2026-05-24 16:32", "处理中"]
        ],
        relatedBizNos: ["OD-2026050203"],
        relatedTradeNos: ["FL-2026051204"],
        relatedFundNos: ["FF-2026051203"]
      },
      "OD-2026051702": {
        orderNo: "OD-2026051702",
        title: "备选封面视频取消",
        amount: "¥ 12,000",
        payer: "短剧制作中心 - 团队预算账户",
        contractor: "平台锁资池",
        status: "已取消，预算已解冻",
        summary: [["订单金额", "¥ 12,000"], ["已锁资", "¥ 12,000"], ["已解冻", "¥ 12,000"], ["可开票", "¥ 0"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-17 14:20", meta: "备选封面视频需求创建成功。" },
          { state: "done", title: "发起锁资", time: "2026-05-17 14:22", meta: "冻结团队预算 ¥12,000。" },
          { state: "warn", title: "业务取消", time: "2026-05-20 09:30", meta: "需求方主动取消订单，触发解冻。" },
          { state: "done", title: "预算解冻完成", time: "2026-05-20 09:33", meta: "原锁资金额全部退回可用余额。" }
        ],
        vouchers: [
          ["voucher_7921", "锁资", "-¥ 12,000", "2026-05-17 14:22", "已生效"],
          ["voucher_7927", "解冻", "+¥ 12,000", "2026-05-20 09:33", "已解冻"]
        ],
        relatedBizNos: ["OD-2026051702"],
        relatedTradeNos: ["FL-2026052005"],
        relatedFundNos: ["FF-2026052006"]
      }
    },
    marketing: {
      "OD-2026052603": {
        ...TEAM_DATA.marketing.orderDetail,
        relatedBizNos: ["OD-2026052603"],
        relatedTradeNos: ["FL-2026052609"],
        relatedFundNos: ["FF-2026052603"]
      },
      "OD-2026052202": {
        orderNo: "OD-2026052202",
        title: "海报素材包",
        amount: "¥ 12,000",
        payer: "市场宣传组 - 团队预算账户",
        contractor: "内容承接方",
        status: "锁资中",
        summary: [["订单金额", "¥ 12,000"], ["已锁资", "¥ 12,000"], ["已结算", "¥ 0"], ["可开票", "¥ 0"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-22 09:58", meta: "海报素材包需求创建成功。" },
          { state: "done", title: "发起锁资", time: "2026-05-22 10:03", meta: "冻结团队预算 ¥12,000，生成 voucher_9021。" },
          { state: "warn", title: "等待交付", time: "进行中", meta: "当前处于素材制作阶段，尚未进入验收。" },
          { state: "", title: "验收后结算", time: "待发生", meta: "结算完成后会生成可开票金额。" }
        ],
        vouchers: [
          ["voucher_9021", "锁资", "-¥ 12,000", "2026-05-22 10:03", "已生效"],
          ["voucher_9022", "服务费预估", "¥ 720", "2026-05-22 10:03", "待结算"]
        ],
        relatedBizNos: ["OD-2026052202", "RF-2026052401"],
        relatedTradeNos: ["FL-2026052211", "FL-2026052410"],
        relatedFundNos: ["FF-2026052201", "FF-2026052402"]
      },
      "OD-2026051904": {
        orderNo: "OD-2026051904",
        title: "海报素材包补充",
        amount: "¥ 9,880",
        payer: "市场宣传组 - 团队预算账户",
        contractor: "内容承接方",
        status: "已结算",
        summary: [["订单金额", "¥ 9,880"], ["已锁资", "¥ 9,880"], ["已结算", "¥ 9,880"], ["可开票", "¥ 9,880"]],
        timeline: [
          { state: "done", title: "创建订单", time: "2026-05-19 10:12", meta: "补充物料订单创建成功。" },
          { state: "done", title: "完成锁资", time: "2026-05-19 10:15", meta: "冻结团队预算 ¥9,880。" },
          { state: "done", title: "验收通过", time: "2026-05-19 18:36", meta: "物料补充版本验收通过。" },
          { state: "done", title: "结算完成", time: "2026-05-19 18:40", meta: "结算成功并进入可开票池。" }
        ],
        vouchers: [
          ["voucher_9004", "锁资", "-¥ 9,880", "2026-05-19 10:15", "已生效"],
          ["voucher_9008", "结算", "-¥ 9,880", "2026-05-19 18:40", "已结算"]
        ],
        relatedBizNos: ["OD-2026051904"],
        relatedTradeNos: ["FL-2026051916"],
        relatedFundNos: ["FF-2026051911"]
      }
    }
  };

  function getPageLabel(page) {
    return (PAGES[page] || {}).title || "当前页面";
  }

  function extractBizNos(value) {
    return String(value || "").match(/[A-Z]{2}-\d{10}/g) || [];
  }

  function getRouteState() {
    const params = {};
    const search = new URLSearchParams(window.location.search || "");
    const hashRaw = (window.location.hash || "").replace(/^#/, "");
    const hash = new URLSearchParams(hashRaw && hashRaw.includes("=") ? hashRaw : "");

    search.forEach((value, key) => {
      if (value) params[key] = value;
    });
    if (hashRaw && !hashRaw.includes("=")) {
      params.bizNo = params.bizNo || decodeURIComponent(hashRaw);
    }
    hash.forEach((value, key) => {
      if (value && params[key] == null) params[key] = value;
    });
    return params;
  }

  function buildPageUrl(page, query = {}, hash = {}) {
    const search = new URLSearchParams();
    const hashParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value != null && value !== "") search.set(key, value);
    });
    Object.entries(hash).forEach(([key, value]) => {
      if (value != null && value !== "") hashParams.set(key, value);
    });
    let href = pageToFile(page);
    const searchText = search.toString();
    const hashText = hashParams.toString();
    if (searchText) href += `?${searchText}`;
    if (hashText) href += `#${hashText}`;
    return href;
  }

  function getTeamKeyByTeam(team) {
    return Object.entries(TEAM_DATA).find(([, item]) => item.name === team.name)?.[0] || "drama";
  }

  function resolveOrderNo(teamKey, refNo) {
    if (!refNo) return "";
    const fixtures = ORDER_DETAIL_FIXTURES[teamKey] || {};
    if (fixtures[refNo]) return refNo;
    return Object.values(fixtures).find(detail => [detail.orderNo].concat(detail.relatedBizNos || []).includes(refNo))?.orderNo || "";
  }

  function resolveRouteTeamKey(routeState, fallbackTeamKey) {
    if (routeState.team && TEAM_DATA[routeState.team]) return routeState.team;
    const refs = [routeState.orderNo, routeState.bizNo].filter(Boolean);
    for (const ref of refs) {
      const matchedTeamKey = Object.keys(TEAM_DATA).find(teamKey => resolveOrderNo(teamKey, ref));
      if (matchedTeamKey) return matchedTeamKey;
    }
    return fallbackTeamKey;
  }

  function resolveOrderContext(teamKey, routeState = {}) {
    const effectiveTeamKey = resolveRouteTeamKey(routeState, teamKey);
    const fixtures = ORDER_DETAIL_FIXTURES[effectiveTeamKey] || {};
    const requestedOrderNo = routeState.orderNo || resolveOrderNo(effectiveTeamKey, routeState.bizNo);
    const hasExplicitRef = Boolean(routeState.orderNo || routeState.bizNo);
    const detail = requestedOrderNo && fixtures[requestedOrderNo]
      ? fixtures[requestedOrderNo]
      : TEAM_DATA[effectiveTeamKey].orderDetail;

    return {
      teamKey: effectiveTeamKey,
      orderNo: detail.orderNo,
      bizNo: routeState.bizNo || requestedOrderNo || detail.orderNo,
      fromPage: routeState.from || "",
      detail,
      notFound: hasExplicitRef && !(requestedOrderNo && fixtures[requestedOrderNo])
    };
  }

  function buildOrderDetailHref(teamKey, bizNo, fromPage, orderNo) {
    const resolvedOrderNo = orderNo || resolveOrderNo(teamKey, bizNo);
    if (!resolvedOrderNo) return "";
    return buildPageUrl("orderDetail", { team: teamKey, bizNo: bizNo || resolvedOrderNo }, { from: fromPage, orderNo: resolvedOrderNo });
  }

  function buildOrderLinkedPageHref(page, teamKey, orderNo, bizNo, fromPage) {
    return buildPageUrl(page, { team: teamKey, orderNo }, { from: fromPage, bizNo: bizNo || orderNo });
  }

  function fmtMoney(value) {
    return "¥ " + Number(value).toLocaleString("zh-CN");
  }

  function fmtDeltaMoney(value) {
    const number = Number(value) || 0;
    const prefix = number > 0 ? "+" : "";
    return `${prefix}${fmtMoney(number)}`;
  }

  function reconStatusTone(status) {
    if (!status) return "blue";
    if (status.includes("一致")) return "green";
    if (status.includes("差异")) return "orange";
    if (status.includes("失败")) return "red";
    if (status.includes("关闭")) return "teal";
    if (status.includes("执行中")) return "blue";
    return "purple";
  }

  function processingStatusTone(status) {
    if (!status) return "blue";
    if (status.includes("无需")) return "teal";
    if (status.includes("已处理") || status.includes("已关闭")) return "green";
    if (status.includes("处理中")) return "blue";
    if (status.includes("待处理")) return "red";
    return "orange";
  }

  function riskTone(level) {
    if (!level) return "teal";
    if (level.includes("高")) return "red";
    if (level.includes("中")) return "orange";
    return "green";
  }

  function findReconBatch(batchNo) {
    return RECONCILIATION_DATA.batches.find(item => item.batchNo === batchNo) || RECONCILIATION_DATA.batches[0];
  }

  function findReconDetail(detailId) {
    return RECONCILIATION_DATA.detailMap[detailId] || RECONCILIATION_DATA.detailMap.detail_001;
  }

  function renderReconFactGrid(items, extraClass = "") {
    return `
      <div class="detail-grid detail-grid-2 ${extraClass}">
        ${items.map(item => `
          <div class="detail-item">
            <span class="detail-label">${item[0]}</span>
            <span class="detail-value">${item[1]}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  function parseMoney(value) {
    return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
  }

  function buildLedgerData(team) {
    const isDrama = team.name.includes("短剧");
    if (isDrama) {
      return {
        closing: {
          total: "¥ 2,140,064",
          rows: [["可用余额", "¥ 2,140,064"], ["冻结金额", "¥ 186,200"], ["待入账金额", "¥ 48,200"]]
        },
        opening: {
          total: "¥ 2,014,824",
          rows: [["月初可用余额", "¥ 1,928,000"], ["月初冻结金额", "¥ 74,400"], ["月初待入账金额", "¥ 12,424"]]
        },
        inflow: {
          total: "¥ 256,000",
          rows: [["企业总池划拨", "¥ 200,000"], ["在线充值到账", "¥ 50,000"], ["退款回补", "¥ 6,000"]]
        },
        outflow: {
          total: "¥ 87,840",
          rows: [["订单结算支出", "¥ 28,000"], ["锁资中金额", "¥ 48,000"], ["平台服务费", "¥ 11,840"]]
        }
      };
    }

    return {
      closing: {
        total: "¥ 624,300",
        rows: [["可用余额", "¥ 624,300"], ["冻结金额", "¥ 82,000"], ["待入账金额", "¥ 16,000"]]
      },
      opening: {
        total: "¥ 702,510",
        rows: [["月初可用余额", "¥ 668,000"], ["月初冻结金额", "¥ 22,000"], ["月初待入账金额", "¥ 12,510"]]
      },
      inflow: {
        total: "¥ 128,000",
        rows: [["企业总池划拨", "¥ 100,000"], ["在线充值到账", "¥ 20,000"], ["退款回补", "¥ 8,000"]]
      },
      outflow: {
        total: "¥ 39,260",
        rows: [["订单结算支出", "¥ 22,000"], ["锁资中金额", "¥ 12,000"], ["平台服务费", "¥ 5,260"]]
      }
    };
  }

  function buildBillRows(team) {
    if (team.name.includes("短剧")) {
      return [
        [team.name, "OD-2026052607", "三集短剧解说视频（修仙题材）", "项目制作费", "锁资", "¥ 48,000", "锁资中", "—", "未开票"],
        [team.name, "OD-2026051809", "IP 海报系列", "视觉制作费", "结算", "¥ 28,000", "已结算", "2026-05-24", "可开票"],
        [team.name, "OD-2026051105", "角色海报重绘", "视觉制作费", "结算", "¥ 16,300", "已结算", "2026-05-19", "开票申请中"],
        [team.name, "OD-2026050203", "预告片后期包装", "后期制作费", "结算", "¥ 34,895", "已结算", "2026-05-12", "开票申请中"],
        [team.name, "RF-2026052103", "海报重制争议退款", "退款回补", "退款", "+¥ 6,000", "处理中", "—", "不适用"],
        [team.name, "PT-2026051801", "团队积分兑换", "积分兑换", "积分兑换", "¥ 2,000", "已完成", "2026-05-18", "不适用"]
      ];
    }

    return [
      [team.name, "OD-2026052603", "营销短视频制作包", "投放制作费", "结算", "¥ 22,000", "已结算", "2026-05-26", "可开票"],
      [team.name, "OD-2026052202", "海报素材包", "视觉制作费", "锁资", "¥ 12,000", "锁资中", "—", "未开票"],
      [team.name, "OD-2026051904", "海报素材包补充", "视觉制作费", "结算", "¥ 9,880", "已结算", "2026-05-19", "可开票"],
      [team.name, "RF-2026052401", "视频改版取消退款", "退款回补", "退款", "+¥ 8,000", "处理中", "—", "不适用"],
      [team.name, "AL-2026051401", "企业预算补充", "预算补充", "预算划拨", "+¥ 100,000", "已到账", "2026-05-14", "不适用"],
      [team.name, "PT-2026051401", "团队积分兑换", "积分兑换", "积分兑换", "¥ 1,000", "已完成", "2026-05-14", "不适用"]
    ];
  }

  function buildTransactionRows(team) {
    const teamKey = getTeamKeyByTeam(team);
    const operator = team.name.includes("短剧") ? "昭岚" : "陈思齐";
    const orderTitleMap = {
      "OD-2026052607": "三集短剧解说视频（修仙题材）",
      "OD-2026051809": "IP 海报系列",
      "RF-2026052103": "海报重制争议退款",
      "OD-2026051702": "备选封面视频取消",
      "RC-2026051801": "团队预算充值（在线充值）",
      "PT-2026051801": "团队预算兑换 20,000 积分",
      "WD-2026051701": "个人收益提现至建行",
      "OD-2026052603": "营销短视频制作包",
      "RF-2026052401": "视频改版取消退款",
      "OD-2026052202": "海报素材包",
      "AL-2026052502": "企业预算补充",
      "AL-2026051401": "企业预算补充",
      "RC-2026051401": "团队预算充值（企业划拨）",
      "PT-2026051401": "团队预算兑换 10,000 积分",
      "WD-2026050601": "个人收益提现至招行"
    };
    const flowNoMap = {
      "OD-2026052607": "FL-2026052601",
      "AL-2026052502": "FL-2026052502",
      "OD-2026051809": "FL-2026052403",
      "RF-2026052103": "FL-2026052104",
      "OD-2026051702": "FL-2026052005",
      "RC-2026051801": "FL-2026051806",
      "PT-2026051801": "FL-2026051807",
      "WD-2026051701": "FL-2026051708",
      "OD-2026052603": "FL-2026052609",
      "RF-2026052401": "FL-2026052410",
      "OD-2026052202": "FL-2026052211",
      "RC-2026051401": "FL-2026051412",
      "PT-2026051401": "FL-2026051413",
      "WD-2026050601": "FL-2026050614"
    };

    return team.transactions.rows.map(row => {
      const typeMap = {
        "锁资": { direction: "冻结", payMethod: "余额支付", channel: "平台余额", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: row[4].includes("解冻") ? "已解冻" : "冻结中", source: "B端" },
        "预算划拨": { direction: "转账", payMethod: "余额支付", channel: "平台余额", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: "已入账", source: "管理后台" },
        "结算": { direction: "支出", payMethod: "余额支付", channel: "平台余额", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: "已结算", source: "系统任务" },
        "退款": { direction: "退回", payMethod: "原路退回", channel: "平台余额", tradeStatus: "已退款", tradeStatusTone: row[4].includes("处理") ? "orange" : "green", fundStatus: row[4].includes("处理") ? "待入账" : "已入账", source: "管理后台" },
        "充值": { direction: "收入", payMethod: row[2].includes("银行") ? "银行卡" : "余额支付", channel: row[2].includes("企业总池") ? "平台余额" : "支付宝官方直连", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: "已入账", source: "B端" },
        "提现": { direction: "支出", payMethod: "余额支付", channel: "银行卡转账", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: "提现成功", source: "承制方端" },
        "积分兑换": { direction: "支出", payMethod: "余额支付", channel: "平台余额", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: "已入账", source: "B端" }
      };
      const extra = typeMap[row[1]] || { direction: "支出", payMethod: "余额支付", channel: "平台余额", tradeStatus: "支付成功", tradeStatusTone: "green", fundStatus: row[4], source: "B端" };

      return {
        flowNo: flowNoMap[row[6]] || `FL-${row[6]}`,
        time: row[0],
        type: row[1],
        from: row[2],
        to: row[3],
        status: row[4],
        amount: row[5],
        bizNo: row[6],
        orderNo: resolveOrderNo(teamKey, row[6]),
        voucherNo: row[7],
        operator,
        bizName: orderTitleMap[row[6]] || row[6],
        direction: extra.direction,
        payMethod: extra.payMethod,
        channel: extra.channel,
        tradeStatus: extra.tradeStatus,
        tradeStatusTone: extra.tradeStatusTone,
        fundStatus: extra.fundStatus,
        source: extra.source
      };
    });
  }

  function buildFundFlowRows(team) {
    if (team.name.includes("短剧")) {
      return [
        ["FF-2026052601", "短剧制作中心", "团队预算账户", "可用余额", "发布需求冻结", "出账", "-¥ 48,000", "¥ 2,188,064", "¥ 2,140,064", "OD-2026052607", "FL-2026052601", "成功", "2026-05-26 18:14"],
        ["FF-2026052602", "短剧制作中心", "团队预算账户", "冻结余额", "发布需求冻结", "冻结增加", "+¥ 48,000", "¥ 138,200", "¥ 186,200", "OD-2026052607", "FL-2026052601", "成功", "2026-05-26 18:14"],
        ["FF-2026052501", "短剧制作中心", "团队预算账户", "可用余额", "预算划拨入账", "入账", "+¥ 200,000", "¥ 1,940,064", "¥ 2,140,064", "AL-2026052502", "FL-2026052502", "成功", "2026-05-25 15:08"],
        ["FF-2026052401", "短剧制作中心", "团队预算账户", "可用余额", "验收结算扣款", "出账", "-¥ 28,000", "¥ 2,168,064", "¥ 2,140,064", "OD-2026051809", "FL-2026052403", "成功", "2026-05-24 11:41"],
        ["FF-2026052101", "短剧制作中心", "团队预算账户", "可用余额", "退款回补入账", "入账", "+¥ 6,000", "¥ 2,134,064", "¥ 2,140,064", "RF-2026052103", "FL-2026052104", "处理中", "2026-05-21 16:00"],
        ["FF-2026051801", "短剧制作中心", "团队预算账户", "可用余额", "充值入账", "入账", "+¥ 50,000", "¥ 2,084,064", "¥ 2,134,064", "RC-2026051801", "FL-2026051806", "成功", "2026-05-18 09:32"],
        ["FF-2026051802", "短剧制作中心", "团队预算账户", "可用余额", "积分兑换扣款", "出账", "-¥ 2,000", "¥ 2,136,064", "¥ 2,134,064", "PT-2026051801", "FL-2026051807", "成功", "2026-05-18 09:36"]
      ];
    }

    return [
      ["FF-2026052603", "市场宣传组", "团队预算账户", "可用余额", "验收结算扣款", "出账", "-¥ 22,000", "¥ 646,300", "¥ 624,300", "OD-2026052603", "FL-2026052609", "成功", "2026-05-26 09:20"],
      ["FF-2026052402", "市场宣传组", "团队预算账户", "可用余额", "退款回补入账", "入账", "+¥ 8,000", "¥ 616,300", "¥ 624,300", "RF-2026052401", "FL-2026052410", "处理中", "2026-05-24 13:50"],
      ["FF-2026052201", "市场宣传组", "团队预算账户", "冻结余额", "发布需求冻结", "冻结增加", "+¥ 12,000", "¥ 70,000", "¥ 82,000", "OD-2026052202", "FL-2026052211", "成功", "2026-05-22 10:03"],
      ["FF-2026051401", "市场宣传组", "团队预算账户", "可用余额", "充值入账", "入账", "+¥ 100,000", "¥ 524,300", "¥ 624,300", "RC-2026051401", "FL-2026051412", "成功", "2026-05-14 10:08"],
      ["FF-2026051402", "市场宣传组", "团队预算账户", "可用余额", "积分兑换扣款", "出账", "-¥ 1,000", "¥ 625,300", "¥ 624,300", "PT-2026051401", "FL-2026051413", "成功", "2026-05-14 10:12"]
    ];
  }

  function parsePoints(value) {
    return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
  }

  function getPointsView(team, accountScope = "team") {
    const isDrama = team.name.includes("短剧");
    const isPersonal = accountScope === "personal";
    const personal = getPersonalAccountView(team);
    const balance = isPersonal ? parsePoints(personal.points) : (isDrama ? 12800 : 6400);
    const accountName = isPersonal ? personal.name : `${team.name} - 团队积分账户`;
    const accountId = isPersonal ? personal.accountId.replace("WAL", "PTS") : (isDrama ? "PTS-TEAM-10021" : "PTS-TEAM-10057");
    const rows = isPersonal
      ? [
        ["PF-2026052701", "承接奖励积分", "获得", "+1,200", "—", "—", "SET-2026052701", "成功", "2026-05-27 09:30"],
        ["PF-2026052402", "AIGC token 消费", "消耗", "-680", "—", "8,500", "AI-2026052402", "成功", "2026-05-24 16:40"],
        ["PF-2026051803", "余额兑换积分", "获得", "+5,000", "¥ 500", "—", isDrama ? "PT-2026051803" : "PT-2026051403", "成功", "2026-05-18 09:36"],
        ["PF-2026051506", "AIGC token 消费", "消耗", "-1,320", "—", "16,200", "AI-2026051506", "成功", "2026-05-15 14:21"]
      ]
      : [
        ["PF-2026052801", "AIGC token 消费", "消耗", isDrama ? "-3,200" : "-1,400", "—", isDrama ? "42,000" : "18,000", "AI-2026052801", "成功", "2026-05-28 11:36"],
        ["PF-2026051801", "余额兑换积分", "获得", isDrama ? "+20,000" : "+10,000", isDrama ? "¥ 2,000" : "¥ 1,000", "—", isDrama ? "PT-2026051801" : "PT-2026051401", "成功", isDrama ? "2026-05-18 09:36" : "2026-05-14 10:08"],
        ["PF-2026051609", "AIGC token 消费", "消耗", isDrama ? "-2,500" : "-900", "—", isDrama ? "31,000" : "12,000", "AI-2026051609", "成功", "2026-05-16 17:20"],
        ["PF-2026051207", "消费失败退回", "退回", isDrama ? "+500" : "+300", "—", isDrama ? "6,000" : "3,200", "AI-2026051207", "已退回", "2026-05-12 19:08"]
      ];
    const consumption = isPersonal
      ? [
        ["AI-2026052402", "智能分镜生成", "AIGC 创作台", "8,500", "680", "分镜草稿 v2", "成功", "2026-05-24 16:40"],
        ["AI-2026051506", "文案扩写", "AIGC 创作台", "16,200", "1,320", "广告脚本文案", "成功", "2026-05-15 14:21"]
      ]
      : [
        ["AI-2026052801", isDrama ? "短剧口播脚本生成" : "活动海报文案生成", "天合 AIGC 平台", isDrama ? "42,000" : "18,000", isDrama ? "3,200" : "1,400", isDrama ? "修仙题材第 3 集脚本" : "6 月活动主视觉", "成功", "2026-05-28 11:36"],
        ["AI-2026051609", isDrama ? "角色图提示词优化" : "投放标题批量生成", "天合 AIGC 平台", isDrama ? "31,000" : "12,000", isDrama ? "2,500" : "900", isDrama ? "IP 海报系列" : "营销短视频制作包", "成功", "2026-05-16 17:20"],
        ["AI-2026051207", "视频脚本试算失败退回", "天合 AIGC 平台", isDrama ? "6,000" : "3,200", isDrama ? "500" : "300", "模型超时自动退回", "已退回", "2026-05-12 19:08"]
      ];
    const earned = rows
      .filter(row => row[2] === "获得" || row[2] === "退回")
      .reduce((sum, row) => sum + parsePoints(row[3]), 0);
    const used = rows
      .filter(row => row[2] === "消耗")
      .reduce((sum, row) => sum + Math.abs(parsePoints(row[3])), 0);

    return {
      accountScope: isPersonal ? "个人账户" : "团队账户",
      accountName,
      accountId,
      balance,
      earned,
      used,
      tokenEstimate: balance * 12,
      pending: isPersonal ? 0 : (isDrama ? 300 : 120),
      rows,
      consumption
    };
  }

  function buildBillDetailRows(team) {
    if (team.name.includes("短剧")) {
      return [
        { time: "2026-05-26 18:14", title: "发布需求冻结预算", type: "冻结", relatedBiz: "OD-2026052607 / 三集短剧解说视频", direction: "冻结", amount: "冻结 ¥48,000", status: "冻结中", statusTone: "blue", desc: "需求发布后，系统已冻结对应团队预算。", fundNo: "FF-2026052601 / FF-2026052602", tradeNo: "FL-2026052601", account: "短剧制作中心 - 团队预算账户", counterparty: "平台锁资池", refundAction: "申请退款", refundHint: "该订单仍处于锁资中，可从原订单发起取消或退款申请。" },
        { time: "2026-05-25 15:08", title: "团队预算到账", type: "充值", relatedBiz: "AL-2026052502 / 企业预算补充", direction: "收入", amount: "+¥ 200,000", status: "成功", statusTone: "green", desc: "企业总池划拨预算到账，可用于后续订单支付和预算冻结。", fundNo: "FF-2026052501", tradeNo: "FL-2026052502", account: "短剧制作中心 - 团队预算账户", counterparty: "企业总池", refundAction: "不可退款", refundHint: "预算划拨入账不支持在账单内申请退款。" },
        { time: "2026-05-24 11:41", title: "订单验收结算", type: "消费", relatedBiz: "OD-2026051809 / IP 海报系列", direction: "支出", amount: "-¥ 28,000", status: "成功", statusTone: "green", desc: "订单验收通过后，冻结预算完成结算并支付给承制方。", fundNo: "FF-2026052401", tradeNo: "FL-2026052403", account: "短剧制作中心 - 团队预算账户", counterparty: "星辰创作工作室", refundAction: "联系客服退款", refundHint: "该订单已结算，自助退款不可用，如有争议请联系客服处理。" },
        { time: "2026-05-21 16:00", title: "退款到账", type: "退款", relatedBiz: "RF-2026052103 / 海报重制争议退款", direction: "收入", amount: "+¥ 6,000", status: "处理中", statusTone: "orange", desc: "订单争议退款正在处理，退款金额将回补到团队预算账户。", fundNo: "FF-2026052101", tradeNo: "FL-2026052104", account: "短剧制作中心 - 团队预算账户", counterparty: "平台退款池", refundAction: "查看退款进度", refundHint: "退款正在处理，可查看退款单进度。" },
        { time: "2026-05-18 09:32", title: "充值成功", type: "充值", relatedBiz: "RC-2026051801 / 团队预算充值", direction: "收入", amount: "+¥ 50,000", status: "成功", statusTone: "green", desc: "在线充值支付成功，充值金额已进入团队预算账户。", fundNo: "FF-2026051801", tradeNo: "FL-2026051806", account: "短剧制作中心 - 团队预算账户", counterparty: "招商银行尾号 2048", refundAction: "联系客服退款", refundHint: "充值异常或重复充值可联系客服处理，已消费或已冻结金额不可直接退回。" },
        { time: "2026-05-18 09:36", title: "积分兑换成功", type: "消费", relatedBiz: "PT-2026051801 / 团队积分兑换", direction: "支出", amount: "-¥ 2,000", status: "成功", statusTone: "green", desc: "团队可用余额兑换为平台积分，积分已入账。", fundNo: "FF-2026051802", tradeNo: "FL-2026051807", account: "短剧制作中心 - 团队预算账户", counterparty: "平台积分账户", refundAction: "不可退款", refundHint: "积分兑换成功后不支持退现金。" }
      ];
    }

    return [
      { time: "2026-05-26 09:20", title: "订单验收结算", type: "消费", relatedBiz: "OD-2026052603 / 营销短视频制作包", direction: "支出", amount: "-¥ 22,000", status: "成功", statusTone: "green", desc: "订单验收通过后，团队预算完成结算扣款。", fundNo: "FF-2026052603", tradeNo: "FL-2026052609", account: "市场宣传组 - 团队预算账户", counterparty: "内容承接方", refundAction: "联系客服退款", refundHint: "该订单已结算，自助退款不可用，如有争议请联系客服处理。" },
      { time: "2026-05-24 13:50", title: "退款到账", type: "退款", relatedBiz: "RF-2026052401 / 视频改版取消退款", direction: "收入", amount: "+¥ 8,000", status: "处理中", statusTone: "orange", desc: "取消改版后发起退款，退款金额回补团队预算。", fundNo: "FF-2026052402", tradeNo: "FL-2026052410", account: "市场宣传组 - 团队预算账户", counterparty: "平台退款池", refundAction: "查看退款进度", refundHint: "退款正在处理，可查看退款单进度。" },
      { time: "2026-05-22 10:03", title: "发布需求冻结预算", type: "冻结", relatedBiz: "OD-2026052202 / 海报素材包", direction: "冻结", amount: "冻结 ¥12,000", status: "冻结中", statusTone: "blue", desc: "需求发布后冻结对应预算，等待履约推进。", fundNo: "FF-2026052201", tradeNo: "FL-2026052211", account: "市场宣传组 - 团队预算账户", counterparty: "平台锁资池", refundAction: "申请退款", refundHint: "该订单仍处于锁资中，可从原订单发起取消或退款申请。" },
      { time: "2026-05-14 10:08", title: "充值成功", type: "充值", relatedBiz: "RC-2026051401 / 团队预算充值", direction: "收入", amount: "+¥ 100,000", status: "成功", statusTone: "green", desc: "企业总池划拨预算到账。", fundNo: "FF-2026051401", tradeNo: "FL-2026051412", account: "市场宣传组 - 团队预算账户", counterparty: "企业总池", refundAction: "不可退款", refundHint: "企业总池划拨不支持在账单内申请退款。" },
      { time: "2026-05-14 10:12", title: "积分兑换成功", type: "消费", relatedBiz: "PT-2026051401 / 团队积分兑换", direction: "支出", amount: "-¥ 1,000", status: "成功", statusTone: "green", desc: "团队可用余额兑换为平台积分，积分已入账。", fundNo: "FF-2026051402", tradeNo: "FL-2026051413", account: "市场宣传组 - 团队预算账户", counterparty: "平台积分账户", refundAction: "不可退款", refundHint: "积分兑换成功后不支持退现金。" }
    ];
  }

  function buildLinkedBillDetailRows(team) {
    const teamKey = getTeamKeyByTeam(team);
    return buildBillDetailRows(team).map(row => {
      const bizNo = extractBizNos(row.relatedBiz)[0] || "";
      const orderNo = resolveOrderNo(teamKey, bizNo);
      return {
        ...row,
        bizNo,
        orderNo,
        orderHref: orderNo ? buildOrderDetailHref(teamKey, bizNo, "bills", orderNo) : ""
      };
    });
  }

  function lineChartSVG(labels, arrA, arrB, colorA, colorB) {
    const width = 560;
    const height = 220;
    const padX = 26;
    const padTop = 18;
    const padBottom = 34;
    const padRight = 20;
    const max = Math.max(...arrA, ...(arrB || arrA)) * 1.12;
    const usableW = width - padX - padRight;
    const usableH = height - padTop - padBottom;

    function point(idx, val) {
      const x = padX + (usableW / Math.max(labels.length - 1, 1)) * idx;
      const y = padTop + usableH - (val / max) * usableH;
      return [x, y];
    }

    function poly(values) {
      return values.map((val, idx) => point(idx, val).join(",")).join(" ");
    }

    function area(values) {
      const pts = values.map((val, idx) => point(idx, val));
      const start = `${pts[0][0]},${height - padBottom}`;
      const end = `${pts[pts.length - 1][0]},${height - padBottom}`;
      return [start].concat(pts.map(p => p.join(","))).concat(end).join(" ");
    }

    const grid = [0, .25, .5, .75, 1].map(step => {
      const y = padTop + usableH - usableH * step;
      return `<line x1="${padX}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="rgba(18,28,52,.08)" stroke-dasharray="4 6"/>`;
    }).join("");

    const labelsSvg = labels.map((label, idx) => {
      const x = point(idx, 0)[0];
      return `<text x="${x}" y="${height - 12}" text-anchor="middle" fill="#69758d" font-size="11">${label}</text>`;
    }).join("");

    const second = arrB ? `
      <polygon points="${area(arrB)}" fill="rgba(0,166,166,.10)"></polygon>
      <polyline points="${poly(arrB)}" fill="none" stroke="${colorB}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
    ` : "";

    return `
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="220" role="img" aria-label="趋势图">
        ${grid}
        <polygon points="${area(arrA)}" fill="rgba(31,87,255,.12)"></polygon>
        <polyline points="${poly(arrA)}" fill="none" stroke="${colorA}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></polyline>
        ${second}
        ${labelsSvg}
      </svg>
    `;
  }

  function donutSVG(segments) {
    const size = 220;
    const r = 78;
    const c = 2 * Math.PI * r;
    let offset = 0;
    const colors = ["#1f57ff", "#00a6a6", "#ff9b45", "#6f46ff"];
    const circles = segments.map((value, idx) => {
      const dash = c * value / 100;
      const node = `<circle cx="110" cy="110" r="${r}" fill="none" stroke="${colors[idx]}" stroke-width="20" stroke-linecap="round" stroke-dasharray="${dash} ${c - dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 110 110)"></circle>`;
      offset += dash;
      return node;
    }).join("");
    return `
      <svg viewBox="0 0 ${size} ${size}" width="100%" height="220" role="img" aria-label="占比图">
        <circle cx="110" cy="110" r="${r}" fill="none" stroke="rgba(18,28,52,.06)" stroke-width="20"></circle>
        ${circles}
        <text x="110" y="102" text-anchor="middle" font-size="14" fill="#69758d">预算结构</text>
        <text x="110" y="128" text-anchor="middle" font-size="26" font-weight="800" fill="#182236">${segments[0]}%</text>
      </svg>
    `;
  }

  function metricCards(items, foot) {
    return items.map(item => `
      <div class="surface metric-card">
        <div class="metric-label">${item[0] || item.label}</div>
        <div class="metric-value">${item[1] || item.value}</div>
        <div class="metric-foot">${item.foot || item[2] || foot || ""}</div>
      </div>
    `).join("");
  }

  function buildButtons(actions) {
    return (actions || []).map(action => {
      if (action.modal) {
        return `<button class="btn ${action.tone || ""}" type="button" data-open-recharge-modal="${action.modal}">${action.label}</button>`;
      }
      if (action.modalType === "withdraw") {
        return `<button class="btn ${action.tone || ""}" type="button" data-open-withdraw-modal="${action.modalValue}">${action.label}</button>`;
      }
      return `<a class="btn ${action.tone || ""}" href="${action.href}">${action.label}</a>`;
    }).join("");
  }

  function renderColumnConfigModal(page) {
    const config = COLUMN_CONFIGS[page];
    if (!config) return "";
    const state = columnState[page];

    return `
      <div class="config-modal-mask" data-config-modal="${page}" hidden>
        <div class="config-modal">
          <div class="config-modal-head">
            <div>
              <h3>${config.title}</h3>
              <p>勾选列表信息可定制展示内容，当前原型支持按分组控制表头展示。</p>
            </div>
            <button class="config-close" type="button" data-close-column-config="${page}">×</button>
          </div>
          <div class="info-banner" style="margin-bottom:20px;">
            <ul>
              <li>表格空间有限时，建议默认只展示关键字段，其余字段放到详情或后台高级页。</li>
            </ul>
          </div>
          <div class="config-toolbar">
            <button class="btn" type="button" data-select-all-columns="${page}">全选</button>
            <button class="text-link-btn" type="button" data-reset-column-config="${page}">恢复默认设置</button>
          </div>
          <div class="config-group-list">
            ${config.groups.map(group => `
              <div class="config-group">
                <div class="config-group-head">
                  <strong>${group.name}</strong>
                  <span class="drag-indicator">⋮⋮</span>
                </div>
                <div class="config-options">
                  ${group.columns.map(column => `
                    <label class="config-option">
                      <input type="checkbox" data-column-toggle="${page}" value="${column[0]}" ${state[column[0]] ? "checked" : ""}>
                      <span>${column[1]}</span>
                    </label>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
          <div class="config-modal-foot">
            <button class="btn primary" type="button" data-apply-column-config="${page}">确定</button>
            <button class="btn" type="button" data-close-column-config="${page}">取消</button>
          </div>
        </div>
      </div>
    `;
  }

  function navLink(page, current) {
    const cfg = PAGES[page];
    return `<a class="nav-link ${current === page ? "active" : ""}" href="${pageToFile(page)}"><span class="nav-icon">${cfg.icon || "•"}</span><span>${cfg.title}</span></a>`;
  }

  function pageToFile(page) {
    const map = {
      index: "index.html",
      overview: "overview.html",
      accounts: "accounts.html",
      transactions: "transactions.html",
      fundFlows: "fund-flows.html",
      bills: "bills.html",
      points: "points.html",
      invoices: "invoices.html",
      recharge: "recharge.html",
      withdraw: "withdraw.html",
      security: "security.html",
      orderDetail: "order-finance-detail.html",
      adminOverview: "admin-overview.html",
      adminBudget: "admin-budget.html",
      adminAudit: "admin-audit.html",
      adminSettlement: "admin-settlement.html",
      adminReconciliation: "admin-reconciliation.html",
      adminReconciliationDiffs: "admin-reconciliation-differences.html",
      adminReconciliationDetail: "admin-reconciliation-detail.html"
    };
    return map[page] || "index.html";
  }

  Object.assign(PAGES.overview, { icon: "◎" });
  Object.assign(PAGES.accounts, { icon: "◌" });
  Object.assign(PAGES.transactions, { icon: "↹" });
  Object.assign(PAGES.fundFlows, { icon: "≋" });
  Object.assign(PAGES.bills, { icon: "◫" });
  Object.assign(PAGES.points, { icon: "◒" });
  Object.assign(PAGES.invoices, { icon: "▣" });
  Object.assign(PAGES.recharge, { icon: "＋" });
  Object.assign(PAGES.withdraw, { icon: "－" });
  Object.assign(PAGES.security, { icon: "⌘" });
  Object.assign(PAGES.orderDetail, { icon: "≣" });
  Object.assign(PAGES.adminOverview, { icon: "◍" });
  Object.assign(PAGES.adminBudget, { icon: "▤" });
  Object.assign(PAGES.adminAudit, { icon: "▥" });
  Object.assign(PAGES.adminSettlement, { icon: "▦" });
  Object.assign(PAGES.adminReconciliation, { icon: "◫" });
  Object.assign(PAGES.adminReconciliationDiffs, { icon: "≠" });
  Object.assign(PAGES.adminReconciliationDetail, { icon: "⊞" });

  function renderIndex() {
    return `
      <div class="hero-card">
        <div class="hero-grid">
          <div>
            <div class="hero-kicker">Prototype Directory</div>
            <h3 class="hero-title">资金中心多页面原型</h3>
            <div class="hero-balance">18</div>
            <div class="hero-caption">已拆成独立页面，便于逐页打磨细节，而不是继续在单页大文件里堆内容。</div>
          </div>
          <div class="hero-side">
            <div class="hero-side-card"><div class="label">用户端页面</div><div class="value">10 页</div><div class="sub">资金首页、账户总览、账单流水、交易流水、资金流水、充值、积分、发票、提现、账户设置。</div></div>
            <div class="hero-side-card"><div class="label">三层流水</div><div class="value">交易 / 资金 / 账单</div><div class="sub">交易事件、余额变化、用户账单三层分离展示。</div></div>
            <div class="hero-side-card"><div class="label">补充页面</div><div class="value">8 页</div><div class="sub">订单资金详情、财务后台和新增对账管理页面已拆分完成。</div></div>
          </div>
        </div>
      </div>
      <div class="grid-2">
        <div class="surface">
          <div class="surface-head"><div><h3>用户端资金中心</h3><p>面向团队、项目负责人、承接者</p></div></div>
          <div class="card-link-grid">
            ${[
              ["overview.html", "资金首页", "团队预算首页"],
              ["accounts.html", "账户总览", "资金归属与结构"],
              ["transactions.html", "交易流水", "记录交易事件"],
              ["fund-flows.html", "资金流水", "记录余额真实变化"],
              ["bills.html", "账单明细", "用户可读账单记录"],
              ["recharge.html", "充值中心", "补钱与到账状态"],
              ["points.html", "积分中心", "积分兑换与 AIGC 消费"],
              ["invoices.html", "发票中心", "可开票与发票归档"],
              ["withdraw.html", "提现管理", "收益提现记录"],
              ["security.html", "账户设置", "支付工具与校验"]
            ].map(item => `<a class="card-link" href="${item[0]}"><strong>${item[1]}</strong><span>${item[2]}</span></a>`).join("")}
          </div>
        </div>
        <div class="surface">
          <div class="surface-head"><div><h3>订单与后台</h3><p>补足业务页和治理视角</p></div></div>
          <div class="card-link-grid">
            ${[
              ["order-finance-detail.html", "订单资金详情", "锁资、结算、开票轨迹"],
              ["admin-overview.html", "财务总览", "企业总池和审批总览"],
              ["admin-budget.html", "预算管理", "团队预算矩阵"],
              ["admin-audit.html", "审核中心", "对公充值与提现审核"],
              ["admin-settlement.html", "结算与发票", "待结算与开票处理"],
              ["admin-reconciliation.html", "每日对账", "按日查看批次结果"],
              ["admin-reconciliation-differences.html", "差异明细", "集中查看和处理差异"],
              ["admin-reconciliation-detail.html", "对账批次详情", "批次汇总、明细与差异抽屉"]
            ].map(item => `<a class="card-link" href="${item[0]}"><strong>${item[1]}</strong><span>${item[2]}</span></a>`).join("")}
          </div>
          <div class="footer-note">逐页深化计划在 <a href="PAGE-ENRICHMENT-PLAN.md">PAGE-ENRICHMENT-PLAN.md</a>。</div>
        </div>
      </div>
    `;
  }

  function renderOverview(team, routeState = {}) {
    const teamKey = getTeamKeyByTeam(team);
    const monthlyRows = team.bills.monthly;
    const recentTone = status => status.includes("到账") || status.includes("结算") ? "green" : status.includes("处理") || status.includes("锁资") ? "orange" : "blue";
    const focusOrderNo = routeState.orderNo || resolveOrderNo(teamKey, routeState.bizNo);
    const focusBizNo = routeState.bizNo || focusOrderNo;
    const focusDetailHref = focusOrderNo ? buildOrderDetailHref(teamKey, focusBizNo, "overview", focusOrderNo) : "";
    const recentRows = team.overview.recent.map(row => {
      const orderNo = resolveOrderNo(teamKey, row[5]);
      return {
        time: row[0],
        type: row[1],
        title: row[2],
        amount: row[3],
        status: row[4],
        bizNo: row[5],
        orderNo,
        orderHref: orderNo ? buildOrderDetailHref(teamKey, row[5], "overview", orderNo) : ""
      };
    });
    const pendingRows = team.overview.pending.map(item => {
      const bizNo = extractBizNos(item.meta)[0] || "";
      const orderNo = resolveOrderNo(teamKey, bizNo);
      return {
        ...item,
        bizNo,
        orderNo,
        orderHref: orderNo ? buildOrderDetailHref(teamKey, bizNo, "overview", orderNo) : ""
      };
    });
    return `
      ${focusOrderNo ? `
        <div class="notice-item ok" style="margin-bottom:16px;">
          <div class="notice-main">
            <strong>已定位到 ${focusOrderNo} 的总览入口</strong>
            <span>${routeState.from === "orderDetail" ? "你正在从订单资金详情返回总览。" : "当前高亮与该订单相关的最近资金动态。"}${focusBizNo && focusBizNo !== focusOrderNo ? ` 本次入口业务单号为 ${focusBizNo}。` : ""}</span>
          </div>
          <div class="table-actions">
            <a class="btn mini primary" href="${focusDetailHref}">回到订单详情</a>
            <a class="btn mini" href="${buildPageUrl("transactions", { team: teamKey, orderNo: focusOrderNo }, { from: "overview", bizNo: focusBizNo })}">查看关联流水</a>
          </div>
        </div>
      ` : ""}
      <div class="info-banner">
        <ul>
          <li>资金总览用于查看当前团队预算、当月支出节奏、待处理事项和最近资金动态。</li>
          <li>本页展示的是总览信息；如需查看逐笔记录，请进入交易流水、资金流水或账单明细页面。</li>
          <li>当月账单仍在累计中，最终金额以次月 3 日出具的正式账单为准。</li>
        </ul>
      </div>
      <div class="grid-4" style="margin-bottom:16px;">
        <div class="surface metric-card">
          <div class="metric-label">团队可用预算</div>
          <div class="metric-value">${fmtMoney(team.overview.available)}</div>
          <div class="metric-foot">${team.name} · ${team.accountLabel}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">冻结金额</div>
          <div class="metric-value">${fmtMoney(team.overview.frozen)}</div>
          <div class="metric-foot">待入账 ${fmtMoney(team.overview.pending)}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">${team.overview.metrics[0].label}</div>
          <div class="metric-value">${team.overview.metrics[0].value}</div>
          <div class="metric-foot">${team.overview.metrics[0].foot}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">可开票金额</div>
          <div class="metric-value">${fmtMoney(team.overview.invoiceReady)}</div>
          <div class="metric-foot">${team.overview.metrics[2].foot}</div>
        </div>
      </div>

      <div class="form-card compact-filters" data-filter-panel="overviewSummary">
        <div class="form-grid">
          <div class="field"><label>团队</label><select><option>${team.name}</option></select></div>
          <div class="field"><label>统计周期</label><select><option>最近 12 个月</option><option>本月</option><option>本季度</option></select></div>
          <div class="field"><label>账户口径</label><select><option>${team.accountLabel}</option><option>全部账户</option></select></div>
          <div class="field advanced-filter"><label>状态筛选</label><select><option>全部</option><option>正常</option><option>锁资中</option><option>待开票</option></select></div>
          <div class="field advanced-filter"><label>月份</label><input type="text" value="2025-06 至 2026-05"></div>
        </div>
        <div class="form-actions">
          <button class="btn primary" type="button">搜索</button>
          <button class="btn" type="button">重置</button>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="overviewSummary">更多筛选</button>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head">
          <div><h3>月度总览</h3><p>按月查看收入、支出、退款回补、服务费、净额与可开票金额</p></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>月份</th><th>本月收入</th><th>本月支出</th><th>退款回补</th><th>平台服务费</th><th>净额</th><th>可开票金额</th><th>操作</th></tr></thead>
            <tbody>${monthlyRows.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td><td>${row[6]}</td><td><div class="table-actions"><a class="btn mini" href="bills.html">查看账单</a><a class="btn mini" href="transactions.html">查看流水</a></div></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px;">
        <div class="surface">
          <div class="surface-head"><div><h3>待处理事项</h3><p>当前团队需要优先关注的资金动作</p></div></div>
          <div class="notice-list">
            ${pendingRows.map(item => `<div class="notice-item ${item.kind}"><div class="notice-main"><strong>${item.title}</strong><span>${item.meta}</span></div>${item.orderHref ? `<a class="btn mini ${item.orderNo === focusOrderNo ? "primary" : ""}" href="${item.orderHref}">${item.action}</a>` : `<button class="btn mini" type="button">${item.action}</button>`}</div>`).join("")}
          </div>
        </div>
        <div class="surface">
          <div class="surface-head"><div><h3>最近资金动态</h3><p>最近发生的预算、锁资、退款与结算动作</p></div></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>发生时间</th><th>类型</th><th>业务名称</th><th>金额</th><th>状态</th><th>关联业务单号</th><th>操作</th></tr></thead>
              <tbody>${recentRows.map(row => `<tr class="${focusBizNo && (row.bizNo === focusBizNo || row.orderNo === focusOrderNo) ? "row-focus" : ""}"><td>${row.time}</td><td>${row.type}</td><td>${row.title}</td><td>${row.amount}</td><td><span class="tag ${recentTone(row.status)}">${row.status}</span></td><td>${row.orderHref ? `<a class="text-link" href="${row.orderHref}">${row.bizNo}</a>` : row.bizNo}</td><td>${row.orderHref ? `<a class="btn mini ${row.orderNo === focusOrderNo ? "primary" : ""}" href="${row.orderHref}">查看订单</a>` : `<span class="tiny">仅总览展示</span>`}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function getPersonalAccountView(team) {
    const account = team.accounts.find(item => item.badge.includes("个人")) || team.accounts[1] || team.accounts[0];
    const isDrama = team.name.includes("短剧");
    return {
      accountId: isDrama ? "WAL-PER-20018" : "WAL-PER-20057",
      name: account.name,
      owner: "当前用户",
      status: "正常",
      createdAt: "2025-11-08 10:18",
      updatedAt: team.recharge.accountInfo.updatedAt,
      available: team.withdraw.available,
      withdrawing: team.withdraw.summary[2][1],
      pendingSettlement: isDrama ? "¥ 17,800" : "¥ 3,100",
      totalIncome: team.withdraw.summary[0][1],
      totalWithdraw: team.withdraw.summary[1][1],
      points: isDrama ? "4,200 分" : "1,800 分",
      billRows: [
        { time: "2026-05-27 09:30", title: "承接方结算收入", type: "收入", relatedBiz: isDrama ? "SET-2026052701 / 解说视频交付结算" : "SET-2026052702 / 素材制作结算", direction: "收入", amount: isDrama ? "+¥ 17,800" : "+¥ 3,100", status: "成功", statusTone: "green" },
        { time: "2026-05-21 14:02", title: "提现申请提交", type: "提现", relatedBiz: `${team.withdraw.records[0][1]} / 收益提现`, direction: "支出", amount: team.withdraw.records[0][2].replace("¥", "-¥"), status: team.withdraw.records[0][3], statusTone: team.withdraw.records[0][3].includes("审核") ? "orange" : "green" },
        { time: "2026-05-18 09:36", title: "积分兑换成功", type: "消费", relatedBiz: isDrama ? "PT-2026051801 / 个人积分兑换" : "PT-2026051401 / 个人积分兑换", direction: "支出", amount: isDrama ? "-¥ 2,000" : "-¥ 1,000", status: "成功", statusTone: "green" }
      ]
    };
  }

  function renderAccounts(team, accountScope = "team") {
    const teamAccount = team.accounts.find(item => item.current) || team.accounts[0];
    const personalAccount = getPersonalAccountView(team);
    const accountViews = [
      {
        key: "personal",
        label: "个人账户",
        active: accountScope === "personal",
        accountId: personalAccount.accountId,
        name: personalAccount.name,
        type: "个人",
        owner: personalAccount.owner,
        status: personalAccount.status,
        createdAt: personalAccount.createdAt,
        updatedAt: personalAccount.updatedAt,
        metrics: [
          ["可提现金额", personalAccount.available, "withdrawable_amount"],
          ["提现中金额", personalAccount.withdrawing, "withdrawing_amount"],
          ["待结算收入", personalAccount.pendingSettlement, "pending_settlement_amount"],
          ["累计收入", personalAccount.totalIncome, "total_income_amount"],
          ["累计提现", personalAccount.totalWithdraw, "total_withdraw_amount"],
          ["积分余额", personalAccount.points, "points_balance"]
        ]
      },
      {
        key: "team",
        label: "团队账户",
        active: accountScope !== "personal",
        accountId: team.recharge.accountInfo.walletId,
        name: teamAccount.name,
        type: "团队",
        owner: team.name,
        status: "正常",
        createdAt: "2025-11-08 10:18",
        updatedAt: team.recharge.accountInfo.updatedAt,
        metrics: [
          ["可用余额", teamAccount.stats[0]?.[1] || fmtMoney(team.overview.available), "available_balance"],
          ["冻结余额", teamAccount.stats[1]?.[1] || fmtMoney(team.overview.frozen), "frozen_balance"],
          ["待结算金额", team.recharge?.accountInfo?.pendingSettlement || fmtMoney(team.overview.pending), "pending_settlement_amount"],
          ["累计充值", team.recharge.records.reduce((sum, row) => sum + parseMoney(row[2]), 0), "total_recharge_amount"],
          ["累计支出", team.overview.metrics[0].value, "total_expense_amount"],
          ["退款回补", team.name.includes("短剧") ? "¥ 12,000" : "¥ 8,000", "refund_return_amount"],
          ["可开票金额", fmtMoney(team.overview.invoiceReady), "invoice_available_amount"],
          ["积分余额", team.name.includes("短剧") ? "12,800 分" : "6,400 分", "points_balance"]
        ]
      }
    ];
    const activeAccount = accountViews.find(item => item.active);
    const sourceBillRows = accountScope === "personal"
      ? personalAccount.billRows
      : buildBillDetailRows(team);
    const billRows = sourceBillRows.slice(0, 10).map(row => ({
      ...row,
      billNo: `BILL-${row.time.slice(0, 10).replace(/[^\d]/g, "")}-${row.relatedBiz.slice(0, 2)}`,
      role: accountScope === "personal" ? "承接方" : row.title.includes("结算") || row.title.includes("收入") ? "承接方" : row.title.includes("平台") ? "平台" : "需求方"
    }));
    const risks = [
      { kind: "ok", title: "账户状态正常", meta: accountScope === "personal" ? "当前个人账户可接收结算收入并发起提现。" : "当前团队账户可充值、消费、冻结和申请开票。" },
      { kind: accountScope === "team" && team.overview.frozen > 0 ? "warn" : "ok", title: "存在冻结资金", meta: accountScope === "personal" ? "个人账户暂无冻结资金。" : `当前冻结余额 ${fmtMoney(team.overview.frozen)}，请关注锁资中的订单履约状态。` },
      { kind: personalAccount.withdrawing !== "¥ 0" ? "warn" : "ok", title: "存在提现处理中", meta: `提现中金额 ${personalAccount.withdrawing}，到账前不可重复提现。` },
      { kind: accountScope === "team" && team.invoices.summary[3][1] && !team.invoices.summary[3][1].startsWith("0") ? "warn" : "ok", title: "发票处理提醒", meta: accountScope === "personal" ? "个人账户暂无发票异常。" : `当前${team.invoices.summary[3][0]} ${team.invoices.summary[3][1]}。` }
    ];
    const funds = activeAccount.metrics;
    const isPersonalAccount = accountScope === "personal";
    const rechargeQuickAmounts = isPersonalAccount ? ["100", "500", "1,000", "5,000"] : team.recharge.operation.quickAmounts;
    const rechargePayMethods = isPersonalAccount ? ["在线支付", "银行卡"] : team.recharge.operation.payMethods;
    const rechargePayChannels = isPersonalAccount ? ["支付宝", "微信"] : team.recharge.operation.payChannels;
    const rechargeAmount = isPersonalAccount ? "1,000" : team.recharge.operation.amount;
    const rechargeNote = isPersonalAccount ? "个人账户余额补充" : team.recharge.operation.note;
    const rechargeUsage = isPersonalAccount
      ? "个人账户余额可用于积分兑换、个人服务购买等场景。"
      : "团队账户余额可用于发布需求、订单支付、预算冻结、退款回补和积分兑换。";
    return `
      <div class="info-banner">
        <ul>
          <li>账户总览先按账户归属区分个人账户和团队账户，用户加入多个团队时可切换不同团队账户。</li>
          <li>每个账户内部仍采用统一钱包模型，需求方和承接方资金行为通过业务角色区分。</li>
          <li>个人账户侧重收入、结算、提现；团队账户侧重充值、消费、冻结、退款和开票。</li>
        </ul>
      </div>

      <div class="surface">
        <div class="surface-head"><div><h3>当前账户信息</h3><p>${activeAccount.label}下的统一钱包账户</p></div><span class="tag green">${activeAccount.status}</span></div>
        <div class="detail-grid detail-grid-4">
          <div class="detail-item"><span class="detail-label">钱包账户 ID</span><strong class="detail-value">${activeAccount.accountId}</strong></div>
          <div class="detail-item"><span class="detail-label">账户名称</span><strong class="detail-value">${activeAccount.name}</strong></div>
          <div class="detail-item"><span class="detail-label">账户类型</span><strong class="detail-value">${activeAccount.type}</strong></div>
          <div class="detail-item"><span class="detail-label">账户归属</span><strong class="detail-value">${activeAccount.owner}</strong></div>
          <div class="detail-item"><span class="detail-label">账户状态</span><strong class="detail-value">${activeAccount.status}</strong></div>
          <div class="detail-item"><span class="detail-label">币种</span><strong class="detail-value">${team.recharge.accountInfo.currency}</strong></div>
          <div class="detail-item"><span class="detail-label">创建时间</span><strong class="detail-value">${activeAccount.createdAt}</strong></div>
          <div class="detail-item"><span class="detail-label">更新时间</span><strong class="detail-value">${activeAccount.updatedAt}</strong></div>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>资金总览</h3><p>统一账户下的可用、冻结、结算、提现、积分等资金科目</p></div></div>
        <div class="detail-grid detail-grid-4">
          ${funds.map(item => `<div class="detail-item"><span class="detail-label">${item[0]}</span><strong class="detail-value">${typeof item[1] === "number" ? fmtMoney(item[1]) : item[1]}</strong></div>`).join("")}
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>最近账单</h3><p>默认显示最近 10 条账单明细</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>账单编号</th><th>账单标题</th><th>业务角色</th><th>账单类型</th><th>收支方向</th><th>金额</th><th>状态</th><th>发生时间</th><th>操作</th></tr></thead>
            <tbody>${billRows.map(row => `<tr><td>${row.billNo}</td><td>${row.title}</td><td>${row.role}</td><td>${row.type}</td><td>${row.direction}</td><td class="${row.amount.startsWith("+") ? "amt-in" : row.amount.includes("冻结") ? "amt-warn" : "amt-out"}">${row.amount}</td><td><span class="tag ${row.statusTone}">${row.status}</span></td><td>${row.time}</td><td><a class="text-link" href="bills.html">查看详情</a></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>风险提示</h3><p>账户认证、余额、冻结、提现和发票异常提醒</p></div></div>
        <div class="notice-list">
          ${risks.map(item => `<div class="notice-item ${item.kind}"><div class="notice-main"><strong>${item.title}</strong><span>${item.meta}</span></div><span class="tag ${item.kind === "warn" ? "orange" : "green"}">${item.kind === "warn" ? "需关注" : "正常"}</span></div>`).join("")}
        </div>
      </div>

      <div class="recharge-modal-mask" data-recharge-modal="action" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>${isPersonalAccount ? "向个人账户充值" : "向团队账户充值"}</h3><p>${rechargeUsage}</p></div>
            <button class="config-close" type="button" data-close-recharge-modal="action">×</button>
          </div>
          <div class="recharge-modal-body">
            <div class="method-card recharge-modal-card">
              <span class="tag blue">${activeAccount.label}</span>
              <h4>${activeAccount.name}</h4>
              <p>钱包账户 ID：${activeAccount.accountId}，账户归属：${activeAccount.owner}</p>
              <div class="detail-grid detail-grid-2 compact-detail-grid">
                <div class="detail-item"><span class="detail-label">到账账户</span><strong class="detail-value">${activeAccount.name}</strong></div>
                <div class="detail-item"><span class="detail-label">账户类型</span><strong class="detail-value">${activeAccount.type}</strong></div>
                <div class="detail-item"><span class="detail-label">币种</span><strong class="detail-value">${team.recharge.accountInfo.currency}</strong></div>
                <div class="detail-item"><span class="detail-label">当前可用余额</span><strong class="detail-value">${isPersonalAccount ? personalAccount.available : teamAccount.stats[0]?.[1] || team.recharge.accountInfo.available}</strong></div>
              </div>
              <div class="field"><label>充值金额</label><input type="text" value="${rechargeAmount}"></div>
              <div class="field">
                <label>快捷充值金额</label>
                <div class="chip-row">${rechargeQuickAmounts.map(amount => `<button class="chip-button" type="button">¥ ${amount}</button>`).join("")}</div>
              </div>
              <div class="field"><label>支付方式</label><select>${rechargePayMethods.map(item => `<option>${item}</option>`).join("")}</select></div>
              <div class="field"><label>支付渠道</label><select>${rechargePayChannels.map(item => `<option>${item}</option>`).join("")}</select></div>
              <div class="field"><label>充值说明</label><input type="text" value="${rechargeNote}"></div>
            </div>
          </div>
          <div class="config-modal-foot">
            <button class="btn primary" type="button">确认充值</button>
            <button class="btn" type="button" data-close-recharge-modal="action">取消</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderTransactions(team, routeState = {}) {
    const teamKey = getTeamKeyByTeam(team);
    const rows = buildTransactionRows(team);
    const focusOrderNo = routeState.orderNo || resolveOrderNo(teamKey, routeState.bizNo);
    const focusBizNo = routeState.bizNo || focusOrderNo;
    const displayRows = focusOrderNo
      ? rows.filter(row => row.orderNo === focusOrderNo || row.bizNo === focusBizNo)
      : rows;
    const inflow = displayRows
      .filter(row => row.amount.startsWith("+"))
      .reduce((sum, row) => sum + parseMoney(row.amount), 0);
    const outflow = displayRows
      .filter(row => row.amount.startsWith("-"))
      .reduce((sum, row) => sum + Math.abs(parseMoney(row.amount)), 0);
    const locked = displayRows
      .filter(row => row.type === "锁资" && row.status.includes("锁资"))
      .reduce((sum, row) => sum + Math.abs(parseMoney(row.amount)), 0);
    const pendingCount = displayRows.filter(row => row.status.includes("处理") || row.status.includes("锁资")).length;
    return `
      ${focusOrderNo ? `
        <div class="notice-item ok" style="margin-bottom:16px;">
          <div class="notice-main">
            <strong>当前只展示 ${focusOrderNo} 的关联交易流水</strong>
            <span>${focusBizNo && focusBizNo !== focusOrderNo ? `入口业务单号为 ${focusBizNo}，已一并展示关联退款或回补记录。` : "当前筛选条件已定位到该订单相关的交易事件。"}${routeState.from === "orderDetail" ? " 你可以直接返回订单页继续追溯。" : ""}</span>
          </div>
          <div class="table-actions">
            <a class="btn mini primary" href="${buildOrderDetailHref(teamKey, focusBizNo, "transactions", focusOrderNo)}">返回订单详情</a>
            <a class="btn mini" href="${buildPageUrl("transactions", { team: teamKey })}">查看全部流水</a>
          </div>
        </div>
      ` : ""}
      <div class="info-banner">
        <ul>
          <li>交易流水只记录交易事件本身，不直接等同于账户余额变化，也不直接等同于用户账单展示。</li>
          <li>一条交易流水可能关联多条资金流水；用户端看到的账单明细通常是对交易流水和资金流水的聚合展示。</li>
          <li>退款、解冻、冲正、提现失败退回等动作，会通过原交易流水号或关联业务单号串联追溯。</li>
        </ul>
      </div>
      <div class="summary-strip" style="grid-template-columns:repeat(4,minmax(0,1fr));">
        <div class="summary-box"><div class="kicker">本期流入</div><div class="big">${fmtMoney(inflow)}</div></div>
        <div class="summary-box"><div class="kicker">本期流出</div><div class="big">${fmtMoney(outflow)}</div></div>
        <div class="summary-box"><div class="kicker">锁资中金额</div><div class="big">${fmtMoney(locked)}</div></div>
        <div class="summary-box"><div class="kicker">待处理记录</div><div class="big">${pendingCount} 笔</div></div>
      </div>
      <div class="form-card compact-filters" data-filter-panel="transactions">
        <div class="form-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));">
          <div class="field"><label>交易流水号</label><input type="text" placeholder="请输入交易流水号"></div>
          <div class="field"><label>原交易流水号</label><input type="text" placeholder="请输入原交易流水号"></div>
          <div class="field"><label>关联业务类型</label><select><option>全部业务类型</option><option>订单</option><option>充值单</option><option>提现单</option><option>退款单</option><option>划拨单</option><option>积分兑换单</option></select></div>
          <div class="field"><label>关联业务单号</label><input type="text" value="${focusBizNo || ""}" placeholder="请输入关联业务单号"></div>
          <div class="field"><label>流水类型</label><select><option>全部流水类型</option><option>充值</option><option>下单支付</option><option>预算冻结</option><option>预算解冻</option><option>验收结算</option><option>退款</option><option>提现</option><option>提现退回</option><option>平台调账</option><option>服务费扣除</option><option>积分兑换</option></select></div>
          <div class="field advanced-filter"><label>交易方向</label><select><option>全部方向</option><option>收入</option><option>支出</option><option>冻结</option><option>解冻</option><option>转账</option><option>退回</option></select></div>
          <div class="field advanced-filter"><label>支付方式</label><select><option>全部支付方式</option><option>余额支付</option><option>支付宝</option><option>微信</option><option>银行卡</option><option>积分</option><option>混合支付</option></select></div>
          <div class="field advanced-filter"><label>交易状态</label><select><option>全部交易状态</option><option>待支付</option><option>支付成功</option><option>支付失败</option><option>已关闭</option><option>已退款</option><option>部分退款</option></select></div>
          <div class="field advanced-filter"><label>资金处理状态</label><select><option>全部处理状态</option><option>待入账</option><option>已入账</option><option>冻结中</option><option>已解冻</option><option>已结算</option><option>提现处理中</option><option>提现成功</option><option>提现失败</option></select></div>
          <div class="field advanced-filter"><label>发生时间范围</label><select><option>2026-05-01 ~ 2026-05-31</option></select></div>
          <div class="field advanced-filter"><label>操作人</label><select><option>全部操作人</option><option>昭岚</option><option>陈思齐</option><option>系统任务</option></select></div>
        </div>
        <div class="form-actions">
          <a class="btn primary" href="#">搜索</a>
          <a class="btn" href="#">重置</a>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="transactions">更多筛选</button>
        </div>
      </div>
      <div class="soft-table-panel" style="margin-top:16px;">
        <div class="soft-table-head">
          <strong>交易流水列表</strong>
          <div class="table-head-actions">
            <span class="tiny">当前页展示 ${displayRows.length} 条记录</span>
            <button class="table-config-btn" type="button" data-open-column-config="transactions">配置列</button>
          </div>
        </div>
        <div class="table-wrap" style="border:none;border-radius:0;">
          <table data-table="transactions">
            <thead><tr><th data-col="flowNo">交易流水号</th><th data-col="type">流水类型</th><th data-col="direction">交易方向</th><th data-col="bizNo">关联业务单号</th><th data-col="bizName">业务名称</th><th data-col="time">发生时间</th><th data-col="from">付款方</th><th data-col="to">收款方</th><th data-col="payMethod">支付方式</th><th data-col="channel">支付渠道</th><th data-col="amount">交易金额</th><th data-col="tradeStatus">交易状态</th><th data-col="fundStatus">资金处理状态</th><th data-col="operator">操作人</th><th data-col="source">操作来源</th><th>操作</th></tr></thead>
            <tbody>
              ${displayRows.map(row => `
                <tr class="${focusBizNo && (row.bizNo === focusBizNo || row.orderNo === focusOrderNo) ? "row-focus" : ""}">
                  <td data-col="flowNo">${row.flowNo}</td>
                  <td data-col="type">${row.type}</td>
                  <td data-col="direction">${row.direction || "支出"}</td>
                  <td data-col="bizNo">${row.orderNo ? `<a class="text-link" href="${buildOrderDetailHref(teamKey, row.bizNo, "transactions", row.orderNo)}">${row.bizNo}</a>` : row.bizNo}</td>
                  <td data-col="bizName">${row.bizName}</td>
                  <td data-col="time">${row.time}</td>
                  <td data-col="from">${row.from}</td>
                  <td data-col="to">${row.to}</td>
                  <td data-col="payMethod">${row.payMethod || "余额支付"}</td>
                  <td data-col="channel">${row.channel || "平台余额"}</td>
                  <td data-col="amount" class="${row.amount.startsWith("+") ? "amt-in" : row.type === "锁资" ? "amt-warn" : "amt-out"}">${row.amount}</td>
                  <td data-col="tradeStatus"><span class="tag ${row.tradeStatusTone || "green"}">${row.tradeStatus || "支付成功"}</span></td>
                  <td data-col="fundStatus"><span class="tag ${row.status.includes("处理") ? "orange" : row.status.includes("锁资") ? "blue" : "green"}">${row.fundStatus || row.status}</span></td>
                  <td data-col="operator">${row.operator}</td>
                  <td data-col="source">${row.source || "B端"}</td>
                  <td>${row.orderNo ? `<a class="btn mini ${row.orderNo === focusOrderNo ? "primary" : ""}" href="${buildOrderDetailHref(teamKey, row.bizNo, "transactions", row.orderNo)}">查看订单</a>` : `<span class="tiny">仅流水记录</span>`}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="table-footbar">
          <div class="pager-meta">共 ${displayRows.length} 条</div>
          <div class="pager">
            <span class="pager-btn disabled">上一页</span>
            <span class="pager-btn active">1</span>
            <span class="pager-btn disabled">下一页</span>
          </div>
        </div>
      </div>
      ${renderColumnConfigModal("transactions")}
    `;
  }

  function renderFundFlows(team) {
    const rows = buildFundFlowRows(team);
    return `
      <div class="info-banner">
        <ul>
          <li>资金流水记录账户某个资金科目的真实余额变化，是钱包核算、财务追溯和客服排查的核心依据。</li>
          <li>一条交易流水可能对应多条资金流水，例如预算冻结会同时影响可用余额和冻结余额。</li>
          <li>每条资金流水都保留变动前余额、变动金额和变动后余额，便于追溯余额变化过程。</li>
        </ul>
      </div>
      <div class="summary-strip" style="grid-template-columns:repeat(4,minmax(0,1fr));">
        <div class="summary-box"><div class="kicker">资金流水条数</div><div class="big">${rows.length} 条</div></div>
        <div class="summary-box"><div class="kicker">冻结类流水</div><div class="big">${rows.filter(row => row[5].includes("冻结")).length} 条</div></div>
        <div class="summary-box"><div class="kicker">入账类流水</div><div class="big">${rows.filter(row => row[5] === "入账").length} 条</div></div>
        <div class="summary-box"><div class="kicker">成功率</div><div class="big">100%</div></div>
      </div>
      <div class="form-card compact-filters" data-filter-panel="fundFlows">
        <div class="form-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));">
          <div class="field"><label>资金流水号</label><input type="text" placeholder="请输入资金流水号"></div>
          <div class="field"><label>关联交易流水号</label><input type="text" placeholder="请输入关联交易流水号"></div>
          <div class="field"><label>账户主体</label><select><option>${team.name}</option></select></div>
          <div class="field"><label>账户类型</label><select><option>团队预算账户</option><option>个人收益账户</option><option>企业总账户</option></select></div>
          <div class="field"><label>资金科目</label><select><option>全部资金科目</option><option>可用余额</option><option>冻结余额</option><option>待结算余额</option><option>积分余额</option></select></div>
          <div class="field advanced-filter"><label>变动类型</label><select><option>全部变动类型</option><option>充值入账</option><option>发布需求冻结</option><option>取消需求解冻</option><option>验收结算扣款</option><option>退款入账</option><option>积分兑换扣款</option></select></div>
          <div class="field advanced-filter"><label>变动方向</label><select><option>全部方向</option><option>入账</option><option>出账</option><option>冻结增加</option><option>冻结减少</option></select></div>
          <div class="field advanced-filter"><label>关联业务单号</label><input type="text" placeholder="请输入关联业务单号"></div>
          <div class="field advanced-filter"><label>流水状态</label><select><option>全部流水状态</option><option>处理中</option><option>成功</option><option>失败</option><option>已冲正</option></select></div>
          <div class="field advanced-filter"><label>发生时间范围</label><select><option>2026-05-01 ~ 2026-05-31</option></select></div>
          <div class="field advanced-filter"><label>操作人</label><select><option>全部操作人</option><option>昭岚</option><option>陈思齐</option><option>系统任务</option></select></div>
        </div>
        <div class="form-actions">
          <a class="btn primary" href="#">搜索</a>
          <a class="btn" href="#">重置</a>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="fundFlows">更多筛选</button>
        </div>
      </div>
      <div class="soft-table-panel" style="margin-top:16px;">
        <div class="soft-table-head">
          <strong>资金流水列表</strong>
          <div class="table-head-actions">
            <span class="tiny">当前页展示 ${rows.length} 条记录</span>
            <button class="table-config-btn" type="button" data-open-column-config="fundFlows">配置列</button>
          </div>
        </div>
        <div class="table-wrap" style="border:none;border-radius:0;">
          <table data-table="fundFlows">
            <thead><tr><th data-col="fundFlowNo">资金流水号</th><th data-col="owner">账户主体</th><th data-col="accountType">账户类型</th><th data-col="subject">资金科目</th><th data-col="changeType">变动类型</th><th data-col="changeDirection">变动方向</th><th data-col="changeAmount">变动金额</th><th data-col="beforeBalance">变动前余额</th><th data-col="afterBalance">变动后余额</th><th data-col="bizNo">关联业务单号</th><th data-col="tradeFlowNo">关联交易流水号</th><th data-col="status">流水状态</th><th data-col="time">发生时间</th></tr></thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td data-col="fundFlowNo">${row[0]}</td>
                  <td data-col="owner">${row[1]}</td>
                  <td data-col="accountType">${row[2]}</td>
                  <td data-col="subject">${row[3]}</td>
                  <td data-col="changeType">${row[4]}</td>
                  <td data-col="changeDirection">${row[5]}</td>
                  <td data-col="changeAmount" class="${row[6].startsWith("+") ? "amt-in" : "amt-out"}">${row[6]}</td>
                  <td data-col="beforeBalance">${row[7]}</td>
                  <td data-col="afterBalance">${row[8]}</td>
                  <td data-col="bizNo">${row[9]}</td>
                  <td data-col="tradeFlowNo">${row[10]}</td>
                  <td data-col="status"><span class="tag ${row[11] === "处理中" ? "orange" : "green"}">${row[11]}</span></td>
                  <td data-col="time">${row[12]}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="table-footbar">
          <div class="pager-meta">共 ${rows.length} 条</div>
          <div class="pager">
            <span class="pager-btn disabled">上一页</span>
            <span class="pager-btn active">1</span>
            <span class="pager-btn disabled">下一页</span>
          </div>
        </div>
      </div>
      ${renderColumnConfigModal("fundFlows")}
    `;
  }

  function renderBills(team, routeState = {}) {
    const teamKey = getTeamKeyByTeam(team);
    const detailRows = buildLinkedBillDetailRows(team);
    const focusOrderNo = routeState.orderNo || resolveOrderNo(teamKey, routeState.bizNo);
    const focusBizNo = routeState.bizNo || focusOrderNo;
    const displayRows = focusOrderNo
      ? detailRows.filter(row => row.orderNo === focusOrderNo || row.bizNo === focusBizNo)
      : detailRows;
    const firstBill = displayRows[0] || detailRows[0];
    return `
      ${focusOrderNo ? `
        <div class="notice-item ok" style="margin-bottom:16px;">
          <div class="notice-main">
            <strong>当前只展示 ${focusOrderNo} 的关联账单</strong>
            <span>${focusBizNo && focusBizNo !== focusOrderNo ? `入口业务单号为 ${focusBizNo}，已自动串联关联订单账单。` : "当前账单视图已定位到该订单的冻结、结算或退款记录。"}${routeState.from === "orderDetail" ? " 关闭筛选后可回到完整账单列表。" : ""}</span>
          </div>
          <div class="table-actions">
            <a class="btn mini primary" href="${buildOrderDetailHref(teamKey, focusBizNo, "bills", focusOrderNo)}">返回订单详情</a>
            <a class="btn mini" href="${buildPageUrl("bills", { team: teamKey })}">查看全部账单</a>
          </div>
        </div>
      ` : ""}
      <div class="info-banner">
        <ul>
          <li>账单明细用于查看当前账户的充值、消费、冻结、退款、提现等资金记录。</li>
          <li>如对某笔账单有疑问，可在账单详情里查看关联业务、下载凭证或联系客服处理。</li>
          <li>符合条件的订单退款，可从原订单或账单详情发起申请。</li>
        </ul>
      </div>
      <div class="form-card compact-filters" data-filter-panel="bills">
        <div class="form-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));">
          <div class="field"><label>统计周期</label><select data-bill-stat-period><option value="month">按月</option><option value="day">按日</option></select></div>
          <div class="field"><label>统计时间</label><select data-bill-stat-time><option>2026-05 ~ 2026-05</option></select></div>
          <div class="field"><label>账单标题</label><input type="text" value="" placeholder="请输入账单标题"></div>
          <div class="field"><label>账单类型</label><select><option>全部账单类型</option><option>充值</option><option>消费</option><option>冻结</option><option>解冻</option><option>收入</option><option>退款</option><option>提现</option><option>服务费</option><option>调账</option></select></div>
          <div class="field"><label>收支方向</label><select><option>全部方向</option><option>收入</option><option>支出</option><option>冻结</option><option>解冻</option><option>不计收支</option></select></div>
          <div class="field"><label>账单状态</label><select><option>全部账单状态</option><option>处理中</option><option>成功</option><option>失败</option><option>已关闭</option><option>已退款</option><option>冻结中</option><option>已解冻</option></select></div>
          <div class="field"><label>关联业务单号</label><input type="text" value="${focusBizNo || ""}" placeholder="请输入关联业务单号"></div>
          <div class="field advanced-filter"><label>账户主体名称</label><select><option>${team.name}</option></select></div>
          <div class="field advanced-filter"><label>关联业务类型</label><select><option>全部业务类型</option><option>订单</option><option>充值单</option><option>提现单</option><option>退款单</option><option>结算单</option></select></div>
        </div>
        <div class="form-actions">
          <a class="btn primary" href="#">搜索</a>
          <a class="btn" href="#">重置</a>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="bills">更多筛选</button>
        </div>
      </div>
      <div class="soft-table-panel" style="margin-top:16px;">
        <div class="soft-table-head">
          <strong>账单明细列表</strong>
          <div class="table-head-actions">
            <span class="tiny">当前页展示 ${displayRows.length} 条记录</span>
            <button class="table-config-btn" type="button" data-open-column-config="bills">配置列</button>
          </div>
        </div>
        <div class="table-wrap" style="border:none;border-radius:0;">
          <table data-table="bills">
            <thead>
              <tr>
                <th data-col="time">发生时间</th>
                <th data-col="title">账单标题</th>
                <th data-col="type">账单类型</th>
                <th data-col="relatedBiz">关联业务</th>
                <th data-col="direction">收支方向</th>
                <th data-col="amount">展示金额</th>
                <th data-col="status">账单状态</th>
                <th data-col="actions">操作</th>
              </tr>
            </thead>
            <tbody>
              ${displayRows.map((row, index) => `
                <tr class="${focusBizNo && (row.bizNo === focusBizNo || row.orderNo === focusOrderNo) ? "row-focus" : ""}">
                  <td data-col="time">${row.time}</td>
                  <td data-col="title">${row.title}</td>
                  <td data-col="type">${row.type}</td>
                  <td data-col="relatedBiz">${row.orderHref ? `<a class="text-link" href="${row.orderHref}">${row.relatedBiz}</a>` : row.relatedBiz}</td>
                  <td data-col="direction">${row.direction}</td>
                  <td data-col="amount" class="${row.amount.startsWith("+") ? "amt-in" : row.amount.includes("冻结") ? "amt-warn" : "amt-out"}">${row.amount}</td>
                  <td data-col="status"><span class="tag ${row.statusTone}">${row.status}</span></td>
                  <td data-col="actions"><div class="table-actions"><button class="text-link-btn" type="button" data-open-bill-modal="detail" data-bill-record="${detailRows.indexOf(row)}">查看详情</button>${row.orderHref ? `<a class="btn mini ${row.orderNo === focusOrderNo ? "primary" : ""}" href="${row.orderHref}">查看订单</a>` : ""}</div></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="table-footbar">
          <div class="pager-meta">共 ${displayRows.length} 条</div>
          <div class="pager">
            <span class="pager-btn disabled">上一页</span>
            <span class="pager-btn active">1</span>
            <span class="pager-btn disabled">下一页</span>
          </div>
        </div>
      </div>
      <div class="recharge-modal-mask" data-bill-modal="detail" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>账单详情</h3><p>查看用户可理解的账单展示记录和关联追溯信息。</p></div>
            <button class="config-close" type="button" data-close-bill-modal="detail">×</button>
          </div>
          <div class="surface-head recharge-modal-headline"><div><h3 data-bill-detail-field="title">${firstBill.title}</h3><p data-bill-detail-field="desc">${firstBill.desc}</p></div><span class="tag ${firstBill.statusTone}" data-bill-detail-field="statusTag">${firstBill.status}</span></div>
          <div class="result-hero">
            <span class="detail-label">展示金额</span>
            <strong class="result-amount" data-bill-detail-field="amount">${firstBill.amount}</strong>
          </div>
          <div class="detail-grid detail-grid-2">
            <div class="detail-item"><span class="detail-label">发生时间</span><strong class="detail-value" data-bill-detail-field="time">${firstBill.time}</strong></div>
            <div class="detail-item"><span class="detail-label">账单类型</span><strong class="detail-value" data-bill-detail-field="type">${firstBill.type}</strong></div>
            <div class="detail-item"><span class="detail-label">收支方向</span><strong class="detail-value" data-bill-detail-field="direction">${firstBill.direction}</strong></div>
            <div class="detail-item"><span class="detail-label">账单状态</span><strong class="detail-value" data-bill-detail-field="status">${firstBill.status}</strong></div>
            <div class="detail-item"><span class="detail-label">账户名称</span><strong class="detail-value" data-bill-detail-field="account">${firstBill.account}</strong></div>
            <div class="detail-item"><span class="detail-label">对手方名称</span><strong class="detail-value" data-bill-detail-field="counterparty">${firstBill.counterparty}</strong></div>
            <div class="detail-item"><span class="detail-label">关联业务</span><strong class="detail-value" data-bill-detail-field="relatedBiz">${firstBill.relatedBiz}</strong></div>
            <div class="detail-item"><span class="detail-label">关联交易流水号</span><strong class="detail-value" data-bill-detail-field="tradeNo">${firstBill.tradeNo}</strong></div>
            <div class="detail-item"><span class="detail-label">关联资金流水号</span><strong class="detail-value" data-bill-detail-field="fundNo">${firstBill.fundNo}</strong></div>
            <div class="detail-item"><span class="detail-label">退款处理</span><strong class="detail-value" data-bill-detail-field="refundHint">${firstBill.refundHint}</strong></div>
          </div>
          <div class="summary-actions" style="margin-top:16px;">
            <a class="btn mini primary" href="${firstBill.orderHref || "#"}" data-bill-detail-field="orderHref" ${firstBill.orderHref ? "" : "hidden"}>查看订单资金轨迹</a>
            <button class="btn mini primary" type="button" data-bill-detail-field="refundAction">${firstBill.refundAction}</button>
            <button class="btn mini" type="button">联系客服</button>
            <button class="btn mini" type="button">下载凭证</button>
            <button class="btn mini" type="button" data-close-bill-modal="detail">关闭</button>
          </div>
        </div>
      </div>
      ${renderColumnConfigModal("bills")}
    `;
  }

  function getPointsRechargeContext(team, accountScope = "team", mode = "direct") {
    const view = getPointsView(team, accountScope);
    const availableBalance = accountScope === "personal" ? getPersonalAccountView(team).available : team.recharge.accountInfo.available;
    const availableNumber = parseMoney(availableBalance);
    const targetExchangeAmount = accountScope === "personal" ? 12000 : 800000;
    const shortage = Math.max(targetExchangeAmount - availableNumber, 0);
    const directRechargeAmount = accountScope === "personal" ? 1200 : 50000;
    const isShortageMode = mode === "shortage" && shortage > 0;
    const rechargeAmount = isShortageMode ? shortage : directRechargeAmount;
    const exchangeAmount = isShortageMode ? targetExchangeAmount : directRechargeAmount;

    return {
      view,
      availableBalance,
      availableNumber,
      targetExchangeAmount,
      targetExchangePoints: targetExchangeAmount * 10,
      shortage,
      directRechargeAmount,
      rechargeAmount,
      exchangeAmount,
      exchangePoints: exchangeAmount * 10,
      modeLabel: isShortageMode ? "补差充值并兑换" : "充值并兑换积分",
      subtitle: isShortageMode
        ? `本次仅补差充值 ¥ ${shortage.toLocaleString("zh-CN")}，支付后合并当前余额兑换 ¥ ${targetExchangeAmount.toLocaleString("zh-CN")}。`
        : "充值后自动兑换为积分，支付成功后积分进入当前积分账户。",
      cardDesc: isShortageMode
        ? `当前可用余额：${availableBalance}，还差 ¥ ${shortage.toLocaleString("zh-CN")}。`
        : `当前可用余额：${availableBalance}，充值后将自动兑换为积分。`
    };
  }

  function renderPoints(team, accountScope = "team") {
    const exchangeContext = getPointsRechargeContext(team, accountScope, "shortage");
    const directContext = getPointsRechargeContext(team, accountScope, "direct");
    const { view, availableBalance, targetExchangeAmount, targetExchangePoints, shortage } = exchangeContext;
    return `
      <div class="points-hero">
        <div>
          <div class="hero-kicker">Points Wallet</div>
          <h3>积分是统一账户下的虚拟权益资产</h3>
          <p>积分可通过余额兑换或充值后兑换获得，并可在天合 AIGC 平台消费 token。积分不等同现金余额，提现和发票口径后续单独确认。</p>
          <div class="points-hero-actions">
            <button class="btn primary" type="button" data-open-recharge-modal="pointsExchange">兑换积分</button>
            <button class="btn" type="button" data-open-recharge-modal="pointsRechargeExchange" data-points-recharge-mode="direct">充值并兑换</button>
          </div>
        </div>
        <div class="points-balance-card">
          <span>${view.accountScope}</span>
          <strong>${view.balance.toLocaleString("zh-CN")}</strong>
          <em>当前积分余额</em>
        </div>
      </div>

      <div class="info-banner">
        <ul>
          <li>积分可用于天合 AIGC 平台的 token 消费，支持文案生成、脚本扩写、图片提示词和分镜生成等场景。</li>
          <li>积分可通过余额兑换或充值并兑换获得；兑换成功后不支持退现金。</li>
          <li>AIGC 任务失败时仅回补积分，不退回现金余额。</li>
        </ul>
      </div>

      <div class="summary-strip" style="grid-template-columns:repeat(5,minmax(0,1fr));">
        <div class="summary-box"><div class="kicker">积分账户</div><div class="big">${view.accountName}</div></div>
        <div class="summary-box"><div class="kicker">本月获得积分</div><div class="big">${view.earned.toLocaleString("zh-CN")}</div></div>
        <div class="summary-box"><div class="kicker">本月消耗积分</div><div class="big">${view.used.toLocaleString("zh-CN")}</div></div>
        <div class="summary-box"><div class="kicker">预计可用 token</div><div class="big">${view.tokenEstimate.toLocaleString("zh-CN")}</div></div>
        <div class="summary-box"><div class="kicker">处理中积分</div><div class="big">${view.pending.toLocaleString("zh-CN")}</div></div>
      </div>

      <div class="form-card compact-filters" data-filter-panel="points" style="margin-top:16px;">
        <div class="form-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));">
          <div class="field"><label>积分动作</label><select><option>全部动作</option><option>余额兑换积分</option><option>AIGC token 消费</option><option>消费失败退回</option><option>承接奖励积分</option></select></div>
          <div class="field"><label>关联业务单号</label><input type="text" placeholder="请输入 PT / AI / RC 单号"></div>
          <div class="field"><label>变动方向</label><select><option>全部方向</option><option>获得</option><option>消耗</option><option>退回</option></select></div>
          <div class="field"><label>发生时间范围</label><select><option>2026-05-01 ~ 2026-05-31</option></select></div>
          <div class="field advanced-filter"><label>账户类型</label><select><option>${view.accountScope}</option><option>个人账户</option><option>团队账户</option></select></div>
          <div class="field advanced-filter"><label>状态</label><select><option>全部状态</option><option>成功</option><option>处理中</option><option>失败</option><option>已退回</option></select></div>
        </div>
        <div class="form-actions">
          <a class="btn primary" href="#">搜索</a>
          <a class="btn" href="#">重置</a>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="points">更多筛选</button>
        </div>
      </div>

      <div class="soft-table-panel" style="margin-top:16px;">
        <div class="soft-table-head">
          <strong>积分明细</strong>
          <div class="table-head-actions">
            <span class="tiny">当前页展示 ${view.rows.length} 条记录</span>
            <button class="table-config-btn" type="button" data-open-column-config="points">配置列</button>
          </div>
        </div>
        <div class="table-wrap" style="border:none;border-radius:0;">
          <table data-table="points">
            <thead><tr><th data-col="pointNo">积分流水号</th><th data-col="type">积分动作</th><th data-col="direction">变动方向</th><th data-col="points">积分变动</th><th data-col="cash">关联金额</th><th data-col="token">关联 token</th><th data-col="bizNo">关联业务单号</th><th data-col="status">状态</th><th data-col="time">发生时间</th></tr></thead>
            <tbody>${view.rows.map(row => `<tr><td data-col="pointNo">${row[0]}</td><td data-col="type">${row[1]}</td><td data-col="direction">${row[2]}</td><td data-col="points" class="${row[3].startsWith("+") ? "amt-in" : "amt-out"}">${row[3]}</td><td data-col="cash">${row[4]}</td><td data-col="token">${row[5]}</td><td data-col="bizNo">${row[6]}</td><td data-col="status"><span class="tag ${row[7].includes("退回") ? "orange" : "green"}">${row[7]}</span></td><td data-col="time">${row[8]}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        <div class="table-footbar">
          <div class="pager-meta">共 ${view.rows.length} 条</div>
          <div class="pager"><span class="pager-btn disabled">上一页</span><span class="pager-btn active">1</span><span class="pager-btn disabled">下一页</span></div>
        </div>
      </div>

      <div class="soft-table-panel" style="margin-top:16px;">
        <div class="soft-table-head"><strong>AIGC token 消费记录</strong><span class="tiny">积分消耗到具体模型任务的记录</span></div>
        <div class="table-wrap" style="border:none;border-radius:0;">
          <table>
            <thead><tr><th>消费单号</th><th>应用/场景</th><th>平台</th><th>token 消耗</th><th>积分消耗</th><th>关联任务</th><th>状态</th><th>发生时间</th></tr></thead>
            <tbody>${view.consumption.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td class="amt-out">-${row[4]}</td><td>${row[5]}</td><td><span class="tag ${row[6].includes("退回") ? "orange" : "green"}">${row[6]}</span></td><td>${row[7]}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="recharge-modal-mask" data-recharge-modal="pointsExchange" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>兑换积分</h3><p>使用当前账户余额兑换积分，兑换成功后积分会立即进入当前积分账户。</p></div>
            <button class="config-close" type="button" data-close-recharge-modal="pointsExchange">×</button>
          </div>
          <div class="recharge-modal-body">
            <div class="method-card recharge-modal-card">
              <span class="tag blue">${view.accountScope}</span>
              <h4>${view.accountName}</h4>
              <p>积分账户 ID：${view.accountId}，当前积分余额：${view.balance.toLocaleString("zh-CN")} 分</p>
              <div class="detail-grid detail-grid-2 compact-detail-grid">
                <div class="detail-item"><span class="detail-label">当前可用余额</span><strong class="detail-value">${availableBalance}</strong></div>
                <div class="detail-item"><span class="detail-label">本次兑换金额</span><strong class="detail-value">¥ ${targetExchangeAmount.toLocaleString("zh-CN")}</strong></div>
                <div class="detail-item"><span class="detail-label">预计到账积分</span><strong class="detail-value">${targetExchangePoints.toLocaleString("zh-CN")} 分</strong></div>
                <div class="detail-item"><span class="detail-label">兑换比例</span><strong class="detail-value">¥1 = 10 积分</strong></div>
              </div>
              ${shortage > 0 ? `<div class="notice-item warn" style="margin-bottom:14px;"><div class="notice-main"><strong>余额不足，还差 ¥ ${shortage.toLocaleString("zh-CN")}</strong><span>可以直接改用「补差充值并兑换」，无需离开当前页面。</span></div></div>` : ""}
              <div class="field"><label>兑换金额</label><input type="text" value="${targetExchangeAmount.toLocaleString("zh-CN")}"></div>
              <div class="field"><label>兑换说明</label><input type="text" value="${accountScope === "personal" ? "个人 AIGC 消费积分补充" : "团队 AIGC 消费积分补充"}"></div>
            </div>
          </div>
          <div class="config-modal-foot">
            ${shortage > 0 ? `<button class="btn primary" type="button" data-close-recharge-modal="pointsExchange" data-open-recharge-modal="pointsRechargeExchange" data-points-recharge-mode="shortage">补差充值并兑换</button>` : `<button class="btn primary" type="button">确认兑换</button>`}
            <button class="btn" type="button" data-close-recharge-modal="pointsExchange">取消</button>
          </div>
        </div>
      </div>
      <div class="recharge-modal-mask" data-recharge-modal="pointsRechargeExchange" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3 data-points-recharge-field="modeLabel">${directContext.modeLabel}</h3><p data-points-recharge-field="subtitle">${directContext.subtitle}</p></div>
            <button class="config-close" type="button" data-close-recharge-modal="pointsRechargeExchange">×</button>
          </div>
          <div class="recharge-modal-body">
            <div class="method-card recharge-modal-card">
              <span class="tag blue">${view.accountScope}</span>
              <h4>${view.accountName}</h4>
              <p data-points-recharge-field="cardDesc">${directContext.cardDesc}</p>
              <div class="detail-grid detail-grid-2 compact-detail-grid">
                <div class="detail-item"><span class="detail-label">本次充值金额</span><strong class="detail-value" data-points-recharge-field="rechargeAmount">¥ ${directContext.rechargeAmount.toLocaleString("zh-CN")}</strong></div>
                <div class="detail-item"><span class="detail-label">支付后兑换金额</span><strong class="detail-value" data-points-recharge-field="exchangeAmount">¥ ${directContext.exchangeAmount.toLocaleString("zh-CN")}</strong></div>
                <div class="detail-item"><span class="detail-label">预计到账积分</span><strong class="detail-value" data-points-recharge-field="exchangePoints">${directContext.exchangePoints.toLocaleString("zh-CN")} 分</strong></div>
                <div class="detail-item"><span class="detail-label">支付渠道</span><strong class="detail-value">支付宝 / 微信</strong></div>
                <div class="detail-item"><span class="detail-label">到账账户</span><strong class="detail-value">${view.accountName}</strong></div>
              </div>
              <div class="field"><label>充值金额</label><input type="text" value="${directContext.rechargeAmount.toLocaleString("zh-CN")}" data-points-recharge-field="rechargeInput"></div>
              <div class="field" data-points-recharge-field="quickAmounts"><label>快捷充值金额</label><div class="chip-row">${(accountScope === "personal" ? ["100", "500", "1,000", "5,000"] : ["10,000", "50,000", "100,000", "300,000"]).map(amount => `<button class="chip-button" type="button">¥ ${amount}</button>`).join("")}</div></div>
              <div class="field"><label>支付方式</label><select><option>在线支付</option></select></div>
              <div class="field"><label>支付渠道</label><select><option>支付宝</option><option>微信</option></select></div>
              <div class="field"><label>兑换说明</label><input type="text" value="${accountScope === "personal" ? "个人 AIGC 消费积分补充" : "团队 AIGC 消费积分补充"}"></div>
            </div>
          </div>
          <div class="config-modal-foot">
            <button class="btn primary" type="button">确认支付并兑换</button>
            <button class="btn" type="button" data-close-recharge-modal="pointsRechargeExchange">取消</button>
          </div>
        </div>
      </div>
      ${renderColumnConfigModal("points")}
    `;
  }

  function renderInvoices(team) {
    const invoiceAvailable = team.invoices.summary[0][1];
    const invoicedAmount = team.invoices.summary[2][1];
    const pendingAmount = team.invoices.summary[1][1];
    const invoiceRows = buildBillDetailRows(team)
      .filter(row => !row.relatedBiz.startsWith("PT"))
      .slice(0, 5)
      .map((row, index) => {
        const amount = row.amount.includes("冻结") ? parseMoney(row.amount) : Math.abs(parseMoney(row.amount));
        const invoiced = index === 0 ? 0 : Math.round(amount * 0.35);
        return {
          billNo: `BILL-${row.time.slice(0, 10).replace(/[^\d]/g, "")}-${index + 1}`,
          businessNo: row.relatedBiz.split(" / ")[0],
          title: row.title,
          type: row.type,
          role: row.title.includes("结算") ? "承接方" : "需求方",
          time: row.time,
          amount: fmtMoney(amount),
          available: fmtMoney(amount),
          invoiced: fmtMoney(invoiced),
          remaining: fmtMoney(Math.max(amount - invoiced, 0)),
          status: invoiced > 0 ? "部分开票" : "未开票"
        };
      });
    const titleRows = team.invoices.titles.map((row, index) => ({
      id: `TITLE-${String(index + 1).padStart(3, "0")}`,
      name: row[0],
      taxNo: row[1],
      address: index === 0 ? "北京市朝阳区望京数字内容产业园 6 号楼" : "北京市海淀区中关村软件园",
      phone: "010-6828 9000",
      bank: index === 0 ? "招商银行北京望京支行" : "中国建设银行北京海淀支行",
      account: index === 0 ? "1109 0822 0000 1688" : "1100 0921 0000 2091",
      email: index === 0 ? "invoice@tianhe.example" : "finance@tianhe.example",
      isDefault: index === 0 ? "是" : "否",
      status: "启用"
    }));
    const applyRows = team.invoices.records.map(row => ({
      applyNo: row[1],
      invoiceNo: row[4].includes("已开具") ? `INVNO-${row[1].replace(/[^\d]/g, "").slice(-6)}` : "-",
      type: row[2],
      title: titleRows[0].name,
      amount: row[3],
      status: row[4],
      createTime: row[0],
      completeTime: row[4].includes("已开具") ? row[0] : "-"
    }));
    const electronicRows = team.invoices.issued.map((row, index) => ({
      invoiceNo: row[0],
      code: `CODE-${row[0].slice(-6)}`,
      type: row[2],
      amount: row[3],
      date: row[4],
      status: row[5],
      downloads: index + 1
    }));
    return `
      <div class="info-banner">
        <ul>
          <li>发票中心用于查看可开票金额、申请发票、管理发票抬头、查看开票记录和下载电子发票。</li>
          <li>可开票账单来源于账单明细，未支付、已取消、已退款金额、赠送金额和积分金额不允许开票。</li>
          <li>发票系统与账单系统打通，账单会记录可开票金额、已开票金额和剩余可开票金额。</li>
        </ul>
      </div>

      <div class="grid-4" style="margin-bottom:16px;">
        <div class="surface metric-card">
          <div class="metric-label">当前可开票金额</div>
          <div class="metric-value">${invoiceAvailable}</div>
          <div class="metric-foot">invoice_available_amount</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">已开票金额</div>
          <div class="metric-value">${invoicedAmount}</div>
          <div class="metric-foot">invoiced_amount</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">开票处理中金额</div>
          <div class="metric-value">${pendingAmount}</div>
          <div class="metric-foot">pending_invoice_amount</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">发票数量</div>
          <div class="metric-value">${electronicRows.length + applyRows.length}</div>
          <div class="metric-foot">未开票金额 ${invoiceAvailable}</div>
        </div>
      </div>

      <div class="surface">
        <div class="surface-head"><div><h3>开票主体管理</h3><p>发票抬头、纳税人识别号和电子发票接收邮箱</p></div><button class="btn mini primary" type="button">新增抬头</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>抬头ID</th><th>发票抬头</th><th>纳税人识别号</th><th>公司地址</th><th>公司电话</th><th>开户行</th><th>银行账号</th><th>接收邮箱</th><th>默认</th><th>状态</th></tr></thead>
            <tbody>${titleRows.map(row => `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.taxNo}</td><td>${row.address}</td><td>${row.phone}</td><td>${row.bank}</td><td>${row.account}</td><td>${row.email}</td><td>${row.isDefault}</td><td><span class="tag green">${row.status}</span></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head">
          <div><h3>可开票账单</h3><p>来源于账单明细，积分金额和赠送金额不纳入可开票范围</p></div>
          <button class="btn mini primary" type="button" data-open-invoice-modal="apply">申请开票</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>账单编号</th>
                <th>业务单号</th>
                <th>账单标题</th>
                <th>账单类型</th>
                <th>业务角色</th>
                <th>发生时间</th>
                <th>原始金额</th>
                <th>可开票金额</th>
                <th>已开票金额</th>
                <th>剩余可开票金额</th>
                <th>开票状态</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceRows.map(row => `
                <tr>
                  <td>${row.billNo}</td>
                  <td>${row.businessNo}</td>
                  <td>${row.title}</td>
                  <td>${row.type}</td>
                  <td>${row.role}</td>
                  <td>${row.time}</td>
                  <td>${row.amount}</td>
                  <td>${row.available}</td>
                  <td>${row.invoiced}</td>
                  <td>${row.remaining}</td>
                  <td><span class="tag ${row.status === "未开票" ? "orange" : "blue"}">${row.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="recharge-modal-mask" data-invoice-modal="apply" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>申请开票</h3><p>支持按账单、按订单、按月份汇总开票。</p></div>
            <button class="config-close" type="button" data-close-invoice-modal="apply">×</button>
          </div>
          <div class="recharge-modal-body">
            <div class="inline-tabs" style="margin-bottom:16px;">
              <span class="tab active">按账单开票</span>
              <span class="tab">按订单开票</span>
              <span class="tab">按月份汇总开票</span>
            </div>
            <div class="form-grid">
              <div class="field"><label>发票申请单号</label><input type="text" value="INV-APPLY-2026060101"></div>
              <div class="field"><label>发票类型</label><select><option>电子普通发票</option><option>电子专用发票</option><option>纸质普通发票</option><option>纸质专用发票</option></select></div>
              <div class="field"><label>开票抬头</label><select>${titleRows.map(row => `<option>${row.name}</option>`).join("")}</select></div>
              <div class="field"><label>开票主体</label><input type="text" value="${team.name}"></div>
              <div class="field"><label>发票内容</label><select><option>技术服务费</option><option>软件服务费</option><option>平台服务费</option><option>信息服务费</option><option>咨询服务费</option></select></div>
              <div class="field"><label>开票金额</label><input type="text" value="${invoiceAvailable}"></div>
              <div class="field"><label>税率</label><select><option>6%</option><option>3%</option><option>1%</option></select></div>
              <div class="field"><label>接收邮箱</label><input type="text" value="${titleRows[0].email}"></div>
              <div class="field"><label>联系人</label><input type="text" value="财务负责人"></div>
              <div class="field"><label>联系电话</label><input type="text" value="${titleRows[0].phone}"></div>
              <div class="field"><label>收件地址</label><input type="text" value="${titleRows[0].address}"></div>
              <div class="field"><label>备注</label><input type="text" placeholder="请输入备注"></div>
            </div>
          </div>
          <div class="config-modal-foot">
            <button class="btn primary" type="button">提交开票申请</button>
            <button class="btn" type="button">保存草稿</button>
            <button class="btn" type="button" data-close-invoice-modal="apply">取消</button>
          </div>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>开票申请记录</h3><p>申请单审核、开票与发送状态</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>申请单号</th><th>发票号</th><th>发票类型</th><th>发票抬头</th><th>金额</th><th>状态</th><th>创建时间</th><th>完成时间</th><th>操作</th></tr></thead>
            <tbody>${applyRows.map(row => `<tr><td>${row.applyNo}</td><td>${row.invoiceNo}</td><td>${row.type}</td><td>${row.title}</td><td>${row.amount}</td><td><span class="tag ${row.status.includes("审核") ? "orange" : "green"}">${row.status}</span></td><td>${row.createTime}</td><td>${row.completeTime}</td><td><button class="text-link-btn" type="button">查看详情</button></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>电子发票管理</h3><p>电子票文件下载与邮件重发</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>发票号</th><th>发票代码</th><th>类型</th><th>金额</th><th>开票日期</th><th>状态</th><th>下载次数</th><th>操作</th></tr></thead>
            <tbody>${electronicRows.map(row => `<tr><td>${row.invoiceNo}</td><td>${row.code}</td><td>${row.type}</td><td>${row.amount}</td><td>${row.date}</td><td><span class="tag green">${row.status}</span></td><td>${row.downloads}</td><td><div class="table-actions"><button class="btn mini" type="button">下载PDF</button><button class="btn mini" type="button">下载OFD</button><button class="btn mini" type="button">邮件重发</button></div></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderRecharge(team, accountScope = "team") {
    const statusTone = team.recharge.result.status.includes("成功")
      ? "green"
      : team.recharge.result.status.includes("失败")
        ? "red"
        : "orange";
    const recordTagTone = status => status.includes("到账") ? "green" : status.includes("失败") ? "red" : "orange";
    const latestRecord = team.recharge.records[0];
    const isPersonalAccount = accountScope === "personal";
    const personalAccount = getPersonalAccountView(team);
    const accountInfo = isPersonalAccount
      ? {
          label: "当前账户",
          name: personalAccount.name,
          foot: "个人 · 当前用户",
          available: personalAccount.available,
          frozen: "¥ 0",
          pending: personalAccount.pendingSettlement,
          targetAccount: personalAccount.name,
          amount: "1,000",
          quickAmounts: ["100", "500", "1,000", "5,000"],
          payMethods: ["在线支付"],
          payChannels: ["支付宝", "微信"],
          note: "个人账户余额补充",
          desc: "充值中心用于向当前个人收益账户充值，余额可用于积分兑换、个人服务购买等场景。"
        }
      : {
          label: "当前团队",
          name: team.recharge.accountInfo.workspace,
          foot: `${team.recharge.accountInfo.subjectType} · ${team.recharge.accountInfo.subjectName}`,
          available: team.recharge.accountInfo.available,
          frozen: team.recharge.accountInfo.frozen,
          pending: team.recharge.accountInfo.pendingSettlement,
          targetAccount: team.recharge.operation.targetAccount,
          amount: team.recharge.operation.amount,
          quickAmounts: team.recharge.operation.quickAmounts,
          payMethods: team.recharge.operation.payMethods,
          payChannels: team.recharge.operation.payChannels,
          note: team.recharge.operation.note,
          desc: "充值中心用于向当前团队的钱包账户充值，支持在线支付和对公转账。"
        };
    return `
      <div class="info-banner">
        <ul>
          <li>${accountInfo.desc}</li>
          <li>充值成功后，系统会生成交易流水、资金流水，并在账单明细中展示充值到账记录。</li>
          <li>支付成功但余额未到账时，请联系客服并提供充值单号。</li>
        </ul>
      </div>

      <div class="grid-4" style="margin-bottom:16px;">
        <div class="surface metric-card">
          <div class="metric-label">${accountInfo.label}</div>
          <div class="metric-value metric-value-text">${accountInfo.name}</div>
          <div class="metric-foot">${accountInfo.foot}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">可用余额</div>
          <div class="metric-value">${accountInfo.available}</div>
          <div class="metric-foot">冻结余额 ${accountInfo.frozen}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">待结算余额</div>
          <div class="metric-value">${accountInfo.pending}</div>
          <div class="metric-foot">币种 ${team.recharge.accountInfo.currency}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">最近充值结果</div>
          <div class="metric-value">${latestRecord[2]}</div>
          <div class="metric-foot">${latestRecord[0]} · ${latestRecord[5]} · ${team.recharge.accountInfo.updatedAt}</div>
          <div class="metric-inline-actions">
            <button class="btn mini" type="button" data-open-recharge-modal="detail" data-recharge-record="0">查看详情</button>
          </div>
        </div>
      </div>

      <div class="form-card compact-filters" data-filter-panel="rechargeRecords">
        <div class="form-grid">
          <div class="field"><label>充值单号</label><input type="text" placeholder="请输入充值单号"></div>
          <div class="field"><label>充值状态</label><select><option>全部</option><option>已到账</option><option>审核中</option><option>支付失败</option></select></div>
          <div class="field"><label>支付方式</label><select><option>全部</option>${accountInfo.payMethods.map(item => `<option>${item}</option>`).join("")}</select></div>
          <div class="field advanced-filter"><label>支付渠道</label><select><option>全部</option>${accountInfo.payChannels.map(item => `<option>${item}</option>`).join("")}</select></div>
          <div class="field advanced-filter"><label>到账账户</label><input type="text" value="${accountInfo.targetAccount}"></div>
          <div class="field advanced-filter"><label>充值时间</label><input type="text" value="2026-05-01 至 2026-05-29"></div>
        </div>
        <div class="form-actions">
          <button class="btn primary" type="button">搜索</button>
          <button class="btn" type="button">重置</button>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="rechargeRecords">更多筛选</button>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>最近充值记录</h3><p>默认展示最近 10 条充值记录</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>充值单号</th><th>充值时间</th><th>充值金额</th><th>支付方式</th><th>支付渠道</th><th>充值状态</th><th>到账账户</th><th>操作</th></tr></thead>
            <tbody>${team.recharge.records.map((row, index) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td><span class="tag ${recordTagTone(row[5])}">${row[5]}</span></td><td>${row[6]}</td><td><div class="table-actions"><button class="btn mini" type="button" data-open-recharge-modal="detail" data-recharge-record="${index}">查看详情</button><a class="btn mini" href="bills.html">查看账单</a><button class="btn mini" type="button">${row[5].includes("审核") ? "继续支付" : "联系客服"}</button></div></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="recharge-modal-mask" data-recharge-modal="action" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>发起充值</h3><p>填写充值信息后发起支付，系统将生成充值单并跟踪到账状态。</p></div>
            <button class="config-close" type="button" data-close-recharge-modal="action">×</button>
          </div>
          <div class="method-card recharge-modal-card">
            <span class="tag blue">充值操作区</span>
            <h4>向当前钱包账户充值</h4>
            <p>${accountInfo.label}：${accountInfo.name}，到账账户：${accountInfo.targetAccount}</p>
            <div class="field"><label>充值金额</label><input type="text" value="${accountInfo.amount}"></div>
            <div class="field">
              <label>快捷充值金额</label>
              <div class="chip-row">${accountInfo.quickAmounts.map(amount => `<button class="chip-button" type="button">¥ ${amount}</button>`).join("")}</div>
            </div>
            <div class="field"><label>支付方式</label><select>${accountInfo.payMethods.map(item => `<option>${item}</option>`).join("")}</select></div>
            <div class="field"><label>支付渠道</label><select>${accountInfo.payChannels.map(item => `<option>${item}</option>`).join("")}</select></div>
            <div class="field"><label>到账账户</label><input type="text" value="${accountInfo.targetAccount}"></div>
            <div class="field"><label>充值说明</label><input type="text" value="${accountInfo.note}"></div>
          </div>
          <div class="config-modal-foot">
            <button class="btn primary" type="button">确认充值</button>
            <button class="btn" type="button" data-close-recharge-modal="action">取消</button>
          </div>
        </div>
      </div>

      <div class="recharge-modal-mask" data-recharge-modal="detail" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>充值详情</h3><p>查看充值单、交易流水和渠道返回信息。</p></div>
            <button class="config-close" type="button" data-close-recharge-modal="detail">×</button>
          </div>
          <div class="surface-head recharge-modal-headline"><div><h3>充值结果</h3><p>展示当前选中充值记录的到账明细。</p></div><span class="tag ${statusTone}" data-recharge-detail-field="statusTag">${team.recharge.result.status}</span></div>
          <div class="result-hero">
            <span class="detail-label">充值金额</span>
            <strong class="result-amount" data-recharge-detail-field="amount">${team.recharge.result.amount}</strong>
          </div>
          <div class="detail-grid detail-grid-2">
            <div class="detail-item"><span class="detail-label">充值单号</span><strong class="detail-value" data-recharge-detail-field="rechargeNo">${team.recharge.result.rechargeNo}</strong></div>
            <div class="detail-item"><span class="detail-label">交易流水号</span><strong class="detail-value" data-recharge-detail-field="transactionNo">${team.recharge.result.transactionNo}</strong></div>
            <div class="detail-item"><span class="detail-label">外部渠道流水号</span><strong class="detail-value" data-recharge-detail-field="externalNo">${team.recharge.result.externalNo}</strong></div>
            <div class="detail-item"><span class="detail-label">支付方式</span><strong class="detail-value" data-recharge-detail-field="payMethod">${team.recharge.result.payMethod}</strong></div>
            <div class="detail-item"><span class="detail-label">支付渠道</span><strong class="detail-value" data-recharge-detail-field="payChannel">${team.recharge.result.payChannel}</strong></div>
            <div class="detail-item"><span class="detail-label">到账账户</span><strong class="detail-value" data-recharge-detail-field="targetAccount">${team.recharge.result.targetAccount}</strong></div>
            <div class="detail-item"><span class="detail-label">发起时间</span><strong class="detail-value" data-recharge-detail-field="createdAt">${team.recharge.result.createdAt}</strong></div>
            <div class="detail-item"><span class="detail-label">支付完成时间</span><strong class="detail-value" data-recharge-detail-field="paidAt">${team.recharge.result.paidAt}</strong></div>
            <div class="detail-item"><span class="detail-label">到账时间</span><strong class="detail-value" data-recharge-detail-field="creditedAt">${team.recharge.result.creditedAt}</strong></div>
            <div class="detail-item"><span class="detail-label">失败原因</span><strong class="detail-value" data-recharge-detail-field="failureReason">${team.recharge.result.failureReason}</strong></div>
          </div>
          <div class="summary-actions" style="margin-top:16px;">
            <a class="btn mini" href="bills.html">查看账单</a>
            <button class="btn mini primary" type="button" data-close-recharge-modal="detail" data-open-recharge-modal="action">继续充值</button>
            <a class="btn mini" href="overview.html">返回钱包</a>
            <button class="btn mini" type="button">联系客服</button>
          </div>
        </div>
      </div>
    `;
  }

  function buildRechargeDetail(team, recordIndex) {
    const row = team.recharge.records[recordIndex] || team.recharge.records[0];
    const result = team.recharge.result;
    const digits = (row[0] || "").replace(/[^\d]/g, "");
    const channelPrefix = row[4].includes("支付宝") ? "ALI" : row[4].includes("微信") ? "WX" : row[4].includes("银行") ? "BANK" : "SYS";
    return {
      status: row[5] || result.status,
      amount: row[2] || result.amount,
      rechargeNo: row[0] || result.rechargeNo,
      transactionNo: digits ? `TX-${digits}` : result.transactionNo,
      externalNo: digits ? `${channelPrefix}${digits}` : result.externalNo,
      payMethod: row[3] || result.payMethod,
      payChannel: row[4] || result.payChannel,
      targetAccount: row[6] || result.targetAccount,
      createdAt: row[1] || result.createdAt,
      paidAt: row[5] && !row[5].includes("审核") ? row[1] : "-",
      creditedAt: row[5] && row[5].includes("到账") ? row[1] : "-",
      failureReason: row[5] && row[5].includes("失败") ? "支付失败，请重新发起充值" : "-"
    };
  }

  function buildWithdrawDetail(team, recordIndex) {
    const row = team.withdraw.records[recordIndex] || team.withdraw.records[0];
    const digits = (row[1] || "").replace(/[^\d]/g, "");
    return {
      status: row[3] || "处理中",
      amount: row[2] || team.withdraw.available,
      withdrawNo: row[1] || "WD-UNKNOWN",
      transactionNo: digits ? `TX-${digits}` : "TX-UNKNOWN",
      targetBank: row[4] || "未选择到账银行卡",
      account: team.withdraw.account,
      applyTime: row[0] || "-",
      paidAt: row[3] && row[3].includes("到账") ? row[0] : "-",
      returnAt: row[3] && row[3].includes("驳回") ? row[0] : "-",
      failureReason: row[3] && row[3].includes("驳回") ? "风控校验未通过，请补充身份或银行卡信息" : "-"
    };
  }

  function renderWithdraw(team) {
    const latestRecord = team.withdraw.records[0];
    const latestTone = latestRecord[3].includes("到账") ? "green" : latestRecord[3].includes("驳回") ? "red" : "orange";
    const withdrawBanks = Array.from(new Set(team.withdraw.records.map(row => row[4])));
    return `
      <div class="info-banner">
        <ul>
          <li>提现中心仅面向个人收益账户，用于发起提现申请、查看到账状态和排查失败原因。</li>
          <li>提现成功后，系统会生成交易流水、资金流水，并在账单明细中展示提现成功记录。</li>
          <li>若提现失败或长时间未到账，请联系客服并提供提现单号。</li>
        </ul>
      </div>

      <div class="grid-4" style="margin-bottom:16px;">
        <div class="surface metric-card">
          <div class="metric-label">收益账户</div>
          <div class="metric-value metric-value-text">${team.withdraw.account}</div>
          <div class="metric-foot">当前提现主体</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">可提现余额</div>
          <div class="metric-value">${team.withdraw.available}</div>
          <div class="metric-foot">${team.withdraw.summary[0][0]} ${team.withdraw.summary[0][1]}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">已提现金额</div>
          <div class="metric-value">${team.withdraw.summary[1][1]}</div>
          <div class="metric-foot">${team.withdraw.summary[2][0]} ${team.withdraw.summary[2][1]}</div>
        </div>
        <div class="surface metric-card">
          <div class="metric-label">最近提现状态</div>
          <div class="metric-value">${latestRecord[2]}</div>
          <div class="metric-foot">${latestRecord[1]} · ${latestRecord[3]} · ${latestRecord[0]}</div>
          <div class="metric-inline-actions">
            <button class="btn mini" type="button" data-open-withdraw-modal="detail" data-withdraw-record="0">查看详情</button>
          </div>
        </div>
      </div>

      <div class="form-card compact-filters" data-filter-panel="withdrawRecords">
        <div class="form-grid">
          <div class="field"><label>提现单号</label><input type="text" placeholder="请输入提现单号"></div>
          <div class="field"><label>提现状态</label><select><option>全部</option><option>审核中</option><option>已到账</option><option>已驳回</option></select></div>
          <div class="field"><label>到账账户</label><select><option>全部</option>${withdrawBanks.map(item => `<option>${item}</option>`).join("")}</select></div>
          <div class="field advanced-filter"><label>申请时间</label><input type="text" value="2026-05-01 至 2026-05-29"></div>
          <div class="field advanced-filter"><label>提现金额</label><input type="text" placeholder="请输入提现金额"></div>
        </div>
        <div class="form-actions">
          <button class="btn primary" type="button">搜索</button>
          <button class="btn" type="button">重置</button>
          <button class="text-link-btn" type="button" data-toggle-filter-panel="withdrawRecords">更多筛选</button>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>提现记录</h3><p>申请单状态</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>申请时间</th><th>提现单号</th><th>提现金额</th><th>提现状态</th><th>到账账户</th><th>操作</th></tr></thead>
            <tbody>${team.withdraw.records.map((row, index) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td><span class="tag ${row[3].includes("驳回") ? "red" : row[3].includes("审核") ? "orange" : "green"}">${row[3]}</span></td><td>${row[4]}</td><td><div class="table-actions"><button class="btn mini" type="button" data-open-withdraw-modal="detail" data-withdraw-record="${index}">查看详情</button><button class="btn mini" type="button">${row[3].includes("驳回") ? "重新申请" : "联系客服"}</button></div></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="recharge-modal-mask" data-withdraw-modal="action" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>提交提现</h3><p>填写提现金额与到账银行卡，系统将生成提现申请单并跟踪到账状态。</p></div>
            <button class="config-close" type="button" data-close-withdraw-modal="action">×</button>
          </div>
          <div class="method-card recharge-modal-card">
            <span class="tag orange">收益账户</span>
            <h4>${team.withdraw.account}</h4>
            <p>当前可提现余额 ${team.withdraw.available}</p>
            <div class="field"><label>提现金额</label><input type="text" value="8,000"></div>
            <div class="field"><label>到账银行卡</label><select>${withdrawBanks.map(item => `<option>${item}</option>`).join("")}</select></div>
            <div class="field"><label>提现说明</label><input type="text" value="5 月收益提现"></div>
          </div>
          <div class="config-modal-foot">
            <button class="btn primary" type="button">提交提现</button>
            <button class="btn" type="button" data-close-withdraw-modal="action">取消</button>
          </div>
        </div>
      </div>

      <div class="recharge-modal-mask" data-withdraw-modal="detail" hidden>
        <div class="recharge-modal">
          <div class="config-modal-head">
            <div><h3>提现详情</h3><p>查看提现单、交易流水和到账状态。</p></div>
            <button class="config-close" type="button" data-close-withdraw-modal="detail">×</button>
          </div>
          <div class="surface-head recharge-modal-headline"><div><h3>提现结果</h3><p>展示当前选中提现记录的处理明细。</p></div><span class="tag ${latestTone}" data-withdraw-detail-field="statusTag">${latestRecord[3]}</span></div>
          <div class="result-hero">
            <span class="detail-label">提现金额</span>
            <strong class="result-amount" data-withdraw-detail-field="amount">${latestRecord[2]}</strong>
          </div>
          <div class="detail-grid detail-grid-2">
            <div class="detail-item"><span class="detail-label">提现单号</span><strong class="detail-value" data-withdraw-detail-field="withdrawNo">${latestRecord[1]}</strong></div>
            <div class="detail-item"><span class="detail-label">交易流水号</span><strong class="detail-value" data-withdraw-detail-field="transactionNo">TX-${latestRecord[1].replace(/[^\d]/g, "")}</strong></div>
            <div class="detail-item"><span class="detail-label">收益账户</span><strong class="detail-value" data-withdraw-detail-field="account">${team.withdraw.account}</strong></div>
            <div class="detail-item"><span class="detail-label">到账银行卡</span><strong class="detail-value" data-withdraw-detail-field="targetBank">${latestRecord[4]}</strong></div>
            <div class="detail-item"><span class="detail-label">申请时间</span><strong class="detail-value" data-withdraw-detail-field="applyTime">${latestRecord[0]}</strong></div>
            <div class="detail-item"><span class="detail-label">到账时间</span><strong class="detail-value" data-withdraw-detail-field="paidAt">-</strong></div>
            <div class="detail-item"><span class="detail-label">退回时间</span><strong class="detail-value" data-withdraw-detail-field="returnAt">-</strong></div>
            <div class="detail-item"><span class="detail-label">失败原因</span><strong class="detail-value" data-withdraw-detail-field="failureReason">-</strong></div>
          </div>
          <div class="summary-actions" style="margin-top:16px;">
            <button class="btn mini primary" type="button" data-close-withdraw-modal="detail" data-open-withdraw-modal="action">继续提现</button>
            <a class="btn mini" href="overview.html">返回钱包</a>
            <button class="btn mini" type="button">联系客服</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSecurity(team) {
    return `<div class="security-grid">${team.security.map(item => `<div class="security-card"><h4>${item[0]}</h4><p>${item[1]}</p><div class="security-state">${item[2]}</div></div>`).join("")}</div>`;
  }

  function renderOrderDetail(team, teamKey, routeState = {}) {
    const context = resolveOrderContext(teamKey, routeState);
    const detail = context.detail;
    const backPage = ["overview", "transactions", "bills"].includes(context.fromPage) ? context.fromPage : "overview";
    const backHref = buildPageUrl(backPage, { team: context.teamKey, bizNo: context.bizNo || detail.orderNo }, { from: "orderDetail", orderNo: detail.orderNo });
    const transactionHref = buildOrderLinkedPageHref("transactions", context.teamKey, detail.orderNo, context.bizNo, "orderDetail");
    const billHref = buildOrderLinkedPageHref("bills", context.teamKey, detail.orderNo, context.bizNo, "orderDetail");
    const sourceLabel = context.fromPage ? getPageLabel(context.fromPage) : "订单主链路";
    return `
      <div class="notice-item ok" style="margin-bottom:16px;">
        <div class="notice-main">
          <strong>${context.notFound ? `未找到 ${context.bizNo || routeState.orderNo}，已回退到最近订单` : `当前查看 ${detail.orderNo} 的资金轨迹`}</strong>
          <span>${context.bizNo && context.bizNo !== detail.orderNo ? `已根据业务单 ${context.bizNo} 定位到关联订单。` : "订单的锁资、结算、退款与开票会在这里按时间串联展示。"} ${context.fromPage ? `来源页面：${sourceLabel}。` : ""}</span>
        </div>
        <div class="table-actions">
          <a class="btn mini" href="${backHref}">返回${getPageLabel(backPage)}</a>
          <a class="btn mini primary" href="${transactionHref}">关联交易流水</a>
          <a class="btn mini" href="${billHref}">关联账单</a>
        </div>
      </div>
      <div class="summary-strip" style="grid-template-columns:repeat(4,minmax(0,1fr));">
        ${detail.summary.map(item => `<div class="summary-box"><div class="kicker">${item[0]}</div><div class="big">${item[1]}</div></div>`).join("")}
      </div>
      <div class="info-banner">
        <ul>
          <li>订单资金详情用于回答“这笔钱为什么发生”，会把锁资、验收、结算和开票节点串起来看。</li>
          <li>订单未结算时，可开票金额不会生成；已结算后会同步进入发票池。</li>
          <li>如果订单发生取消或争议退款，对应资金会在这里和交易流水页同步展示。</li>
        </ul>
      </div>
      <div class="surface" style="margin-bottom:16px;">
        <div class="surface-head"><div><h3>订单基础信息</h3><p>业务信息与付款关系</p></div><span class="tag ${detail.status.includes("锁资") ? "blue" : "green"}">${detail.status}</span></div>
        <div class="form-grid two">
          <div class="field"><label>订单编号</label><input type="text" value="${detail.orderNo}" readonly></div>
          <div class="field"><label>订单名称</label><input type="text" value="${detail.title}" readonly></div>
          <div class="field"><label>付款主体</label><input type="text" value="${detail.payer}" readonly></div>
          <div class="field"><label>承接方</label><input type="text" value="${detail.contractor}" readonly></div>
          <div class="field"><label>当前阶段</label><input type="text" value="${detail.status}" readonly></div>
          <div class="field"><label>订单金额</label><input type="text" value="${detail.amount}" readonly></div>
        </div>
      </div>
      <div class="grid-2">
        <div class="surface">
          <div class="surface-head"><div><h3>资金时间轴</h3><p>锁资 → 验收 → 结算 → 开票</p></div></div>
          <div class="timeline">${detail.timeline.map(item => `<div class="timeline-item ${item.state}"><div class="timeline-head"><strong>${item.title}</strong><span class="tag ${item.state === "done" ? "green" : item.state === "warn" ? "orange" : "blue"}">${item.time}</span></div><div class="timeline-meta">${item.meta}</div></div>`).join("")}</div>
        </div>
        <div class="surface">
          <div class="surface-head"><div><h3>资金说明</h3><p>这一单的金额构成与后续动作</p></div></div>
          <div class="list">
            <div class="list-item"><strong>订单金额</strong><span>${detail.amount}，由 ${detail.payer} 承担。</span></div>
            <div class="list-item"><strong>锁资逻辑</strong><span>下单时优先冻结团队预算，确保履约期间有可用资金。</span></div>
            <div class="list-item"><strong>结算逻辑</strong><span>验收通过后结算给承接方收益账户，并同步结转平台服务费。</span></div>
            <div class="list-item"><strong>开票逻辑</strong><span>仅已结算金额进入可开票池，未结算订单不产生开票额度。</span></div>
            <div class="list-item"><strong>退款处理</strong><span>未结算订单可申请取消并退回冻结预算；已结算订单如有争议请联系客服处理。</span></div>
            ${detail.relatedTradeNos ? `<div class="list-item"><strong>关联交易流水</strong><span>${detail.relatedTradeNos.join(" / ")}</span></div>` : ""}
            ${detail.relatedFundNos ? `<div class="list-item"><strong>关联资金流水</strong><span>${detail.relatedFundNos.join(" / ")}</span></div>` : ""}
          </div>
          <div class="summary-actions" style="margin-top:16px;">
            <button class="btn primary" type="button">申请退款</button>
            <button class="btn" type="button">查看退款进度</button>
          </div>
        </div>
      </div>
      <div class="soft-table-panel" style="margin-top:16px;">
        <div class="soft-table-head"><strong>关联凭证</strong><span class="tiny">订单资金相关的全部凭证记录</span></div>
        <div class="table-wrap" style="border:none;border-radius:0;">
          <table>
            <thead><tr><th>凭证号</th><th>类型</th><th>金额</th><th>发生时间</th><th>状态</th></tr></thead>
            <tbody>${detail.vouchers.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td class="${row[2].startsWith("-") ? "amt-out" : "amt-in"}">${row[2]}</td><td>${row[3]}</td><td><span class="tag ${row[4].includes("待") ? "orange" : row[4].includes("生效") ? "blue" : "green"}">${row[4]}</span></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAdminOverview() {
    return `
      <div class="grid-4">${metricCards(ADMIN_DATA.summary, "企业财务总览")}</div>
      <div class="grid-2" style="margin-top:16px;">
        <div class="surface"><div class="surface-head"><div><h3>企业支出趋势</h3><p>最近 6 个统计期</p></div></div><div class="chart-box">${lineChartSVG(ADMIN_DATA.trendLabels, ADMIN_DATA.trendValues, null, "#6f46ff")}</div></div>
        <div class="surface"><div class="surface-head"><div><h3>待审核队列</h3><p>充值 / 提现 / 结算 / 发票</p></div></div><div class="list"><div class="list-item"><strong>对公充值</strong><span>2 笔待审核，合计 ¥420,000</span></div><div class="list-item"><strong>提现打款</strong><span>2 笔待处理，合计 ¥20,000</span></div><div class="list-item"><strong>待结算订单</strong><span>2 笔，合计 ¥60,000</span></div><div class="list-item"><strong>待开发票</strong><span>2 笔申请等待开具或回票</span></div></div></div>
      </div>
    `;
  }

  function renderAdminBudget() {
    return `
      <div class="surface">
        <div class="surface-head"><div><h3>团队预算矩阵</h3><p>可用、冻结、当月已用、剩余阈值</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>团队</th><th>可用余额</th><th>冻结金额</th><th>本月已用</th><th>剩余阈值</th><th>状态</th></tr></thead><tbody>${ADMIN_DATA.teams.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td><span class="tag ${row[5].includes("追加") ? "orange" : row[5].includes("低") ? "purple" : "green"}">${row[5]}</span></td></tr>`).join("")}</tbody></table></div>
      </div>
      <div class="grid-2" style="margin-top:16px;">
        <div class="surface"><div class="surface-head"><div><h3>追加预算队列</h3><p>系统建议</p></div></div><div class="list"><div class="list-item"><strong>短剧制作中心</strong><span>建议追加 ¥300,000，用于 6 月项目锁资。</span></div><div class="list-item"><strong>市场宣传组</strong><span>建议追加 ¥80,000，覆盖 2 个短视频包与活动物料。</span></div></div></div>
        <div class="surface"><div class="surface-head"><div><h3>本月划拨记录</h3><p>最新动作</p></div></div><div class="list"><div class="list-item"><strong>AL-2026052502</strong><span>企业总池 → 短剧制作中心，¥200,000，已到账。</span></div><div class="list-item"><strong>AL-2026051401</strong><span>企业总池 → 市场宣传组，¥100,000，已到账。</span></div><div class="list-item"><strong>AL-2026050602</strong><span>企业总池 → 品牌合作组，¥180,000，已到账。</span></div></div></div>
      </div>
    `;
  }

  function renderAdminAudit() {
    return `
      <div class="grid-2">
        <div class="surface"><div class="surface-head"><div><h3>对公充值审核</h3><p>待财务处理</p></div></div><div class="queue">${ADMIN_DATA.queues.recharge.map(row => `<div class="queue-item"><div><strong>${row[0]}</strong><span>${row[1]}</span></div><div>${row[2]}</div><div>${row[3]}</div><div><span class="tag orange">${row[4]}</span></div><a class="btn" href="#">查看凭证</a></div>`).join("")}</div></div>
        <div class="surface"><div class="surface-head"><div><h3>提现审核与打款</h3><p>待风控 / 待出纳</p></div></div><div class="queue">${ADMIN_DATA.queues.withdraw.map(row => `<div class="queue-item"><div><strong>${row[0]}</strong><span>${row[1]}</span></div><div>${row[2]}</div><div>${row[3]}</div><div><span class="tag orange">${row[4]}</span></div><a class="btn" href="#">去处理</a></div>`).join("")}</div></div>
      </div>
    `;
  }

  function renderAdminSettlement() {
    return `
      <div class="grid-2">
        <div class="surface"><div class="surface-head"><div><h3>待结算订单</h3><p>订单结算队列</p></div></div><div class="queue">${ADMIN_DATA.queues.settlement.map(row => `<div class="queue-item"><div><strong>${row[0]}</strong><span>${row[1]}</span></div><div>${row[2]}</div><div>${row[3]}</div><div><span class="tag blue">${row[4]}</span></div><a class="btn" href="#">执行结算</a></div>`).join("")}</div></div>
        <div class="surface"><div class="surface-head"><div><h3>发票处理队列</h3><p>开票与回票</p></div></div><div class="queue">${ADMIN_DATA.queues.invoice.map(row => `<div class="queue-item"><div><strong>${row[0]}</strong><span>${row[1]}</span></div><div>${row[2]}</div><div>${row[3]}</div><div><span class="tag purple">${row[4]}</span></div><a class="btn" href="#">去处理</a></div>`).join("")}</div></div>
      </div>
    `;
  }

  function renderReconciliationDrawer(detailId = "detail_001") {
    const detail = findReconDetail(detailId);
    return `
      <div class="recharge-modal-mask reconciliation-drawer-mask" data-reconciliation-drawer="detail" hidden>
        <div class="recharge-modal reconciliation-drawer">
          <div class="config-modal-head">
            <div>
              <h3 data-recon-field="title">${detail.title}</h3>
              <p data-recon-field="subtitle">${detail.date} · ${detail.businessType} · ${detail.businessOrderNo}</p>
            </div>
            <button class="config-close" type="button" data-close-reconciliation-drawer="detail">×</button>
          </div>
          <div class="recharge-modal-body">
            <div class="surface reconciliation-overview">
              <div class="surface-head">
                <div>
                  <h3>差异概览</h3>
                  <p>用于快速判断风险等级、当前处理人和关闭路径。</p>
                </div>
                <div class="table-actions">
                  <span class="tag ${riskTone(detail.riskLevel)}" data-recon-field="riskTag">${detail.riskLevel}风险</span>
                  <span class="tag ${processingStatusTone(detail.processingStatus)}" data-recon-field="processingTag">${detail.processingStatus}</span>
                </div>
              </div>
              <div data-recon-section="overview">${renderReconFactGrid(detail.overview)}</div>
            </div>

            <div class="grid-2" style="margin-top:16px;">
              <div class="surface">
                <div class="surface-head"><div><h3>天合侧数据</h3><p>平台记录事实，适合核对业务单号、金额、状态和规则版本。</p></div></div>
                <div data-recon-section="platformFacts">${renderReconFactGrid(detail.platformFacts)}</div>
              </div>
              <div class="surface">
                <div class="surface-head"><div><h3>汇付侧数据</h3><p>汇付查询或账单结果，敏感字段按原型要求脱敏展示。</p></div></div>
                <div data-recon-section="huifuFacts">${renderReconFactGrid(detail.huifuFacts)}</div>
              </div>
            </div>

            <div class="surface" style="margin-top:16px;" data-recon-section-wrap="snapshot" ${detail.snapshot.length ? "" : "hidden"}>
              <div class="surface-head"><div><h3>分账计算快照</h3><p>分账差异需要展示平台规则快照，定位费率、小数处理和手续费口径。</p></div></div>
              <div data-recon-section="snapshot">${renderReconFactGrid(detail.snapshot)}</div>
            </div>

            <div class="grid-2" style="margin-top:16px;">
              <div class="surface">
                <div class="surface-head"><div><h3>处理信息</h3><p>一期只记录过程，不允许通过后台直接修改真实资金结果。</p></div></div>
                <div class="detail-grid">
                  <div class="detail-item"><span class="detail-label">处理状态</span><span class="detail-value" data-recon-form="status">${detail.processingForm.status}</span></div>
                  <div class="detail-item"><span class="detail-label">负责人</span><span class="detail-value" data-recon-form="owner">${detail.processingForm.owner}</span></div>
                  <div class="detail-item"><span class="detail-label">差异原因</span><span class="detail-value" data-recon-form="reason">${detail.processingForm.reason}</span></div>
                  <div class="detail-item"><span class="detail-label">处理动作</span><span class="detail-value" data-recon-form="action">${detail.processingForm.action}</span></div>
                  <div class="detail-item"><span class="detail-label">处理结论</span><span class="detail-value" data-recon-form="conclusion">${detail.processingForm.conclusion}</span></div>
                  <div class="detail-item"><span class="detail-label">关联工单</span><span class="detail-value" data-recon-form="ticket">${detail.processingForm.ticket}</span></div>
                  <div class="detail-item"><span class="detail-label">备注</span><span class="detail-value" data-recon-form="remark">${detail.processingForm.remark}</span></div>
                </div>
              </div>
              <div class="surface">
                <div class="surface-head"><div><h3>操作记录</h3><p>保留重新查询、重新对账、人工处理的全链路日志。</p></div></div>
                <div class="timeline" data-recon-section="logs">
                  ${detail.logs.map(log => `<div class="timeline-item ${log[1].includes("系统") ? "" : "done"}"><div class="timeline-head"><strong>${log[2]}</strong><span class="timeline-meta">${log[0]} · ${log[1]}</span></div><div class="tiny">${log[3]}</div></div>`).join("")}
                </div>
              </div>
            </div>
          </div>
          <div class="config-modal-foot">
            <button class="btn secondary" type="button">重新查询汇付状态</button>
            <button class="btn" type="button">重新对账</button>
            <button class="btn" type="button">开始处理</button>
            <button class="btn primary" type="button">标记已处理</button>
            <button class="btn" type="button">人工确认关闭</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdminReconciliation() {
    return `
      <div class="info-banner">
        <ul>
          <li>系统每日自动核对天合与汇付前一自然日的支付、退款、分账及提现数据。</li>
          <li>重新执行和重新查询仅会重新拉取数据并重新比对，不会触发真实支付、退款、分账或提现。</li>
        </ul>
      </div>
      <div class="surface">
        <div class="surface-head"><div><h3>筛选条件</h3><p>默认展示最近 7 天批次，可按状态、业务类型和批次号快速定位。</p></div></div>
        <div class="form-grid">
          <div class="field"><label>对账日期</label><input value="2026-07-09 ~ 2026-07-15"></div>
          <div class="field"><label>对账状态</label><select><option>全部</option><option>存在差异</option><option>对账一致</option><option>执行失败</option></select></div>
          <div class="field"><label>业务类型</label><select><option>全部</option><option>支付</option><option>退款</option><option>分账</option><option>提现</option></select></div>
          <div class="field"><label>处理状态</label><select><option>全部</option><option>待处理</option><option>处理中</option><option>已处理</option></select></div>
          <div class="field"><label>批次号</label><input value="" placeholder="支持模糊搜索，例如 DZ20260715001"></div>
        </div>
        <div class="form-actions">
          <button class="btn primary" type="button">查询</button>
          <button class="btn" type="button">重置</button>
        </div>
      </div>
      <div class="grid-4" style="margin-top:16px;">${metricCards(RECONCILIATION_DATA.overviewMetrics)}</div>
      <div class="surface" style="margin-top:16px;">
        <div class="surface-head">
          <div><h3>对账批次列表</h3><p>同时展示对账状态和差异处理状态，便于区分“存在差异”与“是否已处理”。</p></div>
          <div class="table-actions">
            <a class="btn mini primary" href="${buildPageUrl("adminReconciliationDiffs")}">查看差异明细</a>
            <button class="btn mini" type="button">导出汇总</button>
          </div>
        </div>
        <div class="table-wrap">
          <table style="min-width: 1800px;">
            <thead>
              <tr>
                <th>对账日期</th><th>批次号</th><th>对账范围</th><th>天合交易笔数</th><th>汇付交易笔数</th><th>天合交易金额</th><th>汇付交易金额</th><th>一致笔数</th><th>差异笔数</th><th>差异金额</th><th>未处理差异</th><th>对账状态</th><th>处理状态</th><th>完成时间</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${RECONCILIATION_DATA.batches.map(row => `
                <tr class="${row.diffCount > 0 || row.reconStatus.includes("失败") ? "row-focus" : ""}">
                  <td>${row.date}</td>
                  <td><strong>${row.batchNo}</strong><div class="tiny">${row.version}</div></td>
                  <td>${row.scope}</td>
                  <td>${row.platformCount}</td>
                  <td>${row.huifuCount}</td>
                  <td>${fmtMoney(row.platformAmount)}</td>
                  <td>${fmtMoney(row.huifuAmount)}</td>
                  <td>${row.matchedCount}</td>
                  <td>${row.diffCount}</td>
                  <td class="${row.diffAmount ? "amt-warn" : ""}">${fmtMoney(row.diffAmount)}</td>
                  <td>${row.unresolvedCount}</td>
                  <td><span class="tag ${reconStatusTone(row.reconStatus)}">${row.reconStatus}</span></td>
                  <td><span class="tag ${processingStatusTone(row.processingStatus)}">${row.processingStatus}</span></td>
                  <td>${row.completedAt}</td>
                  <td>
                    <div class="table-actions">
                      <a class="btn mini primary" href="${buildPageUrl("adminReconciliationDetail", { batch: row.batchNo })}">查看详情</a>
                      <button class="btn mini" type="button">重新执行</button>
                      <button class="btn mini" type="button">导出</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAdminReconciliationDetail(routeState = {}) {
    const batch = findReconBatch(routeState.batch);
    const bizType = routeState.bizType || "all";
    const tabDefs = [
      ["all", "全部"],
      ["payment", "支付"],
      ["refund", "退款"],
      ["sharing", "分账"],
      ["withdraw", "提现"]
    ].map(item => {
      const count = item[0] === "all" ? batch.rows.length : batch.rows.filter(row => (
        (item[0] === "payment" && row.businessType === "支付")
        || (item[0] === "refund" && row.businessType === "退款")
        || (item[0] === "sharing" && row.businessType === "分账")
        || (item[0] === "withdraw" && row.businessType === "提现")
      )).length;
      return { key: item[0], label: item[1], count };
    });
    const filteredRows = batch.rows.filter(row => {
      if (bizType === "all") return true;
      if (bizType === "payment") return row.businessType === "支付";
      if (bizType === "refund") return row.businessType === "退款";
      if (bizType === "sharing") return row.businessType === "分账";
      if (bizType === "withdraw") return row.businessType === "提现";
      return true;
    });

    return `
      <div class="summary-strip">
        <div class="summary-box">
          <div class="kicker">批次信息</div>
          <div class="big">${batch.date} 对账详情</div>
          <div class="chip-row">
            <span class="chip">${batch.batchNo}</span>
            <span class="tag ${reconStatusTone(batch.reconStatus)}">${batch.reconStatus}</span>
            <span class="tag ${processingStatusTone(batch.processingStatus)}">${batch.processingStatus}</span>
          </div>
          <div class="tiny" style="margin-top:10px;">完成时间：${batch.completedAt} · 当前展示版本：${batch.version}</div>
        </div>
        <div class="summary-box">
          <div class="kicker">重新执行说明</div>
          <div class="big" style="font-size:18px;">仅重新拉取数据并重新对账</div>
          <div class="tiny">不会发起真实支付、退款、分账或提现操作。</div>
        </div>
        <div class="summary-box">
          <div class="kicker">操作</div>
          <div class="summary-actions">
            <a class="btn mini primary" href="${buildPageUrl("adminReconciliation")}">返回批次列表</a>
            <button class="btn mini" type="button">重新执行</button>
            <button class="btn mini" type="button">导出</button>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="surface">
          <div class="surface-head"><div><h3>交易笔数</h3><p>天合和汇付交易量对比，便于快速判断批次整体一致性。</p></div></div>
          <div class="split-metric">
            <div class="cell"><div class="label">天合交易笔数</div><div class="value">${batch.platformCount}</div></div>
            <div class="cell"><div class="label">汇付交易笔数</div><div class="value">${batch.huifuCount}</div></div>
            <div class="cell"><div class="label">一致笔数</div><div class="value">${batch.matchedCount}</div></div>
            <div class="cell"><div class="label">差异笔数</div><div class="value">${batch.diffCount}</div></div>
          </div>
        </div>
        <div class="surface">
          <div class="surface-head"><div><h3>交易金额</h3><p>金额均以元展示，后端实际应以分为最小单位做比较。</p></div></div>
          <div class="split-metric">
            <div class="cell"><div class="label">天合交易金额</div><div class="value">${fmtMoney(batch.platformAmount)}</div></div>
            <div class="cell"><div class="label">汇付交易金额</div><div class="value">${fmtMoney(batch.huifuAmount)}</div></div>
            <div class="cell"><div class="label">差异金额</div><div class="value ${batch.diffAmount ? "amt-warn" : ""}">${fmtMoney(batch.diffAmount)}</div></div>
            <div class="cell"><div class="label">未处理差异</div><div class="value">${batch.unresolvedCount}</div></div>
          </div>
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px;">
        <div class="surface">
          <div class="surface-head"><div><h3>差异分类</h3><p>金额、状态、流水缺失和重复交易等分类，帮助快速分派处理路径。</p></div></div>
          <div class="list">${batch.diffStats.map(item => `<div class="list-item"><strong>${item[0]}</strong><span>${item[1]} · ${item[2]}</span></div>`).join("")}</div>
        </div>
        <div class="surface">
          <div class="surface-head"><div><h3>处理进度</h3><p>对账状态和差异处理状态分离展示，避免把“人工关闭”误认为“已一致”。</p></div></div>
          <div class="list">${batch.progressStats.map(item => `<div class="list-item"><strong>${item[0]}</strong><span>${item[1]} 笔 · ${item[2]}</span></div>`).join("")}</div>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head">
          <div><h3>业务类型</h3><p>可按支付、退款、分账、提现切换查看明细。</p></div>
          <div class="inline-tabs">
            ${tabDefs.map(tab => `<a class="tab ${bizType === tab.key ? "active" : ""}" href="${buildPageUrl("adminReconciliationDetail", { batch: batch.batchNo, bizType: tab.key })}">${tab.label} ${tab.count}</a>`).join("")}
          </div>
        </div>
        <div class="compact-filters expanded" data-filter-panel="reconciliationDetail">
          <div class="form-grid">
            <div class="field"><label>业务单号</label><input placeholder="订单号 / 退款单号 / 分账单号 / 提现单号"></div>
            <div class="field"><label>天合流水号</label><input placeholder="TH202607150001"></div>
            <div class="field"><label>汇付流水号</label><input placeholder="HF202607150001"></div>
            <div class="field"><label>对账结果</label><select><option>全部</option><option>一致</option><option>差异</option></select></div>
            <div class="field advanced-filter"><label>差异类型</label><select><option>全部</option><option>金额不一致</option><option>状态不一致</option><option>汇付流水缺失</option><option>天合流水缺失</option></select></div>
            <div class="field advanced-filter"><label>处理状态</label><select><option>全部</option><option>待处理</option><option>处理中</option><option>已处理</option></select></div>
            <div class="field advanced-filter"><label>负责人</label><select><option>全部</option><option>王敏</option><option>刘畅</option><option>未分配</option></select></div>
          </div>
          <div class="form-actions">
            <button class="btn primary" type="button">查询</button>
            <button class="btn" type="button">重置</button>
          </div>
        </div>
        <div class="table-wrap" style="margin-top:16px;">
          <table style="min-width: 2400px;">
            <thead>
              <tr>
                <th>业务类型</th><th>天合业务单号</th><th>天合交易流水号</th><th>汇付交易流水号</th><th>原交易流水号</th><th>交易主体</th><th>天合金额</th><th>汇付金额</th><th>金额差异</th><th>天合状态</th><th>汇付状态</th><th>交易时间</th><th>汇付完成时间</th><th>对账结果</th><th>差异类型</th><th>处理状态</th><th>负责人</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRows.map(row => `
                <tr class="${row.reconciliationResult === "差异" ? "row-focus" : ""}">
                  <td>${row.businessType}</td>
                  <td>${row.businessOrderNo}</td>
                  <td>${row.platformTransactionNo}</td>
                  <td>${row.huifuTransactionNo}</td>
                  <td>${row.originalTransactionNo}</td>
                  <td>${row.counterpartyName}</td>
                  <td>${fmtMoney(row.platformAmount)}</td>
                  <td>${fmtMoney(row.huifuAmount)}</td>
                  <td class="${row.diffAmount !== 0 ? "amt-warn" : ""}">${fmtDeltaMoney(row.diffAmount)}</td>
                  <td>${row.platformStatus}</td>
                  <td>${row.huifuStatus}</td>
                  <td>${row.transactionTime}</td>
                  <td>${row.huifuCompletedAt}</td>
                  <td><span class="tag ${row.reconciliationResult === "一致" ? "green" : "orange"}">${row.reconciliationResult === "一致" ? "对账一致" : "存在差异"}</span></td>
                  <td>${row.differenceType}</td>
                  <td><span class="tag ${processingStatusTone(row.processingStatus)}">${row.processingStatus}</span></td>
                  <td>${row.ownerName}</td>
                  <td>
                    <div class="table-actions">
                      <button class="btn mini primary" type="button" data-open-reconciliation-drawer="detail" data-reconciliation-detail-id="${row.id}">查看详情</button>
                      <button class="btn mini" type="button">重新查询</button>
                      <button class="btn mini" type="button">${row.processingStatus === "待处理" ? "开始处理" : "继续处理"}</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="surface" style="margin-top:16px;">
        <div class="surface-head"><div><h3>执行版本与操作日志</h3><p>保留历史执行版本、失败原因和重试记录，用于排查账单延迟或任务异常。</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>版本</th><th>完成时间</th><th>触发方式</th><th>结果</th><th>说明</th></tr></thead>
            <tbody>${batch.executionLogs.map(log => `<tr><td>${log[0]}</td><td>${log[1]}</td><td>${log[2]}</td><td><span class="tag ${reconStatusTone(log[3])}">${log[3]}</span></td><td>${log[4]}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>

      ${renderReconciliationDrawer()}
    `;
  }

  function renderAdminReconciliationDiffs() {
    return `
      <div class="info-banner">
        <ul>
          <li>集中查看并处理天合与汇付之间的资金差异，适合财务按责任人和风险等级持续跟进。</li>
          <li>高风险差异优先关注：天合流水缺失、支付状态错判、重复支付或重复退款。</li>
        </ul>
      </div>
      <div class="surface">
        <div class="surface-head"><div><h3>筛选条件</h3><p>支持跨日期、差异类型、风险等级和负责人维度筛选。</p></div></div>
        <div class="form-grid">
          <div class="field"><label>对账日期</label><input value="2026-07-09 ~ 2026-07-15"></div>
          <div class="field"><label>业务类型</label><select><option>全部</option><option>支付</option><option>退款</option><option>分账</option><option>提现</option></select></div>
          <div class="field"><label>差异类型</label><select><option>全部</option><option>汇付流水缺失</option><option>天合流水缺失</option><option>金额不一致</option><option>状态不一致</option></select></div>
          <div class="field"><label>风险等级</label><select><option>全部</option><option>高</option><option>中</option><option>低</option></select></div>
          <div class="field"><label>处理状态</label><select><option>全部</option><option>待处理</option><option>处理中</option><option>已处理</option></select></div>
          <div class="field"><label>负责人</label><select><option>全部</option><option>王敏</option><option>刘畅</option><option>未分配</option></select></div>
          <div class="field"><label>业务单号</label><input placeholder="例如 OD202607150013"></div>
          <div class="field"><label>汇付流水号</label><input placeholder="例如 HF202607140119"></div>
        </div>
        <div class="form-actions">
          <button class="btn primary" type="button">查询</button>
          <button class="btn" type="button">重置</button>
        </div>
      </div>
      <div class="grid-4" style="margin-top:16px;">${metricCards(RECONCILIATION_DATA.differenceMetrics)}</div>
      <div class="surface" style="margin-top:16px;">
        <div class="surface-head">
          <div><h3>差异明细列表</h3><p>字段与批次详情保持一致，并额外展示对账日期、批次号、风险等级和最后处理时间。</p></div>
          <div class="table-actions">
            <button class="btn mini primary" type="button">导出差异明细</button>
          </div>
        </div>
        <div class="table-wrap">
          <table style="min-width: 2200px;">
            <thead>
              <tr>
                <th>对账日期</th><th>批次号</th><th>业务类型</th><th>天合业务单号</th><th>天合流水号</th><th>汇付流水号</th><th>交易主体</th><th>天合金额</th><th>汇付金额</th><th>金额差异</th><th>天合状态</th><th>汇付状态</th><th>差异类型</th><th>风险等级</th><th>处理状态</th><th>负责人</th><th>最后处理时间</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${RECONCILIATION_DATA.differences.map(row => `
                <tr class="row-focus">
                  <td>${row.date}</td>
                  <td><a class="text-link" href="${buildPageUrl("adminReconciliationDetail", { batch: row.batchNo })}">${row.batchNo}</a></td>
                  <td>${row.businessType}</td>
                  <td>${row.businessOrderNo}</td>
                  <td>${row.platformTransactionNo}</td>
                  <td>${row.huifuTransactionNo}</td>
                  <td>${row.counterpartyName}</td>
                  <td>${fmtMoney(row.platformAmount)}</td>
                  <td>${fmtMoney(row.huifuAmount)}</td>
                  <td class="${row.diffAmount !== 0 ? "amt-warn" : ""}">${fmtDeltaMoney(row.diffAmount)}</td>
                  <td>${row.platformStatus}</td>
                  <td>${row.huifuStatus}</td>
                  <td>${row.differenceType}</td>
                  <td><span class="tag ${riskTone(row.riskLevel)}">${row.riskLevel}风险</span></td>
                  <td><span class="tag ${processingStatusTone(row.processingStatus)}">${row.processingStatus}</span></td>
                  <td>${row.ownerName}</td>
                  <td>${row.lastProcessedAt}</td>
                  <td>
                    <div class="table-actions">
                      <button class="btn mini primary" type="button" data-open-reconciliation-drawer="detail" data-reconciliation-detail-id="${row.detailId}">查看详情</button>
                      <button class="btn mini" type="button">重新查询</button>
                      <a class="btn mini" href="${buildPageUrl("adminReconciliationDetail", { batch: row.batchNo })}">查看批次</a>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      ${renderReconciliationDrawer("detail_002")}
    `;
  }

  function currentPage() {
    return document.body.dataset.page || "index";
  }

  function buildNav(page, accountScope = "team") {
    const isAdminSection = (PAGES[page] || {}).section === "admin";
    const activePage = page === "adminReconciliationDetail" ? "adminReconciliation" : page;
    const groups = (isAdminSection ? NAV.admin : NAV.finance)
      .map(group => ({
        ...group,
        items: isAdminSection
          ? group.items
          : accountScope === "personal"
            ? group.items.filter(item => item[0] !== "overview")
            : group.items
      }))
      .filter(group => group.items.length > 0);
    const finance = groups.map(group => {
      const links = group.items.map(item => `<a class="nav-link ${activePage === item[0] ? "active" : ""}" href="${pageToFile(item[0])}"><span class="nav-icon">${item[2]}</span><span>${item[1]}</span></a>`).join("");
      return `<div class="nav-group"><div class="nav-title">${group.title}</div>${links}</div>`;
    }).join("");
    return `
      ${finance}
      <div class="sidebar-block"><strong>${isAdminSection ? "后台口径" : "菜单口径"}</strong><span>${isAdminSection ? "对账后台只做查询、重试、记录和导出，不允许人工修改真实资金结果。" : "用户端资金中心只保留账户、余额、账单、流水、积分、发票和设置。"}</span></div>
    `;
  }

  function getPageActions(page, teamKey, routeState = {}) {
    if (page !== "orderDetail") return PAGES[page]?.actions || [];
    const context = resolveOrderContext(teamKey, routeState);
    const backPage = ["overview", "transactions", "bills"].includes(context.fromPage) ? context.fromPage : "overview";
    return [
      { label: "查看关联流水", href: buildOrderLinkedPageHref("transactions", context.teamKey, context.orderNo, context.bizNo, "orderDetail"), tone: "primary" },
      { label: `返回${getPageLabel(backPage)}`, href: buildPageUrl(backPage, { team: context.teamKey, bizNo: context.bizNo }, { from: "orderDetail", orderNo: context.orderNo }), tone: "" }
    ];
  }

  function renderPage(page, teamKey, accountScope = "team", routeState = {}) {
    if (page === "index") return renderIndex();
    const team = TEAM_DATA[teamKey] || TEAM_DATA.drama;
    switch (page) {
      case "overview": return renderOverview(team, routeState);
      case "accounts": return renderAccounts(team, accountScope);
      case "transactions": return renderTransactions(team, routeState);
      case "fundFlows": return renderFundFlows(team);
      case "bills": return renderBills(team, routeState);
      case "points": return renderPoints(team, accountScope);
      case "invoices": return renderInvoices(team);
      case "recharge": return renderRecharge(team, accountScope);
      case "withdraw": return renderWithdraw(team);
      case "security": return renderSecurity(team);
      case "orderDetail": return renderOrderDetail(team, teamKey, routeState);
      case "adminOverview": return renderAdminOverview();
      case "adminBudget": return renderAdminBudget();
      case "adminAudit": return renderAdminAudit();
      case "adminSettlement": return renderAdminSettlement();
      case "adminReconciliation": return renderAdminReconciliation();
      case "adminReconciliationDiffs": return renderAdminReconciliationDiffs();
      case "adminReconciliationDetail": return renderAdminReconciliationDetail(routeState);
      default: return renderIndex();
    }
  }

  function getStoredTeam() {
    try {
      return localStorage.getItem("finance_center_proto_team") || "drama";
    } catch (error) {
      return "drama";
    }
  }

  function getStoredAccountScope() {
    try {
      return localStorage.getItem("finance_center_proto_account_scope") || "team";
    } catch (error) {
      return "team";
    }
  }

  function setStoredTeam(teamKey) {
    try {
      localStorage.setItem("finance_center_proto_team", teamKey);
    } catch (error) {
      return;
    }
  }

  function setStoredAccountScope(accountScope) {
    try {
      localStorage.setItem("finance_center_proto_account_scope", accountScope);
    } catch (error) {
      return;
    }
  }

  function renderMountError(error) {
    const message = error && error.message ? error.message : "未知错误";
    return `
      <div class="shell">
        <div class="layout" style="grid-template-columns:1fr;">
          <main class="content">
            <section class="page-card">
              <div class="page-head">
                <div>
                  <h2>原型加载失败</h2>
                  <p>页面已经从纯静态壳切换成动态挂载模式。如果浏览器阻止了本地存储或脚本运行，这里会直接报错而不是空白。</p>
                </div>
                <div class="page-actions">
                  <a class="btn primary" href="index.html">返回目录</a>
                </div>
              </div>
              <div class="info-banner">
                <ul>
                  <li>错误信息：${message}</li>
                  <li>建议直接在系统浏览器中打开当前 HTML 文件，或继续让我把这套原型改成完全静态直出版本。</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
  }

  function applyColumnVisibility(page) {
    const state = columnState[page];
    if (!state) return;
    document.querySelectorAll(`[data-table="${page}"] [data-col]`).forEach(node => {
      const key = node.getAttribute("data-col");
      node.classList.toggle("col-hidden", state[key] === false);
    });
  }

  function syncColumnModal(page) {
    const state = columnState[page];
    if (!state) return;
    document.querySelectorAll(`[data-column-toggle="${page}"]`).forEach(input => {
      input.checked = state[input.value] !== false;
    });
  }

  function openColumnModal(page) {
    const modal = document.querySelector(`[data-config-modal="${page}"]`);
    if (!modal) return;
    syncColumnModal(page);
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeColumnModal(page) {
    const modal = document.querySelector(`[data-config-modal="${page}"]`);
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function syncRechargeDetailModal(team, recordIndex) {
    const detail = buildRechargeDetail(team, recordIndex);
    const tag = document.querySelector('[data-recharge-detail-field="statusTag"]');
    if (tag) {
      tag.textContent = detail.status;
      tag.className = `tag ${detail.status.includes("到账") || detail.status.includes("成功") ? "green" : detail.status.includes("失败") ? "red" : "orange"}`;
    }
    Object.entries(detail).forEach(([key, value]) => {
      const node = document.querySelector(`[data-recharge-detail-field="${key}"]`);
      if (node) node.textContent = value;
    });
  }

  function syncWithdrawDetailModal(team, recordIndex) {
    const detail = buildWithdrawDetail(team, recordIndex);
    const tag = document.querySelector('[data-withdraw-detail-field="statusTag"]');
    if (tag) {
      tag.textContent = detail.status;
      tag.className = `tag ${detail.status.includes("到账") ? "green" : detail.status.includes("驳回") || detail.status.includes("失败") ? "red" : "orange"}`;
    }
    Object.entries(detail).forEach(([key, value]) => {
      const node = document.querySelector(`[data-withdraw-detail-field="${key}"]`);
      if (node) node.textContent = value;
    });
  }

  function syncBillDetailModal(team, recordIndex) {
    const row = buildLinkedBillDetailRows(team)[recordIndex] || buildLinkedBillDetailRows(team)[0];
    const tag = document.querySelector('[data-bill-detail-field="statusTag"]');
    if (tag) {
      tag.textContent = row.status;
      tag.className = `tag ${row.statusTone}`;
    }
    Object.entries(row).forEach(([key, value]) => {
      const node = document.querySelector(`[data-bill-detail-field="${key}"]`);
      if (node) node.textContent = value;
    });
    const refundButton = document.querySelector('[data-bill-detail-field="refundAction"]');
    if (refundButton) {
      refundButton.textContent = row.refundAction || "联系客服";
      refundButton.disabled = row.refundAction === "不可退款";
      refundButton.className = `btn mini ${row.refundAction === "申请退款" ? "primary" : ""}`;
    }
    const orderLink = document.querySelector('[data-bill-detail-field="orderHref"]');
    if (orderLink && "href" in orderLink) {
      orderLink.href = row.orderHref || "#";
      orderLink.hidden = !row.orderHref;
    }
  }

  function syncPointsRechargeExchangeModal(mode = "direct") {
    const teamKey = getStoredTeam();
    const team = TEAM_DATA[teamKey] || TEAM_DATA.drama;
    const accountScope = getStoredAccountScope();
    const context = getPointsRechargeContext(team, accountScope, mode);
    const values = {
      modeLabel: context.modeLabel,
      subtitle: context.subtitle,
      cardDesc: context.cardDesc,
      rechargeAmount: `¥ ${context.rechargeAmount.toLocaleString("zh-CN")}`,
      exchangeAmount: `¥ ${context.exchangeAmount.toLocaleString("zh-CN")}`,
      exchangePoints: `${context.exchangePoints.toLocaleString("zh-CN")} 分`,
      rechargeInput: context.rechargeAmount.toLocaleString("zh-CN")
    };

    Object.entries(values).forEach(([key, value]) => {
      const node = document.querySelector(`[data-points-recharge-field="${key}"]`);
      if (!node) return;
      if ("value" in node) node.value = value;
      else node.textContent = value;
    });
    const quickAmounts = document.querySelector('[data-points-recharge-field="quickAmounts"]');
    if (quickAmounts) quickAmounts.hidden = mode === "shortage" && context.shortage > 0;
  }

  function openRechargeModal(type, options = {}) {
    document.querySelectorAll("[data-recharge-modal]").forEach(modal => {
      modal.hidden = true;
    });
    if (type === "detail") {
      const teamKey = getStoredTeam();
      const team = TEAM_DATA[teamKey] || TEAM_DATA.drama;
      syncRechargeDetailModal(team, Number(options.recordIndex || 0));
    }
    if (type === "pointsRechargeExchange") {
      syncPointsRechargeExchangeModal(options.pointsMode || "direct");
    }
    const modal = document.querySelector(`[data-recharge-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function openWithdrawModal(type, options = {}) {
    document.querySelectorAll("[data-withdraw-modal]").forEach(modal => {
      modal.hidden = true;
    });
    if (type === "detail") {
      const teamKey = getStoredTeam();
      const team = TEAM_DATA[teamKey] || TEAM_DATA.drama;
      syncWithdrawDetailModal(team, Number(options.recordIndex || 0));
    }
    const modal = document.querySelector(`[data-withdraw-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function openBillModal(type, options = {}) {
    document.querySelectorAll("[data-bill-modal]").forEach(modal => {
      modal.hidden = true;
    });
    if (type === "detail") {
      const teamKey = getStoredTeam();
      const team = TEAM_DATA[teamKey] || TEAM_DATA.drama;
      syncBillDetailModal(team, Number(options.recordIndex || 0));
    }
    const modal = document.querySelector(`[data-bill-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function openInvoiceModal(type) {
    document.querySelectorAll("[data-invoice-modal]").forEach(modal => {
      modal.hidden = true;
    });
    const modal = document.querySelector(`[data-invoice-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function syncReconciliationDrawer(detailId) {
    const detail = findReconDetail(detailId);
    const title = document.querySelector('[data-recon-field="title"]');
    const subtitle = document.querySelector('[data-recon-field="subtitle"]');
    const riskTag = document.querySelector('[data-recon-field="riskTag"]');
    const processingTag = document.querySelector('[data-recon-field="processingTag"]');
    if (title) title.textContent = detail.title;
    if (subtitle) subtitle.textContent = `${detail.date} · ${detail.businessType} · ${detail.businessOrderNo}`;
    if (riskTag) {
      riskTag.textContent = `${detail.riskLevel}风险`;
      riskTag.className = `tag ${riskTone(detail.riskLevel)}`;
    }
    if (processingTag) {
      processingTag.textContent = detail.processingStatus;
      processingTag.className = `tag ${processingStatusTone(detail.processingStatus)}`;
    }

    const overview = document.querySelector('[data-recon-section="overview"]');
    const platformFacts = document.querySelector('[data-recon-section="platformFacts"]');
    const huifuFacts = document.querySelector('[data-recon-section="huifuFacts"]');
    const snapshot = document.querySelector('[data-recon-section="snapshot"]');
    const logs = document.querySelector('[data-recon-section="logs"]');
    const snapshotWrap = document.querySelector('[data-recon-section-wrap="snapshot"]');
    if (overview) overview.innerHTML = renderReconFactGrid(detail.overview);
    if (platformFacts) platformFacts.innerHTML = renderReconFactGrid(detail.platformFacts);
    if (huifuFacts) huifuFacts.innerHTML = renderReconFactGrid(detail.huifuFacts);
    if (snapshot) snapshot.innerHTML = renderReconFactGrid(detail.snapshot);
    if (snapshotWrap) snapshotWrap.hidden = detail.snapshot.length === 0;
    if (logs) {
      logs.innerHTML = detail.logs.map(log => `<div class="timeline-item ${log[1].includes("系统") ? "" : "done"}"><div class="timeline-head"><strong>${log[2]}</strong><span class="timeline-meta">${log[0]} · ${log[1]}</span></div><div class="tiny">${log[3]}</div></div>`).join("");
    }

    Object.entries(detail.processingForm).forEach(([key, value]) => {
      const node = document.querySelector(`[data-recon-form="${key}"]`);
      if (node) node.textContent = value;
    });
  }

  function openReconciliationDrawer(type, options = {}) {
    document.querySelectorAll("[data-reconciliation-drawer]").forEach(modal => {
      modal.hidden = true;
    });
    if (type === "detail") syncReconciliationDrawer(options.detailId || "detail_001");
    const modal = document.querySelector(`[data-reconciliation-drawer="${type}"]`);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeReconciliationDrawer(type) {
    const modal = document.querySelector(`[data-reconciliation-drawer="${type}"]`);
    if (!modal) return;
    modal.hidden = true;
    if (!document.querySelector(".config-modal-mask:not([hidden]), .recharge-modal-mask:not([hidden])")) {
      document.body.classList.remove("modal-open");
    }
  }

  function closeRechargeModal(type) {
    const modal = document.querySelector(`[data-recharge-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = true;
    if (!document.querySelector(".config-modal-mask:not([hidden]), .recharge-modal-mask:not([hidden])")) {
      document.body.classList.remove("modal-open");
    }
  }

  function closeWithdrawModal(type) {
    const modal = document.querySelector(`[data-withdraw-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = true;
    if (!document.querySelector(".config-modal-mask:not([hidden]), .recharge-modal-mask:not([hidden])")) {
      document.body.classList.remove("modal-open");
    }
  }

  function applyColumnConfigFromModal(page) {
    const state = columnState[page];
    if (!state) return;
    document.querySelectorAll(`[data-column-toggle="${page}"]`).forEach(input => {
      state[input.value] = input.checked;
    });
    applyColumnVisibility(page);
    closeColumnModal(page);
  }

  function resetColumnConfig(page) {
    const config = COLUMN_CONFIGS[page];
    if (!config) return;
    columnState[page] = Object.fromEntries(
      config.groups.flatMap(group => group.columns.map(column => [column[0], column[2]]))
    );
    syncColumnModal(page);
  }

  function selectAllColumns(page) {
    document.querySelectorAll(`[data-column-toggle="${page}"]`).forEach(input => {
      input.checked = true;
    });
  }

  function toggleFilterPanel(page) {
    const panel = document.querySelector(`[data-filter-panel="${page}"]`);
    if (!panel) return;
    const expanded = panel.classList.toggle("expanded");
    const button = document.querySelector(`[data-toggle-filter-panel="${page}"]`);
    if (button) {
      button.textContent = expanded ? "收起筛选" : "更多筛选";
    }
  }

  function syncBillStatTime(periodSelect) {
    const panel = periodSelect.closest('[data-filter-panel="bills"]');
    const timeSelect = panel ? panel.querySelector("[data-bill-stat-time]") : null;
    if (!timeSelect) return;

    const options = periodSelect.value === "day"
      ? ["2026-05-01 ~ 2026-05-31", "2026-06-01 ~ 2026-06-15", "最近 7 天", "最近 30 天"]
      : ["2026-05 ~ 2026-05", "2026-04 ~ 2026-05", "2026-01 ~ 2026-06", "最近 6 个月"];
    timeSelect.innerHTML = options.map(option => `<option>${option}</option>`).join("");
  }

  function handlePrototypeChange(event) {
    const billPeriodSelect = event.target.closest("[data-bill-stat-period]");
    if (billPeriodSelect) {
      syncBillStatTime(billPeriodSelect);
    }
  }

  function closeBillModal(type) {
    const modal = document.querySelector(`[data-bill-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = true;
    if (!document.querySelector(".config-modal-mask:not([hidden]), .recharge-modal-mask:not([hidden])")) {
      document.body.classList.remove("modal-open");
    }
  }

  function closeInvoiceModal(type) {
    const modal = document.querySelector(`[data-invoice-modal="${type}"]`);
    if (!modal) return;
    modal.hidden = true;
    if (!document.querySelector(".config-modal-mask:not([hidden]), .recharge-modal-mask:not([hidden])")) {
      document.body.classList.remove("modal-open");
    }
  }

  function handlePrototypeClick(event) {
    const openInvoiceBtn = event.target.closest("[data-open-invoice-modal]");
    if (openInvoiceBtn) {
      event.preventDefault();
      openInvoiceModal(openInvoiceBtn.getAttribute("data-open-invoice-modal"));
      return;
    }

    const closeInvoiceBtn = event.target.closest("[data-close-invoice-modal]");
    if (closeInvoiceBtn) {
      event.preventDefault();
      closeInvoiceModal(closeInvoiceBtn.getAttribute("data-close-invoice-modal"));
      return;
    }

    const openBillBtn = event.target.closest("[data-open-bill-modal]");
    if (openBillBtn) {
      event.preventDefault();
      openBillModal(openBillBtn.getAttribute("data-open-bill-modal"), {
        recordIndex: openBillBtn.getAttribute("data-bill-record")
      });
      return;
    }

    const closeBillBtn = event.target.closest("[data-close-bill-modal]");
    if (closeBillBtn) {
      event.preventDefault();
      closeBillModal(closeBillBtn.getAttribute("data-close-bill-modal"));
      return;
    }

    const openWithdrawBtn = event.target.closest("[data-open-withdraw-modal]");
    if (openWithdrawBtn) {
      event.preventDefault();
      openWithdrawModal(openWithdrawBtn.getAttribute("data-open-withdraw-modal"), {
        recordIndex: openWithdrawBtn.getAttribute("data-withdraw-record")
      });
      return;
    }

    const closeWithdrawBtn = event.target.closest("[data-close-withdraw-modal]");
    if (closeWithdrawBtn) {
      event.preventDefault();
      closeWithdrawModal(closeWithdrawBtn.getAttribute("data-close-withdraw-modal"));
      return;
    }

    const openRechargeBtn = event.target.closest("[data-open-recharge-modal]");
    if (openRechargeBtn) {
      event.preventDefault();
      openRechargeModal(openRechargeBtn.getAttribute("data-open-recharge-modal"), {
        recordIndex: openRechargeBtn.getAttribute("data-recharge-record"),
        pointsMode: openRechargeBtn.getAttribute("data-points-recharge-mode")
      });
      return;
    }

    const closeRechargeBtn = event.target.closest("[data-close-recharge-modal]");
    if (closeRechargeBtn) {
      event.preventDefault();
      closeRechargeModal(closeRechargeBtn.getAttribute("data-close-recharge-modal"));
      return;
    }

    const openReconBtn = event.target.closest("[data-open-reconciliation-drawer]");
    if (openReconBtn) {
      event.preventDefault();
      openReconciliationDrawer(openReconBtn.getAttribute("data-open-reconciliation-drawer"), {
        detailId: openReconBtn.getAttribute("data-reconciliation-detail-id")
      });
      return;
    }

    const closeReconBtn = event.target.closest("[data-close-reconciliation-drawer]");
    if (closeReconBtn) {
      event.preventDefault();
      closeReconciliationDrawer(closeReconBtn.getAttribute("data-close-reconciliation-drawer"));
      return;
    }

    const openBtn = event.target.closest("[data-open-column-config]");
    if (openBtn) {
      event.preventDefault();
      openColumnModal(openBtn.getAttribute("data-open-column-config"));
      return;
    }

    const closeBtn = event.target.closest("[data-close-column-config]");
    if (closeBtn) {
      event.preventDefault();
      closeColumnModal(closeBtn.getAttribute("data-close-column-config"));
      return;
    }

    const applyBtn = event.target.closest("[data-apply-column-config]");
    if (applyBtn) {
      event.preventDefault();
      applyColumnConfigFromModal(applyBtn.getAttribute("data-apply-column-config"));
      return;
    }

    const resetBtn = event.target.closest("[data-reset-column-config]");
    if (resetBtn) {
      event.preventDefault();
      resetColumnConfig(resetBtn.getAttribute("data-reset-column-config"));
      return;
    }

    const selectAllBtn = event.target.closest("[data-select-all-columns]");
    if (selectAllBtn) {
      event.preventDefault();
      selectAllColumns(selectAllBtn.getAttribute("data-select-all-columns"));
      return;
    }

    const toggleFiltersBtn = event.target.closest("[data-toggle-filter-panel]");
    if (toggleFiltersBtn) {
      event.preventDefault();
      toggleFilterPanel(toggleFiltersBtn.getAttribute("data-toggle-filter-panel"));
      return;
    }

    const modalMask = event.target.closest(".config-modal-mask");
    if (modalMask && event.target === modalMask) {
      event.preventDefault();
      closeColumnModal(modalMask.getAttribute("data-config-modal"));
      return;
    }

    const rechargeModalMask = event.target.closest(".recharge-modal-mask");
    if (rechargeModalMask && event.target === rechargeModalMask) {
      event.preventDefault();
      const rechargeType = rechargeModalMask.getAttribute("data-recharge-modal");
      if (rechargeType) {
        closeRechargeModal(rechargeType);
        return;
      }
      const withdrawType = rechargeModalMask.getAttribute("data-withdraw-modal");
      if (withdrawType) {
        closeWithdrawModal(withdrawType);
        return;
      }
      const billType = rechargeModalMask.getAttribute("data-bill-modal");
      if (billType) {
        closeBillModal(billType);
        return;
      }
      const invoiceType = rechargeModalMask.getAttribute("data-invoice-modal");
      if (invoiceType) {
        closeInvoiceModal(invoiceType);
        return;
      }
      const reconType = rechargeModalMask.getAttribute("data-reconciliation-drawer");
      if (reconType) {
        closeReconciliationDrawer(reconType);
      }
    }
  }

  function bindPrototypeInteractions() {
    const app = document.getElementById("app");
    if (!app) return;
    app.onclick = handlePrototypeClick;
    app.onchange = handlePrototypeChange;
    app.querySelectorAll("[data-bill-stat-period]").forEach(syncBillStatTime);
  }

  function mount() {
    const app = document.getElementById("app");
    if (!app) return;

    try {
      const page = currentPage();
      const cfg = PAGES[page] || PAGES.index;
      const isAdminPage = cfg.section === "admin";
      const routeState = getRouteState();
      const storedTeam = getStoredTeam();
      let storedAccountScope = getStoredAccountScope();
      const forceTeamScope = isAdminPage || page === "orderDetail" || (page === "overview" && (routeState.orderNo || routeState.bizNo || routeState.from === "orderDetail"));
      if (forceTeamScope && storedAccountScope !== "team") {
        storedAccountScope = "team";
        setStoredAccountScope("team");
      }
      const initialTeamKey = resolveRouteTeamKey(routeState, storedTeam);
      if (initialTeamKey !== storedTeam) {
        setStoredTeam(initialTeamKey);
      }

      app.innerHTML = `
        <div class="shell">
          <header class="topbar">
            <a class="platform-return" href="../platform-home-demander.html">← 接单平台</a>
            <div class="brand">
              <div class="brand-kicker">Finance Center Prototype V2</div>
              <div class="brand-row">
                <h1>资金中心</h1>
                <select class="account-scope-select" id="accountScopeSelect">
                  <option value="team" ${storedAccountScope === "team" ? "selected" : ""}>团队账户</option>
                  <option value="personal" ${storedAccountScope === "personal" ? "selected" : ""}>个人账户</option>
                </select>
                <div class="topbar-tools">
                  <div class="selector" id="teamSelectorWrap"><label for="teamSelect">当前团队</label><select id="teamSelect"></select></div>
                  <div class="meta-pill"><span id="topAccountScopeLabel">预算口径</span><strong id="topAccountLabel">团队预算账户</strong></div>
                </div>
              </div>
              <p id="topbarSubtitle">团队预算、订单资金、后台财务一体化原型</p>
            </div>
          </header>
          <div class="layout">
            <aside class="sidebar" id="sidebarNav">${buildNav(page, storedAccountScope)}</aside>
            <main class="content">
              <section class="page-card">
                <div class="page-head">
                  <div><h2>${cfg.title}</h2><p>${cfg.desc}</p></div>
                  <div class="page-actions"></div>
                </div>
                <div id="pageMount"></div>
              </section>
            </main>
          </div>
        </div>
      `;

      const teamSelect = document.getElementById("teamSelect");
      const accountScopeSelect = document.getElementById("accountScopeSelect");
      if (isAdminPage) accountScopeSelect.hidden = true;
      Object.entries(TEAM_DATA).forEach(([key, item]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = item.name;
        if (initialTeamKey === key) option.selected = true;
        teamSelect.appendChild(option);
      });

      function refresh(teamKey, accountScope = getStoredAccountScope()) {
        const currentRouteState = getRouteState();
        const effectiveTeamKey = resolveRouteTeamKey(currentRouteState, teamKey);
        const effectiveAccountScope = page === "orderDetail" ? "team" : accountScope;
        const team = TEAM_DATA[effectiveTeamKey] || TEAM_DATA.drama;
        const isPersonalScope = effectiveAccountScope === "personal";
        const personalAccount = getPersonalAccountView(team);
        const teamSelectorWrap = document.getElementById("teamSelectorWrap");
        const topAccountScopeLabel = document.getElementById("topAccountScopeLabel");
        const topbarSubtitle = document.getElementById("topbarSubtitle");
        if (effectiveTeamKey !== getStoredTeam()) setStoredTeam(effectiveTeamKey);
        if (effectiveAccountScope !== getStoredAccountScope()) setStoredAccountScope(effectiveAccountScope);
        if (teamSelect.value !== effectiveTeamKey) teamSelect.value = effectiveTeamKey;
        if (accountScopeSelect.value !== effectiveAccountScope) accountScopeSelect.value = effectiveAccountScope;
        if (teamSelectorWrap) teamSelectorWrap.hidden = isPersonalScope;
        if (topbarSubtitle) topbarSubtitle.textContent = isPersonalScope ? "个人收益、提现、积分与账单统一管理" : "团队预算、订单资金、后台财务一体化原型";
        document.getElementById("sidebarNav").innerHTML = buildNav(page, effectiveAccountScope);
        document.getElementById("topAccountLabel").textContent = isPersonalScope ? personalAccount.name : team.accountLabel;
        topAccountScopeLabel.textContent = isPersonalScope ? "账户口径" : "预算口径";
        document.querySelector(".page-actions").innerHTML = buildButtons(getPageActions(page, effectiveTeamKey, currentRouteState));
        document.getElementById("pageMount").innerHTML = renderPage(page, effectiveTeamKey, effectiveAccountScope, currentRouteState);
        ["transactions", "fundFlows", "bills", "points"].forEach(applyColumnVisibility);
        bindPrototypeInteractions();
      }

      teamSelect.addEventListener("change", function () {
        setStoredTeam(teamSelect.value);
        refresh(teamSelect.value, accountScopeSelect.value);
      });

      accountScopeSelect.addEventListener("change", function () {
        setStoredAccountScope(accountScopeSelect.value);
        if (page === "orderDetail" && accountScopeSelect.value === "personal") {
          accountScopeSelect.value = "team";
          setStoredAccountScope("team");
          refresh(teamSelect.value, "team");
          return;
        }
        if (accountScopeSelect.value === "personal" && page === "overview") {
          window.location.href = "accounts.html";
          return;
        }
        refresh(teamSelect.value, accountScopeSelect.value);
      });

      if (storedAccountScope === "personal" && page === "overview" && !forceTeamScope) {
        window.location.href = "accounts.html";
        return;
      }

      refresh(initialTeamKey, storedAccountScope);
    } catch (error) {
      console.error(error);
      app.innerHTML = renderMountError(error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
