import React from "react";

export default function Pagination({ dogsPerPage, totalAmountOfDogs, paginationChanger }) {

  const pageNumbers = [];

  for (var i = 1; i <= Math.ceil(totalAmountOfDogs / dogsPerPage); i++) {

    pageNumbers.push(i);
  }
  return (
      <nav>
        <ul>
          {pageNumbers.length && pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button 
                  onClick={() => paginationChanger(number)}
                >
                  {number}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    )
}