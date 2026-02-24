/**
 * ICO文件编码工具
 * 使用纯浏览器端库进行ICO格式转换
 */

import type { ConvertedIcon } from '../types';

interface ICOHeader {
  reserved: number;     // 0
  type: number;        // 1 for icon
  imageCount: number;   // number of images
}

interface ICONDirentry {
  width: number;
  height: number;
  colorCount: number;   // 0 if >=256k
  reserved: number;     // 0
  colorPlanes: number;  // 0 or 1
  bitCount: number;     // 0 or 32bpp
  sizeBytes: number;    // size in bytes
  offset: number;       // file offset
}

/**
 * 将PNG Buffer转换为ICO格式
 */
export async function convertPNGsToICO(pngBuffers: ArrayBuffer[]): Promise<ArrayBuffer> {
  if (pngBuffers.length === 0) {
    throw new Error('没有PNG数据可转换');
  }

  try {
    // 计算ICO文件头和目录条目
    const header: ICOHeader = {
      reserved: 0,
      type: 1,
      imageCount: pngBuffers.length
    };

    const entries: ICONDirentry[] = [];
    const imageData: ArrayBuffer[] = [];

    // 计算偏移量
    let offset = 6 + (pngBuffers.length * 16); // header + directory entries

    for (let i = 0; i < pngBuffers.length; i++) {
      const buffer = pngBuffers[i];
      const view = new DataView(buffer);
      
      // 读取PNG尺寸
      let width = 0, height = 0;
      
      // 查找IHDR块
      let pos = 8; // 跳过PNG签名
      while (pos < buffer.byteLength - 8) {
        const length = view.getUint32(pos);
        const type = String.fromCharCode(
          view.getUint8(pos + 4),
          view.getUint8(pos + 5),
          view.getUint8(pos + 6),
          view.getUint8(pos + 7)
        );
        
        if (type === 'IHDR') {
          width = view.getUint32(pos + 8);
          height = view.getUint32(pos + 12);
          break;
        }
        
        pos += 8 + length + 4; // 块头 + 数据 + CRC
      }

      if (width === 0 || height === 0) {
        throw new Error(`无法读取PNG ${i + 1} 的尺寸信息`);
      }

      const entry: ICONDirentry = {
        width: Math.min(width, 256),
        height: Math.min(height, 256),
        colorCount: 0,
        reserved: 0,
        colorPlanes: 1,
        bitCount: 32,
        sizeBytes: buffer.byteLength,
        offset: offset
      };

      entries.push(entry);
      imageData.push(buffer);
      offset += buffer.byteLength;
    }

    // 构建ICO文件
    const totalSize = 6 + (entries.length * 16) + imageData.reduce((sum, data) => sum + data.byteLength, 0);
    const result = new ArrayBuffer(totalSize);
    const resultView = new DataView(result);

    // 写入头部
    resultView.setUint16(0, header.reserved, true);
    resultView.setUint16(2, header.type, true);
    resultView.setUint16(4, header.imageCount, true);

    // 写入目录条目
    let pos = 6;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      resultView.setUint8(pos++, entry.width === 256 ? 0 : entry.width);
      resultView.setUint8(pos++, entry.height === 256 ? 0 : entry.height);
      resultView.setUint8(pos++, entry.colorCount);
      resultView.setUint8(pos++, entry.reserved);
      resultView.setUint16(pos, entry.colorPlanes, true);
      pos += 2;
      resultView.setUint16(pos, entry.bitCount, true);
      pos += 2;
      resultView.setUint32(pos, entry.sizeBytes, true);
      pos += 4;
      resultView.setUint32(pos, entry.offset, true);
      pos += 4;
    }

    // 写入图像数据
    for (const data of imageData) {
      const dataView = new DataView(data);
      for (let i = 0; i < data.byteLength; i++) {
        resultView.setUint8(pos++, dataView.getUint8(i));
      }
    }

    return result;
  } catch (error) {
    throw new Error(`ICO转换失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 将Blob转换为ArrayBuffer
 */
export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
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
    
    // 转换为ArrayBuffer数组
    const pngBuffers: ArrayBuffer[] = [];
    for (const icon of sortedIcons) {
      const buffer = await blobToArrayBuffer(icon.blob);
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
    const buffer = await blobToArrayBuffer(blob);
    const view = new DataView(buffer);
    
    // 检查ICO文件头 (应该为 0x00 0x00 0x01 0x00)
    if (buffer.byteLength < 6) {
      return false;
    }
    
    const reserved = view.getUint16(0, true);
    const type = view.getUint16(2, true);
    
    return reserved === 0 && type === 1;
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