const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoute");
// const logRoutes = require("./routes/logRoutes"); 
dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use("/employees", employeeRoutes);
app.use("/logs", employeeRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
