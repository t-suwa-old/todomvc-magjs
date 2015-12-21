(function (app) {
  'use strict';

  app.TodoModel = function (obj) {
    var props = obj || {};

    this.title = mag.prop(props.title || '');
    this.completed = mag.prop(props.completed || false);
  };

  app.TodoModel.prototype.toggle = function () {
    this.completed(!this.completed());
  };

  app.TodoModel.prototype.active = function () {
    return !this.completed();
  };

  app.TodoModel.prototype.validate = function () {
    return this.title().trim() != '';
  };
})(mag.namespace('app'));
