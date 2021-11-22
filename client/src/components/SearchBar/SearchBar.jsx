import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

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
    setSearchedDog("");
  }

  return (
    <div>
      <input 
        className={styles.searchBar}
        type="search"
        onChange={handleSearchBar}
        placeholder=""
      />
      <button 
        className={styles.searchBtn}
        type="submit" 
        onClick={handleSubmitButton}>
          Buscar
      </button>
    </div>
  )
}