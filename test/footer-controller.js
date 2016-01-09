var app = mag.namespace('app');

describe('footer-controller', function () {
  it('should have a constructor', function () {
    app.Todo.Footer.controller.should.have.constructor();
  });

  it('should provide methods', function () {
    var controller = new app.Todo.Footer.controller();
    
    controller.should.respondTo('willupdate');
  });

  describe('visibility', function () {
    it('should hidden when total item == 0', function () {
      var node = {
        style: {
          display: 'abc'
        }
      };
      var props = {
        todos: {
          summary: function () {
            return {
              total: 0
            };
          }
        }
      };
      var controller = new app.Todo.Footer.controller(props);

      controller.willupdate({}, node, props);

      node.style.display.should.equal('none');
    });

    it('should show when total item != 0', function () {
      var node = {
        style: {
          display: 'abc'
        }
      };
      var props = {
        todos: {
          summary: function () {
            return {
              total: 1
            };
          }
        }
      };
      var controller = new app.Todo.Footer.controller(props);

      controller.willupdate({}, node, props);

      node.style.display.should.equal('block');
    });
  });
});
