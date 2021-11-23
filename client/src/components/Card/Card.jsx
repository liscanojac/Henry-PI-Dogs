import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ name, image, temperament, weight, key }) {
  
  return (
    // <div>
    //   <p>{name}</p>
    //   <p>{image}</p>
    //   <p>{temperament}</p>
    //   <p>{weight}</p>
    // </div>
    <div className="carta">
      <Link key={key} className="cardLink" to={"/dogs/" + {key}}>
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