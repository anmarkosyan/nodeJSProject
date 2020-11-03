// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const Calc = require("./test-modul-1");
const calc1 = new Calc();
console.log(calc1.add(2, 5));