import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
rl.on('line', (line) => {
    const reverseLine = line.split('').reverse().join('')
    console.log(reverseLine);
});