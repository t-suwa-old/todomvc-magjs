(function (app) {
  'use strict';

  // filter constants
  app.FILTER_ACTIVE = 'active';
  app.FILTER_COMPLETED = 'completed';

  // CSS class switching utility
  var cssSwitcher = function (css, node) {
    return {
      on: function () {
        node.classList.add(css);
      },
      off: function () {
        node.classList.remove(css);
      },
      set: function (flag) {
        if (flag) {
          this.on();
        } else {
          this.off();
        }
      },
      isActive: function () {
        return node.classList.contains(css);
      }
    };
  };

  app.Utility = {
    // keyCode constants
    ENTER_KEY: 13,
    ESC_KEY: 27,

    // css class switchers
    cssSelected: cssSwitcher.bind(undefined, 'selected'),
    cssEditing: cssSwitcher.bind(undefined, 'editing'),
    cssHidden: cssSwitcher.bind(undefined, 'hidden'),
    cssCompleted: cssSwitcher.bind(undefined, 'completed')
  };
})(mag.namespace('app'));
