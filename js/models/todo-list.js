(function (app) {
  'use strict';

  // private properties
  var props = {};

  app.TodoList = function (model, store, filter) {
    props.model = model;
    props.store = store;
    props.filter = filter;

    props.list = store.load().map(function (item) {
      return new model(item);
    });
  };

  //////////////////////////////////////////////////////////////////////
  // API

  app.TodoList.prototype.sync = function () {
    props.store.save(props.list);

    // for Object.observe, update a property
    this.updated = Date.now();
  };

  //////////////////////////////////////////////////////////////////////
  // List

  app.TodoList.prototype.list = function () {
    return props.list;
  };

  app.TodoList.prototype.summary = function () {
    var length = props.list.length;
    var completed = 0;
    var current = 0;
    var self = this;

    props.list.forEach(function (item) {
      if (item.completed()) {
	completed ++;
      }

      if (self.predicate(item)) {
	current ++;
      }
    });

    return {
      total: length,
      completed: completed,
      active: length - completed,
      current: current
    };
  };

  //////////////////////////////////////////////////////////////////////
  // Item

  app.TodoList.prototype.create = function () {
    return new props.model();
  };

  app.TodoList.prototype.add = function (item) {
    props.list.push(item);
    this.sync();
  };

  app.TodoList.prototype.update = function (item) {
    item.title(item.title().trim());

    if (!item.title()) {
      this.remove(item);
    } else {
      this.sync();
    }
  };

  app.TodoList.prototype.remove = function (item) {
    var index = props.list.indexOf(item);

    props.list.splice(index, 1);
    this.sync();
  };

  app.TodoList.prototype.toggle = function (item) {
    item.toggle();
    this.sync();
  };

  app.TodoList.prototype.predicate = function (item) {
    switch (props.filter) {
    case app.FILTER_ACTIVE:
      return item.active();

    case app.FILTER_COMPLETED:
      return item.completed();

    default:
      return true;
    }
  };

  //////////////////////////////////////////////////////////////////////
  // Batch operation

  app.TodoList.prototype.toggleAll = function (flag) {
    props.list.forEach(function (item) {
      item.completed(flag);
    });

    this.sync();
  };

  app.TodoList.prototype.clearCompleted = function () {
    props.list = props.list.filter(function (item) {
      return item.active();
    });

    this.sync();
  };

  //////////////////////////////////////////////////////////////////////
  // Property

  app.TodoList.prototype.setFilter = function (filter) {
    props.filter = filter;
    this.updated = Date.now();
  };

  app.TodoList.prototype.currentFilter = function () {
    return props.filter;
  };
})(mag.namespace('app'));
