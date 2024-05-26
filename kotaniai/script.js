var map = L.map('mapid').setView([35.122,132.587], 15);

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
        　　　"基本図": baseMap[2],
        };
        var overCtl = { // オーバーレイマップ切替ボタンの定義
            "Google最新写真": overMap[0],
            "Esri航空写真": overMap[1],
            "NTT航空写真": overMap[5],
            "地理院最新写真": overMap[2],
            "1970年頃写真": overMap[3],
            "1960年頃写真": overMap[4],
        };

        var gjson = {
            "小谷合": gj,
        }

        baseMap[0].addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
        L.control.layers(null, gjson, {collapsed: false}).addTo(map);// GeoJson
        L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替
