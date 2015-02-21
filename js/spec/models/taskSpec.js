define([
  'backbone',
  'models/user',
  'models/task',
  'api',
  'cookie'
], function(Backbone, User, Task, API) {

  describe('Task', function() {
    var sandbox = sinon.sandbox.create();

    afterEach(function() { sandbox.restore(); });

    describe('urlRoot', function() {
      it('is scoped to the logged in user', function() {
        $.cookie('auth', btoa('testuser:testuser'));
        $.cookie('userID', 342);
        var task = new Task();
        task.urlRoot().should.equal(API.base + '/users/342/tasks');
      });
    });

    describe('constructor', function() {
      it('calls the validation function', function() {
        var task = new Task();
        sandbox.stub(task, 'validate');
        task.save();
        task.validate.calledOnce.should.be.true;
      });

      it('does not save the task automatically', function() {
        sandbox.spy(Backbone.Model.prototype, 'sync');
        var task = new Task({title: 'Take out the trash'});
        Backbone.Model.prototype.sync.called.should.be.false;
      });
    });

    describe('validations', function() {
      it('is invalid without a title', function() {
        var task = new Task();
        task.save().should.be.false;
      });

      it('is valid with a title', function() {
        var task = new Task({title: 'Take out the trash'});
        task.save().should.beTruthy;
      });
    });

    describe('complete() function', function() {
      it('is false for an incomplete task', function() {
        var task = new Task({title: 'Take out the trash', status: 'In Progress'});
        task.complete().should.be.false;
      });

      it('is true for a complete task', function() {
        var task = new Task({title: 'Take out the trash', status: 'Complete'});
        task.complete().should.be.true;
      });
    });

    describe('save() function', function() {
      beforeEach(function() {
        $.cookie('auth', btoa('testuser:testuser'));
        $.cookie('userID', 342);
      });

      afterEach(function() {
        $.removeCookie('auth');
        $.removeCookie('userID');
      });

      it('sends the request to the right endpoint', function() {
        var server = sandbox.useFakeServer();
        var task = new Task({title: 'Take out the trash'});
        task.save();
        server.requests[0].url.should.equal(API.base + '/users/342/tasks');
      });
    });

    describe('displayTitle() function', function() {
      it('leaves a short title as-is', function() {
        var task = new Task({title: 'Take out the trash'});
        task.displayTitle().should.equal('Take out the trash');
      });

      it('truncates a long title with an ellipsis', function() {
        var task = new Task({title: 'Find out how much wood a woodchuck would chuck if a woodchuck could chuck wood'});
        task.displayTitle().should.equal('Find out how much wood a woodchuck would chuck if a ...');
      });
    });

    describe('fetch() function', function() {
      var auth = 'Basic ' + btoa('testuser:testuser');
      var task = new Task({id: 114, title: 'Take out the trash'});

      beforeEach(function() {
        $.cookie('auth', btoa('testuser:testuser'));
        $.cookie('userID', 342);
      });

      afterEach(function() {
        $.removeCookie('auth');
        $.removeCookie('userID');
      });

      it('makes the request to the individual task endpoint', function() {
        var server = sandbox.useFakeServer(); 
        task.fetch();
        server.requests[0].url.should.equal(API.base + '/tasks/114');
      });

      it('includes the correct authorization header', function() {
        var server = sandbox.useFakeServer(); 
        task.fetch();
        server.requests[0].requestHeaders.Authorization.should.equal(auth);
      });
    });

    describe('incomplete() function', function() {
      it('returns true for incomplete tasks', function() {
        var task = new Task({title: 'Take out the trash', status: 'New'});
        task.incomplete().should.be.true;
      });

      it('returns false for completed tasks', function() {
        var task = new Task({title: 'Take out the trash', status: 'Complete'});
        task.incomplete().should.be.false;
      });
    });

    describe('prettyDeadline() function', function() {
      var task = new Task({title: 'Take out the trash', deadline: new Date('2014-11-10 00:00:00 -0800')});
      task.prettyDeadline().should.equal('Monday, November 10, 2014');
    });
  });
});