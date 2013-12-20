(function () {

    "use strict";

    var Snow = window.Snow = function (element, imgs, density, speed, speed_range) {
        this.element = element;
        this.imgs = imgs;
        this.density = density;
        this.speed = speed;
        this.speed_range = speed_range;
    };

    Snow.prototype.animate = function (element) {
        var me = this;
        element.animate(
            {
                'top': Math.max($(me.element).height(), $(window).height()) - 30,
                'opacity': 0.5,
                'left': "+=" + ((Math.random() > 0.5 ? -1 : 1) * Math.random() * 100)
            }, me.speed + ((Math.random() > 0.5 ? -1 : 1) * Math.random() * me.speed_range), function() {
                $(this).remove();
        });
    };

    Snow.prototype.reanimate = function () {
        var me = this;
        $('.snow').each(function () {
            if (parseInt($(this).css('top').replace(/\D\./g,'')) + 30 > $(window).height()) {
                $(this).remove();
            }
        });
        $('.snow').each(function () {
            $(this).stop();
            me.animate($(this));
        });
    };

    Snow.prototype.run = function () {
        var me = this;
        setInterval(function () {
            var width = $(me.element).width();
            var left = Math.floor(Math.random() * width);
            var img = $('<div/>')
                .addClass('snow')
                .css('background-image', "url('" + me.imgs[Math.floor(Math.random() * me.imgs.length)] + "')")
                .css('left', left + 'px')
                .appendTo($(me.element));
            me.animate(img);
        }, this.density);
    };

})();

