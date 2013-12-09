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

})();

