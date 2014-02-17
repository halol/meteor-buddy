Boards = new Meteor.Collection('boards');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("is server");
  });
}

