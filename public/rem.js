!(function (e) {
    function t() {
        var t = n.clientWidth,
            r = '}';
        !navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) &&
            t > 1024 &&
            ((t = 640), (r = ';max-width:' + t + 'px;margin-right:auto!important;margin-left:auto!important;}')),
            (e.rem = t / 10),
            /ZTE U930_TD/.test(navigator.userAgent) && (e.rem = 1.13 * e.rem),
            /M351 /.test(navigator.userAgent) && (e.rem = e.rem / 1.05),
            (i.innerHTML = 'html{font-size:' + e.rem + 'px!important;}body{font-size:' + 12 * (t / 320) + 'px' + r);
    }
    {
        var n = document.documentElement,
            i = document.createElement('style');
        n.clientWidth;
    }
    n.firstElementChild.appendChild(i),
        e.addEventListener(
            'resize',
            function () {
                t();
            },
            !1
        ),
        e.addEventListener(
            'pageshow',
            function (e) {
                e.persisted && t();
            },
            !1
        ),
        t();
})(window);
