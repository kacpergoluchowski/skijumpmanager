import React from "react";
import '../app.scss';
import ButtonsBox from "../components/ButtonsBox";
import MediaBox from "../components/MediaBox";

export default function StartPage() {
    return (
        <div className="start-page">
            <h1> Trener skoków narciarskich </h1>
            <ButtonsBox />
            <MediaBox />
        </div>
    )
}
