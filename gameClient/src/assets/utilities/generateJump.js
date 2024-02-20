export default function generateJump(speed, breakout, flight, hillSize) {
    let distanceIntervalGenerated;
    let bonus;
    let pointsMultiplier;
    let hillComponents = new Array();

    if (hillSize < 91) {
        speed = 84;
        distanceIntervalGenerated = 2;
        bonus = distanceIntervalGenerated - 3;
        pointsMultiplier = 2;
    }
    else if (hillSize < 111) {
        speed = 86;
        distanceIntervalGenerated = 3;
        bonus = distanceIntervalGenerated - 5;
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
        bonus = distanceIntervalGenerated - 8;
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
        bonus = distanceIntervalGenerated - 23;
        pointsMultiplier = 1.2
    }

    hillComponents.push(speed);
    hillComponents.push(hillSize);
    hillComponents.push(distanceIntervalGenerated);
    hillComponents.push(bonus);
    hillComponents.push(pointsMultiplier);


    let gate = 10;
    let bonusGate = (gate - 10) * 3;
    let not, distance = 0;
    let retunedItems = new Array();

    if (speed > hillComponents[0] + 0.1 && breakout > 138 && breakout < 142 && flight >= 95) {
        distance = Math.random() * hillComponents[2] + hillComponents[1];
        not = Math.random() * 2 + 58;
        distance = distance.toFixed(1);
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 0.1 && breakout > 137 && breakout < 143 && flight >= 90) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 1;
        not = Math.random() * 2 + 56;
        distance = distance.toFixed(1);
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 0.4 && breakout > 134 && breakout < 146 && flight >= 85) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 2;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 54;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 0.8 && breakout > 130 && breakout < 150 && flight >= 80) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 3;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 54;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 1.1 && breakout > 127 && breakout < 153 && flight >= 75) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 4;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 52;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 1.5 && breakout > 122 && breakout < 158 && flight >= 70) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 5;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 52;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 2 && breakout > 118 && breakout < 158 && flight >= 65) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 6;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 50;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 2.3 && breakout > 115 && breakout < 162 && flight >= 60) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 7;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 50;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 2.6 && breakout > 112 && breakout < 165 && flight >= 55) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 8;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 2.9 && breakout > 108 && breakout < 170 && flight >= 50) {
        distance = Math.random() * hillComponents[2] + hillComponents[1] + hillComponents[3] * 9;
        distance = distance.toFixed(1);
        not = Math.random() * 2 + 48;
        distance = Number(distance);
        distance = distance + bonusGate;
    } else if (hillComponents[0] - 3.2 && breakout > 105 && breakout < 175 && flight >= 45) {
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