const path = require('path');
const fs = require('fs');

const path_file_copy = path.join(__dirname, 'file-copy');
const path_files = path.join(__dirname, 'files');

console.log(path_file_copy);
console.log(path_files);
fs.mkdir(path_file_copy, { recursive: true }, err => {
  if (err) {
    throw err;
  }
  fs.readdir(path_files, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
      const name_file = path.basename(file.name);
      fs.copyFile(`${path_files}\\${name_file}`, `${path_file_copy}\\${name_file}`, (err) => {
        if (err) throw err;
        console.log(file.name);
      });
    });
  });
  
});