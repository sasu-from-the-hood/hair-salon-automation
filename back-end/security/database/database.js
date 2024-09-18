const { createClient } = require('@supabase/supabase-js');

class Database {
    /**
     * Constructor: Initializes the Supabase client.
     * Supabase is used for database interaction.
     * @example 
     *  await db.insertData('users', { name: 'John', age: 30 });
     *  await db.updateData('users', { name: 'Jane' }, { name: 'John' });
     *  await db.upsertData('users', { id: 1, name: 'John' });
     *  await db.deleteData('users', { name: 'John' });
     *  await db.callPostgresFunction('get_user_by_id', { user_id: 1 });
     */
    constructor() {
        // Create a single supabase client for interacting with your database
        this.supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY);
    }

    /**
     * Fetch data: Selects data from a given table.
     * @param {string} tableName - The name of the table to query.
     * @param {string} selectColumn - The column(s) to select from the table.
     * @returns {Object} - Returns the data, error, and status (true if successful).
     * 
     * Example: 
     * const result = await db.fetchData('users', 'id, name');
     */
    async fetchData(tableName, selectColumn = '*') {
        const { data, error } = await this.supabase
            .from(tableName)
            .select(selectColumn);

        return { data, error, status: !error };
    }

    /**
     * Insert data: Inserts a row into a given table.
     * @param {string} tableName - The name of the table to insert into.
     * @param {Object} row - The data to insert as a new row.
     * @returns {Object} - Returns status (true if successful) and any error.
     * 
     * Example: 
     * const result = await db.insertData('users', { name: 'John', age: 30 });
     */
    async insertData(tableName, row) {
        const { error } = await this.supabase
            .from(tableName)
            .insert(row);

        return { status: !error, error };
    }

    /**
     * Update data: Updates rows in a table where a column equals a given value.
     * @param {string} tableName - The name of the table to update.
     * @param {Object} row - The new data to update the row with.
     * @param {Object} eq - An object containing the column and value to filter the update.
     * @returns {Object} - Returns the status and error.
     * 
     * Example: 
     * const result = await db.updateData('users', { name: 'Jane' }, { name: 'John' });
     */
    async updateData(tableName, row, eq) {
        const { error } = await this.supabase
            .from(tableName)
            .update(row)
            .eq(eq.name, eq.value);

        return { status: !error, error };
    }

    /**
     * Upsert data: Inserts or updates a row in the table.
     * @param {string} tableName - The name of the table to upsert into.
     * @param {Object} row - The data to upsert (insert or update).
     * @returns {Object} - Returns status (true if successful) and any error.
     * 
     * Example: 
     * const result = await db.upsertData('users', { id: 1, name: 'John' });
     */
    async upsertData(tableName, row) {
        const { error } = await this.supabase
            .from(tableName)
            .upsert(row);

        return { status: !error, error };
    }

    /**
     * Delete data: Deletes rows from the table where a condition matches.
     * @param {string} tableName - The name of the table to delete from.
     * @param {Object} eq - The condition for deletion (column and value).
     * @returns {Object} - Returns status (true if successful) and any error.
     * 
     * Example: 
     * const result = await db.deleteData('users', { name: 'John' });
     */
    async deleteData(tableName, eq) {
        const { error } = await this.supabase
            .from(tableName)
            .delete()
            .eq(eq.name, eq.value);

        return { status: !error, error };
    }

    /**
     * Fetch data by value: Selects data from a table where a specific column matches a given value.
     * @param {string} tableName - The name of the table to query.
     * @param {string} column - The column to filter by.
     * @param {string|number} value - The value to match in the column.
     * @param {string} selectColumn - The column(s) to select from the table. Defaults to '*' for all columns.
     * @returns {Object} - Returns the data, error, and status (true if successful).
     * 
     * Example: 
     * const result = await db.fetchDataByValue('users', 'name', 'John',"if exist add the colnum to be selected ");
     */
    async fetchDataByValue(tableName, column, value, selectColumn = '*') {
        const { data, error } = await this.supabase
            .from(tableName)
            .select(selectColumn)
            .eq(column, value);

        return { data, error, status: !error };
    }

    /**
     * Call a Postgres function: Executes a Postgres function and returns the result.
     * @param {string} functionName - The name of the Postgres function to call.
     * @param {Object} params - The parameters to pass to the function.
     * @returns {Object} - Returns the function result and any error.
     * 
     * Example: 
     * const result = await db.callPostgresFunction('get_user_by_id', { user_id: 1 });
     */
    async callPostgresFunction(functionName, params) {
        const { data, error } = await this.supabase
            .rpc(functionName, params);

        return { data, error, status: !error };
    }
}

module.exports = Database;
