
# create-electron-react-app
## An opinionated command-line utility for creating an electron app using react

Builds apps using [electron-react-starter](https://github.com/kgroat/electron-react-starter) as a base.
[![CircleCI](https://circleci.com/gh/kgroat/electron-react-starter.svg?style=shield&circle-token=18b44433f089413275cb90569f4aee3fc1d4a2ba)](https://circleci.com/gh/kgroat/workflows/electron-react-starter)

### Usage
Option 1 -- Global installation

Install the CLI tool:
`npm i -g create-electron-react-app`

Run the tool:
`create-electron-react-app`

Option 2 -- Using `npx` (Requires NPM 5+)

Install and run the tool:
`npx create-electron-react-app`

### Features
#### Tooling
Generated applications will come with a configuration ready to be used with:
* [`react`](https://facebook.github.io/react/)
* [`redux`](http://redux.js.org/)
* [`typescript`](https://www.typescriptlang.org/)
* [`sass/scss`](http://sass-lang.com/)
* [`jest`](https://facebook.github.io/jest/)
* [`storybook`](https://storybook.js.org/)

#### 

### Prompts
You will be prompted for a few pieces of information:

`app name` (Required)
* This is stored in the generated `package.json` as the `"appName"` property.  It can be changed there at any time.
* In MacOS builds, it is the name of the `.app` package, the name of the app as it appears in the menu bar and Activity Monitor, and by default the title of the main window.
* In windows builds, it is the name of the `.exe` file, the name that appears in Task Manager, and by default the title of the main window.

`directory name` (Required)
* This is the name of the directory created that the app will be generated inside of.
* This can only consist of lowercase letters, numbers, dashes, and underscores.
* It is also used as the `"name"` property in the generated `package.json`

`app identifier` (Required)
* This is stored in the generated `package.json` as the `"identifier"` property.  It can be changed there at any time.
* In MacOS builds, this is used as the unique identifier for the package.
* In windows builds, this serves no purpose.

`description` (Optional)
* This is used as the `"description"` property in the generated `package.json`

`git repository` (Optional)
* This is used in the `"repository"`, `"bugs"`, and `"homepage"` properties of the generated `package.json`

`author` (Optional)
* This is used in the `"author"` property of the generated `package.json`

`lisence` (Optional)
* This is used in the `"lisence"` property of the generated `package.json`
