import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions";

function inputValidator(input) {

  let inputError = {};
  const inputProps = ["name", "min_height", "max_height", "min_weight", "max_weight", "life_span"];
  for (var i = 0; i < inputProps.length; i++) {

    if (!input[inputProps[i]]) {
      inputError[inputProps[i]] = `${inputProps[i]} is required`
    }
  }

  if (input.name.trim() === '') {
    inputError.name = "Must enter a name";
  }
  if (isNaN(Number(input.min_height))){
    inputError.min_height = "min_height should be a number";
  }
  if (isNaN(Number(input.max_height))){
    inputError.max_height = "max_height should be a number";
  }
  if (isNaN(Number(input.min_weight))){
    inputError.min_weight = "min_weight should be a number";
  }
  if (isNaN(Number(input.min_weight))){
    inputError.min_weight = "min_weight should be a number";
  }
  if (input.min_height && input.min_height <= 0) {
    inputError.min_height = "Min height should be more than zero";
  }
  if (input.max_height && input.max_height > 110) {
    inputError.max_height = "Make sure it's a dog you are trying to add becasue max-height should be below 110cms";
  }
  if (Number(input.min_height) > Number(input.max_height)) {

    inputError.min_height = "Min height should be smaller than max height";
  }
  if (input.min_weight && input.min_weight <= 0) {
    inputError.min_weight = "Min weight should be more than zero";
  }
  if (input.max_weight && input.max_weight > 110) {
    inputError.max_weight = "Make sure it's a dog you are trying to add becasue max-weight should be below 100kgs";
  }
  if (Number(input.min_weight) > Number(input.max_weight)) {

    inputError.min_weight = "Min weight should be smaller than max weight";
  }
  if (input.life_span && input.life_span < 0) {
    inputError.life_span = "Life span should be a positive number of years"
  }
  if (input.life_span > 23) {
    inputError.life_span = "Are you sure dogs live that long?";
  }

  return inputError;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    temperaments: []
  });
  // const [temperamentsSelected, setTemperamentsSelected] = useState({});
  const [inputError, setInputError] = useState({});

  function handleTemperamentsSelection(e) {
    e.preventDefault();
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value]
      });
    }
  }

  function handleTemperamentDelete(temperamentClicked) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(temperament => temperament !== temperamentClicked)
    })
  }

  function handleInputChanges(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setInputError(inputValidator({
      ... input,
      [e.target.name]: e.target.value
    }));
    // console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(inputError).length > 0) {
      return alert("Check your form fields");
    }

    var temperamentsId = [];

    if (input.temperaments.length > 0) {
      
      for (var i = 0; i < input.temperaments.length; i++) {
        var temperamentFound = temperaments.find(temperament => temperament.name === input.temperaments[i]);
        temperamentsId.push(Number(temperamentFound.id));
      }
    }

    

    const newDog = {
      name: input.name,
      height: input.min_height + ' - ' + input.max_height,
      weight: input.min_weight + ' - ' + input.max_weight,
      life_span: input.life_span,
      temperament: temperamentsId
    }
    console.log(newDog);
    dispatch(postDog(newDog));

    alert("Your Dog was successfully created");

    setInput({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span: "",
      temperaments: []
    });

    navigate("/home");
  }

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);

  return (
    <div>
      <Link to='/home'>
        <button>Volver al Home</button>
      </Link>
      <h2>Crea tu perrito</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChanges(e)}
          />
          {inputError.name && (
            <p>{inputError.name}</p>
          )}
        </div>
        <div>
          <label>Min Weight: </label>
          <input 
            type="text"
            value={input.min_weight}
            name="min_weight"
            onChange={(e) => handleInputChanges(e)}
          />
        </div>
        <div>
          <label>Max Weight: </label>
          <input 
            type="text"
            value={input.max_weight}
            name="max_weight"
            onChange={(e) => handleInputChanges(e)}
          />
        </div>
        <div>
          <label>Min. Height: </label>
          <input 
            type="text"
            value={input.min_height}
            name="min_height"
            onChange={(e) => handleInputChanges(e)}
          />
        </div>
        <div>
          <label>Max Height: </label>
          <input 
            type="text"
            value={input.max_height}
            name="max_height"
            onChange={(e) => handleInputChanges(e)}
          />
        </div>
        <div>
          <label>Life Span</label>
          <input 
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleInputChanges(e)}
          />
        </div>
        <div>
          <label>Choose Temperaments: </label>
          <select defaultValue="default" onChange={(e) => handleTemperamentsSelection(e)}>
            <option value="default" disabled hidden>Select Temperaments</option>
            {temperaments && temperaments.map(  (temperament) => {
              return (
                <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
              )
            })}
          </select>
          {input.temperaments.length > 0 && input.temperaments.map((temperament, id) => {
            return (
              <div key={id}>
                <p>{temperament}</p>
                <button 
                  onClick={() => handleTemperamentDelete(temperament)}
                >
                  X
                </button>
              </div>
            )
          })}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}