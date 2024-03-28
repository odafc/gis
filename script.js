let os;
if (
	navigator.userAgent.indexOf("iPhone") > 0 ||
	navigator.userAgent.indexOf("iPad") > 0 ||
	navigator.userAgent.indexOf("iPod") > 0
) {
	os = "iphone";
	console.log("iPhone");
} else if (navigator.userAgent.indexOf("Android") > 0) {
	os = "android";
	console.log("Android");
} else {
	os = "pc";
	console.log("PC");
}

document.querySelector("#os").value = os;

let map;
let human;

window.addEventListener("DOMContentLoaded", init);

if (os == "iphone") {
	window.addEventListener(
		"deviceorientation",
		detectDirection,
		true
	);
} else if (os == "android") {
	window.addEventListener(
		"deviceorientationabsolute",
		detectDirection,
		true
	);
}
// DOM初期化
function init() {
	// 初回に現在地緯度経度を取得
	navigator.geolocation.getCurrentPosition(
		initMap,
		err => {
			alert(err.message);
		},
		{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
	);
}

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
	// "任意のポリゴン": gj,
	"字等別境界": oda,
};




// Map初期化
function initMap(initPos) {
	// #mapidにOSMタイルマップをレンダリング
	map = L.map("mapid").setView(
		[initPos.coords.latitude, initPos.coords.longitude],
		17
	);

	baseMap[0].addTo(map);
	L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
	L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替




	// 現在地緯度経度を継続取得
	let watchId = navigator.geolocation.watchPosition(
		pos => {
			moveMapFollowingHuman(
				pos.coords.latitude,
				pos.coords.longitude,
				pos.coords.heading
			);
		},
		err => {
			window.alert(err.message);
		},
		{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
	);


}


// 現在地変更ハンドラ
function moveMapFollowingHuman(latitude, longitude, heading) {

	// 現在地circle描画を削除
	if (human) {
		map.removeLayer(human);
	}
	// 現在地circle描画
	human = L.circle([latitude, longitude], {
		color: "#fff",
		fillColor: "blue",
		fillOpacity: 1.0,
		radius: 10,
	}).addTo(map);
	human._path.id = "human";




	// 現在地を示すエレメントの画面位置座標を取得
	var clientRect = human._path.getBoundingClientRect();

	// 画面の左端から、要素の左端までの距離
	var x = clientRect.left;

	// 画面の上端から、要素の上端までの距離
	var y = clientRect.top;

	if (os == "iphone") {
		let beam = document.querySelector("#beam");
		let h = beam.clientHeight;
		let w = beam.clientWidth;
		beam.style.top = y - 40 + "px";
		beam.style.left = x - 30 + "px";
	} else {
		beam.style.display = "none";
		const iosbotton = document.querySelector(".iosb");
		iosbotton.style.display = "none";
	}
}


function detectDirection(e) {

	let degrees;
	// if (os == "iphone") {
		degrees = e.webkitCompassHeading;
	// } else {
	// 	degrees = compassHeading(alpha, beta, gamma);
	// }
	document.querySelector("#degree").value = degrees;


	let beam = document.querySelector("#beam");
	beam.style.transform = "rotate(" + degrees + "deg)";

	let iPhone = document.querySelector("#iPhone");
	iPhone.value = e.webkitCompassHeading;

	let accuracy = document.querySelector("#accuracy");
	accuracy.value = e.webkitCompassAccuracy;

}

// function compassHeading(alpha, beta, gamma) {
// 	var degtorad = Math.PI / 180; // Degree-to-Radian conversion

// 	var _x = beta ? beta * degtorad : 0; // beta value
// 	var _y = gamma ? gamma * degtorad : 0; // gamma value
// 	var _z = alpha ? alpha * degtorad : 0; // alpha value

// 	var cX = Math.cos(_x);
// 	var cY = Math.cos(_y);
// 	var cZ = Math.cos(_z);
// 	var sX = Math.sin(_x);
// 	var sY = Math.sin(_y);
// 	var sZ = Math.sin(_z);

// 	// Calculate Vx and Vy components
// 	var Vx = -cZ * sY - sZ * sX * cY;
// 	var Vy = -sZ * sY + cZ * sX * cY;

// 	// Calculate compass heading
// 	var compassHeading = Math.atan(Vx / Vy);

// 	// Convert compass heading to use whole unit circle
// 	if (Vy < 0) {
// 		compassHeading += Math.PI;
// 	} else if (Vx < 0) {
// 		compassHeading += 2 * Math.PI;
// 	}

// 	return compassHeading * (180 / Math.PI); // Compass Heading (in degrees)
// }

function permitGeolocation() {
	DeviceOrientationEvent.requestPermission()
		.then(response => {
			if (response === "granted") {
				window.addEventListener(
					"deviceorientation",
					detectDirection
				);
			}
		})
		.catch(console.error);
}
