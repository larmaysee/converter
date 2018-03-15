'use strict';
const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });

function getInstallerConfig() {
    console.log('creating windows installer');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'release-builds');

    return Promise.resolve({
        appDirectory: path.join(outPath, 'converter-win32-ia32/'),
        authors: 'Lar May See',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'converter.exe',
        setupExe: 'converter.exe',
        setupIcon: path.join(rootPath, 'public', 'icons', 'win', 'icon.ico')
    });
}