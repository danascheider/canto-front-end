/* istanbul ignore require */
require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/tessitura.js');
require(process.cwd() + '/spec/support/env.js');

/* istanbul ignore next */
var matchers  = require('jasmine-jquery-matchers'),
    fixtures  = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context   = describe,
    fcontext  = fdescribe;

/* istanbul ignore next */
describe('User Model View', function() {
  var view, newView, e, input;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
  });

  beforeEach(function() {
    spyOn($, 'cookie').and.callFake(function(name) {
      return name === 'userID' ? 1 : btoa('testuser:testuser');
    });
  
    view = new Tessitura.UserModelView({model: fixtures.user});
  });

  afterEach(function() {
    user.destroy();
    view.destroy();
  }); 

  afterAll(function() {
    view = null;
    _.omit(global, fixtures);
  });

  describe('constructor', function() {
    it('assigns the model #userModelView #modelView #view #travis', function() {
      expect(view.model).toBe(user);
    });

    it('does not call render #userModelView #modelView #view #travis', function() {
      spyOn(Tessitura.UserModelView.prototype, 'render');
      newView = new Tessitura.UserModelView({model: user});
      expect(Tessitura.UserModelView.prototype.render).not.toHaveBeenCalled();
      newView.destroy();
    });
  });

  describe('el', function() {
    beforeEach(function() { view.render(); });

    it('is a div #userModelView #modelView #view #travis', function() {
      expect(view.$el[0].tagName).toEqual('DIV');
    });

    it('has class .user-model #userModelView #modelView #view #travis', function() {
      expect(view.$el[0]).toHaveClass('user-model');
    });

    it('displays the user\'s name #userModelView #modelView #view #travis', function() {
      expect(view.$el.html()).toContain('Name:');
    });
  });

  describe('events', function() {
    describe('change model', function() {
      it('calls updateDisplay #userModelView #modelView #view #travis', function() {
        spyOn(Tessitura.UserModelView.prototype, 'updateDisplay');
        newView = new Tessitura.UserModelView({model: user});
        user.trigger('change');
        expect(Tessitura.UserModelView.prototype.updateDisplay).toHaveBeenCalled();
        newView.destroy();
      });
    });

    describe('double-click username field', function() {
      it('calls displayInput #userModelView #modelView #view #travis', function() {
        spyOn(Tessitura.UserModelView.prototype, 'displayInput');
        newView = new Tessitura.UserModelView({model: user});
        newView.render();
        newView.$('span.profile-field#username span.p').trigger('dblclick');
        expect(Tessitura.UserModelView.prototype.displayInput).toHaveBeenCalled();
      });
    });

    describe('keydown in input', function() {
      it('calls triageKeypress #userModelView #modelView #view #travis', function() {
        spyOn(Tessitura.UserModelView.prototype, 'triageKeypress');
        newView = new Tessitura.UserModelView({model: user});
        newView.render();
        newView.$('input').trigger('keydown');
        expect(Tessitura.UserModelView.prototype.triageKeypress).toHaveBeenCalled();
      });
    });
  });

  describe('view elements', function() {
    beforeEach(function() { 
      view.render(); 
    });

    it('is a DIV #userModelView #modelView #view #travis', function() {
      expect(view.$el[0].tagName).toBe('DIV');
    });

    it('displays the user\'s headshot #userModelView #modelView #view #travis', function() {
      expect(view.$('#avatar')).toBeVisible();
    });

    _.each(['username', 'first_name', 'last_name', 'email', 'fach', 'city'], function(field) {
      it('displays the user\'s ' + field + ' #userModelView #modelView #view #travis', function() {
        expect(view.$('#' + field)).toBeVisible();
      });
    });
  });

  describe('special functions', function() {
    describe('hideInputs', function() {
      beforeEach(function() {
        view.render();
        view.displayInput($.Event('dblclick', {target: view.$('#username')}));
        view.hideInputs();
      });

      it('hides all the inputs #userModelView #modelView #view #travis', function() {
        expect(view.$('input')).not.toBeInDom();
      });

      it('shows the text #userModelView #modelView #view #travis', function() {
        expect(view.$('#username span.p').html()).toContain('testuser');
      });
    });
  });

  describe('event callbacks', function() {
    describe('displayInput()', function() {
      beforeEach(function() { view.render(); });

      it('displays an input #userModelView #modelView #view #travis', function() {
        e = $.Event({target: view.$('#username span.p')});
        view.displayInput(e);
        expect(view.$('#username input:visible').length).toBeGreaterThan(0);
      });

      it('hides the text #userModelView #modelView #view #travis', function() {
        e = $.Event({target: view.$('#username span.p')});
        view.displayInput(e);
        expect(e.target).not.toBeVisible();
      });

      it('hides other inputs #userModelView #modelView #view #travis', function() {
        var e1 = $.Event('dblclick', {target: view.$('#username span.p')}),
            e2 = $.Event('dblclick', {target: view.$('#city span.p')});

        view.displayInput(e1);
        view.displayInput(e2);
        expect(view.$('#username span.input')).not.toBeInDom();
      });
    });

    describe('resizeInputs()', function() {
      beforeEach(function() { 
        view.render(); 
        spyOn(global, 'parseInt').and.returnValue(11);
      });

      context('when the input is the first_name input', function() {
        it('sets the width #userModelView #modelView #view #travis', function() {
          // pending('FUFNR: Dash widget view spec causes parseInt not to be recognized as a method');
          var span = view.$('#first_name');
          view.displayInput('dblclick', {target: [{value: span}]});
          view.resizeInputs(span);
          expect(span.find('input').css('width')).toEqual('21px');
        });
      });
    });

    describe('submitUpdate()', function() {
      beforeEach(function() { view.render(); });

      context('general', function() {
        beforeEach(function() {
          spyOn($, 'attr').and.returnValue('city');
          view.displayInput($.Event({target: view.$('#city span.p')}));
          target = [{value: 'El Paso'}];
          e = $.Event('keydown', {keyCode: 13, target: target});
        });

        it('calls save on the user model #userModelView #modelView #view #travis', function() {
          spyOn(view.model, 'save');
          view.submitUpdate(e);
          expect(view.model.save.calls.mostRecent().args[0]).toEqual({city: 'El Paso'});
        });

        it('hides the input #userModelView #modelView #view #travis', function(done) {
          spyOn($, 'ajax').and.callFake(function(args) { args.success(); });
          view.submitUpdate(e);
          expect(view.$('#city span.input')).not.toBeInDom();
          done();
        });

        it('changes the text to the new value #userModelView #modelView #view #travis', function() {
          spyOn($, 'ajax').and.callFake(function(args) { args.success(); });
          view.submitUpdate(e);
          expect(view.$('#city span.p').html()).toContain('El Paso');
        });
      });
    });

    describe('triageKeypress()', function() {
      beforeEach(function() {
        view.render();
      });

      context('when the key is enter', function() {
        beforeEach(function() {
          spyOn(view, 'submitUpdate');
          input = view.$('input[name=username]');
          input.show();
        });

        context('when the input is empty', function() {
          beforeEach(function() {
            spyOn($.prototype, 'attr').and.returnValue('username');
            var target = [{value: ''}];
            e = $.Event('keydown', {keyCode: 13, target: target});
          });

          it('doesn\'t submit #userModelView #modelView #view #travis', function() {
            view.triageKeypress(e);
            expect(view.submitUpdate).not.toHaveBeenCalled();
          });
        });

        context('when the content of the field hasn\'t changed', function() {
          beforeEach(function() {
            spyOn($.prototype, 'attr').and.returnValue('username');
            var target = [{value: 'testuser'}, {attributes: {name: 'username'}}];
            e = $.Event('keydown', {keyCode: 13, target: target});
          });

          it('doesn\'t submit #userModelView #modelView #view #travis', function() {
            view.triageKeypress(e);
            expect(view.submitUpdate).not.toHaveBeenCalled();
          });
        });

        context('when the content of the field has changed', function() {
          beforeEach(function() {
            spyOn($.prototype, 'attr').and.returnValue('username');
            var target = [{value: 'usertest'}, {attributes: {name: 'username'}}];
            e = $.Event('keydown', {keyCode: 13, target: target});
          });

          it('submits #userModelView #modelView #view #travis', function() {
            view.triageKeypress(e);
            expect(view.submitUpdate).toHaveBeenCalled();
          });
        });
      });

      context('when the key is tab', function() {
        beforeEach(function() {
          spyOn(view, 'submitUpdate');
          input = view.$('input[name=username]');
          view.displayInput('dblclick', view.$('#username span.p'));
        });

        context('when the input is empty', function() {
          beforeEach(function() {
            spyOn($.prototype, 'attr').and.returnValue('username');
            var target = [{value: ''}];
            e = $.Event('keydown', {keyCode: 9, target: target});
          });

          it('doesn\'t submit #userModelView #modelView #view #travis', function() {
            view.triageKeypress(e);
            expect(view.submitUpdate).not.toHaveBeenCalled();
          });

          it('hides the input #userModelView #modelView #view #travis', function() {
            view.triageKeypress(e);
            expect(view.$('#username input')).not.toBeInDom();
          });

          it('shows the next input #userModelView #modelView #view #travis', function() {
            pending('FUFNR');
            view.triageKeypress(e);
            expect(view.$('#email .input')).toBeInDom();
          });
        });

        context('when the first input is first_name #userModelView #modelView #view #travis', function() {
          beforeEach(function() {
            spyOn($.prototype, 'attr').and.returnValue('first_name');
            var target = [{value: ''}];
            e = $.Event('keydown', {keyCode: 9, target: target});
          });

          it('goes to the last_name field #userModelView #modelView #view #travis', function() {
            pending('FUFNR');
            view.triageKeypress(e);
            expect(view.$('#last_name .input')).toBeInDom();
          });
        });

        context('when the input doesn\'t match the current attribute value', function() {
          beforeEach(function() {
            var target = [{value: 'Foobar'}];
            e = $.Event('keydown', {keyCode: 9, target: target});
            view.displayInput('dblclick', view.$('#username span.p'));
            });

          it('calls submitUpdate #userModelView #modelView #view #travis', function() {
            view.triageKeypress(e);
            expect(view.submitUpdate).toHaveBeenCalled();
          });
        });
      });
      
      context('when the key is escape', function() {
        beforeEach(function() {
          spyOn(view, 'hideInputs');
          view.displayInput('dblclick', view.$('input[name=username]'));
          var target = [{value: ''}];
          e = $.Event('keydown', {keyCode: 27, target: target});
        });

        it('calls hideInputs #userModelView #modelView #view #travis', function() {
          view.triageKeypress(e);
          expect(view.hideInputs).toHaveBeenCalled();
        });
      });
    });

    describe('updateDisplay()', function() {
      beforeEach(function() {
        view.render();
        spyOn(view.model, 'get').and.returnValue(null);
        spyOn($.prototype, 'html');
      });

      it('sets the value to \'N/A\' #userModelView #modelView #view #travis', function() {
        view.updateDisplay();
        expect($.prototype.html).toHaveBeenCalledWith('N/A');
      });
    });
  });

  describe('core view functions', function() {
    describe('render', function() {
      it('sets the HTML of its el #userModelView #modelView #view #travis', function() {
        spyOn(view.$el, 'html');
        view.render();
        expect(view.$el.html).toHaveBeenCalledWith(view.template({model: user}));
      });

      it('returns itself #userModelView #modelView #view #travis', function() {
        expect(view.render()).toBe(view);
      });
    });
  });
});