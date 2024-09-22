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
    * 
    * @param {Object} jsonData - The JSON data to validate and sanitize.
    * @param {Object} options - Dynamic options for filtering and validation.
    * @returns {Object} - The sanitized and validated JSON data.
    * @throws {Error} - If the JSON data is invalid or contains potential attacks.
    * 
    * @description
    * 
    * The JSONValidator class supports a range of validation and sanitization options to handle different types of data and requirements. It can validate and sanitize string, number, email, URL, date, boolean, enum, pattern, and custom types. 
    * 
    * Supported options include:
    * 
    * - **String:** Validate length
    * - **Number:** Validate range and type.
    * - **Email:** Validate email format.
    * - **URL:** Validate URL format.
    * - **Date:** Validate date format.
    * - **Boolean:** Convert to boolean.
    * - **Enum:** Validate against a set of allowed values.
    * - **Pattern:** Validate against a regular expression.
    * - **Custom:** Allow custom functions to apply transformations.
    * 
    * @example
    * 
    * const jsonData = {
    *     name: "John Doe",
    *     age: "30",
    *     email: "john@example.com",
    *     website: "https://example.com",
    *     phoneNumber: "123-456-7890",
    *     postalCode: "12345-6789"
    * };
    * 
    * const validator1 = new JSONValidator();
    * 
    * // Set default options including pattern validation
    * validator1.setDefaultOptions({
    *     name: {
    *         type: 'string',
    *         transform: (value) => value.trim().toUpperCase(),
    *         maxLength: 50 
    *     },
    *     age: { type: 'number', min: 0, max: 120 },
    *     email: { type: 'email' },
    *     '*': { type: 'string', maxLength: 100 } // Default for unspecified fields
    * });
    * 
    * // Validate and sanitize JSON data with pattern options
    * try {
    *     const sanitizedData = validator1.validateAndSanitize(jsonData, {
    *         website: { type: 'url' },
    *         phoneNumber: { type: 'pattern', pattern: '^\\d{3}-\\d{3}-\\d{4}$' }, // Example phone number pattern
    *         postalCode: { type: 'pattern', pattern: '^\\d{5}(?:-\\d{4})?$' }, // Example postal code pattern
    *         name: {
    *             type: 'custom',
    *             function: (value) => value.trim().toUpperCase() // Example transformation
    *         }
    *     });
    *     console.log('Sanitized data:', sanitizedData);
    * } catch (error) {
    *     console.error('Validation error:', JSON.stringify(error.message));
    * }
    */
    validateAndSanitize(jsonData, options = {}) {
        if (typeof jsonData !== 'object' || jsonData === null) {
            throw new Error('Invalid JSON data: Expected an object.');
        }

        const sanitizedData = {};
        const mergedOptions = { ...this.defaultOptions, ...options };

        this.errors = []; // Reset errors array
        jsonData = Object.entries(jsonData)

        if (!jsonData.length) {
            throw new Error("the input is empty fill all inputs");

        }

        for (const [key, value] of jsonData) {
            let sanitizedValue = value;

            // Apply XSS protection to string values
            if (typeof sanitizedValue === 'string') {
                sanitizedValue = xss(sanitizedValue);
            }

            // Check for SQL injection in string values
            if (typeof sanitizedValue === 'string' && sqlstring.escape(sanitizedValue) !== `'${sanitizedValue}'`) {
                this.errors.push({
                    field: key,
                    errorMessage: 'Potential SQL injection detected.',
                    suggestion: 'Ensure that the input is properly sanitized and use parameterized queries.'
                });
            }

            // Apply dynamic filtering based on options
            if (mergedOptions[key]) {
                try {
                    sanitizedValue = this.applyFilter(key, sanitizedValue, mergedOptions[key]);
                } catch (err) {
                    this.errors.push({
                        field: key,
                        errorMessage: ` ${err.message}`,
                        suggestion: 'Check the filter options and ensure they match the expected value type.'
                    });
                }
            } else if (mergedOptions['*']) {
                // Apply default filter to all fields not explicitly specified
                try {
                    sanitizedValue = this.applyFilter(key, sanitizedValue, mergedOptions['*']);
                } catch (err) {
                    this.errors.push({
                        field: key,
                        errorMessage: `${err.message}`,
                        suggestion: 'Check the default filter options and ensure they are appropriate for the data.'
                    });
                }
            }

            sanitizedData[key] = sanitizedValue;
        }

        if (this.errors.length > 0) {
            throw new Error(JSON.stringify(this.errors));
        }

        return sanitizedData;
    }

    /**
     * Apply a filter to a value based on the filter options
     * @param {string} key - The field name
     * @param {any} value - The value to filter
     * @param {Object} filterOption - The filter options
     * @returns {any} - The filtered value
     * @throws {Error} - If the value doesn't meet the filter criteria
     */
    applyFilter(key, value, filterOption) {
        // Ensure the filter type is in lowercase for consistent comparison
        const type = filterOption.type.toLowerCase();

        switch (type) {
            case 'string':
                if (typeof value !== 'string') {
                    throw new Error(`Field ${key} must be a string. Received ${typeof value}.`);
                }
                if (filterOption.maxLength && value.length > filterOption.maxLength) {
                    value = value.slice(0, filterOption.maxLength);
                }
                if (filterOption.minLength && value.length < filterOption.minLength) {
                    throw new Error(`Field ${key} must be at least ${filterOption.minLength} characters long. Received ${value.length}.`);
                }
                break;

            case 'number':
                value = Number(value);
                if (isNaN(value)) {
                    throw new Error(`Field ${key} must be a number. Received ${value}.`);
                }
                if (filterOption.min !== undefined && value < filterOption.min) {
                    throw new Error(`Field ${key} must be greater than or equal to ${filterOption.min}. Received ${value}.`);
                }
                if (filterOption.max !== undefined && value > filterOption.max) {
                    throw new Error(`Field ${key} must be less than or equal to ${filterOption.max}. Received ${value}.`);
                }
                break;

            case 'email':
                if (!validator.isEmail(value)) {
                    throw new Error(`Invalid email address in field: ${key}. Received ${value}.`);
                }
                break;

            case 'url':
                if (!validator.isURL(value)) {
                    throw new Error(`Invalid URL in field: ${key}. Received ${value}.`);
                }
                break;

            case 'date':
                if (!validator.isISO8601(value)) {
                    throw new Error(`Invalid date format in field: ${key}. Received ${value}.`);
                }
                break;

            case 'boolean':
                if (typeof value !== 'boolean') {
                    value = Boolean(value);
                }
                break;

            case 'custom':
                if (typeof filterOption.function === 'function') {
                    value = filterOption.function(value);
                } else {
                    throw new Error(`Custom filter function is not defined for field: ${key}`);
                }
                break;

            case 'pattern':
                if (!filterOption.pattern) {
                    throw new Error(`No pattern provided for field ${key}`);
                }
                const regex = new RegExp(filterOption.pattern);
                if (!regex.test(value)) {
                    throw new Error(`Field ${key} does not match the required pattern. Received ${value}.`);
                }
                break;

            case 'enum':
                if (!Array.isArray(filterOption.enum)) {
                    throw new Error(`Enum option for field ${key} is not an array.`);
                }
                if (!filterOption.enum.includes(value)) {
                    throw new Error(`Field ${key} must be one of ${filterOption.enum.join(', ')}. Received ${value}.`);
                }
                break;

            default:
                // No specific filter applied
                break;
        }

        return value;
    }

    /**
     * Set default options for the validator
     * @param {Object} options - Default options to be applied
     */
    setDefaultOptions(options) {
        this.defaultOptions = options;
    }
}

module.exports = JSONValidator;

// Example usage
// const validator1 = new JSONValidator();

// // Setting default options including pattern validation
// validator1.setDefaultOptions({
//     age: { type: 'number' },
//     email: { type: 'email' },
//     '*': { type: 'string', maxLength: 100 } // Default for unspecified fields
// });

// // Validate and sanitize JSON data with pattern options
// const jsonData = {
//     name: "John Doe",
//     age: "30",
//     password: "",
//     email: "john@example.com",
//     website: "https://example.com",
//     phoneNumber: "123-456-7890",
//     postalCode: "12345-6789"
// };

// try {
//     const sanitizedData = validator1.validateAndSanitize(jsonData, {
//         website: { type: 'url' },
//         phoneNumber: { type: 'pattern', pattern: '^\\d{3}-\\d{3}-\\d{4}$' }, // Example phone number pattern
//         postalCode: { type: 'pattern', pattern: '^\\d{5}(?:-\\d{4})?$' },
//         password: { type: 'pattern', pattern: ".{6,20}" }, // Example postal code pattern
//         name: {
//             type: 'custom',
//             function: (value) => value.trim().toUpperCase() // Example transformation
//         }
//     });
//     console.log('Sanitized data:', sanitizedData);
// } catch (error) {
//     console.error('Validation error:', (error.message));
// }
