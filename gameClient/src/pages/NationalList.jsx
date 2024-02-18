import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import NationalListContent from "../components/NationalListContent";

export default function NationalList() {
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
        <div>
            {countryInfo && (
                <CountryDataContext.Provider value={countryInfo}>
                    <div className="nationalList-page">
                        <Navbar />
                        <main>
                            <Header />
                            <NationalListContent />
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}
