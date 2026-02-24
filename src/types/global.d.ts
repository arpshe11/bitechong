// 声明全局window对象的扩展类型
declare global {
  interface Window {
    trackConversionStart?: (settings: any) => void;
    trackConversionComplete?: (duration: number, settings: any, success: boolean) => void;
    trackError?: (errorType: string, details: any) => void;
    gtag?: (...args: any[]) => void;
  }
}

export {};