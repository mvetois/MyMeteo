# MyMeteo - Chrome extension

This is the Chrome extention for the MyMeteo project.

⚠️ This project is compatible only with Chrome and Chrome based browser.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Installation of the dependencies

To install the dependencies, run the following command:

```bash
$> npm install
```

## Configuration of the extension

You need to configure the url of the backend server, you need to edit the first line of the file `/src/utils.ts` with your backend url.

## Starting the developpement environment

```bash
$> npm start
```

## Build and load the chrome extention

```bash
$> npm run build
```
Next, we will need to tell Chrome where to find our new extension. You can type this in a new Chrome Tab for opening the extensions menu [chrome://extensions](chrome://extensions).

Then, you can click on the "Load unpacked extension..." button and select the `/build` folder.

You can now load the extension in Chrome and enjoy it!

# Project Members
- [Matthieu VETOIS](https://github.com/mvetois)