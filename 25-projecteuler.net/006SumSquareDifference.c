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

    /*// Brute force
    int sum = 0;
    int squared = 0;
    int result = 0;
    const int N = 100;

    for (int i = 1; i <= N; i++) {
        sum += i;
        squared += i * i;
    }

    result = sum * sum - squared;
    */

    long sum = 0;
    long squared = 0;
    long result = 0;

    const int N = 100;

    sum = N * (N+1)/ 2;
    squared = (N * (N + 1) * (2 * N + 1)) / 6;

    result = sum * sum - squared;

    printf("%ld\n", result);

    return (0);
}
