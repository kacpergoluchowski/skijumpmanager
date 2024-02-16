let currentDay = new Date(2024, 5, 10);

const goToNextDay = () => {
    const nextDay = new Date(currentDay);
    nextDay.setDate(nextDay.getDate() + 1);
    currentDay = nextDay; 
    formatDate(currentDay);

}

const formatDate = (date) => { 
    //day
    const day = date.getDate();
    
    // month
    const months = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paz', 'lis', 'gru'];
    const month = months[date.getMonth()];

    // year
    const year = date.getYear() + 1900;

    console.log(`${day} ${month} ${year}`)
}