(function (app) {
  'use strict';

  app.FILTER_ACTIVE = 'active';
  app.FILTER_COMPLETED = 'completed';

  var keyConstants = {
    ENTER: 13,
    ESC: 27
  };

  var cssConstants = {
    ITEM_SELECTED: 'selected',
    ITEM_EDITING: 'editing',
    ITEM_HIDDEN: 'hidden',
    ITEM_COMPLETED: 'completed'
  };

  var util = {
    nodeCss: function (node, css) {
      return {
	on: function () {
	  node.classList.add(css);
	},
	off: function () {
	  node.classList.remove(css);
	},
	set: function (flag) {
	  if (flag) {
	    this.on();
	  } else {
	    this.off();
	  }
	},
	isActive: function () {
	  return node.classList.contains(css);
	}
      };
    }
  };

  // initialize data store
  var todos = new app.TodoList(app.TodoModel, app.Storage);

  // initialize component
  mag.module('todoapp', app.Todo, {
    todos: todos,
    key: keyConstants,
    css: cssConstants,
    txn: new app.Transaction(todos, cssConstants, util),
    util: util
  });

  var handler = function () {
    var filter = mag.route.param('filter') || '#/';

    // update filter
    todos.setFilter(filter);

    mag.redraw();
  };

  mag.route.mode = 'hash';
  mag.route(document.body, '/', {
    '/': handler,
    '/:filter': handler
  });
})(mag.namespace('app'));
