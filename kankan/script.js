var map = L.map('mapid').setView([35.122672 , 132.586513], 16);

var gj = L.geoJson(kankan, {
    style: function (feature) {
        return { fillColor: "#00f", color: "#f00", weight: 3, opacity: 0.6, fillOpacity: 0.05, };
    },
    onEachFeature: function (j, layer) {
        let p = j.properties;
        // if (p) {
        //     let name = p.name, desc = p.name2;
        //     let popup = "<h3>" + name + "</h3>" + "<p>" + desc + "</p>";
        //     layer.bindPopup(popup);
        // }
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
    "地理院最新写真": overMap[2],
    "1970年頃写真": overMap[3],
    "1960年頃写真": overMap[4],
};

var gjson = {
    "カンカン谷": gj,
}

baseMap[0].addTo(map);
L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
L.control.layers(null, gjson, { collapsed: false }).addTo(map);// GeoJson
L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替

// add location control to global name space for testing only
// on a production site, omit the "lc = "!
lc = L.control
    .locate({
    })
    .addTo(map);

