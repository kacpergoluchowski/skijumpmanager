import { join } from 'path-browserify';

export const createNewGame = async (savegameData) => {
    const baseFolderPath = 'C:\\Users\\kacpe\\OneDrive\\Dokumenty';
    const newFolderName = 'NowyFolder';
    const savegameFolderName = 'Savegames';
    const savegameFileName = 'savegame.json';
    const savegameFolderPath = join(baseFolderPath, newFolderName, savegameFolderName);

    try {
        await fetch(join(baseFolderPath, newFolderName));

        await fetch(savegameFolderPath);

        await fetch(join(savegameFolderPath, savegameFileName), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(savegameData)
        });
        
        console.log('Plik JSON został zapisany w folderze Savegames.');
    } catch (error) {
        throw new Error(error.message);
    }
};
