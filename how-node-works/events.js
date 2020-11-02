//call built-in node module 'event', using EventEmitter standard name
const EventEmitter = require("events");

//create new emitter
const myEmitter = new EventEmitter();

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
