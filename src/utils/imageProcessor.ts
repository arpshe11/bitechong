/**
 * 图片处理工具函数
 */

/**
 * 验证图片文件
 */
export function validateImageFile(file: File): { isValid: boolean; error: string | null } {
  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: '不支持的文件格式，请上传 JPG、PNG 或 GIF 格式的图片'
    };
  }

  // 检查文件大小 (500KB)
  const maxSize = 500 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: '文件大小超过 500KB，请压缩后上传'
    };
  }

  return { isValid: true, error: null };
}

/**
 * 创建图片URL
 */
export function createImageUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 清理图片URL
 */
export function revokeImageUrl(url: string): void {
  URL.revokeObjectURL(url);
}

/**
 * 加载图片到Canvas
 */
export function loadImageToCanvas(file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('无法获取Canvas上下文'));
      return;
    }

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas);
    };

    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * 调整图片尺寸
 */
export function resizeImage(
  canvas: HTMLCanvasElement,
  targetSize: number,
  quality: number = 0.95
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // 使用多步缩放算法来提高质量
    const multiStepResize = (sourceCanvas: HTMLCanvasElement, finalSize: number): HTMLCanvasElement => {
      let currentCanvas = sourceCanvas;
      let currentSize = Math.max(sourceCanvas.width, sourceCanvas.height);
      
      // 多步缩放，每步不超过2倍
      while (currentSize > finalSize) {
        const nextSize = Math.max(finalSize, Math.floor(currentSize / 2));
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        if (!tempCtx) {
          throw new Error('无法获取Canvas上下文');
        }
        
        tempCanvas.width = nextSize;
        tempCanvas.height = nextSize;
        
        // 高质量缩放设置
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        
        // 保持宽高比的居中裁剪
        const sourceSize = Math.max(currentCanvas.width, currentCanvas.height);
        const sourceX = (currentCanvas.width - sourceSize) / 2;
        const sourceY = (currentCanvas.height - sourceSize) / 2;
        
        tempCtx.drawImage(
          currentCanvas,
          sourceX, sourceY, sourceSize, sourceSize,
          0, 0, nextSize, nextSize
        );
        
        currentCanvas = tempCanvas;
        currentSize = nextSize;
      }
      
      return currentCanvas;
    };

    try {
      // 创建正方形源画布
      const sourceSize = Math.max(canvas.width, canvas.height);
      const squareCanvas = document.createElement('canvas');
      const squareCtx = squareCanvas.getContext('2d');
      
      if (!squareCtx) {
        throw new Error('无法获取Canvas上下文');
      }
      
      squareCanvas.width = sourceSize;
      squareCanvas.height = sourceSize;
      
      // 居中绘制原图（保持透明背景）
      const offsetX = (sourceSize - canvas.width) / 2;
      const offsetY = (sourceSize - canvas.height) / 2;
      squareCtx.drawImage(canvas, offsetX, offsetY);
      
      // 执行多步缩放
      const finalCanvas = multiStepResize(squareCanvas, targetSize);
      
      // 确保最终尺寸正确
      if (finalCanvas.width !== targetSize || finalCanvas.height !== targetSize) {
        const correctCanvas = document.createElement('canvas');
        const correctCtx = correctCanvas.getContext('2d');
        
        if (!correctCtx) {
          throw new Error('无法获取Canvas上下文');
        }
        
        correctCanvas.width = targetSize;
        correctCanvas.height = targetSize;
        correctCtx.imageSmoothingEnabled = true;
        correctCtx.imageSmoothingQuality = 'high';
        correctCtx.drawImage(finalCanvas, 0, 0, targetSize, targetSize);
        
        finalCanvas.width = targetSize;
        finalCanvas.height = targetSize;
        const finalCtx = finalCanvas.getContext('2d');
        if (finalCtx) {
          finalCtx.drawImage(correctCanvas, 0, 0);
        }
      }
      
      // 检查是否有透明像素
      const ctx = finalCanvas.getContext('2d');
      const imageData = ctx?.getImageData(0, 0, finalCanvas.width, finalCanvas.height);
      let transparentPixels = 0;
      if (imageData) {
        const data = imageData.data;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 255) transparentPixels++;
        }
      }
      
      // 转换为高质量PNG
      finalCanvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('图片处理失败'));
          }
        },
        'image/png',
        quality
      );
      
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}