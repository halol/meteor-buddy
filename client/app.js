Boards = new Meteor.Collection('boards');


Template.boards.items = function(){
  return Boards.find({});
};

Template.add_board.events({
  'click .save': function (event, tmpl) {
    var title = tmpl.find('.title').value;
    var content = tmpl.find('.content').value;
    console.log('clicked savee');
    Boards.insert({
      'title': title,
      'content': content
    });
  }
});