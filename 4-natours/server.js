/*
it's a good practice to have everything that is related to express in one file,
and then everything that is related to the server in another main file.
So starting now, server.js will actually be our starting file where everything starts,
and it's there when we listen to our server.
 */
const app = require('./app');

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
