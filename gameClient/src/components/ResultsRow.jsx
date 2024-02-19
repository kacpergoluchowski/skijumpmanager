import React, { useEffect, useState } from "react";
import '../app.scss';

export default function ResultsRow({ lp, name, surname, firstSpeed, firstDistance, firstStyle, firstPoints, secondSpeed, secondDistance, secondStyle, finalPoints }) {
    if(firstDistance) {
        var numberString = firstDistance;
        var floatValue = parseFloat(numberString);
        var firstDecimalPlace = parseFloat(floatValue.toFixed(1));
        var firstDecimalPlace = Math.floor(floatValue * 10) % 10;
        if(firstDecimalPlace != 5)
            firstDistance = firstDistance + ".0"
    }
    if(secondDistance) {
        var numberString = secondDistance;
        var floatValue = parseFloat(numberString);
        var firstDecimalPlace = parseFloat(floatValue.toFixed(1));
        var firstDecimalPlace = Math.floor(floatValue * 10) % 10;
        if(firstDecimalPlace != 5)
            secondDistance = secondDistance + ".0"
    }

    return (
        <tr>
            <td>{lp}. </td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>10</td>
            <td>{firstSpeed}</td>
            <td>{firstDistance} m</td>
            <td>{firstStyle}</td>
            <td>{firstPoints}</td>
            <td></td>
            <td>{finalPoints && '10'}</td>
            <td>{secondSpeed}</td>
            <td>{secondDistance} {secondDistance && 'm'}</td>
            <td>{secondStyle}</td>
            <td>{finalPoints}</td>
        </tr>

    );
}
