var extraParser = /(\d+)\/(\d+)/;

function calcMaoObra(mao_obra) {
  var match, qtd, dias, cargo, rv = 0;
  for (var i=0; i < mao_obra.length; i++) {
    match = extraParser.exec(mao_obra[i].extraInfo);
    if (match) {
      qtd = parseInt(match[1]) || 0;
      dias = parseInt(match[2]) || 0;
    } else {
      // TODO: show error
      throw new Error('dsd');
    }
    cargo = getLocal('cargos', mao_obra[i].item._key).value;
    rv += cargo.custo_diario * dias * qtd;
  }
  return rv;
}

function calcMaterial(material) {
  var mat, qtd, rv = 0;
  for (var i=0; i < material.length; i++) {
    qtd = parseInt(material[i].extraInfo) || 0;
    mat = getLocal('material', material[i].item._key).value;
    rv += material.preco_de_venda * qtd;
  }
  return rv;
}

onChange = function(property, newValue, oldValue, attributes) {
  var escopo, precoFinal, newMaterial, newMaoObra
    , oldMaterial, oldMaoObra;

  if (property === 'escopo') {
    escopo = getLocal('escopo', newValue._key).value;
    return { values: {mao_obra: escopo.mao_obra, material: escopo.material }};
  } else if (property == 'mao_obra') {
    newMaoObra = calcMaoObra(newValue);
    precoFinal = attributes.preco_final;
    if (oldValue) {
      oldMaoObra = calcMaoObra(oldValue);
      precoFinal -= oldMaoObra;
    }
    precoFinal += newMaoObra;
    return { values: {preco_final: precoFinal}};
  } else if (property == 'material') {
    newMaterial = calcMaterial(newValue);
    precoFinal = attributes.preco_final;
    if (oldValue) {
      oldMaterial = calcMaterial(oldValue);
      precoFinal -= oldMaterial;
    }
    precoFinal += newMaterial;
    return { values: {preco_final: precoFinal }};
  }
};





