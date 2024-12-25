const knex = require('knex');
const fs = require('fs');

class DatabaseManager {
  constructor(config, sqlFilePath) {
    this.knexConfig = config;
    this.sqlFilePath = sqlFilePath;
    this.databaseName = config.connection.database;
  }

  // Reads SQL from the file
  async readSQLFile() {
    try {
      return fs.promises.readFile(this.sqlFilePath, 'utf8');
    } catch (err) {
      throw new Error(`Error reading SQL file: ${err.message}`);
    }
  }

  // Cleans SQL by removing unnecessary newlines, extra spaces, and comments
  cleanSQL(sql) {
    return sql.replace(/--.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/[\n\r]+/g, ' ') // Replace newlines with spaces
      .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
      .trim();
  }

  // Drops the database
  async dropDatabase() {
    const knexNoDB = knex({
      ...this.knexConfig,
      connection: { ...this.knexConfig.connection, database: null }, // Connect without specifying a database
    });

    try {
      const [databaseExists] = await knexNoDB.raw(`SHOW DATABASES LIKE ?`, [this.databaseName]);
      if (databaseExists.length) {
        await knexNoDB.raw(`DROP DATABASE ??`, [this.databaseName]);
        console.log(`Database ${this.databaseName} dropped.`);
      } else {
        console.log(`Database ${this.databaseName} does not exist.`);
      }
    } finally {
      await knexNoDB.destroy();
    }
  }

  // Creates the database if it doesn't exist
  async createDatabase() {
    const knexNoDB = knex({
      ...this.knexConfig,
      connection: { ...this.knexConfig.connection, database: null }, // Connect without specifying a database
    });

    try {
      const [databaseExists] = await knexNoDB.raw(`SHOW DATABASES LIKE ?`, [this.databaseName]);
      if (!databaseExists.length) {
        await knexNoDB.raw(`CREATE DATABASE ??`, [this.databaseName]);
        console.log(`Database ${this.databaseName} created.`);
      } else {
        console.log(`Database ${this.databaseName}.`);
      }
    } finally {
      await knexNoDB.destroy();
    }
  }

  // Runs the SQL file to create tables or perform migrations
  async migrate() {
    const knexInstance = knex(this.knexConfig);

    try {
      await this.createDatabase();
      const sql = await this.readSQLFile();
      const sqlStatements = this.cleanSQL(sql).split(';').filter(stmt => stmt.trim() !== '');

      for (const statement of sqlStatements) {
        try {
          await knexInstance.raw(statement);
        } catch (err) {
          console.error('Error executing SQL statement:', '\n', err.message);
        }
      }

      console.log('Tables created successfully.');
    } finally {
      await knexInstance.destroy();
    }
  }

  // Performs a fresh migration (drops and recreates the database)
  async migrateFresh() {
    console.log('Starting fresh migration...');
    await this.dropDatabase();
    await this.migrate();
    console.log('Fresh migration completed successfully.');
  }
}

module.exports=DatabaseManager