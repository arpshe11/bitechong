import { motion } from 'framer-motion';
import type { ConvertedIcon } from '../../types';
import { saveAs } from 'file-saver';

export interface PreviewPanelProps {
  convertedIcons: ConvertedIcon[];
  isConverting: boolean;
  progress: number;
  error: string | null;
  icoFile: { blob: Blob; url: string } | null;
}

export function PreviewPanel({ convertedIcons, isConverting, progress, error, icoFile }: PreviewPanelProps) {
  if (isConverting) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="mb-3">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 7 12c0 1.892 3.37 7 6.542 7 .66 1.508.269 3.054 1.923 4.084.964.266 1.523-.374 2.874-.015 3.349-.538 3.349-.538-.96 0-2.229-.642-4.072-.015-6.006z" />
            </svg>
            转换进度
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">正在生成图标...</p>
              <p className="text-sm text-gray-500 mt-1">{progress}%</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">转换失败</h2>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">转换出错</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}

  if (convertedIcons.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
      <div className="mb-3">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 7 12c0 1.892 3.37 7 6.542 7 .66 1.508.269 3.054 1.923 4.084.964.266 1.523-.374 2.874-.015 3.349-.538 3.349-.538-.96 0-2.229-.642-4.072-.015-6.006z" />
          </svg>
          预览结果
        </h2>
      </div>

        <div className="flex items-center justify-center py-12 text-gray-400">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>暂无预览内容</p>
            <p className="text-sm mt-1">请先上传图片并选择尺寸</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">3. 预览结果</h2>
        <p className="text-sm text-gray-600 mt-1">转换完成，点击预览查看大图</p>
      </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {convertedIcons.map((icon, index) => (
                    <motion.div
                      key={icon.size}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="relative inline-block">
                        <div className="w-16 h-16 mx-auto border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center group-hover:border-blue-300 transition-colors">
                          <img
                            src={icon.url}
                            alt={`${icon.size}×${icon.size} 图标`}
                            className="w-full h-full object-contain"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 00-1.414 1.414L16.707 5.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1">
                        <p className="text-xs font-medium text-gray-900">{icon.size}×{icon.size}</p>
                        <p className="text-xs text-gray-500">
                          {(icon.blob.size / 1024).toFixed(1)}KB
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ICO文件下载区域 */}
                {icoFile && (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-green-800">ICO文件生成完成！</h4>
                        <p className="text-sm text-green-700 mt-1">
                          已成功生成包含 {convertedIcons.length} 种尺寸的ICO文件
                        </p>
                        <div className="mt-2 flex items-center text-xs text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-8l-4 8H8l4 8v8H2a2 2 0 01-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
                          </svg>
                          文件大小：{(icoFile.blob.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => {
                            saveAs(icoFile.blob, 'favicon.ico');
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-6 4l-4 4m0 0l-4-4m4 4v11" />
                          </svg>
                          下载 ICO 文件
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                        <button
                          onClick={() => {
                            saveAs(icoFile.blob, 'favicon.ico');
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-6 4l-4 4m0 0l-4-4m4 4v11" />
                          </svg>
                          下载 ICO 文件
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-gray-900">{icon.size}×{icon.size}</p>
              <p className="text-xs text-gray-500">
                {(icon.blob.size / 1024).toFixed(1)}KB
              </p>
              <a
                href={icon.url}
                download={`favicon_${icon.size}x${icon.size}.png`}
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                title={`下载 ${icon.size}×${icon.size} PNG`}
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PNG
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-800">转换成功！</h4>
            <p className="text-sm text-green-700 mt-1">
              已成功生成 {convertedIcons.length} 个尺寸的图标，现在可以下载ICO文件了。
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}