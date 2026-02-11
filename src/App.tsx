import React, { useState, useCallback } from 'react';
import { useIcoConverter } from './hooks/useIcoConverter';
import type { ImageFile } from './types';

import { UploadPanel } from './components/Upload/UploadPanel';
import { SizePanel } from './components/Converter/SizePanel';
import { ConvertButton } from './components/Converter/ConvertButton';
import { PreviewPanel } from './components/Preview/PreviewPanel';
import { DownloadPanel } from './components/Download/DownloadPanel';

function App() {
  const [currentImage, setCurrentImage] = useState<ImageFile | null>(null);
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
    reset,
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
        await generateICO(currentImage, settings);
      } catch (err) {
        console.error('转换失败:', err);
      }
    }
  }, [currentImage, settings, generateICO]);

  const handleReset = useCallback(() => {
    reset();
    if (currentImage) {
      URL.revokeObjectURL(currentImage.url);
      setCurrentImage(null);
    }
  }, [currentImage, reset]);

  // 清理函数
  React.useEffect(() => {
    return () => {
      cleanup();
      if (currentImage) {
        URL.revokeObjectURL(currentImage.url);
      }
    };
  }, [cleanup, currentImage]);

  const hasValidSizes = settings.sizes.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                ICO图标制作工具
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                在线转换，无需注册
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* 左列：上传 + 配置 */}
          <div className="xl:col-span-1 space-y-4">
            <UploadPanel onImageUpload={handleImageUpload} />
            
            {/* 配置选项 */}
            <SizePanel
              settings={settings}
              onSettingsChange={updateSettings}
              onToggleSize={toggleSize}
            />

            {/* 转换按钮 */}
            <ConvertButton
              hasImage={!!currentImage}
              hasValidSizes={hasValidSizes}
              isConverting={isConverting}
              onConvert={handleConvert}
            />
          </div>

          {/* 右列：预览和下载 */}
          <div className="xl:col-span-1 space-y-4">
            {/* 预览和下载面板 - 总是显示 */}
            <div className="sticky top-4 space-y-4">
              <PreviewPanel
                convertedIcons={convertedIcons}
                isConverting={isConverting}
                progress={progress}
                error={error}
              />

              {/* 下载面板 */}
              <DownloadPanel
                icoFile={icoFile}
                isConverting={isConverting}
                hasConvertedIcons={convertedIcons.length > 0}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2026 ICO图标制作工具. 专为Web开发者打造的图标转换工具
            </p>
            <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>支持格式：JPG, PNG, GIF</span>
              <span>•</span>
              <span>文件大小限制：500KB</span>
              <span>•</span>
              <span>输出格式：ICO</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;