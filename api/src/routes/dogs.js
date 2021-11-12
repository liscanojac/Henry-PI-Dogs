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

    if (id.length > 2) {

      const dogsFromDb = await getDbDogs();

      var dogFoundByDbId = dogsFromDb.find(dog => dog.id === id);

      if (!dogFoundByDbId) {
        return res.status(404).send({ info: "Dog not found"});
      }
      return res.send(dogFoundByDbId);

    } 
    
    if(!isNaN(id)) {

      const dogsFromApi = await getApiDogs();

      var dogFoundById = dogsFromApi.find(dog => dog.id == id);

      if(!dogFoundById) {

        return res.status(404).send({ info: "Dog not found"});
      }

      return res.send(dogFoundById);
    }
    res.status(400).send({info: "Incorrect ID"});
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;