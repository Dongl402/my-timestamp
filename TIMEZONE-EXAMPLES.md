# Timezone Configuration Examples

The extension now supports any IANA timezone! Here are common examples:

## Common Timezones

### Asia
- `Asia/Shanghai` - China Standard Time (CST)
- `Asia/Tokyo` - Japan Standard Time (JST)
- `Asia/Hong_Kong` - Hong Kong Time (HKT)
- `Asia/Singapore` - Singapore Time (SGT)
- `Asia/Seoul` - Korea Standard Time (KST)
- `Asia/Kolkata` - India Standard Time (IST)
- `Asia/Dubai` - Gulf Standard Time (GST)

### Americas
- `America/New_York` - Eastern Time (ET)
- `America/Chicago` - Central Time (CT)
- `America/Denver` - Mountain Time (MT)
- `America/Los_Angeles` - Pacific Time (PT)
- `America/Toronto` - Eastern Time (Canada)
- `America/Sao_Paulo` - Brasília Time (BRT)

### Europe
- `Europe/London` - Greenwich Mean Time (GMT) / British Summer Time (BST)
- `Europe/Paris` - Central European Time (CET)
- `Europe/Berlin` - Central European Time (CET)
- `Europe/Moscow` - Moscow Standard Time (MSK)
- `Europe/Istanbul` - Turkey Time (TRT)

### Pacific
- `Australia/Sydney` - Australian Eastern Time (AEDT/AEST)
- `Pacific/Auckland` - New Zealand Time (NZDT/NZST)

### Special Values
- `local` - Your system's local timezone
- `UTC` - Coordinated Universal Time

## Configuration in VS Code

Open Settings (Cmd+,) and search for "timestamp":

### Example 1: Show timestamps in Shanghai time
```json
{
  "my-timestamp.timezone": "Asia/Shanghai",
  "my-timestamp.showTimezoneLabel": true
}
```
Result: `1609459200 → 2021-01-01 08:00:00 CST`

### Example 2: Show timestamps in New York time
```json
{
  "my-timestamp.timezone": "America/New_York",
  "my-timestamp.showTimezoneLabel": true
}
```
Result: `1609459200 → 2020-12-31 19:00:00 EST`

### Example 3: Show timestamps in UTC without timezone label
```json
{
  "my-timestamp.timezone": "UTC",
  "my-timestamp.showTimezoneLabel": false
}
```
Result: `1609459200 → 2021-01-01 00:00:00`

### Example 4: Use local timezone (default)
```json
{
  "my-timestamp.timezone": "local",
  "my-timestamp.showTimezoneLabel": false
}
```
Result: Uses your computer's timezone

## Finding Your Timezone

Full list of IANA timezone names:
https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

Most timezones follow the pattern: `Continent/City`
