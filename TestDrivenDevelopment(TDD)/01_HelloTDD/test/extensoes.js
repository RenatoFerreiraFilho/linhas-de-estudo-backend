const calculaValor = require('../src/calcula-valor.js')
expect.extend({
  tenhaSomaDeValoresIgual (items, soma) {
    const somaReal = calculaValor.arredondar(items.reduce((a, t) => a + t))
    const passou = somaReal === calculaValor.arredondar(soma)

    return {
      message: () => `A soma ${somaReal} deve ter a soma ${soma}`,
      pass: passou
    }
  },

  sejaDecrescente (itens) {
    for (let i = 0; i < itens.length - 1; i++) {
      const j = i + 1
      if (itens[i] < itens[j]) {
        return {
          message: () => 'O array deve estar em ordem decrescente',
          pass: false
        }
      }
    }
    return {
      message: () => 'O array deve estar em ordem decrescente',
      pass: true
    }
  }
})
