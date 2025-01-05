const LogModel = require("../models/logModel");

const LogController = {
  getAllLogs: (req, res) => {
    LogModel.getAllLogs((err, results) => {
      if (err) {
        console.error("Error fetching logs:", err);
        res.status(500).json({ error: "Error fetching logs" });
      } else {
        res.json(results);  
      }
    });
  },
};

module.exports = LogController;
