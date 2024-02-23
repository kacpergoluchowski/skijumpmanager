import React from "react";
import '../app.scss';

export default function StaffNavbar( {showStaff, showMarket, hideStaff, hideMarket} ) {
    return (
        <div className="staff-navbar">
            <button onClick={() => {showStaff(); hideMarket()}}> Sztab </button>
            <button onClick={() => {hideStaff(); showMarket()}}> Rynek trenerów </button>
        </div>
    )
}