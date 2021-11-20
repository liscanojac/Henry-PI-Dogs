import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";

export default function SearchBar() {

  const dispatch = useDispatch();
  const [searchedDog, setSearchedDog] = useState("");

  function handleSearchBar(e) {
    e.preventDefault();
    setSearchedDog(e.target.value);
  }

  function handleSubmitButton(e) {
    e.preventDefault();
    dispatch(getDogsByName(searchedDog));
    setSearchedDog('12')
  }

  return (
    <div>
      <input 
        type="search"
        onChange={handleSearchBar}
        placeholder=""
      />
      <button 
        type="submit" 
        onClick={handleSubmitButton}>
          Buscar
      </button>
    </div>
  )
}