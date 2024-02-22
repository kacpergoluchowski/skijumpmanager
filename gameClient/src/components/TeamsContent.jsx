import React, { useContext, useEffect, useState } from "react";
import '../app.scss';
import axios from "axios";
import CountryDataContext from "../context/CountryDataContext";
import CompetitorRow from "./CompetitorRow";

export default function TeamsContent( {teamA, teamB, teamC} ) {
    const [competitors, setCompetitors] = useState(undefined);

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

    return (
        <div className="teams-content">
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
                    {teamA && <TeamA competitors = {competitors}/>}
                    {teamB && <TeamB competitors = {competitors}/>}
                    {teamC && <TeamC competitors = {competitors}/>}
                </table>
            )}
        </div>
    );
}

function TeamA({competitors}) {
    const countryInfo = useContext(CountryDataContext);

    return (
        <tbody>
            {competitors && (
                competitors.map(competitor => {
                    if (competitor.countryId == countryInfo.id && competitor.teamA)
                        return <CompetitorRow
                            id={competitor.id}
                            name={competitor.name}
                            surname={competitor.surname}
                            age={competitor.age}
                            invasionTechnique={competitor.invasionTechnique}
                            breakoutTechnique={competitor.breakoutTechnique}
                            flightTechnique={competitor.flightTechnique} />
                })
            )}
        </tbody>
    )
}

function TeamB({competitors}) {
    const countryInfo = useContext(CountryDataContext);

    return (
        <tbody>
            {competitors && (
                competitors.map(competitor => {
                    if (competitor.countryId == countryInfo.id && competitor.teamB)
                        return <CompetitorRow
                            id={competitor.id}
                            name={competitor.name}
                            surname={competitor.surname}
                            age={competitor.age}
                            invasionTechnique={competitor.invasionTechnique}
                            breakoutTechnique={competitor.breakoutTechnique}
                            flightTechnique={competitor.flightTechnique} />
                })
            )}
        </tbody>
    )
}

function TeamC({competitors}) {
    const countryInfo = useContext(CountryDataContext);

    return (
        <tbody>
            {competitors && (
                competitors.map(competitor => {
                    if (competitor.countryId == countryInfo.id && competitor.teamC)
                        return <CompetitorRow
                            id={competitor.id}
                            name={competitor.name}
                            surname={competitor.surname}
                            age={competitor.age}
                            invasionTechnique={competitor.invasionTechnique}
                            breakoutTechnique={competitor.breakoutTechnique}
                            flightTechnique={competitor.flightTechnique} />
                })
            )}
        </tbody>
    )
}