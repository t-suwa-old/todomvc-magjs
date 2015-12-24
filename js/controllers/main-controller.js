(function (Main) {
  'use strict';
  
  Main.controller = function (props) {
    this._item = null;

    this.beginEditing = function (item) {
      this._item = item;
      this._backup = item.title();
    };

    this.isEditing = function (item) {
      return this._item == item;
    };

    this.cancelEditing = function () {
      if (!this._item) return;

      this._item.title(this._backup);

      this._item = null;
    };

    this.finishEditing = function () {
      if (!this._item) return;

      props.todos.update(this._item);

      this._item = null;
    };
  };
})(mag.namespace('app.Todo.Main'));
