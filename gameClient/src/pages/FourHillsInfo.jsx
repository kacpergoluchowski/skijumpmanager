import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import competitors from '../assets/data/competitors.json';
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

export default function FourHillsInfo() {
    const [sortedCompetitors, setSortedCompetitors] = useState(undefined);
    const [countryInfo, setCountryInfo] = useState(undefined);
    const [rankingVisible, setRankingVisible] = useState(true);
    const [rulesVisible, setRulesVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8080/getSelectedCountryInfo');
                setCountryInfo(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
        fetchData();
        sortCompetitors();
    }, []);

    function handleRankingButton() {
        setRankingVisible(true);
        setRulesVisible(false);
    }

    function handleRulesButton() {
        setRankingVisible(false);
        setRulesVisible(true);
    }

    function sortCompetitors() {
        if(competitors) {
            competitors.sort((a, b) => b.fhtPoints - a.fhtPoints);
            setSortedCompetitors(competitors);
        }
    }

    return (
        <div className="grandPrixInfo-page">
            {countryInfo && (
                <CountryDataContext.Provider value={countryInfo}>
                    <div className="nationalList-page">
                        <Navbar />
                        <main>
                            <Header />
                            <nav className="tournament-navbar">
                                <button onClick={handleRankingButton}> Ranking </button>
                                <button onClick={handleRulesButton}> Zasady </button>
                            </nav>
                            { rankingVisible &&
                                <Ranking ranking = {sortedCompetitors}/>
                            }
                            { rulesVisible &&
                                <Rules type = 'wc' />
                            }
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}

function Ranking({ranking}) {
    let i = 1;
    return (
        <div className="ranking">
            <table>
                <tr>
                    <th> Lp. </th>
                    <th> Imię i nazwisko </th>
                    <th> Kraj </th>
                    <th> Strata </th>
                    <th> Punkty </th>
                </tr>
                { ranking.map(item => {
                    if(item.fhtPoints > 0)
                        return <CompetitorRow lp = {i++} name = {item.name} surname={item.surname} countryId={item.countryId} points = {item.fhtPoints}/>
                })}
            </table>
        </div>
    )
}

function Rules(props) {
    return (
        <div className="rules">
            <h1> Zasady dla {props.type} </h1>
        </div>
    )
}

// DO OPTYMALIZACJI (POJAWIA SIE KILKUKROTNIE - grandprixinfo, fhtinfo...)
function CompetitorRow( {lp, name, surname, countryId, points} ) {
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyFlag, usaFlag, estoniaFlag, czechiaFlag];

    return (
        <tr>
            <td> {lp}. </td>
            <td> {name} {surname} </td>
            <td className="flag"> <img src = {flags[countryId]} /> </td>
            <td> 0 </td>
            <td> {points} </td>
        </tr>
    )
}