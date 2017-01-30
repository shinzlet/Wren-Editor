# Wren Editor
A simple Electron-based app for converting a bi-color 5x5 sprite into a single number to be parsed by a TI-84 CE in a seperate program. (I'll put it up when I get the chance.)
## Building
To build the Wren Editor, cd into whatever folder you want, and execute
```
git clone https://github.com/shinzlet/Wren-Editor.git
cd Wren-Editor
npm install
```
If everything has gone correctly, all that's left is to test (or build) the app. If you just want to get the app open, and tinker with source and still have access to all the dev tools, run
```
npm run start
```
Another useful script included is a sass watch script, which automates css compilation. To activate it, simply run
```
npm run watch-css
```
in a new tab.

If you want to build the app, run
```
npm run build-osx
```
Note that at the moment, I've only thrown together a mac build routine. I'm going to add windows and linux when I get the chance.
