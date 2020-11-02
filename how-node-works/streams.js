//for example: we need to read large text file from file system , and than to send it to the client
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //solution #1, and not the best, because it take a long time until file totally load into the memory and than it can send the data.
  fs.readFile("test-file.txt", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening ....");
});
