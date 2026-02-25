import { useState } from 'react';
import { analyzeImageQuality, type ImageQualityResult } from '../../utils/aiProcessor';

export interface AIPanelProps {
  currentImage: File | null;
  removeBackgroundEnabled: boolean;
  onRemoveBackgroundToggle: (enabled: boolean) => void;
}

export function AIPanel({ currentImage, removeBackgroundEnabled, onRemoveBackgroundToggle }: AIPanelProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [qualityResult, setQualityResult] = useState<ImageQualityResult | null>(null);

  const handleAnalyze = async () => {
    if (!currentImage) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeImageQuality(currentImage);
      setQualityResult(result);
    } catch (error) {
      console.error('图片分析失败:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveBackgroundToggle = () => {
    if (!currentImage) return;
    onRemoveBackgroundToggle(!removeBackgroundEnabled);
  };

  const handleOptimize = async () => {
    // 智能优化功能暂时禁用
  };

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI 智能处理
        </h3>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAnalyze}
          disabled={!currentImage || isAnalyzing}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-1 ${
            !currentImage || isAnalyzing
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
          }`}
        >
          {isAnalyzing ? '分析中...' : '质量分析'}
        </button>

        <button
          onClick={handleRemoveBackgroundToggle}
          disabled={!currentImage}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-1 ${
            !currentImage
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : removeBackgroundEnabled
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
          }`}
        >
          {removeBackgroundEnabled ? '已启用' : '移除背景'}
        </button>

        <button
          onClick={handleOptimize}
          disabled={!currentImage}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-1 ${
            !currentImage
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
          }`}
        >
          智能优化
        </button>
      </div>

      {qualityResult && (
        <div className="fixed bottom-4 right-4 bg-purple-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
          质量评分: <span className={`font-bold ${qualityResult.score >= 70 ? 'text-green-400' : qualityResult.score >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>{qualityResult.score}分</span>
        </div>
      )}
    </div>
  );
}
