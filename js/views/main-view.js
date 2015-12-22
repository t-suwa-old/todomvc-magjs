(function (Main) {
  'use strict';

  Main.view = function (state, props) {
    var summary = props.todos.summary();

    console.log('main-view');
    
    state._config = function (node) {
      if (summary.filtered === 0) {
        node.style.display = 'none';
      } else {
        node.style.display = 'block';
      }
    };

    state['toggle-all'] = {
      _config: function (node) {
        node.checked = (summary.active === 0);
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
          var hidden = props.app.cssHidden(node);

          li = node;

          hidden.set(!props.todos.predicate(item));
        },

        label: {
          _text: item.title(),

          _ondblclick: function (e) {
            props.transaction.begin(li, input, item);
          }
        },

        'toggle': {
          _config: function (node) {
            var completed = props.app.cssCompleted(li);

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

          _oninput: mag.withProp('value', item.title),

          _onkeyup: function (e) {
            if (e.which == props.app.ESC_KEY) {
              props.transaction.rollback();
            }
          },

          _onkeypress: function (e) {
            if (e.which == props.app.ENTER_KEY) {
              props.transaction.commit();
            }
          },

          _onblur: function () {
            props.transaction.commit();
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
