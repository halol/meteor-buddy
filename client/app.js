Boards = new Meteor.Collection('boards');
Meteor.subscribe('boards');



if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to meteor-buddy-app.";
  };
  
  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Boards.insert({name: "Board 1"});
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
