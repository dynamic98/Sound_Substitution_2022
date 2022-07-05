export class Utility{
    static sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
      }

      static max (arr){
        return arr.reduce(function(a, b){ return Math.max(a, b); })
      }
    
}