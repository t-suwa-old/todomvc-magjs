var app = mag.namespace('app');

describe('utils', function () {
  it('should have filter constants', function () {
    app.should.have.property('FILTER_ACTIVE');
    app.should.have.property('FILTER_COMPLETED');
  });

  it('should provide Utility object', function () {
    app.should.have.property('Utility');
  });

  describe('Utility', function () {
    var css = [
      'selected', 'editing', 'hidden', 'completed'
    ];

    var capitalize = function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    it('should have keyCoden constants', function () {
      app.Utility.should.have.property('ENTER_KEY');
      app.Utility.should.have.property('ESC_KEY');
    });

    it('should provide cssSwitchers', function () {
      css.forEach(function (css) {
        app.Utility.should.respondTo('css' + capitalize(css));
      });
    });

    describe('cssSwitcher', function () {
      var classList;

      var getSwitcher = function (css) {
        return app.Utility['css' + capitalize(css)]({ classList: classList });
      };

      beforeEach(function () {
        classList = {
          add: sinon.spy(),
          remove: sinon.spy(),
          contains: sinon.spy()
        };
      });

      it('should provide switcher methods', function () {
        css.forEach(function (css) {
          var switcher = getSwitcher(css);

          switcher.should.respondTo('on');
          switcher.should.respondTo('off');
          switcher.should.respondTo('set');
          switcher.should.respondTo('isActive');
        });
      });

      it('should turn on css', function () {
        css.forEach(function (css) {
          var switcher = getSwitcher(css);

          switcher.on();
          classList.add.should.have.been.calledWith(css);
        });
      });

      it('should turn off css', function () {
        css.forEach(function (css) {
          var switcher = getSwitcher(css);

          switcher.off();
          classList.remove.should.have.been.calledWith(css);
        });
      });

      it('should set positive value ', function () {
        css.forEach(function (css) {
          var switcher = getSwitcher(css);

          switcher.set(true);
          classList.add.should.have.been.calledWith(css);
        });
      });

      it('should set negative value ', function () {
        css.forEach(function (css) {
          var switcher = getSwitcher(css);

          switcher.set(false);
          classList.remove.should.have.been.calledWith(css);
        });
      });

      it('should return current value ', function () {
        css.forEach(function (css) {
          var switcher = getSwitcher(css);

          switcher.isActive();
          classList.contains.should.have.been.calledWith(css);
        });
      });
    });
  });
});
