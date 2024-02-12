import React from "react";
import '../app.scss'
import facebook from '../assets/images/facebookReferencePic.png';
import instagram from '../assets/images/instagramReferencePic.png';
import github from '../assets/images/githubReferencePic.png';

export default function MediaBox() {
    return (
        <div className="media-box">
            <img src = {facebook} />
            <img src = {instagram} />
            <img src = {github} />
        </div>
    )
}