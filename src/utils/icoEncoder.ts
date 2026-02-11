/**
 * ICO文件编码工具
 * 使用png-to-ico库进行ICO格式转换
 */

import { PNGToICO } from 'png-to-ico';
import type { ConvertedIcon } from '../types';

/**
 * 将PNG文件转换为ICO格式
 * @param pngBuffers PNG文件的Buffer数组，按尺寸从小到大排序
 * @returns Promise<Buffer> ICO文件的Buffer
 */
export async function convertPNGsToICO(pngBuffers: Buffer[]): Promise<Buffer> {
  try {
    const icoBuffer = await PNGToICO(pngBuffers);
    return icoBuffer;
  } catch (error) {
    throw new Error(`ICO转换失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 将Blob转换为Buffer
 */
export async function blobToBuffer(blob: Blob): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(Buffer.from(reader.result));
      } else {
        reject(new Error('无法读取文件数据'));
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * 创建ICO文件并生成下载URL
 */
export async function createICOFile(convertedIcons: ConvertedIcon[]): Promise<{ blob: Blob; url: string }> {
  if (convertedIcons.length === 0) {
    throw new Error('没有可转换的图标');
  }

  try {
    // 按尺寸排序（从小到大）
    const sortedIcons = [...convertedIcons].sort((a, b) => a.size - b.size);
    
    // 转换为Buffer数组
    const pngBuffers: Buffer[] = [];
    for (const icon of sortedIcons) {
      const buffer = await blobToBuffer(icon.blob);
      pngBuffers.push(buffer);
    }

    // 转换为ICO
    const icoBuffer = await convertPNGsToICO(pngBuffers);
    
    // 创建Blob和URL
    const icoBlob = new Blob([icoBuffer], { type: 'image/x-icon' });
    const icoUrl = URL.createObjectURL(icoBlob);

    return { blob: icoBlob, url: icoUrl };
  } catch (error) {
    throw new Error(`ICO文件创建失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 清理URL资源
 */
export function cleanupUrl(url: string): void {
  URL.revokeObjectURL(url);
}

/**
 * 验证ICO文件
 */
export async function validateICOFile(blob: Blob): Promise<boolean> {
  try {
    // ICO文件应该以特定的字节序列开头
    const buffer = await blobToBuffer(blob);
    
    // 检查ICO文件头 (应该为 0x00 0x00 0x01 0x00)
    if (buffer.length < 4) {
      return false;
    }
    
    return buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0x01 && buffer[3] === 0x00;
  } catch {
    return false;
  }
}

/**
 * 获取ICO文件信息
 */
export async function getICOFileInfo(blob: Blob): Promise<{ size: number; type: string }> {
  return {
    size: blob.size,
    type: blob.type
  };
}