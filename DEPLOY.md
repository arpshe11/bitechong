# ICO Converter - 部署指南

## 🚀 部署选项

### 1. 静态文件部署
构建后的文件位于 `dist/` 目录，可以直接部署到任何静态文件服务器。

```bash
# 构建项目
npm run build

# 部署dist目录到服务器
```

### 2. Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 3. Netlify 部署
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

### 4. GitHub Pages 部署
1. 推送代码到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支作为源

### 5. 传统服务器部署
将 `dist/` 目录下的所有文件上传到服务器的 Web 根目录。

## 📋 部署前检查清单

- [ ] 代码已提交到版本控制
- [ ] 环境变量已配置（如果需要）
- [ ] 构建成功且无错误
- [ ] 在本地测试了生产构建
- [ ] SEO 标签已正确设置
- [ ] 图标和 meta 信息已配置

## 🔧 环境变量（如需要）

目前项目无需特殊环境变量，完全前端化部署。

## 🌐 部署后验证

1. 访问部署的 URL
2. 测试完整的用户流程
3. 检查所有功能正常工作
4. 验证 SEO 元数据正确
5. 测试移动端响应式设计

## 📊 性能优化建议

- 启用 Gzip 压缩
- 配置 CDN 加速
- 设置适当的缓存策略
- 优化图片和静态资源