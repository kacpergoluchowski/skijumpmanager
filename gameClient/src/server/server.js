const fs = require('fs');

exports.readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};
