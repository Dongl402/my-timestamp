import * as vscode from 'vscode';
import { isValidTimestamp, TimestampConfig } from './utils';

export interface TimestampMatch {
    timestamp: number;
    range: vscode.Range;
}

/**
 * Find all timestamps in the given document
 */
export function findTimestamps(document: vscode.TextDocument, config: TimestampConfig): TimestampMatch[] {
    const text = document.getText();
    const matches: TimestampMatch[] = [];

    // Pattern to match 10-digit (seconds) or 13-digit (milliseconds) timestamps
    // Using word boundaries to avoid matching parts of larger numbers
    const timestampPattern = /\b(\d{10}|\d{13})\b/g;

    let match;
    while ((match = timestampPattern.exec(text)) !== null) {
        const timestampStr = match[1];
        const timestamp = parseInt(timestampStr, 10);

        // Validate timestamp is in reasonable range
        if (isValidTimestamp(timestamp, config)) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + timestampStr.length);
            const range = new vscode.Range(startPos, endPos);

            matches.push({
                timestamp,
                range
            });
        }
    }

    return matches;
}
