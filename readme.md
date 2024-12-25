# Hair Salon Automation System

This project provides a complete backend system for managing a hair salon, including admin management, user authentication, appointment scheduling, and resource tracking.

---

## Steps to Set Up and Run the Project

### 1. **Clone the Git Repository**
Start by cloning the repository to your local machine:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your Git repository.

---

### 2. **Navigate to the Backend Directory**
Go to the backend directory where the migration script and backend configuration are located:

```bash
cd hair-salon-automation/back-end
```

---

### 3. **Install Dependencies**
Ensure that you have Node.js and npm installed on your system. Then, install the required Node.js dependencies:

```bash
npm install
```

---

### 4. **Configure Environment Variables**
Create a `.env` file in the `back-end` directory and provide the necessary environment variables, such as:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=****(ask cala)
```

Replace the values with your actual database credentials.

---

---

### 5.add the  DB_NAME=****(ask cala) ****
Then  add OR create the DB_Name in the mysql (phpadmin) create it frist then go to step 6

---

### 6. **Run Database Migration Script**
To set up the database schema, execute the migration script:

```bash
node utils/migration.js
```

This script will:
1. Create the database if it does not already exist.
2. Drop all existing tables (if any).
3. Reapply the database schema as defined in the SQL script.

---

### 7. **Start the Backend Server**
After the database has been successfully set up, start the backend server:

```bash
npm start
```

The backend server should now be running and accessible at the configured port (default: `http://localhost:3000`).



## Notes
- Ensure MySQL is running and properly configured before executing the migration script.
- If any errors occur during migration, check the `.env` file, database configuration, and logs for details.

Enjoy using the Hair Salon Automation System! 🚀