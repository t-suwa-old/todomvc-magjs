(function (Todo) {
  'use strict';

  Todo.view = function (state, props) {
    mag.module('header', Todo.Header, props);
    mag.module('main', Todo.Main, props);
    mag.module('footer', Todo.Footer, props);
  };
})(mag.namespace('app.Todo'));
