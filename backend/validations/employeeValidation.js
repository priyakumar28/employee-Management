const Joi = require("joi");

const employeeValidation = {
  validateEmployee: (employee) => {
    const schema = Joi.object({
      firstName: Joi.string().min(1).max(255).required(),
      lastName: Joi.string().min(1).max(255).required(),     
      age: Joi.number().min(1).max(100).required(),
      position: Joi.string().min(2).max(255).required(),
      department: Joi.string().min(2).max(255).required(),
      address: Joi.string().min(2).max(1000),
      contact: Joi.string().pattern(/^\d{10}$/).required(), 
      email: Joi.string().email().required(),  
      city: Joi.string().min(2).max(255), 
      state: Joi.string().min(2).max(255) ,
      zip: Joi.string().pattern(/^\d{6}$/),
    });

    return schema.validate(employee);
  },
};

module.exports = employeeValidation;
