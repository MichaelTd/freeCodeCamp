## Advanced Algorithm Scripting

### [Validate US Telephone Numbers](https://www.freecodecamp.com/challenges/validate-us-telephone-numbers)

Return true if the passed string is a valid US phone number.

The user may fill out the form field any way they choose as long as it is a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    RegExp


``` js
/**
Other attempts.
/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/
^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$
^[0-9]{3}-[0-9]{3}-[0-9]{4}$
^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$
^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$
/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
*/

function telephoneCheck(str) {
  // Good luck!

  var re = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/im;

  return re.test(str);
}

telephoneCheck("555-555-5555");

```

### [Record Collection](https://www.freecodecamp.com/challenges/record-collection)

You are given a JSON object representing a part of your musical album collection. Each album has several properties and a unique id number as its key. Not all albums have complete information.

Write a function which takes an album's id (like 2548), a property prop (like "artist" or "tracks"), and a value (like "Addicted to Love") to modify the data in this collection.

If prop isn't "tracks" and value isn't empty (""), update or set the value for that record album's property.

Your function must always return the entire collection object.

There are several rules for handling incomplete data:

If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.

If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.

If value is empty (""), delete the given prop property from the album.

Hints
Use bracket notation when accessing object properties with variables.

Push is an array method you can read about on Mozilla Developer Network.

You may refer back to Manipulating Complex Objects Introducing JavaScript Object Notation (JSON) for a refresher.

``` JavaScript

var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [
        "Let It Rock",
        "You Give Love a Bad Name"
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [
        "1999",
        "Little Red Corvette"
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": []
    },
    "5439": {
      "album": "ABBA Gold"
    }
};

var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value) {

  if ((prop === "tracks") && (!(collection[id]).tracks))
    collection[id].tracks = [];

  if ((prop === "tracks") && (value !== ""))
    collection[id].tracks.push(value);
  else if ((prop !== "tracks") && (value !== ""))
    collection[id][prop] = value;
  else if (value === "")
    delete collection[id][prop];

  return collection;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");

```

### [Symmetric Difference](https://www.freecodecamp.com/challenges/symmetric-difference)

Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.prototype.reduce()

    Symmetric Difference

``` js

function findSymDiff(a, b){
  var curDiff = [];

  a.reduce(function(prevVal, curVal){if(b.indexOf(curVal)==-1 && curDiff.indexOf(curVal)==-1)curDiff.push(curVal);}, 0);

  b.reduce(function(prevVal, curVal){if(a.indexOf(curVal)==-1 && curDiff.indexOf(curVal)==-1)curDiff.push(curVal);}, 0);

  return curDiff;

}

function sym(args) {

  var symDiff = arguments[0];

  for(var i=1; i<arguments.length; i++){

    symDiff = findSymDiff(symDiff, arguments[i]);

  }

  return symDiff;

}

sym([1, 2, 3], [5, 2, 1, 4]);

```

### [Exact Change](https://www.freecodecamp.com/challenges/exact-change)

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Global Object

``` js

var denoms = [
  {name: "HUNDRED", value: 100.00},
  {name: "TWENTY", value: 20.00},
  {name: "TEN", value: 10.00},
  {name: "FIVE", value: 5.00},
  {name: "ONE", value: 1.00},
  {name: "QUARTER", value: 0.25},
  {name: "DIME", value: 0.10},
  {name: "NICKEL", value: 0.05},
  {name: "PENNY", value: 0.01}
];

function checkCashRegister(price, cash, cid) {

  var remainder = cash - price;

  var fullCid = cid.reduce(function(acc, next) {
    return acc + next[1];
  }, 0.0);

  if (fullCid < remainder) {
    return "Insufficient Funds";
  } else if (fullCid === remainder) {
    return "Closed";
  }

  cid = cid.reverse();

  var outcome = denoms.reduce(function(acc, next, index) {
    if (remainder >= next.value) {
      var curr  = 0.0;
      while (remainder >= next.value && cid[index][1] >= next.value) {
        curr += next.value;
        remainder -= next.value;
        remainder = Math.round(remainder * 100) / 100;
        cid[index][1] -= next.value;
      }
      acc.push([next.name, curr]);
      return acc;
    } else {
      return acc;
    }
  }, []);

  if ((outcome.length > 0) && (remainder === 0))
    return outcome;
  else
    return "Insufficient Funds";
}



function checkCashRegister(price, cash, cid) {
  price *= 100; cash *= 100;

  var vals = [1,5,10,25,100,500,1000,2000,10000];
  var cidHave = cid.map(x=>Math.round(x[1]*100));

  var cidAmts = cidHave.map((x,i)=>Math.floor(x/vals[i]));

  var best = [[0,0,0,0,0,0,0,0,0]];
  var bestScoreList = [0];
  for (var i = 1; i <= cash-price; i++) {
    best[i] = [...Array(cid.length)].map(x=>0);
    var bestScore = i+1;
    for (var c = 0; c < cid.length; c++) {
      if (vals[c] > i || best[i-vals[c]][c] >= cidAmts[c]) continue;
      var bestIndex = i-vals[c];

      var score = 0;
      if (bestScoreList[bestIndex] != 0 || bestIndex == 0) {
        score = bestScoreList[bestIndex]+1;
      }
      if (score < bestScore) {
        bestScore = score;
        best[i] = best[bestIndex].slice(0);
        best[i][c] += 1;
      }
    }
    bestScoreList[i] = bestScore;
  }

  var finish = best[cash-price].map((x,i)=>{ return [cid[i][0], x*vals[i]/100]; }).filter(x=>x[1]!=0).reverse();
  if (!finish.length) return 'Insufficient Funds';
  else if (finish.reduce((a,b)=>a+b[1],0) == cidHave.reduce((a,b)=>a+b/100, 0)) return 'Closed';
  else return finish;
}

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

```

### [Inventory Update](https://www.freecodecamp.com/challenges/inventory-update)

Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Global Array Object

``` js

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

// New
function updateInventory(curInv, newInv) {

var result =
  curInv.concat(newInv)
    .reduce(function(ob, ar) {
      // For unique name
      if (!(ar[1] in ob.names)) {  
          ob.names[ar[1]] = ar;
          // Add it to array
          ob.result.push(ar);      
      // Not unique so we should add them
      } else
          ob.names[ar[1]][0] += ar[0];
      return ob;
      //thanx to http://jsfiddle.net/aUXLV/
    }, { names:{}, result:[] })  
    .result
    .sort(function(a,b) {
      // Sort array names ASC.
      return a[1] > b[1] ? 1 : -1;    
    });

  return result;
}

// curr
function updateInventory(arr1, arr2) {

    if (!Array.isArray(arr1)) {
        return [];
    }

    var currentInventory = createObject(arr1);

    arr2.forEach(function(current) {
        if (currentInventory.hasOwnProperty(current[1])) {
            currentInventory[current[1]] += current[0];
        } else {
            currentInventory[current[1]] = current[0];
        }
    });

    return createArray(currentInventory).sort(function(a, b) {
        if (a[1] < b[1])
          return -1;
        if (a[1] > b[1])
          return 1;
        return 0;
    });

    function createObject(array) {
        var obj = {};
        array.forEach(function(current) {
            obj[current[1]] = current[0];
        });
        return obj;
    }

    function createArray(object) {
        var array = [];
        for (var key in object) {
            array.push([object[key], key]);
        }
        return array;
    }
}

updateInventory(curInv, newInv);

```

### [No repeats please](https://www.freecodecamp.com/challenges/no-repeats-please)

Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that all characters in the provided string are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Permutations

    RegExp

``` js

// Next 3 This is it
// http://crookedcode.com/2016/12/20/fcc-advanced-algorithm-scripting-challenge-no-repeats-please/
function permAlone(str) {

  //create variable to store number of perms without a repeat
  var noDupes = 0;

  //split string into array
  var strArray = str.split("");

  //Heap's Algorithm
  function findPerm(n, arr) {
    // If only 1 element, just output the array
    if (n == 1) {
      //check for duplicates
      if(!(/([a-zA-Z])\1+/).test(arr.join("")))
        noDupes += 1;

      return;
    }

    for (var i = 0; i < n; i+= 1) {
      findPerm(n - 1, arr);
      // If n is even
      if (n % 2 === 0)
        swap(i, n - 1);
      else
        swap(0, n - 1);
    }

    function swap(idxA, idxB) {
      var tmp = arr[idxA];
      arr[idxA] = arr[idxB];
      arr[idxB] = tmp;
    }
  }

  // Call with an array of the original string
  findPerm(strArray.length, strArray);

  return noDupes;  
}

//call permAlone() with any string
permAlone("aab");

// New 2
function permAlone(str) {
  var permArr = [];
  var usedChars = [];

  if (typeof str == 'string') {
    str = str.split('');
  }

  function checkPermute(str){
    for (var i in str) {

      var ch = str.splice(i, 1)[0];
      //console.log(ch);
      usedChars.push(ch);
      var temp = usedChars.slice().join('');
      // console.log(temp, tmpStr)

      var hasDuplicates = (/([a-z])\1+/).test(temp);

      if (str.length === 0 && !hasDuplicates) {
      	permArr.push(temp);
      }

      checkPermute(str);
      str.splice(i, 0, ch);
      usedChars.pop();
  	}
	}

  checkPermute(str);


  return permArr.length;
  //console.log(permArr, permArr.length);
}

permAlone('aabb');



//https://jsfiddle.net/Skaidrius/7cobg0db/55/
// Next
// YouTube: https://youtu.be/B5lUyJDkWzE

function permAlone(str) {
  var arr = str.split('');
  var result = 0;

  function swap(a, b) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }

  function generate(n) {
    var regex = /([a-z])\1+/;

    if (n === 1 && !regex.test(arr.join(''))) {
      result++;
    } else {
      for (var i = 0; i !== n; i++) {
        generate(n - 1);
        swap(n % 2 ? 0 : i, n - 1);
      }
    }
  }
  generate(arr.length);
  return result;
}

// Curr
function permAlone(str) {

  var regex = /(.)\1+/g;

  var arr = str.split('');
  var permutations = [];
  var tmp;

  if (str.match(regex) !== null && str.match(regex)[0] === str) return 0;

  function swap(index1, index2) {
    tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
  }

  function generate(int) {
    if (int === 1) {
      permutations.push(arr.join(''));
    } else {
      for (var i = 0; i != int; ++i) {
        generate(int - 1);
        swap(int % 2 ? 0 : i, int - 1);
      }
    }
  }

  generate(arr.length);
  var filtered = permutations.filter(function(string) {
    return !string.match(regex);
  });

  return filtered.length;
}

permAlone('aab');

```

### [Friendly Date Ranges](https://www.freecodecamp.com/challenges/friendly-date-ranges)

Convert a date range consisting of two dates formatted as YYYY-MM-DD into a more readable format.

The friendly display should use month names instead of numbers and ordinal dates instead of cardinal (1st instead of 1).

Do not display information that is redundant or that can be inferred by the user: if the date range ends in less than a year from when it begins, do not display the ending year.

Additionally, if the date range begins in the current year (i.e. it is currently the year 2016) and ends within one year, the year should not be displayed at the beginning of the friendly range.

If the range ends in the same month that it begins, do not display the ending year or month.

Examples:

makeFriendlyDates(["2016-07-01", "2016-07-04"]) should return ["July 1st","4th"]

makeFriendlyDates(["2016-07-01", "2018-07-04"]) should return ["July 1st, 2016", "July 4th, 2018"].

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    String.prototype.split()

    String.prototype.substr()

    parseInt()

``` js

function makeFriendlyDates(arr) {
   var dateArr = [];
   var from = arr[0].split('-');
   var until = arr[1].split('-');
   var fromDate = new Date(from);
   var untilDate = new Date(until);
   var fromMonth = fromDate.toLocaleString("latn", { month: "long" });
   var untilMonth = untilDate.toLocaleString("latn", { month: "long" });
   var fromDay = ordinalize(fromDate.getDate());
   var untilDay = ordinalize(untilDate.getDate());
   var fromYear = from[0];
   var untilYear = until[0];
   var diff = (untilDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);

   if(fromDate.getTime() == untilDate.getTime()){
       dateArr.push(fromMonth + " " + fromDay + ", " + fromYear);
   }
   else if(fromMonth == untilMonth && fromYear == untilYear){
       dateArr.push(fromMonth + " " + fromDay);
       dateArr.push(untilDay);
   }else if (diff < 365 && fromMonth !== untilMonth && fromYear !== untilYear){
       dateArr.push(fromMonth + " " + fromDay);
       dateArr.push(untilMonth + " " + untilDay);
   }else if(diff < 365 && fromYear == untilYear){
       dateArr.push(fromMonth + " " + fromDay + ", " + fromYear);
       dateArr.push(untilMonth + " " + untilDay);
   }else if(diff < 365 && fromMonth == untilMonth && fromYear !== untilYear){
       dateArr.push(fromMonth + " " + fromDay + ", " + fromYear);
       dateArr.push(untilMonth + " " + untilDay);
   }else{
       dateArr.push(fromMonth + " " + fromDay + ", " + fromYear);
       dateArr.push(untilMonth + " " + untilDay + ", " + untilYear);
   }

   function ordinalize(num){
       var numStr = num.toString();
       if(numStr.match(/1[0-9]/))
           return numStr + "th";
       else if(numStr.match(/1$/))
           return numStr + "st";
       else if(numStr.match(/2$/))
           return numStr + "nd";
       else if(numStr.match(/3$/))
           return numStr + "rd";
       else
           return numStr + "th";
   }

 return dateArr;
}

makeFriendlyDates(['2016-07-01', '2016-07-04']);

```

### [Make a Person](https://www.freecodecamp.com/challenges/make-a-person)

Fill in the object constructor with the following methods below:

    getFirstName()
    getLastName()
    getFullName()
    setFirstName(first)
    setLastName(last)
    setFullName(firstAndLast)

Run the tests to see the expected output for each method.

The methods that take an argument must accept only one argument and it has to be a string.

These methods must be the only available means of interacting with the object.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Closures

    Details of the Object Model

``` js

var Person = function(firstAndLast) {
  var fullName = firstAndLast;

  this.getFirstName = function() {     // getFirstName() check
    return fullName.split(" ")[0];
  };

  this.getLastName = function() {      // getLastName() check

    return fullName.split(" ")[1];
  };

  this.getFullName = function() {      // getFullName() check
    return fullName;
  };

  this.setFirstName = function(name) { // setFirstName(first) check
    fullName = name + " " + fullName.split(" ")[1];
  };

  this.setLastName = function(name) {  // setLastName(last) check
    fullName = fullName.split(" ")[0] + " " + name;
  };

  this.setFullName = function(name) {  // setFullName(firstAndLast) check
    fullName = name;
  };
};

var bob = new Person('Bob Ross');
bob.getFullName();


```

### [Map the Debris](https://www.freecodecamp.com/challenges/map-the-debris)

Return a new array that transforms the element's average altitude into their orbital periods.

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Math.pow()

``` js

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var nameArr = [];
  var avgAltArr = [];
  var orbPerArr = [];
  for(var i = 0;i < arr.length; i++){
    nameArr.push(arr[i].name);
    avgAltArr.push(arr[i].avgAlt);
  }
  for(var j = 0;j < avgAltArr.length; j++){
    var orbPer = Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + avgAltArr[j], 3) / GM));
    orbPerArr.push(orbPer);
  }
  var objArr = [];
  for(var k = 0;k < nameArr.length; k++) {
    var obj = {
      name: nameArr[k],
      orbitalPeriod: orbPerArr[k]
    };
    objArr.push(obj);
  }
  return objArr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);

```

### [Pairwise](https://www.freecodecamp.com/challenges/pairwise)

Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. Once an element has been used, it cannot be reused to pair with another.

For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.
Index	0	1	2	3	4
Value	7	9	11	13	15

Below we'll take their corresponding indices and add them.

7 + 13 = 20 → Indices 0 + 3 = 3
9 + 11 = 20 → Indices 1 + 2 = 3
3 + 3 = 6 → Return 6

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

    Array.prototype.reduce()

``` js

function pairwise(arr, arg) {
  var sum = 0;
  var pairArr = arr;

  for(i = 0; i < pairArr.length; i++)
    for(j = i + 1; j < pairArr.length; j++)
      if(pairArr[i] + pairArr[j] == arg) {
        sum += i + j;
        pairArr[i] = undefined;
        pairArr[j] = undefined;
      }
  return sum;
}

pairwise([1,4,2,3,0,5], 7);

```
