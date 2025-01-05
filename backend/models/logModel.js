const db = require("../config/db");

const LogModel = {
  getAllLogs: (callback) => {
    const sql = "SELECT * FROM logs"; 
    db.query(sql, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};

module.exports = LogModel;
