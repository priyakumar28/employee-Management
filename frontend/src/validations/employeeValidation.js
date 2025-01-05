import * as yup from "yup";

const employeeValidationSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z\s]{1,50}$/, "First name must contain only letters and spaces")
    .required("First name is required"),
    lastName: yup
    .string()
    .matches(/^[A-Za-z\s]{1,50}$/, "Last name must contain only letters and spaces")
    .required("Last name is required"),
  age: yup
    .string()
    .matches(/^(?:[1-9]|[1-9][0-9]|100)$/, "Age must be a number between 1 and 100")
    .required("Age is required"),

  position: yup
    .string()
    .matches(/^[A-Za-z\s\-]+$/, "Position can only contain letters.")
    .required("Position is required"),

  department: yup
    .string()
    .matches(/^[A-Za-z0-9\s]{1,30}$/, "Department dosen't allow special characters")
    .required("Department is required"),

  
  address: yup
    .string()
    .min(1)
    .max(500),

  contact: yup
    .string()
    .matches(/^\d{10}$/, "Contact must be a 10-digit number")
    .required("Contact number is required"),

  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),

  city: yup
    .string()
    .matches(/^[A-Za-z\s\-]{2,50}$/, "City dosen't allow special characters")
    .required("City is required"),

  state: yup
    .string()
    .matches(/^[A-Za-z\s\-]{2,50}$/, "State dosen't allow special characters")
    .required("State is required"),
    zip: yup
    .string()
   .matches(/^\d{6}$/, "zip must be a 6-digit number")
    .required("zip is required"),
});

export default employeeValidationSchema;
