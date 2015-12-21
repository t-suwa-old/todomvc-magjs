(function (app) {
  'use strict';

  // private properties
  var props = {};

  app.Transaction = function (todos, css, util) {
    props.todos = todos;
    props.css = css;
    props.util = util;

    this.editing = null;
    this.input = null;
    this.item = null;
    this.backup = null;
  };

  app.Transaction.prototype.begin = function (node, input, item) {
    this.editing = props.util.nodeCss(node, props.css.ITEM_EDITING);
    this.input = input;
    this.item = item;
    this.backup = item.title();

    this.editing.on();

    this.input.value = item.title();
    this.input.focus();
  };

  app.Transaction.prototype.commit = function () {
    console.log('commit');

    props.todos.update(this.item);

    this.editing.off();
  };

  app.Transaction.prototype.rollback = function () {
    console.log('rollback');

    this.item.title(this.backup);

    this.editing.off();
  };

  app.Transaction.prototype.isEditing = function (item) {
    if (this.item === item) {
      return this.editing.isActive();
    }

    return false;
  };
})(mag.namespace('app'));
