// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const Calc = require("./test-modul-1");
const calc1 = new Calc();
console.log(calc1.add(2, 5));

//exports
//#1
// const calc2 = require("./test-module-2");
// console.log(calc2.add(2, 5));
//#2
const {add, multiply, divide} = require('./test-module-2');
console.log(multiply(2, 5));
