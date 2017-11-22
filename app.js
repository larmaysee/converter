'use strict';
//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
const {
    app,
    BrowserWindow,
} = require('electron');
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname);

let win;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd   Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


function createWin() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        backgroundColor: '#212121',
        frame: false,
        show: false,
        icon: path.join(__dirname, './public/icons/png/icon.png')
    });

    // win.webContents.openDevTools();

    win.once('ready-to-show', () => {
        win.show();
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/views/convert.html'),
        protocol: 'file:',
        slashes: true
    }));


    // for external link
    // 
    win.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
}

// Emitted when the window is closed.
app.on('closed', function() {
    win = null;
});

//electron app ready 
app.on('ready', createWin);