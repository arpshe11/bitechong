import { useState, useCallback, useMemo } from 'react';
import type { ImageFile, ConversionSettings, ConvertedIcon, SupportedSize } from '../types';
import { loadImageToCanvas, resizeImage } from '../utils/imageProcessor';
import { createICOFile, cleanupUrl } from '../utils/icoEncoder';

export function useIcoConverter() {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [convertedIcons, setConvertedIcons] = useState<ConvertedIcon[]>([]);
  const [icoFile, setIcoFile] = useState<{ blob: Blob; url: string } | null>(null);

  const defaultSettings: ConversionSettings = useMemo(() => ({
    sizes: [16, 32, 48, 64, 128],
    quality: 1.0,
    backgroundColor: '#ffffff'
  }), []);

  const [settings, setSettings] = useState<ConversionSettings>(defaultSettings);

  const convertImage = useCallback(async (imageFile: ImageFile, conversionSettings: ConversionSettings): Promise<ConvertedIcon[]> => {
    try {
      // 加载原始图片到Canvas
      const originalCanvas = await loadImageToCanvas(imageFile.file);

      // 为每个选定的尺寸创建转换后的图标
      const icons: ConvertedIcon[] = [];
      const totalSteps = conversionSettings.sizes.length;

      for (let i = 0; i < conversionSettings.sizes.length; i++) {
        const size = conversionSettings.sizes[i];
        
        // 更新进度
        setProgress(Math.round((i / totalSteps) * 100));

        try {
          // 调整图片尺寸
          const blob = await resizeImage(originalCanvas, size, conversionSettings.quality);
          const url = URL.createObjectURL(blob);

          const icon: ConvertedIcon = {
            size,
            blob,
            url
          };

          icons.push(icon);
        } catch (err) {
          console.error(`Failed to convert to ${size}x${size}:`, err);
          throw new Error(`无法生成 ${size}x${size} 尺寸的图标`);
        }
      }

      setProgress(100);
      return icons;
    } catch (err) {
      throw new Error(`图片转换失败: ${err instanceof Error ? err.message : '未知错误'}`);
    }
  }, []);

  const generateICO = useCallback(async (imageFile: ImageFile, conversionSettings: ConversionSettings = settings, removeBackground: boolean = false) => {
    setIsConverting(true);
    setProgress(0);
    setError(null);

    try {
      // 清理之前的结果
      convertedIcons.forEach(icon => cleanupUrl(icon.url));
      if (icoFile) {
        cleanupUrl(icoFile.url);
      }

      let fileToConvert = imageFile;
      
      // 如果需要移除背景
      if (removeBackground) {
        const { removeBackground: removeBg } = await import('../utils/aiProcessor');
        const blob = await removeBg(imageFile.file);
        
        // 检查blob中的透明像素
        const testImg = new Image();
        const blobUrl = URL.createObjectURL(blob);
        testImg.src = blobUrl;
        await new Promise(r => testImg.onload = r);
        
        const testCanvas = document.createElement('canvas');
        testCanvas.width = testImg.width;
        testCanvas.height = testImg.height;
        testCanvas.getContext('2d')?.drawImage(testImg, 0, 0);
        
        fileToConvert = {
          ...imageFile,
          file: new File([blob], 'removed_bg.png', { type: 'image/png' }),
          url: URL.createObjectURL(blob)
        };
      }

      // 转换图片
      const icons = await convertImage(fileToConvert, conversionSettings);
      setConvertedIcons(icons);
      
      // 生成ICO文件
      const icoResult = await createICOFile(icons);
      setIcoFile(icoResult);
      setIcoFile(icoResult);

      return { icons, icoFile: icoResult };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '转换过程中发生未知错误';
      setError(errorMessage);
      throw err;
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  }, [settings, convertImage, convertedIcons, icoFile]);

  const updateSettings = useCallback((newSettings: Partial<ConversionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleSize = useCallback((size: SupportedSize) => {
    setSettings(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b)
    }));
  }, []);

  const reset = useCallback(() => {
    setIsConverting(false);
    setProgress(0);
    setError(null);
    
    // 清理资源
    convertedIcons.forEach(icon => cleanupUrl(icon.url));
    if (icoFile) {
      cleanupUrl(icoFile.url);
    }
    
    setConvertedIcons([]);
    setIcoFile(null);
    setSettings(defaultSettings);
  }, [convertedIcons, icoFile, defaultSettings]);

  const cleanup = useCallback(() => {
    convertedIcons.forEach(icon => cleanupUrl(icon.url));
    if (icoFile) {
      cleanupUrl(icoFile.url);
    }
  }, [convertedIcons, icoFile]);

  return {
    isConverting,
    progress,
    error,
    convertedIcons,
    icoFile,
    settings,
    generateICO,
    updateSettings,
    toggleSize,
    reset,
    cleanup
  };
}