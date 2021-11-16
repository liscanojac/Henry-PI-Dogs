// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { getDogs } from "../../actions";
// import { NavLink, Link } from "react-router-dom";

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";

export default function Home() {

  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  // este hook es lo mismo que usar el mapStateToProps. Con useSelector traeme en esa constante todo lo que esta en el estado de dogs
  // me trae desde el reducer el estado dogs donde están todos los perros
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]);
  // el segundo argumento es para evitar que se genere un loop infinito de useEffect
  // el segundo argumento puede ser un array vacio pero cuando ese use effect depende de la funcion dispatch es como decirle que siempre y cuando tengas ese dispatch, ejecutalo

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <div>
      <div>
        <h1>Aca irian mis perritos</h1>
        <button onClick={e => {handleClick(e)}}>Reload</button>
      </div>
      <div>
        <select>
          <option>Sort by Name</option>
          <option value="nameAscendant">A to Z</option>
          <option value="nameDescendant">Z to A</option>
        </select>
      </div>
      <div>
        <select>
          <option>Sort by Weight</option>
          <option value="weightAscendant">Ascendent</option>
          <option value="weightDescendant">Descendent</option>
        </select>
      </div>
      <div>
        <select>
          <option>Select Temperament</option>
          {allTemperaments && allTemperaments.map((temperament) => (
            <option key={temperament.id}>{temperament.name}</option>
          ))}
        </select>
      </div>
      <div>
        <select>
          <option>Select Source</option>
          <option value="weightAscendant">API</option>
          <option value="weightDescendant">DB</option>
        </select>
      </div>
    </div>
  )
}