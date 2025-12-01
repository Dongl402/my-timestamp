import * as vscode from 'vscode';
import { TimestampConfig } from './utils';
import { timestampToDate } from './timestampConverter';
import { findTimestamps } from './timestampDetector';

let decorationType: vscode.TextEditorDecorationType | undefined;
let isDecorationsVisible: boolean = false;

/**
 * Create decoration type with styling
 */
function createDecorationType(config: TimestampConfig): vscode.TextEditorDecorationType {
    return vscode.window.createTextEditorDecorationType({
        after: {
            margin: '0 0 0 1em',
            fontStyle: 'italic'
        }
    });
}

/**
 * Show timestamp decorations in the active editor
 */
export function showTimestampDecorations(editor: vscode.TextEditor, config: TimestampConfig): void {
    // Clear previous decorations
    clearDecorations();

    // Create new decoration type
    decorationType = createDecorationType(config);

    // Find all timestamps
    const matches = findTimestamps(editor.document, config);

    // Create decorations
    const decorations: vscode.DecorationOptions[] = matches.map(match => {
        const dateStr = timestampToDate(match.timestamp, config);

        return {
            range: match.range,
            renderOptions: {
                after: {
                    contentText: ` → ${dateStr}`,
                    color: new vscode.ThemeColor(config.decorationColor),
                    opacity: '0.7'
                }
            }
        };
    });

    // Apply decorations
    editor.setDecorations(decorationType, decorations);
    isDecorationsVisible = true;
}

/**
 * Clear all decorations
 */
export function clearDecorations(): void {
    if (decorationType) {
        decorationType.dispose();
        decorationType = undefined;
    }
    isDecorationsVisible = false;
}

/**
 * Check if decorations are currently visible
 */
export function areDecorationsVisible(): boolean {
    return isDecorationsVisible;
}

/**
 * Setup listener to clear decorations on document change
 */
export function setupDecorationClearListener(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(() => {
            clearDecorations();
        })
    );
}
