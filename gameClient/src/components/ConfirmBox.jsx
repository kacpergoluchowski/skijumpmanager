import React, { useState } from "react";
import '../app.scss';
import continuePic from '../assets/images/acceptBtnPic.png';
import leavePic from '../assets/images/leaveBtnPic.png';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from "./Loader";

export default function ConfirmBox( {rejectCountry} ) {
    const [loaderVisible, setLoaderVisible] = useState(false);
    const navigate = useNavigate();
    
    async function createNewGame() {
        setLoaderVisible(true);
        const selectedCountry = {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name')
        }

        console.log(selectedCountry);

        await axios.post('http://localhost:8080/createNewGame', selectedCountry).then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Błąd podczas tworzenia folderu i pliku:', error);
          });

        setTimeout(() => {
            navigate('/home');
            setLoaderVisible(false);
        }, 3000)
    }

    return (
        <div className="confirm-box">
            <h1> Czy jesteś pewien wyboru? </h1>
            <div>
                <button className="continue-button" onClick={createNewGame}> <img src = {continuePic} /> Tak </button>
                <button className="leave-button" onClick={rejectCountry}> <img src = {leavePic} /> Nie </button>
            </div>
            { loaderVisible && <Loader /> }
        </div>
    )
}

