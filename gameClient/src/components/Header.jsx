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
import italyFlag from '../assets/images/italyFlag.png';
import usaFlag from '../assets/images/usaFlag.png';
import czechiaFlag from '../assets/images/czechiaFlag.png';
import estoniaFlag from '../assets/images/estoniaFlag.png';
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';

const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyFlag, usaFlag, czechiaFlag, estoniaFlag]; 

const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const months = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paz", "lis", "gru"];

export default function Header() {
    const savegameData = useContext(CountryDataContext);
    const [currentDate, setCurrentDate] = useState(new Date(savegameData.year, savegameData.month, savegameData.day)); // aktualna data w grze
    const [currentMonth, setCurrentMonth] = useState(months[currentDate.getMonth()]); // aktualny miesiac 
    const [currentDay, setCurrentDay] = useState(days[currentDate.getDay()]); // aktualny dzien
    const [currentYear, setCurrentYear] = useState(savegameData.year); // aktualny dzien
    const [toNextCompetitions, setToNextCompetitions] = useState(undefined); // ile pozostalo dni do nastepnych zawodow
    const [calendarInfo, setCalendarInfo] = useState(undefined); // kalendarz dla aktualnego sezonu
    const [nextCompetitionsDate, setNextCompetitionsDate] = useState(undefined); // data nastepnych zawodow
    const [competitionsToday, setCompetitionsToday] = useState(false); // bool przechowujacy informacje na temat tego czy sa dzis zawody

    useEffect(() => {
        const fetchCalendarInfo = async () => { 
            try {
                const calendarInfoResponse = await axios.post('http://127.0.0.1:8080/getCalendar');
                setCalendarInfo(calendarInfoResponse.data);
            } catch (error) {
                console.error("Błąd podczas pobierania informacji o kalendarzu:", error);
            }
        };

        fetchCalendarInfo();
        setToNextCompetitions(nextCompetitions());
        checkNextCompetitions();
    }, [currentDate, nextCompetitionsDate]);

    useEffect(() => {
        if (calendarInfo) {
            for (let i = 0; i < calendarInfo.length; i++) {
                if (calendarInfo[i].ended) {
                    console.log(calendarInfo[i].place);
                } else {
                    const next = new Date(calendarInfo[i].year, calendarInfo[i].month, calendarInfo[i].day);
                    setNextCompetitionsDate(next);
                    break;
                }
            }
        }
    }, [calendarInfo]);

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
        const competitionsDate = nextCompetitionsDate;
        const diff = competitionsDate - currentDate;
        return diff > 0 ? Math.ceil(diff / (1000 * 3600 * 24)) : 0; 
    }

    function checkNextCompetitions() {
        if(currentDate && nextCompetitionsDate) {
            if(currentDate.getTime() == nextCompetitionsDate.getTime())
                setCompetitionsToday(true);
            else
                setCompetitionsToday(false);
        }
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
                    { !competitionsToday && <button className="continue-button" onClick={goToNextDay}> Kontynuuj </button> }
                    { competitionsToday && <button className="continue-button"> Zawody! </button> }
                </>
            )}
        </header>
    )
};