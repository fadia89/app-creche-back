import Event from "../models/events.js";


export const getAllEvents = async (req,res) => {
    try{
        const events = await Event.findAll(); 
        if (events.length <1){
            return res.status(404).json({message: 'No event found'});
        }
        return res.status(200).json(events);
    } catch (err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'})
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
  

};

export const updateEvent = async (req, res) => {

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