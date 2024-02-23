const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

// ---------------------------------------------- tworzenie nowej gry, folderu z danymi itp ----------------------------------------------
app.post('/createNewGame', (req, res) => {
  const fileComponents = {
    folderName: "Ski jumping manager",
    subFolderName: 'savegame1',
    fileName: 'savegame.json'
  };

  const fileContent = {
    id: req.body.id,
    name: req.body.name,
    day: 10,
    month: 5,
    year: 2024
  };

  const folderPath = path.join('C:', 'Users', 'kacpe', 'OneDrive', 'Dokumenty', fileComponents.folderName);
  const subFolderPath = path.join(folderPath, fileComponents.subFolderName);
  const filePath = path.join(subFolderPath, fileComponents.fileName);

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia folderu.' });
    }

    fs.mkdir(subFolderPath, { recursive: true }, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia drugiego folderu.' });
      }

      fs.writeFile(filePath, JSON.stringify(fileContent), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Wystąpił błąd podczas zapisywania pliku.' });
        }
        res.status(200).json({ message: 'Plik został zapisany pomyślnie.' });
      });
    });
  });
});


// ---------------------------------------------- pobieranie danych na temat wybranej reprezentacji ----------------------------------------------
app.post('/getSelectedCountryInfo', async (req, res) => {
  const fileName = 'savegame.json';
  const folderPath = path.join('C:', 'Users', 'kacpe', 'OneDrive', 'Dokumenty', 'Ski jumping manager', 'savegame1', fileName);

  try {
    const fileContent = fs.readFileSync(folderPath, 'utf-8');
    const fileContentJson = JSON.parse(fileContent);
    res.json(fileContentJson);
  } catch (error) {
    res.status(500).send('Wystąpił błąd podczas przetwarzania żądania');
  }
});


// ---------------------------------------------- wczytywanie save'a, ----------------------------------------------
app.post('/loadingSave', async (req, res) => {
  const folderPath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Ski jumping manager\\savegame1';

  if (fs.existsSync(folderPath)) {
    res.status(200).json({ success: true, message: "folder istnieje" });
  } else {
    res.status(200).json({ success: false, message: "folder nie istnieje" });
  }
});

// ---------------------------------------------- aktualizowanie daty ----------------------------------------------
app.post('/refreshDate', async (req, res) => {
  decreaseTiredness();

  let filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Ski jumping manager\\savegame1\\savegame.json';
  if (req.body[3][1]) {
    skillDecline(req.body[3][0]);
    setTimeout(() => {
      skillIncrease();
    }, 100)
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd odczytu pliku:', err);
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    let jsonObject;
    try {
      jsonObject = JSON.parse(data);
    } catch (error) {
      console.error('Błąd parsowania pliku JSON:', error);
    }

    jsonObject.day = req.body[0];
    jsonObject.month = req.body[1];
    jsonObject.year = req.body[2];

    const jsonString = JSON.stringify(jsonObject, null, 2);

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (!err)
        console.log('Plik JSON został pomyślnie zaktualizowany.');
    });
  });
});

// ---------------------------------------------- pobieranie kalendarza dla aktualnego sezonu ----------------------------------------------
app.post('/getCalendar', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\worldCupCalendars.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
      return;
    }

    try {
      const worldCupCalendars = JSON.parse(data);
      res.json(worldCupCalendars.one)

    } catch (error) {
      console.error('Błąd podczas parsowania danych JSON:', error);
    }
  });

})


// ---------------------------------------------- pobieranie kadry zawodników ----------------------------------------------
app.post('/getCompetitors', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err)
      console.error(err);

    try {
      const competitors = JSON.parse(data);
      res.json(competitors);
    } catch (err) {
      console.error(err);
    }
  })
})

// ---------------------------------------------- pobieranie aktualnej daty ----------------------------------------------
app.post('/getDate', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Ski jumping manager\\savegame1\\savegame.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd odczytu pliku:', err);
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    const saveData = JSON.parse(data);
    res.json(saveData);
  })
})

// ---------------------------------------------- zakończenie aktualnych zawodów ----------------------------------------------

app.post('/endCompetition', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\worldCupCalendars.json';
  refreshCompetitorsRanking(req.body);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    const calendar = JSON.parse(data);

    for (let i = 0; i < calendar.one.length; i++) {
      if (!calendar.one[i].ended) {
        calendar.one[i].ended = true;
        break;
      }
    }

    fs.writeFile(filePath, JSON.stringify(calendar), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Błąd zapisu pliku.' });
      }
      res.status(200).json({ message: 'Plik JSON został pomyślnie zaktualizowany.' });
    });
  });
});

// ---------------------------------------------- przydzielenie punktów za zawody ----------------------------------------------

function refreshCompetitorsRanking(reqBody) {
  const points = [100, 80, 60, 50, 45, 40, 36, 32, 29, 26, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    let competitors = JSON.parse(data);

    for (let i = 0; i < reqBody[1].length; i++) {
      if (reqBody[0].gp) {
        const competitorId = reqBody[1][i].id;
        for (let j = 0; j < competitors.length; j++) {
          if (competitors[j].id == competitorId) {
            competitors[j].gpPoints += points[i];
            break;
          }

        }
      }
      else if (reqBody[0].fht) {
        const competitorId = reqBody[1][i].id;
        for (let j = 0; j < competitors.length; j++) {
          if (competitors[j].id == competitorId) {
            competitors[j].fhtPoints = Number(competitors[j].fhtPoints + Number(reqBody[1][i].finalPoints))
            competitors[j].wcPoints += points[i];
            break;
          }

        }
      }
      else if (reqBody[0].rawair) {
        const competitorId = reqBody[1][i].id;
        for (let j = 0; j < competitors.length; j++) {
          if (competitors[j].id == competitorId) {
            competitors[j].rawair = Number(competitors[j].rawair + Number(reqBody[1][i].finalPoints))
            competitors[j].wcPoints += points[i];
            break;
          }
        }
      }
      else if (reqBody[0].worldChamp) {
        console.log("mś")
      }
      else if (reqBody[0].olimpicGames) {
        console.log('io');
      }
      else {
        const competitorId = reqBody[1][i].id;
        for (let j = 0; j < competitors.length; j++) {
          if (competitors[j].id == competitorId) {
            competitors[j].wcPoints += points[i];
            break;
          }

        }
      }
    }

    fs.writeFile(filePath, JSON.stringify(competitors), 'utf8', (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
      }
    });
  })
}

function skillIncrease() {
  const saveGamePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Ski jumping manager\\savegame1\\savegame.json';
  const savegameData = fs.readFileSync(saveGamePath, 'utf-8');
  const saveGameDataJson = JSON.parse(savegameData);
  const countryId = saveGameDataJson.id;

  const coachsPath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\coachs.json';
  const coachsData = fs.readFileSync(coachsPath, 'utf-8');
  const coachsDataJson = JSON.parse(coachsData);

  let countryCoaches = new Array()
  coachsDataJson.forEach(coach => {
    if (coach.teamA) {
      countryCoaches.push({
        'teamA': coach
      })
    }
    else if (coach.teamB) {
      countryCoaches.push({
        'teamB': coach
      })
    }
    else if (coach.teamC) {
      countryCoaches.push({
        'teamC': coach
      })
    }
  });

  const competitorsPath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';
  const competitorsData = fs.readFileSync(competitorsPath, 'utf-8');
  const competitorDataJson = JSON.parse(competitorsData);


  competitorDataJson.forEach(competitor => {
    if (competitor.countryId == countryId && competitor.teamB) {
      competitor.invasionTechnique += Number(countryCoaches[0].teamB.skill);
      competitor.breakoutTechnique += countryCoaches[0].teamB.skill;
      competitor.flightTechnique += countryCoaches[0].teamB.skill;
    }
    else if (competitor.countryId == countryId && competitor.teamC) {
      competitor.invasionTechnique += countryCoaches[1].teamC.skill;
      competitor.breakoutTechnique += countryCoaches[1].teamC.skill;
      competitor.flightTechnique += countryCoaches[1].teamC.skill;
    }
  });

  fs.writeFile(competitorsPath, JSON.stringify(competitorDataJson), 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log('trening odbyty!');
    }
  });
}

function skillDecline(id) {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';
  console.log(id);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }

    const competitors = JSON.parse(data);

    for (let i = 0; i < competitors.length; i++) {
      if (competitors[i].countryId == id) {
        competitors[i].invasionTechnique -= 5;
        competitors[i].breakoutTechnique -= 5;
        competitors[i].flightTechnique -= 5;
      }
    }

    fs.writeFile(filePath, JSON.stringify(competitors), 'utf8', (err) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log('umiejetnosci odjete');
      }
    });
  });
}

// ---------------------------------------------- trening zawodników ----------------------------------------------

app.post('/training', async (req, res) => {
  console.log('trening!')
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    let competitors = JSON.parse(data);

    competitors.forEach(competitor => {
      if (competitor.id == req.body[0]) {
          competitor.tiredness += 25;
        competitor.invasionXp += req.body[1];
        if (competitor.invasionXp >= 500) {
          competitor.invasionXp -= 500;
          if (competitor.invasionTechnique != 100)
            competitor.invasionTechnique += 1;
        }
        competitor.breakoutXp += req.body[2];
        if (competitor.breakoutXp >= 500) {
          competitor.breakoutXp -= 500;
          if (competitor.breakoutTechnique != 100)
            competitor.breakoutTechnique += 1;
        }
        competitor.flightXp += req.body[3];
        if (competitor.flightXp >= 500) {
          competitor.flightXp -= 500;
          if (competitor.flightTechnique != 100)
            competitor.flightTechnique += 1;
        }
      }
    });

    fs.writeFile(filePath, JSON.stringify(competitors), 'utf8', (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
      }
    });
  })
})

app.post('/switchCompetitors', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    let competitors = JSON.parse(data);

    competitors.forEach(competitor => {
      if (competitor.id == req.body[0]) {
        switch (req.body[1]) {
          case 'teamA':
            competitor.teamA = true;
            competitor.teamB = false;
            competitor.teamC = false;
            competitor.teamD = false;
            break;
          case 'teamB':
            competitor.teamA = false;
            competitor.teamB = true;
            competitor.teamC = false;
            competitor.teamD = false;
            break;
          case 'teamC':
            competitor.teamA = false;
            competitor.teamB = false;
            competitor.teamC = true;
            competitor.teamD = false;
            break;
          case 'teamD':
            competitor.teamA = false;
            competitor.teamB = false;
            competitor.teamC = false;
            competitor.teamD = true;
            break;
          case 'none':
            competitor.teamA = false;
            competitor.teamB = false;
            competitor.teamC = false;
            competitor.teamD = false;
            break;
          default:
            break;
        }
      }
    });

    fs.writeFile(filePath, JSON.stringify(competitors), 'utf8', (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
        return res.status(500).json({ error: 'Błąd zapisu pliku.' });
      }

      console.log('Plik został zapisany pomyślnie.');
      res.status(200).json({ message: 'Pomyślnie zaktualizowano konkurentów.' });
    });
  });
});


app.post('/hireCoach', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\coachs.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    let coachs = JSON.parse(data);

    for (let i = 0; i < coachs.length; i++) {
      console.log(req.body.id);
      if (coachs[i].id == req.body.id) {
        if (req.body.cadre == 'coachB')
          coachs[i].teamB = true;
        else if (req.body.cadre == 'coachC')
          coachs[i].teamC = true;
      }
    }

    fs.writeFile(filePath, JSON.stringify(coachs), 'utf8', (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
        return res.status(500).json({ error: 'Błąd zapisu pliku.' });
      }

      console.log('Plik został zapisany pomyślnie.');
      res.status(200).json({ message: 'Pomyślnie zaktualizowano konkurentów.' });
    });
  });
});

function decreaseTiredness() {
  const competitorsPath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(competitorsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd odczytu pliku:', err);
    }

    let competitors;
    try {
      competitors = JSON.parse(data);
      competitors.forEach(competitor => {
        if (competitor.tiredness > 25)
          competitor.tiredness -= 25;
        else
          competitor.tiredness -= competitor.tiredness;
      });
      
    } catch (error) {
      console.error('Błąd parsowania pliku JSON:', error);
    }

    const jsonString = JSON.stringify(competitors, null, 2);

    fs.writeFile(competitorsPath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error(err);
      }
      else
        console.log('zmeczenie spadlo!');
      console.log('Plik JSON został pomyślnie zaktualizowany.');
    });
  });
}