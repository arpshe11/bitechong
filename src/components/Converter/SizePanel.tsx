import { useState } from 'react';
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

export interface SizePanelProps {
  settings: ConversionSettings;
  onSettingsChange: (settings: Partial<ConversionSettings>) => void;
  onToggleSize: (size: SupportedSize) => void;
}

const availableSizes: SupportedSize[] = [16, 32, 48, 64, 128];

export function SizePanel({ settings, onSettingsChange, onToggleSize, onConvert, currentImage, isConverting }: SizePanelProps) {
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
    >
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          配置选项
        </h2>
      </div>

      <div className="space-y-4">
        {/* 快速预设和自定义尺寸对齐 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 左侧：快速预设 */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-2 block">快速预设</label>
            <div className="space-y-2">
              <button
                onClick={() => onSettingsChange({ sizes: [16, 32, 48] })}
                className={`w-full px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between ${
                  settings.sizes.length === 3 && settings.sizes.every(s => [16, 32, 48].includes(s))
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>最小化</span>
                <span className="text-xs opacity-75">3种</span>
              </button>
              <button
                onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64] })}
                className={`w-full px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between ${
                  settings.sizes.length === 4 && settings.sizes.every(s => [16, 32, 48, 64].includes(s))
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>标准</span>
                <span className="text-xs opacity-75">4种</span>
              </button>
              <button
                onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64, 128] })}
                className={`w-full px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between ${
                  settings.sizes.length === 5
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>完整</span>
                <span className="text-xs opacity-75">5种</span>
              </button>
              <button
                onClick={() => onSettingsChange({ sizes: [32] })}
                className={`w-full px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between ${
                  settings.sizes.length === 1 && settings.sizes[0] === 32
                    ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>仅32×32</span>
                <span className="text-xs opacity-75">1种</span>
              </button>
            </div>
          </div>

          {/* 右侧：自定义尺寸 */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-2 block">
              自定义尺寸 ({settings.sizes.length}个选中)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onToggleSize(size)}
                  className={`w-12 h-12 text-sm font-mono rounded-lg border-2 transition-all flex items-center justify-center ${
                    settings.sizes.includes(size)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 质量设置 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-700">图片质量</label>
            <span className="text-xs font-medium text-gray-600">{Math.round(settings.quality * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.quality}
            onChange={(e) => onSettingsChange({ quality: parseFloat(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* 转换按钮 */}
        <button
          onClick={onConvert}
          disabled={!currentImage || settings.sizes.length === 0 || isConverting}
          className={`w-full py-3 rounded-lg font-semibold text-base transition-all transform hover:scale-105 ${
            !currentImage || settings.sizes.length === 0 || isConverting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isConverting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 8 8 0 016 8z"></path>
              </svg>
              转换中...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              生成ICO图标
            </div>
          )}
        </button>
      </div>
    </motion.div>
  );
}