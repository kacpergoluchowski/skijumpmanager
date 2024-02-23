import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import '../app.scss';
import coachs from '../assets/data/coachs.json';

export default function StaffContent({ staff, market }) {

    return (
        <div className="staff-content">
            {staff && <Staff />}
            {market && <Market coachs={coachs} />}
        </div>
    )
}

function Staff() {
    const [coachB, setCoachB] = useState(null);
    const [coachC, setCoachC] = useState(null);

    useEffect(() => {
        const foundCoachB = coachs.find(coach => coach.teamB);
        const foundCoachC = coachs.find(coach => coach.teamC);

        if (foundCoachB) setCoachB(foundCoachB);
        if (foundCoachC) setCoachC(foundCoachC);
    }, []);

    return (
        <table className="coach-market">
            <tbody>
                <tr>
                    <th> Posada </th>
                    <th> Imię i nazwisko </th>
                    <th> Pensja </th>
                    <th> Zwolnij </th>
                </tr>
                <tr>
                    <td> Trener Kadry A: </td>
                    <td> Kacper Gołuchowski </td>
                    <td> 15000 pln </td>
                </tr>
                <tr>
                    <td> Trener Kadry B:  </td>
                    <td> {coachB && coachB.name && coachB.surname && `${coachB.name} ${coachB.surname}`} </td>
                    <td> {coachB && coachB.salary && `${coachB.salary} pln`} </td>
                    <td> {coachB && <button> Zwolnij </button> }</td>
                </tr>
                <tr>
                    <td> Asystent trenera Kadry B: </td>
                    <td>  </td>
                </tr>
                <tr>
                    <td> Trener Kadry C: </td>
                    <td> {coachC && coachC.name && coachC.surname && `${coachC.name} ${coachC.surname}`} </td>
                    <td> {coachC && coachC.salary && `${coachC.salary} pln`} </td>
                    <td> {coachC && <button> Zwolnij </button> } </td>
                </tr>
                <tr>
                    <td> Asystent trenera Kadry C: </td>
                    <td>  </td>
                </tr>
            </tbody>
        </table>
    )
}

function Market({ coachs }) {

    return (
        <table className="coach-market">
            <thead>
                <tr>
                    <th> Imię i nazwisko </th>
                    <th> Wiek </th>
                    <th> Umiejętności </th>
                    <th> Pensja </th>
                    <th> Zatrudnij </th>
                </tr>
            </thead>
            <tbody>
                {coachs.map(coach => {
                    if (!coach.teamA && !coach.teamB && !coach.teamC) {
                        return (
                            <CoachRow
                                key={coach.id}
                                id={coach.id}
                                name={coach.name}
                                surname={coach.surname}
                                age={coach.age}
                                skill={coach.skill}
                                salary={coach.salary}
                            />
                        );
                    }
                    return null;
                })}
            </tbody>

        </table>
    )
}

function CoachRow({ id, name, surname, age, skill, salary }) {
    const [hire, setHire] = useState(false);

    async function hireCoach(cadre) {
        const data = { id, cadre };
        await axios.post('http://localhost:8080/hireCoach', data);
        window.alert(`${name} ${surname} został zatrudniony!`);
        setHire(true);
    }

    return (
        <tr>
            <td> {name} {surname} </td>
            {!hire && (
                <>
                    <td> {age} </td>
                    <td> + {skill} do atr. </td>
                    <td> {salary} pln </td>
                    <td> <button onClick={() => setHire(true)}> Zatrudnij </button> </td>
                </>
            )}
            {hire && (
                <>
                    <td> <button className="hire-coach-btn" onClick={() => hireCoach('coachB')}> Trener kadry B </button> </td>
                    <td> <button className="hire-coach-btn" onClick={() => hireCoach('assistantB')}> Asystent B </button> </td>
                    <td> <button className="hire-coach-btn" onClick={() => hireCoach('coachC')}> Trener kadry C </button> </td>
                    <td> <button className="hire-coach-btn" onClick={() => hireCoach('assistantC')}> Asystent C </button> </td>
                </>
            )}
        </tr>
    )
}
