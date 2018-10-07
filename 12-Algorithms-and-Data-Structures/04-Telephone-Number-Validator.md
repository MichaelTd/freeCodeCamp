# JavaScript Algorithms and Data Structures Projects: Telephone Number Validator

Return <code>true</code> if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

```
    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555
```

For this challenge you will be presented with a string such as <code>800-692-7753</code> or <code>8oo-six427676;laskdjf</code>. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is <code>1</code>. Return <code>true</code> if the string is a valid US phone number; otherwise return <code>false</code>.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

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
