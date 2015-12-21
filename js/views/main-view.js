(function (Main) {
  'use strict';

  Main.view = function (state, props) {
    var summary = props.todos.summary();

    state._config = function (node) {
      if (summary.current == 0) {
        node.style.display = 'none';
      } else {
        node.style.display = 'block';
      }
    };

    state['toggle-all'] = {
      _config: function (node) {
        node.checked = (summary.active == 0);
      },

      _onclick: function () {
        props.todos.toggleAll(this.checked);
      }
    };

    state.li = props.todos.list().map(function (item) {
      var li = null;
      var input = null;

      return {
        _config: function (node) {
	  var hidden = props.util.nodeCss(node, props.css.ITEM_HIDDEN);

	  li = node;

	  hidden.set(!props.todos.predicate(item));
        },

        label: {
          _text: item.title(),

          _ondblclick: function (e) {
            props.txn.begin(li, input, item);
          }
        },

        'toggle': {
          _config: function (node) {
	    var completed = props.util.nodeCss(li, props.css.ITEM_COMPLETED);

            node.checked = item.completed();

	    completed.set(node.checked);
          },

          _onclick: function () {
            props.todos.toggle(item);
          }
        },

        'edit': {
	  _config: function (node) {
	    input = node;
	  },

	  _value: item.title(),

	  _onchange: mag.withProp('value', item.title),

	  _onkeyup: function (e) {
	    switch (e.which) {
	    case props.key.ESC:
	      props.txn.rollback();
	      break;

	    case props.key.ENTER:
	      props.txn.commit();
	      break;
	    }
	  },

	  _onblur: function () {
	    props.txn.rollback();
	  }
	},

        'destroy': {
          _onclick: function () {
            props.todos.remove(item);
          }
        }
      };
    });
  };
})(mag.namespace('app.Todo.Main'));
