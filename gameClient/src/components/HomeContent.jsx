import React from "react";
import '../app.scss';
import CadreBox from "./CadreBox";
import CalendarBox from "./CalendarBox";
import FinacialBox from "./FinacialBox";
import RankingBox from "./RankingBox";

export default function HomeContent() {
    return (
        <div className="home-content">
            <div className="home-content-wrapper">
                <CadreBox />
                <CadreBox />
                <CalendarBox />
                <FinacialBox />
            </div>
            <RankingBox />
        </div>
    )
}