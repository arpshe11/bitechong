import React, { useState, useCallback } from 'react';
import { FeedbackModal } from './components/Feedback/FeedbackModal';
import { motion } from 'framer-motion';
import { useIcoConverter } from './hooks/useIcoConverter';
import type { ImageFile } from './types';

import { UploadPanel } from './components/Upload/UploadPanel';
import { SizePanel } from './components/Converter/SizePanel';
import { PreviewPanel } from './components/Preview/PreviewPanel';

function App() {
  const [currentImage, setCurrentImage] = useState<ImageFile | null>(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  
  const {
    isConverting,
    progress,
    error,
    convertedIcons,
    icoFile,
    settings,
    generateICO,
    updateSettings,
    toggleSize,
    cleanup
  } = useIcoConverter();

  const handleImageUpload = useCallback((file: File) => {
    const imageFile: ImageFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    };
    setCurrentImage(imageFile);
  }, []);

  const handleConvert = useCallback(async () => {
    if (currentImage) {
      try {
        // 转换开始事件
        if (window.trackConversionStart) {
          window.trackConversionStart(settings);
        }
        
        const startTime = performance.now();
        
        await generateICO(currentImage, settings);
        
        // 转换完成事件
        const endTime = performance.now();
        if (window.trackConversionComplete) {
          window.trackConversionComplete(endTime - startTime, settings, true);
        }
      } catch (err) {
        console.error('转换失败:', err);
        // 错误事件
        if (typeof (window as any).gtag !== 'undefined' && window.trackError) {
          window.trackError('conversion_error', {
            error_type: (err as any).name || 'unknown',
            error_message: (err as any).message || 'Unknown error occurred'
          });
        }
      }
    }
  }, [currentImage, settings, generateICO]);

  const handleFeedbackSubmit = useCallback((feedback: any) => {
    console.log('用户反馈提交:', feedback);
    
    // 可以在这里添加额外的反馈处理逻辑
    // 例如：发送到数据库、邮件通知等
    
    // 显示成功提示
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'feedback_success', {
        event_category: 'engagement',
        event_label: 'user_feedback'
      });
    }
  }, []);



  // 清理函数
  React.useEffect(() => {
    return () => {
      cleanup();
      if (currentImage) {
        URL.revokeObjectURL(currentImage.url);
      }
    };
  }, [cleanup, currentImage]);

  return (
    <div className="min-h-screen bg-gray-50">


      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                ICO图标制作工具
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">在线转换，无需注册</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* 上方：左侧上传，右侧配置 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* 左侧：上传面板 */}
          <div className="space-y-6">
            <UploadPanel onImageUpload={handleImageUpload} />
            
            {/* 安装说明 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-3"
            >
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  安装指南
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">
                    1
                  </div>
                  <span className="text-gray-700">当成功生成<span className="font-bold text-blue-600">favicon.ico</span>图像文件后,可在预览结果中下载您想要的尺寸</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">
                    2
                  </div>
                  <span className="text-gray-700">将下载的<span className="font-bold text-blue-600">favicon.ico</span>图像放在根目录下(也可放在其他目录)</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">
                    3
                  </div>
                  <span className="text-gray-700">在您页面源文件的&lt;head&gt;&lt;/head&gt;标签之间插入如下代码即可</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <code className="text-xs text-blue-600 font-mono">
                    &lt;link rel="shortcut icon" href="/favicon.ico" /&gt;
                  </code>
                </div>

                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">完成！刷新浏览器查看效果</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右侧：配置选项 */}
          <div className="h-full">
            <SizePanel
              settings={settings}
              onSettingsChange={updateSettings}
              onToggleSize={toggleSize}
              onConvert={handleConvert}
              currentImage={currentImage}
              isConverting={isConverting}
            />
          </div>
        </div>

        {/* 分析仪表板已隐藏 - 仅通过特殊方式访问 */}

        {/* 下方：预览结果 */}
        <div>
          <PreviewPanel
            convertedIcons={convertedIcons}
            isConverting={isConverting}
            progress={progress}
            error={error}
            icoFile={icoFile}
          />
        </div>

        {/* FAQ部分 - 手风琴样式 + 彩色节点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              常见问题
            </h3>
          </div>

          <div className="space-y-2">
            {/* FAQ 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                onClick={() => setIsOpen1(!isOpen1)}
              >
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-900 flex-1">什么是favicon图标？</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen1 && (
                <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
                  <p className="text-sm text-gray-700"><span className="font-bold text-blue-600">favicon.ico</span>是网站的标志性图标，它显示位于浏览器的地址栏或者在标签上，用于显示网站的logo，目前主要的浏览器都支持favicon.ico图标。</p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                onClick={() => setIsOpen2(!isOpen2)}
              >
                <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-white shadow-sm flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-900 flex-1">favicon.ico支持哪些尺寸？</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen2 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-700">最常见的包括：16×16、32×32、48×48、64×64、128×128像素，不同场景会自动选择合适的尺寸显示。</p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                onClick={() => setIsOpen3(!isOpen3)}
              >
                <div className="w-4 h-4 bg-purple-400 rounded-full border-2 border-white shadow-sm flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-900 flex-1">为什么要用ICO而不是PNG？</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen3 && (
                <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
                  <p className="text-sm text-gray-700">favicon.ico是浏览器标准格式，可以包含多个尺寸，兼容性最好，虽然现代浏览器也支持PNG格式，但ICO格式确保在所有浏览器中都能正常显示。</p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                onClick={() => setIsOpen4(!isOpen4)}
              >
                <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-sm flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-900 flex-1">文件大小有限制吗？</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen4 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen4 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-700">建议控制在50KB以内，过大的文件可能影响页面加载速度，建议使用优化的图片质量。</p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                onClick={() => setIsOpen5(!isOpen5)}
              >
                <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-2 border-white shadow-sm flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-900 flex-1">为什么favicon没有显示？</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen5 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen5 && (
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-purple-200">
                  <p className="text-sm text-gray-700">可能是：文件路径不正确；浏览器缓存问题；文件未上传到正确位置；HTML代码语法错误。</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* 底部 */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2026 ICO图标制作工具. 专为Web开发者打造的图标转换工具
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <button
                onClick={() => setShowFeedback(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                提交反馈
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>支持格式：JPG, PNG, GIF</span>
              <span>•</span>
              <span>文件大小限制：500KB</span>
              <span>•</span>
              <span>输出格式：ICO</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 反馈模态框 */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
      />


    </div>
  );
}

export default App;