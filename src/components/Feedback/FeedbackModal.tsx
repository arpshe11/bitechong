import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  userBackground: string;
  experienceRating: number;
  satisfiedFeature: string;
  encounteredProblems: string;
  improvementSuggestions: string;
  email?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    userBackground: '',
    experienceRating: 5,
    satisfiedFeature: '',
    encounteredProblems: '',
    improvementSuggestions: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 发送反馈到Google Analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'feedback_submitted', {
        user_background: feedback.userBackground,
        experience_rating: feedback.experienceRating,
        has_problems: !!feedback.encounteredProblems,
        has_suggestions: !!feedback.improvementSuggestions
      });
    }

    // 提交反馈数据
    onSubmit(feedback);

    // 重置表单
    setFeedback({
      userBackground: '',
      experienceRating: 5,
      satisfiedFeature: '',
      encounteredProblems: '',
      improvementSuggestions: '',
      email: ''
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: keyof FeedbackData, value: string | number) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={onClose}
            />

            {/* 模态框内容 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-xl"
            >
              {/* 头部 */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    💬 用户反馈
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-blue-100 mt-1">
                  您的反馈对我们非常重要！
                </p>
              </div>

              {/* 表单内容 */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* 用户背景 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1. 您的技术背景？
                  </label>
                  <select
                    value={feedback.userBackground}
                    onChange={(e) => handleInputChange('userBackground', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="developer">开发者</option>
                    <option value="designer">设计师</option>
                    <option value="student">学生</option>
                    <option value="office">办公人员</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                {/* 体验评分 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2. 整体体验评分？<span className="text-blue-600">({feedback.experienceRating}/10)</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={feedback.experienceRating}
                      onChange={(e) => handleInputChange('experienceRating', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${star <= feedback.experienceRating / 2 ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 最满意的功能 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    3. 最满意的功能？
                  </label>
                  <input
                    type="text"
                    value={feedback.satisfiedFeature}
                    onChange={(e) => handleInputChange('satisfiedFeature', e.target.value)}
                    placeholder="例如：批量转换、预览功能、快速预设等"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 遇到的问题 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    4. 遇到的问题？
                  </label>
                  <textarea
                    value={feedback.encounteredProblems}
                    onChange={(e) => handleInputChange('encounteredProblems', e.target.value)}
                    placeholder="请描述您遇到的任何问题或困难"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* 改进建议 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    5. 改进建议？
                  </label>
                  <textarea
                    value={feedback.improvementSuggestions}
                    onChange={(e) => handleInputChange('improvementSuggestions', e.target.value)}
                    placeholder="您希望添加什么功能或改进什么？"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* 邮箱（可选） */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系邮箱（可选）
                  </label>
                  <input
                    type="email"
                    value={feedback.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="用于接收更新通知"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 提交按钮 */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '提交中...' : '提交反馈'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};