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

## Notes
Considering the rather small scale of this project, I think that using jQuery might be rather overkill. I'm going to treat this version as a bit of a mockup, and then when I'm finished I'll throw together a cleaner version with pure js and improved css.

As an aside, I'd like to apologize for the structure of this monster. I haven't really worked with node or anything like this before, and I don't know if I should be separating things into their own files or just leaving it in this homogenous state. I'll try to get around to cleaning it up in the rewrite.
