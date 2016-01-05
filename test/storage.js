var app = mag.namespace('app');

describe('storage', function () {
  var obj = { a: "abc" };

  it('should save an object', function () {
    app.Storage.save(obj);
  });

  it('should load the object which has been saved previously', function () {
    var loaded = app.Storage.load();

    loaded.should.be.eql(obj);
  });
});
