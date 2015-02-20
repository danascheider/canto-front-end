define([
  'backbone', 
  'models/task',
  'collections/tasks',
  'views/tasks/quick-add-form'
  ], function(Backbone, Task, TaskCollection, QuickAddForm) {
  
  describe('Quick-Add Form View', function() {
    var form, e, server;
    var collection = new TaskCollection();

    beforeEach(function() {
      if(typeof form === 'undefined') { form = new QuickAddForm({collection: collection}); }
    });

    afterEach(function() {
      form.remove();
    });

    describe('constructor', function() {
      it('doesn\'t call render', function() {
        sinon.stub(QuickAddForm.prototype, 'render');
        var newForm = new QuickAddForm({collection: collection});
        QuickAddForm.prototype.render.called.should.be.false;
        QuickAddForm.prototype.render.restore();
      });
    });
  });
});