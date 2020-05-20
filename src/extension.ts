"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const isWindows = process.platform === 'win32';
const lineDelimiter = isWindows ? '\r\n' : '\n';
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('copyRelativePathPosix', (arg1, arg2) => {
        let resources;
        if (Array.isArray(arg2)) {
            resources = arg2;
        }
        else if (arg1) {
            resources = [arg1];
        }
        else {
            if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri) {
                resources = [vscode.window.activeTextEditor.document.uri];
            }
        }
        if (resources) {
            const relativePaths = [];
            for (const resource of resources) {
                const relativePath = vscode.workspace.asRelativePath(resource, false);
                if (relativePath) {
                    relativePaths.push(isWindows ? relativePath.replace(/\\/g, '/') : relativePath);
                }
            }
            if (relativePaths.length > 0) {
                vscode.env.clipboard.writeText(relativePaths.join(lineDelimiter));
            }
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('copyPathPosix', (arg1, arg2) => {
        let resources;
        if (Array.isArray(arg2)) {
            resources = arg2;
        }
        else if (arg1) {
            resources = [arg1];
        }
        else {
            if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri) {
                resources = [vscode.window.activeTextEditor.document.uri];
            }
        }
        if (resources) {
            const paths = [];
            for (const resource of resources) {
                const path = resource.fsPath;
                if (path) {
                    paths.push(isWindows ? path.replace(/\\/g, '/').replace(/\w{1}:/g, '') : path);
                }
            }
            if (paths.length > 0) {
                vscode.env.clipboard.writeText(paths.join(lineDelimiter));
            }
        }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
