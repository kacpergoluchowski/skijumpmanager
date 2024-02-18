const competitors = [
    {
        "name": "Stefan",
        "surname": "Kraft",
        "age": 31,
        "countryId": 0,
        "invasionTechnique": 90,
        "breakoutTechnique": 95,
        "flightTechnique": 90,
        "wcPoints": 0,
        "gpPoints": 0,
        "fhtPoints": 0,
        "rawairPoints": 0,
        "teamA": true,
        "teamB": false,
        "teamC": false,
        "teamD": false
    },
]

competitors.reverse();



function jump() {
    let results = new Array();
    let firstJump, secondJump;

    function processCompetitor(i) {
        if (i < competitors.length) {
            const firstSpeed = checkInvasionTechnique(competitors[i].invasionTechnique);
            const secondSpeed = checkInvasionTechnique(competitors[i].invasionTechnique);
            const firstBreakout = checkBreakoutTechnique(competitors[i].breakoutTechnique);
            const secondBreakout = checkBreakoutTechnique(competitors[i].breakoutTechnique);
            firstJump = generateJump(firstSpeed, firstBreakout, competitors[i].flightTechnique);
            secondJump = generateJump(secondSpeed, secondBreakout, competitors[i].flightTechnique);

            let firstPoints = (firstJump[0] - 90) * 1.8 + firstJump[1];
            firstPoints = firstPoints.toFixed(1);
            let secondPoints = (secondJump[0] - 90) * 1.8 + secondJump[1];
            secondPoints = secondPoints.toFixed(1);

            results[i] = {
                name: competitors[i].name,
                surname: competitors[i].surname,
                firstSpeed: firstSpeed,
                firstDistance: firstJump[0],
                firstNot: firstJump[1],
                firstPoints: firstPoints,
                secondSpeed: secondSpeed,
                secondDistance: secondJump[0],
                secondNot: secondJump[1],
                secondPoint: secondPoints,
                finalPoints: (Number(firstPoints) + Number(secondPoints)).toFixed(1)
            }
            results.sort((a, b) => b.firstPoints - a.firstPoints);

            generateCompetition(results, competitors);
            setTimeout(() => {
                processCompetitor(i + 1);
            }, 3500);
        } else {
            handleSecondRound(results, competitors);
        }
    }

    processCompetitor(0);
}


// speed 
function checkInvasionTechnique(invasionTechnique) {
    const createNewSpeed = (speed) => {
        let randomSpeed = Math.random() * 0.4;
        randomSpeed = randomSpeed.toFixed(1);
        randomSpeed = Number(randomSpeed);
        randomSpeed = speed + randomSpeed;
        return randomSpeed;
    }

    if (invasionTechnique >= 90) {
        let speedReturned = createNewSpeed(91);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 80) {
        let speedReturned = createNewSpeed(90.6);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 70) {
        let speedReturned = createNewSpeed(90.2);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 60) {
        let speedReturned = createNewSpeed(89.9);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 50) {
        let speedReturned = createNewSpeed(89.5);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 40) {
        let speedReturned = createNewSpeed(89.2);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 30) {
        let speedReturned = createNewSpeed(88.9);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 20) {
        let speedReturned = createNewSpeed(88.6);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 10) {
        let speedReturned = createNewSpeed(88.2);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else {
        let speedReturned = createNewSpeed(87.9);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    }
}

// breakout
function checkBreakoutTechnique(breakoutAtr) {
    if (breakoutAtr > 90) {
        let randomBreakout = Math.random() * 3 + 139;
        randomBreakout = randomBreakout.toFixed(0);
        randomBreakout = Number(randomBreakout);
        return randomBreakout;
    } else if (breakoutAtr > 75) {
        let x = Math.random() * 1;
        x = x.toFixed(0);
        if (x == 0) {
            let randomBreakout = Math.random() * 5 + 134
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        } else if (x == 1) {
            let randomBreakout = Math.random() * 5 + 141
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        }
    } else if (breakoutAtr > 60) {
        let x = Math.random() * 1;
        x = x.toFixed(0);
        if (x == 0) {
            let randomBreakout = Math.random() * 5 + 129
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        } else if (x == 1) {
            let randomBreakout = Math.random() * 5 + 146
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        }
    } else if (breakoutAtr > 45) {
        let x = Math.random() * 1;
        x = x.toFixed(0);
        if (x == 0) {
            let randomBreakout = Math.random() * 5 + 124
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        } else if (x == 1) {
            let randomBreakout = Math.random() * 5 + 151
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        }
    } else if (breakoutAtr > 30) {
        let x = Math.random() * 1;
        x = x.toFixed(0);
        if (x == 0) {
            let randomBreakout = Math.random() * 5 + 119
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        } else if (x == 1) {
            let randomBreakout = Math.random() * 5 + 156
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        }
    } else {
        let x = Math.random() * 1;
        x = x.toFixed(0);
        if (x == 0) {
            let randomBreakout = Math.random() * 19 + 100
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        } else if (x == 1) {
            let randomBreakout = Math.random() * 19 + 161
            randomBreakout = randomBreakout.toFixed(0);
            randomBreakout = Number(randomBreakout);
            return randomBreakout;
        }
    }
}

// distance 
function generateJump(speed, breakout, flight) {
    let gate = 10;
    let bonusGate = (gate - 10) * 3;
    let not, distance = 0;
    let retunedItems = new Array();

    if (speed > 91.1 && breakout > 138 && breakout < 142 && flight >= 95) {
        distance = Math.random() * 7 + 137;
        not = Math.random() * 2 + 58;
        distance = distance.toFixed(1);
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 90.9 && breakout > 137 && breakout < 143 && flight >= 90) {
        distance = Math.random() * 8 + 132;
        not = Math.random() * 2 + 56;
        distance = distance.toFixed(1);
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 90.6 && breakout > 134 && breakout < 146 && flight >= 85) {
        distance = Math.random() * 8 + 127;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 54;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 90.2 && breakout > 130 && breakout < 150 && flight >= 80) {
        distance = Math.random() * 8 + 122;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 54;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 90.0 && breakout > 127 && breakout < 153 && flight >= 75) {
        distance = Math.random() * 8 + 117;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 52;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 89.5 && breakout > 122 && breakout < 158 && flight >= 70) {
        distance = Math.random() * 8 + 112;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 52;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 89.0 && breakout > 118 && breakout < 158 && flight >= 65) {
        distance = Math.random() * 8 + 107;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 50;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 88.7 && breakout > 115 && breakout < 162 && flight >= 60) {
        distance = Math.random() * 8 + 102;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 50;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 88.4 && breakout > 112 && breakout < 165 && flight >= 55) {
        distance = Math.random() * 8 + 97;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 88.1 && breakout > 108 && breakout < 170 && flight >= 50) {
        distance = Math.random() * 8 + 92;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (speed > 87.8 && breakout > 105 && breakout < 175 && flight >= 45) {
        distance = Math.random() * 20 + 80;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else {
        distance = Math.random() * 20 + 70;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 46;
        distance = Number(distance);
        distance = distance + bonusGate;
    }

    function roundToHalf(number) {
        const rounded = Math.floor(number);
        let decimalPart = number - rounded;
        if (decimalPart >= 0.5)
            return number - decimalPart;
        else
            return rounded + 0.5;
    }

    distance = roundToHalf(distance)
    not = roundToHalf(not);
    retunedItems = [Number(distance), Number(not)];
    return retunedItems;
}

function generateCompetition(results, competitors) {
    const table = document.querySelector('.results');
    table.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
        const row = document.createElement('tr');
        const lp = document.createElement('td');
        const name = document.createElement('td');
        const surname = document.createElement('td');
        const gate = document.createElement('td');
        const speed = document.createElement('td');
        const wind = document.createElement('td');
        const style = document.createElement('td');
        const distance = document.createElement('td');
        const points = document.createElement('td');
        const space = document.createElement('td');
        const space1 = document.createElement('td');
        const space2 = document.createElement('td');
        const space3 = document.createElement('td');
        const space4 = document.createElement('td');
        const space5 = document.createElement('td');


        lp.innerHTML = i + 1 + '. ';
        name.innerHTML = `${results[i].name}`;
        surname.innerHTML = `${results[i].surname}`;
        gate.innerHTML = `10`;
        speed.innerHTML = `${results[i].firstSpeed}`;
        style.innerHTML = `${results[i].firstNot}`;
        distance.innerHTML = `${results[i].firstDistance} m`;
        points.innerHTML = `${results[i].firstPoints}`;
        space.innerHTML = '';
        space1.innerHTML = '';
        space2.innerHTML = '';
        space3.innerHTML = '';
        space4.innerHTML = '';
        space5.innerHTML = '';

        row.append(lp);
        row.append(name);
        row.append(surname);
        row.append(gate);
        row.append(speed);
        row.append(style);
        row.append(distance);
        row.append(points);
        row.append(space);
        row.append(space1);
        row.append(space2);
        row.append(space3);
        row.append(space4);
        row.append(space5);
        table.appendChild(row);

        if (results.length != competitors.length)
            document.getElementById('next-competitor').innerHTML = `${competitors[i + 1].name} ${competitors[i + 1].surname}`
        else {
            document.getElementById('next-competitor').innerHTML = `Pierwsza seria zakończona. Druga rozpocznie się za 5 sekund`
        }
    }
}

function handleSecondRound(results, competitors) {
    let i = 0
    if (i < 1)
        setTimeout(() => secondRound(results, competitors), 5000)
    i++;
}

function secondRound(results, competitors) {
    results.sort((a, b) => a.finalPoints - b.finalPoints); // Sortowanie wyników w rosnącej kolejności
    let secondRoundResults = new Array();
    let competitorIndex = 0;

    function generateResults() {
        if (competitorIndex < results.length) {
            secondRoundResults.push(results[competitorIndex]);
            competitorIndex++;
            secondRoundResults.sort((a, b) => Number(b.finalPoints) - Number(a.finalPoints));

            const table = document.querySelector('.results');
            table.innerHTML = "";

            for (let i = 0; i < secondRoundResults.length; i++) {
                const row = document.createElement('tr');
                const lp = document.createElement('td');
                const name = document.createElement('td');
                const surname = document.createElement('td');
                const gate = document.createElement('td');
                const speed = document.createElement('td');
                const style = document.createElement('td');
                const distance = document.createElement('td');
                const points = document.createElement('td');
                const space = document.createElement('td');
                const secondGate = document.createElement('td');
                const secondSpeed = document.createElement('td');
                const secondStyle = document.createElement('td');
                const secondDistance = document.createElement('td');
                const finalPoints = document.createElement('td');

                lp.innerHTML = i + 1 + '. ';
                name.innerHTML = `${secondRoundResults[i].name}`;
                surname.innerHTML = `${secondRoundResults[i].surname}`;
                gate.innerHTML = `10`;
                speed.innerHTML = `${secondRoundResults[i].firstSpeed}`;
                style.innerHTML = `${secondRoundResults[i].firstNot}`;
                distance.innerHTML = `${secondRoundResults[i].firstDistance} m`;
                points.innerHTML = `${secondRoundResults[i].firstPoints}`;
                space.innerHTML = '';
                secondGate.innerHTML = '10';
                secondSpeed.innerHTML = `${secondRoundResults[i].secondSpeed}`;
                secondStyle.innerHTML = `${secondRoundResults[i].secondNot}`;
                secondDistance.innerHTML = `${secondRoundResults[i].secondDistance} m`;
                finalPoints.innerHTML = `${secondRoundResults[i].finalPoints}`

                row.append(lp);
                row.append(name);
                row.append(surname);
                row.append(gate);
                row.append(speed);
                row.append(style);
                row.append(distance);
                row.append(points);
                row.append(space);
                row.append(secondGate);
                row.append(secondSpeed);
                row.append(secondStyle);
                row.append(secondDistance);
                row.append(finalPoints);
                table.appendChild(row);
            }
        } else {
            console.log("Koniec");
            clearInterval(interval);
            savePoints(secondRoundResults)
        }
    }

    const interval = setInterval(generateResults, 3500);
}


function savePoints(results) {
    const points = [100, 80, 60, 50, 45, 40, 36, 32, 29, 26, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    for (let i = 0; i < results.length; i++) {
        competitors.forEach(competitor => {
            if (results[i].name === competitor.name) {
                if (results[i].surname === competitor.surname) {
                    console.log('znaleziono!')
                    competitor.wcPoints += points[i];
                }
            }
        });
    }

    competitors.sort((a, b) => a.wcPoints - b.wcPoints);
}