        var baseMap = [ // ベースマップの定義
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
                minZoom: 5, maxZoom: 18
            }),
            L.tileLayer("https://cm02.mapion.co.jp/m2/tile/{z}/{x}/{y}.png?usr=atlas_org&amp;v=2.6", {
                minZoom: 6, maxZoom: 19
            }),
         　　L.tileLayer("https://ariill-design.jp/xyz/kihon/{z}/{x}/{y}.png", {
                minZoom: 16, maxZoom: 19
            }),
        ];

        var overMap = [ // オーバーレイマップの定義
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
