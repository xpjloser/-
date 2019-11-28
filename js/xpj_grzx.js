$(function() {
    var divs = document.querySelector('.danzi')
    var currents = divs.querySelectorAll('div');

    var flag = true;
    $(currents).click(function() {
        $(this).addClass('current').siblings().removeClass('current');
        if (flag) {
            $('.banner li').hide().siblings('.meto').show();
            flag = false;
        } else {
            $('.banner li').show();
            flag = true;
        }

    })

})