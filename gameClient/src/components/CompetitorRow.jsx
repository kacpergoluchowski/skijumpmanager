import React, { useState } from "react";
import '../app.scss';
import axios from 'axios'

export default function CompetitorRow({ id, name, surname, age, invasionTechnique, breakoutTechnique, flightTechnique }) {
    const [switchCadreVisible, setSwitchCadreVisible] = useState(false);

    async function switchCompetitors(team) {
        const sendData = [id, team];
        console.log(sendData);
        await axios.post('http://127.0.0.1:8080/switchCompetitors', sendData);
    }

    return (
        <>
            <tr className="competitor" onClick={() => setSwitchCadreVisible(true)}>
                <td> {name} </td>
                <td> {surname} </td>
                {!switchCadreVisible && (
                    <>
                        <td> {age} </td>
                        <td> {invasionTechnique} </td>
                        <td> {breakoutTechnique} </td>
                        <td> {flightTechnique} </td>
                    </>
                )}
                {switchCadreVisible && (
                    <>
                        <td onClick={() => switchCompetitors('teamA')}> Przesuń do kadry A </td>
                        <td onClick={() => switchCompetitors('teamB')}> Przesuń do kadry B </td>
                        <td onClick={() => switchCompetitors('teamC')}> Przesuń do kadry C </td>
                        <td onClick={() => switchCompetitors('none')}> Odsuń z zespołu </td>
                    </>
                )}
            </tr>
        </>

    )
}