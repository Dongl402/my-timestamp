import * as vscode from 'vscode';

export interface TimestampConfig {
    timezone: string;
    showTimezoneLabel: boolean;
    dateFormat: string;
    minYear: number;
    maxYear: number;
    defaultFormat: 'seconds' | 'milliseconds';
    decorationColor: string;
}

/**
 * Get configuration from VS Code settings
 */
export function getConfig(): TimestampConfig {
    const config = vscode.workspace.getConfiguration('my-timestamp');
    return {
        timezone: config.get<string>('timezone', 'local'),
        showTimezoneLabel: config.get<boolean>('showTimezoneLabel', false),
        dateFormat: config.get<string>('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
        minYear: config.get<number>('minYear', 1970),
        maxYear: config.get<number>('maxYear', 2100),
        defaultFormat: config.get<'seconds' | 'milliseconds'>('defaultFormat', 'seconds'),
        decorationColor: config.get<string>('decorationColor', 'editorCodeLens.foreground')
    };
}

/**
 * Format a number with leading zeros
 */
function pad(num: number, size: number = 2): string {
    return num.toString().padStart(size, '0');
}

/**
 * Get date parts for a specific timezone using Intl API
 */
function getDatePartsInTimezone(date: Date, timezone: string): {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
} {
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
    const partsMap: Record<string, string> = {};
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
export function getTimezoneAbbreviation(date: Date, timezone: string): string {
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
    } catch (error) {
        console.error('Error getting timezone abbreviation:', error);
        return '';
    }
}

/**
 * Format date according to the template in specified timezone
 * Template: yyyy-MM-dd HH:mm:ss
 * Timezone: 'local', 'UTC', or IANA timezone name (e.g., 'Asia/Shanghai')
 */
export function formatDate(date: Date, template: string, timezone: string = 'local'): string {
    let year: number, month: number, day: number, hours: number, minutes: number, seconds: number;

    if (timezone === 'local') {
        // Use local timezone
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    } else if (timezone === 'UTC') {
        // Use UTC
        year = date.getUTCFullYear();
        month = date.getUTCMonth() + 1;
        day = date.getUTCDate();
        hours = date.getUTCHours();
        minutes = date.getUTCMinutes();
        seconds = date.getUTCSeconds();
    } else {
        // Use IANA timezone
        try {
            const parts = getDatePartsInTimezone(date, timezone);
            year = parts.year;
            month = parts.month;
            day = parts.day;
            hours = parts.hours;
            minutes = parts.minutes;
            seconds = parts.seconds;
        } catch (error) {
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
export function parseDateTime(dateTimeStr: string): Date | null {
    // Normalize separators
    const normalized = dateTimeStr.trim()
        .replace(/\//g, '-')  // Convert / to -
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
            const date = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
                parseInt(hours),
                parseInt(minutes),
                parseInt(seconds)
            );

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
export function isValidTimestamp(timestamp: number, config: TimestampConfig): boolean {
    // Convert to seconds if it's in milliseconds
    const timestampInSeconds = timestamp > 9999999999 ? Math.floor(timestamp / 1000) : timestamp;

    const date = new Date(timestampInSeconds * 1000);
    const year = date.getFullYear();

    return year >= config.minYear && year <= config.maxYear;
}

/**
 * Validate datetime string format
 */
export function validateDateTimeInput(input: string): string | undefined {
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
