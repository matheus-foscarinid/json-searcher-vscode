import * as vscode from 'vscode';

const findLineForJSONPath = (jsonString: string, path: string) => {
  const lines = jsonString.split('\r\n');
  let currentLine = 0;
  let pathLine = null;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(path)) {
      pathLine = currentLine + 1; // O número da linha é incrementado em 1, pois começa em 1 em vez de 0
      break;
    }
    currentLine += 1;
  }

  return pathLine;
};

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('json-searcher.searchPathOnCurrentJSON', async () => {
		const filterString = await vscode.window.showInputBox({
			placeHolder: 'Enter the path to search',
			validateInput: (text: string) => {
				if (!text) {
					return 'Please enter a path';
				}

				// Validate if the path is valid
				const pathRegex = /^(\w+\.)*\w+$/;
				const isValidPath = pathRegex.test(text);

				if (!isValidPath) {
					return 'Please enter a valid path';
				}

				return '';
			}
		});

		// Get current current file content
		const editor = vscode.window.activeTextEditor;
		console.log(editor);

		// Get current file content as JSON
		const currentFileContent = editor?.document.getText();
		console.log(currentFileContent);

		const line = findLineForJSONPath(currentFileContent!, filterString!);
		console.log(line);
	});

	context.subscriptions.push(disposable);
};

export const deactivate = () => {};
