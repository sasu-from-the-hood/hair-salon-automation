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
     * @example
     * { type, maxLength, minLength, min, max, pattern, enum: enumValues, function: customFunction } 
     *  const validatorInstance = new JSONValidator({
    email: { type: 'email' },
    name: { type: 'string', maxLength: 50, minLength: 2 },
    age: { type: 'number', min: 18, max: 65 },
    website: { type: 'url' },
    interests: { type: 'string', maxLength: 30 },  // To handle string arrays like interests
    friends: { type: "string", minLength: 3 }

});

const data = {
    email: ['test@example.com'],
    name: 'John Doe',
    age: 28,
    website: ['https://example.com'],
    interests: ['coding', 'reading', 'gaming'],
    friends: ['Alice', 'Bob', '']
};
     * @param {Object|Array} jsonData - The JSON data (object or array) to validate and sanitize.
     * @param {Object} options - Dynamic options for filtering and validation.
     * @param {string} [parentKey=''] - The parent key for nested objects or arrays (used for error reporting).
     * @returns {Object|Array} - The sanitized and validated JSON data.
     * @throws {Error} - If the JSON data is invalid or contains potential attacks.
     */
    validateAndSanitize(jsonData, options = {}, parentKey = '') {
        if (jsonData === null) {
            throw new Error('Invalid JSON data: Expected an object or array.');
        }

        const sanitizedData = Array.isArray(jsonData) ? [] : {};
        const mergedOptions = { ...this.defaultOptions, ...options };
        this.errors = []; // Reset errors array

        const entries = Array.isArray(jsonData) ? jsonData.entries() : Object.entries(jsonData);
        if (entries.length === 0) {
            throw new Error('The input is empty, fill all inputs.');
        }

        for (const [key, value] of entries) {
            let sanitizedValue = value;
            const currentKey = parentKey ? `${parentKey}.${key}` : key;

            // Apply XSS protection to string values
            if (typeof sanitizedValue === 'string') {
                sanitizedValue = xss(sanitizedValue);
            }

            // SQL Injection Check for string values
            if (typeof sanitizedValue === 'string' && !this.isSQLSafe(sanitizedValue)) {
                this.errors.push({
                    field: currentKey,
                    type: 'sql',
                    errorMessage: 'Potential SQL injection detected.',
                    suggestion: 'Use parameterized queries for SQL safety.'
                });
            }

            // Handle arrays recursively
            if (Array.isArray(sanitizedValue)) {
                // Apply dynamic validation to each element of the array
                sanitizedValue = sanitizedValue.map((item, index) => {
                    const elementOptions = mergedOptions[key] || {};

                    // Recursively validate arrays and objects within the array
                    if (typeof item === 'object' && item !== null) {
                        return this.validateAndSanitize(item, elementOptions, `${currentKey}[${index}]`);
                    }

                    // Apply type-based validation (email, string, number, etc.)
                    try {
                        if (elementOptions.type) {
                            return this.applyFilter(`${currentKey}[${index}]`, item, elementOptions);
                        }
                    } catch (err) {
                        this.errors.push({
                            index,
                            field: currentKey,
                            errorMessage: err.message,
                            suggestion: `Check validation rules for the field ${currentKey}[${index}].`
                        });
                    }

                    return item; // Return the original item if no validation rule applies
                });
            }
            // Handle objects recursively
            else if (typeof sanitizedValue === 'object' && sanitizedValue !== null) {
                sanitizedValue = this.validateAndSanitize(sanitizedValue, mergedOptions[key] || {}, currentKey);
            }
            // Apply dynamic filtering based on options
            else {
                try {
                    if (mergedOptions[key]) {
                        sanitizedValue = this.applyFilter(currentKey, sanitizedValue, mergedOptions[key]);
                    } else if (mergedOptions['*']) {
                        sanitizedValue = this.applyFilter(currentKey, sanitizedValue, mergedOptions['*']);
                    }
                } catch (err) {
                    this.errors.push({
                        field: currentKey,
                        errorMessage: err.message,
                        suggestion: 'Check filter options and ensure they match the expected type.'
                    });
                }
            }

            if (Array.isArray(jsonData)) {
                sanitizedData.push(sanitizedValue);
            } else {
                sanitizedData[key] = sanitizedValue;
            }
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
                if (typeof value !== 'string') throw new Error(`Field ${key} must be a string.`);
                if (maxLength && value.length > maxLength) throw new Error(`Field ${key} exceeds max length of ${maxLength}.`);
                if (minLength && value.length < minLength) throw new Error(`Field ${key} is below min length of ${minLength}.`);
                break;

            case 'number':
                value = Number(value);
                if (isNaN(value)) throw new Error(`Field ${key} must be a number.`);
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

            case 'required':
                if (!value) throw new Error(`Field ${key} is required.`);
                break;

            default:
                break;
        }

        return value;
    }

    /**
     * Set default options for the validator.
     * @param {Object} options - Default options to be applied to all fields.
     */
    setDefaultOptions(options) {
        this.defaultOptions = { ...this.defaultOptions, ...options };
    }

    /**
     * Get any validation errors encountered during processing.
     * @returns {Array} - An array of error messages.
     */
    getErrors() {
        return this.errors;
    }
}

module.exports = JSONValidator;

// // Example usage
// const validatorInstance = new JSONValidator({
//     email: { type: 'email' },
//     name: { type: 'string', maxLength: 50, minLength: 2 },
//     age: { type: 'number', min: 18, max: 65 },
//     website: { type: 'url' },
//     interests: { type: 'string', minLength: 3, maxLength: 30 },  // To handle string arrays like interests
//     friends: { type: "string", minLength: 3 }

// });

// const data = {
//     email: ['test@example.com'],
//     name: 'John Doe',
//     age: 28,
//     website: ['https://example.com'],
//     interests: ['coding', 'reading', ''],
//     friends: ['Alice', 'Bob', 'www']
// };

// try {
//     const sanitizedData = validatorInstance.validateAndSanitize(data);
//     console.log('Sanitized Data:', sanitizedData);
// } catch (err) {
//     console.error('Validation Errors:', JSON.parse(err.message));
// }
