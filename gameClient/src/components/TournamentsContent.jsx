import React from "react";
import '../app.scss';
import TorunamentCard from "./TournamentCard";
import sgImage from '../assets/images/gp-image.png';
import wcImage from '../assets/images/wc-image.png';
import fhtImage from '../assets/images/fht-image.png';
import rawairImage from '../assets/images/rawair-image.png';
import { Link } from "react-router-dom";

export default function TournamentsContent() {
    return (
        <div className="tournaments-content">
            <Link to = '/grandPrixInfo'> <TorunamentCard tournamentName={"Letnie Grand Prix"} image = {sgImage} /> </Link>
            <Link to = '/worldCupInfo'> <TorunamentCard tournamentName={"Puchar Świata"} image = {wcImage} /> </Link>
            <Link to = '/fhtInfo'> <TorunamentCard tournamentName={"Turniej 4 skoczni"} image = {fhtImage} /></Link>
            <TorunamentCard tournamentName={"Raw Air"} image = {rawairImage} />
        </div>
    )
}