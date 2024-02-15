import React, { useContext, useEffect, useState } from "react";
import '../app.scss';
import austriaFlag from '../assets/images/austriaFlag.png';
import germanyFlag from '../assets/images/germanyFlag.png';
import sloveniaFlag from '../assets/images/sloveniaFlag.png';
import norwayFlag from '../assets/images/norwayFlag.png';
import japanFlag from '../assets/images/japanFlag.png';
import polandFlag from '../assets/images/polandFlag.png';
import swissFlag from '../assets/images/swissFlag.png';
import finlandFlag from '../assets/images/finlandFlag.png';
import italyflag from '../assets/images/italyFlag.png';
import usaFlag from '../assets/images/usaFlag.png';
import czechiaFlag from '../assets/images/czechiaFlag.png';
import estoniaFlag from '../assets/images/estoniaFlag.png';
import continueBtnPic from '../assets/images/continueBtnPic.png';
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';


export default function Header() {
    const savegameData = useContext(CountryDataContext);
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyflag, usaFlag, czechiaFlag, estoniaFlag]; 

    const days = ['Poniedziałek,', 'Wtorek,', 'Środa,', 'Czwartek,', 'Piątek,', 'Sobota,', 'Niedziela,'];
    const months = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paz", "lis", "gru"];
    const [currentDate, setCurrentDate] = useState(new Date(savegameData.year, savegameData.month, savegameData.day));
    const [currentMonth, setCurrentMonth] = useState(months[currentDate.getMonth()]);
    const [currentDay, setCurrentDay] = useState(days[currentDate.getDay()]);
    const [currentYear, setCurrentYear] = useState(savegameData.year);
    const [toNextCompetitions, setToNextCompetitions] = useState(undefined);

    useEffect(() => {
        setToNextCompetitions(nextCompetitions());
    }, [currentDate]); // Dodajemy zależność od zmiany daty, aby wywołać useEffect po każdej zmianie daty

    async function goToNextDay() {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
    
        const currentDayOfWeek = days[nextDay.getDay()];
        const currentMonth = months[nextDay.getMonth()];
        const currentYear = nextDay.getFullYear();
    
        setCurrentDate(nextDay);
        setCurrentDay(currentDayOfWeek);
        setCurrentMonth(currentMonth);
        setCurrentYear(currentYear);
        
        const date = [nextDay.getDate(), nextDay.getMonth(), currentYear];
    
        try {
            await axios.post('http://localhost:8080/refreshDate', date);
        } catch (error) {
            console.error('Wystąpił błąd podczas aktualizacji daty:', error);
        }
    }

    function nextCompetitions() {
        const competitionsDate = new Date('2024-07-28');
        const diff = competitionsDate.getTime() - currentDate.getTime();
        return diff > 0 ? Math.ceil(diff / (1000 * 3600 * 24)) : 0; 
    }
    
    return (
        <header className="header">
            {savegameData && (
                <>
                    <img src={flags[savegameData.id]} alt="Flaga" />
                    <section>
                        <div>
                            <h1> Dom </h1>
                            <h3> Następne zawody za {toNextCompetitions} dni </h3>
                        </div>
                        <div className="date">
                            <h3> {currentDay} </h3>
                            <h3> {currentDate.getDate()} {currentMonth} {currentYear} </h3>
                        </div>
                    </section>
                    <button className="continue-button" onClick={goToNextDay}>Kontynuuj</button>
                </>
            )}
        </header>
    )
}
