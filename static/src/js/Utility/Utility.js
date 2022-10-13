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
    let fr = fractionate(val, minVal, maxVal);
    let delta = outMax - outMin;
    return outMin + (fr * delta);
  }

  static avg(arr) {
    let total = arr.reduce(function (sum, b) {
      return sum + b;
    });
    return (total / arr.length);
  }

  static sigmoid(scale, z) {
    return 1 / (1 + Math.exp(-(z - (scale * 2)) / scale))
  }

  static mapRange(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return this.constrain(newval, start2, stop2);
    } else {
      return this.constrain(newval, stop2, start2);
    }
  }
  static delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

}