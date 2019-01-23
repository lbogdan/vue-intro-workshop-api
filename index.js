const fs = require('fs');
const path = require('path');

const PORT = 8000;

function getDbPath(filename) {
  return path.resolve(__dirname, `data/${filename}`);
}

const dbPath = getDbPath('db.json');

if (!fs.existsSync(dbPath)) {
  console.log('Initializing database');
  fs.copyFileSync(getDbPath('db.init.json'), dbPath);
}

// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`Movies API server is running on port ${PORT}...`);
});
