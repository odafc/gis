// KML ファイルの URL を指定します。をロードします。
var kmlUrl = "https://odafc.github.io/ar/test.kml";
// Google Maps API のキーを指定します。
var apiKey = "AIzaSyBSQVrCAwF4Ca8khoLJ9atY7UYghkJNdVQ";
// Google Maps API をロードします。
function loadScript() {
    var script = document.createElement("script");
    script.src= "https://maps.googleapis.com/maps/api/js?key="+ apiKey + "&callback=initMap";
    document.body.appendChild(script);
  }
  // Google Maps を初期化します。
  function initMap() {
    // 地図のオプションを設定します。
    var mapOptions = {
      zoom: 15,
      center: {lat: 35.681236, lng: 139.767125}, 
      // 東京駅を中心にします。
      mapTypeId: "roadmap"};
  // 地図を作成します。
  var map = newgoogle.maps.Map(document.getElementById("map"), mapOptions);
  // KML レイヤーを作成します。
  var kmlLayer = newgoogle.maps.KmlLayer({
      url: kmlUrl,
      map: map,
      preserveViewport: true
      // KML ファイルのビューポートを維持します。
    });
  // KML レイヤーの読み込みが完了したら、AR シーンを作成します。
  kmlLayer.addListener("defaultviewport_changed", function () {
      createARScene(kmlLayer.getDefaultViewport());
    });
  }
  // AR シーンを作成します。
  function createARScene(viewport) {
    // A-Frame のシーンを取得します。
    var scene = document.querySelector("a-scene");
  // カメラの位置を取得します。
  var camera = document.querySelector("a-camera");
    var cameraPos = camera.getAttribute("position");
  // KML レイヤーの中心座標を取得します。
  var center = viewport.getCenter();
    var centerLat = center.lat();
    var centerLng = center.lng();
  // KML レイヤーの境界座標を取得します。
  var bounds = viewport;
    var northEast = bounds.getNorthEast();
    var southWest = bounds.getSouthWest();
    var northEastLat = northEast.lat();
    var northEastLng = northEast.lng();
    var southWestLat = southWest.lat();
    var southWestLng = southWest.lng();
  // KML ファイルをパースします。
  var parser = newDOMParser();
    var kml = parser.parseFromString(kmlUrl, "text/xml");
  // KML ファイルの中の Placemark 要素を取得します。
  var placemarks = kml.getElementsByTagName("Placemark");
  // Placemark 要素の数だけ繰り返します。
  for (var i = 0; i < placemarks.length; i++) {
      // Placemark 要素を取得します。
      var placemark = placemarks[i];
  // Placemark 要素の名前を取得します。
  var name = placemark.getElementsByTagName("name")[0].textContent;
  // Placemark 要素のスタイルを取得します。
  var style = placemark.getElementsByTagName("styleUrl")[0].textContent;
  // Placemark 要素のジオメトリを取得します。
  var geometry = placemark.getElementsByTagName("Point")[0] || placemark.getElementsByTagName("LineString")[0];
  // ジオメトリのタイプを判別します。
  
var type = geometry.tagName;
  // ジオメトリの座標を取得します。
  var coordinates = geometry.getElementsByTagName ("coordinates")[0].textContent;
  // 座標を配列に変換します。
  var coords = coordinates.split(" ");
  // 座標の数だけ繰り返します。
  for (var j = 0; j < coords.length; j++) {
        // 座標を取得します。
        var coord = coords[j];
  // 座標を緯度と経度に分割します。
  var latLng = coord.split(",");
        var lat = parseFloat(latLng[0]);
        var lng = parseFloat(latLng[1]);
  // 緯度と経度をメートルに変換します。
  var x = (lat - centerLat) * 111320* Math.cos(centerLat * Math.PI/ 180);
        var y = (lng - centerLng) * 111320;
  // メートルを A-Frame の座標系に変換します。
  var z = -x;
        var x = y;
  // カメラの位置を考慮して、オフセットを計算します。
        var offsetX = x - cameraPos.x;
        var offsetZ = z - cameraPos.z;
  // ジオメトリのタイプに応じて、AR オブジェクトを作成します。
        if (type == "Point") {
          // ポイントの場合は、球体を作成します。
          var sphere = document.createElement("a-sphere");
          sphere.setAttribute("position", {x: offsetX, y: 0, z: offsetZ});
          sphere.setAttribute("radius", 1);
          sphere.setAttribute("color", "red");
          sphere.setAttribute("gps-entity-place", {latitude: lat, longitude: lng});
          scene.appendChild(sphere);
        } elseif (type == "LineString") {
          // ラインの場合は、線を作成します。
          var line = document.createElement("a-entity");
          line.setAttribute("line", {start: {x: offsetX, y: 0, z: offsetZ}, end: {x: offsetX, y: 10, z: offsetZ}, color: "blue"});
          line.setAttribute("gps-entity-place", {latitude: lat, longitude: lng});
          scene.appendChild(line);
        }
      }
    }
  }
  // スクリプトをロードします。
  loadScript ();
  
