import { motion } from 'framer-motion';
import { useImageUpload } from '../../hooks/useImageUpload';

export interface UploadPanelProps {
  onImageUpload: (file: File) => void;
}

export function UploadPanel({ onImageUpload }: UploadPanelProps) {
  const { currentImage, uploadState, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, formatFileSize } = useImageUpload();

  const handleFileSelect = (file: File) => {
    onImageUpload(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">1. 上传图片</h2>
        <p className="text-sm text-gray-600 mt-1">支持 JPG、PNG、GIF 格式，最大 500KB</p>
      </div>

      {!currentImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            uploadState.isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            handleDrop(e);
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
              handleFileSelect(files[0]);
            }
          }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files;
              if (files && files.length > 0) {
                handleFileSelect(files[0]);
              }
            };
            input.click();
          }}
        >
          <div className="pointer-events-none">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">
              {uploadState.isDragActive ? '拖放文件到此处' : '将图片拖拽到此区域，或点击选择文件'}
            </p>
            <p className="text-gray-500 text-sm mt-2">支持：JPG、PNG、GIF (最大 500KB)</p>
          </div>

          {uploadState.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{uploadState.error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={currentImage.url}
              alt="上传的图片"
              className="max-w-full h-auto rounded-lg border border-gray-200"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileSelect(new File([''], '', { type: 'image/png' }));
              }}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="移除图片"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">文件名：</span>
              <span className="text-gray-900 font-medium">{currentImage.name}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">大小：</span>
              <span className="text-gray-900 font-medium">{formatFileSize(currentImage.size)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">格式：</span>
              <span className="text-gray-900 font-medium">{currentImage.type}</span>
            </div>
          </div>

          <button
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                  handleFileSelect(files[0]);
                }
              };
              input.click();
            }}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            重新选择图片
          </button>
        </div>
      )}
    </motion.div>
  );
}