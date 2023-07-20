# JSON Searcher 🔎

JSON Searcher is a simple VSCode extension for searching within JSON files, particularly useful for locating data in i18n (internationalization) files. Easily find and navigate to specific data within your JSON files using the provided path. Simplify your JSON searching and streamline your i18n file management with JSON Searcher.

## Features 🚀

Using the extension command, search for a specific path within your JSON file. The extension will then navigate to the location of the path within the file. Example:

![Sample usage](https://github.com/matheus-foscarinid/json-searcher/assets/57161520/7a6b8067-167d-4b9c-b324-5eef96fd35db)

## Usage Instructions 📖

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Search for `Search path on current JSON`
3. Enter the path you want to search for
4. Press `Enter` to navigate to the path

## Motivation 🤔
I had a need for a simple extension that would allow me to quickly navigate to specific data within my JSON files. I was working on a project that required a lot of i18n files, and I needed a way to quickly navigate to specific data within those files. I also wanted to learn how to create a VSCode extension, so I decided to create this extension to meet my needs.

## Disclaimers ⚠️

This is a WIP extension. It is not yet available on the VSCode marketplace, and It is not yet fully functional.
While the extension is functional, it is not yet fully tested and may contain bugs. Use at your own risk.

Accepting contributions, feedback and sugestions.

## TODOs 📝

- [x] Add support for searching within a single file
- [x] Save last searched path
- [x] Release on VSCode marketplace
- [ ] Add a changelog
- [ ] Add the license
- [ ] Add right-click context menu option to search for path
- [ ] Add support to complex paths (e.g. `path[0].to[1].data`)
- [ ] Add support for searching within multiple files (maybe)
- [ ] Add support for searching within all files in a folder (maybe)

