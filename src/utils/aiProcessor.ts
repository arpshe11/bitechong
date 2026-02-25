import * as tf from '@tensorflow/tfjs';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';

let segmenter: bodySegmentation.BodySegmenter | null = null;

export interface ImageQualityResult {
  score: number;
  issues: string[];
  suggestions: string[];
}

export async function initializeAIService(): Promise<void> {
  await tf.ready();
  segmenter = await bodySegmentation.createSegmenter(
    bodySegmentation.SupportedModels.BodyPix,
    {
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    }
  );
}

export async function analyzeImageQuality(file: File): Promise<ImageQualityResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法获取Canvas上下文');
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  let totalBrightness = 0;
  let darkPixels = 0;
  let brightPixels = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    totalBrightness += brightness;
    
    if (brightness < 50) darkPixels++;
    if (brightness > 200) brightPixels++;
  }
  
  const avgBrightness = totalBrightness / (data.length / 4);
  const totalPixels = data.length / 4;
  
  if (avgBrightness < 80) {
    issues.push('图片整体偏暗');
    suggestions.push('建议提高亮度以提高ICO图标清晰度');
  } else if (avgBrightness > 180) {
    issues.push('图片整体过亮');
    suggestions.push('建议降低亮度以提高ICO图标清晰度');
  }
  
  if (darkPixels / totalPixels > 0.3) {
    issues.push('存在较多暗部区域');
    suggestions.push('建议增加整体亮度');
  }
  
  if (brightPixels / totalPixels > 0.3) {
    issues.push('存在较多过曝区域');
    suggestions.push('建议降低亮度或调整曝光');
  }
  
  const score = Math.max(0, Math.min(100, 100 - issues.length * 20));
  
  return { score, issues, suggestions };
}

export async function removeBackground(file: File): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法获取Canvas上下文');
  
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;
  
  const tl = { r: data[0], g: data[1], b: data[2] };
  const tr = { r: data[(width - 1) * 4], g: data[(width - 1) * 4 + 1], b: data[(width - 1) * 4 + 2] };
  const bl = { r: data[(height - 1) * width * 4], g: data[(height - 1) * width * 4 + 1], b: data[(height - 1) * width * 4 + 2] };
  const br = { r: data[(height - 1) * width * 4 + (width - 1) * 4], g: data[(height - 1) * width * 4 + (width - 1) * 4 + 1], b: data[(height - 1) * width * 4 + (width - 1) * 4 + 2] };
  
  const avgR = Math.round((tl.r + tr.r + bl.r + br.r) / 4);
  const avgG = Math.round((tl.g + tr.g + bl.g + br.g) / 4);
  const avgB = Math.round((tl.b + tr.b + bl.b + br.b) / 4);
  
  const threshold = 50;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    if (Math.abs(r - avgR) < threshold && Math.abs(g - avgG) < threshold && Math.abs(b - avgB) < threshold) {
      data[i + 3] = 0;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('背景移除失败'));
      }
    }, 'image/png');
  });
}

export async function optimizeImage(file: File, settings: {
  brightness?: number;
  contrast?: number;
  saturation?: number;
}): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法获取Canvas上下文');
  
  const brightness = settings.brightness ?? 0;
  const contrast = settings.contrast ?? 1;
  const saturation = settings.saturation ?? 1;
  
  ctx.filter = `brightness(${100 + brightness}%) contrast(${contrast * 100}%) saturate(${saturation * 100}%)`;
  ctx.drawImage(img, 0, 0);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('图片优化失败'));
      }
    }, 'image/png');
  });
}

export async function smartCrop(file: File, targetSize: number): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法获取Canvas上下文');
  
  const minDim = Math.min(img.width, img.height);
  const sx = (img.width - minDim) / 2;
  const sy = (img.height - minDim) / 2;
  
  canvas.width = targetSize;
  canvas.height = targetSize;
  
  ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('智能裁剪失败'));
      }
    }, 'image/png');
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = URL.createObjectURL(file);
  });
}

export function cleanupAIResources(): void {
  if (segmenter) {
    segmenter.dispose();
    segmenter = null;
  }
  tf.disposeVariables();
}
