
const fs = require('fs');

// how to read file from path input.txt with Synchronous method
const txtIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(txtIn);

//how to create a new file with Synchronous method
const txtOut = `This is what we know about avocado: ${txtIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', txtOut);

console.log('file written');
