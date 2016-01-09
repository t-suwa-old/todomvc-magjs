(function (Main) {
  'use strict';

  Main.view = function (state, props) {
    var summary = props.todos.summary();
    
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
            if (state.isEditing(item)) {
              node.focus();
            } else {
              // refresh value in case item was removed 
              node.value = item.title();

              // a necessary workaround for phantom cursor(IE)
              node.blur();
            }
          },

          _oninput: function () {
            state.updateItem(this.value);
          },

          _onkeyup: function (e) {
            if (e.which == props.app.ESC_KEY) {
              state.cancelEditing();
            }
          },

          _onkeypress: function (e) {
            if (e.which == props.app.ENTER_KEY) {
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
