import Activity from "../models/activities.js";
import Event from "../models/events.js";
import Children from "../models/childrens.js";
import Parent from "../models/parents.js";

export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [
                {
                    model: Event,
                    attributes: ['name']
                },
                {
                    model: Children,
                    attributes: ['first_name', 'last_name']
                }
            ]
        });
        /*   if (activities.length < 1) {
              return res.status(404).json({ message: 'No activity found' });
          } */
        return res.status(200).json(activities);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getActivitiesByID = async (req, res) => {
    const { id } = req.params;

    try {
        //// Fetch the activity by its primary key (id), including related models:
        // - Associated events with selected attributes.
        // - Associated children with selected attributes.
        const activity = await Activity.findByPk(id, {
            include: [
                {
                    model: Event,
                    attributes: ['id', 'name', 'description', 'event_date']
                },
                {
                    model: Children,
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

export const getChildActivities = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the parent linked to this user
        const parent = await Parent.findOne({
            where: { user_id: userId }
        });

        if (!parent) {
            return res.status(404).json({ message: "Parent not found for this user" });
        }

        //  Find children related to this parent
        const children = await Children.findAll({
            where: { parent_id: parent.id }
        });

        const childrenIds = children.map(child => child.id);

        const activities = await Activity.findAll({
            where: { children_id: childrenIds }
        });

        return res.status(200).json(activities);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const addActivity = async (req, res) => {
    const { name, description, activity_date, event_id, children_id } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const newActivity = await Activity.create({
            name,
            description,
            activity_date,
            event_id,
            children_id,
            image
        });

        return res.status(201).json(newActivity);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export const updateActivitie = async (req, res) => {
    const { id } = req.params;
    const { name, description, activity_date, event_id, children_id, image } = req.body;
    try {
        const activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        const updatedActivity = await activity.update({
            name: name || activity.name,
            description: description || activity.description,
            activity_date: activity_date || activity.activity_date,
            event_id: event_id || activity.event_id,
            children_id: children_id || activity.children_id,
            image: req.file ? req.file.filename : activity.image
        });
        const responseActivity = updatedActivity.toJSON();
        responseActivity.image = `http://localhost:8000/uploads/${responseActivity.image}`;
        return res.status(200).json(updatedActivity);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteActivitie = async (req, res) => {
    const { id } = req.params;

    try {

        // Searches for a specific activity in the database based on its primary key (ID).
        const activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await activity.destroy({ where: { id } });

        return res.status(200).json({ message: 'Activity deleted successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};