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

const overpassQuery = `
[out:json][timeout:25];
node["amenity"="cafe"](35.681,139.767,35.689,139.775);
out body;
`;

const filename = "cafes.geojson";

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
    console.log(`🎉 GeoJSONファイルを保存したにゃ！ -> ${filename}`);

  } catch (err) {
    console.error("🐱 エラーにゃ！", err.message || err);
  }
}

fetchWithAxios();
