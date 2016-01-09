var app = mag.namespace('app');

describe('main-controller', function () {
  it('should have a constructor', function () {
    app.Todo.Main.controller.should.have.constructor();
  });

  it('should provide methods', function () {
    var controller = new app.Todo.Main.controller();
    
    controller.should.respondTo('willupdate');
    controller.should.respondTo('beginEditing');
    controller.should.respondTo('isEditing');
    controller.should.respondTo('updateItem');
    controller.should.respondTo('cancelEditing');
    controller.should.respondTo('finishEditing');
  });

  describe('visibility', function () {
    it('should hidden when filtered item == 0', function () {
      var node = {
        style: {
          display: 'abc'
        }
      };
      var props = {
        todos: {
          summary: function () {
            return {
              filtered: 0
            };
          }
        }
      };
      var controller = new app.Todo.Main.controller(props);

      controller.willupdate({}, node, props);

      node.style.display.should.equal('none');
    });

    it('should show when filtered item != 0', function () {
      var node = {
        style: {
          display: 'abc'
        }
      };
      var props = {
        todos: {
          summary: function () {
            return {
              filtered: 1
            };
          }
        }
      };
      var controller = new app.Todo.Main.controller(props);

      controller.willupdate({}, node, props);

      node.style.display.should.equal('block');
    });
  });

  describe('view state management', function () {
    var controller;
    var props;
    
    beforeEach(function () {
      props = {
        todos: {
          update: sinon.spy()
        }
      };
      controller = new app.Todo.Main.controller(props);
    });

    it('should begin editing', function () {
      var item = {
        title: sinon.spy()
      };

      controller.beginEditing(item);

      item.title.should.be.called;
    });

    it('should return editing status', function () {
      var item = {
        title: sinon.spy()
      };

      // editing is not active at first
      controller.isEditing(item).should.be.false;

      // let's begin editing!
      controller.beginEditing(item);

      // here we expect that editing is active
      controller.isEditing(item).should.be.true;
    });

    it('should update item', function () {
      var item = {
        title: mag.prop('123')
      };

      controller.beginEditing(item);

      controller.updateItem('abc');

      item.title().should.equal('abc');
    });

    it('should cancel editing even if editing is not active', function () {
      controller.cancelEditing();
    });

    it('should cancel active editing', function () {
      var item = {
        title: mag.prop('abc')
      };

      controller.beginEditing(item);

      item.title('xyz');

      controller.cancelEditing();

      item.title().should.equal('abc');

      props.todos.update.should.not.be.called;
    });

    it('should finish editing even if editing is not active', function () {
      controller.finishEditing();
    });

    it('should finish active editing', function () {
      var item = {
        title: mag.prop('abc')
      };

      controller.beginEditing(item);

      item.title('xyz');
      
      controller.finishEditing();

      props.todos.update.should.be.called;
    });
  });
});
