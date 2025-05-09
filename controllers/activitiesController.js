import Activity from "../models/activities.js";
import Event from "../models/events.js";
import Children from "../models/childrens.js";

export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [
                {
                    model: Event,  
                    as: 'event',
                    attributes: ['name']
                },
                {
                    model: Children,  
                    as: 'child',
                    attributes: ['first_name', 'last_name']
                   
                }
            ]
        });

        if (activities.length < 1) {
            return res.status(404).json({ message: 'No activity found' });
        }
        
        return res.status(200).json(activities);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getActivitiesByID = async (req,res) => {
    const { id } = req.params;

    try {
      const activity = await Activity.findByPk(id, {
        include: [
          {
            model: Event,
            as: 'event', 
            attributes: ['id', 'name', 'description', 'event_date']
          },
          {
            model: Children,
            as: 'child', 
            attributes: ['id', 'first_name', 'last_name', 'gender', 'band']
          }
        ]
      });
  
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
  
      return res.status(200).json(activity);
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
};

export const addActivity = async (req, res) => {
    const { name, description, activity_date, event_id, children_id } = req.body;
       
    try {
        
        const newActivity = await Activity.create({
            name,
            description,
            activity_date,
            event_id,
            children_id
        });

       
        return res.status(201).json(newActivity);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}; 



export const updateActivitie= async (req,res) => {
    const { id } = req.params;
    const { name, description, activity_date, event_id, children_id } = req.body; 
    try {
        const activityByID = await Activity.findByPk(id);

        if (!activityByID) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        const updatedActivity = await activity.update({
            name : name || activityByID.name ,
            description : description || activityByID.description ,
            activity_date : activity_date|| activityByID.activity_date ,
            event_id: event_id || activityByID. event_id , 
            children_id : children_id || activityByID.children_id ,
        });

        return res.status(200).json(updatedActivity);  

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
   
    
}

export const deleteActivitie = async (req, res) => {
    const { id } = req.params;  

    try {
        
        const activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await activity.destroy({where: {id}});

        return res.status(200).json({ message: 'Activity deleted successfully' });  // Retourne un message de succès

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};