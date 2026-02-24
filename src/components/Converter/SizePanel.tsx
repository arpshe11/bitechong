import { motion } from 'framer-motion';
import type { ConversionSettings, SupportedSize, ImageFile } from '../../types';

export interface SizePanelProps {
  settings: ConversionSettings;
  onSettingsChange: (settings: Partial<ConversionSettings>) => void;
  onToggleSize: (size: SupportedSize) => void;
  onConvert: () => void;
  currentImage: ImageFile | null;
  isConverting: boolean;
}

const availableSizes: SupportedSize[] = [16, 32, 48, 64, 128];

export function SizePanel({ settings, onSettingsChange, onToggleSize, onConvert, currentImage, isConverting }: SizePanelProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full flex flex-col"
    >
      <div className="mb-3">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          配置选项
        </h2>
      </div>

      <div className="space-y-5 flex-1 flex flex-col">
        {/* 快速预设 - 卡片式横排布局 */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            快速预设
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48] })}
              className={`group relative p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                settings.sizes.length === 3 && settings.sizes.every(s => [16, 32, 48].includes(s))
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500 ring-offset-2'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`text-sm font-semibold ${
                  settings.sizes.length === 3 && settings.sizes.every(s => [16, 32, 48].includes(s))
                    ? 'text-white' 
                    : 'text-gray-900'
                }`}>最小化</div>
              </div>
            </button>
            
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64] })}
              className={`group relative p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                settings.sizes.length === 4 && settings.sizes.every(s => [16, 32, 48, 64].includes(s))
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500 ring-offset-2'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`text-sm font-semibold ${
                  settings.sizes.length === 4 && settings.sizes.every(s => [16, 32, 48, 64].includes(s))
                    ? 'text-white' 
                    : 'text-gray-900'
                }`}>标准</div>
              </div>
            </button>

            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64, 128] })}
              className={`group relative p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                settings.sizes.length === 5
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 ring-2 ring-purple-500 ring-offset-2'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`text-sm font-semibold ${
                  settings.sizes.length === 5
                    ? 'text-white' 
                    : 'text-gray-900'
                }`}>完整</div>
              </div>
            </button>

            <button
              onClick={() => onSettingsChange({ sizes: [32] })}
              className={`group relative p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                settings.sizes.length === 1 && settings.sizes[0] === 32
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 ring-2 ring-amber-500 ring-offset-2'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`text-sm font-semibold ${
                  settings.sizes.length === 1 && settings.sizes[0] === 32
                    ? 'text-white' 
                    : 'text-gray-900'
                }`}>单一</div>
              </div>
            </button>
          </div>
        </div>

        {/* 自定义尺寸 - 现代化设计 */}
        <div>
          <label className="text-sm font-semibold text-gray-800 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              自定义尺寸
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {settings.sizes.length}个选中
            </span>
          </label>
            <div className="grid grid-cols-5 gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`group relative aspect-square rounded-xl transition-all duration-200 transform hover:scale-105 w-16 h-16 ${
                  settings.sizes.includes(size)
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500 ring-offset-2'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border border-gray-200'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-1 h-full">
                  <div className="text-lg font-bold font-mono">
                    {size}
                  </div>
                  <div className={`text-xs font-medium ${
                    settings.sizes.includes(size) ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {size}×{size}
                  </div>
                </div>
                {settings.sizes.includes(size) && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 质量设置 - 现代化设计 */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              图片质量
            </label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>
          <div className="relative mt-2">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.quality}
              onChange={(e) => onSettingsChange({ quality: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${settings.quality * 100}%, #E5E7EB ${settings.quality * 100}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">低</span>
              <span className="text-xs text-gray-500">中</span>
              <span className="text-xs text-gray-500">高</span>
            </div>
          </div>
        </div>

        {/* 转换按钮 - 炫酷设计 */}
        <div className="mt-auto">
          <button
          onClick={onConvert}
          disabled={!currentImage || settings.sizes.length === 0 || isConverting}
          className={`group relative w-full py-3 px-5 rounded-2xl font-bold text-base transition-all duration-300 transform overflow-hidden ${
            !currentImage || settings.sizes.length === 0 || isConverting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white hover:scale-105 hover:shadow-2xl'
          }`}
        >
          {/* 背景动画效果 */}
          {!isConverting && currentImage && settings.sizes.length > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
          
          <div className="relative flex items-center justify-center">
            {isConverting ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 8 8 0 016 8z"></path>
                    </svg>
                  </div>
                  <span className="text-lg">正在转换图标...</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-lg">生成ICO图标</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm opacity-75">包含</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm font-bold">
                      {settings.sizes.length}
                    </span>
                    <span className="text-sm opacity-75">种尺寸</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </button>
        </div>
      </div>
    </motion.div>
  );
}