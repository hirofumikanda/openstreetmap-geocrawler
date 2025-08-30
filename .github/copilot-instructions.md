# Copilot Instructions for OpenStreetMap GeoCrawler

This project is a Node.js utility for querying OpenStreetMap data via the Overpass API and converting results to GeoJSON. Use these guidelines to maximize AI agent productivity in this codebase.

## Architecture & Data Flow
- Main logic is in `index.js`.
- Sends Overpass QL queries to the Overpass API using `axios`.
- Converts OSM JSON responses to GeoJSON using `osmtogeojson`.
- Saves results as local `.geojson` files (e.g., `cafes.geojson`).
- Query string is defined in the `overpassQuery` constant in `index.js`.

## Developer Workflows
- Install dependencies: `npm install`
- Run main script: `node index.js`
- Output file name and query can be changed by editing `index.js`.
- No test suite or build step; direct execution only.

## Project-Specific Conventions
- All Overpass queries and output file logic are centralized in `index.js`.
- GeoJSON output filenames should reflect the query purpose (e.g., `cafes.geojson`, `shops.geojson`).
- IPv4 is forced for network stability in some environments (see `index.js`).
- Only minimal dependencies: `axios`, `osmtogeojson`, and Node.js built-ins.

## Integration & Extensibility
- To add new queries, duplicate and modify the `overpassQuery` and output logic in `index.js`.
- For new output types, follow the pattern in `index.js` for file writing and naming.
- External API: Overpass API endpoint (see `index.js` for URL and usage).

## Examples
- To fetch public toilets, set `overpassQuery` to:
  ```js
  const overpassQuery = `
  [out:json][timeout:25];
  node["amenity"="toilets"](35.681,139.767,35.689,139.775);
  out body;
  `;
  ```
- To change output file, update the filename in the `fs.writeFileSync` call.

## Key Files
- `index.js`: All main logic, queries, and file output
- `README.md`: Usage, customization, and library references

---
For further details, see `README.md` or inspect `index.js` for the latest patterns.
