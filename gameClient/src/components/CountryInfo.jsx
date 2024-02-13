import React, { useState } from "react";
import '../app.scss';

export default function CountryInfo({ countrySelected }) {
    const [name, setName] = useState(localStorage.getItem("name"));
    const [flag, setFlag] = useState(localStorage.getItem("flag"));
    const [rating, setRating] = useState(localStorage.getItem('rating'));
    const [levelOfPlayers, setLevelOfPlayers] = useState(localStorage.getItem('levelOfPlayers'));
    const [levelOfJuniors, setLevelOfJuniors] = useState(localStorage.getItem('levelOfJuniors'));
    const [levelOfObjects, setLevelOfObjects] = useState(localStorage.getItem('levelOfObjects'))
    const [finacialCondition, setFinacialCondition] = useState(localStorage.getItem('finacialCondition'));
    const [status, setStatus] = useState(localStorage.getItem('status'));

    window.addEventListener('click', () => {
        setName(localStorage.getItem("name"));
        setFlag(localStorage.getItem("flag")); 
        setRating(localStorage.getItem("rating"));
        setLevelOfPlayers(localStorage.getItem('levelOfPlayers'));
        setLevelOfJuniors(localStorage.getItem('levelOfJuniors'));
        setLevelOfObjects(localStorage.getItem('levelOfObjects'));
        setFinacialCondition(localStorage.getItem('finacialCondition'));
        setStatus(localStorage.getItem('status'));
        
    })


    return (
        <div className="country-info">
            { !countrySelected && <p>Nie wybrano drużyny</p> } 

            {countrySelected && (
                <aside>
                    <img src={flag} alt={name} />
                    <h1>{name}</h1>
                    <p className="rating">
                        {rating && Array.from({ length: parseInt(rating, 10) }).map((_, index) => (
                            <span key={index}>⭐</span>
                        ))}
                    </p>
                    <br></br> 
                    <p className="country-atribute"> Poziom zawodników: <span> &nbsp; {levelOfPlayers} </span> </p>
                    <p className="country-atribute"> Poziom juniorów: <span> &nbsp; {levelOfJuniors} </span> </p>
                    <p className="country-atribute"> Poziom obiektów: <span> &nbsp; {levelOfObjects} </span> </p>
                    <p className="country-atribute"> Stan finansów: <span> &nbsp; {finacialCondition} </span> </p>
                    <p className="country-atribute"> Status: <span> &nbsp; {status} </span> </p>
                </aside>
            )}
        </div>
    );

}
