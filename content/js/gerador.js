documentos = () => { gerarCpf(true); gerarCnpj(true); }

randomiza = (n) => { return Math.round(Math.random() * n); }

mod = (dividendo, divisor) => { return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor)); }

gerarCpf = (comPontos) => {
  var n = 9;
  var n1 = randomiza(n);
  var n2 = randomiza(n);
  var n3 = randomiza(n);
  var n4 = randomiza(n);
  var n5 = randomiza(n);
  var n6 = randomiza(n);
  var n7 = randomiza(n);
  var n8 = randomiza(n);
  var n9 = randomiza(n);
  var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (mod(d1, 11));
  if (d1 >= 10) d1 = 0;
  var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (mod(d2, 11));
  if (d2 >= 10) d2 = 0;
  retorno = '';
  if (comPontos) cpf = '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
  else cpf = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;

  document.getElementById("textoCPF").innerHTML = cpf;
}

gerarCnpj = (comPontos) => {
  var n = 9;
  var n1 = randomiza(n);
  var n2 = randomiza(n);
  var n3 = randomiza(n);
  var n4 = randomiza(n);
  var n5 = randomiza(n);
  var n6 = randomiza(n);
  var n7 = randomiza(n);
  var n8 = randomiza(n);
  var n9 = 0;
  var n10 = 0;
  var n11 = 0;
  var n12 = 1;
  var d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
  d1 = 11 - (mod(d1, 11));
  if (d1 >= 10) d1 = 0;
  var d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
  d2 = 11 - (mod(d2, 11));
  if (d2 >= 10) d2 = 0;
  retorno = '';
  if (comPontos) cnpj = '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2;
  else cnpj = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + n12 + d1 + d2;

  document.getElementById("textoCNPJ").innerHTML = cnpj;
}

