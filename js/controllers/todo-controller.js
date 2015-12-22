(function (Todo) {
  "use strict";

  var counter = 0;

  var lifeCycleEvents = [
    'willload', 'didload',
    'willupdate', 'didupdate', 'isupdate',
    'onunload', 'onreload'
  ];

  Todo.controller = function (props) {
    this.id = counter ++;

    var self = this;

    lifeCycleEvents.forEach(function (e) {
      self[e] = function () {
        console.log(this.id + ': ' + e);
      }.bind(self);
    });
  };
})(mag.namespace('app.Todo'));
