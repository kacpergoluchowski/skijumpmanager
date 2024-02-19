import React, { useEffect, useState } from "react";
import '../app.scss';
import competitors from '../assets/data/competitors.json';
import checkInvasionTechnique from '../assets/utilities/checkInvasionTechnique';
import checkBreakoutTechnique from '../assets/utilities/checkBreakoutTechnique';
import generateJump from '../assets/utilities/generateJump';
import ResultsRow from "../components/ResultsRow";

import { Link } from "react-router-dom";
import axios from "axios";

export default function Competitions() {
    const [nextCompetitions, setNextCompetitions] = useState(null);
    const [firstRoundBtn, setFirstRoundBtn] = useState(true);
    const [secondRoundBtn, setSecondRoundBtn] = useState(false);
    const [endCompetitionBtn, setEndCompetitionBtn] = useState(false);
    const [results, setResults] = useState(new Array());
    const [tbodyKey, setTbodyKey] = useState(0); // Dodatkowy stan jako klucz dla <tbody>
    let i = 0;
    

    useEffect(() => {
        async function getNextCompetitions() {
            try {
                const calendarInfoResponse = await axios.post(
                    "http://127.0.0.1:8080/getCalendar"
                );
                const competitions = calendarInfoResponse.data;

                const nextCompetition = competitions.find(
                    (competition) => !competition.ended
                );

                if (nextCompetition) {
                    setNextCompetitions(nextCompetition);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania kalendarza:", error);
            }
        }

        getNextCompetitions();
    }, []);

    let teamAcompetitors = new Array();

    function firstRound() {
        setFirstRoundBtn(false);
        let updatedResults = [];

        competitors.forEach(competitor => {
            if (competitor.teamA)
                teamAcompetitors.push(competitor);
        })

        teamAcompetitors.reverse();
        processCompetitor(0);

        function processCompetitor(i) {
            if (i == teamAcompetitors.length)
                setSecondRoundBtn(true);
            let firstJump;

            if (i <= teamAcompetitors.length - 1) {
                const firstSpeed = checkInvasionTechnique(teamAcompetitors[i].invasionTechnique, nextCompetitions.hillSize);
                const firstBreakout = checkBreakoutTechnique(teamAcompetitors[i].breakoutTechnique);
                firstJump = generateJump(firstSpeed, firstBreakout, teamAcompetitors[i].flightTechnique, nextCompetitions.hillSize);

                let firstPoints = (firstJump[0] - 90) * 1.8 + firstJump[1];
                firstPoints = firstPoints.toFixed(1);

                updatedResults[i] = {
                    id: teamAcompetitors[i].id,
                    name: teamAcompetitors[i].name,
                    surname: teamAcompetitors[i].surname,
                    firstSpeed: firstSpeed,
                    firstDistance: firstJump[0],
                    firstNot: firstJump[1],
                    firstPoints: firstPoints,
                    secondSpeed: null,
                    secondDistance: null,
                    secondNot: null,
                    secondPoint: null,
                    finalPoints: null
                }
                updatedResults.sort((a, b) => b.firstPoints - a.firstPoints);
                setResults(updatedResults);
                console.log(teamAcompetitors);
                setTbodyKey(prevKey => prevKey + 1);
                setTimeout(() => {
                    processCompetitor(i + 1);
                }, [1500]);
            }
        }
    }

    function secondRound() {
        setSecondRoundBtn(false);
        results.sort((a, b) => b.finalPoints - a.finalPoints);
        results.splice(30, results.length);
        let updatedResults = [];

        results.reverse();
        processCompetitor(0);

        function processCompetitor(i) {
            if (i == teamAcompetitors.length)
                setSecondRoundBtn(true);
            let secondJump;

            if (i <= results.length - 1) {
                const secondSpeed = checkInvasionTechnique(competitors[results[i].id].invasionTechnique, nextCompetitions.hillSize);
                const secondBreakout = checkBreakoutTechnique(competitors[results[i].id].breakoutTechnique);
                secondJump = generateJump(secondSpeed, secondBreakout, competitors[results[i].id].flightTechnique, nextCompetitions.hillSize);
            
                let secondPoints = (secondJump[0] - 90) * 1.8 + secondJump[1];
                secondPoints = secondPoints.toFixed(1); 
                console.log(results[i].firstPoints);
                let finalPoints = Number(results[i].firstPoints) + Number(secondPoints);
                finalPoints = finalPoints.toFixed(1);
            
                updatedResults[i] = {
                    name: results[i].name,
                    surname: results[i].surname,
                    firstSpeed: results[i].firstSpeed,
                    firstDistance: results[i].firstDistance,
                    firstNot: results[i].firstNot,
                    firstPoints: results[i].firstPoints,
                    secondSpeed: secondSpeed,
                    secondDistance: secondJump[0],
                    secondNot: secondJump[1],
                    secondPoint: secondPoints,
                    finalPoints: finalPoints
                };
                

                updatedResults.sort((a, b) => b.finalPoints - a.finalPoints);
                setResults(updatedResults);
                setTbodyKey(prevKey => prevKey + 1);
                setTimeout(() => {
                    processCompetitor(i + 1);
                }, [1500]);
            }
        }
    }


    return (
        <div className="competitions-page">
            <header className="competitions-header">
                {nextCompetitions && (
                    <div className="competitions-place">
                        <h1>
                            {nextCompetitions.place} HS{nextCompetitions.hillSize}
                        </h1>
                    </div>
                )}
                {firstRoundBtn && <button className="continue-button" onClick={firstRound}> Rozpocznij 1 serię </button>}
                {secondRoundBtn && <button className="continue-button" onClick={secondRound}> Rozpocznij 2 serię </button>}
                {endCompetitionBtn && <Link to="/home"> <button className="continue-button"> Zakończ zawody </button> </Link>}
            </header>
            <table>
                <thead>
                    <tr>
                        <th className="lp"> Lp. </th>
                        <th> Imię </th>
                        <th> Nazwisko </th>
                        <th> Belka </th>
                        <th> Prędkość </th>
                        <th> Dystans </th>
                        <th> Styl </th>
                        <th> Punkty </th>
                        <th> </th>
                        <th> Belka </th>
                        <th> Prędkość </th>
                        <th> Dystans </th>
                        <th> Styl </th>
                        <th> Punkty </th>
                    </tr>
                </thead>

                <tbody key={tbodyKey}>
                    {results && results.map(result => {
                        i++;
                        return <ResultsRow
                            lp={i}
                            name={result.name}
                            surname={result.surname}
                            firstSpeed={result.firstSpeed}
                            firstDistance={result.firstDistance}
                            firstStyle={result.firstNot}
                            firstPoints={result.firstPoints}
                            secondSpeed={result.secondSpeed}
                            secondDistance={result.secondDistance}
                            secondStyle={result.secondNot}
                            finalPoints={result.finalPoints}
                        />
                    })}
                </tbody>
            </table>
        </div>
    )
}