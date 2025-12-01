import * as vscode from 'vscode';
import { parseDateTime, validateDateTimeInput, getConfig } from './utils';
import { dateToTimestamp } from './timestampConverter';

/**
 * Handle the convert datetime to timestamp command
 */
export async function handleConvertToTimestamp(): Promise<void> {
    const config = getConfig();

    // Show input box
    const input = await vscode.window.showInputBox({
        prompt: 'Enter datetime to convert to timestamp',
        placeHolder: 'yyyy-MM-dd HH:mm:ss (e.g., 2024-01-15 14:30:00)',
        validateInput: validateDateTimeInput
    });

    if (!input) {
        return; // User cancelled
    }

    // Parse the datetime
    const date = parseDateTime(input);
    if (!date) {
        vscode.window.showErrorMessage('Failed to parse datetime');
        return;
    }

    // Convert to timestamp
    const timestamp = dateToTimestamp(date, config.defaultFormat);

    // Get active editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    // Insert at cursor position
    await editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, timestamp.toString());
    });

    // Show notification with copy option
    const action = await vscode.window.showInformationMessage(
        `Timestamp inserted: ${timestamp}`,
        'Copy to Clipboard'
    );

    if (action === 'Copy to Clipboard') {
        await vscode.env.clipboard.writeText(timestamp.toString());
        vscode.window.showInformationMessage('Timestamp copied to clipboard');
    }
}
