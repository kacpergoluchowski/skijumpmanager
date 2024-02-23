import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import NationalListContent from "../components/NationalListContent";
import TournamentsContent from "../components/TournamentsContent";

export default function Tournaments() {
    const [countryInfo, setCountryInfo] = useState(undefined);

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
    }, []);

    return (
        <div className="tournaments-page">
            {countryInfo && (
                <CountryDataContext.Provider value={countryInfo}>
                    <div className="divek">
                        <Navbar />
                        <main>
                            <Header />
                            <TournamentsContent />
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}