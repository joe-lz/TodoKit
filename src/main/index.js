'use strict'

import { app, BrowserWindow, Menu } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const electron = require('electron')
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width - 100,
    height: height - 100,
    useContentSize: true,
    titleBarStyle: 'hidden-inset'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // var template = [{
  //   label: 'Application',
  //   submenu: [
  //     { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
  //     { type: 'separator' },
  //     { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } }
  //   ]
  // }, {
  //   label: 'Edit',
  //   submenu: [
  //     { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
  //     { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
  //     { type: 'separator' },
  //     { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
  //     { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
  //     { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
  //     { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
  //   ]
  // }, {
  //   label: 'View',
  //   submenu: [
  //     {role: 'reload'}
  //   ]
  // }]
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
  console.log(Menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
