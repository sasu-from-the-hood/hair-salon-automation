const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    /**
     * Constructor: Initializes the MySQL connection pool.
     * @example 
     *  await db.insertData('users', { name: 'John', age: 30 });
     *  await db.updateData('users', { name: 'Jane' }, { name: 'John' });
     *  await db.upsertData('users', { id: 1, name: 'John' });
     *  await db.deleteData('users', { name: 'John' });
     */
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async executeQuery(query, params = []) {
        try {
            const [rows] = await this.pool.execute(query, params);
            return { data: rows, error: null, status: true };
        } catch (error) {
            return { data: null, error:  error.message, status: false };
        }
    }

    async fetchData(tableName, selectColumn = '*') {
        const query = `SELECT ${selectColumn} FROM ??`;
        return await this.executeQuery(query, [tableName]);
    }

    async insertData(tableName, row) {
        const columns = Object.keys(row).join(',');
        const placeholders = Object.values(row).map(() => '?').join(',');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        return await this.executeQuery(query, [...Object.values(row)]);
    }

    async updateData(tableName, row, eq) {
        const setClause = Object.keys(row).map(col => `${col} = ?`).join(',');
        const query = `UPDATE ${tableName} SET ${setClause} WHERE ${eq.name} = ?`;
        return await this.executeQuery(query, [...Object.values(row), eq.value]);
    }

    async upsertData(tableName, row) {
        const columns = Object.keys(row).join(',');
        const placeholders = Object.values(row).map(() => '?').join(',');
    
        const updateClause = Object.keys(row)
            .map(col => `${col} = VALUES(${col})`)
            .join(',');
    
        const query = `
            INSERT INTO ${tableName} (${columns}) 
            VALUES (${placeholders})
            ON DUPLICATE KEY UPDATE ${updateClause}
        `;
    
        return await this.executeQuery(query, Object.values(row));
    }
    

    async deleteData(tableName, eq) {
        const query = `DELETE FROM ${tableName} WHERE ${eq.name} = ?`;
        return await this.executeQuery(query, [ eq.value]);
    }

    async fetchDataByValue(tableName, conditions, logicalOperator = 'AND', selectColumn = '*') {
        const whereClause = Object.entries(conditions)
            .map(([col, val]) => `${col} = ?`)
            .join(` ${logicalOperator} `);
        const query = `SELECT ${selectColumn} FROM ${tableName} WHERE ${whereClause}`;
        return await this.executeQuery(query, [ ...Object.values(conditions)]);
    }

    async callPostgresFunction(functionName, params) {
        const placeholders = Object.keys(params).map(() => '?').join(',');
        const query = `CALL ${functionName}(${placeholders})`;
        return await this.executeQuery(query, Object.values(params));
    }

    async service_resources(rows, id) {
        const placeholders = Object.entries(rows).map(() => '(?, ?, ?)').join(', ');
        const values = Object.entries(rows).flatMap(([key, value]) => [id, key, value]);
        const query = `
            INSERT INTO service_resources (service_id, resource_id, quantity)
            VALUES ${placeholders}
        `;
        return await this.executeQuery(query, values);
    }
    
    
    
    
}

module.exports = Database;



// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config()

// class Database {
//     /**
//      * Constructor: Initializes the Supabase client.
//      * Supabase is used for database interaction.
//      * @example 
//      *  await db.insertData('users', { name: 'John', age: 30 });
//      *  await db.updateData('users', { name: 'Jane' }, { name: 'John' });
//      *  await db.upsertData('users', { id: 1, name: 'John' });
//      *  await db.deleteData('users', { name: 'John' });
//      *  await db.callPostgresFunction('get_user_by_id', { user_id: 1 });
//      */
//     constructor() {
//         // Create a single supabase client for interacting with your database
//         this.supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY);
//     }

//     /**
//      * Fetch data: Selects data from a given table.
//      * @param {string} tableName - The name of the table to query.
//      * @param {string} selectColumn - The column(s) to select from the table.
//      * @returns {Object} - Returns the data, error, and status (true if successful).
//      * 
//      * Example: 
//      * const result = await db.fetchData('users', 'id, name');
//      */
//     async fetchData(tableName, selectColumn = '*') {
//         const { data, error } = await this.supabase
//             .from(tableName)
//             .select(selectColumn);

//         return { data, error, status: !error };
//     }

//     /**
//      * Insert data: Inserts a row into a given table.
//      * @param {string} tableName - The name of the table to insert into.
//      * @param {Object} row - The data to insert as a new row.
//      * @returns {Object} - Returns status (true if successful) and any error.
//      * 
//      * Example: 
//      * const result = await db.insertData('users', { name: 'John', age: 30 });
//      */
//     async insertData(tableName, row) {
//         const { error } = await this.supabase
//             .from(tableName)
//             .insert(row);

//         return { status: !error, error };
//     }

//     /**
//      * Update data: Updates rows in a table where a column equals a given value.
//      * @param {string} tableName - The name of the table to update.
//      * @param {Object} row - The new data to update the row with.
//      * @param {Object} eq - An object containing the column and value to filter the update.
//      * @returns {Object} - Returns the status and error.
//      * 
//      * Example: 
//      * const result = await db.updateData('users', { name: 'Jane' }, { name: 'John' });
//      */
//     async updateData(tableName, row, eq) {
//         const { error } = await this.supabase
//             .from(tableName)
//             .update(row)
//             .eq(eq.name, eq.value);

//         return { status: !error, error };
//     }

//     /**
//      * Upsert data: Inserts or updates a row in the table.
//      * @param {string} tableName  The name of the table to upsert into.
//      * @param {Object} row - The data to upsert (insert or update).
//      * @returns {Object} - Returns status (true if successful) and any error.
//      * 
//      * Example: 
//      * const result = await db.upsertData('users', { id: 1, name: 'John' });
//      */
//     async upsertData(tableName, row) {
//         const { error } = await this.supabase
//             .from(tableName)
//             .upsert(row);

//         return { status: !error, error };
//     }

//     /**
//      * Delete data: Deletes rows from the table where a condition matches.
//      * @param {string} tableName - The name of the table to delete from.
//      * @param {Object} eq - The condition for deletion (column and value).
//      * @returns {Object} - Returns status (true if successful) and any error.
//      * 
//      * Example: 
//      * const result = await db.deleteData('users', { name: 'John' });
//      */
//     async deleteData(tableName, eq) {
//         const { error } = await this.supabase
//             .from(tableName)
//             .delete()
//             .eq(eq.name, eq.value);

//         return { status: !error, error };
//     }

//     /**
//      * Fetch data by value: Selects data from a table where a specific column matches a given value.
//      * @param {string} tableName - The name of the table to query.
//      * @param {conditions} contains 
//      * @code {
//             column1: 'value1',
//             column2: 'value2'
//             };
//      * @param {string} selectColumn - The column(s) to select from the table. Defaults to '*' for all columns.
//      * @returns {Object} - Returns the data, error, and status (true if successful).
//      *  @param {logicalOperator} for and or
//      * 
//      * Example: 
//      * const result = await db.fetchDataByValue('users', 'name', 'John',"if exist add the colnum to be selected ");
//      */
//     async fetchDataByValue(tableName, conditions, logicalOperator = "and", selectColumn = '*') {
//         // Start the query with the table name and selected columns
//         let query = this.supabase.from(tableName).select(selectColumn);

//         // Check if conditions is an object with multiple entries
//         if (typeof conditions === 'object' && !Array.isArray(conditions) && conditions !== null) {
//             // Create an array to hold condition strings for OR operator
//             const conditionStrings = [];

//             // Apply multiple conditions if it's an object with key-value pairs
//             for (const [column, value] of Object.entries(conditions)) {
//                 if (logicalOperator !== "and") {
//                     conditionStrings.push(`${column}.eq.${value}`);
//                 } else {
//                     query = query.eq(column, value);
//                 }
//             }

//             // If logical operator is OR, apply conditions together
//             if (conditionStrings.length > 0 && logicalOperator !== "and") {
//                 query = query.or(conditionStrings.join(','));
//             }
//         } else if (Array.isArray(conditions) && conditions.length === 2) {
//             // Handle the single condition case
//             const [column, value] = conditions;
//             query = (logicalOperator !== "and") ? query.or(`${column}.eq.${value}`) : query.eq(column, value);
//         }

//         // Execute the query
//         const { data, error } = await query;

//         return { data, error, status: !error };
//     }


//     /**
//      * Call a Postgres function: Executes a Postgres function and returns the result.
//      * @param {string} functionName - The name of the Postgres function to call.
//      * @param {Object} params - The parameters to pass to the function.
//      * @returns {Object} - Returns the function result and any error.
//      * 
//      * Example: 
//      * const result = await db.callPostgresFunction('get_user_by_id', { user_id: 1 });
//      */
//     async callPostgresFunction(functionName, params) {
//         const { data, error } = await this.supabase
//             .rpc(functionName, params);

//         return { data, error, status: !error };
//     }
// }

// module.exports = Database;
