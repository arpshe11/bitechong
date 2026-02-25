import { motion } from 'framer-motion';
import { useImageUpload } from '../../hooks/useImageUpload';
import type { ImageFile } from '../../types';

export interface UploadPanelProps {
  onImageUpload: (file: File) => void;
  currentImage?: ImageFile | null;
  removeBackgroundEnabled?: boolean;
}

export function UploadPanel({ onImageUpload, currentImage: externalImage, removeBackgroundEnabled }: UploadPanelProps) {
  const { uploadState, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, setCurrentImage } = useImageUpload();
  
  const currentImage = externalImage;

  const handleFileSelect = (file: File) => {
    onImageUpload(file);
    setCurrentImage({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
    >
      <div className="mb-3">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          上传图片
        </h2>
        <p className="text-xs text-gray-600 mt-1">支持 JPG、PNG、GIF 格式，最大 500KB</p>
      </div>

      {!currentImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg h-48 text-center transition-colors flex items-center justify-center ${
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
        <div
          className="relative border-2 border-dashed rounded-lg cursor-pointer overflow-hidden"
          style={removeBackgroundEnabled ? {
            backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)',
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
          } : undefined}
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
          <img
            src={currentImage.url}
            alt="上传的图片"
            className="w-full h-48 object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium">点击或拖拽更换图片</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}