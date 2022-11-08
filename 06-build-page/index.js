const path = require('path');
const fs = require('fs');

const path_file_copy = path.join(__dirname, 'project-dist');
const folder_assets = path.join(__dirname, 'project-dist/assets');
const path_files = path.join(__dirname, 'assets');

fs.mkdir(path_file_copy, { recursive: true }, err => {
  if (err) {
    throw err;
  }
  fs.mkdir(folder_assets, { recursive: true }, err => {
    if (err) {
      throw err;
    }
    fs.readdir(path_files, { withFileTypes: true }, (err, files) => {
      files.forEach(file => {
        const name_file = path.basename(file.name);
        if (file.isDirectory()) {
          fs.mkdir(folder_assets + '\\' + name_file, { recursive: true }, () => { });
          fs.readdir(path_files + '\\' + name_file, { withFileTypes: true }, (err, fls) => {
            fls.forEach(fl => {
              fs.copyFile(`${path_files}\\${name_file}\\${fl.name}`, `${folder_assets}\\${name_file}\\${fl.name}`, () => { });
            });
          });
        }
      });
    });
  });
});

const path_folder = path.join(__dirname, 'styles');
fs.createWriteStream(path.join(__dirname, 'project-dist/style.css')).write('');
fs.readdir(path_folder, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    const name_file_with_ext = path.basename(file.name);
    const exten = path.extname(name_file_with_ext);
    if (exten === '.css') {
      const stream = fs.createReadStream(path.join(path_folder, file.name));
      stream.on('data', (str) => {
        fs.appendFile(path.join(__dirname, 'project-dist/style.css'), `${str}${'\n'}`, () => { });
      });
    }
  });
});

const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
let string = '';

const path_comp = path.join(__dirname, 'components');
const stream_art = fs.createReadStream(path.join(path_comp, 'articles.html'));
const stream_foo = fs.createReadStream(path.join(path_comp, 'footer.html'));
fs.createWriteStream(path.join(path_file_copy, 'index.html')).write(string);
const stream_head = fs.createReadStream(path.join(path_comp, 'header.html'));
let str_head = '';
let str_art = '';
let str_foo = '';
stream_head.on('data', (str) => {
  str_head = str.toString();
  stream_art.on('data', (str) => {
    str_art = str.toString();
    stream_foo.on('data', (str) => {
      str_foo = str.toString();
      stream.on('data', (stream_read) => {
        string = stream_read.toString();
        string = string.replace('{{header}}', str_head);
        string = string.replace('{{articles}}', str_art);
        string = string.replace('{{footer}}', str_foo);
        
        fs.appendFile(path.join(path_file_copy, 'index.html'), `${string}${'\n'}`, () => { });
      });
    });
    
  });
});
