'use strict';
const {
    remote
} = require('electron');
const knayi = require('knayi-myscript');
const rabbit = require('../rules/rabbit');

var box1 = document.getElementById('textarea1');
var box2 = document.getElementById('textarea2');
//textarea1 focus and  keyup
box2.classList.add('zg');
box1.addEventListener('input', function() {
    box2.classList.remove('zg');
    if (box1.value) {
        var output = knayi.fontDetect(box1.value);
        if (output === 'zawgyi') {
            box2.value = rabbit.zg2uni(box1.value);
            box1.classList.add('zg');
            box1.classList.remove('mm');
            box2.classList.remove('zg');
            box2.classList.add('mm');
        } else if (output === 'unicode') {
            box2.value = rabbit.uni2zg(box1.value);
            box1.classList.remove('zg');
            box1.classList.add('mm');
            box2.classList.remove('mm');
            box2.classList.add('zg');
        } else {
            box2.value = box1.value;
            box2.classList.remove('mm');
            box2.classList.remove('zg');
            box1.classList.remove('mm');
            box1.classList.remove('zg');
        }
    } else {
        box2.value = '';
        box2.classList.remove('mm');
        box2.classList.remove('zg');
        box1.classList.remove('mm');
        box1.classList.remove('zg');

        // for placeholder
        box2.classList.add('zg');
    }
});

function minimize() {
    var win = remote.getCurrentWindow();
    win.minimize();
}

function closeWindow() {
    var win = remote.getCurrentWindow();
    win.close();
}

function maximize() {
    var win = remote.getCurrentWindow();
    win.isMaximized() ? win.unmaximize() : win.maximize();
}