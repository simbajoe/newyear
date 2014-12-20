(function () {

    "use strict";

    var Navigation = window.Navigation = {};

    var onresize = window.onresize = function () {
        $('.wrapper').center();
        $('body').height($('.wrapper').outerHeight());
    };

    Navigation.showPage = function (name) {
        $('.' + name).css('display', 'block').siblings().css('display', 'none');
        onresize();
    };

    var Parties = window.Parties = {
        id: 0
    };

    Parties.remove = function (id) {
        $('div[data-id="' + id + '"]').remove();
        onresize();
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

    Parties.getList = function (id) {
        var list = [];
        $('.party[data-id="' + id + '"]').children('.wantToGift:not(.noGift)').each( function () {
            var id = $(this).data('id');
            list.push(id);
        });
        return shuffle(list);
    };

    Parties.getIds = function () {
        var ids = [];
        $('.party').each(function () {
            ids.push($(this).data('id'));
        });
        return shuffle(ids);
    };

    Parties.makeRuffle = function () {
        var giftFromIds = this.getIds();
        if (!giftFromIds.length) {
            return null;
        }
        var giftToIds = [];
        var lists = [];

        var n = giftFromIds.length;
        var ps = [];
        for (var i = 0; i < n; i++) {
            ps.push(0);
            lists.push(this.getList(giftFromIds[i]));
        }

        var i = 0;
        while (true) {
            var list = $.grep(lists[i], function (id, j) {
                return $.inArray(id, giftToIds) < 0;
            });
            if (ps[i] >= list.length) {
                if (i == 0) {
                    return null;
                }
                ps[i] = 0;
                giftToIds.pop();
                i--;
                continue;
            }
            giftToIds.push(list[ps[i]]);
            ps[i]++;
            i++;
            if (i == n) {
                return [giftFromIds, giftToIds];
            }
        }
    };

    var Raffle = window.Raffle = {
        results: null,
        i: 0
    };

    Raffle.init = function (results) {
        this.results = results;
        this.i = 0;
        $('.next').unbind('click');
        $('.who').unbind('click');
        this.next();
    };

    Raffle.next = function () {
        console.log(this.i, this.results[0]);
        $('.raffle p').hide();
        if (this.i >= this.results[0].length) {
            $('.newyear').show();
            return;
        }
        var me = this;
        var giftFrom = $('.party[data-id="' + this.results[0][this.i] + '"]').data('name');
        var giftTo = $('.party[data-id="' + this.results[1][this.i] + '"]').data('name');
        $('.giftFrom .name').html(giftFrom);
        $('.giftTo .name').html(giftTo);
        $('.giftFrom').show();
        $('.who').show();
        $('.who').click(function () {
            $('.giftTo').show();
            $('.next').show();
            $('.who').unbind('click');
            $('.next').click(function () {
                $('.next').unbind('click');
                me.i++;
                me.next();
            });
        });
    };

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var changeLanguage = window.changeLanguage = function (lang) {
        $('.lang:not(.' + lang + ')').hide();
        $('.lang.' + lang).show();
        onresize();
    };

})();

jQuery.fn.center = function () {
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2)) + "px");
    /*this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2)) + "px");*/
    return this;
}

$(window).load(function () {
    var snow = new Snow('body', [
        'img/snow/1.png',
        'img/snow/2.png',
        'img/snow/3.png',
        'img/snow/4.png',
        'img/snow/5.png',
        'img/snow/6.png',
        'img/snow/7.png',
        'img/snow/8.png',
        'img/snow/9.png',
        'img/snow/10.png',
        'img/snow/11.png',
        'img/snow/12.png',
        'img/snow/13.png',
        'img/snow/14.png',
        'img/snow/15.png'
    ], 400, 20000, 10000);

    Navigation.showPage('main');
    /*Navigation.showPage('create');*/
    /*Parties.addParty('Denis');*/
    /*Parties.addParty('Lena');*/
    /*Parties.addParty('Vadim');*/
    /*Parties.addParty('Kate');*/
    /*Parties.addParty('Ivan');*/
    $('.createRaffle').click(function () {
        Navigation.showPage('create');
        onresize();
        $('.newOne .textField').focus();
    });

    $('.runRaffle').click(function () {
        var results = Parties.makeRuffle();
        if (!results) {
            $('.notice').show();
            onresize();
            return;
        }
        $('.notice').hide();
        Navigation.showPage('raffle');
        snow.reanimate();
        Raffle.init(results);
        onresize();
    });

    $('.ok').click(function () {
        var input = $('.newOne .textField');
        Parties.addParty(input.val());
        onresize();
        input.val('');
        input.focus();
    });

    $('.newOne .textField').keypress(function(event) {
        // Enter
        var code = event.charCode || event.keyCode;
        if (code == 13) {
            $('.ok').click();
        }
    });

    $(window).resize(onresize);
    $('.wrapper').resize(onresize);
    onresize();
    snow.run();
});


