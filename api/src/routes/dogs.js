require('dotenv').config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { Router } = require('express');
const router = Router();


const getApiDogs = async () => {

  const wholeApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

  var dogsFromApi = [];

  for (var i = 0; i < wholeApi.data.length; i++) {

    var dog = wholeApi.data[i];

    var dogDetails = {
      id : dog.id,
      name : dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament
    };
    dogsFromApi.push(dogDetails);
  }
  return dogsFromApi;
};

const getDbDogs = async () => {

  let dogsDB = await Dog.findAll({include: Temperament});

  return dogsDB;
};

const getAllDogs = async () => {

  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();

  const allDogs = dbDogs.concat(apiDogs);

  return allDogs;
}

// GET --- All Dogs and Dogs By Name


router.get('/', async (req, res) => {

  const name = req.query.name;

  try {
    
    const dogs = await getAllDogs();

    if (name) {

      var dogsFoundByName = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
      
      if (!dogsFoundByName.length) {
        return res.status(404).send({ info: "Dog not found"});
      }

      return res.send(dogsFoundByName);
    }
    res.json(dogs);
  } catch (error) {
    console.log(error);
  }
});

// GET --- Get Dog by ID

router.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const dogsFromApi = await getApiDogs();

    if (!isNaN(id)) {

      var dogFoundById = dogsFromApi.find(dog => dog.id == id);

      if(!dogFoundById) {

        return res.status(404).send('Dog not found');
      }

      return res.send(dogFoundById);
    }

    if (id === 'db') {
      const dogsFromDb = await Dog.findAll();

      // res.json(dogsFromDb);

      return res.json(dogsFromDb);
    }
    res.status(400).send('Incorrect ID');
  } catch(error) {
    console.log(error);
  }
});

// // testing database

// router.get('/db', async (req, res) => {

//   try {

//     const dogsFromDb = await Dog.findAll();

//     res.json(dogsFromDb);

//   } catch(error) {
//     console.log(error);
//   }
// })



// Post

router.post('/', async (req, res) => {

  const { name, height, weight, life_span, temperament } = req.body;

  // if (name && height && weight && life_span && temperament) {
  if (temperament) {

    try {

      // const newDog = await Dog.create({
      //   name,
      //   weight,
      //   height,
      //   life_span
      // });

      // newDog.addTemperament()
      let temperamentDb = await Temperament.findAll({
        where: { name: temperament}
      });
      
      console.log(temperamentDb);

      res.send('ok');
    } catch(error) {
      return res.send({msg: "Datos del perro cargados de manera incorrecta"});
    }
  }
})

module.exports = router;