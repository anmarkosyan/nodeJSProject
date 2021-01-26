const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

//create a thread pool, with size we can define
process.env.UV_THREADPOOL_SIZE = "1";

setTimeout(() => console.log("Timer 1 finished!"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

//event loop
fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("-------------");

  setTimeout(() => console.log("Timer 2 finished!"), 0);
  setTimeout(() => console.log("Timer 3 finished!"), 2000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));
  //create thread pools count of 4, for this time its work almost the same time, but when we change thread pool size
  //and create 1, it take mach longer time to calculate , because do it one after another
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the top-level-code");
