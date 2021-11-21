import React,{ useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails } from "../../redux/actions";

export function DogDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    dispatch(getDogDetails(id))
  }, [dispatch]);

  const myDog = useSelector((state) => state.dogDetails);
  console.log(myDog);

  return (
    <div>
      <p>{myDog.name}</p>
      <p>{myDog.weight} kgs</p>
      <p>{myDog.height} cms</p>
      <p>{myDog.life_span}</p>
      <div>
        <img src={myDog.image} alt="" />
      </div>
      <p>{myDog.temperament}</p>
    </div>
  )
}
