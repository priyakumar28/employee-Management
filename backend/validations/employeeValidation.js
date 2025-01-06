const Joi = require("joi");

const employeeValidation = {
  validateEmployee: (employee) => {
    const schema = Joi.object({
      firstName: Joi.string().min(1).max(255).required(),
      lastName: Joi.string().min(1).max(255).required(),     
      age: Joi.number().min(1).max(100).required(),
      position: Joi.string().min(2).max(255),
      department: Joi.string().min(2).max(255),
      address: Joi.string().min(2).max(1000),
      contact: Joi.string().pattern(/^\d{10}$/), 
      email: Joi.string().email(),  
      city: Joi.string().min(2).max(255), 
      state: Joi.string().min(2).max(255) ,
      zip: Joi.string(),
    });

    return schema.validate(employee);
  },
};

module.exports = employeeValidation;
