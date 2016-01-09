(function (Header) {
  'use strict';

  Header.view = function (state, props) {
    state.input = {
      _config: function (node, isNew) {
        if (isNew) {
          node.focus();
        }
      },

      _onkeypress: function (e) {
        if (e.which != props.app.ENTER_KEY) return;

        var todo = props.todos.create({title: this.value});

        if (todo.validate()) {
          props.todos.add(todo);
          this.value = '';
        }
      }
    };
  };
})(mag.namespace('app.Todo.Header'));
