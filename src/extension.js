const vscode = require('vscode');
const xpathToCss = require('xpath-to-css'); // Import the conversion library

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Register a new command that converts XPath to CSS
    let disposable = vscode.commands.registerCommand('extension.convertXPathToCSS', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection);

            if (selectedText) {
                try {
                    const cssSelector = xpathToCss(selectedText);
                    vscode.env.clipboard.writeText(cssSelector).then(() => {
                    vscode.window.showInformationMessage(`CSS Selector copied to clipboard: ${cssSelector}`);
                }, (err) => {
                    vscode.window.showErrorMessage(`Failed to copy CSS Selector to clipboard: ${err.message}`);
                });
                } catch (error) {
                    vscode.window.showErrorMessage('Invalid XPath!');
                }
            } else {
                vscode.window.showWarningMessage('No XPath selected!');
            }
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
