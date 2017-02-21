## Basic Algorithm Scripting

### [Reverse a String](https://www.freecodecamp.com/challenges/reverse-a-string)

Reverse the provided string.

You may need to turn the string into an array before you can reverse it.

Your result must be a string.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Global String Object

    String.prototype.split()

    Array.prototype.reverse()

    Array.prototype.join()

```js

function reverseString(strng) {
  strng = strng.split('');
  strng = strng.reverse();
  strng = strng.join('');
  return strng;
}

reverseString("hello");

```

### [Factorialize a Number](https://www.freecodecamp.com/challenges/factorialize-a-number)

Return the factorial of the provided integer.

If the integer is represented with the letter n, a factorial is the product of all positive integers less than or equal to n.

Factorials are often represented with the shorthand notation n!

For example: 5! = 1 * 2 * 3 * 4 * 5 = 120

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Arithmetic Operators

``` js

function factorialize(nmbr) {
  if (nmbr === 0 || nmbr === 1) {
    return 1;
  } else {
    for (let indx = nmbr - 1; indx >= 1; indx--) {
      nmbr *= indx;
    }
    return nmbr;
  }    
}

factorialize(5);

```

### [Check for Palindromes](https://www.freecodecamp.com/challenges/check-for-palindromes)

Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note
You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything lower case in order to check for palindromes.

We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

We'll also pass strings with special symbols, such as "2A3*3a2", "2A3  3a2", and "2_A3*3#A2".

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    String.prototype.replace()

    String.prototype.toLowerCase()

``` js

function palindrome(strng) {
  let anStrng = strng.replace(/[\W_]/g, ''); // Alphanumeric string.
  let lcStrng = anStrng.toLowerCase(); // Lower case string.
  let rvStrng = lcStrng.split('').reverse().join(''); // Reverse string.
  return lcStrng === rvStrng;
}

palindrome("eye");

```

### [Find the Longest Word in a String](https://www.freecodecamp.com/challenges/find-the-longest-word-in-a-string)

Return the length of the longest word in the provided sentence.

Your response should be a number.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    String.prototype.split()

    String.length


``` JavaScript

function findLongestWord(strng) {
  let strngArr = strng.split(" "); //Make a word array
  let lngth = 0; // Init lengths check var
  let wrd = null; // Var to hold longest word

  for (let ndx = 0; ndx < strngArr.length; ndx++) { // Loop through array
    if (lngth < strngArr[ndx].length) { // Check for stuff
      lngth = strngArr[ndx].length; // Assign stuff
      wrd = strngArr[ndx];
    }
  }

  return wrd.length;
}

findLongestWord("The quick brown fox jumped over the lazy dog");

```

### [Title Case a Sentence](https://www.freecodecamp.com/challenges/title-case-a-sentence)

Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    String.prototype.split()

``` js

function titleCase(strng){                  // Simplest possible solution
  strng = strng.toLowerCase();
  let sentArr = strng.split(" ");           // Make a sentance array
  for (let ndx = 0; ndx < sentArr.length; ndx++){
    let wrdArr = sentArr[ndx].split("");    // Make a word array
    let frstLttr = wrdArr.shift();          // Get first letter
    wrdArr.unshift(frstLttr.toUpperCase()); // Shift it in upper case.
    sentArr[ndx] = wrdArr.join("");         // Update word.
  }
  return sentArr.join(" ");
}

titleCase("I'm a little tea pot");

```

### [Return Largest Numbers in Arrays](https://www.freecodecamp.com/challenges/return-largest-numbers-in-arrays)

Return an array consisting of the largest number from each provided sub-array. For simplicity, the provided array will contain exactly 4 sub-arrays.

Remember, you can iterate through an array with a simple for loop, and access each member with array syntax arr[i].

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Comparison Operators

``` js

function largestOfFour(arr) {
  let lof = [0,0,0,0];
  for(let arrIdx = 0; arrIdx < arr.length; arrIdx++) {
    for(let subArrIdx = 0; subArrIdx < arr[arrIdx].length; subArrIdx++) {
      if(arr[arrIdx][subArrIdx] > lof[arrIdx]) {
        lof[arrIdx] = arr[arrIdx][subArrIdx];
      }
    }
  }
  return  lof;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);  

```

### [Confirm the Ending](https://www.freecodecamp.com/challenges/confirm-the-ending)

Check if a string (first argument, str) ends with the given target string (second argument, target).

This challenge can be solved with the .endsWith() method, which was introduced in ES2015. But for the purpose of this challenge, we would like you to use one of the JavaScript substring methods instead.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    String.prototype.substr()

    String.prototype.substring()


``` js

function confirmEnding(strng, trgt) {
  return trgt === strng.substr(strng.length - trgt.length);
}

confirmEnding("Bastian", "n");

```

### [Repeat a string repeat a string](https://www.freecodecamp.com/challenges/repeat-a-string-repeat-a-string)

Repeat a given string (first argument) num times (second argument). Return an empty string if num is not a positive number.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Global String Object

``` js

function repeatStringNumTimes(str, num) {
  // repeat after me
  if (num < 0) {
    return "";
  } else {
    return str.repeat(num);
  }

}

repeatStringNumTimes("abc", 3);

```

### [Truncate a string](https://www.freecodecamp.com/challenges/truncate-a-string)

Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a ... ending.

Note that inserting the three dots to the end will add to the string length.

However, if the given maximum string length num is less than or equal to 3, then the addition of the three dots does not add to the string length in determining the truncated string.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    String.prototype.slice()


``` JavaScript

function truncateString(str, num) {
  // Clear out that junk in your trunk
  if (str.length > num && num > 3) {
    return str.slice(0, (num - 3)) + "...";
  } else if (str.length > num && num <= 3) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);


```

### [Chunky Monkey](https://www.freecodecamp.com/challenges/chunky-monkey)

Write a function that splits an array (first argument) into groups the length of size (second argument) and returns them as a two-dimensional array.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Array.prototype.push()

    Array.prototype.slice()

``` javascript

function chunkArrayInGroups(arr, size) {
  // Break it up.
  arr = arr.slice();
  var rslt = [];
  for(var i = 0, len = arr.length; i < len; i+=size) {
    rslt.push(arr.slice(0, size));
    arr = arr.slice(size);
  }
  return rslt;
}  

chunkArrayInGroups(["a", "b", "c", "d"], 2);

```

### [Slasher Flick](https://www.freecodecamp.com/challenges/slasher-flick)

Return the remaining elements of an array after chopping off n elements from the head.

The head means the beginning of the array, or the zeroth index.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Array.prototype.slice()

    Array.prototype.splice()

``` javascript

function slasher(arr, howMany) {
  // it doesn't always pay to be first

  return arr.slice(howMany);
}

slasher([1, 2, 3], 2);

```

### [Mutations](https://www.freecodecamp.com/challenges/mutations)

Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.

For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.

The arguments ["hello", "hey"] should return false because the string "hello" does not contain a "y".

Lastly, ["Alien", "line"], should return true because all of the letters in "line" are present in "Alien".

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    String.prototype.indexOf()


``` javascript

function mutation(arr) {
  var test = arr[1].toLowerCase();
  var target = arr[0].toLowerCase();
  for (i=0;i<test.length;i++) {
    if (target.indexOf(test[i]) < 0)
      return false;
  }
  return true;
 }

mutation(["hello", "hey"]);

```

### [Falsy Bouncer](https://www.freecodecamp.com/challenges/falsy-bouncer)

Remove all falsy values from an array.

Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Boolean Objects

    Array.prototype.filter()

``` JavaScript

function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  return arr.filter(Boolean);
}

bouncer([7, "ate", "", false, 9]);

```

### [Seek and Destroy](https://www.freecodecamp.com/challenges/seek-and-destroy)

You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Arguments object

    Array.prototype.filter()


``` javascript

function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < args.length; j++) {
      if (arr[i] === args[j]) {
        delete arr[i];
      }
    }
  }
  return arr.filter(Boolean);
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);


```

### [Where do I belong](https://www.freecodecamp.com/challenges/where-do-i-belong)

Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted. The returned value should be a number.

For example, getIndexToIns([1,2,3,4], 1.5) should return 1 because it is greater than 1 (index 0), but less than 2 (index 1).

Likewise, getIndexToIns([20,3,5], 19) should return 2 because once the array has been sorted it will look like [3,5,20] and 19 is less than 20 (index 2) and greater than 5 (index 1).

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

    Array.prototype.sort()


``` javascript

function getIndexToIns(arr, num) {
  // Find my place in this sorted array.
  arr.push(num);
  arr.sort(function(a, b){return a-b;});
  return arr.indexOf(num);
}

getIndexToIns([40, 60], 50);

```

### [Caesars Cipher](https://www.freecodecamp.com/challenges/caesars-cipher)

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔  'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    String.prototype.charCodeAt()

    String.fromCharCode()

``` JavaScript

function rot13(str) { // LBH QVQ VG!
  var rotCharArray = [];
  var regEx = /[A-Z]/ ;
  str = str.split("");
  for (var x in str) {
    if (regEx.test(str[x])) {
      rotCharArray.push((str[x].charCodeAt() - 65 + 13) % 26 + 65);
    } else {
      rotCharArray.push(str[x].charCodeAt());
    }
  }
  str = String.fromCharCode.apply(String, rotCharArray);
  return str;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");

```
