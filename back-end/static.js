const Database = require('./security/database/database');
/**
 * palce for adding a constant virable to be acessed all over the files needed
 * @example
 * @param db static database 
 * 
 * 
 */

class Static {
    // palce for adding a constant virable to be acessed all over the files needed
    static db = new Database();

}

module.exports = Static;