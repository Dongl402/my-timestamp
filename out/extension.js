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
function activate(context) {
    // Setup listener to clear decorations on document change
    (0, decorationManager_1.setupDecorationClearListener)(context);
    // Register command: Show readable timestamps
    const showTimestampsCommand = vscode.commands.registerCommand('my-timestamp.showTimestamps', commandHandlers_1.handleShowTimestamps);
    // Register command: Convert datetime to timestamp
    const convertToTimestampCommand = vscode.commands.registerCommand('my-timestamp.convertToTimestamp', inputHandler_1.handleConvertToTimestamp);
    // Register command: Select timezone
    const selectTimezoneCommand = vscode.commands.registerCommand('my-timestamp.selectTimezone', timezoneSelector_1.selectTimezone);
    context.subscriptions.push(showTimestampsCommand, convertToTimestampCommand, selectTimezoneCommand);
}
function deactivate() {
    // Clear any remaining decorations
    (0, decorationManager_1.clearDecorations)();
}
//# sourceMappingURL=extension.js.map