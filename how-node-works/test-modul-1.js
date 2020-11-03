//#1 way
// class Calculator {
//   add(a, b) {
//     return a + b;
//   }
//
//   multiply(a, b) {
//     return a * b;
//   }
//
//   divide(a, b) {
//     return a / b;
//   }
// }
//
// module.exports = Calculator;

//#2 way
module.exports = class  {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
}
