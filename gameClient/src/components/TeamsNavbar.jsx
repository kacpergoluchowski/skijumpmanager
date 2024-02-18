import React from "react";
import '../app.scss';

export default function TeamsNavbar( {showTeamA, hideTeamA, showTeamB, hideTeamB, showTeamC, hideTeamC} ) {
    return (
        <div className="teams-navbar">
            <button onClick={() => {showTeamA(); hideTeamB(); hideTeamC();}}> Kadra A </button>
            <button onClick={() => {showTeamB(); hideTeamA(); hideTeamC();}}> Kadra B </button>
            <button onClick={() => {showTeamC(); hideTeamA(); hideTeamB()}}> Kadra C </button>
        </div>
    )
}