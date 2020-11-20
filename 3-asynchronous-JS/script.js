const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

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
// superagent
//   .get(`https://dog.ceo/api/breed/${data}/images/random`)
//   .then((res) => {
//     console.log(res.body.message);
//
//     fs.writeFile('dogImg.txt', res.body.message, (err) => {
//       if (err) return console.error(err.message);
//       console.log('Random dog file');
//     });
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });
//});

//2 way without callbacks within promises
//build promise function

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 🧐');
      resolve(data);
    });
  });
};

//build promise function
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write a file 😡');
      resolve('Random dog file');
    });
  });
};
/*

//consume with then... catch
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    return writeFilePro('dogImg.txt', res.body.message);
  })
  .then(() => console.log('Random dog file'))
  .catch(err => {
    console.error(err.message);
  });

 */

//consume with Async/Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro('dogImg.txt', res.body.message);
    console.log('Random dog file');
  } catch (err) {
    console.error(err);

    throw err;
  }

  return '2: Ready 🐶';
};

//1 way with then... catch
/*
console.log('1: execution');
getDogPic()
  .then(x => {
    console.log(x);
    console.log('3: execution');
  })
  .catch(err => {
    console.error('ERROR 💥');
  });

 */

//2 way of using Async/Await with IIFE:immediately invoked function expression.
(async () => {
  try {
    console.log('1: execution');
    const x = await getDogPic();
    console.log(x)
    console.log('3: execution');
  } catch (err) {
    console.error('ERROR 💥');
  }
})();
