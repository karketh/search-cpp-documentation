"use strict";
/**
 * File: extension.ts
 * Created at: 03/30/19, 01:54:00
 * Created by: Kunal Gursahani
 * Modified by: Andrew Holmes
 * Last Modified: 05/20/2022 12:59AM
 * ------
 * Description:
 * C search documentation
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let currentDoc = undefined;
    context.subscriptions.push(vscode.commands.registerCommand('docs.start', () => {
        if (currentDoc) {
            currentDoc.reveal(vscode.ViewColumn.Beside);
            currentDoc.webview.html = getWebviewContent();
        }
        else {
            currentDoc = vscode.window.createWebviewPanel('docs', 'Search C Documentation', {
                viewColumn: vscode.ViewColumn.Beside,
                preserveFocus: false
            }, {
                enableScripts: true,
                enableFindWidget: true,
                retainContextWhenHidden: true
            });
            vscode.window.setStatusBarMessage("Search C reference");
            currentDoc.webview.html = getWebviewContent();
            currentDoc.onDidDispose(() => {
                currentDoc = undefined;
            }, null, context.subscriptions);
        }
    }));
}
exports.activate = activate;
function getWebviewContent() {
    const active = vscode.window.activeTextEditor;
    let site = 'https://devdocs.io/c/';
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C Documentation</title>
    <style>
        body, html
          {
            margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #fff;
          }
      </style>
</head>
<body>    
<iframe src="` + site + `" width="100%" height="100%" ></iframe>
</body>
</html>`;
}
//# sourceMappingURL=extension.js.map