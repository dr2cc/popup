//ОСНОВЫ метод querySelectorAll возвращает все элементы соответствующие указанному CSS селектору 
//query.. - "cnfnbxyfz" коллекция, информация о DOM дереве на момент вызова метода

//селектор любой! К примеру- поиск по тегу первого уровня вложенности
//document.querySelectorAll('.selector>li')
const popupLinks = document.querySelectorAll('.popup-link');
//ОСНОВЫ метод querySelector возвращает первый элемент соответствующий указанному CSS селектору
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index< popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e){
            //ОСНОВЫ Здесь получаем содержимое атрибутов href и удаляем в них #
            //get.. - "живая" коллекция, актуальная информация о DOM дереве (на текущий момент)
            const popupName = popupLink.getAttribute('href').replace('#','')
            //ОСНОВЫ Метод getElementById возвращает элемент найденный по Id
            //Подобных несколько, к примеру- document.getElementsByTagName
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index< popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function (e){
            //ОСНОВЫ Метод closest ищет ближайшего предка указанного селектора
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive,false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');  
        curentPopup.addEventListener("click",function (e){
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive,doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    //if (lockPadding.length>0) {
        for (let index=0; index < lockPadding.length;index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
            }
    //}
    body.style.paddingRight = lockPaddingValue;
    //Здесь добавляем класс lock в css. Так лочим скрол
    body.classList.add('lock');
        
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock () {
    setTimeout(function() {
        if  (lockPadding.length>0) { 
            for (let index=0; index < lockPadding.length;index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);
        
        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
}

document.addEventListener('keydown',function(e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});