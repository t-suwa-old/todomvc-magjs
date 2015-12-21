(function (Footer) {
  'use strict';

  Footer.view = function (state, props) {
    var summary = props.todos.summary();

    state._config = function (node) {
      if (summary.total == 0) {
	node.style.display = 'none';
      } else {
	node.style.display = 'block';
      }
    };

    state['todo-count'] = {
      _config: function (node) {
	var prural = summary.active == 1 ? '' : 's';
	
	node.innerHTML = '<strong>'
	  + summary.active + '</strong> item'
	  + prural + ' left';
      }
    };

    state.$a = {
      _config: function (node) {
	var filter = props.todos.currentFilter();
	var pos = node.href.lastIndexOf(filter);
	var selected = props.util.nodeCss(node, props.css.ITEM_SELECTED);

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