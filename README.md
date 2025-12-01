# My-timestamp

A powerful VS Code extension that helps you work with Unix timestamps. Instantly convert between timestamps and human-readable dates in any timezone!

## Features

### 1. Show Readable Timestamps (Toggle)

Display human-readable dates next to Unix timestamps in your code or files. Press the shortcut once to show, press again to hide.

**Example:**
```
Before:
1609459200
1705327800

After pressing Cmd+Shift+T (Mac) or Ctrl+Shift+T (Windows/Linux):
1609459200 → 2021-01-01 00:00:00
1705327800 → 2024-01-15 14:30:00
```

**Features:**
- Automatically detects both second (10-digit) and millisecond (13-digit) timestamps
- Toggle visibility by pressing the shortcut again
- Auto-hides when you edit the document
- Customizable date format and timezone
- Optional timezone labels (e.g., "CST", "PST", "UTC")

### 2. Convert DateTime to Timestamp

Quickly convert human-readable dates to Unix timestamps and insert them at your cursor position.

**How to use:**
1. Press `Cmd+Shift+D` (Mac) or `Ctrl+Shift+D` (Windows/Linux)
2. Enter a date like: `2024-01-15 14:30:00`
3. Timestamp is inserted at cursor: `1705327800`
4. Click "Copy to Clipboard" button to also copy it

**Supported formats:**
- `yyyy-MM-dd HH:mm:ss` (e.g., `2024-01-15 14:30:00`)
- `yyyy-MM-dd HH:mm` (e.g., `2024-01-15 14:30`)
- `yyyy-MM-dd` (e.g., `2024-01-15`)
- `yyyy/MM/dd HH:mm:ss` (alternative separator)

### 3. Timezone Selector

Easily switch between timezones with a convenient dropdown selector.

**How to use:**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: "Timestamp: Select Timezone"
3. Choose from 30+ popular timezones

**Supported timezones include:**
- Local (your system timezone)
- UTC
- Asia: Shanghai, Tokyo, Hong Kong, Singapore, Seoul, Dubai, Bangkok, Kolkata
- Americas: New York, Los Angeles, Chicago, Toronto, Mexico City, São Paulo
- Europe: London, Paris, Berlin, Moscow, Istanbul, Amsterdam
- Pacific: Sydney, Melbourne, Auckland
- Africa: Cairo, Johannesburg

## Installation

1. Open VS Code
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows/Linux)
3. Type: `ext install my-timestamp`
4. Press Enter

## Quick Start

### Basic Usage

1. **Open a file** with timestamps (or create a test file with: `1609459200`)
2. **Press `Cmd+Shift+T`** (Mac) or `Ctrl+Shift+T` (Windows/Linux)
3. **See the readable date** appear next to the timestamp!
4. **Press the shortcut again** to hide the decorations

### Convert Date to Timestamp

1. **Place your cursor** where you want to insert a timestamp
2. **Press `Cmd+Shift+D`** (Mac) or `Ctrl+Shift+D` (Windows/Linux)
3. **Type a date**: `2024-12-25 10:00:00`
4. **Press Enter** - timestamp inserted!

### Change Timezone

1. **Open Command Palette**: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. **Type**: "Timestamp: Select Timezone"
3. **Select your timezone** (e.g., "Asia/Shanghai")
4. **Done!** All timestamps now show in that timezone

## Keyboard Shortcuts

| Command | Mac | Windows/Linux | Description |
|---------|-----|---------------|-------------|
| Show/Hide Timestamps | `Cmd+Shift+T` | `Ctrl+Shift+T` | Toggle readable timestamp display |
| Convert to Timestamp | `Cmd+Shift+D` | `Ctrl+Shift+D` | Convert datetime to timestamp |

## Extension Settings

Configure the extension via VS Code settings (`Cmd+,` or `Ctrl+,`):

### `my-timestamp.timezone`
**Type:** String dropdown
**Default:** `"local"`
**Options:** 30+ timezones (local, UTC, Asia/Shanghai, America/New_York, etc.)
**Description:** Timezone to use for timestamp conversion

### `my-timestamp.showTimezoneLabel`
**Type:** Boolean
**Default:** `false`
**Description:** Show timezone abbreviation in decorations (e.g., "CST", "PST")

**Example with label enabled:**
```
1609459200 → 2021-01-01 08:00:00 CST
```

### `my-timestamp.dateFormat`
**Type:** String
**Default:** `"yyyy-MM-dd HH:mm:ss"`
**Description:** Date format template for display

**Example custom format:**
```json
{
  "my-timestamp.dateFormat": "yyyy/MM/dd HH:mm:ss"
}
```
Result: `1609459200 → 2021/01/01 00:00:00`

### `my-timestamp.defaultFormat`
**Type:** String
**Default:** `"seconds"`
**Options:** `"seconds"`, `"milliseconds"`
**Description:** Default timestamp format when converting dates

### `my-timestamp.minYear` / `my-timestamp.maxYear`
**Type:** Number
**Default:** `1970` / `2100`
**Description:** Valid year range for timestamp detection

### `my-timestamp.decorationColor`
**Type:** String
**Default:** `"editorCodeLens.foreground"`
**Description:** Color for timestamp decorations

## Configuration Examples

### Example 1: Work with Chinese Team
```json
{
  "my-timestamp.timezone": "Asia/Shanghai",
  "my-timestamp.showTimezoneLabel": true
}
```
Result: `1609459200 → 2021-01-01 08:00:00 CST`

### Example 2: Work with US East Coast Team
```json
{
  "my-timestamp.timezone": "America/New_York",
  "my-timestamp.showTimezoneLabel": true
}
```
Result: `1609459200 → 2020-12-31 19:00:00 EST`

### Example 3: Always Use UTC
```json
{
  "my-timestamp.timezone": "UTC",
  "my-timestamp.showTimezoneLabel": false
}
```
Result: `1609459200 → 2021-01-01 00:00:00`

### Example 4: Millisecond Timestamps
```json
{
  "my-timestamp.defaultFormat": "milliseconds"
}
```
Converting `2024-01-15 14:30:00` gives: `1705327800000`

## Use Cases

### 1. Debugging Log Files
Quickly understand when events occurred:
```
[ERROR] Request failed at 1609459200
→ [ERROR] Request failed at 1609459200 → 2021-01-01 00:00:00
```

### 2. Database Queries
Verify timestamp values in SQL:
```sql
SELECT * FROM users WHERE created_at > 1609459200;
→ SELECT * FROM users WHERE created_at > 1609459200 → 2021-01-01 00:00:00;
```

### 3. API Development
Insert timestamps for testing:
```javascript
const testDate = // Press Cmd+Shift+D, enter "2024-01-15 14:30:00"
const testDate = 1705327800
```

### 4. International Teams
View timestamps in colleague's timezone:
```
Meeting scheduled: 1609459200
→ In Shanghai: 2021-01-01 08:00:00 CST
→ In New York: 2020-12-31 19:00:00 EST
```

## Commands

Access via Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

- **Timestamp: Show Readable Timestamps** - Toggle timestamp display
- **Timestamp: Convert DateTime to Timestamp** - Convert date to timestamp
- **Timestamp: Select Timezone** - Change timezone via dropdown

## Tips & Tricks

1. **Quick Toggle**: Use `Cmd+Shift+T` to quickly show/hide timestamps while reviewing code

2. **Copy Multiple Timestamps**:
   - Convert dates one by one with `Cmd+Shift+D`
   - Use the "Copy to Clipboard" button for each

3. **Different Timezones for Different Projects**:
   - Use Workspace settings for project-specific timezones
   - Go to: Settings → Workspace → Search "timestamp"

4. **Detect Only Valid Timestamps**:
   - Adjust `minYear` and `maxYear` to filter out false positives
   - Default range (1970-2100) works for most cases

## Requirements

- VS Code 1.106.0 or higher
- No external dependencies required!

## Known Issues

- Decorations automatically hide when you edit the document (by design)
- Very large files (>10000 lines) may have slight performance impact
- Timezone abbreviations depend on your system locale settings

## Release Notes

### 0.0.1 (Initial Release)

Features:
- Show readable timestamps with toggle support
- Convert datetime to timestamp
- Support for 30+ timezones
- Timezone dropdown selector
- Configurable date format
- Optional timezone labels
- Support for both second and millisecond timestamps

## Feedback & Support

Found a bug or have a feature request?
- [Report an issue](https://github.com/yourusername/my-timestamp/issues)
- [Submit a pull request](https://github.com/yourusername/my-timestamp/pulls)

## License

MIT

---

**Enjoy converting timestamps!** ⏰
