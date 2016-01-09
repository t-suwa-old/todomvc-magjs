(function (app) {
  'use strict';

  // constants, utils
  var utils = app.Utility;

  // data store
  var todos = new app.TodoList(app.TodoModel, app.Storage);

  // initialize component
  var instance = mag.module('todoapp', app.Todo, {
    app: utils,
    todos: todos
  });

  // routing handler
  var handler = function (filter) {
    todos.setFilter(filter || '#/');

    instance.draw();
  };

  mag.route.addRoute('/', handler);
  mag.route.addRoute('/:filter', handler);
  mag.route.load('/');
  mag.route.start();
})(mag.namespace('app'));
