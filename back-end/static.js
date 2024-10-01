const Database = require('./security/database/database');
const JSONValidator = require('./security/validateData')
const EmailService = require('./security/email_sms')
require('dotenv').config()

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
    static db = (() => {
        try {
            return new Database();
        } catch (error) {
            console.error('Error initializing Database:', error);
            return null;  // or handle as needed
        }
    })();

    static ValidatorData = (() => {
        try {
            return new JSONValidator();
        } catch (error) {
            console.error('Error initializing JSONValidator:', error);
            return null;
        }
    })();

    static email = (() => {
        try {
            return new EmailService(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.app_name, process.env.app_password);
        } catch (error) {
            console.error('Error initializing EmailService:', error);
            return null;
        }
    })();

}


module.exports = Static;