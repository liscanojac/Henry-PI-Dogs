const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {

  const { name, height, weight, life_span, image, temperament } = req.body;

  try {

    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image
    });

    newDog.addTemperaments(temperament);

    return res.json(newDog);

  } catch(error) {

    res.status(400).send({ msg: "Invalid parameters for dog creation"});
  }
})

module.exports = router;