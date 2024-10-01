const sqlstring = require('sqlstring');
const validator = require('validator');
const xss = require('xss');

class JSONValidator {
    constructor(defaultOptions = {}) {
        this.defaultOptions = defaultOptions;
        this.errors = [];
    }

    /**
    * Validate and sanitize JSON data.
    * @param {Object} jsonData - The JSON data to validate and sanitize.
    * @param {Object} options - Dynamic options for filtering and validation.
    * @returns {Object} - The sanitized and validated JSON data.
    * @throws {Error} - If the JSON data is invalid or contains potential attacks.
    * @example    const sanitizedData = validator1.validateAndSanitize(jsonData, {
        name: { type: "string", maxLength: 50 },
        age: { type: 'number', min: 18, max: 120 },
        email: { type: 'email' },
        website: { type: 'url' },
        phoneNumber: { type: 'pattern', pattern: '^\\d{3}-\\d{3}-\\d{4}$' },
        password: { type: 'pattern', pattern: '.{1,6}' },
        car: {
            type: "custom",
            function: (value) => {
                return value.toLowerCase(); // Use toLowerCase() instead of tolowercase()
            }
        }

    });
    */
    validateAndSanitize(jsonData, options = {}) {
        if (typeof jsonData !== 'object' || jsonData === null) {
            throw new Error('Invalid JSON data: Expected an object.');
        }

        const sanitizedData = {};
        const mergedOptions = { ...this.defaultOptions, ...options };
        this.errors = []; // Reset errors array

        const entries = Object.entries(jsonData);
        if (entries.length === 0) {
            throw new Error('The input is empty, fill all inputs.');
        }

        for (const [key, value] of entries) {
            let sanitizedValue = value;

            // Apply XSS protection to string values
            if (typeof sanitizedValue === 'string') {
                sanitizedValue = xss(sanitizedValue);
            }

            // SQL Injection Check for string values
            if (typeof sanitizedValue === 'string' && !this.isSQLSafe(sanitizedValue)) {
                this.errors.push({
                    field: key,
                    errorMessage: 'Potential SQL injection detected.',
                    suggestion: 'Use parameterized queries for SQL safety.'
                });
            }

            // Apply dynamic filtering based on options
            try {
                if (mergedOptions[key]) {
                    sanitizedValue = this.applyFilter(key, sanitizedValue, mergedOptions[key]);
                } else if (mergedOptions['*']) {
                    sanitizedValue = this.applyFilter(key, sanitizedValue, mergedOptions['*']);
                }
            } catch (err) {
                this.errors.push({
                    field: key,
                    errorMessage: err.message,
                    suggestion: 'Check filter options and ensure they match the expected type.'
                });
            }

            sanitizedData[key] = sanitizedValue;
        }

        if (this.errors.length > 0) {
            throw new Error(JSON.stringify(this.errors));
        }

        return sanitizedData;
    }

    /**
     * Check if a string is safe from SQL injection.
     * @param {string} value - The string to check.
     * @returns {boolean} - True if safe, false otherwise.
     */
    isSQLSafe(value) {
        const escapedValue = sqlstring.escape(value);
        return escapedValue === `'${value}'`;
    }

    /**
     * Apply a filter to a value based on the filter options.
     * @param {string} key - The field name.
     * @param {any} value - The value to filter.
     * @param {Object} filterOption - The filter options.
     * @returns {any} - The filtered value.
     * @throws {Error} - If the value doesn't meet the filter criteria.
     */
    applyFilter(key, value, filterOption) {
        const { type, maxLength, minLength, min, max, pattern, enum: enumValues, function: customFunction } = filterOption;

        switch (type) {
            case 'string':
                if (typeof value !== 'string') throw new Error(`Field ${key} must be a string. was given ${typeof value}`);
                if (maxLength && value.length > maxLength) throw new Error(`Field ${key} exceeds max length of ${maxLength}.`);
                if (minLength && value.length < minLength) throw new Error(`Field ${key} is below min length of ${minLength}.`);
                break;

            case 'number':
                value = Number(value);
                if (isNaN(value)) throw new Error(`Field ${key} must be a number. was given ${typeof value}`);
                if (min !== undefined && value < min) throw new Error(`Field ${key} must be >= ${min}.`);
                if (max !== undefined && value > max) throw new Error(`Field ${key} must be <= ${max}.`);
                break;

            case 'email':
                if (!validator.isEmail(value)) throw new Error(`Invalid email address in field ${key}.`);
                break;

            case 'url':
                if (!validator.isURL(value)) throw new Error(`Invalid URL in field ${key}.`);
                break;

            case 'date':
                if (!validator.isISO8601(value)) throw new Error(`Invalid date format in field ${key}.`);
                break;

            case 'boolean':
                value = Boolean(value);
                break;

            case 'pattern':
                if (!new RegExp(pattern).test(value)) throw new Error(`Field ${key} does not match the required pattern.`);
                break;

            case 'enum':
                if (!enumValues.includes(value)) throw new Error(`Field ${key} must be one of ${enumValues.join(', ')}.`);
                break;

            case 'custom':
                if (typeof customFunction === 'function') {
                    value = customFunction(value);
                } else {
                    throw new Error(`Custom function is not defined for field ${key}.`);
                }
                break;

            default:
                // No specific filter
                break;
        }

        return value;
    }

    /**
     * Set default options for the validator.
     * @param {Object} options - Default options to be applied.
     */
    setDefaultOptions(options) {
        this.defaultOptions = options;
    }
}

module.exports = JSONValidator;

// Example usage
// const validator1 = new JSONValidator();

// const jsonData = {
//     name: "Jo//",
//     age: "30",
//     password: "1",
//     email: "john@example.com",
//     website: "https://example.com",
//     phoneNumber: "123-456-7890",
//     postalCode: "12345-6789",
//     car: "WWW"
// };

// try {
//     const sanitizedData = validator1.validateAndSanitize(jsonData, {
//         name: { type: "string", maxLength: 50, minLength: 20 },
//         age: { type: 'number', min: 18, max: 120 },
//         email: { type: 'email' },
//         website: { type: 'url' },
//         phoneNumber: { type: 'pattern', pattern: '^\\d{3}-\\d{3}-\\d{4}$' },
//         password: { type: 'pattern', pattern: '.{1,6}' },
//         car: {
//             type: "custom",
//             function: (value) => {
//                 return value.toLowerCase(); // Use toLowerCase() instead of tolowercase()
//             }
//         }

//     });

//     console.log('Sanitized data:', sanitizedData);
// } catch (error) {
//     console.error('Validation error:', error.message);
// }
