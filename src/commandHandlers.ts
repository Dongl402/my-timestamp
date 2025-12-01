import * as vscode from 'vscode';
import { getConfig } from './utils';
import { showTimestampDecorations, clearDecorations, areDecorationsVisible } from './decorationManager';

/**
 * Handle the show timestamps command (with toggle)
 */
export function handleShowTimestamps(): void {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    // Toggle: If decorations are visible, hide them; otherwise show them
    if (areDecorationsVisible()) {
        clearDecorations();
        vscode.window.showInformationMessage('Timestamp decorations hidden');
    } else {
        const config = getConfig();
        showTimestampDecorations(editor, config);
        vscode.window.showInformationMessage('Timestamp decorations shown');
    }
}
