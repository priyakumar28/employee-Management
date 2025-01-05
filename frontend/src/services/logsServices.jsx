import axios from "axios";

const API_URL = "http://localhost:5000/logs/log";

const logsService = {
    getAllLogs: () => axios.get(API_URL)
  .then(res => res.data),


};

export default logsService;
