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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const commandHandlers_1 = require("./commandHandlers");
const inputHandler_1 = require("./inputHandler");
const decorationManager_1 = require("./decorationManager");
const timezoneSelector_1 = require("./timezoneSelector");
const CURRENT_VERSION = '0.1.0';
/**
 * Migrate old "my-timestamp.*" config to "quick-timestamp.*"
 */
async function migrateOldConfig() {
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
async function activate(context) {
    // Migrate old config on activation
    await migrateOldConfig();
    // Show version upgrade notification
    const lastVersion = context.globalState.get('lastVersion');
    if (lastVersion && lastVersion !== CURRENT_VERSION) {
        const action = await vscode.window.showInformationMessage('Quick Timestamps: Settings have been renamed from "my-timestamp.*" to "quick-timestamp.*". Your settings have been migrated automatically.', 'View Changelog');
        if (action === 'View Changelog') {
            vscode.env.openExternal(vscode.Uri.parse('https://github.com/Dongl402/my-timestamp/blob/main/CHANGELOG.md'));
        }
    }
    context.globalState.update('lastVersion', CURRENT_VERSION);
    // Setup listener to clear decorations on document change
    (0, decorationManager_1.setupDecorationClearListener)(context);
    // Register commands with new IDs
    const showTimestampsCommand = vscode.commands.registerCommand('quick-timestamp.showTimestamps', commandHandlers_1.handleShowTimestamps);
    const convertToTimestampCommand = vscode.commands.registerCommand('quick-timestamp.convertToTimestamp', inputHandler_1.handleConvertToTimestamp);
    const selectTimezoneCommand = vscode.commands.registerCommand('quick-timestamp.selectTimezone', timezoneSelector_1.selectTimezone);
    // Register old command aliases for backward compatibility
    const legacyShowTimestamps = vscode.commands.registerCommand('my-timestamp.showTimestamps', commandHandlers_1.handleShowTimestamps);
    const legacyConvertToTimestamp = vscode.commands.registerCommand('my-timestamp.convertToTimestamp', inputHandler_1.handleConvertToTimestamp);
    const legacySelectTimezone = vscode.commands.registerCommand('my-timestamp.selectTimezone', timezoneSelector_1.selectTimezone);
    context.subscriptions.push(showTimestampsCommand, convertToTimestampCommand, selectTimezoneCommand, legacyShowTimestamps, legacyConvertToTimestamp, legacySelectTimezone);
}
function deactivate() {
    // Clear any remaining decorations
    (0, decorationManager_1.clearDecorations)();
}
//# sourceMappingURL=extension.js.map