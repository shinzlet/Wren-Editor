const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  let win = new BrowserWindow(
    { width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 450,
      webPreferences: {plugins: true}}
  )

  win.loadURL(`file://${__dirname}/index.html`)
})
