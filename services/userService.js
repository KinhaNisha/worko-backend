const userDao = require('../daos/userDao');
const { validateUser, validateUserId } = require('../dtos/userDto');

const createUser = async (userData) => {
  const { error } = validateUser(userData);
  if (error) throw new Error(error.details[0].message);
  return await userDao.createUser(userData);
};

const getUserById = async (id) => {
  const { error } = validateUserId({ id });
  if (error) throw new Error(error.details[0].message);
  return await userDao.getUserById(id);
};

const getAllUsers = async () => {
  return await userDao.getAllUsers();
};

const updateUser = async (id, userData) => {
  const { error } = validateUserId({ id });
  if (error) throw new Error(error.details[0].message);
  return await userDao.updateUser(id, userData);
};

const softDeleteUser = async (id) => {
  const { error } = validateUserId({ id });
  if (error) throw new Error(error.details[0].message);
  return await userDao.softDeleteUser(id);
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, softDeleteUser };
