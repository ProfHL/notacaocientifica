let input;
let scientificNotation;
let exponent;

function setup() {
  createCanvas(600, 300); // Aumentei o tamanho do canvas para acomodar fontes maiores
  
  // Define o tamanho da fonte para o texto principal
  textSize(32); // Tamanho grande para a base
  
  // Cria um campo de entrada de texto
  input = createInput();
  input.position(20, 50);
  input.size(300);
  input.style('font-size', '20px'); // Aumenta o tamanho da fonte do campo de entrada
  
  // Cria um botão para converter o número
  let button = createButton('Converter');
  button.position(340, 50);
  button.style('font-size', '20px'); // Aumenta o tamanho da fonte do botão
  button.mousePressed(convertToScientificNotation);
}

function draw() {
  background(240);
  
  // Exibe o título
  fill(0);
  textSize(24); // Tamanho menor para o título
  text('Digite um número e clique em "Converter":', 20, 30);
  
  // Exibe a notação científica se disponível
  if (scientificNotation) {
    textSize(32); // Tamanho grande para a base
    text(scientificNotation, 20, 150); // Exibe a base (ex: "2 × 10")
    
    // Exibe o expoente elevado
    if (exponent) {
      let exponentX = textWidth(scientificNotation) + 20; // Posição X do expoente
      textSize(24); // Tamanho menor para o expoente
      text(exponent, exponentX, 140); // Desenha o expoente elevado
    }
  }
}

function convertToScientificNotation() {
  // Obtém o valor do campo de entrada
  let number = parseFloat(input.value());
  
  // Verifica se o valor é um número válido
  if (!isNaN(number)) {
    // Converte o número para notação científica no formato 2 × 10³
    let [base, exp] = formatScientificNotation(number);
    scientificNotation = base;
    exponent = exp;
  } else {
    scientificNotation = 'Entrada inválida';
    exponent = '';
  }
}

function formatScientificNotation(number) {
  // Usa o método toExponential para obter a notação científica padrão
  let expNotation = number.toExponential();
  let [coefficient, exponent] = expNotation.split('e'); // Divide em coeficiente e expoente

  // Formata o expoente como potência de 10
  let power = exponent.startsWith('+') ? exponent.slice(1) : exponent; // Remove o sinal de +
  
  // Retorna a base (ex: "2 × 10") e o expoente (ex: "³")
  return [`${coefficient} × 10`, toSuperscript(power)];
}

function toSuperscript(number) {
  // Converte números para seus equivalentes em sobrescrito
  const superscriptDigits = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '-': '⁻'
  };
  
  return number.toString().split('').map(char => superscriptDigits[char] || char).join('');
}
