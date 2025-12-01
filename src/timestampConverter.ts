import { formatDate, getConfig, getTimezoneAbbreviation, TimestampConfig } from './utils';

/**
 * Convert timestamp to readable date string
 */
export function timestampToDate(timestamp: number, config?: TimestampConfig): string {
    const cfg = config || getConfig();

    // Determine if it's milliseconds (13 digits) or seconds (10 digits)
    const isMilliseconds = timestamp > 9999999999;
    const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);

    const formatted = formatDate(date, cfg.dateFormat, cfg.timezone);

    // Add timezone label if configured
    if (cfg.showTimezoneLabel) {
        const tzAbbr = getTimezoneAbbreviation(date, cfg.timezone);
        return tzAbbr ? `${formatted} ${tzAbbr}` : formatted;
    }

    return formatted;
}

/**
 * Convert date to timestamp
 */
export function dateToTimestamp(date: Date, format: 'seconds' | 'milliseconds'): number {
    const timestamp = date.getTime();
    return format === 'seconds' ? Math.floor(timestamp / 1000) : timestamp;
}
