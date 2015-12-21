var mag = mag || {};

(function () {
  'use strict';

  mag.namespace = function (ns, obj) {
    var levels = ns.split('.');
    var first = levels.shift();

    //if no object argument supplied declare a global property
    obj = obj || this;
    
    // initialize the "level"
    obj[first] = obj[first] || {};

    // recursion condition
    if (levels.length) {
      return mag.namespace(levels.join('.'), obj[first]);
    }

    // return a reference to the top level object
    return obj[first];
  };
})();
