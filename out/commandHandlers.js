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
exports.handleShowTimestamps = handleShowTimestamps;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
const decorationManager_1 = require("./decorationManager");
/**
 * Handle the show timestamps command (with toggle)
 */
function handleShowTimestamps() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }
    // Toggle: If decorations are visible, hide them; otherwise show them
    if ((0, decorationManager_1.areDecorationsVisible)()) {
        (0, decorationManager_1.clearDecorations)();
        vscode.window.showInformationMessage('Timestamp decorations hidden');
    }
    else {
        const config = (0, utils_1.getConfig)();
        (0, decorationManager_1.showTimestampDecorations)(editor, config);
        vscode.window.showInformationMessage('Timestamp decorations shown');
    }
}
//# sourceMappingURL=commandHandlers.js.map