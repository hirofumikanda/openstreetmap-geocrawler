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
git clone https://github.com/your-username/nyapass.git
cd nyapass
````

### 2. 依存パッケージをインストール

```bash
npm install
```

### 3. スクリプトを実行

```bash
node index.js
```

実行後、`cafes.geojson` というファイルが作成されます（内容は `index.js` 内のクエリに依存します）。


## クエリのカスタマイズ

`index.js` の `overpassQuery` 定数を編集することで、取得対象のデータや範囲を変更できます。

例：公衆トイレの取得に変更する場合

```javascript
const overpassQuery = `
[out:json][timeout:25];
node["amenity"="toilets"](35.681,139.767,35.689,139.775);
out body;
`;
```

## 使用しているライブラリ

* [axios](https://www.npmjs.com/package/axios) – HTTP 通信
* [osmtogeojson](https://github.com/tyrasd/osmtogeojson) – OSM JSON から GeoJSON への変換
* Node.js 標準モジュール：`fs`, `https`
