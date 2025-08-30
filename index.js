const axios = require("axios");
const osmtogeojson = require("osmtogeojson");
const fs = require("fs");
const https = require("https");

const agent = new https.Agent({
  family: 4, // ipv4
});

const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";
// const OVERPASS_ENDPOINT = "https://overpass.kumi.systems/api/interpreter";
// const OVERPASS_ENDPOINT = "https://lz4.overpass-api.de/api/interpreter";
// const OVERPASS_ENDPOINT = "https://overpass.openstreetmap.ru/api/interpreter";


// --- Overpass QL クエリの基本構造 ---
// [out:json][timeout:秒数];   // 出力形式とタイムアウト
// node["キー"="値"](南緯,西経,北緯,東経); // 対象となるOSM要素と範囲
// out body;                    // 結果出力
//
// クエリ内容は外部ファイルから読み込む

// コマンドライン引数 -q でクエリファイル名を指定可能（デフォルト: query.overpass）
let queryFile = "query.overpass";
const qIndex = process.argv.indexOf('-q');
if (qIndex !== -1 && process.argv[qIndex + 1]) {
  queryFile = process.argv[qIndex + 1];
}
let overpassQuery = '';
try {
  overpassQuery = fs.readFileSync(queryFile, 'utf8');
} catch (e) {
  console.error(`クエリファイル '${queryFile}' が見つかりません。`);
  process.exit(1);
}


// コマンドライン引数 -o で出力ファイル名を指定可能にする
// 例: node index.js -q myquery.overpass -o shops.geojson
let filename = "openstreetmap.geojson"; // デフォルト
const oIndex = process.argv.indexOf('-o');
if (oIndex !== -1 && process.argv[oIndex + 1]) {
  filename = process.argv[oIndex + 1];
}

async function fetchWithAxios() {
  try {
    const response = await axios.post(
      OVERPASS_ENDPOINT,
      overpassQuery,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "axios/1.0"
        },
        timeout: 30000,
        httpsAgent: agent,
      }
    );

    const osmJson = response.data;
    const geojson = osmtogeojson(osmJson);
    fs.writeFileSync(filename, JSON.stringify(geojson, null, 2));
    console.log(`🎉 GeoJSONファイルを保存しました！ -> ${filename}`);

  } catch (err) {
    console.error("🐱 エラーが発生しました！", err.message || err);
  }
}

fetchWithAxios();
