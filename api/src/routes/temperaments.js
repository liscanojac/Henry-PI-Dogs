const { Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {

  // res.send('temperaments working');

  try {

    const temperaments = await Temperament.findAll();
    
    const temperamentsList = temperaments.map(temperament => temperament.name);

    res.json(temperamentsList);

  } catch(error) {
    res.sendStatus(500);
  }
})

module.exports = router;