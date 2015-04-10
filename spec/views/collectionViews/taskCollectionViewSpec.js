require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/canto.js');
require(process.cwd() + '/spec/support/env.js');

var matchers       = require('jasmine-jquery-matchers'),
    Fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context        = describe,
    fcontext       = fdescribe;

fdescribe('Task Collection View #travis', function() {
  var view, newView;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, Fixtures);
  })
  
  beforeEach(function() {
    childViews = collection.models.map(function(task) { return new Canto.TaskListItemView({model: task}); });
    var models = childViews.map(function(model) { return model.cid });
    view = new Canto.TaskCollectionView({collection: collection});
  });

  afterEach(function() {
    restoreFixtures();
  })

  afterAll(function() {
    view.remove();
    view = null;
    global = _.omit(global, Fixtures)
  });

  describe('constructor', function() {
    it('does not call the render function', function() {
      spyOn(Canto.TaskCollectionView.prototype, 'render');
      var newView = new Canto.TaskCollectionView({collection: collection});
      expect(Canto.TaskCollectionView.prototype.render).not.toHaveBeenCalled();
    });

    it('creates an empty childViews array', function() {
      expect(view.childViews).toEqual([]);
    });

    it('creates a quick-add form', function() {
      expect(view.quickAddForm.klass).toEqual('QuickAddTaskFormView');
    });
  });

  describe('properties', function() {
    it('is a Canto.View', function() {
      expect(view).toBeA('Canto.View');
    });

    it('has klass TaskCollectionView', function() {
      expect(view.klass).toEqual('TaskCollectionView');
    });

    it('has family Canto.View', function() {
      expect(view.family).toEqual('Canto.View');
    });

    it('has superFamily Backbone.View', function() {
      expect(view.superFamily).toEqual('Backbone.View');
    });
  });

  describe('elements', function() {
    beforeEach(function() { view.render(); });

    it('is a ul', function() {
      expect(view.$el[0]).toHaveTag('UL');
    });

    it('has class .task-list', function() {
      expect(view.$el[0]).toHaveClass('task-list');
    });

    it('has a list item for each task', function() {
      expect(view.$('.task-list-item')).toHaveLength(3);
    });
  });

  describe('events', function() {
    beforeEach(function() {
      spyOn(Canto.TaskCollectionView.prototype, 'render');
      spyOn(Canto.TaskCollectionView.prototype, 'crossOff');
      spyOn(Canto.TaskCollectionView.prototype, 'removeChildAndRender');

      spyOn(Canto.TaskCollectionView.prototype, 'retrieveViewForModel').and.returnValue(childViews[0]);

      newView = new Canto.TaskCollectionView({collection: collection});
      newView.childViews = childViews;
    });

    afterEach(function() {
      newView.remove();
      newView.unbind();
    });

    describe('add to collection', function() {
      it('calls render', function() {
        newView.collection.trigger('add');
        expect(Canto.TaskCollectionView.prototype.render).toHaveBeenCalled();
      });
    });

    describe('remove from collection', function() {
      it('calls removeChildAndRender', function() {
        newView.collection.trigger('remove');
        expect(Canto.TaskCollectionView.prototype.render).toHaveBeenCalled();
      });
    });

    describe('fetch collection', function() {
      it('calls render', function() {
        newView.collection.trigger('fetch');
        expect(Canto.TaskCollectionView.prototype.render).toHaveBeenCalled();
      });
    });

    // FIX: Determine whether this is really necessary
    // 
    // describe('newTask through quick-add form', function() {
    //   it('calls fetch on the collection', function() {
    //     newView.quickAddForm.trigger('newView');
    //     expect(Backbone.Collection..fetch).toHaveBeenCalled();
    //   });
    // });

    describe('change:status', function() {
      it('calls crossOff', function() {
        task1.set('status', 'Complete');
        expect(Canto.TaskCollectionView.prototype.crossOff).toHaveBeenCalled();
      });
    });
  });

  describe('event callbacks', function() {
    describe('removeBacklog', function() {
      beforeEach(function() { 
        task2.set('backlog', true); 
        view.removeBacklog();
      });

      it('removes the backlogged task', function() {
        expect(view.models).not.toContain(task2);
      });
    });

    describe('removeChildAndRender', function() {
      it('removes the child view from the array', function() {
        var child = childViews[1];
        view.removeChildAndRender(task2);
        expect(view.childViews).not.toContain(child);
      });

      it('calls render', function() {
        spyOn(view, 'render');
        view.removeChildAndRender(task2);
        expect(view.render).toHaveBeenCalled();
      });
    });

    describe('removeChildViews', function() {
      beforeEach(function() { 
        view.childViews = childViews; 
        view.render();
      });

      it('calls remove on the child views', function() {
        spyOn(view.childViews[2], 'remove');
        view.removeChildViews(); 
        expect(view.childViews[2].remove).toHaveBeenCalled();
      });

      it('calls unbind on the child views', function() {
        spyOn(view.childViews[1], 'unbind');
        view.removeChildViews();
        expect(view.childViews[1].unbind).toHaveBeenCalled();
      });
    });

    describe('removeComplete', function() {
      beforeEach(function() {
        view.childViews = childViews;
        task1.set('status', 'Complete');
        view.removeComplete();
      });

      it('removes the completed task', function() {
        expect(view.models).not.toContain(task1);
      });
    });

    describe('renderCollection', function() {
      it('renders the collection', function() {
        view.renderCollection();
        expect(view.$('li.task-list-item')).toHaveLength(3);
      });
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with the argument TaskCollectionView', function() {
        expect(view.isA('TaskCollectionView')).toBe(true);
      });

      it('returns true with the argument TaskView', function() {
        expect(view.isA('TaskView')).toBe(true);
      });

      it('returns false with other arguments', function() {
        expect(view.isA('deposed Nigerian warlord')).toBe(false);
      });
    });

    describe('retrieveViewForModel', function() {
      context('when there is no view for the model', function() {
        beforeEach(function() { view.childViews = []; });

        it('returns null', function() {
          expect(view.retrieveViewForModel(task1)).toBe(null);
        });
      });

      context('when there is a view for the model', function() {
        beforeEach(function() { view.childViews = childViews; });

        it('returns the appropriate view', function() {
          expect((view.retrieveViewForModel(task1)).klass).toEqual('TaskListItemView');
        });
      });
    });
  });

  describe('core view functions', function() {
    describe('render', function() {
      it('renders the quick-add form', function() {
        spyOn(view.quickAddForm, 'render');
        view.render();
        expect(view.quickAddForm.render).toHaveBeenCalled();
      });

      it('renders the list items', function() {
        spyOn(view, 'renderCollection');
        view.render();
        expect(view.renderCollection).toHaveBeenCalled();
      });

      // FIX: I don't know if this test was vestigial or what, but I'm going
      //      to hang onto its shell while I investigate.

      // it('configures sortable', function() {
      //  
      // });

      fdescribe('idempotency', function() {
        beforeEach(function() { 
          view.childViews = childViews;
          view.render(); 
        });

        it('maintains the length of the list', function() {
          view.render(); // render a second time
          expect(view.$('.task-list-item').length).toEqual(3);
        });

        it('maintains the length of the child view array', function() {
          view.render();
          expect(view.childViews.length).toEqual(3);
        });
      });
    });

    describe('remove', function() {
      beforeEach(function() { view.render(); });

      it('calls removeChildViews', function() {
        spyOn(view, 'removeChildViews');
        view.remove();
        expect(view.removeChildViews).toHaveBeenCalled();
      });

      it('removes itself', function() {
        spyOn(Canto.View.prototype.remove, 'call');
        view.remove();
        expect(Backbone.View.prototype.remove.call).toHaveBeenCalledWith(view);
      });
    });
  });
});