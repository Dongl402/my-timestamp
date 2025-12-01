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
exports.showTimestampDecorations = showTimestampDecorations;
exports.clearDecorations = clearDecorations;
exports.areDecorationsVisible = areDecorationsVisible;
exports.setupDecorationClearListener = setupDecorationClearListener;
const vscode = __importStar(require("vscode"));
const timestampConverter_1 = require("./timestampConverter");
const timestampDetector_1 = require("./timestampDetector");
let decorationType;
let isDecorationsVisible = false;
/**
 * Create decoration type with styling
 */
function createDecorationType(config) {
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
function showTimestampDecorations(editor, config) {
    // Clear previous decorations
    clearDecorations();
    // Create new decoration type
    decorationType = createDecorationType(config);
    // Find all timestamps
    const matches = (0, timestampDetector_1.findTimestamps)(editor.document, config);
    // Create decorations
    const decorations = matches.map(match => {
        const dateStr = (0, timestampConverter_1.timestampToDate)(match.timestamp, config);
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
function clearDecorations() {
    if (decorationType) {
        decorationType.dispose();
        decorationType = undefined;
    }
    isDecorationsVisible = false;
}
/**
 * Check if decorations are currently visible
 */
function areDecorationsVisible() {
    return isDecorationsVisible;
}
/**
 * Setup listener to clear decorations on document change
 */
function setupDecorationClearListener(context) {
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(() => {
        clearDecorations();
    }));
}
//# sourceMappingURL=decorationManager.js.map