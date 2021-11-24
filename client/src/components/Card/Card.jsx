import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ name, image, temperament, weight, id }) {
  
  return (
    // <div>
    //   <p>{name}</p>
    //   <p>{image}</p>
    //   <p>{temperament}</p>
    //   <p>{weight}</p>
    // </div>
    <div className="carta">
      <Link className="cardLink" to={`dogs/${id}`}>
        <h3 className="centrar-texto">{name}</h3>
        <div className="grilla">
          <div className="imgContainer">
            <img src={image} alt="" />
          </div>
          <div>
            <h4>Weight</h4>
            <p>{weight} Kgs</p>
            <h4>Temperament:</h4>
            <p>{temperament}</p>
          </div>
        </div>                
      </Link>
      
    </div>
  );
}