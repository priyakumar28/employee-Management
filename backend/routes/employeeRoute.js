const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const LogController = require("../controllers/logController");

router.get("/log", LogController.getAllLogs);  
router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.post("/", EmployeeController.addEmployee);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
