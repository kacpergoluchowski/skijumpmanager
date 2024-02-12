import React from "react";
import '../app.scss';
import setLocalStorage from "../assets/utilities/setLocalStorage";

export default function CountryCard({ name, flag, rating, levelOfPlayers, levelOfJuniors, finacialCondition, status, setSelected }) {
    const countryInfo = [name, flag, rating, levelOfPlayers, levelOfJuniors, finacialCondition, status];

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
