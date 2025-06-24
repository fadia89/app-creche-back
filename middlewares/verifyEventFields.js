const verifyEventFields = async (req, res, next) => {

  try {
    const { name, event_date, location, description, duration } = req.body;

    if (!name || !event_date || !location || !description || !duration) {
      return res.status(400).json({
        message: 'All fields (name, event_date , location, description, duration) are required'
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export default verifyEventFields;