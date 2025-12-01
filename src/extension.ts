import * as vscode from 'vscode';
import { handleShowTimestamps } from './commandHandlers';
import { handleConvertToTimestamp } from './inputHandler';
import { setupDecorationClearListener, clearDecorations } from './decorationManager';
import { selectTimezone } from './timezoneSelector';

export function activate(context: vscode.ExtensionContext) {

	// Setup listener to clear decorations on document change
	setupDecorationClearListener(context);

	// Register command: Show readable timestamps
	const showTimestampsCommand = vscode.commands.registerCommand(
		'my-timestamp.showTimestamps',
		handleShowTimestamps
	);

	// Register command: Convert datetime to timestamp
	const convertToTimestampCommand = vscode.commands.registerCommand(
		'my-timestamp.convertToTimestamp',
		handleConvertToTimestamp
	);

	// Register command: Select timezone
	const selectTimezoneCommand = vscode.commands.registerCommand(
		'my-timestamp.selectTimezone',
		selectTimezone
	);

	context.subscriptions.push(
		showTimestampsCommand,
		convertToTimestampCommand,
		selectTimezoneCommand
	);
}

export function deactivate() {
	// Clear any remaining decorations
	clearDecorations();
}
