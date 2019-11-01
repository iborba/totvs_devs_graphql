const calc = ((b: number) => {
  const soma = ((a: number) => {
    return a + b;
  });

  return soma;
});

console.log(calc(5)(4))