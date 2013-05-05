onChange = function(property, newValue, oldValue, attributes) {
  var escopo;
  if (property === 'escopo') {
    escopo = getLocal('escopo', newValue._key);
  }
};

