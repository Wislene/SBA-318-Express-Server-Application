const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const menusFilePath = path.join(__dirname, '../data/menus.json');

// Helper function to read menus data
const readMenus = () => {
    const menusData = fs.readFileSync(menusFilePath);
    return JSON.parse(menusData);
};

// GET all menus
router.get('/', (req, res) => {
    const menus = readMenus();
    res.render('menus', { menus });
});

// GET menu by ID
router.get('/:id', (req, res) => {
    const menus = readMenus();
    const menu = menus.find(m => m.id === parseInt(req.params.id));
    if (!menu) return res.status(404).send('Menu not found');
    res.render('menu', { menu });
});

// GET form to add a new menu
router.get('/add', (req, res) => {
    res.render('add-menu');
});

// POST a new menu
router.post('/', (req, res) => {
    const menus = readMenus();
    const newMenu = {
        id: menus.length + 1,
        name: req.body.name,
        menu: {
            starter: req.body.starter,
            mainCourse: req.body.mainCourse,
            dessert: req.body.dessert
        }
    };
    menus.push(newMenu);
    fs.writeFileSync(menusFilePath, JSON.stringify(menus, null, 2));
    res.redirect('/menus');
});

// GET form to edit a menu
router.get('/:id/edit', (req, res) => {
    const menus = readMenus();
    const menu = menus.find(m => m.id === parseInt(req.params.id));
    if (!menu) return res.status(404).send('Menu not found');
    res.render('edit-menu', { menu });
});

// PUT (update) a menu
router.put('/:id', (req, res) => {
    const menus = readMenus();
    const menuIndex = menus.findIndex(m => m.id === parseInt(req.params.id));
    if (menuIndex === -1) return res.status(404).send('Menu not found');

    menus[menuIndex] = {
        id: parseInt(req.params.id),
        name: req.body.name,
        menu: {
            starter: req.body.starter,
            mainCourse: req.body.mainCourse,
            dessert: req.body.dessert
        }
    };
    fs.writeFileSync(menusFilePath, JSON.stringify(menus, null, 2));
    res.redirect('/menus');
});

// DELETE a menu
router.delete('/:id', (req, res) => {
    let menus = readMenus();
    menus = menus.filter(m => m.id !== parseInt(req.params.id));
    fs.writeFileSync(menusFilePath, JSON.stringify(menus, null, 2));
    res.redirect('/menus');
});

module.exports = router;
