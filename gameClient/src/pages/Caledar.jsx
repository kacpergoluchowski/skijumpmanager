import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import CalendarContent from "../components/CalendarContent";

export default function Calendar() {
    const [countryInfo, setCountryInfo] = useState(undefined);
    const [calendarInfo, setCalendarInfo] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countryInfo = await axios.post('http://127.0.0.1:8080/getSelectedCountryInfo');
                setCountryInfo(countryInfo.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(calendarInfo)
    }, [calendarInfo])

    return (
        <div>
            {countryInfo && (
                <CountryDataContext.Provider value={countryInfo}>
                    <div className="calendar-page">
                        <Navbar />
                        <main>
                            <Header />
                            <CalendarContent />
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}
