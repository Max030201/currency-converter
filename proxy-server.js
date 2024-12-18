const express = require('express');
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/api/frankfurter.dev', async (req, res) => {
  const frankfurterPath = req.originalUrl.replace('/api/frankfurter.dev', '');
  const url = `https://api.frankfurter.dev${frankfurterPath}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    res.header('Cache-Control', 'no-store');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.text();
      res.type('application/json').send(data);
    } else {
      const text = await response.text();
      res.status(response.status).send(text);
    }
  } catch (e) {
    res.status(500).json({ error: 'Proxy error', details: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
