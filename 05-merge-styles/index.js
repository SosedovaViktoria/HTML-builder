const path = require('path');
const fs = require('fs');

const path_folder = path.join(__dirname, 'styles');
fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css')).write('');
fs.readdir(path_folder, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    const name_file_with_ext = path.basename(file.name);
    const exten = path.extname(name_file_with_ext);
    if(exten === '.css'){
      const stream = fs.createReadStream(path.join(path_folder,file.name));
      stream.on('data', (str) => {
        fs.appendFile(path.join(__dirname, 'project-dist/bundle.css'), `${str}${'\n'}`, () => {});
      });
    }
  });
});