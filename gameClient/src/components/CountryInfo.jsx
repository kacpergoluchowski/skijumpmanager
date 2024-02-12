import React, { useState, useEffect } from "react";
import '../app.scss';

export default function CountryInfo({ countrySelected }) {
    const [selectedCountryName, setSelectedCountryName] = useState(localStorage.getItem("countryName"));
    const [selectedCountryFlag, setSelectedCountryFlag] = useState(localStorage.getItem("countryFlag"));
    const [selectedCountryRating, setSelectedCountryRating] = useState(localStorage.getItem('countryRating'));

    window.addEventListener('click', () => {
        setSelectedCountryName(localStorage.getItem("countryName")); // do poprawy (wlacza sie 4 razy)
        setSelectedCountryFlag(localStorage.getItem("countryFlag")); // do poprawy
        setSelectedCountryRating(localStorage.getItem("countryRating"));
        rating = CountryRating(selectedCountryRating);
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
                    
                </aside>
            )}
        </div>
    );

}
