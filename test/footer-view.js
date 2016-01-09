var app = mag.namespace('app');

describe('footer-view', function () {
  var model;
  var store;
  var spy;
  var todos;
  var state;
  var props;
  
  beforeEach(function () {
    model = sinon.spy(app.TodoModel);
    store = {
      load: sinon.stub().returns([]),
      save: sinon.spy()
    };
    spy = sinon.spy(app.TodoList);
    todos = new spy(model, store);
    props = {
      app: app.Utility,
      todos: todos
    };

    state = {};
  });
  
  it('should provide view', function () {
    app.Todo.Footer.view(state, props);

    state.should.have.property('todo-count');
    state['todo-count'].should.respondTo('_config');

    state.should.have.property('$a');
    state.$a.should.have.respondTo('_config');

    state.should.have.property('clear-completed');
    state['clear-completed'].should.respondTo('_config');
    state['clear-completed'].should.respondTo('_onclick');
  });

  describe('plural control', function () {
    it('should use `items` when there are no active items', function () {
      app.Todo.Footer.view(state, props);

      var node = {};

      state['todo-count']._config(node);

      node.innerHTML.should.have.string('0');
      node.innerHTML.should.have.string('items left');
    });

    it('should use `item` when there is only one active item', function () {
      todos.add(todos.create());

      app.Todo.Footer.view(state, props);

      var node = {};

      state['todo-count']._config(node);

      node.innerHTML.should.have.string('1');
      node.innerHTML.should.have.string('item left');
    });

    it('should use `items` when there are more than one active items', function () {
      todos.add(todos.create());
      todos.add(todos.create());

      app.Todo.Footer.view(state, props);

      var node = {};

      state['todo-count']._config(node);

      node.innerHTML.should.have.string('2');
      node.innerHTML.should.have.string('items left');
    });
  });

  describe('link activation', function () {
    var cssSelected;
    var stub;
    var node;

    beforeEach(function () {
      cssSelected = {
        on: sinon.spy(),
        off: sinon.spy()
      };

      stub = sinon.stub(props.app, 'cssSelected').returns(cssSelected);

      node = {
        href: 'abc'
      };
    });

    afterEach(function () {
      stub.restore();
    });
    
    it('should seleted on matched link', function () {
      app.Todo.Footer.view(state, props);

      todos.setFilter('abc');

      state.$a._config(node);

      cssSelected.on.should.be.called;
    });
    
    it('should not seleted on unmatched link', function () {
      app.Todo.Footer.view(state, props);

      todos.setFilter('xyz');

      state.$a._config(node);

      cssSelected.on.should.not.be.called;
    });
  });
});
