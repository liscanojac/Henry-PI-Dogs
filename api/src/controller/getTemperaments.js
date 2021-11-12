const {Temperament} = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const getTemperamentsFromAPI = async () => {
  try {

    const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    // console.log(dogs.data);

    var temperaments = [];

    for (var i = 0; i < dogs.data.length; i++) {

      var dogTemperaments = dogs.data[i].temperament;
      // console.log(dogTemperaments);
      if (dogTemperaments) {
        temperaments = temperaments.concat(dogTemperaments.split(','));
      }
      
    }
    // console.log(temperaments);

    var setUniqueTemperaments = new Set(temperaments.sort());

    var uniqueTemperaments = [...setUniqueTemperaments];
    // console.log(uniqueTemperaments.length);

    uniqueTemperaments.map(uniqueTemperament => {

      Temperament.findOrCreate({
        where: {
          name: uniqueTemperament
        }
      })
    })
    console.log('temperaments loaded in api/index.js');
  }
  catch(error) {
    console.log('error loading temperaments from API');
  }
}

module.exports = getTemperamentsFromAPI;