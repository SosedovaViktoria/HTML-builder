const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

output.write('Enter the text you need: ');
console.log();
rl.on('line', (an) => {
  if(exited(an) === false){
    fs.appendFile(path.join(__dirname,'text.txt'), `${an}${'\n'}`, () => {});
  }
});

function exited (answer){
  if(answer.toString().trim() === 'exit'){
    output.write('Thhank you for you text!');
    rl.close();
    return true;
  }
  else{
    return false;
  }
}

rl.on('SIGINT', () => {
  output.write('Thank you for you text!');
  rl.close();
});
