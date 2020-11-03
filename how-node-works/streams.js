//for example: we need to read large text file from file system , and than to send it to the client
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //solution #1, and not the best, because it take a long time until file totally load into the memory and than it can send the data.
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  //solution #2:using streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  //solution #3:using pipe() operator: And that will  fix the problem of backpressure,
  //because it will automatically handle the speed basically
  //of the data coming in, and the speed of the data going out.
  //The best solution
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening ....");
});
