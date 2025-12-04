# My-timestamp

[English](README.md) | [简体中文](README.zh-CN.md)

一个功能强大的 VS Code 扩展,帮助您处理 Unix 时间戳。可以在任意时区即时转换时间戳与人类可读的日期格式!

## 功能特性

### 1. 显示可读时间戳(切换模式)

在代码或文件中的 Unix 时间戳旁边显示人类可读的日期。按一次快捷键显示,再按一次隐藏。

**示例:**
```
之前:
1609459200
1705327800

按下 Cmd+Shift+T (Mac) 或 Ctrl+Shift+T (Windows/Linux) 后:
1609459200 → 2021-01-01 00:00:00
1705327800 → 2024-01-15 14:30:00
```

**功能特点:**
- 自动检测秒级(10位)和毫秒级(13位)时间戳
- 再次按快捷键可切换显示/隐藏
- 编辑文档时自动隐藏
- 可自定义日期格式和时区
- 可选时区标签显示(如 "CST"、"PST"、"UTC")

### 2. 日期时间转时间戳

快速将人类可读的日期转换为 Unix 时间戳,并插入到光标位置。

**使用方法:**
1. 按 `Cmd+Shift+D` (Mac) 或 `Ctrl+Shift+D` (Windows/Linux)
2. 输入日期,如:`2024-01-15 14:30:00`
3. 时间戳将插入到光标位置:`1705327800`
4. 点击"复制到剪贴板"按钮可同时复制

**支持的格式:**
- `yyyy-MM-dd HH:mm:ss` (如 `2024-01-15 14:30:00`)
- `yyyy-MM-dd HH:mm` (如 `2024-01-15 14:30`)
- `yyyy-MM-dd` (如 `2024-01-15`)
- `yyyy/MM/dd HH:mm:ss` (可使用斜杠分隔)

### 3. 时区选择器

通过便捷的下拉选择器轻松切换时区。

**使用方法:**
1. 按 `Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux)
2. 输入:"Timestamp: Select Timezone"
3. 从 30+ 个常用时区中选择

**支持的时区包括:**
- Local(系统时区)
- UTC
- 亚洲:上海、东京、香港、新加坡、首尔、迪拜、曼谷、加尔各答
- 美洲:纽约、洛杉矶、芝加哥、多伦多、墨西哥城、圣保罗
- 欧洲:伦敦、巴黎、柏林、莫斯科、伊斯坦布尔、阿姆斯特丹
- 太平洋:悉尼、墨尔本、奥克兰
- 非洲:开罗、约翰内斯堡

## 安装

1. 打开 VS Code
2. 按 `Cmd+P` (Mac) 或 `Ctrl+P` (Windows/Linux)
3. 输入:`ext install my-timestamp`
4. 按回车键

## 快速开始

### 基础使用

1. **打开包含时间戳的文件**(或创建测试文件,输入:`1609459200`)
2. **按 `Cmd+Shift+T`** (Mac) 或 `Ctrl+Shift+T` (Windows/Linux)
3. **查看可读日期**显示在时间戳旁边!
4. **再次按快捷键**即可隐藏显示

### 日期转时间戳

1. **将光标放在**想要插入时间戳的位置
2. **按 `Cmd+Shift+D`** (Mac) 或 `Ctrl+Shift+D` (Windows/Linux)
3. **输入日期**:`2024-12-25 10:00:00`
4. **按回车** - 时间戳已插入!

### 更改时区

1. **打开命令面板**:`Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux)
2. **输入**:"Timestamp: Select Timezone"
3. **选择时区**(如"Asia/Shanghai")
4. **完成!**所有时间戳现在将以该时区显示

## 快捷键

| 命令 | Mac | Windows/Linux | 说明 |
|------|-----|---------------|------|
| 显示/隐藏时间戳 | `Cmd+Shift+T` | `Ctrl+Shift+T` | 切换可读时间戳显示 |
| 转换为时间戳 | `Cmd+Shift+D` | `Ctrl+Shift+D` | 将日期时间转换为时间戳 |

## 扩展设置

通过 VS Code 设置配置扩展(`Cmd+,` 或 `Ctrl+,`):

### `my-timestamp.timezone`
**类型:** 字符串下拉列表
**默认值:** `"local"`
**选项:** 30+ 个时区(local、UTC、Asia/Shanghai、America/New_York 等)
**说明:** 用于时间戳转换的时区

### `my-timestamp.showTimezoneLabel`
**类型:** 布尔值
**默认值:** `false`
**说明:** 在装饰中显示时区缩写(如 "CST"、"PST")

**启用标签后的示例:**
```
1609459200 → 2021-01-01 08:00:00 CST
```

### `my-timestamp.dateFormat`
**类型:** 字符串
**默认值:** `"yyyy-MM-dd HH:mm:ss"`
**说明:** 显示的日期格式模板

**自定义格式示例:**
```json
{
  "my-timestamp.dateFormat": "yyyy/MM/dd HH:mm:ss"
}
```
结果:`1609459200 → 2021/01/01 00:00:00`

### `my-timestamp.defaultFormat`
**类型:** 字符串
**默认值:** `"seconds"`
**选项:** `"seconds"`、`"milliseconds"`
**说明:** 转换日期时的默认时间戳格式

### `my-timestamp.minYear` / `my-timestamp.maxYear`
**类型:** 数字
**默认值:** `1970` / `2100`
**说明:** 时间戳检测的有效年份范围

### `my-timestamp.decorationColor`
**类型:** 字符串
**默认值:** `"editorCodeLens.foreground"`
**说明:** 时间戳装饰的颜色

## 配置示例

### 示例 1: 与中国团队协作
```json
{
  "my-timestamp.timezone": "Asia/Shanghai",
  "my-timestamp.showTimezoneLabel": true
}
```
结果:`1609459200 → 2021-01-01 08:00:00 CST`

### 示例 2: 与美国东海岸团队协作
```json
{
  "my-timestamp.timezone": "America/New_York",
  "my-timestamp.showTimezoneLabel": true
}
```
结果:`1609459200 → 2020-12-31 19:00:00 EST`

### 示例 3: 始终使用 UTC
```json
{
  "my-timestamp.timezone": "UTC",
  "my-timestamp.showTimezoneLabel": false
}
```
结果:`1609459200 → 2021-01-01 00:00:00`

### 示例 4: 毫秒级时间戳
```json
{
  "my-timestamp.defaultFormat": "milliseconds"
}
```
转换 `2024-01-15 14:30:00` 得到:`1705327800000`

## 使用场景

### 1. 调试日志文件
快速了解事件发生时间:
```
[ERROR] Request failed at 1609459200
→ [ERROR] Request failed at 1609459200 → 2021-01-01 00:00:00
```

### 2. 数据库查询
验证 SQL 中的时间戳值:
```sql
SELECT * FROM users WHERE created_at > 1609459200;
→ SELECT * FROM users WHERE created_at > 1609459200 → 2021-01-01 00:00:00;
```

### 3. API 开发
插入时间戳进行测试:
```javascript
const testDate = // 按 Cmd+Shift+D,输入 "2024-01-15 14:30:00"
const testDate = 1705327800
```

### 4. 国际团队协作
以同事的时区查看时间戳:
```
会议时间: 1609459200
→ 上海时间: 2021-01-01 08:00:00 CST
→ 纽约时间: 2020-12-31 19:00:00 EST
```

## 命令

通过命令面板访问(`Cmd+Shift+P` / `Ctrl+Shift+P`):

- **Timestamp: Show Readable Timestamps** - 切换时间戳显示
- **Timestamp: Convert DateTime to Timestamp** - 将日期转换为时间戳
- **Timestamp: Select Timezone** - 通过下拉列表更改时区

## 提示与技巧

1. **快速切换**:使用 `Cmd+Shift+T` 在查看代码时快速显示/隐藏时间戳

2. **复制多个时间戳**:
   - 使用 `Cmd+Shift+D` 逐个转换日期
   - 每次使用"复制到剪贴板"按钮

3. **不同项目使用不同时区**:
   - 使用工作区设置为特定项目设置时区
   - 路径:设置 → 工作区 → 搜索 "timestamp"

4. **仅检测有效时间戳**:
   - 调整 `minYear` 和 `maxYear` 以过滤误报
   - 默认范围(1970-2100)适用于大多数情况

## 系统要求

- VS Code 1.106.0 或更高版本
- 无需外部依赖!

## 已知问题

- 编辑文档时装饰会自动隐藏(设计如此)
- 超大文件(>10000 行)可能有轻微性能影响
- 时区缩写取决于您的系统区域设置

## 更新日志

### 0.0.1 (首次发布)

功能:
- 支持切换显示可读时间戳
- 日期时间转时间戳
- 支持 30+ 个时区
- 时区下拉选择器
- 可配置日期格式
- 可选时区标签
- 支持秒级和毫秒级时间戳

## 反馈与支持

发现 bug 或有功能建议?
- [报告问题](https://github.com/yourusername/my-timestamp/issues)
- [提交 Pull Request](https://github.com/yourusername/my-timestamp/pulls)

## 许可证

MIT

---

**享受时间戳转换的乐趣!** ⏰
