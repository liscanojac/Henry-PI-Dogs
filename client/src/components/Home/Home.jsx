// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { getDogs } from "../../actions";
// import { NavLink, Link } from "react-router-dom";

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsBySource, filterDogsByTemperament, getDogs, getTemperaments, sortByName, sortByWeight } from "../../redux/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home() {

  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  // este hook es lo mismo que usar el mapStateToProps. Con useSelector traeme en esa constante todo lo que esta en el estado de dogs
  // me trae desde el reducer el estado dogs donde están todos los perros
  const allTemperaments = useSelector((state) => state.temperaments);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // here we are setting a state with our first current page and get setState thta controls the page number
  const [dogsPerPage] = useState(8);
  // const [temperamentsSelected, setTemperamentsSelected] = useState([]);
  const [orderByName, setOrderByName] = useState();
  const [orderByWeight, setOrderByWeight] = useState();

  const indexOfLastDogOnPage = currentPage * dogsPerPage;
  const indexOfFirstDogOnPage = indexOfLastDogOnPage - dogsPerPage;

  const currentPageDogs = allDogs.slice(indexOfFirstDogOnPage, indexOfLastDogOnPage);

  const paginationChanger = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]);
  // el segundo argumento es para evitar que se genere un loop infinito de useEffect
  // el segundo argumento puede ser un array vacio pero cuando ese use effect depende de la funcion dispatch es como decirle que siempre y cuando tengas ese dispatch, ejecutalo

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);

  // esto refresca la pagina
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  // Filter By Temperaments

  function handleFilterByTemperaments(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }

  // function handleFilterByTemperaments02(e) {
  //   e.preventDefault();
  //   if (!temperamentsSelected.includes(e.target.value) && e.target.value !== 'all') {
  //     setTemperamentsSelected([...temperamentsSelected, e.target.value]);
  //   }
  //   dispatch(filterDogsByTemperament(temperamentsSelected));
  // }

  // Filter By Source

  function handleFilterBySource(e) {
    e.preventDefault();
    dispatch(filterDogsBySource(e.target.value));
  }

  // Sort by Name

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrderByName(`${e.target.value}`);
  }

  // Sort by Weight

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrderByWeight(`${e.target.value}`);
  }

  return (
    <div>
      <div>
        <h1>Aca irian mis perritos</h1>
        <button onClick={e => {handleClick(e)}}>Reload</button>
      </div>
      <div>
        <select onChange={(e) => handleSortByName(e)}>
          <option>Sort by Name</option>
          <option value="nameAscendant">A to Z</option>
          <option value="nameDescendant">Z to A</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleSortByWeight(e)}>
          <option>Sort by Weight</option>
          <option value="weightAscendant">Ascendent</option>
          <option value="weightDescendant">Descendent</option>
        </select>
      </div>
      <div>
        {/* <form>
          {allTemperaments && allTemperaments.map((temperament) => {
            return <label key={temperament.id}>
              {temperament.name}: <input type="checkbox" onChange={(e) => handleFilterByTemperaments(e)} />
            </label>
          })}
        </form> */}
        <select onChange={(e) => handleFilterByTemperaments(e)}>
          <option value="all">Select Temperament</option>
          {allTemperaments && allTemperaments.map((temperament) => (
            <option key={temperament.id}>{temperament.name}</option>
          ))}
        </select>
        {/* <div>
          {temperamentsSelected.length && temperamentsSelected.map((temperament, index) => {
            return <p key={index}>{temperament}</p>
          })}
        </div> */}
      </div>
      <div>
        <select onChange={(e) => handleFilterBySource(e)}>
          <option>Select Source</option>
          <option value="all">All</option>
          <option value="onlyFromApi">API</option>
          <option value="onlyFromDb">DB</option>
        </select>
      </div>
      {
        currentPageDogs && currentPageDogs.map((dog) => {
          return <Card 
                    key={dog.id} 
                    name={dog.name} 
                    image={dog.image} 
                    temperament={dog.temperament} weight={dog.weight} 
                    />
        })
      }
      <div>
        {
        allDogs.length > 0 && <Pagination 
          totalAmountOfDogs={allDogs.length}
          dogsPerPage={dogsPerPage}
          paginationChanger={paginationChanger}
        />
        }
        {/* {!allDogs.length && <p>no pagination to show</p>} */}
      </div>
    </div>
  )
}