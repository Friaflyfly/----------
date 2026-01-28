export interface Project {
  id: string;
  projectName: string;
  category: '短剧' | 'AI漫剧' | '短视频' | '综艺';
  projectTags: string[];
  contentGenre: string;
  difficulty: '精品' | '工厂';
  deliveryCycleDays: number;
  episodeCount: number;
  participantTeam: '实训' | '线下' | '线上';
  takeMode: '抢单' | '报名';
  quotaTotal: number;
  quotaTaken: number;
  status: 'Draft' | 'Published' | 'ClosedForTaking' | 'Closed' | 'Archived';
  unitPrice: number;
  dueTime: string;
  publishTime: string;
  isTop?: boolean;
  disabledReason?: string;
}

// 项目详情页扩展字段
export interface ProjectDetail extends Project {
  // 需求与素材
  requirementText: string; // 项目需求（文本）
  requirementAttachments?: Array<{
    id: string;
    name: string;
    url: string;
    size?: number;
  }>; // 项目需求（附件）
  deliveryRequirements?: {
    namingConvention?: string; // 命名规范
    resolution?: string; // 分辨率
    bitrate?: string; // 码率
    subtitleSpec?: string; // 字幕规范
    [key: string]: any;
  }; // 交付要求（模板字段，仅提示）
  materialNote?: string; // 素材说明
  materialPackageFiles?: Array<{
    id: string;
    name: string;
    url: string;
    size?: number;
    type?: string;
  }>; // 素材包
}

// 榜单类型
export type LeaderboardType = 'totalOrders' | 'totalRevenue' | 'recentActivity';

// 榜单数据项
export interface LeaderboardItem {
  id: string;
  rank: number;
  nickname: string;
  username: string;
  avatar?: string;
  // 总接单量
  totalOrders: number;
  // 总收益（已验收订单金额 - 扣款调整）
  totalRevenue: number;
  // 近期活跃度（近7天行为加权）
  recentActivity: number;
  // 活跃度明细（可选，用于展示）
  activityDetails?: {
    loginCount: number; // 登录次数
    submitEpisodes: number; // 提交集数
    takeEpisodes: number; // 接单集数
    deliverEpisodes: number; // 交付集数
  };
}
