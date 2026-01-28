import React, { useState, useMemo } from 'react';
import { Tabs, Card, Tag, Button, Select, DatePicker, Space, Row, Col, Badge } from 'antd';
import { ClockCircleOutlined, UserOutlined, FireOutlined } from '@ant-design/icons';
import type { Project } from './types';
import styles from './ProjectHall.module.less';
import dayjs, { Dayjs } from 'dayjs';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock 数据 - 6条不同类别的项目
const mockProjects: Project[] = [
  {
    id: '1',
    projectName: '霸道总裁爱上我',
    category: '短剧',
    projectTags: ['霸总', '女频'],
    contentGenre: '霸总',
    difficulty: '精品',
    deliveryCycleDays: 7,
    episodeCount: 20,
    participantTeam: '线上',
    takeMode: '抢单',
    quotaTotal: 5,
    quotaTaken: 3,
    status: 'Published',
    unitPrice: 500,
    dueTime: '2024-02-15 18:00:00',
    publishTime: '2024-01-20 10:00:00',
    isTop: false,
  },
  {
    id: '2',
    projectName: 'AI漫剧：穿越时空的冒险',
    category: 'AI漫剧',
    projectTags: ['穿越', '男频'],
    contentGenre: '穿越',
    difficulty: '工厂',
    deliveryCycleDays: 5,
    episodeCount: 15,
    participantTeam: '实训',
    takeMode: '报名',
    quotaTotal: 10,
    quotaTaken: 8,
    status: 'Published',
    unitPrice: 300,
    dueTime: '2024-02-10 12:00:00',
    publishTime: '2024-01-18 14:00:00',
    isTop: true,
  },
  {
    id: '3',
    projectName: '短视频：美食探店系列',
    category: '短视频',
    projectTags: ['美食', '生活'],
    contentGenre: '女频',
    difficulty: '工厂',
    deliveryCycleDays: 3,
    episodeCount: 10,
    participantTeam: '线下',
    takeMode: '抢单',
    quotaTotal: 8,
    quotaTaken: 8,
    status: 'ClosedForTaking',
    unitPrice: 200,
    dueTime: '2024-02-05 20:00:00',
    publishTime: '2024-01-15 09:00:00',
    isTop: false,
    disabledReason: '已满员',
  },
  {
    id: '4',
    projectName: '综艺剪辑：真人秀精彩片段',
    category: '综艺',
    projectTags: ['真人秀', '娱乐'],
    contentGenre: '男频',
    difficulty: '精品',
    deliveryCycleDays: 10,
    episodeCount: 12,
    participantTeam: '线上',
    takeMode: '报名',
    quotaTotal: 6,
    quotaTaken: 2,
    status: 'Published',
    unitPrice: 800,
    dueTime: '2024-01-25 23:59:59',
    publishTime: '2024-01-10 11:00:00',
    isTop: false,
  },
  {
    id: '5',
    projectName: '短剧：古装仙侠传奇',
    category: '短剧',
    projectTags: ['古装', '仙侠', '女频'],
    contentGenre: '女频',
    difficulty: '精品',
    deliveryCycleDays: 14,
    episodeCount: 30,
    participantTeam: '实训',
    takeMode: '抢单',
    quotaTotal: 3,
    quotaTaken: 1,
    status: 'ClosedForTaking',
    unitPrice: 600,
    dueTime: '2024-01-20 18:00:00',
    publishTime: '2024-01-05 08:00:00',
    isTop: false,
    disabledReason: '已截止',
  },
  {
    id: '6',
    projectName: 'AI漫剧：科幻未来世界',
    category: 'AI漫剧',
    projectTags: ['科幻', '男频'],
    contentGenre: '男频',
    difficulty: '工厂',
    deliveryCycleDays: 6,
    episodeCount: 18,
    participantTeam: '线上',
    takeMode: '报名',
    quotaTotal: 12,
    quotaTaken: 5,
    status: 'Published',
    unitPrice: 350,
    dueTime: '2024-02-20 16:00:00',
    publishTime: '2024-01-22 15:00:00',
    isTop: true,
  },
];

// 题材标签选项
const genreOptions = ['霸总', '穿越', '男频', '女频', '古装', '仙侠', '科幻', '美食', '生活', '真人秀', '娱乐'];

// 项目状态选项
const statusOptions = [
  { label: '可接单', value: 'Published' },
  { label: '已满', value: 'ClosedForTaking' },
  { label: '已截止', value: 'ClosedForTaking' },
];

// 排序选项
const sortOptions = [
  { label: '推荐（置顶+最新）', value: 'recommend' },
  { label: '单价', value: 'price' },
  { label: '最新发布', value: 'latest' },
  { label: '截止时间', value: 'dueTime' },
];

const ProjectHall: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('短剧');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommend');

  // 过滤和排序项目
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects.filter((project) => {
      // 分类过滤
      if (project.category !== activeCategory) return false;

      // 题材标签过滤
      if (selectedGenres.length > 0) {
        const hasMatchingGenre = selectedGenres.some((genre) =>
          project.projectTags.includes(genre) || project.contentGenre === genre
        );
        if (!hasMatchingGenre) return false;
      }

      // 截止时间区间过滤
      if (dateRange && dateRange[0] && dateRange[1]) {
        const dueTime = dayjs(project.dueTime);
        const startTime = dateRange[0];
        const endTime = dateRange[1];
        if (dueTime.isBefore(startTime) || dueTime.isAfter(endTime)) return false;
      }

      // 状态过滤
      if (selectedStatus) {
        if (selectedStatus === 'Published' && project.status !== 'Published') return false;
        if (selectedStatus === 'ClosedForTaking' && project.status !== 'ClosedForTaking') return false;
      }

      return true;
    });

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recommend':
          // 推荐：置顶优先，然后按最新发布
          if (a.isTop !== b.isTop) return a.isTop ? -1 : 1;
          return dayjs(b.publishTime).valueOf() - dayjs(a.publishTime).valueOf();
        case 'price':
          return b.unitPrice - a.unitPrice;
        case 'latest':
          return dayjs(b.publishTime).valueOf() - dayjs(a.publishTime).valueOf();
        case 'dueTime':
          return dayjs(a.dueTime).valueOf() - dayjs(b.dueTime).valueOf();
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, selectedGenres, dateRange, selectedStatus, sortBy]);

  // 处理接单按钮点击
  const handleTakeOrder = (project: Project) => {
    if (project.takeMode === '抢单') {
      console.log('一键抢单:', project.id);
      // TODO: 实现抢单逻辑
    } else {
      console.log('点击报名:', project.id);
      // TODO: 实现报名逻辑
    }
  };

  // 判断按钮是否禁用
  const isButtonDisabled = (project: Project): boolean => {
    const now = dayjs();
    const dueTime = dayjs(project.dueTime);
    return (
      project.status === 'ClosedForTaking' ||
      project.quotaTaken >= project.quotaTotal ||
      now.isAfter(dueTime)
    );
  };

  // 获取按钮禁用原因
  const getDisabledReason = (project: Project): string => {
    if (project.disabledReason) return project.disabledReason;
    if (project.quotaTaken >= project.quotaTotal) return '已满员';
    const now = dayjs();
    const dueTime = dayjs(project.dueTime);
    if (now.isAfter(dueTime)) return '已截止';
    return '';
  };

  // 格式化截止时间显示
  const formatDueTime = (dueTime: string): string => {
    const date = dayjs(dueTime);
    const now = dayjs();
    const diff = date.diff(now, 'day');
    
    if (diff < 0) return '已截止';
    if (diff === 0) return '今日截止';
    if (diff === 1) return '明日截止';
    return `${diff}天后截止`;
  };

  return (
    <div className={styles.projectHall}>
      {/* 顶部分类 Tab */}
      <div className={styles.categoryTabs}>
        <Tabs
          activeKey={activeCategory}
          onChange={setActiveCategory}
          size="large"
        >
          <TabPane tab="短剧" key="短剧" />
          <TabPane tab="AI漫剧" key="AI漫剧" />
          <TabPane tab="短视频" key="短视频" />
          <TabPane tab="综艺" key="综艺" />
        </Tabs>
      </div>

      {/* 筛选和排序区 */}
      <div className={styles.filterSection}>
        <Space size="middle" wrap>
          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>题材标签：</span>
            <Select
              mode="multiple"
              placeholder="请选择题材标签"
              style={{ width: 200 }}
              value={selectedGenres}
              onChange={setSelectedGenres}
              allowClear
            >
              {genreOptions.map((genre) => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>截止时间：</span>
            <RangePicker
              style={{ width: 240 }}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0], dates[1]]);
                } else {
                  setDateRange(null);
                }
              }}
            />
          </div>

          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>项目状态：</span>
            <Select
              placeholder="请选择状态"
              style={{ width: 150 }}
              value={selectedStatus}
              onChange={setSelectedStatus}
              allowClear
            >
              {statusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>排序：</span>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 180 }}
            >
              {sortOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </Space>
      </div>

      {/* 项目列表 */}
      <div className={styles.projectList}>
        <Row gutter={[16, 16]}>
          {filteredAndSortedProjects.map((project) => {
            const isDisabled = isButtonDisabled(project);
            const disabledReason = getDisabledReason(project);
            const remainingQuota = project.quotaTotal - project.quotaTaken;

            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={project.id}>
                <Card
                  className={styles.projectCard}
                  hoverable
                  actions={[
                    <Button
                      type="primary"
                      block
                      disabled={isDisabled}
                      onClick={() => handleTakeOrder(project)}
                      title={isDisabled ? disabledReason : ''}
                    >
                      {project.takeMode === '抢单' ? '一键抢单' : '点击报名'}
                    </Button>,
                  ]}
                >
                  <div className={styles.cardHeader}>
                    {project.isTop && (
                      <Badge.Ribbon text="置顶" color="red">
                        <div />
                      </Badge.Ribbon>
                    )}
                    <h3 className={styles.projectName}>{project.projectName}</h3>
                  </div>

                  <div className={styles.cardContent}>
                    {/* 项目标签和内容类别 */}
                    <div className={styles.tagsSection}>
                      {project.projectTags.map((tag) => (
                        <Tag key={tag} color="blue">
                          {tag}
                        </Tag>
                      ))}
                      <Tag color="purple">{project.contentGenre}</Tag>
                    </div>

                    {/* 难度和参与团队 */}
                    <div className={styles.metaInfo}>
                      <Tag color={project.difficulty === '精品' ? 'gold' : 'default'}>
                        {project.difficulty}
                      </Tag>
                      <Tag>{project.participantTeam}</Tag>
                    </div>

                    {/* 核心信息 */}
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>单价：</span>
                        <span className={styles.infoValue}>¥{project.unitPrice}/集</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>集数：</span>
                        <span className={styles.infoValue}>{project.episodeCount}集</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>交付周期：</span>
                        <span className={styles.infoValue}>{project.deliveryCycleDays}天</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>接单模式：</span>
                        <span className={styles.infoValue}>
                          {project.takeMode === '抢单' ? (
                            <Tag color="orange" icon={<FireOutlined />}>
                              抢单
                            </Tag>
                          ) : (
                            <Tag color="cyan" icon={<UserOutlined />}>
                              报名
                            </Tag>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* 名额和截止时间 */}
                    <div className={styles.footerInfo}>
                      <div className={styles.quotaInfo}>
                        <UserOutlined /> {project.quotaTaken}/{project.quotaTotal}
                        {remainingQuota > 0 && (
                          <span className={styles.remaining}>（剩余{remainingQuota}个名额）</span>
                        )}
                      </div>
                      <div className={styles.dueTimeInfo}>
                        <ClockCircleOutlined /> {formatDueTime(project.dueTime)}
                      </div>
                    </div>

                    {/* 禁用原因提示 */}
                    {isDisabled && (
                      <div className={styles.disabledReason}>
                        {disabledReason}
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {filteredAndSortedProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p>暂无符合条件的项目</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHall;
