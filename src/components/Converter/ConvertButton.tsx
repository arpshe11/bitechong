import React from 'react';
import { motion } from 'framer-motion';

export interface ConvertButtonProps {
  hasImage: boolean;
  hasValidSizes: boolean;
  isConverting: boolean;
  onConvert: () => void;
}

export function ConvertButton({ hasImage, hasValidSizes, isConverting, onConvert }: ConvertButtonProps) {
  const isDisabled = !hasImage || !hasValidSizes || isConverting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="text-center">
        <button
          onClick={onConvert}
          disabled={isDisabled}
          className={`relative px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
            isDisabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isConverting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              转换中...
            </div>
          ) : (
            '开始转换'
          )}
        </button>

        {!hasImage && (
          <p className="text-sm text-gray-500 mt-3">请先上传图片</p>
        )}
        
        {hasImage && !hasValidSizes && (
          <p className="text-sm text-gray-500 mt-3">请至少选择一个尺寸</p>
        )}

        {!isDisabled && (
          <p className="text-sm text-green-600 mt-3">
            ✓ 准备就绪，点击开始转换
          </p>
        )}
      </div>

      {/* 功能特性展示 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900">快速转换</h3>
          <p className="text-xs text-gray-500 mt-1">秒级生成高质量图标</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900">多尺寸支持</h3>
          <p className="text-xs text-gray-500 mt-1">16×16 到 128×128</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900">安全可靠</h3>
          <p className="text-xs text-gray-500 mt-1">本地处理，隐私保护</p>
        </div>
      </div>
    </motion.div>
  );
}