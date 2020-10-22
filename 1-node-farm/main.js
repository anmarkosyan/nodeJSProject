
const fs = require('fs');
const http = require('http');


//============= FILE SYSTEM =============================
// blocking, Synchronous way
// const txtIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(txtIn);
// const txtOut = `This is what we know about avocado: ${txtIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', txtOut);
//
// console.log('file written');

//non-blocking, Asynchronous way
//  fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//      if(err) return console.log('ERROR ❗️');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3)
//
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file is written 😀')
//             });
//         })
//     });
//  });
// console.log('Will read file!');


//============== SERVER ==================
//creating a server
const server = http.createServer((req, res) => {
    res.end('hello from the server!');
});

//listen to incoming requests from the client
server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})


