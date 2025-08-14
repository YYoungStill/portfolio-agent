# 部署说明

## 生产环境部署

### 1. 环境要求

- **Node.js**: 版本 16.0.0 或更高
- **pnpm**: 版本 7.0.0 或更高
- **Web服务器**: Nginx、Apache 或任何静态文件服务器

### 2. 构建步骤

```bash
# 1. 安装依赖
pnpm install

# 2. 构建生产版本
pnpm run build

# 3. 构建完成后，dist/static 目录包含所有静态文件
```

### 3. 部署方式

#### 方式一：静态文件服务器

将 `dist/static` 目录中的所有文件上传到Web服务器的根目录。

#### 方式二：Nginx配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist/static;
    index index.html;

    # 处理React Router的客户端路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 方式三：Vercel部署

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 构建命令：`pnpm run build`
4. 输出目录：`dist/static`

### 4. 环境变量配置

本项目使用本地存储，无需配置环境变量。

### 5. 性能优化建议

- 启用Gzip压缩
- 配置静态资源缓存
- 使用CDN加速静态资源
- 启用HTTP/2

### 6. 安全注意事项

- 配置HTTPS
- 设置适当的CSP头
- 定期更新依赖包
- 监控错误日志

### 7. 维护说明

- 数据存储在浏览器本地，无需数据库维护
- 定期备份用户数据（如需要）
- 监控网站性能和可用性

## 故障排除

### 常见问题

1. **页面刷新404错误**
   - 确保服务器配置了正确的路由重写规则

2. **静态资源加载失败**
   - 检查文件路径和权限
   - 确认构建输出目录正确

3. **样式显示异常**
   - 检查CSS文件是否正确加载
   - 确认Tailwind CSS配置正确

### 联系支持

如遇到技术问题，请联系开发团队获取支持。
