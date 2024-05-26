var map = L.map('mapid').setView([ 35.02648 ,132.36583], 15);

        var gj = L.geoJson(kinbara, {
            style: function (feature) {
                return { fillColor: "#00f", color: "#f00", weight: 3, opacity: 0.6, fillOpacity: 0.05, };
            },
            onEachFeature: function (j, layer) {
                let p = j.properties;
                if (p) {
                    let name = p.name, desc = p.name2;
                    let popup = "<h3>" + name + "</h3>" + "<p>" + desc + "</p>";
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
            "金原山林": gj,
        }

        baseMap[0].addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
        L.control.layers(null, gjson, {collapsed: false}).addTo(map);// GeoJson
        L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替
