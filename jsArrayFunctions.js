// JS Nuggets: 10 Common Array Methods

var ar1 = ["a", "b", "c"];

ar1.push("b");
console.table(ar1);

console.table(ar1.pop());
console.table(ar1);

var ar2 = ["g", "q"];

console.log(ar1.concat(ar2));
console.log(ar2);

console.log(ar1.join("!"));

console.log(ar1.reverse());
console.log(ar1);

console.log(ar1.shift());
console.log(ar1);

console.log(ar1.unshift("p"));
console.log(ar1);

console.log(ar1.slice(1,2));

ar1.push("i");
ar1.push("f");
ar1.sort(ar1);
console.log(ar1);

console.log(ar1.splice(2,2,"JS Nuggets"));
console.log(ar1);


// CONST

const PI = 3.14;

// PI = 3.14; ERROR

console.log(PI);

// LET

for (let i = 0;1 < 3; i++) {
  console.log(i);
}

//console.log(i); ERROR

// VAR

for (var j = 0;1 < 3; j++) {
  console.log(j);
}

console.log(j);


