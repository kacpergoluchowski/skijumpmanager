import React, { useState } from "react";
import '../app.scss';

export default function CountryInfo({ countrySelected }) {
    const [selectedCountryName, setSelectedCountryName] = useState(localStorage.getItem("countryName"));
    const [selectedCountryFlag, setSelectedCountryFlag] = useState(localStorage.getItem("countryFlag"));
    const [selectedCountryRating, setSelectedCountryRating] = useState(localStorage.getItem('countryRating'));
    const [selectedLevelOfPlayers, setSelectedLevelOfPlayers] = useState(localStorage.getItem('countryLevelOfPlayers'));

    window.addEventListener('click', () => {
        setSelectedCountryName(localStorage.getItem("countryName")); // do poprawy (wlacza sie 4 razy)
        setSelectedCountryFlag(localStorage.getItem("countryFlag")); // do poprawy
        setSelectedCountryRating(localStorage.getItem("countryRating"));
        setSelectedLevelOfPlayers(localStorage.getItem('countryLevelOfPlayers'));
    })


    return (
        <div className="country-info">
            {!countrySelected && <p>Nie wybrano drużyny</p>}
            {countrySelected && (
                <aside>
                    <img src={selectedCountryFlag} alt={selectedCountryName} />
                    <h1>{selectedCountryName}</h1>
                    <p className="rating">
                        {selectedCountryRating && Array.from({ length: parseInt(selectedCountryRating, 10) }).map((_, index) => (
                            <span key={index}>⭐</span>
                        ))}
                    </p>
                    <br></br> 
                    <p className="country-atribute"> Poziom zawodników: <span> &nbsp; {selectedLevelOfPlayers} </span> </p>
                    <p className="country-atribute"> Poziom juniorów: <span> </span> </p>
                    <p className="country-atribute"> Poziom obiektów: <span> </span> </p>
                    <p className="country-atribute"> Stan finansów: <span> </span> </p>
                    <p className="country-atribute"> Status: <span> </span> </p>
                </aside>
            )}
        </div>
    );

}
