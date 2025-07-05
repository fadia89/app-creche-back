import User from '../models/users.js';
import bcrypt from 'bcryptjs';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length < 1) {
      return res.status(404).json({ message: 'No user found' });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' })
  }
};

export const getUserByID = async (req, res) => {
  console.log(req.params)
  const { id } = req.params
  try {
    const userByID = await User.findByPk(id);
    if (!userByID) {
      return res.status(404).json({ message: 'user not found' })
    }
    return res.status(200).json(userByID);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' })
  }
};



export const getUsersByRole = async (req, res) => {
  const { role } = req.params;


  if (role !== 'admin' && role !== 'parent') {
    return res.status(400).json({ message: 'The role must be "admin" or "parent"' });
  }

  try {

    const users = await User.findAll({ where: { role } });


    if (users.length < 1) {
      return res.status(404).json({ message: 'No users found with this role' });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//To retrieve multiple users based on a list of IDs provided in the request body for React Admin.
export const getManyUsers = async (req, res) => {

  try {
    const { ids } = req.body;
    const users = await User.findAll({
      where: {
        id: ids
      }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//to create a new user for React Admin
export const addUser = async (req, res) => {
  let { first_name, last_name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({ first_name, last_name, email, password: hashedPassword, role });
    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const userByID = await User.findByPk(id);
    if (!userByID) {
      return res.status(404).json({ messages: 'User not found' });
    }
    await userByID.destroy({ where: { id } });
    return res.status(200).json({ messages: 'User successfully deleted' })

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' });
  }

};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const userByID = await User.findByPk(id);
    if (!userByID) {
      return res.status(404).json({ messages: 'User not found' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const updatedUser = await userByID.update({
      first_name: first_name || userByID.first_name,
      last_name: last_name || userByID.last_name,
      email: email || userByID.email,
      password: hashedPassword || userByID.password,
      role: role || userByID.role,
      image: req.file ? `/public/images` + req.file.filename : userByID.image
    });
    return res.status(200).json(updatedUser);

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





