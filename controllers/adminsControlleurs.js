
import User from "../models/users.js";

//// Fetch all users with the role 'admin' and return selected attributes for React Admin
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({
      where: { role: 'admin' },
      attributes: ['id', 'first_name', 'last_name', 'email']
    });

    if (admins.length === 0) {
      return res.status(404).json({ message: 'No admins found' });
    }

    return res.status(200).json(admins);
  } catch (err) {
    console.error('Error fetching admins:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//fetch multiple admin users by their IDs for React Admin
export const getAdminsMany = async (req, res) => {
  try {
    const { ids } = req.body;
    // Check if 'ids' is an array; return 400 error if not
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: 'IDs must be an array' });
    }
    const admins = await User.findAll({ where: { id: ids } });

    return res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
