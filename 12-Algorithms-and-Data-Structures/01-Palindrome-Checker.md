# JavaScript Algorithms and Data Structures Projects: Palindrome Checker

Return <code>true</code> if the given string is a palindrome. Otherwise, return <code>false</code>.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note
You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as <code>"racecar"</code>, <code>"RaceCar"</code>, and <code>"race CAR"</code> among others.

We'll also pass strings with special symbols, such as <code>"2A3*3a2"</code>, <code>"2A3 3a2", and </code>"2_A3*3#A2"</code>.

Remember to use [Read-Search-Ask](http://forum.freecodecamp.org/t/how-to-get-help-when-you-are-stuck/19514) if you get stuck. Write your own code.

```js
function palindrome(strng) {
  let anStrng = strng.replace(/[\W_]/g, ''); // Alphanumeric string.
  let lcStrng = anStrng.toLowerCase(); // Lower case string.
  let rvStrng = lcStrng.split('').reverse().join(''); // Reverse string.
  return lcStrng === rvStrng;
}

palindrome("eye");
```