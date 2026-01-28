import React, { useState, useEffect } from 'react';
import {
  Card,
  Tag,
  Button,
  Descriptions,
  Divider,
  Space,
  Typography,
  Alert,
  List,
  Badge,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  DownloadOutlined,
  FireOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ProjectDetail } from './types';
import styles from './ProjectDetail.module.less';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;

interface ProjectDetailProps {
  projectId: string;
  onTakeOrder?: (project: ProjectDetail) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onTakeOrder }) => {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock 数据 - 根据 projectId 获取项目详情
  useEffect(() => {
    // 模拟 API 调用
    setTimeout(() => {
      const mockProject: ProjectDetail = {
        id: projectId,
        projectName: '霸道总裁爱上我',
        category: '短剧',
        projectTags: ['霸总', '女频', '都市'],
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
        requirementText: `项目需求：
1. 剪辑风格：现代都市情感剧，节奏紧凑，情感饱满
2. 每集时长：3-5分钟
3. 画面要求：高清1080P，色彩饱和度适中
4. 音效要求：背景音乐与剧情匹配，音效清晰
5. 字幕要求：中文字幕，字体清晰，位置统一
6. 转场效果：自然流畅，符合剧情节奏
7. 特殊要求：重点突出男女主角的情感戏份，适当使用慢镜头和特写`,
        requirementAttachments: [
          {
            id: '1',
            name: '分镜脚本.pdf',
            url: '#',
            size: 2048000,
          },
          {
            id: '2',
            name: '参考样片.mp4',
            url: '#',
            size: 52428800,
          },
        ],
        deliveryRequirements: {
          namingConvention: '项目名称_集数_版本号.mp4，例如：霸道总裁爱上我_第01集_V1.mp4',
          resolution: '1920x1080 (1080P)',
          bitrate: '不低于 5000 kbps',
          subtitleSpec: 'SRT格式，UTF-8编码，时间轴精确到毫秒',
        },
        materialNote: '素材包包含：原始拍摄素材、BGM音乐库、字幕模板、片头片尾模板。请按照分镜脚本进行剪辑，注意保持画面连贯性和节奏感。',
        materialPackageFiles: [
          {
            id: '1',
            name: '原始素材_第01-05集.zip',
            url: '#',
            size: 1073741824,
            type: 'zip',
          },
          {
            id: '2',
            name: 'BGM音乐库.zip',
            url: '#',
            size: 524288000,
            type: 'zip',
          },
          {
            id: '3',
            name: '字幕模板.srt',
            url: '#',
            size: 102400,
            type: 'srt',
          },
        ],
      };
      setProject(mockProject);
      setLoading(false);
    }, 500);
  }, [projectId]);

  // 判断按钮是否禁用
  const isButtonDisabled = (project: ProjectDetail): boolean => {
    const now = dayjs();
    const dueTime = dayjs(project.dueTime);
    return (
      project.status === 'ClosedForTaking' ||
      project.quotaTaken >= project.quotaTotal ||
      now.isAfter(dueTime)
    );
  };

  // 获取按钮禁用原因
  const getDisabledReason = (project: ProjectDetail): string => {
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

  // 格式化文件大小
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  // 处理接单按钮点击
  const handleTakeOrder = () => {
    if (project && !isButtonDisabled(project)) {
      if (onTakeOrder) {
        onTakeOrder(project);
      } else {
        if (project.takeMode === '抢单') {
          alert('一键抢单成功！');
        } else {
          alert('报名申请已提交，等待审核中...');
        }
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  if (!project) {
    return <div className={styles.error}>项目不存在</div>;
  }

  const isDisabled = isButtonDisabled(project);
  const disabledReason = getDisabledReason(project);
  const remainingQuota = project.quotaTotal - project.quotaTaken;

  return (
    <div className={styles.projectDetail}>
      {/* 头部信息卡片 */}
      <Card className={styles.headerCard}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            {project.isTop && (
              <Badge.Ribbon text="置顶" color="red" />
            )}
            <Title level={2} className={styles.projectTitle}>
              {project.projectName}
            </Title>
            <Space size="middle" className={styles.tagsSection}>
              {project.projectTags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
              <Tag color="purple">{project.contentGenre}</Tag>
              <Tag color={project.difficulty === '精品' ? 'gold' : 'default'}>
                {project.difficulty}
              </Tag>
              <Tag>{project.participantTeam}</Tag>
            </Space>
          </div>
          <div className={styles.headerRight}>
            <Button
              type="primary"
              size="large"
              icon={project.takeMode === '抢单' ? <FireOutlined /> : <UserOutlined />}
              disabled={isDisabled}
              onClick={handleTakeOrder}
              className={styles.takeOrderButton}
            >
              {project.takeMode === '抢单' ? '一键抢单' : '点击报名'}
            </Button>
            {isDisabled && (
              <Alert
                message={disabledReason}
                type="warning"
                showIcon
                className={styles.disabledAlert}
              />
            )}
          </div>
        </div>
      </Card>

      {/* 核心信息统计 */}
      <Row gutter={16} className={styles.statisticsRow}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="单价"
              value={project.unitPrice}
              prefix="¥"
              suffix="/集"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="集数"
              value={project.episodeCount}
              suffix="集"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="交付周期"
              value={project.deliveryCycleDays}
              suffix="天"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="名额"
              value={remainingQuota}
              suffix={`/ ${project.quotaTotal}`}
              valueStyle={{ color: remainingQuota > 0 ? '#52c41a' : '#ff4d4f' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 项目基本信息 */}
      <Card title="项目基本信息" className={styles.infoCard}>
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered>
          <Descriptions.Item label="项目名称">{project.projectName}</Descriptions.Item>
          <Descriptions.Item label="内容分类">{project.category}</Descriptions.Item>
          <Descriptions.Item label="内容类别">{project.contentGenre}</Descriptions.Item>
          <Descriptions.Item label="难度等级">
            <Tag color={project.difficulty === '精品' ? 'gold' : 'default'}>
              {project.difficulty}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="参与团队">{project.participantTeam}</Descriptions.Item>
          <Descriptions.Item label="接单模式">
            {project.takeMode === '抢单' ? (
              <Tag color="orange" icon={<FireOutlined />}>
                抢单
              </Tag>
            ) : (
              <Tag color="cyan" icon={<UserOutlined />}>
                报名
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="截止时间">
            <Space>
              <ClockCircleOutlined />
              <Text>{dayjs(project.dueTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
              <Text type="warning">({formatDueTime(project.dueTime)})</Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">
            {dayjs(project.publishTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="项目状态">
            {project.status === 'Published' ? (
              <Tag color="green" icon={<CheckCircleOutlined />}>
                可接单
              </Tag>
            ) : (
              <Tag color="red" icon={<CloseCircleOutlined />}>
                已关闭
              </Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 项目需求 */}
      <Card title="项目需求" className={styles.infoCard}>
        <Paragraph className={styles.requirementText}>
          {project.requirementText}
        </Paragraph>
        
        {project.requirementAttachments && project.requirementAttachments.length > 0 && (
          <>
            <Divider orientation="left">需求附件</Divider>
            <List
              dataSource={project.requirementAttachments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<FileTextOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                    title={
                      <a href={item.url} download>
                        {item.name}
                      </a>
                    }
                    description={`大小: ${formatFileSize(item.size)}`}
                  />
                  <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    href={item.url}
                    download
                  >
                    下载
                  </Button>
                </List.Item>
              )}
            />
          </>
        )}
      </Card>

      {/* 交付要求 */}
      {project.deliveryRequirements && (
        <Card title="交付要求" className={styles.infoCard}>
          <Alert
            message="提示"
            description="以下交付要求仅供参考，不会强制校验，但建议尽量按照要求执行，以提高审核通过率。"
            type="info"
            showIcon
            className={styles.deliveryAlert}
          />
          <Descriptions column={1} bordered className={styles.deliveryDescriptions}>
            {project.deliveryRequirements.namingConvention && (
              <Descriptions.Item label="命名规范">
                {project.deliveryRequirements.namingConvention}
              </Descriptions.Item>
            )}
            {project.deliveryRequirements.resolution && (
              <Descriptions.Item label="分辨率">
                {project.deliveryRequirements.resolution}
              </Descriptions.Item>
            )}
            {project.deliveryRequirements.bitrate && (
              <Descriptions.Item label="码率">
                {project.deliveryRequirements.bitrate}
              </Descriptions.Item>
            )}
            {project.deliveryRequirements.subtitleSpec && (
              <Descriptions.Item label="字幕规范">
                {project.deliveryRequirements.subtitleSpec}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      )}

      {/* 素材包 */}
      {project.materialPackageFiles && project.materialPackageFiles.length > 0 && (
        <Card title="素材包" className={styles.infoCard}>
          {project.materialNote && (
            <>
              <Alert
                message="素材说明"
                description={project.materialNote}
                type="info"
                showIcon
                className={styles.materialAlert}
              />
              <Divider />
            </>
          )}
          <List
            dataSource={project.materialPackageFiles}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<FileTextOutlined style={{ fontSize: 24, color: '#52c41a' }} />}
                  title={
                    <a href={item.url} download>
                      {item.name}
                    </a>
                  }
                  description={`大小: ${formatFileSize(item.size)} | 类型: ${item.type || '未知'}`}
                />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  href={item.url}
                  download
                >
                  下载
                </Button>
              </List.Item>
            )}
          />
        </Card>
      )}

      {/* 底部操作栏 */}
      <div className={styles.footerActions}>
        <Space>
          <Button onClick={() => window.history.back()}>返回列表</Button>
          <Button
            type="primary"
            size="large"
            icon={project.takeMode === '抢单' ? <FireOutlined /> : <UserOutlined />}
            disabled={isDisabled}
            onClick={handleTakeOrder}
          >
            {project.takeMode === '抢单' ? '一键抢单' : '点击报名'}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ProjectDetail;
