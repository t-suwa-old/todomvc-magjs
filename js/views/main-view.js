(function (Main) {
  'use strict';

  Main.view = function (state, props) {
    var summary = props.todos.summary();
    
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
      return {
        _config: function (node) {
          var hidden = props.app.cssHidden(node);
          var completed = props.app.cssCompleted(node);
          var editing = props.app.cssEditing(node);

          hidden.set(!props.todos.predicate(item));
          completed.set(item.completed());
          editing.set(state.isEditing(item));
        },

        label: {
          _text: item.title(),

          _ondblclick: function (e) {
            state.beginEditing(item);
          }
        },

        'toggle': {
          _config: function (node) {
            node.checked = item.completed();
          },

          _onclick: function () {
            props.todos.toggle(item);
          }
        },

        'edit': {
          _config: function (node) {
            node.value = item.title();

            if (state.isEditing(item)) {
              node.focus();
            }
          },

          _value: item.title(),

          _onchange: mag.withProp('value', item.title),

          _onkeyup: function (e) {
            if (e.which == props.app.ESC_KEY) {
              state.cancelEditing();
            }
          },

          _onkeypress: function (e) {
            if (e.which == props.app.ENTER_KEY) {
              // force update the title in case IME is active
              item.title(this.value);
              state.finishEditing();
            }
          },

          _onblur: function () {
            state.finishEditing();
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
