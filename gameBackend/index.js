const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/createNewGame', (req, res) => {
    const folderName = 'Ski jumping manager';
    const subFolderName = 'savegame1';
    const fileName = 'countryInfo.json';
    const fileContent = {name: "Kacper"};
  
    const folderPath = path.join('C:', 'Users', 'kacpe', 'OneDrive', 'Dokumenty', folderName);
    const subFolderPath = path.join(folderPath, subFolderName);
    const filePath = path.join(subFolderPath, fileName);
  
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Błąd podczas tworzenia folderu:', err);
        return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia folderu.' });
      }
  
      fs.mkdir(subFolderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Błąd podczas tworzenia drugiego folderu:', err);
          return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia drugiego folderu.' });
        }
  
        fs.writeFile(filePath, JSON.stringify(fileContent), (err) => {
          if (err) {
            console.error('Błąd podczas zapisywania pliku:', err);
            return res.status(500).json({ error: 'Wystąpił błąd podczas zapisywania pliku.' });
          }
  
          console.log('Plik został zapisany pomyślnie.');
          res.status(200).json({ message: 'Plik został zapisany pomyślnie.' });
        });
      });
    });
  });

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
