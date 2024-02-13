import React from "react";
import '../app.scss';
import continuePic from '../assets/images/acceptBtnPic.png';
import leavePic from '../assets/images/leaveBtnPic.png';
import { Link } from "react-router-dom";

export default function ConfirmBox( {rejectCountry} ) {
    return (
        <div className="confirm-box">
            <h1> Czy jesteś pewien wyboru? </h1>
            <div>
                <Link to = '/home'> <button className="continue-button"> <img src = {continuePic} /> Tak </button> </Link>
                <button className="leave-button" onClick={rejectCountry}> <img src = {leavePic} /> Nie </button>
            </div>
        </div>
    )
}