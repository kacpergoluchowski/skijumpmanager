import React, { useEffect, useState } from "react";
import axios from "axios"; // Dodanie importu biblioteki axios
import '../app.scss';
import CalendarRow from "./CalendarRow";

export default function CalendarContent() {
    const [calendarInfo, setCalendarInfo] = useState(undefined);

    useEffect(() => {
        const fetchCalendarInfo = async () => { 
            try {
                const calendarInfoResponse = await axios.post('http://127.0.0.1:8080/getCalendar');
                setCalendarInfo(calendarInfoResponse.data);
            } catch (error) {
                console.error("Błąd podczas pobierania informacji o kalendarzu:", error);
            }
        };

        fetchCalendarInfo();
    }, []);

    let i = 0;

    return (
        <div className="calendar-content">
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
                                    gp={place.gp}
                                    fht={place.fht}
                                    worldChamp={place.worldChamp}
                                    rawair={place.rawair}
                                />
                    })
                )}
            </table>
        </div>
    );
}
