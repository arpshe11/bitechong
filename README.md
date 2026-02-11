# ICO图标制作工具

一个基于React的在线ICO图标转换工具，支持将图片转换为多尺寸的ICO格式网站图标。

## ✨ 功能特性

- 🚀 **快速转换**: 秒级生成高质量ICO文件
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🎨 **实时预览**: 转换前后对比预览
- ⚙️ **灵活配置**: 支持16×16到128×128多种尺寸
- 🎯 **高质量输出**: 智能图片缩放算法
- 🔒 **隐私保护**: 本地处理，无需上传到服务器
- ♿ **无障碍设计**: 完整的键盘导航和屏幕阅读器支持

## 🛠️ 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图像处理**: Canvas API + png-to-ico
- **状态管理**: 自定义Hooks
- **文件上传**: react-dropzone

## 📦 项目结构

```
ico-converter/
├── src/
│   ├── components/          # React组件
│   │   ├── Upload/         # 上传组件
│   │   ├── Converter/      # 转换组件
│   │   ├── Preview/        # 预览组件
│   │   └── Download/       # 下载组件
│   ├── hooks/              # 自定义Hooks
│   │   ├── useImageUpload.ts
│   │   └── useIcoConverter.ts
│   ├── utils/              # 工具函数
│   │   ├── imageProcessor.ts
│   │   └── icoEncoder.ts
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts
│   └── styles/             # 样式文件
├── public/                 # 静态资源
└── docs/                   # 文档
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📋 可用命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产版本
- `npm run lint` - 代码检查
- `npm run lint:fix` - 自动修复代码问题
- `npm run format` - 代码格式化
- `npm run type-check` - TypeScript类型检查

## 🔧 配置说明

### VS Code扩展

项目包含推荐的VS Code扩展配置，安装后可获得最佳开发体验：

- Prettier - 代码格式化
- ESLint - 代码质量检查
- Tailwind CSS IntelliSense - CSS智能提示
- TypeScript Importer - 自动导入

### 代码规范

项目使用ESLint + Prettier确保代码质量和一致性：

- 严格的TypeScript配置
- React Hooks规则检查
- 自动代码格式化

## 🎯 功能说明

### 图片上传

- 支持拖拽上传和点击选择
- 文件格式验证：JPG、PNG、GIF
- 文件大小限制：500KB
- 实时预览上传的图片

### 尺寸选择

- 支持5种标准尺寸：16×16、32×32、48×48、64×64、128×128
- 快速预设：最小化、标准、完整
- 质量控制：10%-100%可调
- 实时显示选择摘要

### 转换处理

- 智能图片缩放算法
- 保持宽高比
- 高质量插值
- 实时进度显示
- 错误处理和恢复

### 预览功能

- 多尺寸缩略图预览
- 文件大小显示
- 单独PNG下载
- 转换状态指示

### 下载功能

- 标准ICO文件下载
- 包含所有选定尺寸
- 文件名：favicon.ico
- 使用说明和代码示例

## 🎨 设计系统

### 颜色主题

```css
primary: #4f6bed (蓝色)
success: #22c55e (绿色)
error: #ef4444 (红色)
warning: #f59e0b (黄色)
```

### 响应式断点

- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🔄 工作流程

1. **上传图片** - 拖拽或点击选择文件
2. **选择尺寸** - 勾选需要的图标尺寸
3. **调整质量** - 设置输出质量（可选）
4. **开始转换** - 点击转换按钮
5. **预览结果** - 查看生成的图标
6. **下载文件** - 下载ICO文件使用

## 🚨 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 开发说明

### 添加新功能

1. 在 `src/types/` 中定义类型
2. 在 `src/utils/` 中实现工具函数
3. 在 `src/components/` 中创建组件
4. 在 `src/hooks/` 中添加状态管理
5. 更新主应用逻辑

### 组件规范

- 使用TypeScript严格类型检查
- 遵循React Hooks最佳实践
- 添加无障碍属性
- 包含加载和错误状态
- 支持键盘导航

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

MIT License

## 🔮 未来计划

- [ ] 批量转换功能
- [ ] 更多图标格式支持
- [ ] AI图像优化
- [ ] 云端处理选项
- [ ] 用户账户系统
- [ ] API接口

## 📞 联系方式

如有问题或建议，请创建Issue或联系开发团队。

---

**© 2026 ICO图标制作工具. 专为Web开发者打造的图标转换工具.**