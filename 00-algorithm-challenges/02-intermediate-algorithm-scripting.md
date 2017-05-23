## Intermediate Algorithm Scripting
OK
### [Sum All Numbers in a Range](https://www.freecodecamp.com/challenges/sum-all-numbers-in-a-range)

We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them.

The lowest number will not always come first.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Math.max()

    Math.min()

    Array.prototype.reduce()

``` js

function sumAll(arr) {
  let lw = Math.min(arr[0], arr[1]);
  let hg = Math.max(arr[0], arr[1]);
  let x = 0;
  let rslt = 0;

  for (x = lw; x <= hg; x++);{
      rslt += x;
  }
  return rslt;
}

sumAll([1, 4]);

```

### [Diff Two Arrays](https://www.freecodecamp.com/challenges/diff-two-arrays)
OK
Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Comparison Operators

    Array.prototype.slice()

    Array.prototype.filter()

    Array.prototype.indexOf()

    Array.prototype.concat()

``` js

function diffArray(ar1, ar2) {
  let na = ar1.concat(ar2);
  function check(item) {
    if (ar1.indexOf(item) === -1 || ar2.indexOf(item) === -1) {
      return item;
    }
  }
  return na.filter(check);
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

```

### [Roman Numeral Converter](https://www.freecodecamp.com/challenges/roman-numeral-converter)
OK
Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Roman Numerals

    Array.prototype.splice()

    Array.prototype.indexOf()

    Array.prototype.join()

``` js

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

### [Wherefore art thou](https://www.freecodecamp.com/challenges/wherefore-art-thou)
ok
Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching property and value pairs (second argument). Each property and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), because it contains the property and its value, that was passed on as the second argument.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Global Object

    Object.prototype.hasOwnProperty()

    Object.keys()

``` js

function whatIsInAName(coll, src) {
  let srcKeys = Object.keys(src);
  return coll.filter(function (obj) {
    for(var i = 0; i < srcKeys.length; i++) {
      if(!obj.hasOwnProperty(srcKeys[i]) || obj[srcKeys[i]] !== src[srcKeys[i]]) {
        return false;
      }
    }
    return true;
  });
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

```    

### [Search and Replace](https://www.freecodecamp.com/challenges/search-and-replace)
ok
Perform a search and replace on the sentence using the arguments provided and return the new sentence.

First argument is the sentence to perform the search and replace on.

Second argument is the word that you will be replacing (before).

Third argument is what you will be replacing the second argument with (after).

NOTE: Preserve the case of the original word when you are replacing it. For example if you mean to replace the word "Book" with the word "dog", it should be replaced as "Dog"

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.prototype.splice()

    String.prototype.replace()

    Array.prototype.join()

``` js

function myReplace(str, pre, post) {
  let idx = str.indexOf(pre);
  if (str[idx] === str[idx].toUpperCase()) {
    post = post.charAt(0).toUpperCase() + post.slice(1);
  }
  return str.replace(pre, post);
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

```    


### [Pig Latin](https://www.freecodecamp.com/challenges/pig-latin)
ok
Translate the provided string to pig latin.

Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay".

If a word begins with a vowel you just add "way" to the end.

Input strings are guaranteed to be English words in all lowercase.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.prototype.indexOf()

    Array.prototype.push()

    Array.prototype.join()

    String.prototype.substr()

    String.prototype.split()

``` js

function translatePigLatin(str) {
    let cnsnnt = false;
    let arr  = str.split('');
    while (['a','e','i','o','u'].indexOf(arr[0]) == -1){
        cnsnnt = true;
        arr.push(arr.shift());
    }
    str = arr.join('');
    str += cnsnnt ? 'ay':'way';
    return str;
}

translatePigLatin("consonant");


```    

### [DNA Pairing](https://www.freecodecamp.com/challenges/dna-pairing)
ok
The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.

Base pairs are a pair of AT and CG. Match the missing element to the provided character.

Return the provided character as the first element in each array.

For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]

The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.prototype.push()

    String.prototype.split()

``` js

function MatchingPair(prt){
  // why does this switch doesn't need break; statements? ;..;
  switch (prt){
    case "T":
      return "A";
    case "A":
      return "T";
    case "C":
      return "G";
    case "G":
      return "C";
  }
}

function pairElement(str) {
  return str.split('').map(function(prt){
    return [prt,MatchingPair(prt)];
  });
}


pairElement("GCG");


```

### [Missing letters](https://www.freecodecamp.com/challenges/missing-letters)
OK
Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    String.prototype.charCodeAt()

    String.fromCharCode()

``` js

function fearNotLetter(str) {

  for(var x = 0; x < str.length; x++) {
    var code = str.charCodeAt(x);

    if (code !== str.charCodeAt(0) + x) {

      return String.fromCharCode(code - 1);
    }  
  }
  return undefined;
}

fearNotLetter("abce");

```

### [Boo who](https://www.freecodecamp.com/challenges/boo-who)
OK
Check if a value is classified as a boolean primitive. Return true or false.

Boolean primitives are true and false.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Boolean Objects

``` js

function booWho(val) {
  return typeof val === 'boolean';
}

booWho(null);


```    

### [Sorted Union](https://www.freecodecamp.com/challenges/sorted-union)
OK
Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

Check the assertion tests for examples.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Arguments object

    Array.prototype.reduce()

``` js

function uniteUnique(arr) {

  var rsltArr;

  var argv = Array.prototype.slice.call(arguments);

  rsltArr = argv.reduce(function(par1,par2){
    return par1.concat(par2.filter(function(i){
      return par1.indexOf(i) === -1;
    }));

  });

  return rsltArr;

}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

```    

### [Convert HTML Entities](https://www.freecodecamp.com/challenges/convert-html-entities)
OK
Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    RegExp

    HTML Entities

    String.prototype.replace()

``` js

function convertHTML(str) {
  // & = &amp; < = &lt; > = &gt; " = &quot; ' = &apos;
  var spltStr = str.split('');

  for (var i = 0; i < spltStr.length; i++) {
    switch (spltStr[i]) {
      case '&':
        spltStr[i] = '&amp;';
        break;
      case '<':
        spltStr[i] = '&lt;';
        break;
      case '>':
        spltStr[i] = '&gt;';
        break;
      case '"':
        spltStr[i] = '&quot;';
        break;
      case "'":
        spltStr[i] = "&apos;";
        break;
    }
  }
  return spltStr.join('');
}

convertHTML("Dolce & Gabbana");

```    

### [Spinal Tap Case](https://www.freecodecamp.com/challenges/spinal-tap-case)
OK
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    RegExp

    String.prototype.replace()

``` js

function spinalCase(str) {

  var reUpper2Lower =  new RegExp(/([a-z])([A-Z])/, 'g');

  var reSpacesUnderscores =  new RegExp(/\s+|_+/, 'g');

  str = str.replace(reUpper2Lower, '$1 $2');

  return str.replace(reSpacesUnderscores, '-').toLowerCase();
}

spinalCase('This Is Spinal Tap');

```

### [Sum All Odd Fibonacci Numbers](https://www.freecodecamp.com/challenges/sum-all-odd-fibonacci-numbers)

Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than 10 are 1, 1, 3, and 5.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Remainder

``` js

function sumFibs(num) {
    var lastNum = 0;
    var currNum = 1;
    var result = 0;
    while (currNum <= num) {
        if (currNum % 2 !== 0) {
            result += currNum;
        }

        currNum += lastNum;
        lastNum = currNum - lastNum;
    }

    return result;
}

sumFibs(4);

```

### [Sum All Primes](https://www.freecodecamp.com/challenges/sum-all-primes)

Sum all the prime numbers up to and including the provided number.

A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.

The provided number may not be a prime.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    For Loops

    Array.prototype.push()

``` js

function sumPrimes(num) {
  var rslt = 0;

  function getPrimes(max) {
    var comps = [];
    var x;
    var y;
    var primes = [];
    for (x = 2; x <= max; ++x) {
      if (!comps[x]) {
        // x is a prime
        primes.push(x);
        for (y = x << 1; y <= max; y += x) {
          comps[y] = true;
        }
      }
    }
    return primes;
  }

  // Add the primes
  var primes = getPrimes(num);
  for (var p = 0; p < primes.length; p++) {
    rslt += primes[p];
  }

  return rslt;
}

sumPrimes(10);

```    

### [Smallest Common Multiple](https://www.freecodecamp.com/challenges/smallest-common-multiple)

Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Smallest Common Multiple

``` js

function smallestCommons(arr) {
  arr.sort(function(a, b) {return b - a;});

  var newArr = [];
  for (var i = arr[0]; i >= arr[1]; i--) {
    newArr.push(i);
  }

  var q = 0;
  var l = 1;
  var n;

  do {
    q = newArr[0] * l * newArr[1];
    for (n = 2; n < newArr.length; n++) {
      if (q % newArr[n] !== 0) {
        break;
      }
    }
    l++;
  } while (n !== newArr.length);

  return q;
}

smallestCommons([1,5]);


```    

### [Finders Keepers](https://www.freecodecamp.com/challenges/finders-keepers)

Create a function that looks through an array (first argument) and returns the first element in the array that passes a truth test (second argument).

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.prototype.filter()

``` js

function findElement(arr, func) {
  var num;
  for (var x = 0; x < arr.length; x++) {
    if (func(arr[x])) {
      num = arr[x];
      return num;
    }
  }

  return num;
}

findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });

```    

### [Drop it](https://www.freecodecamp.com/challenges/drop-it)

Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true.

The second argument, func, is a function you'll use to test the first elements of the array to decide if you should drop it or not.

Return the rest of the array, otherwise return an empty array.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Arguments object

    Array.prototype.shift()

    Array.prototype.slice()

``` js

function dropElements(arr, func) {

  var x = arr.length;
  for (var y = 0; y < x; y++) {
    if (func(arr[0])) {
      break;
    } else {
      arr.shift();
    }
  }
  return arr;
}

dropElements([1, 2, 3], function(n) {return n < 3; });


```    

### [Steamroller](https://www.freecodecamp.com/challenges/steamroller)

Flatten a nested array. You must account for varying levels of nesting.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.isArray()

``` js

function steamrollArray(arr) {
  // I'm a steamroller, baby
 var flatArray = [];

  // Create function that adds an element if it is not an array.
  // If it is an array, then loops through it and uses recursion on that array.
  function flat(par) {
    if (!Array.isArray(par)) {
      flatArray.push(par);
    } else {
      for (var x in par) {
        flat(par[x]);
      }
    }
  }

  for (var x in arr){
    flat(arr[x]);
  }


  return flatArray;
}

steamrollArray([1, [2], [3, [[4]]]]);


```    

### [Binary Agents](https://www.freecodecamp.com/challenges/binary-agents)

Return an English translated sentence of the passed binary string.

The binary string will be space separated.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    String.prototype.charCodeAt()

    String.fromCharCode()

``` js

function binaryAgent(str) {


  biStrArr = str.split(' ');
  reslt = [];

  for( i = 0; i < biStrArr.length; i++){
    reslt.push(String.fromCharCode(parseInt(biStrArr[i], 2)));
  }

  return reslt.join('');
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");

```

### [Everything Be True](https://www.freecodecamp.com/challenges/everything-be-true)

Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

Remember, you can access object properties through either dot notation or [] notation.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

``` js

function truthCheck(collection, pre) {
  var cnt = 0;
  for (var i in collection) {
    if (collection[i].hasOwnProperty(pre) && Boolean(collection[i][pre])) {
      cnt++;
    }
  }
  return cnt == collection.length;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

```

### [Arguments Optional](https://www.freecodecamp.com/challenges/arguments-optional)

Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = addTogether(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Closures

    Arguments object

``` js

function addTogether(a) {
 if (arguments.length === 1 && typeof arguments[0] === "number") {
   return function (b) {
     if (typeof arguments[0] === "number")  return a + b;
   };
 } else {
    if (typeof arguments[0] !== "number"|| typeof arguments[1] !== "number") {
      return undefined;
    }
    return arguments[0] + arguments[1];
  }
}

addTogether(2,3);


```
