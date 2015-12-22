(function (app) {
  'use strict';

  // private properties
  var props = {};

  app.Transaction = function (args) {
    props = args;

    this.editing = null;
    this.input = null;
    this.item = null;
    this.backup = null;
  };

  app.Transaction.prototype.begin = function (node, input, item) {
    console.log('begin');

    this.editing = props.app.cssEditing(node);
    this.input = input;
    this.item = item;
    this.backup = item.title();

    this.input.value = item.title();

    this.editing.on();

    this.input.focus();
  };

  app.Transaction.prototype.commit = function () {
    if (!this.editing.isActive()) return;

    console.log('commit');

    this.editing.off();

    props.todos.update(this.item);
  };

  app.Transaction.prototype.rollback = function () {
    if (!this.editing.isActive()) return;

    console.log('rollback');

    this.editing.off();

    // restore original title
    this.item.title(this.backup);
    this.input.value = this.backup;
  };
})(mag.namespace('app'));
