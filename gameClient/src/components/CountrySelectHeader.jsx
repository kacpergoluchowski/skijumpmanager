import React from "react";
import '../app.scss';
import { Link } from "react-router-dom";
import leavePicBtn from '../assets/images/leaveBtnPic.png';
import continuePicBtn from '../assets/images/continueBtnPic.png'

export default function CountrySelectHeader({ countrySelected }) {
    return (
       <header>
            <h1>Wybierz drużynę</h1>
            <div>
                {!countrySelected && <Link to="/"> <button className="leave-button"> <img src={leavePicBtn} alt="Leave" /> Powrót </button> </Link>}
                {countrySelected && <Link to='/home'> <button className="continue-button"> <img src={continuePicBtn} alt="Continue" /> Kontynnuj </button> </Link>}
            </div>
       </header> 
    );
}
