const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

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

app.post('/getSelectedCountryInfo', async (req, res) => {
  const fileName = 'savegame.json';
  const folderPath = path.join('C:', 'Users', 'kacpe', 'OneDrive', 'Dokumenty', 'Ski jumping manager', 'savegame1', fileName);
  
  try {
    const fileContent = fs.readFileSync(folderPath, 'utf-8');
    const fileContentJson = JSON.parse(fileContent);
    res.json(fileContentJson);
  } catch (error) {
    console.error('Błąd podczas odczytu pliku:', error);
    res.status(500).send('Wystąpił błąd podczas przetwarzania żądania');
  }
});

app.post('/loadingSave', async (req, res) => {
  const folderPath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Ski jumping manager\\savegame1';

  if (fs.existsSync(folderPath)) {
    res.status(200).json({ success: true, message: "folder istnieje" });
  } else {
    res.status(200).json({ success: false, message: "folder nie istnieje" });
  }
});

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
        console.error('Błąd zapisu pliku:', err);
        return res.status(500).json({ error: 'Błąd zapisu pliku.' });
      }
      console.log('Plik JSON został pomyślnie zaktualizowany.');
      res.status(200).json({ message: 'Plik JSON został pomyślnie zaktualizowany.' });
    });
  });
});



app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

const filePath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty\\Github\\skijumpmanager\\gameClient\\src\\assets\\data\\worldCupCalendars.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Błąd podczas odczytu pliku:', err);
    return;
  }

  try {
    const worldCupCalendars = JSON.parse(data);
    console.log(worldCupCalendars.two);

  } catch (error) {
    console.error('Błąd podczas parsowania danych JSON:', error);
  }
});
