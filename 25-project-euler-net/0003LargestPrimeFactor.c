/*
Largest prime factor
Problem 3

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?


#include <stdio.h>


int main (void)
{

  long long current = 600851475143;

  int i; // = 3; // start at 3 for primes... we can do this since subject is ODD

  //int high = 0;

  //while (current != 1)
  for (i = 3; current != 1; i += 2)
  {

    while (!(current % i)) // while no remainder
    {

      current /= i;  // divide and replace

      //high = i;
    }

    //if (current == 1)
    //  break;

    //i += 2 ; // skip all even numbers since not prime
  }

  //printf ("Highest prime factor of 600851475143 is %d %d\n", high, i);
  printf ("Highest prime factor of 600851475143 is %d\n", i - 2);

  return (0);
}
*/


//if you had some trouble getting the number into a variable
//see the note at the end on page 2.

#include <stdio.h>

int main(void)
{
  long long n = 600851475143;
  int factor = 2;
  int lastFactor = 1;
  while (n > 1)
  {
    if (n % factor == 0)
    {
      lastFactor = factor;
      n /= factor;
      while (n % factor == 0)
        n /= factor;
    }
    factor++;
  }
  printf ("%d\n", lastFactor);
  return (0);
}
