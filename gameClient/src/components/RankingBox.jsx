import React, { useEffect, useState } from "react";
import '../app.scss';
import competitors from '../assets/data/competitors.json'
import austriaFlag from '../assets/images/austriaFlag.png';
import germanyFlag from '../assets/images/germanyFlag.png';
import sloveniaFlag from '../assets/images/sloveniaFlag.png';
import norwayFlag from '../assets/images/norwayFlag.png';
import japanFlag from '../assets/images/japanFlag.png';
import polandFlag from '../assets/images/polandFlag.png';
import swissFlag from '../assets/images/swissFlag.png';
import finlandFlag from '../assets/images/finlandFlag.png';
import italyFlag from '../assets/images/italyFlag.png';
import usaFlag from '../assets/images/usaFlag.png';
import czechiaFlag from '../assets/images/czechiaFlag.png';
import estoniaFlag from '../assets/images/estoniaFlag.png';

export default function RankingBox() {
    const flags = [austriaFlag, germanyFlag, sloveniaFlag, norwayFlag, japanFlag, polandFlag, swissFlag, finlandFlag, italyFlag, usaFlag, estoniaFlag, czechiaFlag]; 
    const [ranking, setRanking] = useState(undefined);

    useEffect(() => {
        const notSortedCompetitors = competitors.sort((a, b) => b.wcPoints - a.wcPoints);
        setRanking(notSortedCompetitors);
    }, [])

    return (
        <div className="home-ranking">
            <h1> Klasyfikacja </h1>
            <table>
            { ranking && ranking.map(competitor => {
                return (
                    <tr> 
                        <td> <img src={flags[competitor.countryId]}/> {competitor.surname} </td>
                        <td> {competitor.wcPoints} </td>
                    </tr>
                )
            })}
            </table>
            
        </div>
    )
}