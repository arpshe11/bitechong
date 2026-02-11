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
  quality: number = 1.0
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const resizedCanvas = document.createElement('canvas');
    const resizedCtx = resizedCanvas.getContext('2d');
    
    if (!resizedCtx) {
      reject(new Error('无法获取Canvas上下文'));
      return;
    }

    resizedCanvas.width = targetSize;
    resizedCanvas.height = targetSize;

    // 计算缩放和居中
    const sourceWidth = canvas.width;
    const sourceHeight = canvas.height;
    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = 1; // 正方形

    let drawWidth, drawHeight, offsetX, offsetY;

    if (sourceRatio > targetRatio) {
      // 原图较宽，高度填满
      drawHeight = targetSize;
      drawWidth = drawHeight * sourceRatio;
      offsetX = (targetSize - drawWidth) / 2;
      offsetY = 0;
    } else {
      // 原图较高，宽度填满
      drawWidth = targetSize;
      drawHeight = drawWidth / sourceRatio;
      offsetX = 0;
      offsetY = (targetSize - drawHeight) / 2;
    }

    // 设置图片平滑
    resizedCtx.imageSmoothingEnabled = true;
    resizedCtx.imageSmoothingQuality = 'high';

    // 绘制白色背景
    resizedCtx.fillStyle = '#ffffff';
    resizedCtx.fillRect(0, 0, targetSize, targetSize);

    // 绘制图片
    resizedCtx.drawImage(canvas, offsetX, offsetY, drawWidth, drawHeight);

    // 转换为Blob
    resizedCanvas.toBlob(
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