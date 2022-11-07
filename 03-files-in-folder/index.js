const path = require('path');
const fs = require('fs');
 
const path_folder = path.join(__dirname, 'secret-folder');

fs.readdir(path_folder, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if(!file.isDirectory()){
      const name_file_with_ext = path.basename(file.name);
      const exten = path.extname(name_file_with_ext);
      const exten_ = exten.replace('.', '');
      const name_file = name_file_with_ext.replace(exten_, '');

      fs.stat(`${path_folder}\\${name_file_with_ext}`, function(err, stats) {
        const size_file = Number(stats.size);

        console.log(`${name_file.replace('.','')} - ${exten_} - ${size_file}`);
      });
    }
  });
});
