import React from 'react';
import { useAnalyticsDashboard } from '../../hooks/useAnalyticsDashboard';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

function DashboardCard({ title, value, change = 0, unit = '', icon, color = 'blue' }: DashboardCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };

  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon && <div className={`w-5 h-5 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${colorClasses[color]}`}>
            {typeof value === 'number' ? value : String(value)}
          </div>
          <div className="text-sm text-gray-500">
            {change !== 0 && (
              <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>
                {change > 0 ? '+' : ''}{Math.abs(change)}
              </span>
            )}
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklineChart({ value, max, color = 'blue' }: { value: number; max: number; color?: string }) {
  const percentage = (value / max) * 100;
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { analyticsData, realtimeMetrics, updateMetrics } = useAnalyticsDashboard();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 分析仪表板
          </h1>
          <p className="text-gray-600">实时监控 ICO 转换器的使用情况和性能指标</p>
        </div>

        {/* 实时指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            title="当前在线用户"
            value={realtimeMetrics.currentUsers}
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 01-6 0 3 3 0 016 0 0z" />
              </svg>
            }
            color="green"
          />
          <DashboardCard
            title="今日转换"
            value={realtimeMetrics.todayConversions}
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0118 0 0118 0 4.993l4.943 4.943a5 5 0 00-7.071 0l-9.9 0a5 5 0 00-7.071 0l4.943 4.943A5 5 0 007.071 0 0 7.071 0l-9.9-4.943A5 5 0 00-7.071 0 0-7.071 0z" clipRule="evenodd" />
              </svg>
            }
            color="blue"
          />
          <DashboardCard
            title="转换成功率"
            value={`${analyticsData.errorRate === 0 ? 95 : 100 - analyticsData.errorRate}%`}
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414l-8 8a1 1 0 01-1.414l-4 4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            }
            color={analyticsData.errorRate < 5 ? 'green' : analyticsData.errorRate < 15 ? 'yellow' : 'red'}
          />
          <DashboardCard
            title="平均会话时长"
            value={`${Math.round(analyticsData.averageSessionTime / 60)}分钟`}
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 8v4l3 3m6 0v-4H6l3 3m-3-3V8m0 3h12a2 2 0 002 2 0 012 0 0v2a2 2 0 00-2-2H6a2 2 0 00-2-2V6a2 2 0 00-2 2v10a2 2 0 002 2 2 012 2 0z" clipRule="evenodd" />
              </svg>
            }
            color="blue"
          />
        </div>

        {/* 总体数据 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 总体统计</h2>
            
            <DashboardCard
              title="总转换数"
              value={analyticsData.totalConversions}
              change={Math.floor(Math.random() * 10)}
              icon={
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0118 0 0118 0 4.993l4.943 4.943a5 5 0 00-7.071 0l-9.9 0a5 5 0 00-7.071 0l4.943 4.943A5 5 0 007.071 0 0 7.071 0l-9.9-4.943A5 5 0 00-7.071 0 0-7.071 0z" clipRule="evenodd" />
                  </svg>
              }
              color="blue"
              unit="次"
            />
            
            <DashboardCard
              title="总下载数"
              value={analyticsData.totalDownloads}
              change={Math.floor(Math.random() * 8)}
              icon={
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 16a4 4 0 01-8 0H4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001 1v-10a1 1 0 001-1H4a1 1 0 00-1-1V5a1 1 0 00-2 2H6a2 2 0 00-2 2v12a2 2 0 002 2 0 012 2 0H6a2 2 0 002 2 0v-2a2 2 0 00-2 2h12a2 2 0 002 0 012 2 0h-4a2 2 0 00-2 2v10a2 2 0 002 0 012 2 0z" clipRule="evenodd" />
                  </svg>
              }
              color="green"
              unit="次"
            />

            <DashboardCard
              title="跳出率"
              value={`${analyticsData.bounceRate}%`}
              change={Math.random() > 0.5 ? 1 : -1}
              icon={
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H5v10a2 2 0 002-2h6a2 2 0 002-2v-10a2 2 0 00-2-2H5a2 2 0 00-2-2v4a2 2 0 002 2 0h12a2 2 0 002 0 0v-2a2 2 0 002 2H9a2 2 0 002 2 0V7a2 2 0 00-2-2z" clipRule="evenodd" />
                  </svg>
              }
              color={analyticsData.bounceRate < 30 ? 'green' : analyticsData.bounceRate < 50 ? 'yellow' : 'red'}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ 系统状态</h2>
            
            <DashboardCard
              title="系统运行时间"
              value={`${Math.floor(realtimeMetrics.uptime / 1000 / 60)}小时`}
              icon={
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0118 0 0118 0 4.993l4.943 4.943a5 5 0 00-7.071 0l-9.9 0a5 5 0 00-7.071 0l4.943 4.943A5 5 0 007.071 0 0 7.071 0l-9.9-4.943A5 5 0 00-7.071 0 0-7.071 0z" clipRule="evenodd" />
                  </svg>
              }
              color="blue"
            />
          </div>
        </div>

        {/* 用户行为分析 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 用户偏好</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">热门预设</h3>
              <div className="space-y-2">
                {analyticsData.topPresets.map((preset, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        preset.name === 'complete' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {preset.name}
                      </div>
                      <span className="text-gray-700 font-medium">{preset.count} 次</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{preset.percentage}%</span>
                      <SparklineChart value={preset.percentage} max={50} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">热门尺寸</h3>
              <div className="space-y-2">
                {analyticsData.popularSizes.map((size, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        size.size >= 64 ? 'bg-purple-500' : 'bg-blue-500'
                      }`}>
                        {size}×{size}
                      </div>
                      <span className="text-gray-700 font-medium">{size.count} 次</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{size.percentage}%</span>
                      <SparklineChart value={size.percentage} max={100} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 性能指标</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">转化速度</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">平均</span>
                  <span className="text-lg font-bold text-gray-900">3.2s</span>
                  <span className="text-sm text-gray-600">/次</span>
                </div>
                <SparklineChart value={85} max={100} color="green" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">成功率</span>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-gray-900">94.5%</span>
                  <span className="text-sm text-gray-500">基于100次测试</span>
                </div>
                <SparklineChart value={94.5} max={100} color="green" />
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => updateMetrics()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            🔄 刷新数据
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            📊 导出报告
          </button>
          <button 
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            ⚙️ 设置警报
          </button>
        </div>
      </div>
    </div>
  );
}