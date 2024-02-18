import React from "react";
import '../app.scss';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import continuePic from '../assets/images/acceptBtnPic.png';
import leavePic from '../assets/images/leaveBtnPic.png';

export default function ConfirmBox({ rejectCountry }) {
    const navigate = useNavigate();

    async function createNewGame() {
        const selectedCountry = {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name')
        }

        try {
            await axios.post('http://localhost:8080/createNewGame', selectedCountry)
                .catch(error => {
                    console.error('Błąd podczas tworzenia folderu i pliku:', error);
                });

            navigate('/home');
        } catch (err) {
            console.error("wystapil blad: ", err)
        }
    }

    return (
        <div className="confirm-box">
            <h1> Czy jesteś pewien wyboru? </h1>
            <div>
                <button className="continue-button" onClick={createNewGame}> <img src={continuePic} /> Tak </button>
                <button className="leave-button" onClick={rejectCountry}> <img src={leavePic} /> Nie </button>
            </div>
        </div>
    )
}
