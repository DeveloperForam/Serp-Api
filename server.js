// // backend/server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { getJson } = require('serpapi');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const SERPAPI_KEY = process.env.SERPAPI_KEY;

// if (!SERPAPI_KEY) {
//   console.error('Missing SERPAPI_KEY in .env');
//   process.exit(1);
// }

// // Helper to call SerpApi using getJson (wrap callback in a Promise)
// function serpSearch(params) {
//   return new Promise((resolve, reject) => {
//     getJson(params, (data) => {
//       // SerpApi returns JSON (data) or an error structure — you can inspect it here
//       resolve(data);
//     });
//   });
// }

// // GET /search?q=term
// app.get('/search', async (req, res) => {
//   const q = req.query.q;
//   if (!q) return res.status(400).json({ error: "Missing query 'q' parameter" });

//   try {
//     const params = {
//       api_key: SERPAPI_KEY,
//       engine: 'google',            // or 'google_news', 'google_maps', etc.
//       q: q,
//       num: req.query.num || 10,    // optional
//       gl: req.query.gl || 'us'     // optional: country code
//     };

//     const json = await serpSearch(params);
//     res.json(json);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message || 'Server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getJson } = require('serpapi');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

if (!SERPAPI_KEY) {
  console.error('❌ Missing SERPAPI_KEY in .env');
  process.exit(1);
}

function serpSearch(params) {
  return new Promise((resolve) => {
    getJson(params, (data) => resolve(data));
  });
}

app.get('/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing query parameter 'q'" });

  try {
    const results = await serpSearch({
      engine: 'google',
      q,
      api_key: SERPAPI_KEY
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
