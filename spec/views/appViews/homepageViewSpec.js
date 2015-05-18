/****************************************************************************
 *                                                                         *
 * HOMEPAGE VIEW                                                           *
 *                                                                         *
 * The homepage is the place where users who are not logged in land when   *
 * they visit the site. It is the place where they can get information     *  
 * about the product or log into their dashboard.                          *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 26   *
 * Suite ............................................................ 44   *
 *   Filters ........................................................ 50   *
 *   Authorization and Authentication ............................... 60   *
 *     token()                                                             *
 *   Core Functions ................................................. 69   *
 *     fetch()                                                             *
 *   Special Functions .............................................. 91   *
 *     updateAll() .................................................. 92   *
 *     isA() ....................................................... 140   *
 *                                                                         *
/****************************************************************************/

/* Core Requires
/****************************************************************************/

require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/spec/support/env.js');
require(process.cwd() + '/js/tessitura.js');

var matchers       = _.extend(require('jasmine-jquery-matchers')),
    context        = describe,
    fcontext       = fdescribe;

/****************************************************************************
 * BEGIN SUITE                                                              *
/****************************************************************************/

describe('Tessitura Homepage View', function() {
  var view, e, spy, newView, user;

  /* Filters
  /**************************************************************************/

  beforeAll(function()  { jasmine.addMatchers(matchers); });
  beforeEach(function() { view = new Tessitura.HomepageView(); });
  afterEach(function()  { view.destroy(); });
  afterAll(function()   { view = null; });

  /* Static Properties
  /**************************************************************************/

  describe('properties', function() {
    it('#view #travis has klass \'HomepageView\'', function() {
      expect(view.klass).toEqual('HomepageView');
    });

    it('#view #travis has family Tessitura.View', function() {
      expect(view.family).toEqual('Tessitura.View');
    });

    it('#view #travis has superFamily Backbone.View', function() {
      expect(view.superFamily).toEqual('Backbone.View');
    });
  });

  /* View Constructor
  /**************************************************************************/

  describe('constructor', function() {
    it('#view #travis does not call render', function() {
      spyOn(Tessitura.HomepageView.prototype, 'render');
      var newView = new Tessitura.HomepageView();
      expect(Tessitura.HomepageView.prototype.render).not.toHaveBeenCalled();
    });

    it('#view #travis creates a login form', function() {
      expect(view.loginForm).toExist();
    });

    it('#view #travis creates a registration form', function() {
      expect(view.registrationForm).toExist();
    });
  });

  /* Elements
  /**************************************************************************/

  describe('view elements', function() {
    beforeEach(function() {
      view.render();
    });

    it('#view #travis is a div', function() {
      expect(view.$el).toHaveTag('div');
    });

    it('#view #travis has ID #homepage-wrapper', function() {
      expect(view.$el).toHaveId('homepage-wrapper');
    });
  });

  /* Event Wiring
  /**************************************************************************/

  describe('events', function() {
    beforeEach(function() {
      spy = jasmine.createSpy();
      spyOn(Tessitura.HomepageView.prototype, 'hideLoginForm');
      spyOn(Tessitura.HomepageView.prototype, 'toggleLoginForm');
      newView = new Tessitura.HomepageView();
      newView.render();
      newView.on('redirect', spy);
    });

    afterEach(function() { newView.destroy(); });

    describe('click .login-link', function() {
      it('#view #travis calls toggleLoginForm', function() {
        newView.$('nav li .login-link').click();
        expect(Tessitura.HomepageView.prototype.toggleLoginForm).toHaveBeenCalled();
      });
    });

    describe('dblclick #shade', function() {
      it('#view #travis calls hideLoginForm', function() {
        newView.$('#shade').dblclick();
        expect(Tessitura.HomepageView.prototype.hideLoginForm).toHaveBeenCalled();
      });
    });
  });

  /* Event Callbacks
  /**************************************************************************/

  describe('event callbacks', function() {
    describe('goToDashboard()', function() {
      beforeEach(function() {
        spy = jasmine.createSpy();
        view.on('redirect', spy);
        user = new Tessitura.UserModel({id: 1, username: 'testuser', password: 'testuser'});
        e = {user: user};
      });

      afterEach(function() { user.destroy(); });
      
      it('#view #travis triggers redirect on itself', function() {
        view.goToDashboard(e);
        expect(spy).toHaveBeenCalled();
      });

      it('#view #travis passes the user through', function() {
        view.goToDashboard(e);
        expect(spy.calls.argsFor(0)[0]).toEqual(jasmine.objectContaining({user: user}));
      });

      it('#view #travis sends the destination', function() {
        view.goToDashboard(e);
        expect(spy.calls.argsFor(0)[0]).toEqual(jasmine.objectContaining({destination: 'dashboard'}));
      });
    });

    describe('toggleLoginForm()', function() {
      context('when the user is logged in', function() {
        beforeEach(function() {
          spyOn($, 'cookie').and.returnValue(btoa('testuser:testuser'));
        });

        it('#view #travis triggers redirect', function() {
          spy = jasmine.createSpy();
          view.on('redirect', spy);
          view.toggleLoginForm($.Event('click', {target: view.$('.login-link')}));
          expect(spy).toHaveBeenCalledWith({destination: 'dashboard'});
        });
      });

      context('when the user is not logged in', function() {
        beforeEach(function() {
          spyOn($, 'cookie').and.returnValue(null);
        });

        it('#view #travis doesn\'t trigger redirect', function() {
          view.toggleLoginForm($.Event('click', {target: view.$('.login-link')}));
        });
      });
    });
  });

  /* Core View Functions
  /**************************************************************************/

  describe('core view functions', function() {
    describe('remove()', function() {
      beforeEach(function() {
        spyOn(view.loginForm, 'remove');
        spyOn(view.registrationForm, 'remove');
        spyOn(Backbone.View.prototype.remove, 'call');
        view.remove();
      });

      it('#view #travis removes its login form', function() {
        expect(view.loginForm.remove).toHaveBeenCalled();
      });

      it('#view #travis removes its registration form', function() {
        expect(view.registrationForm.remove).toHaveBeenCalled();
      });

      it('#view #travis removes itself using the Backbone view prototype', function() {
        expect(Backbone.View.prototype.remove.call).toHaveBeenCalledWith(view);
      });
    });

    describe('render', function() {
      it('#view #travis renders its login form', function() {
        spyOn(view.loginForm, 'render');
        view.render();
        expect(view.loginForm.render).toHaveBeenCalled();
      });

      it('#view #travis inserts its login form into its #shade element', function() {
        view.render();
        expect(view.$('#shade')).toHaveDescendant(view.loginForm.$el);
      });
    });
  });

  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA()', function() {
      it('#view #travis returns true with argument HomepageView', function() {
        expect(view.isA('HomepageView')).toBe(true);
      });

      it('#view #travis returns true with argument TopLevelView', function() {
        expect(view.isA('TopLevelView')).toBe(true);
      });

      it('#view #travis returns false with another argument', function() {
        expect(view.isA('Corvette')).toBe(false);
      });
    });
  });
});