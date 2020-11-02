//call built-in node module 'event', using EventEmitter standard name
const EventEmitter = require("events");
//for #2 example
const http = require("http");

//for best practise in real life,  we should create new class, that will actually inherit
//from the node EventEmitter
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

//create  emitter
const myEmitter = new Sales();

//crate listeners, it can be several,they are observers, they observe the emitter
//and wait until it emits the newSale event.
myEmitter.on("newSale", () => {
  console.log("There was a new sale!!");
});
myEmitter.on("newSale", () => {
  console.log("Customer name Aram.");
});

//new listener with using 9 argument
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

//object that emits named events
myEmitter.emit("newSale", 9);

//=================== #2 example - create small web server and than listen to the event that it emits ==========

const server = http.createServer();
//listen events, that server will emit
server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received!");
});
server.on("request", (req, res) => {
  console.log("Another request 😀");
});
server.on("close", () => {
  console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("withing for request...");
});
