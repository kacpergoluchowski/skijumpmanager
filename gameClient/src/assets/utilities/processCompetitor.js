function processCompetitor(i) {
    if (i <= teamAcompetitors.length - 1) {
        const firstSpeed = checkInvasionTechnique(teamAcompetitors[i].invasionTechnique);
        const secondSpeed = checkInvasionTechnique(teamAcompetitors[i].invasionTechnique);
        const firstBreakout = checkBreakoutTechnique(teamAcompetitors[i].breakoutTechnique);
        const secondBreakout = checkBreakoutTechnique(teamAcompetitors[i].breakoutTechnique);
        firstJump = generateJump(firstSpeed, firstBreakout, teamAcompetitors[i].flightTechnique);
        secondJump = generateJump(secondSpeed, secondBreakout, teamAcompetitors[i].flightTechnique);
    
        let firstPoints = (firstJump[0] - 90) * 1.8 + firstJump[1];
        firstPoints = firstPoints.toFixed(1);
        let secondPoints = (secondJump[0] - 90) * 1.8 + secondJump[1];
        secondPoints = secondPoints.toFixed(1);
    }
}