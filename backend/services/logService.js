const db = require("../config/db");

const LogService = {
  addLog: (action, endpoint, details = "") => {
    const sql = "INSERT INTO logs (action, endpoint, details) VALUES (?, ?, ?)";
    db.query(sql, [action, endpoint, details], (err) => {
      if (err) {
        console.error("Error logging action:", err.message);
      }
    });
  },
};

module.exports = LogService;
