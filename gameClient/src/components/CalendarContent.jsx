import React, { useEffect, useState } from "react";
import axios from "axios"; // Dodanie importu biblioteki axios
import '../app.scss';
import Menu from "./Menu";
import CalendarRow from "./CalendarRow";

export default function CalendarContent() {
    const [calendarInfo, setCalendarInfo] = useState(undefined);

    useEffect(() => {
        const fetchCalendarInfo = async () => { // Funkcja pomocnicza
            try {
                const calendarInfoResponse = await axios.post('http://127.0.0.1:8080/getCalendar');
                setCalendarInfo(calendarInfoResponse.data);
            } catch (error) {
                console.error("Błąd podczas pobierania informacji o kalendarzu:", error);
            }
        };

        fetchCalendarInfo(); // Wywołanie funkcji pomocniczej
    }, []);

    let i = 0;

    return (
        <div className="calendar-content">
            <Menu />
            <table>
                <tr className="headlines">
                    <td> Lp. </td>
                    <td> Miejsce </td>
                    <td> Rozmiar </td>
                    <td> Data </td>
                    <td> Wyniki </td>
                </tr>
                <br></br>
                {calendarInfo && (
                    calendarInfo.map(place => {
                        i++;
                        return <CalendarRow 
                                    lp = {i} 
                                    place={place.place} 
                                    hillSize={place.hillSize} 
                                    countryIndex={place.countryId} 
                                    day={place.day} 
                                    month={place.month} 
                                    year={place.year}
                                    worldChamp={place.worldChamp}
                                    rawair={place.rawair}
                                />
                    })
                )}
            </table>
        </div>
    );
}
