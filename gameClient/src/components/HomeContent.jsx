import React from "react";
import '../app.scss';
import CadreBox from "./CadreBox";
import CalendarBox from "./CalendarBox";
import FinacialBox from "./FinacialBox";
import RankingBox from "./RankingBox";
import SecondCadreBox from "./SecondCadreBox";

export default function HomeContent() {
    return (
        <div className="home-content">
            <div className="home-content-wrapper">
                <CadreBox />
                <SecondCadreBox />
                <CalendarBox />
                <FinacialBox />
            </div>
            <RankingBox />
        </div>
    )
}