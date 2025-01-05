import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import employeeService from "../services/employeeService";
import { Card, CardContent, Typography, Grid, Box, Container , Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
const EmployeeView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getEmployeeById(id);
        console.log("Fetched Employee:", data);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;
  const handleClose = () => {
    navigate("/"); 
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        backgroundColor: "#9575cd",
        padding: "20px",
        marginTop:'20px',
        width:'90vh',
        borderRadius:'20px'
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          height:'80%'
        }}
      >
        <Typography variant="h5"  gutterBottom>
          Employee Details
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            {[
              { label: "First Name", value: employee.firstName },
              { label: "Last Name", value: employee.lastName },
              { label: "Email", value: employee.email },
              { label: "Contact", value: employee.contact },
              { label: "Position", value: employee.position },
              { label: "Department", value: employee.department },
              { label: "Address", value: employee.address },
              { label: "City", value: employee.city },
              { label: "State", value: employee.state },
              { label: "Zip Code", value: employee.zip },
            ].map((field, index) => (
              <Grid item xs={6} key={index} display={'flex'}  sx={{ gap: 1, alignItems: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {field.label}:
                </Typography>
                <Typography> { field.value || "N/A"}</Typography>
              </Grid>
            ))}
          <Grid item xs={12}>  
          <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end", 
      marginTop: 2, 
    }}
  >
            <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderRadius: "20px",
              paddingX: 4,
              textTransform: "capitalize",
              borderColor: "#9575cd",
              color: "#9575cd",
            }}
          >
            Close
          </Button>
          </Box>
          </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeeView;