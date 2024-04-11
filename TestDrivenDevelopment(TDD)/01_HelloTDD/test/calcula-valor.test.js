const calculaValor = require('../src/calcula-valor.js')
require('./extensoes.js')

describe('calcularMontante', () => {
  test('Com uma prestação o montante é igual ao capital', () => {
    // Operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1)

    // Resultado ou Comportamento esperado
    expect(montante).toBe(100)
  })

  test('Com 4 prestações o montante é acrescido de juros', () => {
    // Operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4)

    // Resultado ou comportamento esperado
    expect(montante).toBe(538.45)
  })
})

describe('arredondar', () => {
  test('Arredondar em duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toBe(538.45)
  })
  test('1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005)
    expect(resultado).toBe(1.01)
  })
})

describe('calcularPrestacoes', () => {
  test('O numero de parcelas é igual ao número de prestações', () => {
    // Premissas
    const numeroPrestacoes = 6

    // Operação
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)

    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
  })

  test('Uma única prestação, valor igual ao montante', () => {
    const numeroPrestacoes = 1

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(50)
  })

  test('Duas prestacoes, valor igual a metade do montante', () => {
    const numeroPrestacoes = 2

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0] + prestacoes[1]).toBe(50)
    expect(prestacoes[0]).toBe(25)
    expect(prestacoes[1]).toBe(25)
  })

  test('Valor da soma das prestacoes deve ser igual ao montante com duas casas decimais', () => {
    // Dado (given)
    const numeroPrestacoes = 3
    const montante = 100

    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes).tenhaSomaDeValoresIgual(montante)// extende de extensoes.js
    expect(prestacoes).sejaDecrescente()
    // for (let i = 0; i < prestacoes.length - 1; i++) {
    //   const j = i + 1
    //   expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    // }
  })
  test('Desafio semi-final', () => {
    // Given
    const numeroPrestacoes = 3
    const montante = 101.994

    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    // const soma = calculaValor.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
    // expect(soma).toBe(calculaValor.arredondar(montante))
    expect(prestacoes).tenhaSomaDeValoresIgual(montante)
    expect(prestacoes).sejaDecrescente()

    // for (let i = 0; i < prestacoes.length - 1; i++) {
    //   const j = i + 1
    //   expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    // }
  })
})
