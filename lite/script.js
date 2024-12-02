var map = L.map('mapid').setView([ 35.19115 ,132.50092], 15);

var baseMap = [ // ベースマップの定義
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
        minZoom: 5, maxZoom: 18
    }),
    L.tileLayer("https://d3a9yephh38bqr.cloudfront.net/EPSG:3857:{z}/{x}/{y}", {
        minZoom: 6, maxZoom: 19
    }),
    L.tileLayer("https://ariill-design.jp/xyz/kihon/{z}/{x}/{y}.png", {
        minZoom: 16, maxZoom: 19
    }),
];

var baseCtl = { // ベースマップ切替ボタンの定義
    "地理院標準地図": baseMap[0],
    "MapFan": baseMap[1],
    "基本図": baseMap[2],
};



baseMap[2].addTo(map);
L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
L.control.layers(baseCtl).addTo(map); 


// add location control to global name space for testing only
// on a production site, omit the "lc = "!
lc = L.control
    .locate({
    })
    .addTo(map);

