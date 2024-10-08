/**
 * This function validates input data based on a set of filter rules.
 * 
 * @param {Object} data - The input data to validate. For example:
 * 
 *  @example const data = {
 *      name: "K", // Should fail because the minimum length is 2
 *      age: 17, // Should fail because the minimum age is 18
 *      email: "kalebexample.com", // Should fail because it's not a valid email
 *      isActive: false, // Should fail because it is not true
 *      tags: "not an array", // Should fail because it's not an array
 *      score: 99, // Should fail because it is not exactly 100
 *  };
 * 
 * @param {Object} filters - Validation filters defining the expected data structure and rules. For example:
 * 
 * @example const filters = {
 *      name: { type: "String", required: true, minLength: 2 },
 *      age: { type: "Number", min: 18, max: 65, score: 100 },
 *      email: { type: "String", required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
 *      isActive: { type: "Boolean", value: true },
 *      tags: { type: "Array" },
 *      score: { type: "Number", score: 100 },
 *  };
 * 
 * @returns {Array|null} - An array of error messages if validation fails, or null if validation passes.
 */
export default function validateInput(data, filters) {
    let errors = [];

    // Loop through each data field
    for (let key in data) {
        if (filters.hasOwnProperty(key)) {
            const filter = filters[key];
            const value = data[key];

            switch (filter.type) {
                case "String":
                    // Check if the value is a string
                    if (typeof value !== "string") {
                        errors.push({ field: key, error: `${key} must be a string` });
                    }
                    // Required validation
                    if (filter.required && value.length === 0) {
                        errors.push({ field: key, error: `${key} is required` });
                    }
                    // Minimum length validation
                    if (filter.minLength && value.length < filter.minLength) {
                        errors.push({
                            field: key,
                            error: `${key} must be at least ${filter.minLength} characters long`,
                        });
                    }
                    break;

                case "Number":
                    // Check if the value is a number
                    if (typeof value !== "number") {
                        errors.push({ field: key, error: `${key} must be a number` });
                    }
                    // Minimum value check
                    if (filter.min && value < filter.min) {
                        errors.push({
                            field: key,
                            error: `${key} must be greater than or equal to ${filter.min}`,
                        });
                    }
                    // Maximum value check
                    if (filter.max && value > filter.max) {
                        errors.push({
                            field: key,
                            error: `${key} must be less than or equal to ${filter.max}`,
                        });
                    }
                    // Exact score match check
                    if (filter.score && value !== filter.score) {
                        errors.push({
                            field: key,
                            error: `${key} must be exactly ${filter.score}`,
                        });
                    }
                    break;

                case "Boolean":
                    // Check if the value is a boolean
                    if (typeof value !== "boolean") {
                        errors.push({ field: key, error: `${key} must be a boolean` });
                    }
                    // Exact value check
                    if (filter.value !== undefined && value !== filter.value) {
                        errors.push({
                            field: key,
                            error: `${key} must be ${filter.value}`,
                        });
                    }
                    break;

                case "Array":
                    // Check if the value is an array
                    if (!Array.isArray(value)) {
                        errors.push({ field: key, error: `${key} must be an array` });
                    }
                    // Additional array-specific checks could be added here
                    break;

                default:
                    if (typeof filter === "function") {
                        // Custom validator as a function
                        const error = filter(value);
                        if (error) {
                            errors.push({ field: key, error });
                        }
                    } else if (filter instanceof RegExp) {
                        // Regex pattern validation
                        if (!filter.test(value)) {
                            errors.push({
                                field: key,
                                error: `${key} does not match the required pattern`,
                            });
                        }
                    } else {
                        // Handle unknown validation types
                        errors.push({
                            field: key,
                            error: `Unknown validation type for ${key}`,
                        });
                    }
                    break;
            }
        } else {
            // Unexpected field error
            errors.push({ field: key, error: `Unexpected field: ${key}` });
        }
    }

    // Return errors or null if validation passes
    return errors.length > 0 ? errors : null;
}

// Example usage:

// Example filters
// const filters = {
//     name: { type: "String", required: true, minLength: 2 },
//     age: { type: "Number", min: 18, max: 65, score: 100 },
//     email: { type: "String", required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
//     isActive: { type: "Boolean", value: true },
//     tags: { type: "Array" },
//     score: { type: "Number", score: 100 },
// };

// // Example data
// const data = {
//     name: "K",
//     age: 17, // Should fail as it's less than 18
//     email: "kalebexample.com", // Should fail as it's not a valid email
//     isActive: false, // Should fail as it's not true
//     tags: "not an array", // Should fail because it's not an array
//     score: 99, // Should fail because it's not exactly 100
// };

// // Call validation
// const errors = validateInput(data, filters);

// if (errors) {
//     console.log("Validation failed with errors:", errors);
// } else {
//     console.log("Validation passed!");
// }
