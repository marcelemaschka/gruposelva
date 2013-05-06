var extraParser = /(\d+)\/(\d+)/;

onChange = function(property, newValue, oldValue, attributes) {
  var escopo, qtd, dias, match, cargo, material, rv;
  if (property === 'escopo' && newValue) {
    rv = {
      values: {
        preco_final: 0,
      }
    };
    escopo = getLocal('escopo', newValue._key).value;
    if (escopo.mao_obra) {
      for (var i=0; i < escopo.mao_obra.length; i++) {
        match = extraParser.exec(escopo.mao_obra[i].extraInfo);
        if (match) {
          qtd = parseInt(match[1]);
          dias = parseInt(match[2]);
        } else {
          // TODO: show error
          throw new Error('dsd');
        }
        cargo = getLocal('cargos', escopo.mao_obra[i].item._key).value;
        rv.values.preco_final += cargo.custo_diario * dias * qtd;
      }
      rv.values.mao_obra = escopo.mao_obra;
    }
    if (escopo.material) {
      for (var i=0; i < escopo.material.length; i++) {
        qtd = parseInt(escopo.material[i].extraInfo);
        material = getLocal('material', escopo.material[i].item._key).value;
        rv.values.preco_final += material.preco_de_venda * qtd;
      }
      rv.values.material = escopo.material;
    }
    return rv;
  }
};



