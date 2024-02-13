import React, { useState } from "react";
import '../app.scss';
import { Link } from "react-router-dom";
import leavePicBtn from '../assets/images/leaveBtnPic.png';
import continuePicBtn from '../assets/images/continueBtnPic.png'
import ConfirmBox from "./ConfirmBox";

export default function CountrySelectHeader({ countrySelected }) {
    const [confirmBoxVisible, setConfirmBoxVisible] = useState(false);

    return (
       <header>
            <h1>Wybierz drużynę</h1>
            <div>
                {!countrySelected && <Link to="/"> <button className="leave-button"> <img src={leavePicBtn} alt="Leave" /> Powrót </button> </Link>}
                {countrySelected && <button className="continue-button" onClick={() => setConfirmBoxVisible(true)}> <img src={continuePicBtn} alt="Continue" /> Kontynnuj </button>}
            </div>
            { confirmBoxVisible && <ConfirmBox rejectCountry = {() => setConfirmBoxVisible(false)} /> }
       </header> 
    );
}
