const db = require("../config/db");

const EmployeeModel = {
  getAllEmployees: (callback) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, callback);
  },
  getEmployeeById: (id, callback) => {
    const sql = "SELECT * FROM employees WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null); 
      }
      if (results.length > 0) {
       
        callback(null, results[0]);
      } else {
       
        callback(null, null);
      }
    });
  },
  
 
  addEmployee: (employee, callback) => {
    const sql = `INSERT INTO employees (firstName, lastName, age, contact, email,position, department, address, city, state, zip) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [employee.firstName, employee.lastName, employee.age, employee.contact, employee.email, employee.position, employee.department, employee.address, employee.city, employee.state, employee.zip],
      callback
    );
  },
  updateEmployee: (id, employee, callback) => {
    const sql = `UPDATE employees 
                 SET firstName = ?,lastName = ?, age = ?, position = ?, department = ?, address = ?, contact = ?, email = ?, city = ?, state = ? , zip = ?
                 WHERE id = ?`;
    db.query(
      sql,
      [employee.firstName, employee.lastName, employee.age, employee.position, employee.department, employee.address, employee.contact, employee.email, employee.city, employee.state,  employee.zip, id],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        if (result.affectedRows > 0) {
          callback(null, { id, ...employee }); 
        } else {
          callback(null, null);  
        }
      }
    );
  },
  deleteEmployee: (id, callback) => {
    const sql = "DELETE FROM employees WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = EmployeeModel;
