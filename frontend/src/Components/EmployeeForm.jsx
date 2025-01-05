// import React, { useEffect } from "react";
// import { useForm , FormProvider} from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
// import employeeService from "../services/employeeService";
// import employeeValidationSchema from "../validations/employeeValidation";
// import { TextField, Button, Typography,Grid,Box,Container } from "@mui/material";

// const EmployeeForm = ({ isEditMode }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(employeeValidationSchema),
//   });

//   useEffect(() => {
//     if (isEditMode) {
//       const fetchEmployee = async () => {
//         try {
//           const data = await employeeService.getEmployeeById(id);
         
//           if (data) {
           
//             reset({
//               firstName: data.firstName || "",
//             lastName: data.lastName || "",
//             age: data.age || "",
//             position: data.position || "",
//             department: data.department || "",
//             address: data.address || "",
//             contact: data.contact || "",
//             email: data.email || "",
//             city: data.city || "",
//             state: data.state || "",
//             zip: data.zip || "",
//             });
//           } else {
//             console.error("No data found for the employee ID.");
//           }
//         } catch (error) {
//           console.error("Error fetching employee data:", error);
//         }
//       };
//       fetchEmployee();
//     }
//   }, [isEditMode, id, reset]);
  
//   const handleClose = () => {
//     navigate("/"); 
//   };
//   const onSubmit = async (formData) => {
//     console.log(formData);
    
//     if (isEditMode) {
//       await employeeService.updateEmployee(id, formData);
//     } else {
//       await employeeService.addEmployee(formData);
//       console.log(formData);
      
//     }
//     navigate("/");
//   };

//   return (
//     <Container
//     maxWidth="sm"
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "80vh",
//       backgroundColor: "#9575cd",
//       padding: 2,
//       borderRadius: 2,
//       mt:2
//     }}
//   >
//     <Box
//       sx={{
//         width: "100%",
//         bgcolor: "white",
//         boxShadow: 3,
//         borderRadius: "12px",
//         padding: 4,
       
//       }}
//     >
//       <Typography variant="h6"  marginBottom={3}>
//         {isEditMode ? "Edit" : "Add"} Employee
//       </Typography>
//       <FormProvider {...register}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="First Name"
//               {...register("firstName")}
//               error={!!errors.firstName}
//               helperText={errors.firstName?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Last Name"
//               {...register("lastName")}
//               error={!!errors.lastName}
//               helperText={errors.lastName?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Contact"
//               {...register("contact")}
//               error={!!errors.contact}
//               helperText={errors.contact?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Email"
//               {...register("email")}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Position"
//               {...register("position")}
//               error={!!errors.position}
//               helperText={errors.position?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Department"
//               {...register("department")}
//               error={!!errors.department}
//               helperText={errors.department?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Address"
//               {...register("address")}
//               error={!!errors.address}
//               helperText={errors.address?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="City"
//               {...register("city")}
//               error={!!errors.city}
//               helperText={errors.city?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="State"
//               {...register("state")}
//               error={!!errors.state}
//               helperText={errors.state?.message}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               size="small"
//               label="ZIP"
//               {...register("zip")}
//               error={!!errors.zip}
//               helperText={errors.zip?.message}
//             />
//           </Grid>
//         </Grid>
//         <Box display="flex" justifyContent="space-between" marginTop={4}>
//         <Button
//             variant="outlined"
//             onClick={handleClose}
//             sx={{
//               borderRadius: "20px",
//               paddingX: 4,
//               textTransform: "capitalize",
//               borderColor: "#9575cd",
//               color: "#9575cd",
//             }}
//           >
//             Close
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
            
//             sx={{
//               borderRadius: "20px",
//               paddingX: 4,
//               textTransform: "capitalize",
//               background:"#9575cd"
//             }}
//           >
            
//             {isEditMode ? "Update" : "Submit"}
//           </Button>
         
//         </Box>
//       </form></FormProvider>
//     </Box>
//   </Container>
// );
// };

// export default EmployeeForm;

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid, Typography, Container, Box } from '@mui/material';
import employeeService from '../services/employeeService';

const EmployeeForm = () => {
  const { id } = useParams(); 
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      
      const fetchEmployee = async () => {
        const employee = await employeeService.getEmployeeById(id);
      
        setValue('firstName', employee.firstName);
        setValue('lastName', employee.lastName);
        setValue('age', employee.age);
        setValue('position', employee.position);
        setValue('department', employee.department);
        setValue('contact', employee.contact);
        setValue('email', employee.email);
        setValue('address', employee.address);
        setValue('city', employee.city);
        setValue('state', employee.state);
        setValue('zip', employee.zip);

      };
      fetchEmployee();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (id) {
     
      await employeeService.updateEmployee(id, data);
    } else {
      
      await employeeService.addEmployee(data);
    }
   
    navigate('/');
  };
  const handleClose = () => {
        navigate("/"); 
      };
  return (
    <Container
       maxWidth="sm"
       sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         minHeight: "80vh",
         backgroundColor: "#9575cd",
         padding: 2,
         borderRadius: 2,
         mt:2
       }}
     >
       <Box
         sx={{
           width: "100%",
           bgcolor: "white",
           boxShadow: 3,
           borderRadius: "12px",
           padding: 4,
           
         }}
       >
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Employee' : 'Add Employee'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              size='small'
              {...register('firstName', { required: 'First Name is required' })}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Last Name"
              {...register('lastName', { required: 'Last Name is required' })}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Age"
              {...register('age', {
                required: 'Age is required',
                valueAsNumber: true,
                min: { value: 18, message: 'Age must be at least 18' },
              })}
              error={!!errors.age}
              helperText={errors.age ? errors.age.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Position"
              {...register('position', { required: 'Position is required' })}
              error={!!errors.position}
              helperText={errors.position ? errors.position.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Department"
              {...register('department', { required: 'Department is required' })}
              error={!!errors.department}
              helperText={errors.department ? errors.department.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Contact"
              {...register('contact', { required: 'Contact is required' , 
                pattern:{value: /^\d{10}$/, message: "Contact must be a 10-digit number"}})}
              
              error={!!errors.contact}
              helperText={errors.contact ? errors.contact.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email format' },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="Address"
              {...register('address')}
              error={!!errors.address}  
              helperText={errors.address ? errors.address.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="City"
              {...register('city')}
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="State"
              {...register('state')}
              error={!!errors.state}
              helperText={errors.state ? errors.state.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              label="zip"
              {...register('zip')}
              error={!!errors.zip}
              helperText={errors.zip ? errors.zip.message : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" marginTop={4}>
         <Button
             variant="outlined"
             onClick={handleClose}
             style={{ marginTop: '20px',borderColor:'#9575cd', borderRadius:'20px', textTransform:'none', color:'#9575cd' }}
           >
             Close
           </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px',background:'#9575cd', borderRadius:'20px', textTransform:'none' }}
        >
          {id ? 'Update' : 'Submit'}
        </Button>
        </Box>
      </form>
    </Box></Container>
  );
};

export default EmployeeForm;
