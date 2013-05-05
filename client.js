onChange = function(property, newValue, oldValue, attributes) {
  var nome_cliente = '', data = '';

  if (property === 'cliente' || property === 'data_da_visita') {
    if (attributes.cliente)
      nome_cliente = attributes.cliente.nome_fantasia;
    if (attributes.data_da_visita instanceof Date)
      data = _.dateFormat(attributes.data_da_visita, 'dd/MM/yyyy');
    return {values: {nome_cliente_data: nome_cliente + ', ' + data}};
  }
};
