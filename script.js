var map = L.map('mapid').setView([35.192, 132.499], 15);

        var baseCtl = { // ベースマップ切替ボタンの定義
            "地理院標準地図": baseMap[0],
           　"マピオン": baseMap[1],
        };
        var overCtl = { // オーバーレイマップ切替ボタンの定義
            "基本図": overMap[0],
            "Google最新写真": overMap[1],
            "Esri航空写真": overMap[2],
            "NTT航空写真": overMap[6],
            "地理院最新写真": overMap[3],
            "1970年頃写真": overMap[4],
            "1960年頃写真": overMap[5],
            // "字等別境界": oda,
        };


        baseMap[0].addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
        L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替


    var options = {
            latitudeText: "緯度",
            longitudeText: "経度",
            precision: 5,
            position: 'bottomright'
        }
        var cCtrl = new L.Control.Coordinates(options);
        cCtrl.addTo(map);
        map.on('click', function (e) {
            cCtrl.setCoordinates(e);
        });

        (function () {
            function b() {
                var a = window,
                    c = e;
                if (a.addEventListener) a.addEventListener("load", c, !1);
                else if (a.attachEvent) a.attachEvent("onload", c);
                else {
                    var d = a.onload;
                    a.onload = function () {
                        c.call(this);
                        d && d.call(this)
                    }
                }
            };
            var f = !1;

            function e() {
                if (!f) {
                    f = !0;
                    for (var a = document.getElementsByClassName("psa_add_styles"), c = 0, d; d =
                        a[c]; ++c)
                        if ("NOSCRIPT" == d.nodeName) {
                            var k = document.createElement("div");
                            k.innerHTML = d.textContent;
                            document.body.appendChild(k)
                        }
                }
            }

            function g() {
                var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                    null;
                a ? a(function () {
                    window.setTimeout(e, 0)
                }) : b()
            }
            var h = ["pagespeed", "CriticalCssLoader", "Run"],
                l = this;
            h[0] in l || !l.execScript || l.execScript("var " + h[0]);
            for (var m; h.length && (m = h.shift());) h.length || void 0 === g ? l[m] ? l =
                l[m] : l = l[m] = {} : l[m] = g;
        })();
        pagespeed.CriticalCssLoader.Run();
