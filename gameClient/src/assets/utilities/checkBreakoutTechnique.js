export default function checkBreakoutTechnique(breakoutAtr) {
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