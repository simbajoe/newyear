(function () {

    "use strict";

    var Snow = function (element, imgs, density, speed) {
        this.element = element;
        this.imgs = imgs;
        this.density = density;
        this.speed = speed;
    };

    Snow.prototype.run = function () {
        var me = this;
        setInterval(function () {
            var width = $(me.element).width();
            var height = $(me.element).height();
            var img = $('<div/>')
                .addClass('snow')
                .css('background-image', "url('" + me.imgs[Math.floor(Math.random() * me.imgs.length)] + "')")
                .css('left', Math.floor(Math.random() * width) + 'px')
                .appendTo($(me.element))
                .animate(
                    {
                        'top': height,
                        'opacity': 0,
                        'left': "+=" + Math.random() * 100
                    }, me.speed, function() {
                        $(this).remove();
                });
        }, this.density);
    };

    $(document).ready(function() {
        var snow = new Snow('body', [
            '/img/snow/1.png',
            '/img/snow/2.png',
            '/img/snow/3.png',
            '/img/snow/4.png',
            '/img/snow/5.png',
            '/img/snow/6.png',
            '/img/snow/7.png',
            '/img/snow/8.png',
            '/img/snow/9.png',
            '/img/snow/10.png',
            '/img/snow/11.png',
            '/img/snow/12.png',
            '/img/snow/13.png',
            '/img/snow/14.png',
            '/img/snow/15.png'
        ], 400, 20000);
        snow.run();
    });
})();

