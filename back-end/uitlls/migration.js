const knexConfig = require('./knexfile');
const path = require('path');
const DatabaseManager = require('./self-uitlls/kenex')

const sqlFilePath = path.join(__dirname, '/database_SQL/database.sql');
const dbManager = new DatabaseManager(knexConfig, sqlFilePath);


const action = process.argv[2]; // Get action from command-line arguments
(async () => {
  try {
    if (action === 'migrate:fresh') {
      await dbManager.migrateFresh();
    } else {
      await dbManager.migrate();
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
