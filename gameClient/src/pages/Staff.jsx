import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import TeamsContent from "../components/TeamsContent";
import TeamsNavbar from "../components/TeamsNavbar";
import StaffNavbar from "../components/StaffNavbar";
import StaffContent from "../components/StaffContent";

export default function Staff() {
    const [countryInfo, setCountryInfo] = useState(undefined);
    const [staff, setStaff] = useState(true);
    const [market, setMarket] = useState(false);

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
                    <div className="staff-page">
                        <Navbar />
                        <main>
                            <Header />
                            <StaffNavbar showStaff={() => setStaff(true)} showMarket={() => setMarket(true)} hideStaff={() => setStaff(false)} hideMarket={() => setMarket(false)}/>
                            <StaffContent staff={staff} market={market}/>
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}
