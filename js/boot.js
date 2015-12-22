(function (app) {
  'use strict';

  // constans, utils
  var utils = app.Utility;

  // data store
  var todos = new app.TodoList(app.TodoModel, app.Storage);

  // editing helper
  var transaction = new app.Transaction({
    app: utils,
    todos: todos
  });

  // initialize component
  mag.module('todoapp', app.Todo, {
    app: utils,
    todos: todos,
    transaction: transaction
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
