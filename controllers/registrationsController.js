import Registration from '../models/registrations.js';
import Children from '../models/childrens.js';
import User from '../models/users.js';
import Parent from '../models/parents.js';

export const getAllRegistations = async (req, res) => {
    try {
        const registrations = await Registration.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['first_name', 'last_name'],
                },
                {
                    model: Children,
                    attributes: ['first_name', 'last_name'],
                }
            ],
        });

        /*  if (registrations.length < 1) {
             return res.status(404).json({ message: 'No registation found' });
         }
          */
        return res.status(200).json(registrations);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getRegistationByID = async (req, res) => {
    const { id } = req.params;

    try {
        const registration = await Registration.findByPk(id);

        if (!registration) {
            return res.status(404).json({ message: 'No child is registered with this ID' });
        }

        return res.status(200).json(registration);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export const addRegistration = async (req, res) => {
    try {
        const { parent_id, children_id } = req.body;

        // Retrieve the parent
        const parent = await Parent.findOne({ where: { id: parent_id } });

        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        const user_id = parent.user_id;

        // Create the registration
        const newRegistration = await Registration.create({
            registration_date: new Date(),
            status: 'pending',
            parent_id,
            children_id,
            user_id
        });

        res.status(201).json(newRegistration);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRegistration = async (req, res) => {
    const { id } = req.params;
    const { registration_date, status, parent_id, children_id } = req.body;
    const allowedStatuses = ['pending', 'accepted', 'rejected'];
    // Validate that the provided status is one of the allowed values.
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const registration = await Registration.findByPk(id);

        if (!registration) {

            return res.status(404).json({ message: 'Registration not found' });
        }

        const updatedRegistration = await registration.update({
            registration_date,
            status,
            parent_id,
            children_id
        });
        return res.status(200).json(updatedRegistration);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteRegistration = async (req, res) => {
    const { id } = req.params;

    try {

        const registation = await Registration.findByPk(id);

        if (!registation) {
            return res.status(404).json({ message: 'Registation not found' });
        }

        await registation.destroy({ where: { id } });

        return res.status(200).json({ message: 'Registration deleted successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}; 