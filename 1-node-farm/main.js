
const fs = require('fs');
const http = require('http');
const url = require('url');


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

//we put outside and put it in Sync method, this outside code called top-level code
//is only ever executed once we start the program,
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

//creating a server
const server = http.createServer((req, res) => {
    const pathName = req.url;

    //overview page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(tempOverview);

     //product page
    }else if(pathName === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(tempProduct);

    //API
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    //not found
    }else {
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

//listen to incoming requests from the client
server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})


