var app = mag.namespace('app');

describe('todo-list', function () {
  it('should have constructor', function () {
    app.TodoList.should.have.constructor();
  });

  it('should provide methods', function () {
    app.TodoList.should.respondTo('sync');
    app.TodoList.should.respondTo('list');
    app.TodoList.should.respondTo('summary');
    app.TodoList.should.respondTo('create');
    app.TodoList.should.respondTo('add');
    app.TodoList.should.respondTo('update');
    app.TodoList.should.respondTo('remove');
    app.TodoList.should.respondTo('toggle');
    app.TodoList.should.respondTo('predicate');
    app.TodoList.should.respondTo('toggleAll');
    app.TodoList.should.respondTo('clearCompleted');
    app.TodoList.should.respondTo('setFilter');
    app.TodoList.should.respondTo('currentFilter');
  });

  describe('interface', function () {
    var model;
    var data = [
      { title: 'todo-1', completed: false },
      { title: 'todo-2', completed: true },
      { title: 'todo-3', completed: false }
    ];
    var store;
    var todos;

    beforeEach(function () {
      model = sinon.spy(app.TodoModel);

      store = {
        load: sinon.stub().returns(data),
        save: sinon.spy()
      };

      todos = new app.TodoList(model, store);
    });

    describe('constructor', function () {
      it('should initialize list', function () {
        todos.should.be.ok;
      });
    });

    describe('list methods', function () {
      it('should return a list', function () {
        var list = todos.list();

        data.forEach(function (item, idx) {
          var todo = list[idx];

          todo.title().should.equal(item.title);
          todo.completed().should.equal(item.completed);
        });
      });

      it('should return a summary', function () {
        var summary = todos.summary();

        summary.should.have.property('total');
        summary.should.have.property('completed');
        summary.should.have.property('active');
        summary.should.have.property('filtered');

        summary.total.should.equal(data.length);
        summary.completed.should.equal(1);
        summary.active.should.equal(data.length - 1);
        summary.filtered.should.equal(data.length);
      });
    });

    describe('item methods', function () {
      it('should create a new item', function () {
        var obj = todos.create();

        obj.should.be.ok;

        model.should.be.called;
      });

      it('should add an item', function () {
        var obj = todos.create();

        todos.add(obj);

        todos.list().length.should.equal(data.length + 1);
        store.save.should.be.called;
      });

      it('should update an item', function () {
        var item = todos.list()[0];

        item.title('update title');
        item.completed(true);

        todos.update(item);

        todos.list().length.should.equal(data.length);
        store.save.should.be.called;

        var updated = todos.list()[0];

        updated.title().should.equal('update title');
        updated.completed().should.be.true;
      });

      it('should remove an item which title is empty', function () {
        var item = todos.list()[0];

        item.title('');
        item.completed(true);

        todos.update(item);

        todos.list().length.should.equal(data.length - 1);
        store.save.should.be.called;

        todos.list().forEach(function (todo) {
          todo.id.should.not.equal(item.id);
        });
      });

      it('should remove an item', function () {
        var item = todos.list()[0];

        todos.remove(item);

        todos.list().length.should.equal(data.length - 1);
        store.save.should.be.called;

        todos.list().forEach(function (todo) {
          todo.id.should.not.equal(item.id);
        });
      });

      it('should toggle an item', function () {
        var item = todos.list()[0];

        var beforeToggle = item.completed();
        todos.toggle(item);

        todos.list().length.should.equal(data.length);
        store.save.should.be.called;

        todos.list()[0].completed().should.not.equal(beforeToggle);
      });

      it('should predicate active items', function () {
        var obj = todos.create();

        obj.completed(false);

        todos.setFilter(app.FILTER_ACTIVE);

        todos.predicate(obj).should.be.true;

        obj.completed(true);

        todos.predicate(obj).should.be.false;
      });

      it('should predicate completed items', function () {
        var obj = todos.create();

        obj.completed(false);

        todos.setFilter(app.FILTER_COMPLETED);

        todos.predicate(obj).should.be.false;

        obj.completed(true);

        todos.predicate(obj).should.be.true;
      });
    });

    describe('batch operation', function () {
      it('should toggle all items', function () {
        todos.toggleAll(true);
        store.save.should.called;

        todos.list().forEach(function (item) {
          item.completed().should.be.true;
        });

        todos.toggleAll(false);

        todos.list().forEach(function (item) {
          item.completed().should.be.false;
        });
      });

      it('should clear completed items', function () {
        todos.toggleAll(false);

        // no items completed
        todos.clearCompleted();
        store.save.should.called;
        
        todos.list().length.should.equal(data.length);

        todos.toggleAll(true);

        todos.clearCompleted();

        todos.list().length.should.equal(0);
      });
    });

    describe('properties', function () {
      it('should provide a filter property', function () {
        todos.setFilter('abc');
        todos.currentFilter().should.equal('abc');
      });
    });
  });
});
