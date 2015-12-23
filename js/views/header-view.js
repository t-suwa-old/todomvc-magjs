(function (Header) {
  'use strict';

  Header.view = function (state, props) {
    var todo = props.todos.create();

    state.input = {
      _config: function (node, isNew) {
        node.value = '';

        if (isNew) {
          node.focus();
        }
      },

      _value: todo.title(),

      _oninput: mag.withProp('value', todo.title),

      _onkeypress: function (e) {
        if (e.which != props.app.ENTER_KEY) return;

        if (todo.validate()) {
          props.todos.add(todo);
        }
      }
    };
  };
})(mag.namespace('app.Todo.Header'));
