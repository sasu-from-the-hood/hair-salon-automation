require("dotenv").config();
const express = require("express");
const path = require("path");
const authenticateJWT = require("./security/jwt");
const port = process.env.PORT || 5001;
const cors = require("cors");

// importing route from there js file
const {
  loginRoute,
  registerRoute,
  oauthRoute,
  callback,
  forgetpassword,
  verifyEmail,
  resetpassword,
} = require("./oauth/user_login_regester");
const {
  DeleteTable,
  resourceSetterRoute,
  servceSetterRoute,
  employsetterRoute,
  updateResoureRoute,
  updateServceRoute,
  updateEmployRoute,
} = require("./adminRoutes/setter/adminRouteSetter");

const expressapp = express();

expressapp.use(cors());
expressapp.use(express.json());

// Uncomment for serving static files
// expressapp.use(express.static(path.join(__dirname, 'build')));

// Define routes imported
expressapp.use("/login", loginRoute);
expressapp.use("/register", registerRoute);
expressapp.use("/oauth", oauthRoute);
expressapp.use("/oauth/google/callback", callback);
expressapp.use("/forgetPassword", forgetpassword);
expressapp.use("./verifyEmail", verifyEmail);
expressapp.use("./resetpassword", resetpassword);

// admin routes
expressapp.use("/setresource", resourceSetterRoute);
expressapp.use("/setservce", servceSetterRoute);
expressapp.use("/setemploy", employsetterRoute);
expressapp.use("/updateResource", updateResoureRoute);
expressapp.use("/updateServce", updateServceRoute);
expressapp.use("/updateEmploy", updateEmployRoute);
expressapp.use("/delete", DeleteTable);

//  Define routes created here
expressapp.get("/admin", (req, res) => {
  res.json({
    woo: 223,
  });
});

expressapp.get("/home", (req, res) => {
  res.json({
    woo: 223,
  });
});

// Error handling middleware
expressapp.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "something wrong in our end  refresh the page " });
});

//connect to database

const connection = mysql.createConnection({
  user: "item_Reg",
  password: "123456789",
  host: "localhost",
  database: "item_Reg",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("connected to mysql");
});

// Create table if not exists
app.get("/table-created", (req, res) => {
  let item_table = `CREATE TABLE IF NOT EXISTS Item (
    ID INT NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Amount INT NOT NULL,
    Usage_amount INT NOT NULL
  );`;

  connection.query(item_table, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating table");
    } else {
      console.log("Table created successfully");
      res.send("Table created successfully");
    }
  });
});

// Fetch all items
app.get("/listItem", (req, res) => {
  const query = "SELECT * FROM Item";
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching items");
    } else {
      res.json(results);
    }
  });
});

// Insert a new item
app.post("/insertItem", (req, res) => {
  const { ID, Name, Amount, Usage_amount } = req.body;

  let insert_item = `INSERT INTO Item (ID, Name, Amount, Usage_amount) VALUES (?, ?, ?, ?)`;
  connection.query(insert_item, [ID, Name, Amount, Usage_amount], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting data");
    } else {
      console.log("Data inserted successfully");
      res.send("Data inserted");
    }
  });
});

// Start the server
expressapp.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
