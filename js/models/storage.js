(function (app) {
  'use strict';

  var STORAGE_ID = 'todos-magjs';

  app.Storage = {
    load: function () {
      var str = localStorage.getItem(STORAGE_ID) || '[]';
      return JSON.parse(str);
    },

    save: function (obj) {
      var str = JSON.stringify(obj);
      localStorage.setItem(STORAGE_ID, str);
    }
  };
})(mag.namespace('app'));
