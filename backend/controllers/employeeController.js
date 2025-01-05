const EmployeeModel = require("../models/employeeModel");
const { validateEmployee } = require("../validations/employeeValidation");
const LogService = require("../services/logService");

const EmployeeController = {
  getAllEmployees: (req, res) => {
    EmployeeModel.getAllEmployees((err, results) => {
      if (err) {
        console.error(`Error fetching employees: ${err.message}`);
        res.status(500).json({ error: "Error fetching employees" });
      } else {
        // LogService.addLog("READ", "/employees", "Fetched all employees");
        res.json(results);
      }
    });
  },

  getEmployeeById: (req, res) => {
    const id = req.params.id;
    EmployeeModel.getEmployeeById(id, (err, result) => {
      if (err) {
        console.error(`Error fetching employee details: ${err.message}`);
        res.status(500).json({ error: "Error fetching employee details" });
      } else if (result) {
        // LogService.addLog("READ", `/employees/${id}`, `Fetched employee with ID ${id}`);
        res.json(result);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    });
  },

  addEmployee: (req, res) => {
    const { error } = validateEmployee(req.body);
    if (error) {
      console.error(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    EmployeeModel.addEmployee(req.body, (err, result) => {
      if (err) {
        console.error(`Error adding employee: ${err.message}`);
        res.status(500).json({ error: "Error adding employee" });
      } else {
        LogService.addLog("CREATE", "/employees", `Added employee: ${JSON.stringify(req.body)}`);
        res.json({ id: result.insertId, ...req.body });
      }
    });
  },

  updateEmployee: (req, res) => {
    const id = req.params.id;
    const { error } = validateEmployee(req.body);

    if (error) {
      console.error(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    EmployeeModel.updateEmployee(id, req.body, (err, result) => {
      if (err) {
        console.error(`Error updating employee: ${err.message}`);
        res.status(500).json({ error: "Error updating employee" });
      } else if (result) {
        LogService.addLog("UPDATE", `/employees/${id}`, `Updated employee: ${JSON.stringify(req.body)}`);
        res.json(result);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    });
  },

  deleteEmployee: (req, res) => {
    const id = req.params.id;
    EmployeeModel.deleteEmployee(id, (err) => {
      if (err) {
        console.error(`Error deleting employee: ${err.message}`);
        res.status(500).json({ error: "Error deleting employee" });
      } else {
        LogService.addLog("DELETE", `/employees/${id}`, `Deleted employee with ID ${id}`);
        res.json({ message: "Employee deleted" });
      }
    });
  },
};

module.exports = EmployeeController;
