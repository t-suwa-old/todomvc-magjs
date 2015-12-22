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

    // update the item title in case IME session is active
    this.item.title(this.input.value);

    props.todos.update(this.item);

    this.editing.off();
  };

  app.Transaction.prototype.rollback = function () {
    if (!this.editing.isActive()) return;

    // restore original title
    this.item.title(this.backup);
    this.input.value = this.backup;

    this.editing.off();
  };
})(mag.namespace('app'));
