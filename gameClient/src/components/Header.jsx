import React, { useContext, useState } from "react";
import '../app.scss';
import austriaFlag from '../assets/images/austriaFlag.png';
import germanyFlag from '../assets/images/germanyFlag.png';
import sloveniaFlag from '../assets/images/sloveniaFlag.png';
import norwayFlag from '../assets/images/norwayFlag.png';
import continueBtnPic from '../assets/images/continueBtnPic.png';
import CountryDataContext from "../context/CountryDataContext";

export default function Header() {
    const countryData = useContext(CountryDataContext);
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag]; // do dokonczenia

    let [currentDate, setCurrentDate] = useState(new Date(2024, 5, 10));
    let [currentMonth, setCurrentMonth] = useState('cze');
    let [currentDay, setCurrentDay] = useState('poniedziałek');

    const goToNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setCurrentDate(nextDay)

        const days = ['Poniedziałek,', 'Wtorek,', 'Środa,', 'Czwartek,', 'Piątek,', 'Sobota,', 'Niedziela,'];
        setCurrentDay(days[currentDate.getDay()]);
        console.log(currentDate.getDay());

        const months = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paz", "lis", "gru"];
        setCurrentMonth(months[currentDate.getMonth()]);
    }

    return (
        <header className="header">
            <img src = {flags[countryData.id]} />
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
            <button className="continue-button" onClick={() => goToNextDay()}> <img src = {continueBtnPic} /> Kontynuuj </button>
            
        </header>
    )
}