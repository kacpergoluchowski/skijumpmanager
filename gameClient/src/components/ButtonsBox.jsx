import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../app.scss'
import playGamePic from '../assets/images/playGameBtnPic.png'
import settingsPic from '../assets/images/settingsBtnPic.png';
import leavePic from '../assets/images/leaveBtnPic.png';

export default function ButtonsBox() {
    const navigate = useNavigate();

    async function loadingSave() {
        const response = await axios.post('http://localhost:8080/loadingSave');
        
        if(response.data.success)
            navigate('/home');
        else 
            navigate('/select-country');
    }

    return (
        <div className="buttons-box">
            <Link to = '/select-country'> <button onClick={loadingSave}> <img src = {playGamePic} /> Rozpocznij grę </button> </Link>
            <button> <img src = {settingsPic} /> Ustawienia </button>
            <button> <img src = {leavePic} />Zamknij grę </button>
        </div>
    )
}