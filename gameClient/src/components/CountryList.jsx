import React from "react";
import '../app.scss';
import countriesData from '../assets/data/countriesData.json';
import CountryCard from "./CountryCard";
import austriaFlag from '../assets/images/austriaFlag.png';
import germanyFlag from '../assets/images/germanyFlag.png';
import sloveniaFlag from '../assets/images/sloveniaFlag.png';
import norwayFlag from '../assets/images/norwayFlag.png';
import japanFlag from '../assets/images/japanFlag.png';
import polandFlag from '../assets/images/polandFlag.png';
import swissFlag from '../assets/images/swissFlag.png';
import finlandFlag from '../assets/images/finlandFlag.png';
import italyFlag from '../assets/images/italyFlag.png';
import usaFlag from '../assets/images/usaFlag.png';
import estoniaFlag from '../assets/images/estoniaFlag.png';
import czechiaFlag from '../assets/images/czechiaFlag.png';

export default function CountryList( { setCountrySelected } ) {
    console.log(countriesData.countries[2].levelOfObject);
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyFlag, usaFlag, estoniaFlag, czechiaFlag];
    return (
        <div className="country-list">
            {countriesData && countriesData.countries.map(country => (
                <CountryCard 
                    key={country.id} 
                    name={country.name} 
                    flag={flags[country.id]} 
                    rating={country.stars} 
                    levelOfPlayers={country.levelOfPlayers}
                    levelOfJuniors={country.levelOfJuniors}
                    levelOfObject={country.levelOfObject}
                    finacialCondition={country.finacialCondition}
                    status={country.status}
                    setSelected = {setCountrySelected} 
                    
                    />
            ))}
        </div>
    );
}
