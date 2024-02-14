import React from "react";
import '../app.scss';
import continuePic from '../assets/images/acceptBtnPic.png';
import leavePic from '../assets/images/leaveBtnPic.png';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function ConfirmBox( {rejectCountry} ) {
    function createNewGame() {
        const selectedCountry = {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name')
        }

        console.log(selectedCountry);

        axios.post('http://localhost:8080/createNewGame', selectedCountry).then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Błąd podczas tworzenia folderu i pliku:', error);
          });
    }

    return (
        <div className="confirm-box">
            <h1> Czy jesteś pewien wyboru? </h1>
            <div>
                <Link to = '/home'> <button className="continue-button" onClick={createNewGame}> <img src = {continuePic} /> Tak </button> </Link>
                <button className="leave-button" onClick={rejectCountry}> <img src = {leavePic} /> Nie </button>
            </div>
        </div>
    )
}