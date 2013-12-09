(function () {

    "use strict";

    var Navigation = window.Navigation = {};

    Navigation.showPage = function (name) {
        $('.' + name).css('display', 'block').siblings().css('display', 'none');
    };

    var Parties = window.Parties = {
        id: 0
    };

    Parties.remove = function (id) {
        console.log(id);
        $('div[data-id="' + id + '"]').remove();
    };

    Parties.removeWantToGift = function (id, otherId) {
        var element = $('div[data-id="' + id + '"] div[data-id="' + otherId + '"]');
        if (element.hasClass('noGift')) {
            element.removeClass('noGift');
        } else {
            element.addClass('noGift');
        }
    };

    Parties.removePartyDiv = function () {
        return $('<div />').addClass('remove').html('x');
    };

    Parties.wantToGiftDiv = function (id, otherId, name) {
        var me = this;
        return $('<div />', {
                'data-id': otherId,
                'class': 'wantToGift'
            }).html(name).click(function () { me.removeWantToGift(id, otherId); });
    };

    Parties.newOneDiv = function (id, name) {
        var me = this;
        var removeDiv = this.removePartyDiv().click(function () { me.remove(id); });
        return $('<div />', {
                'data-id': id,
                'data-name': name,
                'class': 'party'
            }).append($('<div />').html(name).addClass('name').append(removeDiv));
    };

    Parties.addParty = function (name) {
        name = name.trim();
        var me = this;
        if (name.length > 0) {
            var id = ++this.id;
            var element = this.newOneDiv(id, name).appendTo('.parties');
            console.log(element.data('id'));
            $('.party').each(function () {
                var otherId = $(this).data('id');
                var otherName = $(this).data('name');
                if (otherId != id) {
                    $(this).append(me.wantToGiftDiv(otherId, id, name));
                    element.append(me.wantToGiftDiv(id, otherId, otherName));
                }
            });
        }
    };

})();

jQuery.fn.center = function () {
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

$(window).load(function () {
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
    /*snow.run();*/
    Navigation.showPage('create');
    $('.createRaffle').click(function () {
        Navigation.showPage('create');
        $('.newOne .textField').focus();
    });

    var onresize = function () {
        $('.content').center();
    };

    $('.ok').click(function () {
        var input = $('.newOne .textField');
        Parties.addParty(input.val());
        onresize();
        input.val('');
        input.focus();
    });

    $('.newOne .textField').keypress(function(event) {
        // Enter
        if (event.charCode == 13) {
            $('.ok').click();
        }
    });

    $(window).resize(onresize);
    $('.content').resize(onresize);
    onresize();
});


