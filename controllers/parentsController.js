
import Children from '../models/childrens.js';
import Parent from '../models/parents.js';
import User from '../models/users.js';


export const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email'],
        },
        {
          model: Children,
          attributes: ['first_name', 'last_name']
        }
      ],
    });

    return res.status(200).json(parents);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getParentProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Parent,
          as: 'parentDetails',
          attributes: ['id', 'address', 'phone'],
        }
      ],
      // Exclude sensitive fields like 'password' and 'role' from the query result for security and privacy.
      attributes: { exclude: ['password', 'role'] }
    });

    console.log('USER FROM DB ===>', JSON.stringify(user, null, 2));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const parentProfile = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image,
      address: user.parentDetails?.address || '',
      phone: user.parentDetails?.phone || '',
      parent: user.parentDetails || null,
      isParent: !!user.parentDetails
    };

    return res.status(200).json(parentProfile);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
//Pour récupérer plusieurs parents par leurs identifiants for React Admin.
export const getManyParent = async (req, res) => {
  try {
    const { ids } = req.body;

    const parent = await Parent.findAll({
      where: { id: ids }
    });
    res.status(200).json(parent);
  } catch (error) {
    console.error("Error in getManyParent :", error);
    res.status(500).json({ message: "Internal server error." });
  }
};




export const getParentsByID = async (req, res) => {
  const { id } = req.params;

  try {
    const parentByID = await Parent.findByPk(id);
    if (!parentByID) {
      return res.status(404).json({ message: 'Parent not found' });
    }
    return res.status(200).json(parentByID);

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });

  }

};

export const updateProfile = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({ message: "Missing ID" });
  }
  const { address, phone, first_name, last_name, email, password } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;

  try {
    const parent = await Parent.findOne({
      where: { user_id: id },
      include: [{ model: User, as: 'user' }]
    });

    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    const user = parent.user;
    if (!user) return res.status(404).json({ message: 'Associated user not found' });

    // Check that at least one field is different
    const isModified =
      (address && address !== parent.address) ||
      (phone && phone !== parent.phone) ||
      (first_name && first_name !== user.first_name) ||
      (last_name && last_name !== user.last_name) ||
      (email && email !== user.email) ||
      (password && password !== user.password) ||
      (image && image !== user.image);

    if (!isModified) {
      return res.status(400).json({ message: 'No changes detected.' });
    }

    // Update only modified fields
    await parent.update({
      ...(address ? { address } : {}), //... decomposes one object into another, to only update fields that have a value and avoid overwriting with null or undefined.
    });

    await user.update({
      ...(first_name ? { first_name } : {}),
      ...(last_name ? { last_name } : {}),
      ...(email ? { email } : {}),
      ...(password ? { password } : {}),
      ...(image ? { image } : {}),
    });

    return res.status(200).json({ message: 'Profile successfully updated', parent });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateParent = async (req, res) => {
  const { id } = req.params;
  const { address, phone, user_id } = req.body;

  try {
    const parent = await Parent.findByPk(id);
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const updatedParent = await parent.update({
      address: address || parent.address,
      phone: phone || parent.phone,

    });
    return res.status(200).json(updatedParent);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const deleteParentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const parentByID = await Parent.findByPk(id);
    if (!parentByID) {
      return res.status(404).json({ messages: 'Parent not found' });
    }
    await parentByID.destroy({ where: { id } });
    return res.status(200).json({ messages: 'Parent successfully deleted' })

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createParent = async (req, res) => {
  const { address, phone, user_id } = req.body;
  try {
    const newParent = await Parent.create({
      address,
      phone,
      user_id,
    });
    return res.status(201).json(newParent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};