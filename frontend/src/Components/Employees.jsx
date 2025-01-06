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
Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
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
const columns = [
    { field: "id", headerName: "S.No", width: 90 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "age", headerName: "Age", width: 90 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 120 },
    { field: "zip", headerName: "Zip", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",

      width: 180,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => navigate(`/view/${params.row.id}`)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => navigate(`/edit/${params.row.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteId(params.row.id);
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ),
    },
  ];
  const rows = employees.map((employee, index) => ({
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    age: employee.age,
    position: employee.position,
    department: employee.department,
    contact: employee.contact,
    email: employee.email,
    city: employee.city,
    state: employee.state,
    zip: employee.zip,
  }));
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
     <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowHeight={40}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        slots={{
          toolbar: () => (
            <GridToolbarContainer
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                fontSize: "12px",
                textTransform: "none",
                fontFamily: "Poppins",
                color: "#9575cd",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, marginLeft: "6px" }}>
                <GridToolbarColumnsButton
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    color: "#9575cd !important",
                    "&:hover": {
                      backgroundColor: "#e1bee7 !important",
                    },
                  }}
                />
                <GridToolbarFilterButton
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    color: "#9575cd !important",
                    "&:hover": {
                      backgroundColor: "#e1bee7 !important",
                    },
                  }}
                />
                <GridToolbarDensitySelector
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    color: "#9575cd !important",
                    "&:hover": {
                      backgroundColor: "#e1bee7 !important",
                    },
                  }}
                />
                <GridToolbarExport
                  sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    color: "#9575cd !important",
                    "&:hover": {
                      backgroundColor: "#e1bee7 !important",
                    },
                  }}
                />
              </Box>
              <GridToolbarQuickFilter
                className="typography12px"
                sx={{
                  padding: "5px",
                  textTransform: "none",
                  "& .MuiInputBase-root": {
                    border: "2px solid #e0e0e0",
                    borderRadius: "4px",
                    padding: "2px 8px",
                  },
                  color: "#9575cd !important",
                }}
              />
            </GridToolbarContainer>
          ),
        }}
        sx={{
          width: "100%",
          height: "500px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#9575cd",
            borderBottom: "1px solid #ddd",
            minHeight: "40px !important",
            height: "40px !important",
            padding: "0 !important",
            borderRadius: "10px !important",
            display: "flex",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
            fontSize: "12px !important",
            textAlign: "center !important",
            textTransform: "capitalize !important",
            padding: "0 !important",
          },
          "& .MuiDataGrid-checkboxInput": {
            height: "20px !important",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "12px !important",
          },
          "& .MuiDataGrid-toolbarContainer": {
            fontSize: "12px !important",
            "& .MuiTypography-root": {
              textTransform: "capitalize !important",
              height: "40px !important",
            },
          },
          "& .MuiTablePagination-root": {
            fontSize: "12px !important",
            display: "flex !important",
            alignItems: "center !important",
            "& .MuiTablePagination-actions": {
              display: "flex !important",
              alignItems: "center !important",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: "12px !important",
                display: "flex !important",
                alignItems: "center !important",
              },
          },
          "& .MuiInputBase-root": {
            fontSize: "12px !important",
            display: "flex !important",
            alignItems: "center !important",
            height: "32px !important",
            paddingTop: "0 !important",
            paddingBottom: "0 !important",
            marginBottom: "7px",
          },
          "& .MuiSelect-select": {
            fontSize: "12px !important",
          },
          ".highlight-yellow": {
            backgroundColor: "#FFF6D7",
          },
          ".highlight-yellow:hover, .highlight-yellow:focus": {
            backgroundColor: "#FFF6D7 !important",
          },
          ".highlight-red": {
            backgroundColor: "rgba(255, 116, 68, 0.25)",
          },
          ".highlight-red:hover, .highlight-red:focus, .highlight-red.Mui-selected, .highlight-red.Mui-selected:hover, .highlight-red.Mui-selected:focus":
            {
              backgroundColor: "rgba(255, 116, 68, 0.25) !important",
            },
        }}
      />
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
