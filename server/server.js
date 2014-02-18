Boards = new Meteor.Collection('boards');
Likes = new Meteor.Collection('likes');
Messages = new Meteor.Collection("Messages");
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("is server");
  });
}


Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

