import axios from "axios";

const teamAcompetitors = new Array();
const results = new Array();
const hillComponents = new Array();

export default async function generateCompetition(hillSize) {
    fetchCompetitors();
    setTimeout(() => {
        reserchHill(hillSize);
        processCompetitor();
    }, [1000]);
}

function reserchHill(hillSize) {
    let speed;
    let distanceIntervalGenerated;
    let bonus;
    let pointsMultiplier;


    if (hillSize < 91) {
        speed = 84; 
        distanceIntervalGenerated = 2;
        bonus = distanceIntervalGenerated - 3;
        pointsMultiplier = 2;
    }
    else if (hillSize < 111) {
        speed = 86;
        distanceIntervalGenerated = 3;
        bonus = distanceIntervalGenerated - 6;
        pointsMultiplier = 2.0;
    }
    else if (hillSize < 131) {
        speed = 89;
        distanceIntervalGenerated = 4;
        pointsMultiplier = 1.8
    }
    else if (hillSize < 151) {
        speed = 91;
        distanceIntervalGenerated = 5;
        pointsMultiplier = 1.8
    }
    else if (hillSize < 181) {
        speed = 97;
        distanceIntervalGenerated = 8;
        pointsMultiplier = 1.2
    }
    else if (hillSize < 211) {
        speed = 100;
        distanceIntervalGenerated = 10;
        pointsMultiplier = 1.2
    }
    else if (hillSize < 241) {
        speed = 102;
        distanceIntervalGenerated = 15;
        pointsMultiplier = 1.2
    }
    hillComponents.push(speed);
    hillComponents.push(hillSize);
    hillComponents.push(distanceIntervalGenerated);
    hillComponents.push(bonus);
    hillComponents.push(pointsMultiplier);
}

async function fetchCompetitors() {
    try {
        const competitorsResponse = await axios.post('http://127.0.0.1:8080/getCompetitors');
        const competitors = competitorsResponse.data;

        competitors.forEach(competitor => {
            if (competitor.teamA)
                teamAcompetitors.push(competitor);
        });

    } catch (error) {
        console.error('Błąd podczas pobierania listy zawodników:', error);
    }
}

function processCompetitor() {
    let i = 0;
    teamAcompetitors.forEach(competitor => {
        const firstSpeed = checkInvasionTechnique(competitor.invasionTechnique);
        const secondSpeed = checkInvasionTechnique(competitor.invasionTechnique);
        const firstBreakout = checkBreakoutTechnique(competitor.breakoutTechnique);
        const secondBreakout = checkBreakoutTechnique(competitor.breakoutTechnique);

        const firstJump = generateJump(firstSpeed, firstBreakout, teamAcompetitors[i].flightTechnique); // potencjalny bład
        const secondJump = generateJump(secondSpeed, secondBreakout, teamAcompetitors[i].flightTechnique); // potencjalny bład

        let firstPoints = (firstJump[0] - 90) * 1.8 + firstJump[1];
        firstPoints = firstPoints.toFixed(1);
        let secondPoints = (secondJump[0] - 90) * 1.8 + secondJump[1];
        secondPoints = secondPoints.toFixed(1);

        results[i] = {
            name: teamAcompetitors[i].name,
            surname: teamAcompetitors[i].surname,
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
        i++;
    });
    results.sort((a, b) => b.finalPoints - a.finalPoints)
    console.log(results);
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
        let speedReturned = createNewSpeed(hillComponents[0]);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 80) {
        let speedReturned = createNewSpeed(hillComponents[0]-0.4);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 70) {
        let speedReturned = createNewSpeed(hillComponents[0]-0.8);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 60) {
        let speedReturned = createNewSpeed(hillComponents[0]-1.2);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 50) {
        let speedReturned = createNewSpeed(hillComponents[0]-1.6);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 40) {
        let speedReturned = createNewSpeed(hillComponents[0]-2);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 30) {
        let speedReturned = createNewSpeed(hillComponents[0]-2.4);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 20) {
        let speedReturned = createNewSpeed(hillComponents[0]-2.8);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else if (invasionTechnique >= 10) {
        let speedReturned = createNewSpeed(hillComponents[0]-3.2);
        speedReturned = speedReturned.toFixed(1);
        return speedReturned;
    } else {
        let speedReturned = createNewSpeed(hillComponents[0]-3.6);
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

    if (speed > hillComponents[0]+0.1 && breakout > 138 && breakout < 142 && flight >= 95) {
        distance = Math.random() * hillComponents[2] + hillComponents[1];
        not = Math.random() * 2 + 58;
        distance = distance.toFixed(1);
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-0.1 && breakout > 137 && breakout < 143 && flight >= 90) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 1;
        not = Math.random() * 2 + 56;
        distance = distance.toFixed(1);
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-0.4 && breakout > 134 && breakout < 146 && flight >= 85) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 2;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 54;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-0.8 && breakout > 130 && breakout < 150 && flight >= 80) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 3;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 54;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-1.1 && breakout > 127 && breakout < 153 && flight >= 75) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 4;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 52;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-1.5 && breakout > 122 && breakout < 158 && flight >= 70) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 5;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 52;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-2 && breakout > 118 && breakout < 158 && flight >= 65) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 6;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 50;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-2.3 && breakout > 115 && breakout < 162 && flight >= 60) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 7;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 50;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-2.6 && breakout > 112 && breakout < 165 && flight >= 55) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 8;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-2.9 && breakout > 108 && breakout < 170 && flight >= 50) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 9;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0]-3.2 && breakout > 105 && breakout < 175 && flight >= 45) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 10;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else {
        distance = Math.random() * hillComponents[2] + hillComponents[1] * 11;
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