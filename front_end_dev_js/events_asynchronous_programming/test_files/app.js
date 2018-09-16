var tracker = {
  elems: [],
  list: function() {
    return this.elems.filter(elem => elem instanceof Event);
  },
  elements: function() {
    return this.elems.map(elem => elem.target);
  },
  clear: function() {
    this.elems.length = 0;
    return this.elems.length;
  },
};

function track(callback) {
  return function(event) {
    event.stopPropagation();
    tracker.elems.push(event);
  };
};
