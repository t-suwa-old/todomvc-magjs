(function (app) {
  'use strict';

  // constants, utils
  var utils = app.Utility;

  // data store
  var todos = new app.TodoList(app.TodoModel, app.Storage);

  // initialize component
  mag.module('todoapp', app.Todo, {
    app: utils,
    todos: todos
  });

  // routing handler
  var handler = function () {
    var filter = mag.route.param('filter') || '#/';

    todos.setFilter(filter);

    mag.redraw();
  };

  mag.route.mode = 'hash';
  mag.route(document.body, '/', {
    '/': handler,
    '/:filter': handler
  });
})(mag.namespace('app'));
