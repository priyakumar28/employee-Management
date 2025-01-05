import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../services/employeeService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleDelete = async () => {
    await employeeService.deleteEmployee(deleteId);
    setEmployees(employees.filter((emp) => emp.id !== deleteId));
    setOpenDeleteDialog(false);
  };

  return (
    <div style={{ padding: "20px" }}>
     <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
      >
        <Typography variant="h5" gutterBottom>
          Employee Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/add")}
          style={{
            background: "#9575cd",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          Add Employee
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead sx={{background:"#9575cd"}}>
            <TableRow>
              <TableCell sx={{color:'#ffffff'}}>S.No</TableCell> 
              <TableCell sx={{color:'#ffffff'}}>First name</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Last name</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Age</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Position</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Department</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Contact</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Email</TableCell>
              <TableCell sx={{color:'#ffffff'}}>City</TableCell>
              <TableCell sx={{color:'#ffffff'}}>State</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Zip</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell>{index + 1}</TableCell> 
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.contact}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.city}</TableCell>
                <TableCell>{employee.state}</TableCell>
                <TableCell>{employee.zip}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/view/${employee.id}`)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/edit/${employee.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeleteId(employee.id);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container>
          <Grid item display={'flex'} justifyContent={'flex-start'} pl={3}>
          <Button onClick={() => setOpenDeleteDialog(false)}
           variant="outlined"
          
           style={{ borderColor:'#9575cd', borderRadius:'20px', textTransform:'none', color:'#9575cd' }}
            >Cancel</Button></Grid></Grid>
          <Button
           variant="contained"
           
           style={{ background:'#9575cd', borderRadius:'20px', textTransform:'none', color:'#ffffff'  }}
           onClick={handleDelete} color="#ffffff">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeTable; 