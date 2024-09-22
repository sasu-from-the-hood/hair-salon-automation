const Database = require('./security/database/database');
const JSONValidator = require('./security/validateData')
const crypto = require('crypto');
/**
 * palce for adding a constant virable to be acessed all over the files needed
 * @example
 * @param db static database 
 * @param ValidatorData static JSONValidator
 * 
 * 
 */

class Static {
    // palce for adding a constant virable to be acessed all over the files needed
    static db = new Database();
    static ValidatorData = new JSONValidator()
    static salt = Array.from({ length: 10 }, () => crypto.randomBytes(16).toString('hex'));


}

module.exports = Static;