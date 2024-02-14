import React from "react";
import '../app.scss';
import setLocalStorage from "../assets/utilities/setLocalStorage";

export default function CountryCard({ id, name, flag, rating, levelOfPlayers, levelOfJuniors, levelOfObject, finacialCondition, status, setSelected }) {
    const countryInfo = [id, name, flag, rating, levelOfPlayers, levelOfJuniors, levelOfObject, finacialCondition, status];

    const cardHandle = () => {
        setLocalStorage(countryInfo);
        setSelected(); 
    }

    return (
        <div className="country-card" onClick={cardHandle}>
            <img src={flag} alt={`Flaga ${name}`} />
            <h1>{name}</h1>
        </div>
    );
}
