import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Tag,
  Tabs,
  Pagination,
  Avatar,
  Space,
  Typography,
  Badge,
} from 'antd';
import {
  TrophyOutlined,
  DollarOutlined,
  FireOutlined,
  CrownOutlined,
  MedalOutlined,
} from '@ant-design/icons';
import type { LeaderboardType, LeaderboardItem } from './types';
import styles from './Leaderboard.module.less';

const { Title } = Typography;
const { TabPane } = Tabs;

// Mock 数据 - 生成50条榜单数据
const generateMockLeaderboardData = (): LeaderboardItem[] => {
  const data: LeaderboardItem[] = [];
  const names = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑一', '王二', '冯三', '陈四', '褚五', '卫六', '蒋七', '沈八',
    '韩九', '杨十', '朱一', '秦二', '尤三', '许四', '何五', '吕六',
    '施七', '张八', '孔九', '曹十', '严一', '华二', '金三', '魏四',
    '陶五', '姜六', '戚七', '谢八', '邹九', '喻十', '柏一', '水二',
    '窦三', '章四', '云五', '苏六', '潘七', '葛八', '奚九', '范十',
    '彭一', '郎二',
  ];

  for (let i = 0; i < 50; i++) {
    const rank = i + 1;
    const baseRevenue = 100000 + Math.random() * 200000;
    const baseOrders = 10 + Math.floor(Math.random() * 90);
    const baseActivity = 50 + Math.random() * 50;

    data.push({
      id: `user_${i + 1}`,
      rank,
      nickname: names[i] || `用户${i + 1}`,
      username: `@user_${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      totalOrders: baseOrders,
      totalRevenue: Math.round(baseRevenue),
      recentActivity: Math.round(baseActivity * 100) / 100,
      activityDetails: {
        loginCount: Math.floor(5 + Math.random() * 15),
        submitEpisodes: Math.floor(10 + Math.random() * 30),
        takeEpisodes: Math.floor(8 + Math.random() * 25),
        deliverEpisodes: Math.floor(12 + Math.random() * 35),
      },
    });
  }

  return data;
};

const Leaderboard: React.FC = () => {
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('totalRevenue');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 生成 Mock 数据
  const allData = useMemo(() => generateMockLeaderboardData(), []);

  // 根据榜单类型排序数据
  const sortedData = useMemo(() => {
    const sorted = [...allData].sort((a, b) => {
      switch (leaderboardType) {
        case 'totalOrders':
          return b.totalOrders - a.totalOrders;
        case 'totalRevenue':
          return b.totalRevenue - a.totalRevenue;
        case 'recentActivity':
          return b.recentActivity - a.recentActivity;
        default:
          return 0;
      }
    });

    // 更新排名
    return sorted.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  }, [allData, leaderboardType]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  // 获取排名图标
  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <CrownOutlined style={{ color: '#FFD700', fontSize: 20 }} />;
    }
    if (rank === 2) {
      return <MedalOutlined style={{ color: '#C0C0C0', fontSize: 20 }} />;
    }
    if (rank === 3) {
      return <MedalOutlined style={{ color: '#CD7F32', fontSize: 20 }} />;
    }
    return null;
  };

  // 获取排名样式
  const getRankStyle = (rank: number) => {
    if (rank === 1) return { color: '#FFD700', fontWeight: 600 };
    if (rank === 2) return { color: '#C0C0C0', fontWeight: 600 };
    if (rank === 3) return { color: '#CD7F32', fontWeight: 600 };
    return {};
  };

  // 格式化收益
  const formatRevenue = (revenue: number): string => {
    if (revenue >= 10000) {
      return `¥${(revenue / 10000).toFixed(2)}万`;
    }
    return `¥${revenue.toFixed(2)}`;
  };

  // 表格列定义
  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 100,
      align: 'center' as const,
      render: (rank: number) => {
        const icon = getRankIcon(rank);
        return (
          <Space>
            {icon}
            <span style={getRankStyle(rank)}>#{rank}</span>
          </Space>
        );
      },
    },
    {
      title: '学员昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 200,
      render: (_: any, record: LeaderboardItem) => (
        <Space>
          <Avatar src={record.avatar} size="small">
            {record.nickname.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{record.nickname}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.username}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '总接单量',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      width: 120,
      align: 'right' as const,
      render: (value: number) => (
        <span style={{ fontWeight: 500 }}>{value} 单</span>
      ),
      sorter: leaderboardType === 'totalOrders' ? undefined : (a: LeaderboardItem, b: LeaderboardItem) => b.totalOrders - a.totalOrders,
    },
    {
      title: '总收益',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      width: 150,
      align: 'right' as const,
      render: (value: number) => (
        <span style={{ fontWeight: 500, color: '#52c41a' }}>
          {formatRevenue(value)}
        </span>
      ),
      sorter: leaderboardType === 'totalRevenue' ? undefined : (a: LeaderboardItem, b: LeaderboardItem) => b.totalRevenue - a.totalRevenue,
    },
    {
      title: '近期活跃度',
      dataIndex: 'recentActivity',
      key: 'recentActivity',
      width: 150,
      align: 'right' as const,
      render: (value: number) => (
        <Tag color="orange" style={{ fontWeight: 500 }}>
          {value.toFixed(2)}
        </Tag>
      ),
      sorter: leaderboardType === 'recentActivity' ? undefined : (a: LeaderboardItem, b: LeaderboardItem) => b.recentActivity - a.recentActivity,
    },
  ];

  // 根据榜单类型高亮对应列
  const highlightedColumns = columns.map((col) => {
    const isHighlighted =
      (leaderboardType === 'totalOrders' && col.key === 'totalOrders') ||
      (leaderboardType === 'totalRevenue' && col.key === 'totalRevenue') ||
      (leaderboardType === 'recentActivity' && col.key === 'recentActivity');

    if (isHighlighted && col.render) {
      const originalRender = col.render;
      return {
        ...col,
        render: (...args: any[]) => {
          const element = originalRender(...args);
          return <span className={styles.highlightedValue}>{element}</span>;
        },
      };
    }
    return col;
  });

  return (
    <div className={styles.leaderboard}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          天梯榜单
        </Title>
        <Tabs
          activeKey={leaderboardType}
          onChange={(key) => {
            setLeaderboardType(key as LeaderboardType);
            setCurrentPage(1); // 切换榜单类型时重置到第一页
          }}
          className={styles.typeTabs}
        >
          <TabPane
            tab={
              <span>
                <TrophyOutlined />
                总接单量榜
              </span>
            }
            key="totalOrders"
          />
          <TabPane
            tab={
              <span>
                <DollarOutlined />
                总收益榜
              </span>
            }
            key="totalRevenue"
          />
          <TabPane
            tab={
              <span>
                <FireOutlined />
                近期活跃度榜
              </span>
            }
            key="recentActivity"
          />
        </Tabs>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={highlightedColumns}
          dataSource={paginatedData}
          rowKey="id"
          pagination={false}
          className={styles.leaderboardTable}
          size="middle"
          rowClassName={(record, index) => {
            if (index === 0) return styles.firstPlace;
            if (index === 1) return styles.secondPlace;
            if (index === 2) return styles.thirdPlace;
            return '';
          }}
        />
        <div className={styles.paginationWrapper}>
          <Pagination
            current={currentPage}
            total={sortedData.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showTotal={(total) => `共 ${total} 人`}
            showQuickJumper
          />
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;
