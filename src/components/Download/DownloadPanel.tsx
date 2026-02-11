import React from 'react';
import { motion } from 'framer-motion';

export interface DownloadPanelProps {
  icoFile: { blob: Blob; url: string } | null;
  isConverting: boolean;
  hasConvertedIcons: boolean;
  onReset?: () => void;
}

export function DownloadPanel({ icoFile, isConverting, hasConvertedIcons, onReset }: DownloadPanelProps) {

  const handleDownloadClick = () => {
    // 创建一个临时链接来触发下载
    if (icoFile) {
      const link = document.createElement('a');
      link.href = icoFile.url;
      link.download = 'favicon.ico';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!hasConvertedIcons) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">4. 下载文件</h2>
          <p className="text-sm text-gray-600 mt-1">转换完成后可下载ICO文件</p>
        </div>

        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500">等待转换完成</p>
          <p className="text-sm text-gray-400 mt-1">请先完成图片转换</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">4. 下载文件</h2>
        <p className="text-sm text-gray-600 mt-1">ICO文件已生成，可以下载使用</p>
      </div>

      <div className="space-y-4">
        {/* ICO文件下载 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-blue-900">favicon.ico</h3>
              <p className="text-sm text-blue-700 mt-1">
                包含所有选定尺寸的ICO文件，适用于网站图标
              </p>
              <div className="mt-2 flex items-center text-xs text-blue-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                文件大小：{icoFile ? (icoFile.blob.size / 1024).toFixed(1) : '0'} KB
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadClick}
            disabled={!icoFile || isConverting}
            className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center font-medium"
          >
            {isConverting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                处理中...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载 favicon.ico
              </>
            )}
          </button>
        </div>

        {/* 使用说明 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">使用说明</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">1.</span>
              <span>下载 favicon.ico 文件到你的网站根目录</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">2.</span>
              <span>在 HTML 文件的 &lt;head&gt; 标签中添加：</span>
            </div>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
              {'<link rel="icon" href="/favicon.ico" type="image/x-icon">'}
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">3.</span>
              <span>刷新浏览器页面即可看到新的图标</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        {onReset && (
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              重新转换
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              新建转换
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}