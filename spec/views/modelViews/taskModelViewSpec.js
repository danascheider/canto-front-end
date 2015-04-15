require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/canto.js');
require(process.cwd() + '/spec/support/env.js');

var matchers  = require('jasmine-jquery-matchers'),
    Fixtures  = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context   = describe,
    fcontext  = fdescribe;

describe('Task Model View', function() {
  var view;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, Fixtures);
  });

  beforeEach(function() {
    jasmine.addMatchers(matchers);

    spyOn($, 'cookie').and.callFake(function(name) {
      return name === 'userID' ? 342 : btoa('testuser:testuser');
    });

    view = new Canto.TaskModelView({model: task1});
  });

  afterEach(function() {
    view.remove();
    restoreFixtures();
  }); 

  afterAll(function() {
    global = _.omit(global, Fixtures);
    view = null;
  });

  describe('constructor', function() {
    it('assigns the model #travis', function() {
      expect(view.model).toBe(task1);
    });

    it('does not call render #travis', function() {
      spyOn(Canto.TaskModelView.prototype, 'render');
      var newView = new Canto.TaskModelView({model: task1});
      expect(Canto.TaskModelView.prototype.render).not.toHaveBeenCalled();
    });
  });

  describe('properties', function() {
    it('is a Canto.View #travis', function() {
      expect(view).toBeA('Canto.View');
    });

    it('has klass TaskModelView #travis', function() {
      expect(view.klass).toBe('TaskModelView');
    });

    it('has family Canto.View #travis', function() {
      expect(view.family).toBe('Canto.View');
    });

    it('has superFamily Backbone.View #travis', function() {
      expect(view.superFamily).toBe('Backbone.View');
    });
  });

  describe('el', function() {
    beforeEach(function() { view.render(); });

    it('is a div #travis', function() {
      expect(view.$el[0].tagName).toEqual('DIV');
    });

    it('has class .task-model #travis', function() {
      expect(view.$el[0]).toHaveClass('task-model');
    });
  });

  describe('events', function() {
    describe('save model', function() {
      it('calls renderOnSync #travis', function() {
        spyOn(Canto.TaskModelView.prototype, 'renderOnSync');
        var newView = new Canto.TaskModelView({model: task1});
        task1.trigger('sync');
        expect(Canto.TaskModelView.prototype.renderOnSync).toHaveBeenCalled();
      });
    });
  });

  describe('view elements', function() {
    beforeEach(function() { 
      task1.set('deadline', new Date(2015, 8, 28));
      task1.set('description', 'Test Canto\'s front-end functionality')
      view.render(); 
    });

    it('displays the task\'s title #travis', function() {
      expect(view.$('a.task-title').html()).toEqual('Task 1');
    });

    it('displays the task\'s deadline #travis', function() {
      expect(view.$('table.task-details').html()).toEqual(jasmine.stringMatching('Monday, September 28, 2015'));
    });

    it('displays the task\'s priority #travis', function() {
      expect(view.$('.task-priority-row').html()).toEqual(jasmine.stringMatching('Low'));
    });

    it('displays the task\'s status #travis', function() {
      expect(view.$('.task-status-row').html()).toEqual(jasmine.stringMatching('New'));
    });

    it('displays the task\'s description #travis', function() {
      expect(view.$('.task-description-row').html()).toEqual(jasmine.stringMatching("Test Canto's front-end functionality"));
    });

    it('does not display blank fields #travis', function() {
      task1.unset('deadline');
      view.render();
      expect(view.$('tr.task-deadline-row').length).toEqual(0);
      task1.set('deadline', new Date(2015, 8, 28));
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with arg \'TaskModelView\' #travis', function() {
        expect(view.isA('TaskModelView')).toBe(true);
      });

      it('returns false with another string #travis', function() {
        expect(view.isA('TaskCollection')).toBe(false);
      });
    });
  });

  describe('event callbacks', function() {
    describe('renderOnSync', function() {
      beforeEach(function() { spyOn(view, 'render'); });

      context('when not marked complete', function() {
        it('calls the render function #travis', function() {
          view.renderOnSync();
          expect(view.render).toHaveBeenCalled();
        });
      });

      context('when marked complete', function() {
        it('doesn\'t call render #travis', function() {
          task1.set('status', 'Complete');
          view.renderOnSync();
          expect(view.render).not.toHaveBeenCalled();
        });
      });
    });
  });
});