// 基础类型定义
export interface ImageFile {
  file: File;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface ConversionSize {
  size: number;
  enabled: boolean;
}

export type SupportedSize = 16 | 32 | 48 | 64 | 128;

export interface ConversionSettings {
  sizes: SupportedSize[];
  quality: number;
  backgroundColor?: string;
}

export interface ConvertedIcon {
  size: SupportedSize;
  blob: Blob;
  url: string;
}

export interface ConversionState {
  originalImage: ImageFile | null;
  convertedIcons: ConvertedIcon[];
  settings: ConversionSettings;
  isConverting: boolean;
  progress: number;
  error: string | null;
}

export interface UploadState {
  isDragActive: boolean;
  error: string | null;
}