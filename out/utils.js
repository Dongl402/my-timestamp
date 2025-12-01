"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
exports.getTimezoneAbbreviation = getTimezoneAbbreviation;
exports.formatDate = formatDate;
exports.parseDateTime = parseDateTime;
exports.isValidTimestamp = isValidTimestamp;
exports.validateDateTimeInput = validateDateTimeInput;
const vscode = __importStar(require("vscode"));
/**
 * Get configuration from VS Code settings
 */
function getConfig() {
    const config = vscode.workspace.getConfiguration('my-timestamp');
    return {
        timezone: config.get('timezone', 'local'),
        showTimezoneLabel: config.get('showTimezoneLabel', false),
        dateFormat: config.get('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
        minYear: config.get('minYear', 1970),
        maxYear: config.get('maxYear', 2100),
        defaultFormat: config.get('defaultFormat', 'seconds'),
        decorationColor: config.get('decorationColor', 'editorCodeLens.foreground')
    };
}
/**
 * Format a number with leading zeros
 */
function pad(num, size = 2) {
    return num.toString().padStart(size, '0');
}
/**
 * Get date parts for a specific timezone using Intl API
 */
function getDatePartsInTimezone(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const parts = formatter.formatToParts(date);
    const partsMap = {};
    parts.forEach(part => {
        partsMap[part.type] = part.value;
    });
    return {
        year: parseInt(partsMap.year, 10),
        month: parseInt(partsMap.month, 10),
        day: parseInt(partsMap.day, 10),
        hours: parseInt(partsMap.hour, 10),
        minutes: parseInt(partsMap.minute, 10),
        seconds: parseInt(partsMap.second, 10)
    };
}
/**
 * Get timezone abbreviation (e.g., PST, CST, JST)
 */
function getTimezoneAbbreviation(date, timezone) {
    try {
        let effectiveTimezone = timezone;
        // Handle special "local" timezone
        if (timezone === 'local') {
            // Use undefined to get the system's default timezone
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZoneName: 'short'
            });
            const parts = formatter.formatToParts(date);
            const timeZonePart = parts.find(part => part.type === 'timeZoneName');
            return timeZonePart ? timeZonePart.value : '';
        }
        // For UTC and IANA timezones
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: effectiveTimezone,
            timeZoneName: 'short'
        });
        const parts = formatter.formatToParts(date);
        const timeZonePart = parts.find(part => part.type === 'timeZoneName');
        return timeZonePart ? timeZonePart.value : '';
    }
    catch (error) {
        console.error('Error getting timezone abbreviation:', error);
        return '';
    }
}
/**
 * Format date according to the template in specified timezone
 * Template: yyyy-MM-dd HH:mm:ss
 * Timezone: 'local', 'UTC', or IANA timezone name (e.g., 'Asia/Shanghai')
 */
function formatDate(date, template, timezone = 'local') {
    let year, month, day, hours, minutes, seconds;
    if (timezone === 'local') {
        // Use local timezone
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    }
    else if (timezone === 'UTC') {
        // Use UTC
        year = date.getUTCFullYear();
        month = date.getUTCMonth() + 1;
        day = date.getUTCDate();
        hours = date.getUTCHours();
        minutes = date.getUTCMinutes();
        seconds = date.getUTCSeconds();
    }
    else {
        // Use IANA timezone
        try {
            const parts = getDatePartsInTimezone(date, timezone);
            year = parts.year;
            month = parts.month;
            day = parts.day;
            hours = parts.hours;
            minutes = parts.minutes;
            seconds = parts.seconds;
        }
        catch (error) {
            // Fallback to local if timezone is invalid
            console.error(`Invalid timezone: ${timezone}, falling back to local`);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            hours = date.getHours();
            minutes = date.getMinutes();
            seconds = date.getSeconds();
        }
    }
    return template
        .replace('yyyy', year.toString())
        .replace('MM', pad(month))
        .replace('dd', pad(day))
        .replace('HH', pad(hours))
        .replace('mm', pad(minutes))
        .replace('ss', pad(seconds));
}
/**
 * Parse datetime string to Date object
 * Supports formats like: yyyy-MM-dd HH:mm:ss, yyyy/MM/dd HH:mm:ss
 */
function parseDateTime(dateTimeStr) {
    // Normalize separators
    const normalized = dateTimeStr.trim()
        .replace(/\//g, '-') // Convert / to -
        .replace(/\s+/g, ' '); // Normalize spaces
    // Pattern: yyyy-MM-dd HH:mm:ss or yyyy-MM-dd HH:mm or yyyy-MM-dd
    const patterns = [
        /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/,
        /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})$/,
        /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    ];
    for (const pattern of patterns) {
        const match = normalized.match(pattern);
        if (match) {
            const [, year, month, day, hours = '0', minutes = '0', seconds = '0'] = match;
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds));
            // Validate the date is valid
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
    }
    return null;
}
/**
 * Validate if a timestamp is within the configured year range
 */
function isValidTimestamp(timestamp, config) {
    // Convert to seconds if it's in milliseconds
    const timestampInSeconds = timestamp > 9999999999 ? Math.floor(timestamp / 1000) : timestamp;
    const date = new Date(timestampInSeconds * 1000);
    const year = date.getFullYear();
    return year >= config.minYear && year <= config.maxYear;
}
/**
 * Validate datetime string format
 */
function validateDateTimeInput(input) {
    if (!input.trim()) {
        return 'Please enter a datetime';
    }
    const parsed = parseDateTime(input);
    if (!parsed) {
        return 'Invalid format. Use: yyyy-MM-dd HH:mm:ss';
    }
    const year = parsed.getFullYear();
    const config = getConfig();
    if (year < config.minYear || year > config.maxYear) {
        return `Year must be between ${config.minYear} and ${config.maxYear}`;
    }
    return undefined;
}
//# sourceMappingURL=utils.js.map