modules.define('dropdown-box', ['throttle'], function(provide, Throttle) {
    function getElemPosition(nodeList, elemList){
        var elemPosition = 0,
        elemCurrent = elemList.previousElementSibling;

        for(var i = 0; i < nodeList.length; i++){
            if(elemCurrent){
                elemCurrent = elemCurrent.previousElementSibling;
                elemPosition += 1
            }else{
                break;
            }
        }
        return elemPosition;
    }

    function renderNotification(notificationContent){
        var notificationNode = document.createElement('div');
        notificationNode.className = 'service__notification';
        notificationNode.innerHTML = notificationContent;

        notificationNode.querySelector('.service__bnt').addEventListener('click', function(e) {
            e.preventDefault();

            $(function() {
                $('#modal-call').bPopup({
                    modalClose: true
                });
            });
        });

        return notificationNode;
    }

    function getNotificationPosition(elemPosition, elemsInRow, countNodeList){
        // выводить notification нужно после последнего эле-та в строке.
        var param = (elemPosition % elemsInRow) ? (elemPosition % elemsInRow) : elemsInRow;
        var notPosition = elemPosition + (elemsInRow - param) - 1;

        return notPosition < countNodeList ? notPosition : countNodeList - 1;
    }

    function getCoutInRow(windowWidth){
        if(windowWidth < 1023 && windowWidth >= 668){
            return 2;
        }else if(windowWidth < 667){
            return 1;
        }else{
            return 3;
        }
    }

    function removeNotification(){
        var notification = document.querySelector('.service__notification');

        if (notification != null) {
            notification.remove();
        }
    }

    function dropdownBox(nodeList, item, countRow){
        if(item.className.indexOf('service__item_active') > -1){
            removeNotification();

            item.classList.remove('service__item_active');
        }else{
            removeNotification();

            if(document.querySelector('.service__item.service__item_active')){
                document.querySelector('.service__item.service__item_active').classList.remove('service__item_active');
            }

            item.classList.add('service__item_active');

            var itemPosition = getElemPosition(nodeList, item),
            notificationPosition = getNotificationPosition(itemPosition, countRow, ya_dropdown.countList),
            notification = renderNotification(item.querySelector('.service__info').innerHTML),
            parentList = nodeList[0].offsetParent;

            // Добавить до - соседнего справа элемента, если соседа справа нет - добавить в конец
            parentList.insertBefore(notification, nodeList.item(notificationPosition).nextElementSibling);
        }
    }

    var ya_dropdown = {};
    ya_dropdown.listItems = document.querySelectorAll('.service__item');
    ya_dropdown.countList = ya_dropdown.listItems.length;
    ya_dropdown.windowWidth = window.innerWidth;

    ya_dropdown.listItems.forEach(function(item, index){
        item.addEventListener('click', function(e){
            dropdownBox(ya_dropdown.listItems, item, getCoutInRow(window.innerWidth));
        });
    });

    Throttle(window.addEventListener('resize', function(e){
        if(ya_dropdown.windowWidth != window.innerWidth){
            removeNotification();

            if(document.querySelector('.service__item.service__item_active')){
                document.querySelector('.service__item.service__item_active').classList.remove('service__item_active');
            }

            ya_dropdown.windowWidth = window.innerWidth;
        }
    }), 300);

    provide();
});


modules.require('dropdown-box', function(provide) {

});
