# JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter

Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

```js
function convertToRoman(nm) {
  let rslt = [];
  let numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  numbers.map((currNum, x) => {
     while (nm >= currNum) {
       rslt += roman[x];
       nm -= currNum;
     }
    });
  return rslt;
}

convertToRoman(36);
```