
//Utility class with static functions. 
//----------------------------------------------------//
export class Utility {
  static sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  static max(arr) {
    return arr.reduce(function (a, b) {
      return Math.max(a, b);
    })
  }

  static fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
  }

  static modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
  }

  static avg(arr) {
    var total = arr.reduce(function (sum, b) {
      return sum + b;
    });
    return (total / arr.length);
  }

}