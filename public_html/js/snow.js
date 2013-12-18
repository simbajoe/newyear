(function () {

    "use strict";

    var Snow = window.Snow = function (element, imgs, density, speed) {
        this.element = element;
        this.imgs = imgs;
        this.density = density;
        this.speed = speed;
    };

    Snow.prototype.run = function () {
        var me = this;
        setInterval(function () {
            var width = $(me.element).width();
            var height = Math.max($(me.element).height(), $(window).height()) - 30;
            var left = Math.floor(30 + Math.random() * (width - 60));
            var leftTo = left + (Math.random() > 0.5 ? -1 : 1) * Math.random() * 100;
            if (leftTo > width - 30) {
                leftTo = width - 30;
            }
            if (leftTo < 30) {
                leftTo = 30;
            }
            var img = $('<div/>')
                .addClass('snow')
                .css('background-image', "url('" + me.imgs[Math.floor(Math.random() * me.imgs.length)] + "')")
                .css('left', left + 'px')
                .appendTo($(me.element))
                .animate(
                    {
                        'top': height,
                        'opacity': 0.5,
                        'left': leftTo
                    }, me.speed, function() {
                        $(this).remove();
                });
        }, this.density);
    };

})();

