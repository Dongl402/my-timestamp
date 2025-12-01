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
exports.handleConvertToTimestamp = handleConvertToTimestamp;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
const timestampConverter_1 = require("./timestampConverter");
/**
 * Handle the convert datetime to timestamp command
 */
async function handleConvertToTimestamp() {
    const config = (0, utils_1.getConfig)();
    // Show input box
    const input = await vscode.window.showInputBox({
        prompt: 'Enter datetime to convert to timestamp',
        placeHolder: 'yyyy-MM-dd HH:mm:ss (e.g., 2024-01-15 14:30:00)',
        validateInput: utils_1.validateDateTimeInput
    });
    if (!input) {
        return; // User cancelled
    }
    // Parse the datetime
    const date = (0, utils_1.parseDateTime)(input);
    if (!date) {
        vscode.window.showErrorMessage('Failed to parse datetime');
        return;
    }
    // Convert to timestamp
    const timestamp = (0, timestampConverter_1.dateToTimestamp)(date, config.defaultFormat);
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
    const action = await vscode.window.showInformationMessage(`Timestamp inserted: ${timestamp}`, 'Copy to Clipboard');
    if (action === 'Copy to Clipboard') {
        await vscode.env.clipboard.writeText(timestamp.toString());
        vscode.window.showInformationMessage('Timestamp copied to clipboard');
    }
}
//# sourceMappingURL=inputHandler.js.map