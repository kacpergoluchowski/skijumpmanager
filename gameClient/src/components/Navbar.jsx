import React from "react";
import '../app.scss';
import homePagePic from '../assets/images/homePagePic.png';
import skiJumpersCadrePic from '../assets/images/skiJumpersCadre.png';
import nationalListPic from '../assets/images/nationalList.png';
import staffPic from '../assets/images/staffPic.png';
import competitionPic from '../assets/images/competitionsPic.png';
import calendarPic from '../assets/images/calendarPic.png';
import trainingPic from '../assets/images/trainingPic.png';
import campsPic from '../assets/images/campsPic.png';
import technologyPic from '../assets/images/technologyPic.png';
import shopPic from '../assets/images/shopPic.png';
import finacialPic from '../assets/images/finacialPic.png';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to = '/home'> <button> <img src = {homePagePic} /> Home </button> </Link>
            <button> <img src = {skiJumpersCadrePic} /> Kadra </button>
            <button> <img src = {nationalListPic} /> Lista krajowa </button>
            <button> <img src = {staffPic} /> Sztab </button>
            <button> <img src = {competitionPic} /> Zawody </button>
            <Link to = '/calendar'> <button> <img src = {calendarPic} /> Kalendarz </button> </Link>
            <button> <img src = {trainingPic} /> Trening </button>
            <button> <img src = {campsPic} /> Obozy </button>
            <button> <img src = {technologyPic} /> Technologia </button>
            <button> <img src = {shopPic} /> Sklep </button>
            <button> <img src = {finacialPic} /> Finanse </button>
        </nav>
    )
}