import * as vscode from 'vscode';
import { handleShowTimestamps } from './commandHandlers';
import { handleConvertToTimestamp } from './inputHandler';
import { setupDecorationClearListener, clearDecorations } from './decorationManager';
import { selectTimezone } from './timezoneSelector';

const CURRENT_VERSION = '0.1.0';

/**
 * Migrate old "my-timestamp.*" config to "quick-timestamp.*"
 */
async function migrateOldConfig(): Promise<boolean> {
	const oldConfig = vscode.workspace.getConfiguration('my-timestamp');
	const newConfig = vscode.workspace.getConfiguration('quick-timestamp');

	const keys = ['timezone', 'showTimezoneLabel', 'defaultFormat', 'dateFormat',
		'minYear', 'maxYear', 'decorationColor'];

	let migrated = false;
	for (const key of keys) {
		const inspection = oldConfig.inspect(key);
		if (inspection?.globalValue !== undefined) {
			await newConfig.update(key, inspection.globalValue, vscode.ConfigurationTarget.Global);
			await oldConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
			migrated = true;
		}
		if (inspection?.workspaceValue !== undefined) {
			await newConfig.update(key, inspection.workspaceValue, vscode.ConfigurationTarget.Workspace);
			await oldConfig.update(key, undefined, vscode.ConfigurationTarget.Workspace);
			migrated = true;
		}
	}
	return migrated;
}

export async function activate(context: vscode.ExtensionContext) {

	// Migrate old config on activation
	await migrateOldConfig();

	// Show version upgrade notification
	const lastVersion = context.globalState.get<string>('lastVersion');
	if (lastVersion && lastVersion !== CURRENT_VERSION) {
		const action = await vscode.window.showInformationMessage(
			'Quick Timestamps: Settings have been renamed from "my-timestamp.*" to "quick-timestamp.*". Your settings have been migrated automatically.',
			'View Changelog'
		);
		if (action === 'View Changelog') {
			vscode.env.openExternal(vscode.Uri.parse('https://github.com/Dongl402/my-timestamp/blob/main/CHANGELOG.md'));
		}
	}
	context.globalState.update('lastVersion', CURRENT_VERSION);

	// Setup listener to clear decorations on document change
	setupDecorationClearListener(context);

	// Register commands with new IDs
	const showTimestampsCommand = vscode.commands.registerCommand(
		'quick-timestamp.showTimestamps',
		handleShowTimestamps
	);

	const convertToTimestampCommand = vscode.commands.registerCommand(
		'quick-timestamp.convertToTimestamp',
		handleConvertToTimestamp
	);

	const selectTimezoneCommand = vscode.commands.registerCommand(
		'quick-timestamp.selectTimezone',
		selectTimezone
	);

	// Register old command aliases for backward compatibility
	const legacyShowTimestamps = vscode.commands.registerCommand(
		'my-timestamp.showTimestamps',
		handleShowTimestamps
	);

	const legacyConvertToTimestamp = vscode.commands.registerCommand(
		'my-timestamp.convertToTimestamp',
		handleConvertToTimestamp
	);

	const legacySelectTimezone = vscode.commands.registerCommand(
		'my-timestamp.selectTimezone',
		selectTimezone
	);

	context.subscriptions.push(
		showTimestampsCommand,
		convertToTimestampCommand,
		selectTimezoneCommand,
		legacyShowTimestamps,
		legacyConvertToTimestamp,
		legacySelectTimezone
	);
}

export function deactivate() {
	// Clear any remaining decorations
	clearDecorations();
}
