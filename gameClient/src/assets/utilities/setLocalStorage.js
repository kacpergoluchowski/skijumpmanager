export default function setLocalStorage(data) {
    localStorage.setItem('name', data[0]);
    localStorage.setItem('flag', data[1]);
    localStorage.setItem('rating', data[2]);
    localStorage.setItem('levelOfPlayers', data[3]);
    localStorage.setItem('levelOfJuniors', data[4]);
    localStorage.setItem('levelOfObjects', data[5]);
    localStorage.setItem('finacialCondition', data[6]);
    localStorage.setItem('status', data[7]);
}