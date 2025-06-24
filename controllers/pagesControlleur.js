import Page from "../models/pages.js";


export const getAllPages = async (req, res) => {
    try {
        const pages = await Page.findAll()
        return res.status(200).json(pages)

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getPageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({ message: 'Slug manquant' });
        }

        const page = await Page.findOne({ where: { slug } });
        if (!page) {
            return res.status(404).json({ message: 'Page non found' });
        }
        return res.status(200).json(page);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export const updatePage = async (req, res) => {
    try {
        const [affectedRows] = await Page.update(req.body, {
            where: { id: req.params.id }
        });

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Page non trouvée' });
        }

        // Optionnel : retourner la page mise à jour
        const updatedPage = await Page.findByPk(req.params.id);

        return res.status(200).json(updatedPage);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
    }
};
