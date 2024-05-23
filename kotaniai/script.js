var map = L.map('mapid').setView([35.122,132.587], 15);

        var baseMap = [ // ベースマップの定義
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
                minZoom: 5, maxZoom: 18
            }),
            L.tileLayer("https://cm02.mapion.co.jp/m2/tile/{z}/{x}/{y}.png?usr=atlas_org&amp;v=2.6", {
                minZoom: 6, maxZoom: 19
            }),
        ];

        var overMap = [ // オーバーレイマップの定義
            L.tileLayer("https://ariill-design.jp/xyz/kihon/{z}/{x}/{y}.png", {
                minZoom: 16, maxZoom: 19
            }),
            L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
                minZoom: 2, maxZoom: 19
            }),
            L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
                minZoom: 2, maxZoom: 18
            }),
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg", {
                minZoom: 2, maxZoom: 18
            }),
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg", {
                minZoom: 10, maxZoom: 17
            }),
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png", {
                minZoom: 2, maxZoom: 17
            }),
            L.tileLayer("https://mars.navitime.co.jp/mars/tile/v1/satellite/256/{z}/{y}/{x}", {
                minZoom: 2, maxZoom: 19
            }),
        ];


        var gj = L.geoJson(kotaniai, {
            style: function (feature) {
                return { fillColor: "#00f", color: "#f00", weight: 3, opacity: 0.6, fillOpacity: 0.05, };
            },
            onEachFeature: function (j, layer) {
                let p = j.properties;
                if (p) {
                    let name = p.name, desc = p.description;
                    let popup = "<h3>" + name + "</h3>" ;
                    layer.bindPopup(popup);
                }
            }
        });
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
        };

        var gjson = {
            "小谷合": gj,
        }

        baseMap[0].addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
        L.control.layers(null, gjson, {collapsed: false}).addTo(map);// GeoJson
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



        // add location control to global name space for testing only
        // on a production site, omit the "lc = "!
        lc = L.control
            .locate({
            })
            .addTo(map);