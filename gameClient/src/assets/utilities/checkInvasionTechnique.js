export default function checkInvasionTechnique(invasionTechnique, hillSize) {
    let speed;
    let hillComponents = new Array();

    if (hillSize < 91) {
        speed = 84; 
    }
    else if (hillSize < 111) {
        speed = 86;
    }
    else if (hillSize < 131) {
        speed = 89;
    }
    else if (hillSize < 151) {
        speed = 91;
    }
    else if (hillSize < 181) {
        speed = 97;
    }
    else if (hillSize < 211) {
        speed = 100;
    }
    else if (hillSize < 241) {
        speed = 102;

    }

    hillComponents.push(speed);

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