/*
  Sum square difference
  Problem 6

  The sum of the squares of the first ten natural numbers is,
  12 + 22 + ... + 102 = 385

  The square of the sum of the first ten natural numbers is,
  (1 + 2 + ... + 10)2 = 552 = 3025

  Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

  Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

*/

#include <stdio.h>

int main(void) {

    int sum = 0, squared = 0, result = 0;
    const int N = 100;

    /* Brute force
    for (int i = 1; i <= N; i++) {
        sum += i;
        squared += i * i;
    }
    */

    // or formula
    sum = N * (N+1)/ 2;
    squared = (N * (N + 1) * (2 * N + 1)) / 6;
    //

    result = sum * sum - squared;

    printf("%d\n", result);
    return (0);
}
