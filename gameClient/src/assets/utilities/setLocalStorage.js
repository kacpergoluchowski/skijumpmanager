export default function setLocalStorage(data) {
    localStorage.setItem('id', data[0]);
    localStorage.setItem('name', data[1]);
    localStorage.setItem('flag', data[2]);
    localStorage.setItem('rating', data[3]);
    localStorage.setItem('levelOfPlayers', data[4]);
    localStorage.setItem('levelOfJuniors', data[5]);
    localStorage.setItem('levelOfObjects', data[6]);
    localStorage.setItem('finacialCondition', data[7]);
    localStorage.setItem('status', data[8]);
}