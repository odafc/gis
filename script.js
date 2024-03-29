var map = L.map('mapid').setView([35.1904, 132.5015], 13);

        var baseMap = [ // ベースマップの定義
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
                minZoom: 2, maxZoom: 18
            }),

        ];

        var overMap = [ // オーバーレイマップの定義
            L.tileLayer("https://ariill-design.jp/xyz/kihon/{z}/{x}/{y}.png", {
                minZoom: 2, maxZoom: 19
            }),
            L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                minZoom: 2, maxZoom: 18
            }),
            L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
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
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png", {
                minZoom: 5, maxZoom: 16
            }),
        ];


        var gj = L.geoJson(polygonUmap, {
            style: function (feature) {
                return { fillColor: "#00f", color: "#00f", weight: 3, opacity: 0.6, fillOpacity: 0.1, };
            },
            onEachFeature: function (j, layer) {
                let p = j.properties;
                if (p) {
                    let name = p.name, desc = p.description;
                    let popup = "<h3>" + name + "</h3>" + "<p>" + desc + "</p>";
                    layer.bindPopup(popup);
                }
            }
        });

        var oda = L.geoJson(nameUoda, {
            style: function (feature) {
                return { fillColor: "#fff", color: "#f00", weight: 3, opacity: 0.6, fillOpacity: 0, };
            },
            onEachFeature: function (j, layer) {
                let p = j.properties;
                if (p) {
                    let name = p.name, desc = p.description;
                    let popup = "<h3>" + name + "</h3>";
                    layer.bindPopup(popup);
                }
            }
        });


        var baseCtl = { // ベースマップ切替ボタンの定義
            "地理院標準地図": baseMap[0],
        };

        var overCtl = { // オーバーレイマップ切替ボタンの定義
            "基本図": overMap[0],
            "Google地図": overMap[1],
            "Google最新写真": overMap[2],
            "地理院最新写真": overMap[3],
            "1970年頃写真": overMap[4],
            "1960年頃写真": overMap[5],
            "任意のポリゴン": gj,
            "字等別境界": oda,
        };



        baseMap[0].addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
        L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替



        // add location control to global name space for testing only
        // on a production site, omit the "lc = "!
        lc = L.control
            .locate({
            })
            .addTo(map);
