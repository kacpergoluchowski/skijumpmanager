import React, { useContext, useState } from "react";
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
    let [currentDate, setCurrentDate] = useState(new Date(savegameData.year, savegameData.month, savegameData.day));
    let [currentMonth, setCurrentMonth] = useState('cze');
    let [currentDay, setCurrentDay] = useState(days[currentDate.getDay()]);
    let [currentYear, setCurrentYear] = useState(savegameData.year);

    async function goToNextDay() {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
    
        const currentDayOfWeek = days[nextDay.getDay()];
    
        const currentMonth = months[nextDay.getMonth()];
    
        const currentYear = nextDay.getFullYear();
    
        setCurrentDate(nextDay);
        setCurrentDay(currentDayOfWeek);
        setCurrentMonth(currentMonth);
    
        const date = [nextDay.getDate(), nextDay.getMonth(), currentYear];
    
        try {
            await axios.post('http://localhost:8080/refreshDate', date);
        } catch (error) {
            console.error('Wystąpił błąd podczas aktualizacji daty:', error);
        }
    }
    
    return (
        <header className="header">
            {savegameData && (
                <>
                    <img src={flags[savegameData.id]} />
                    <section>
                        <div>
                            <h1> Dom </h1>
                            <h3> Następne zawody za 65 dni </h3>
                        </div>
                        <div className="date">
                            <h3> {currentDay} </h3>
                            <h3> {currentDate.getDate()} {currentMonth} {currentDate.getYear() + 1900} </h3>
                        </div>
                    </section>
                    <button className="continue-button" onClick={() => goToNextDay()}> <img src={continueBtnPic} /> Kontynuuj </button>
                </>
            )}
        </header>
    )
}