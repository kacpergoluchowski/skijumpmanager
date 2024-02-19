import React, { useEffect, useState } from "react";
import '../app.scss';
import { Link } from "react-router-dom";
import axios from 'axios'
import generateCompetition from "../assets/utilities/generateCompetition";

export default function CompetitionsHeader() {
    const [nextCompetitions, setNextCompetitions] = useState([]);
    const [startCompetitions, setStartCompetitions] = useState(true);
    const [endCompetitions, setEndCompetitions] = useState(false);

    useEffect(() => {
        async function getNextCompetitions() {
            const calendarInfoResponse = await axios.post('http://127.0.0.1:8080/getCalendar');

            for (let i = 0; i < calendarInfoResponse.data.length; i++) {
                const competition = calendarInfoResponse.data[i];
                if (!competition.ended) {
                    setNextCompetitions(competition);
                    break;
                }
            }
        }

        getNextCompetitions();
    }, [])

    return (
        <header className="competitions-header">
            { nextCompetitions && 
                <div className="competitions-place">
                    <h1> {nextCompetitions.place} HS{nextCompetitions.hillSize}</h1>
                </div>
            }
            { startCompetitions && <button className="continue-button" onClick={() => generateCompetition(nextCompetitions.hillSize)}> Rozpocznij zawody </button> }
            { endCompetitions && <Link to='/home'> <button className="continue-button"> Zakończ zawody </button> </Link> }
        </header>
    )
}