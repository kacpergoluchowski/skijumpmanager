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
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Ski jumping manager\\savegame1\\savegame.json';

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
      return res.status(500).json({ error: 'Błąd parsowania pliku JSON.' });
    }

    if (!Array.isArray(req.body) || req.body.length !== 3) {
      return res.status(400).json({ error: 'Nieprawidłowe dane w żądaniu.' });
    }

    jsonObject.day = req.body[0];
    jsonObject.month = req.body[1];
    jsonObject.year = req.body[2];

    const jsonString = JSON.stringify(jsonObject, null, 2);

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Błąd zapisu pliku.' });
      }
      console.log('Plik JSON został pomyślnie zaktualizowany.');
      res.status(200).json({ message: 'Plik JSON został pomyślnie zaktualizowany.' });
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

app.post('/endCompetition', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\worldCupCalendars.json';
  refreshCompetitorsRanking(req.body);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
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
        console.error('Błąd podczas zapisu pliku:', err);
        return res.status(500).json({ error: 'Błąd zapisu pliku.' });
      }
      console.log('Zawody zakończone!.');
      res.status(200).json({ message: 'Plik JSON został pomyślnie zaktualizowany.' });
    });
  });
});

function refreshCompetitorsRanking(reqBody) {
  const points = [100, 80, 60, 50, 45, 40, 36, 32, 29, 26, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
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
      console.log('punkty przydzielone!.');
    });
  })
}

app.post('/training', async (req, res) => {
  const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\competitors.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Błąd podczas odczytu pliku:', err);
      return res.status(500).json({ error: 'Błąd odczytu pliku.' });
    }

    let competitors = JSON.parse(data);

    competitors.forEach(competitor => {
      if(competitor.id == req.body[0]) {
        competitor.invasionXp += req.body[1];
        if(competitor.invasionXp >= 500) {
          competitor.invasionXp -= 500;
          if(competitor.invasionTechnique != 100)
            competitor.invasionTechnique += 1;  
        }
        competitor.breakoutXp += req.body[2];
        if(competitor.breakoutXp >= 500) {
          competitor.breakoutXp -= 500;
          if(competitor.breakoutTechnique != 100) 
            competitor.breakoutTechnique += 1;
        }
        competitor.flightXp += req.body[3];
        if(competitor.flightXp >= 500) {
          competitor.flightXp -= 500;
          if(competitor.flightTechnique != 100)
            competitor.flightTechnique += 1;
        }
      }
    });

    fs.writeFile(filePath, JSON.stringify(competitors), 'utf8', (err) => {
      if (err) {
        console.error('Błąd podczas zapisu pliku:', err);
      }
      console.log('trening odbyty!')
    });
  })
})