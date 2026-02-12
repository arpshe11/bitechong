import AnalyticsDashboard from '../components/Analytics/AnalyticsDashboard';

// 独立的分析页面 - 仅管理员可访问
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 数据分析仪表板</h1>
          <p className="text-gray-600">实时监控ICO转换器的使用情况和性能指标</p>
        </div>
        
        <AnalyticsDashboard />
      </div>
    </div>
  );
}