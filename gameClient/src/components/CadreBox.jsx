import React, { useContext, useEffect, useState } from "react";
import '../app.scss';
import CountryDataContext from "../context/CountryDataContext";
import competitors from '../assets/data/competitors.json';

export default function CadreBox() {
    let countryInfo = useContext(CountryDataContext);

    return (
        <div className="home-card">
            <h1> Kadra A </h1>
            <table className="competitor-card">
                {competitors.map(competitor => (
                    competitor.countryId == countryInfo.id && competitor.teamA && (
                        <tr key={competitor.id}>
                            <td>{competitor.name} {competitor.surname} </td>
                            <td className="competitor-age"> {competitor.age} lat </td>
                        </tr>
                    )
                ))}
            </table>
        </div>
    );
    
}
