import React, { useEffect, useState } from "react";
import '../app.scss';
import axios from 'axios'
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
import czechiaFlag from '../assets/images/czechiaFlag.png';
import estoniaFlag from '../assets/images/estoniaFlag.png';

export default function CalendarBox() {
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyFlag, usaFlag, estoniaFlag, czechiaFlag]; 

    const [currentCalendar, setCurrentCalendar] = useState([]);
    const [nextCompetitions, setNextCompetitions] = useState([]);

    useEffect(() => {
        async function fetchCalendar() {
            try {
                const response = await axios.post('http://127.0.0.1:8080/getCalendar');
                setCurrentCalendar(response.data);
            } catch (error) {
                console.error("Error fetching calendar:", error);
            }
        }

        fetchCalendar();
    }, []);

    useEffect(() => {
        if (currentCalendar && Array.isArray(currentCalendar)) {
            const filteredCompetitions = currentCalendar.filter(week => !week.ended);
            const limitedCompetitions = filteredCompetitions.slice(0, 6);
            setNextCompetitions(limitedCompetitions);
            console.log(limitedCompetitions);
        }
    }, [currentCalendar]);

    return (
        <div className="home-card">
            <h1> Kalendarz </h1>
            <table className="calendar-card">
                {nextCompetitions.map((week, index) => (
                    <tr key={index}>
                        <td className="competitions-row"><img src = {flags[week.countryId]} /> {week.place}</td>
                        <td className="competitions-date-row"> {week.day}.{week.month+1}.{week.year} </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
