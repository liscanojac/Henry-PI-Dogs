const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {

  const { name, height, weight, life_span, temperament } = req.body;

  try {

    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span
    });

    newDog.addTemperaments(temperament);

    return res.json(newDog);

  } catch(error) {

    res.status(400).send({ msg: "Invalid parameters for dog creation"});
  }
})

module.exports = router;