"use strict";
//handle setupevents as quickly as possible
const setupEvents = require("./installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const Splashscreen = require("@trodi/electron-splashscreen");
require("electron-reload")(__dirname);

let win, splash;

function createWin() {
    win = new BrowserWindow({
        width: 1024,
        height: 786,
        show: false,
        backgroundColor: "#212121",
        frame: false,
        icon: path.join(__dirname, "./public/icons/png/icon.png")
    });

    /**create splash window */
    splash = new BrowserWindow({
        width: 350,
        height: 300,
        backgroundColor: "#212121",
        frame: false,
        alwaysOnTop: true,
        icon: path.join(__dirname, "./public/icons/png/icon.png")
    });

    splash.loadURL(
        url.format({
            pathname: path.join(__dirname, "/views/splash.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // win.webContents.openDevTools();
    win.once("ready-to-show", () => {
        splash.destroy();
        win.show();
    });
    
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "/views/convert.html"),
            protocol: "file:",
            slashes: true
        })
    );
    
    // for external link
    //
    win.webContents.on("new-window", function(e, url) {
        e.preventDefault();
        require("electron").shell.openExternal(url);
    });
}

// Quit when all windows are closed.
app.on("window-all-closed", function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd   Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Emitted when the window is closed.
app.on("closed", function() {
    win = null;
});

//electron app ready
app.on("ready", createWin);
