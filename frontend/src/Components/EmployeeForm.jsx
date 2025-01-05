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
