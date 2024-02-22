import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import TeamsContent from "../components/TeamsContent";
import TeamsNavbar from "../components/TeamsNavbar";

export default function Teams() {
    const [countryInfo, setCountryInfo] = useState(undefined);
    const [teamA, setTeamA] = useState(true);
    const [teamB, setTeamB] = useState(false);
    const [teamC, setTeamC] = useState(false);

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
                    <div className="teams-page">
                        <Navbar />
                        <main>
                            <Header />
                            <TeamsNavbar 
                                showTeamA={() => setTeamA(true)} 
                                hideTeamA={() => setTeamA(false)}
                                showTeamB={() => setTeamB(true)} 
                                hideTeamB={() => setTeamB(false)}
                                showTeamC={() => setTeamC(true)} 
                                hideTeamC={() => setTeamC(false)}
                            />
                            <TeamsContent teamA={teamA} teamB={teamB} teamC={teamC} />
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}