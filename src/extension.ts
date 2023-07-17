import * as vscode from 'vscode';

const getValueFromJSONPath = (json: object, path: string) => {
  const pathArray = path.split('.');
  let current: any = json;

  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
};

const findLineForJSONPath = (jsonString: string, path: string) => {
	try {
		const json = JSON.parse(jsonString);
		const hasPathOnJSON = !!getValueFromJSONPath(json, path);
	
		if (!hasPathOnJSON) {
			return null;
		}
	} catch {
		vscode.window.showErrorMessage('The current file is not a valid JSON');
		return null;
	}

	const pathArray = path.split('.');
	let currentPath = pathArray.shift();

	const lines = jsonString.split('\r\n');
  let lineNumber = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes(`"${currentPath}":`)) {
			lineNumber = i;
			currentPath = pathArray.shift();

			if (!currentPath) {
				break;
			}
    }
  }

  return lineNumber;
};

const validatePath = (text: string) => {
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
};

const searchPathOnCurrentJSON = async () => {
	const filterString = await vscode.window.showInputBox({
		placeHolder: 'Enter the path to search',
		validateInput: validatePath
	});

	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage('No active editor found');
		return;
	}

	const currentFileIsJSON = editor?.document.fileName.endsWith('.json');

	if (!currentFileIsJSON) {
		vscode.window.showErrorMessage('The current file is not a JSON');
		return;
	}

	const currentFileContent = editor?.document.getText()!;
	const line = findLineForJSONPath(currentFileContent, filterString!);

	if (line === null) {
		vscode.window.showErrorMessage('The path was not found on the current JSON');
		return;
	}

	const lineContent = currentFileContent.split('\r\n')[line];
	const lastPathKey = filterString?.split('.').pop();

	const pathPosition = lineContent?.indexOf(lastPathKey!);
	const startPosition = new vscode.Position(line, pathPosition);
	const endPosition = new vscode.Position(line, pathPosition + lastPathKey!.length);

	vscode.window.showTextDocument(editor.document.uri, {
		preview: false,
		selection: new vscode.Range(startPosition, endPosition)
	});
};

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('json-searcher.searchPathOnCurrentJSON', searchPathOnCurrentJSON);

	context.subscriptions.push(disposable);
};

export const deactivate = () => {};
