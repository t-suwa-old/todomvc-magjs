var app = mag.namespace('app');

describe('main-view', function () {
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
    app.Todo.Main.view(state, props);

    state.should.have.property('toggle-all');
    state['toggle-all'].should.respondTo('_config');
    state['toggle-all'].should.respondTo('_onclick');

    state.should.have.property('li');
    state.li.forEach(function (li) {
      li.should.have.property('label');
      li.label.should.have.property('_text');
      li.label.should.respondTo('_ondblclick');

      li.should.have.property('toggle');
      li.toggle.should.respondTo('_config');
      li.toggle.should.respondTo('_onclick');

      li.should.have.property('edit');
      li.edit.should.have.property('_config');
      li.edit.should.respondTo('_oninput');
      li.edit.should.respondTo('_onkeyup');
      li.edit.should.respondTo('_onkeypress');
      li.edit.should.respondTo('_onblur');

      li.should.have.property('destroy');
      li.destroy.should.respondTo('_onclick');
    });
  });

  describe('toggle-all', function () {
    it('should check if summary.active === 0', function () {
      app.Todo.Main.view(state, props);

      var node = {};

      state['toggle-all']._config(node);

      node.checked.should.be.true;
    });

    it('should not check if summary.active !== 0', function () {
      todos.add(todos.create());
      
      app.Todo.Main.view(state, props);

      var node = {};

      state['toggle-all']._config(node);

      node.checked.should.be.false;
    });

    it('should toggle all item', function () {
      app.Todo.Main.view(state, props);

      var toggleAll = sinon.spy(todos, 'toggleAll');
      
      state['toggle-all'].checked = true;
      state['toggle-all']._onclick();

      toggleAll.should.be.calledWith(true);

      state['toggle-all'].checked = false;
      state['toggle-all']._onclick();

      toggleAll.should.be.calledWith(false);
    });
  });

  describe('list', function () {
    it('should build a list', function () {
      props.todos.add(props.todos.create({ title: 'abc' }));

      app.Todo.Main.view(state, props);

      state.li.length.should.equal(1);
    });
  });
});
