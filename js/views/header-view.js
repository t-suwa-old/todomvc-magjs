(function (Header) {
  'use strict';

  Header.view = function (state, props) {
    var todo = props.todos.create();

    state.input = {
      _config: function(node, isNew) {
	if (isNew) {
	  node.focus();
	}
      },

      _onfocus: function () {
	this.value = '';
      },

      _value: todo.title(),

      _onchange: mag.withProp('value', todo.title),

      _onkeyup: function (e) {
	if (e.which != props.key.ENTER) return;

	if (todo.validate()) {
          props.todos.add(todo);
          this.value = '';
	}
      }
    };
  };
})(mag.namespace('app.Todo.Header'));
