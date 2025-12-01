"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampToDate = timestampToDate;
exports.dateToTimestamp = dateToTimestamp;
const utils_1 = require("./utils");
/**
 * Convert timestamp to readable date string
 */
function timestampToDate(timestamp, config) {
    const cfg = config || (0, utils_1.getConfig)();
    // Determine if it's milliseconds (13 digits) or seconds (10 digits)
    const isMilliseconds = timestamp > 9999999999;
    const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);
    const formatted = (0, utils_1.formatDate)(date, cfg.dateFormat, cfg.timezone);
    // Add timezone label if configured
    if (cfg.showTimezoneLabel) {
        const tzAbbr = (0, utils_1.getTimezoneAbbreviation)(date, cfg.timezone);
        return tzAbbr ? `${formatted} ${tzAbbr}` : formatted;
    }
    return formatted;
}
/**
 * Convert date to timestamp
 */
function dateToTimestamp(date, format) {
    const timestamp = date.getTime();
    return format === 'seconds' ? Math.floor(timestamp / 1000) : timestamp;
}
//# sourceMappingURL=timestampConverter.js.map