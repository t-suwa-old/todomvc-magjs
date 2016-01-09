(function (Footer) {
  'use strict';

  Footer.view = function (state, props) {
    var summary = props.todos.summary();

    state['todo-count'] = {
      _config: function (node) {
        var plural = summary.active == 1 ? '' : 's';
        
        node.innerHTML = '<strong>' +
          summary.active + '</strong> item' + plural + ' left';
      }
    };

    state.$a = {
      _config: function (node) {
        var filter = props.todos.currentFilter();
        var pos = node.href.lastIndexOf(filter);
        var selected = props.app.cssSelected(node);

        if (node.href.length - pos == filter.length) {
          selected.on();
        } else {
          selected.off();
        }
      }
    };
    
    state['clear-completed'] = {
      _config: function (node) {
        if (summary.completed) {
          node.hidden = null;
        } else {
          node.hidden = true;
        }
      },

      _onclick: function () {
        props.todos.clearCompleted();
      }
    };
  };
})(mag.namespace('app.Todo.Footer'));
