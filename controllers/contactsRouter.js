import Contact from"../models/contact.js";


export const sendMessge = async (req,res) => {
    const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
  }

  try {
    const newMessage = await Contact.create({ name, email, subject, message });
    return res.status(201).json({ message: "Message enregistré avec succès.", data: newMessage });
  } catch (error) {
    console.error("Erreur contact :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};


export const getMessges = async (req,res) => {
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
}