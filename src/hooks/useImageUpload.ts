import { useState, useCallback } from 'react';
import type { ImageFile, UploadState } from '../types';
import { validateImageFile, createImageUrl, revokeImageUrl, formatFileSize } from '../utils/imageProcessor';

export function useImageUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isDragActive: false,
    error: null
  });

  const [currentImage, setCurrentImage] = useState<ImageFile | null>(null);

  const processFile = useCallback(async (file: File): Promise<ImageFile | null> => {
    // 验证文件
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setUploadState(prev => ({ ...prev, error: validation.error }));
      return null;
    }

    // 清理之前的错误
    setUploadState(prev => ({ ...prev, error: null }));

    // 创建图片信息对象
    const imageUrl = createImageUrl(file);
    const imageFile: ImageFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: imageUrl
    };

    return imageFile;
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    const imageFile = await processFile(file);
    if (imageFile) {
      // 清理之前的图片URL
      if (currentImage) {
        revokeImageUrl(currentImage.url);
      }
      setCurrentImage(imageFile);
    }
  }, [currentImage, processFile]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadState(prev => ({ ...prev, isDragActive: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadState(prev => ({ ...prev, isDragActive: false }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setUploadState(prev => ({ ...prev, isDragActive: false }));

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const clearImage = useCallback(() => {
    if (currentImage) {
      revokeImageUrl(currentImage.url);
      setCurrentImage(null);
    }
    setUploadState({ isDragActive: false, error: null });
  }, [currentImage]);

  const reset = useCallback(() => {
    clearImage();
    setUploadState({ isDragActive: false, error: null });
  }, [clearImage]);

  // 清理函数
  const cleanup = useCallback(() => {
    if (currentImage) {
      revokeImageUrl(currentImage.url);
    }
  }, [currentImage]);

  return {
    currentImage,
    uploadState,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleInputChange,
    clearImage,
    reset,
    cleanup,
    formatFileSize
  };
}