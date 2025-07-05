import Contact from "../models/contact.js";


export const sendMessge = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All required fields must be completed.." });
  }

  try {
    // Create a new contact message entry in the database
    const newMessage = await Contact.create({ name, email, subject, message });
    return res.status(201).json({ message: "Message saved successfully", data: newMessage });
  } catch (error) {
    console.error("Erreur contact :", error);
    return res.status(500).json({ message: "Internal server error'." });
  }
};

// For React Admin
export const getMessges = async (req, res) => {
  try {
    const messages = await Contact.findAll();

    if (messages.length < 1) {
      return res.status(404).json({ message: 'No message found' });
    }

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMessge = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.destroy();
    return res.status(200).json({ message: 'Contact deleted successfully' });

  } catch (err) {
    console.error( err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

