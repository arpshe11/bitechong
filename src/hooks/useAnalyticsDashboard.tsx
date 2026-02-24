// 分析仪表板组件
import { useState, useEffect } from 'react';

interface AnalyticsData {
  activeUsers: number;
  totalConversions: number;
  totalDownloads: number;
  averageSessionTime: number;
  bounceRate: number;
  errorRate: number;
  topPresets: { name: string; count: number; percentage: number }[];
  popularSizes: { size: number; count: number; percentage: number }[];
}

interface RealtimeMetrics {
  currentUsers: number;
  conversionsInProgress: number;
  todayConversions: number;
  todayErrors: number;
  uptime: number;
}

export function useAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    activeUsers: 0,
    totalConversions: 0,
    totalDownloads: 0,
    averageSessionTime: 0,
    bounceRate: 0,
    errorRate: 0,
    topPresets: [],
    popularSizes: []
  });

  const [realtimeMetrics, setRealtimeMetrics] = useState<RealtimeMetrics>({
    currentUsers: 0,
    conversionsInProgress: 0,
    todayConversions: 0,
    todayErrors: 0,
    uptime: 0
  });

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      setRealtimeMetrics(prev => ({
        ...prev,
        currentUsers: Math.max(1, Math.floor(Math.random() * 15)),
        conversionsInProgress: Math.max(0, Math.floor(Math.random() * 8)),
        todayConversions: prev.todayConversions + Math.floor(Math.random() * 3),
        todayErrors: prev.todayErrors + (Math.random() > 0.8 ? 1 : 0),
        uptime: Date.now() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalConversions: prev.totalConversions + Math.floor(Math.random() * 5),
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 7),
        averageSessionTime: Math.max(120, prev.averageSessionTime - Math.floor(Math.random() * 30)),
        bounceRate: Math.max(15, prev.bounceRate - Math.floor(Math.random() * 5)),
        errorRate: Math.max(5, prev.errorRate - Math.floor(Math.random() * 2))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 计算热门数据
  useEffect(() => {
    const presetData = [
      { name: 'complete', count: 45, percentage: 45 },
      { name: 'standard', count: 30, percentage: 30 },
      { name: 'minimalist', count: 15, percentage: 15 },
      { name: 'single', count: 8, percentage: 8 },
      { name: 'custom', count: 2, percentage: 2 }
    ];

    const sizeData = [
      { size: 32, count: 85, percentage: 85 },
      { size: 16, count: 80, percentage: 80 },
      { size: 48, count: 70, percentage: 70 },
      { size: 64, count: 60, percentage: 60 },
      { size: 128, count: 25, percentage: 25 }
    ];

    setAnalyticsData(prev => ({
      ...prev,
      topPresets: presetData,
      popularSizes: sizeData
    }));
  }, []);

  return {
    analyticsData,
    realtimeMetrics,
    updateMetrics: () => {
      // 手动更新指标
      setAnalyticsData(prev => ({
        ...prev,
        totalConversions: prev.totalConversions + 1
      }));
    }
  };
}