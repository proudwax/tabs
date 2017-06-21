'use strict';

modules.define('tabs', function(provide) {

    var _this = this,
        tabs = document.querySelector('.' + this.name),
        tabsNavItems = tabs.querySelectorAll('.' + this.name + '__nav-item'),
        tabsContents = tabs.querySelectorAll('.' + this.name + '__content'),
        tabsNav = [],
        tabsContainer = [];

    function inited () {
        tabsNavItems.forEach(function (item, i) {
            (item.href == '') && (item.href = '#' + _this.name + '-' + i);

            // Добавляем в массив по ID значение Node
            tabsNav[item.href.split('#')[1]] = item;

            item.addEventListener('click', function (e) {
                e.preventDefault();
                setActive(e);
            });
        });

        tabsContents.forEach(function (item, i) {
            (item.id == '') && (item.id = _this.name + '-' + i);

            // Добавляем в массив по ID значение Node
            tabsContainer[item.id] = item;
        });

        defaultActive();
    }

    function defaultActive () {
        var idActive = window.location.hash.split('#')[1];

        tabsNav[idActive] ? tabsNav[idActive].classList.add(_this.name + '__nav-item_active') : tabsNavItems[0].classList.add(_this.name + '__nav-item_active');
        tabsContainer[idActive] ? tabsContainer[idActive].classList.add(_this.name + '__content_active') : tabsContents[0].classList.add(_this.name + '__content_active');
    }

    function setActive (e) {
        var idActive = e.target.hash.split('#')[1];

        tabsNavItems.forEach(function (item, i) {
            item.classList.remove(_this.name + '__nav-item_active');
        });

        tabsContents.forEach(function (item, i) {
            item.classList.remove(_this.name + '__content_active');
        });

        !!tabsNav[idActive] && tabsNav[idActive].classList.add(_this.name + '__nav-item_active');
        !!tabsContainer[idActive] && tabsContainer[idActive].classList.add(_this.name + '__content_active');
    }

    provide(
        inited()
    );
});

modules.require('tabs', function(tabs) {
    tabs;
});
