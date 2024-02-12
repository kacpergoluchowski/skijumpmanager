export default function setLocalStorage(data) {
    localStorage.setItem('countryName', data[0]);
    localStorage.setItem('countryFlag', data[1]);
    localStorage.setItem('countryRating', data[2]);
    localStorage.setItem('countryLevelOfPlayers', data[3]);
}