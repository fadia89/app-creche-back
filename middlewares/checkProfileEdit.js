
const checkProfileEdit = (req, res, next) => {
  const { address, phone, first_name, last_name, email, password } = req.body;
  const file = req.file;

  const hasModifications =
    (address && address.trim() !== '') ||
    (phone && phone.trim() !== '') ||
    (first_name && first_name.trim() !== '') ||
    (last_name && last_name.trim() !== '') ||
    (email && email.trim() !== '') ||
    (password && password.trim() !== '') ||
    file;

  if (!hasModifications) {
    return res.status(400).json({ message: 'Aucune modification détectée' });
  }

  next(); 
};
export default checkProfileEdit;