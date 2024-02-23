import React from "react";
import '../app.scss';

export default function TorunamentCard(props) {
    return (
        <div className="torunament-card">
            <img src = {props.image} />
            <h1> {props.tournamentName} </h1>
        </div>
    )
}