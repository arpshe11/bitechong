import { motion } from 'framer-motion';
import type { ConversionSettings, SupportedSize } from '../../types';

export interface SizePanelProps {
  settings: ConversionSettings;
  onSettingsChange: (settings: Partial<ConversionSettings>) => void;
  onToggleSize: (size: SupportedSize) => void;
}

const availableSizes: SupportedSize[] = [16, 32, 48, 64, 128];

export function SizePanel({ settings, onSettingsChange, onToggleSize }: SizePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">2. 选择尺寸</h2>
        <p className="text-sm text-gray-600 mt-1">选择需要生成的图标尺寸</p>
      </div>

      <div className="space-y-4">
        {/* 尺寸选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            图标尺寸
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {availableSizes.map((size) => (
              <label
                key={size}
                className={`relative flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition-all ${
                  settings.sizes.includes(size)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={settings.sizes.includes(size)}
                  onChange={() => onToggleSize(size)}
                />
                <span className="text-sm font-medium">{size}×{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 质量设置 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            图片质量
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.quality}
              onChange={(e) => onSettingsChange({ quality: parseFloat(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-700 w-12 text-right">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            质量越高，文件越大，建议保持默认设置
          </p>
        </div>

        {/* 预设配置 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            快速配置
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48] })}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              最小化 (3种)
            </button>
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64] })}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              标准 (4种)
            </button>
            <button
              onClick={() => onSettingsChange({ sizes: [16, 32, 48, 64, 128] })}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              完整 (5种)
            </button>
            <button
              onClick={() => onSettingsChange({ sizes: [32, 32] })}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              仅32×32
            </button>
          </div>
        </div>

        {/* 当前选择摘要 */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            已选择 <span className="font-semibold">{settings.sizes.length}</span> 种尺寸：
            <span className="font-medium ml-1">
              {settings.sizes.map(size => `${size}×${size}`).join(', ')}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}