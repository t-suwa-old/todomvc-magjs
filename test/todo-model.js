var app = mag.namespace('app');

describe('todo-model', function () {
  it('should have constructor', function () {
    app.TodoModel.should.have.constructor();
  });

  it('should provide methods', function () {
    app.TodoModel.should.respondTo('toggle');
    app.TodoModel.should.respondTo('active');
    app.TodoModel.should.respondTo('validate');
  });

  describe('constructor', function () {
    it('should provide default values', function () {
      var obj = new app.TodoModel();

      obj.id.should.be.a('string');
      obj.title().should.equal('');
      obj.completed().should.equal(false);
    });

    it('should accept initial values', function () {
      var obj = new app.TodoModel({
        id: 'abc',
        title: 'test',
        completed: true
      });

      obj.id.should.not.equal('abc');
      obj.title().should.equal('test');
      obj.completed().should.equal(true);
    });
  });

  describe('properties', function () {
    it('should update title', function () {
      var obj = new app.TodoModel();

      obj.title('update');

      obj.title().should.equal('update');
    });

    it('should update status of completed', function () {
      var obj = new app.TodoModel();

      obj.completed().should.equal(false);

      obj.completed(true);
      obj.completed().should.equal(true);
    });
  });

  describe('methods', function () {
    it('should toggle status', function () {
      var obj = new app.TodoModel();

      obj.completed().should.equal(false);

      obj.toggle();
      obj.completed().should.equal(true);

      obj.toggle();
      obj.completed().should.equal(false);
    });

    it('should return whether item is active or not', function () {
      var obj = new app.TodoModel();

      obj.completed().should.equal(false);
      obj.active().should.equal(true);

      obj.toggle();

      obj.completed().should.equal(true);
      obj.active().should.equal(false);
    });

    it('should validate model', function () {
      var obj = new app.TodoModel();

      obj.title().should.equal('');
      obj.validate().should.equal(false);

      obj.title('update');
      obj.validate().should.equal(true);
    });
  });
});
