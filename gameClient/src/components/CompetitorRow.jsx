import React from "react";
import '../app.scss';

export default function CompetitorRow( {name, surname, age, invasionTechnique, breakoutTechnique, flightTechnique} ) {
    return (
        <tr>
            <td> {name} </td>
            <td> {surname} </td>
            <td> {age} </td>
            <td> {invasionTechnique} </td>
            <td> {breakoutTechnique} </td>
            <td> {flightTechnique} </td>
        </tr>
    )
}