const { Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {

  // res.send('temperaments working');

  try {

    const temperaments = await Temperament.findAll();
    
    const temperamentsList = [];

    

    res.json(temperaments);

  } catch(error) {
    res.sendStatus(500);
  }
})

module.exports = router;