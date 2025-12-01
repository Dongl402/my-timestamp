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
exports.findTimestamps = findTimestamps;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
/**
 * Find all timestamps in the given document
 */
function findTimestamps(document, config) {
    const text = document.getText();
    const matches = [];
    // Pattern to match 10-digit (seconds) or 13-digit (milliseconds) timestamps
    // Using word boundaries to avoid matching parts of larger numbers
    const timestampPattern = /\b(\d{10}|\d{13})\b/g;
    let match;
    while ((match = timestampPattern.exec(text)) !== null) {
        const timestampStr = match[1];
        const timestamp = parseInt(timestampStr, 10);
        // Validate timestamp is in reasonable range
        if ((0, utils_1.isValidTimestamp)(timestamp, config)) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + timestampStr.length);
            const range = new vscode.Range(startPos, endPos);
            matches.push({
                timestamp,
                range
            });
        }
    }
    return matches;
}
//# sourceMappingURL=timestampDetector.js.map