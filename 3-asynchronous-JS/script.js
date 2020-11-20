const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  //============== doing HTTP get request using callback hell =======
  // superagent
  //   .get(`https://dog.ceo/api/breed/${data}/images/random`)
  //   .end((err, response) => {
  //     if (err) return console.error(err.message);
  //     //console.log(response.body.message);
  //     //create another txt file and put http string within
  //     fs.writeFile('dogImg.txt', response.body.message, (err) => {
  //       if (err) return console.error(err.message);
  //       //console.log('Random dog file');
  //     });
  //   });

  //============= convert callback hell to promises =======
  //1 way
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      //create another txt file and put http string within
      fs.writeFile('dogImg.txt', res.body.message, (err) => {
        if (err) return console.error(err.message);
        console.log('Random dog file');
      });
    }).catch(err => {
        console.log(err.message)
  })

  //2 way
});
