import React from "react";
import '../app.scss';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

export default function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Header />
                <HomeContent />
            </main>
        </div>
    )
}