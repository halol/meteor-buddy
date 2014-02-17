Boards = new Meteor.Collection('boards');


Template.boards.items = function(){
  return Boards.find({},{sort:{'submittedOn':-1}});
};

Template.add_board.events({
  'click .save': function (event, tmpl) {
    var title = tmpl.find('.title').value;
    var content = tmpl.find('.content').value;
    var date = tmpl.find('.date').value;
    console.log('clicked savee');
    var boardId = Boards.insert({
      title: title,
      content: content,
      date: date,
      
    });
    return boardId;
  }
});


Template.boards.events({
  'click .delete': function (event) {
      //todo Boards.remove(boardId);
  }
});




Template.add_inline.events({
  'click .save': function (event, tmpl) {
    var title = tmpl.find('.title').value;
    var content = tmpl.find('.content').value;
    var date = tmpl.find('.date').value;
    console.log('clicked savee');
    Boards.insert({
      'title': title,
      'content': content,
      'date': date,
      'submittedOn': new Date(),
      'submittedBy' : Meteor.userId()
    });
  }
});

Template.add_inline.rendered = function() {
  $('.datepicker').datepicker();
}