import React from "react";
import '../app.scss'
import playGamePic from '../assets/images/playGameBtnPic.png'
import settingsPic from '../assets/images/settingsBtnPic.png';
import leavePic from '../assets/images/leaveBtnPic.png';
import { Link } from "react-router-dom";

export default function ButtonsBox() {
    return (
        <div className="buttons-box">
            <Link to = '/select-country'> <button> <img src = {playGamePic} /> Rozpocznij grę </button> </Link>
            <button> <img src = {settingsPic} /> Ustawienia </button>
            <button> <img src = {leavePic} />Zamknij grę </button>
        </div>
    )
}