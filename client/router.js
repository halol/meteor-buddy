Router.configure({
  layoutTemplate: 'layout',
  before: function() {
    var user = Meteor.user();
    if (! user) {
      this.render(Meteor.loggingIn() ? 'loading' : 'login');
      return this.stop();
    }
  }
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('boards', {
    path: '/',
    template: 'boards'
  });

  this.route('showBoard', {
    path: '/board/:_id',
    data: function(){
        return Boards.findOne(this.params.id, { fields: { _id: 1 }, reactive: false });
    }
  });

  /**
   * The route's name is "posts"
   * The route's path is "/posts"
   * The route's template is inferred to be "posts"


   */

   this.route('page', {
    path: '/page'
  });



});

