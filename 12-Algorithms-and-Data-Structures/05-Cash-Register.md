# JavaScript Algorithms and Data Structures Projects: Cash Register

Design a <code>cash</code> register drawer function <code>checkCashRegister()</code> that accepts purchase <code>price</code> as the first argument (<code>price</code>), payment as the second argument (<code>cash</code>), and cash-in-drawer (<code>cid</code>) as the third argument.

<code>cid</code> is a 2D array listing available currency.

The <code>checkCashRegister()</code> function should always return an object with a <code>status</code> key and a <code>change</code> key.

Return <code>{status: "INSUFFICIENT_FUNDS", change: []}</code> if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return <code>{status: "CLOSED", change: [...]}</code> with cash-in-drawer as the value for the key <code>change</code> if it is equal to the change due.

Otherwise, return <code>{status: "OPEN", change: [...]}</code>, with the change due in coins and bills, sorted in highest to lowest order, as the value of the <code>change</code> key.

Remember to use [Read-Search-Ask](http://forum.freecodecamp.org/t/how-to-get-help-when-you-are-stuck/19514) if you get stuck. Try to pair program. Write your own code.

|Currency| Unit	Amount|
| --- | --- |
|Penny|	$0.01 (PENNY)|
|Nickel|	$0.05 (NICKEL)|
|Dime|	$0.1 (DIME)|
|Quarter|	$0.25 (QUARTER)|
|Dollar|	$1 (DOLLAR)|
|Five Dollars|	$5 (FIVE)|
|Ten Dollars|	$10 (TEN)|
|Twenty Dollars|	$20 (TWENTY)|
|One-hundred Dollars|	$100 (ONE HUNDRED)|

```js
// failing since legacy.
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