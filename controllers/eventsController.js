import Event from "../models/events.js";
import User from "../models/users.js";


export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                    // through: { attributes: [] },  // pour ne pas renvoyer la table pivot
                    attributes: ['id', 'first_name', 'last_name']
                }
            ]
        });
        // Check if the events  is empty
        if (events.length < 1) {
            return res.status(404).json({ message: 'No event found' });
        }

        return res.status(200).json(events);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getEventByID = async (req, res) => {
    const { id } = req.params;
    try {
        const eventByID = await Event.findByPk(id);
        if (!eventByID) {
            return res.status(404).json({ messages: 'Event not found' });
        }
        return res.status(200).json(eventByID);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const addEvent = async (req, res) => {
    const { name, event_date, location, description, duration, quota, user_ids } = req.body;

    try {
        // Convertir event_date en objet Date
        const eventDate = new Date(event_date);
        const existingEvent = await Event.findOne({
            where: {
                name: name,
                event_date: eventDate
            }
        });

        if (existingEvent) {
            return res.status(400).json({ message: 'An event with the same name and date already exists.' });
        }
        const newEvent = await Event.create({
            name,
            event_date: eventDate,
            location,
            description,
            duration  ,//: duration * 3600,
            quota,

        });
        // // If user_ids is a non-empty array, associate these users with the new event
        if (Array.isArray(user_ids) && user_ids.length > 0) {
            await newEvent.addUsers(user_ids);
        }
        const result = await Event.findByPk(newEvent.id, {
            include: [{ model: User, as: 'users' }]
        });
        return res.status(201).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//// Retrieve multiple events based on an array of event IDs sent in the request body for React Admin
export const getManyEvents = async (req, res) => {
    try {
        const { ids } = req.body;
        const events = await Event.findAll({
            where: {
                id: ids
            }
        });

        return res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, event_date, quota, location, duration, user_ids, } = req.body;

    try {
        const event = await Event.findByPk(id, {
            include: ['users'], // ou { model: User, as: 'users' } selon ta config
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }


        // Mettre à jour les champs d'événement avec de nouvelles valeurs si elles sont fournies ; 
        // sinon, conserver les valeurs existantes pour éviter de les écraser avec undefined ou null.
        const eventUpdate = await event.update({
            name: name ?? event.name,
            description: description ?? event.description,
            event_date: event_date ?? event.event_date,
            quota: quota ?? event.quota,
            location: location ?? event.location,
            duration: duration ?? event.duration,
        });

        // If user_ids is an array, update the event's associated users by setting the new list.
        // This replaces the current users linked to the event with the provided user_ids.
        if (Array.isArray(user_ids)) {
            await eventUpdate.setUsers(user_ids);
        }

        const updatedEvent = await Event.findByPk(id, {
            include: ['users'],
        });

        return res.status(200).json(updatedEvent);
    } catch (err) {
        console.error( err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteEventByID = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const eventByID = await Event.findByPk(id);
        if (!eventByID) {
            return res.status(404).json({ messages: 'Event not found' })
        }
        await eventByID.destroy();
        return res.status(200).json({ messages: 'Event successfully deleted' })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' });
    }

};