# Change Log

All notable changes to the "Quick Timestamps" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.0] - 2026-03-18

### Changed (Breaking)

- **Command IDs renamed**: `my-timestamp.showTimestamps` → `quick-timestamp.showTimestamps`, `my-timestamp.convertToTimestamp` → `quick-timestamp.convertToTimestamp`, `my-timestamp.selectTimezone` → `quick-timestamp.selectTimezone`
- **Configuration keys renamed**: All `my-timestamp.*` settings are now `quick-timestamp.*` (e.g., `quick-timestamp.timezone`, `quick-timestamp.dateFormat`, etc.)

### Added

- **Automatic config migration**: Old `my-timestamp.*` settings are automatically migrated to `quick-timestamp.*` on upgrade
- **Legacy command aliases**: Old `my-timestamp.*` commands still work for backward compatibility with existing keybindings
- **Upgrade notification**: One-time notification on upgrade with link to changelog

## [Unreleased]

## [0.0.4]

- Initial release
