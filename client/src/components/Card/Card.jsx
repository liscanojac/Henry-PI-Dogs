import React from "react";

export default function Card({ name, image, temperament, weight }) {
  
  return (
    <div>
      <p>{name}</p>
      <p>{image}</p>
      <p>{temperament}</p>
      <p>{weight}</p>
    </div>
  );
}