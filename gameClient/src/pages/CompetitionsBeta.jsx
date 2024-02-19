import React, { useState, useEffect } from "react";
import "../app.scss";
import GenerateCompetition from "../assets/utilities/generateCompetition";
import axios from "axios";
import { Link } from "react-router-dom";
import ResultsRow from "../components/ResultsRow";

export default function CompetitionsBeta() {
  const [nextCompetitions, setNextCompetitions] = useState(null);
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Indeks aktualnie wyświetlanego wyniku

  useEffect(() => {
    async function getNextCompetitions() {
      try {
        const calendarInfoResponse = await axios.post(
          "http://127.0.0.1:8080/getCalendar"
        );
        const competitions = calendarInfoResponse.data;

        const nextCompetition = competitions.find(
          (competition) => !competition.ended
        );

        if (nextCompetition) {
          setNextCompetitions(nextCompetition);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania kalendarza:", error);
      }
    }

    getNextCompetitions();
  }, []);

  const handleStartCompetitions = async () => {
    try {
      const response = await GenerateCompetition(nextCompetitions.hillSize);
      setResults(response);
    } catch (error) {
      console.error("Błąd podczas generowania zawodów:", error);
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % results.length);
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [results]);

  return (
    <div className="competitions-page">
      <header className="competitions-header">
        {nextCompetitions && (
          <div className="competitions-place">
            <h1>
              {nextCompetitions.place} HS{nextCompetitions.hillSize}
            </h1>
          </div>
        )}
        <button className="continue-button" onClick={handleStartCompetitions}>
          Rozpocznij zawody
        </button>
        <Link to="/home">
          <button className="continue-button"> Zakończ zawody </button>
        </Link>
      </header>
      <table className="results">
        <thead>
          <tr>
            <th className="lp"> Lp. </th>
            <th> Imię </th>
            <th> Nazwisko </th>
            <th> Belka </th>
            <th> Prędkość </th>
            <th> Dystans </th>
            <th> Styl </th>
            <th> Punkty </th>
            <th> </th>
            <th> Belka </th>
            <th> Prędkość </th>
            <th> Dystans </th>
            <th> Styl </th>
            <th> Punkty </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <ResultsRow
              key={index}
              result={result}
              isVisible={index === currentIndex}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
