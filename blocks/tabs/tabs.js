'use strict';

modules.define('tabs', function(provide) {

    var _modulName = this.name,
        tabs,
        tabsNavItems,
        tabsContents,
        tabsNav = [],
        tabsContainer = [];

    function inited (className) {
        var parent = document.querySelector(className);

        tabs = parent.querySelector('.' + _modulName) || parent.parentNode.querySelector('.' + _modulName + className),
        tabsNavItems = tabs.querySelectorAll('.' + _modulName + '__nav-item'),
        tabsContents = tabs.querySelectorAll('.' + _modulName + '__content');

        tabsNavItems.forEach(function (item, i) {
            (item.href == '') && (item.href = '#' + _modulName + '-' + i);

            // Добавляем в массив по ID значение Node
            tabsNav[item.href.split('#')[1]] = item;

            item.addEventListener('click', function (e) {
                e.preventDefault();
                setActive(e);
            });
        });

        tabsContents.forEach(function (item, i) {
            (item.id == '') && (item.id = _modulName + '-' + i);

            // Добавляем в массив по ID значение Node
            tabsContainer[item.id] = item;
        });

        defaultActive();
    }

    function defaultActive () {
        var idActive = window.location.hash.split('#')[1];

        tabsNav[idActive] ? tabsNav[idActive].classList.add(_modulName + '__nav-item_active') : tabsNavItems[0].classList.add(_modulName + '__nav-item_active');
        tabsContainer[idActive] ? tabsContainer[idActive].classList.add(_modulName + '__content_active') : tabsContents[0].classList.add(_modulName + '__content_active');
    }

    function setActive (e) {
        var idActive = e.target.hash.split('#')[1];

        tabsNavItems.forEach(function (item, i) {
            item.classList.remove(_modulName + '__nav-item_active');
        });

        tabsContents.forEach(function (item, i) {
            item.classList.remove(_modulName + '__content_active');
        });

        !!tabsNav[idActive] && tabsNav[idActive].classList.add(_modulName + '__nav-item_active');
        !!tabsContainer[idActive] && tabsContainer[idActive].classList.add(_modulName + '__content_active');
    }

    provide(function (className) {
        inited(className);
    });
});

modules.require('tabs', function(tabs) {
    tabs('.tabs');
});
