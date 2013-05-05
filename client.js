var extraParser = /(\d+)\/(\d+)/;

onChange = function(property, newValue, oldValue, attributes) {
  var escopo, total, qtd, dias, match, maoObra;
  if (property === 'escopo' && newValue) {
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
        maoObra = getLocal('mao_obra', escopo.mao_obra[i].item._key);
        // calcular valor da mao de obra baseado nos dias/qtd
      }
    }
    if (escopo.material) {
      for (var i=0; i < escopo.material.length; i++) {
        qtd = parseInt(escopo.material[i].extraInfo);
        material = getLocal('mao_obra', escopo.mao_obra[i].item._key);
        // calcular valor do material baseado no preço/qtd
      }
    }
  }
};

