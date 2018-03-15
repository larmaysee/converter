"use strict";
const { remote } = require("electron");
const knayi = require("knayi-myscript");
const rabbit = require("../rules/rabbit");

var query = function(selector) {
	return document.querySelector(selector);
};

var inputBox = query("#textarea1");
var outputBox = query("#textarea2");
var input = query("#input");
var output = query("#output");
var allbox = query('.box');

/**input event listener */
input.addEventListener("change", function() {
	var i = this.options[this.selectedIndex].value;
	allbox.removeAttribute('placeholder');
	if (i == "zg") {
		setSelectedIndex(output, i);
		inputBox.classList.remove("mm");
		inputBox.classList.add("zg");
		outputBox.classList.remove("zg");
		outputBox.classList.add("mm");
		inputBox.setAttribute('placeholder', 'ျမန္မာစာသည္တို႔စာ');
		outputBox.setAttribute('placeholder', 'မြန်မာစာသည်တို့စာ');

	} else if (i == "uni") {
		setSelectedIndex(output, i);
		inputBox.classList.remove("zg");
		inputBox.classList.add("mm");
		outputBox.classList.remove("mm");
		outputBox.classList.add("zg");
		inputBox.setAttribute('placeholder', 'မြန်မာစာသည်တို့စာ');
		outputBox.setAttribute('placeholder', 'ျမန္မာစာသည္တို႔စာ');
	}
});

/**ouput event listener */
output.addEventListener("change", function () {
	var i = this.options[this.selectedIndex].value;
	outputBox.removeAttribute('placeholder');
	if (i == 'zg') {
		outputBox.classList.remove("mm");
		outputBox.classList.add("zg");
		outputBox.setAttribute('placeholder', 'ျမန္မာစာသည္တို႔စာ');
	} else if (i == 'uni') {
		outputBox.classList.add("mm");
		outputBox.classList.remove("zg");
		outputBox.setAttribute('placeholder', 'မြန်မာစာသည်တို့စာ');
	}
});

/**convert text */
inputBox.addEventListener('input', function (e) {
	var source = input.options[input.selectedIndex].value;
	if (source == 'zg') {
		outputBox.value = knayi.fontConvert(this.value,'unicode','zawgyi');
	}else if (source == 'uni') {
		outputBox.value = knayi.fontConvert(this.value, 'zawgyi', 'unicode');
	}

	if (this.value =='') {
		outputBox.value = '';
	}
});


/** autoselect snippet */
function setSelectedIndex(s, valsearch) {
	// Loop through all the items in drop down list
	for (var i = 0; i < s.options.length; i++) {
		if (s.options[i].value != valsearch) {
			s.options[i].selected = true;
			break;
		}
	}
	return;
}

/**-----------------electron function----------------------- */
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
