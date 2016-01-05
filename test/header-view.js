var app = mag.namespace('app');

describe('header-view', function () {
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

    app.Todo.Header.view(state, props);
  });
  
  it('should provide view', function () {
    state.should.have.property('input');

    state.input.should.have.respondTo('_config');
    state.input.should.have.respondTo('_oninput');
    state.input.should.have.respondTo('_onkeypress');
  });

  describe('callbacks', function () {
    it('should initialize focus when newly created', function () {
      var node = {
        value: 'abc',
        focus: sinon.spy()
      };
      state.input._config(node, true);

      node.value.should.be.empty;
      node.focus.should.be.called;
    });

    it('should not initialize focus when redraw', function () {
      var node = {
        value: 'abc',
        focus: sinon.spy()
      };
      state.input._config(node, false);

      node.value.should.be.empty;
      node.focus.should.not.be.called;
    });

    it('should update title on input', function () {
      var event = {
        currentTarget: {
          getAttribute: sinon.stub().returns('new item')
        }
      };

      state.input._oninput(event);

      event.currentTarget.getAttribute.should.calledWith('value');
    });

    it('should add an item on ENTER_KEY', function () {
      state.input._oninput({
        currentTarget: {
          value: 'new item'
        }
      });

      state.input._onkeypress({
        which: props.app.ENTER_KEY
      });

      todos.list().length.should.equal(1);

      var added = todos.list()[0];

      added.title().should.equal('new item');
      added.completed().should.be.false;
    });
  });
});
