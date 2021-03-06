
//дебаунс для правильного ресайза
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

//туггл для функций
jQuery.fn.clickToggle = function(a,b) {
    function cb(){ [b,a][this._tog^=1].call(this); }
    return this.on("click", cb);
};

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    });
}

//получаем случайное число от min  до max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//проверка на несколько классов
$.fn.hasAnyClass = function() {
    for (var i = 0; i < arguments.length; i++) {
        var classes = arguments[i].split(" ");
        for (var j = 0; j < classes.length; j++) {
            if (this.hasClass(classes[j])) {
                return true;
            }
        }
    }
    return false;
};


$(document).ready(function() {

    //определим девайс и ОС и добавим класс к <html/>
    var htmlTag = document.querySelector('html');
    htmlTag.className += (' ' + platform.name.toLowerCase() + ' ' + platform.os.family.toLowerCase());


    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage'],
        lazyLoading: false
    });



    $('.js-about').clickToggle(function() {
        $('.about').addClass('open');
    }, function() {
        $('.about').removeClass('open');
    });


    $('.js-modal').click(function() {
        var modalName = $(this).attr('data-call-modal');
        $('[data-modal=' + modalName + ']').addClass('open');
    });
    $('.js-modal-close').click(function() {
        var modalName = $(this).attr('data-close-modal');
        $('[data-modal=' + modalName + ']').removeClass('open');
    });


    var firstClick = false,
        video = $('video');
    $('[data-call-modal="video"]').click(function() {
        firstClick = true;
        video.mediaelementplayer({
            // features: [],
            success: function(player, node) {
                if(window.innerHeight > window.innerWidth){
                    $('.video-popup__turn').addClass('show');
                    setTimeout(function () {
                        player.play();
                        $('.video-popup__turn').removeClass('show');
                    }, 2000);
                } else player.play();

                player.addEventListener('ended', function(e){
                    setTimeout(function(){
                        $('[data-modal="video"]').removeClass('open');
                    }, 500);

                });
            }
        });

        if (firstClick = true) {
            video[0].player.play();
        }
    });
    $('[data-close-modal="video"]').click(function() {
        video[0].player.pause();
    });


});