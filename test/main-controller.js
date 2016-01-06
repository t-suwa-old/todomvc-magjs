var app = mag.namespace('app');

describe('main-controller', function () {
  it('should have a constructor', function () {
    app.Todo.Main.controller.should.have.constructor();
  });

  it('should provide methods', function () {
    var controller = new app.Todo.Main.controller();
    
    controller.should.respondTo('beginEditing');
    controller.should.respondTo('isEditing');
    controller.should.respondTo('cancelEditing');
    controller.should.respondTo('finishEditing');
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
