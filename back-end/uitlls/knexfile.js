require('dotenv').config(); 

module.exports = {
    client: 'mysql2',  
    connection: {
        host: 'localhost',  
        user: 'root',       
        password: '',       
        database: 'salone', 
    },
    migrations: {
      directory: './migrations', 
    },
    seeds: {
      directory: './seeds', 
    },
  };
  