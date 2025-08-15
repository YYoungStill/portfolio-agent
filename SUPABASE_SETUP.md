# Supabase 设置指南

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并注册账号
2. 点击 "New Project"
3. 选择组织，输入项目名称（如：portfolio-management）
4. 设置数据库密码
5. 选择地区（建议选择离用户最近的地区）
6. 点击 "Create new project"

## 2. 创建数据库表

在 Supabase Dashboard 中，进入 SQL Editor，执行以下 SQL：

```sql
-- 创建投资组合数据表
CREATE TABLE portfolio_data (
  id TEXT PRIMARY KEY,
  cash JSONB NOT NULL DEFAULT '{"cny": 0, "hkd": 0, "usd": 0}',
  exchangeRates JSONB NOT NULL DEFAULT '{"HKDCNY": 0.9413, "USDCNY": 7.2545}',
  aShareFlows JSONB NOT NULL DEFAULT '[]',
  overseaFlows JSONB NOT NULL DEFAULT '[]',
  holdings JSONB NOT NULL DEFAULT '{"aShare": [], "hShare": [], "usShare": []}',
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入初始数据
INSERT INTO portfolio_data (id, cash, exchangeRates, aShareFlows, overseaFlows, holdings) 
VALUES (
  'main-portfolio',
  '{"cny": 3268.08, "hkd": 18454.14, "usd": 367.49}',
  '{"HKDCNY": 0.9413, "USDCNY": 7.2545}',
  '[
    {"date": "2024-10-08", "type": "转入", "amount": 8000, "note": "开户"},
    {"date": "2024-10-09", "type": "转出", "amount": 8000, "note": ""},
    {"date": "2024-10-09", "type": "转出", "amount": 67.24, "note": ""},
    {"date": "2024-10-11", "type": "转入", "amount": 7000, "note": ""},
    {"date": "2024-10-15", "type": "转入", "amount": 3000, "note": ""},
    {"date": "2024-10-18", "type": "转入", "amount": 3000, "note": ""},
    {"date": "2024-10-24", "type": "转入", "amount": 6000, "note": ""},
    {"date": "2025-01-09", "type": "转出", "amount": 5000, "note": ""}
  ]',
  '[
    {"date": "2024-08-20", "type": "转入", "amountHKD": 5438.92, "amountCNY": 5000, "rate": 0.9193},
    {"date": "2024-08-21", "type": "转入", "amountHKD": 4561.08, "amountCNY": 4184.79, "rate": 0.9175},
    {"date": "2024-09-23", "type": "转入", "amountHKD": 11029.76, "amountCNY": 10008.4, "rate": 0.9074},
    {"date": "2025-01-14", "type": "转入", "amountHKD": 3100, "amountCNY": 2926.09, "rate": 0.9439}
  ]',
  '{
    "aShare": [
      {"id": 1, "name": "创业板50ETF", "code": "159949.SZ", "currentPrice": 0.906, "costPrice": 0.957, "quantity": 11500, "fees": 1.56},
      {"id": 2, "name": "恒生科技ETF", "code": "159740.SZ", "currentPrice": 0.709, "costPrice": 0.418, "quantity": 600, "fees": 0},
      {"id": 3, "name": "工商银行", "code": "601398.SH", "currentPrice": 6.63, "costPrice": 5.871, "quantity": 0, "fees": 0},
      {"id": 4, "name": "赣锋锂业", "code": "002460.SZ", "currentPrice": 31.19, "costPrice": 35.099, "quantity": 0, "fees": 0}
    ],
    "hShare": [
      {"id": 5, "name": "小鹏汽车-W", "code": "9868.HK", "currentPrice": 68, "costPrice": 63.1, "quantity": 0, "fees": 0},
      {"id": 6, "name": "小米集团-W", "code": "1810.HK", "currentPrice": 47.55, "costPrice": 44.2, "quantity": 0, "fees": 0},
      {"id": 7, "name": "哔哩哔哩-W", "code": "9626.HK", "currentPrice": 170, "costPrice": 162, "quantity": 0, "fees": 24.27},
      {"id": 8, "name": "京东集团-SW", "code": "9618.HK", "currentPrice": 135.4, "costPrice": 157.9, "quantity": 0, "fees": 0},
      {"id": 9, "name": "美团-W", "code": "3690.HK", "currentPrice": 140, "costPrice": 167.1991, "quantity": 0, "fees": 0}
    ],
    "usShare": [
      {"id": 10, "name": "达达集团", "code": "DADA", "currentPrice": 2.035, "costPrice": 1.85, "quantity": 20, "fees": 2.05},
      {"id": 11, "name": "英伟达", "code": "NVDA", "currentPrice": 133.635, "costPrice": 115.92, "quantity": 0, "fees": 0},
      {"id": 12, "name": "阿里巴巴", "code": "BABA", "currentPrice": 131, "costPrice": 125, "quantity": 0, "fees": 0},
      {"id": 13, "name": "FUBOTV", "code": "FUBO", "currentPrice": 2.885, "costPrice": 4.89, "quantity": 0, "fees": 0},
      {"id": 14, "name": "蓝帽子", "code": "BHAT", "currentPrice": 0.07, "costPrice": 0.173, "quantity": 0, "fees": 0}
    ]
  }'
);

-- 启用实时功能
ALTER PUBLICATION supabase_realtime ADD TABLE portfolio_data;
```

## 3. 获取 API 密钥

1. 在 Supabase Dashboard 中，进入 Settings → API
2. 复制以下信息：
   - **Project URL** (例如：https://your-project.supabase.co)
   - **anon public** key

## 4. 更新项目配置

在 `src/lib/supabase.ts` 文件中，替换以下内容：

```typescript
const supabaseUrl = '你的Project URL'
const supabaseAnonKey = '你的anon public key'
```

## 5. 设置 RLS (Row Level Security)

在 SQL Editor 中执行：

```sql
-- 启用 RLS
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户读写数据
CREATE POLICY "Allow anonymous access" ON portfolio_data
  FOR ALL USING (true)
  WITH CHECK (true);
```

## 6. 测试连接

1. 部署项目到 Vercel
2. 访问网站，检查控制台是否有连接错误
3. 尝试编辑数据，确认能正常保存和同步

## 注意事项

- **免费额度**：Supabase 免费版每月有 500MB 数据库和 50,000 行数据的限制
- **安全性**：由于允许匿名访问，任何人都可以修改数据，适合内部使用
- **备份**：建议定期备份数据库数据
- **监控**：可以在 Supabase Dashboard 中监控数据库使用情况

## 故障排除

1. **连接失败**：检查 URL 和 API Key 是否正确
2. **权限错误**：确认 RLS 策略设置正确
3. **实时同步不工作**：检查是否启用了实时功能
4. **数据不更新**：检查网络连接和 API 限制
