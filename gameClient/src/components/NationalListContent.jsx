import React, { useContext, useEffect, useState } from "react";
import '../app.scss';
import axios from "axios";
import CountryDataContext from "../context/CountryDataContext";
import CompetitorRow from "./CompetitorRow";

export default function NationalListContent() {
    const [competitors, setCompetitors] = useState(undefined);
    const countryInfo = useContext(CountryDataContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8080/getCompetitors');
                setCompetitors(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (competitors)
            competitors.forEach(competitor => {
                if (competitor.countryId == countryInfo.id)
                    console.log(competitor);
            });
    }, [competitors])
    return (
        <div className="nationalList-content">
            {competitors && (
                <table>
                    <thead>
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Wiek</th>
                            <th>Technika najazdu</th>
                            <th>Technika wybicia</th>
                            <th>Technika lotu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {competitors && (
                            competitors.map(competitor => {
                                if (competitor.countryId == countryInfo.id)
                                    return <CompetitorRow
                                        name={competitor.name}
                                        surname={competitor.surname}
                                        age={competitor.age}
                                        invasionTechnique={competitor.invasionTechnique}
                                        breakoutTechnique={competitor.breakoutTechnique}
                                        flightTechnique={competitor.flightTechnique} />
                            })
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
