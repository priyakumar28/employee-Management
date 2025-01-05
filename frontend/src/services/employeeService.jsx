import axios from "axios";

const API_URL = "http://localhost:5000/employees";

const employeeService = {
  getAllEmployees: () => axios.get(API_URL)
  .then(res => res.data),

  getEmployeeById: (id) => axios.get(`${API_URL}/${id}`)
  .then(res => res.data),

  addEmployee: (employeeData) => axios.post(API_URL, employeeData)
  .then(res => res.data)
  .catch(error => {
    console.error("Error add employee:", error);
    throw error;
  }),

  updateEmployee: (id, employeeData) => axios.put(`${API_URL}/${id}`, employeeData)
  .then(res => res.data)
  .catch(error => {
    console.error("Error updating employee:", error);
    throw error;
  }),
  deleteEmployee: (id) => axios.delete(`${API_URL}/${id}`),
};

export default employeeService;
