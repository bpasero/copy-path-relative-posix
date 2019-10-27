import * as vscode from 'vscode';

const isWindows = process.platform === 'win32';
const lineDelimiter = isWindows ? '\r\n' : '\n';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('copyRelativePathPosix', (arg1, arg2) => {
		let resources: vscode.Uri[] | undefined;
		if (Array.isArray(arg2)) {
			resources = arg2;
		} else if (arg1) {
			resources = [arg1];
		}

		if (resources) {
			const relativePaths: string[] = [];
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
}

export function deactivate() { }
