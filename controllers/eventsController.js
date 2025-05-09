import Event from "../models/events.js";
import User from "../models/users.js";





export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.findAll({
         include: [
            {
              model: User,  
              as:'user',
              attributes: { exclude: ['password'] } 
            }
          ]  
      });
  
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
    const {id} = req.params;
    try{
        const eventByID = await Event.findByPk(id);
        if (!eventByID){
            return res.status(404).json({messages: 'Event not found'});
        }
        return res.status(200).json(eventByID);
    }
    catch (err){
        console.log (err)
        return res.status(500).json({message: 'Internal server error'}); 
    }


};

export const addEvent = async (req, res) => {
    const { name, event_date, location, description, duration, quota, user_id } = req.body;

    try {
        // Convertir event_date en objet Date
        const eventDate = new Date(event_date);  
        // Vérification si un événement avec le même nom et la même date existe déjà
        const existingEvent = await Event.findOne({
            where: {
                name: name,
                event_date: eventDate 
            }
        });

        // Si l'événement existe déjà, renvoyer un message d'erreur
        if (existingEvent) {
            return res.status(400).json({ message: 'An event with the same name and date already exists.' });
        }

        // Si l'événement n'existe pas, on peut créer le nouvel événement
        const newEvent = await Event.create({
            name,
            event_date: eventDate,
            location,
            description,
            duration,
            quota,
            user_id
        });

        return res.status(201).json(newEvent);  

    } catch (err) {
        console.log(err);  
        return res.status(500).json({ message: 'Internal server error' });  
    }
};

export const updateEvent = async (req, res) => {
    const {id} = req.params;
    const{name,event_date,location,description,duration} = req.body;
    try{
        const eventByID = await Event.findByPk(id);
        //console.log(eventByID)
        if(!eventByID){
            return res.status(404).json({messages: 'Event not found'});  
        }
        const updateEvent = await eventByID.update({
            name: name || eventByID.name,
            event_date: event_date || eventByID.event_date,
            location: location || eventByID.location,
            description: description || eventByID.description,
            duration: duration || eventByID.duration
        })
        return res.status(200).json({message: 'Event successfully updated', event: updateEvent});

    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });

    }

};

export const deleteEventByID = async (req,res) => {
    const {id} = req.params;
    console.log(id);
    try{
        const eventByID = await Event.findByPk(id);
        if (!eventByID){
            return res.status(404).json({messages: 'Event not found'})
        }
        await eventByID.destroy();
        return res.status(200).json({messages :'Event successfully deleted'})

    } catch(err) {
        console.log (err)
        return res.status(500).json({message: 'Internal server error'});   
    }

};