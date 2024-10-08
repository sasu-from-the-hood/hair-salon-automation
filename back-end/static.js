const Database = require('./security/database/database');
const JSONValidator = require('./security/validateData')
const EmailService = require('./security/email_sms')
const Logger = require('./logger');

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
            Logger.error('Error initializing Supabase Client:', error);
            throw new Error('Database initialization failed');
        }
    })();

    static ValidatorData = (() => {
        try {
            return new JSONValidator();
        } catch (error) {
            Logger.error('Error initializing JSONValidator:', error);
            throw new Error('JSONValidator initialization failed');
        }
    })();

    static email = (() => {
        try {
            return new EmailService(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.app_name, process.env.app_password);
        } catch (error) {
            Logger.error('Error initializing EmailService:', error);
            throw new Error('EmailService initialization failed');
        }
    })();

    static accessTableBlocked = ["user", "admin"]
    static resettingPasswordArray = []


    addResetRequest(value) {
        if (Static.resettingPasswordArray.some(item => item.data.email === value.email)) {
            // Email already exists in the array
            console.log('This email is already in the resettingPasswordArray.');
        } else {
            // Email does not exist, proceed with adding it
            Static.resettingPasswordArray.push({
                data: { email: value.email, password: value.password },
                date: new Date()
            });

            // Set auto-removal after 1 hour
            setTimeout(() => {
                Static.resettingPasswordArray = Static.resettingPasswordArray.filter(item => item.data.email !== value.email);
                console.log(`Removed ${value.email} from resettingPasswordArray after 1 hour`);
            }, 60 * 60 * 1000);  // 1 hour delay
        }
    }
}



module.exports = Static;