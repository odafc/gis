// Leaflet用透過設定機能付き地図切替コントローラ
//  デフォルトのオーバーレイレイヤに対して、透過設定機能が追加される
//  L.control.layersをL.control.opacityLayersに変更することで利用可能
// 作成者: Joe Masumura (ASH Corporation.)

L.Control.OpacityLayers = L.Control.Layers.extend({ // Leafletコントローラの透明機能を拡張
	_addItem: function(obj) { // 初期処理
		let label = L.Control.Layers.prototype._addItem.call(this, obj); // デフォルト処理
		if (!obj.overlay) return label; // オーバーレイ以外は対象外

		let input = document.createElement('input');
		input.type = 'range'; // スライダ
		input.min = 0; // 最小値:0%
		input.max = 100; // 最大値:100%
		input.value = obj.layer.options.opacity * 100; // 初期値は100%
		input.leafletId = L.stamp(obj.layer); // レイヤ情報を保存
		input.className = 'leaflet-control-layers-opacity';
		input.style.display = 'none'; // スライダを非表示
		L.DomEvent.on(input, 'change', this._onInputClick, this);
		label.appendChild(input);
		return label;
    },

	_onInputClick: function() { // クリック処理
		L.Control.Layers.prototype._onInputClick.call(this); // デフォルト処理

		let inputs = this._container.getElementsByTagName('input');
		for (let i = 0; i < inputs.length; i++) {
			let input = inputs[i];
			if (input.type != 'range') continue; // スライダ以外は対象外

			let obj = this._getLayer(input.leafletId);
			if (this._map.hasLayer(obj.layer)) {
				input.style.display = 'block'; // スライダを表示
				if (typeof obj.layer._layers == 'undefined') { // レイヤ
					obj.layer.setOpacity(input.value / 100.0); // 透過度変更
				} else { // レイヤグループ
					for (let key in obj.layer._layers) { // 全レイヤ透過度変更
						obj.layer._layers[key].setOpacity(input.value / 100.0);
					}
				}
			} else {
				input.style.display = 'none'; // スライダを消去
			}
		}
	}
});

L.control.opacityLayers = function (base, over, opt) { // 小文字で始まるショートカットの定義
	return new L.Control.OpacityLayers(base, over, opt);
};
