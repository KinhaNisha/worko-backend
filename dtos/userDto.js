const Joi = require('joi');

const validateUser = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().pattern(/^[0-9]{5}$/).required(),
  });
  return schema.validate(userData);
};

const validateUserId = (id) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(id);
};

module.exports = { validateUser, validateUserId };
