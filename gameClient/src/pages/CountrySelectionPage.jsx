import React, { useState } from "react";
import '../app.scss';
import CountrySelectHeader from "../components/CountrySelectHeader";
import CountryList from "../components/CountryList";
import CountryInfo from "../components/CountryInfo";

export default function CountrySelectionPage() {
    const [countrySelected, setCountrySelected] = useState(false);

    return (
        <div className="country-selection-page">
            <CountrySelectHeader countrySelected={countrySelected}/>
            <main>
                <CountryList setCountrySelected={() => setCountrySelected(true)}/>
                <CountryInfo countrySelected={countrySelected}/>
            </main>
        </div>
    )
}