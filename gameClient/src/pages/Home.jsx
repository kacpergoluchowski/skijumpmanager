import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import Loader from "../components/Loader";

export default function Home() {
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

    useEffect(() => {
        console.log(countryInfo)
    }, [countryInfo])

    return (
        <div>
            {countryInfo && (
                <CountryDataContext.Provider value={countryInfo}>
                    <div className="home-page">
                        <Navbar />
                        <main>
                            <Header />
                            <HomeContent />
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}
