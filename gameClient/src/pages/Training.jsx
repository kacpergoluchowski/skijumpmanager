import React, { useEffect, useState } from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CountryDataContext from "../context/CountryDataContext";
import axios from 'axios';
import competitors from '../assets/data/competitors.json'
import checkInvasionTechnique from "../assets/utilities/checkInvasionTechnique";
import checkBreakoutTechnique from "../assets/utilities/checkBreakoutTechnique";
import generateJump from "../assets/utilities/generateJump";

export default function Training() {
    const [countryInfo, setCountryInfo] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8080/getSelectedCountryInfo');
                setCountryInfo(response.data);
                console.log(response.data);
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
                    <div className="training-page">
                        <Navbar />
                        <main>
                            <Header />
                            <table>
                                <thead>
                                    <tr className="headlines">
                                        <td className="lp"> Lp. </td>
                                        <td> Imię i nazwisko </td>
                                        <td> Najazd - doświadczenie </td>
                                        <td> Wybicie - doświadczenie </td>
                                        <td> Lot - doświadczenie </td>
                                        <td> Trening </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {competitors.map(competitor => {
                                        if (competitor.countryId == countryInfo.id)
                                            return <CompetitorTrainStats key={competitor.id} {...competitor}/>;
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </main>
                    </div>
                </CountryDataContext.Provider>
            )}
        </div>
    );
}

function CompetitorTrainStats({ name, surname, invasionXp, breakoutXp, flightXp, id, invasionTechnique, breakoutTechnique, flightTechnique, tiredness }) {
    const [trainConfirm, setTrainConfirm] = useState(false);
    invasionXp = invasionXp.toFixed(1);
    breakoutXp = breakoutXp.toFixed(1);
    flightXp = flightXp.toFixed(1);
    return (
        <>
            {!trainConfirm &&
                <tr>
                    <td> 1. </td>
                    <td> {name} {surname} </td>
                    <td> {invasionXp} xp </td>
                    <td> {breakoutXp} xp </td>
                    <td> {flightXp} xp </td>
                    <td> 
                        { Number(tiredness) + 25 <= 100 && <button onClick={() => setTrainConfirm(true)}> Trening! </button> } 
                        { Number(tiredness) + 25 > 100 && `Zmęczony! (${tiredness}%)`}
                    </td>
                </tr>
            }
            {trainConfirm && <TrainingConfirmation hideConfirm={() => setTrainConfirm(false)} name={name} surname={surname} id={id} invasionTechnique={invasionTechnique} breakoutTechnique={breakoutTechnique} flightTechnique={flightTechnique}/>}
        </>

    );
}

function TrainingConfirmation({ hideConfirm, id, name, surname,invasionTechnique, breakoutTechnique, flightTechnique}) {
    async function training() {
        const speed = checkInvasionTechnique(invasionTechnique, 140);
        const breakout = checkBreakoutTechnique(breakoutTechnique);
        const jump = generateJump(speed, breakout, flightTechnique, 140);
        assignExperience(id, jump[0]);
        window.alert(`${name} ${surname} uzyskał ${jump[0]} metrów!`);
    }

    async function assignExperience(id, distance) {
        const experience = new Array();
        experience.push(id);
        if(distance < 50) {
            for(let i = 0; i < 3; i++) {
                let exp = Math.random() * 50 + 1;
                exp = exp.toFixed(1);
                experience.push(Number(exp));
            }
            console.log(experience);
        }
        else if(distance < 90) {
            for(let i = 0; i < 3; i++) {
                let exp = Math.random() * 30 + 50;
                exp = exp.toFixed(1);
                experience.push(Number(exp));
            }
            console.log(experience);
        }
        else if(distance < 110) {
            for(let i = 0; i < 3; i++) {
                let exp = Math.random() * 20 + 80;
                exp = exp.toFixed(1);
                experience.push(Number(exp));
            }
            console.log(experience);
        }
        else if(distance < 130) {
            for(let i = 0; i < 3; i++) {
                let exp = Math.random() * 30 + 100;
                exp = exp.toFixed(1);
                experience.push(Number(exp));
            }
            console.log(experience);
        }
        else if(distance < 150) {
            for(let i = 0; i < 3; i++) {
                let exp = Math.random() * 40 + 130;
                exp = exp.toFixed(1);
                experience.push(Number(exp));
            }
            console.log(experience);
        }
        else {
            for(let i = 0; i < 3; i++) {
                let exp = Math.random() * 50 + 170;
                exp = exp.toFixed(1);
                experience.push(Number(exp));
            }
            console.log(experience);
        }
        await axios.post('http://127.0.0.1:8080/training', experience);
    }

    function handleGeneralTraining() {
        training();
        hideConfirm();
    }

    return (
        <tr className="training-confirm">
            <td> 1. </td>
            <td> {name} {surname} </td>
            <td> <button> Nacisk na najazd </button> </td>
            <td> <button> Nacisk na wybicie </button> </td>
            <td> <button> Nacisk na lot </button> </td>
            <td> <button onClick={() => handleGeneralTraining('general')}> Trening ogólny </button> </td>
        </tr>
    )
}
