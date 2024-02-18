import React from "react";
import '../app.scss';
import austriaFlag from '../assets/images/austriaFlag.png';
import germanyFlag from '../assets/images/germanyFlag.png';
import sloveniaFlag from '../assets/images/sloveniaFlag.png';
import norwayFlag from '../assets/images/norwayFlag.png';
import japanFlag from '../assets/images/japanFlag.png';
import polandFlag from '../assets/images/polandFlag.png';
import swissFlag from '../assets/images/swissFlag.png';
import finlandFlag from '../assets/images/finlandFlag.png';
import italyflag from '../assets/images/italyFlag.png';
import usaFlag from '../assets/images/usaFlag.png';
import czechiaFlag from '../assets/images/czechiaFlag.png';
import estoniaFlag from '../assets/images/estoniaFlag.png';

export default function CalendarRow( {lp, place, hillSize, countryIndex, day, month, year, worldChamp, rawair, gp, fht} ) {
    month++;
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyflag, usaFlag, czechiaFlag, estoniaFlag]; 

    function formatDate(date) {
        if(date < 10)
            return "0"+date;
        return date;
    }
    
    return (
        <tr className="calendar-row">
            <td className="lp"> {lp}. </td>
            <td> <img src = {flags[countryIndex]} /> {place} 
                    {worldChamp && <span className="event-worldChamp"> (Mistrzostwa świata) </span>} 
                    {rawair && <span className="event-rawair"> (Raw Air) </span>} 
                    {gp && <span className="event-gp"> (Letnie Grand Prix) </span>}
                    {fht && <span className="event-4ht"> (Turniej czterech skoczni) </span>} 
            </td>
            <td> {hillSize}.0 m </td>
            <td> {formatDate(day)}.{formatDate(month)}.{year} </td>
            <td> brak </td>
        </tr>
    )
}