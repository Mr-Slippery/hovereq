const vscode = require('vscode');
const reqs_json = require('./reqs.json');

const req_docs = {};
for (var r in reqs_json) {
    req_docs[r] = require(reqs_json[r]);
}

const filetypes = require('./filetypes.json');
languages = filetypes["languages"];

function activate(context) {
    let disposable = vscode.commands.registerCommand('hovereq', () => {
        vscode.window.showInformationMessage("Hovering Requirements are active!");
    });
    context.subscriptions.push(disposable);
    for (i in languages) {
        vscode.languages.registerHoverProvider(languages[i], {
            provideHover(document, position, _token) {
                const range = document.getWordRangeAtPosition(position);
                const word = document.getText(range);
                for (var regex in req_docs) {
                    if (word.match(regex)) {
                        const doc = req_docs[regex];
                        if (word in doc) {
                            return new vscode.Hover({
                                language: "English",
                                value: doc[word]
                            });
                        }  
                    }    
                }
            }
        });
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
