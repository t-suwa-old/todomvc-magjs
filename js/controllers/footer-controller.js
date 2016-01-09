(function (Footer) {
  'use strict';
  
  Footer.controller = function (props) {
    this.willupdate = function (event, node, newProps) {
      var summary = newProps.todos.summary();

      if (summary.total === 0) {
        node.style.display = 'none';
      } else {
        node.style.display = 'block';
      }
    };
  };
})(mag.namespace('app.Todo.Footer'));
