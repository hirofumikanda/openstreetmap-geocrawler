# OpenStreetMap GeoCrawler

**OpenStreetMap GeoCrawler** は、Node.js を用いて OpenStreetMap のデータを Overpass API から取得し、GeoJSON 形式に変換・保存するシンプルなユーティリティです。

## 主な機能

- Overpass QL による自由なクエリ送信
- OSM JSON を GeoJSON に変換
- 取得データのローカルファイル保存
- IPv4 固定により一部のネットワーク環境でも安定動作


## 使用方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/hirofumikanda/openstreetmap-geocrawler.git
cd openstreetmap-geocrawler
````

### 2. 依存パッケージをインストール

```bash
npm install
```


### 3. スクリプトを実行

```bash
# デフォルト（openstreetmap.geojson に出力）
node index.js

# 出力ファイル名を指定（例: shops.geojson に出力）
node index.js -o shops.geojson

# クエリファイル名を指定（例: shops.overpass に出力）
node index.js -q shops.overpass
```

実行後、指定したファイル名（デフォルトは `openstreetmap.geojson`）でGeoJSONファイルが作成されます（内容はクエリファイル（デフォルト: `query.overpass`）に依存します）。



## クエリのカスタマイズ

取得対象のデータや範囲は、外部クエリファイル（デフォルト: `query.overpass`）を編集することで変更できます。

例：公衆トイレの取得クエリ（`query.overpass` の内容例）

```overpassql
[out:json][timeout:25];
node["amenity"="toilets"](35.681,139.767,35.689,139.775);
out body;
```

クエリファイルは `-q <ファイル名>` で指定できます（省略時は `query.overpass`）。

### クエリに関する参考サイト
- [Overpass API/Overpass API by Example](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example)
- [taginfo](https://taginfo.openstreetmap.org/)



## コマンドラインオプション

- `-q <クエリファイル>` : Overpass QL クエリファイルを指定（省略時は `query.overpass`）
- `-o <ファイル名>` : 出力するGeoJSONファイル名を指定（省略時は `openstreetmap.geojson`）

## 使用しているライブラリ

* [axios](https://www.npmjs.com/package/axios) – HTTP 通信
* [osmtogeojson](https://github.com/tyrasd/osmtogeojson) – OSM JSON から GeoJSON への変換
* Node.js 標準モジュール：`fs`, `https`
