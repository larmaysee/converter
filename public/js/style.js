'use strict';
var menu = document.getElementsByClassName('menu-bars')[0];
var sidebar = document.getElementById('sidebar-part');
var flexContent = document.getElementsByClassName('content-flex')[0];


var toggleSidebar = function(id, flexCont) {
    if (id.style.display === 'block' || id.style.display === '') {
        id.style.display = 'none';
        flexCont.classList.add('row-direction');
    } else {
        id.style.display = 'block';
        flexCont.classList.remove('row-direction');
    }
};

menu.addEventListener('click', function() {
    toggleSidebar(sidebar, flexContent);
});