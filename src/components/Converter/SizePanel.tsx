import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ConversionSettings, SupportedSize } from '../../types';

export interface SizePanelProps {
  settings: ConversionSettings;
  onSettingsChange: (settings: Partial<ConversionSettings>) => void;
  onToggleSize: (size: SupportedSize) => void;
}

const availableSizes: SupportedSize[] = [16, 32, 48, 64, 128];

export function SizePanel({ settings, onSettingsChange, onToggleSize }: SizePanelProps) {
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
        {/* 紧凑的预设按钮 */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-2 block">快速预设</label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48] })}
              className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                settings.sizes.length === 3 && settings.sizes.every(s => [16, 32, 48].includes(s))
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              最小化
            </button>
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64] })}
              className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                settings.sizes.length === 4 && settings.sizes.every(s => [16, 32, 48, 64].includes(s))
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              标准
            </button>
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64, 128] })}
              className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                settings.sizes.length === 5
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              完整
            </button>
            <button
              onClick={() => onSettingsChange({ sizes: [32] })}
              className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                settings.sizes.length === 1 && settings.sizes[0] === 32
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              仅32×32
            </button>
          </div>
        </div>

        {/* 紧凑的尺寸选择 */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-2 block">
            自定义尺寸 ({settings.sizes.length}个选中)
          </label>
          <div className="flex gap-2 flex-wrap">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`w-10 h-10 text-xs font-mono rounded-lg border-2 transition-all flex items-center justify-center ${
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

        {/* 紧凑的质量设置 */}
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
      </div>
    </motion.div>
  );
}