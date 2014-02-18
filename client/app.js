Boards = new Meteor.Collection('boards');
Likes = new Meteor.Collection('likes');
Messages = new Meteor.Collection("Messages");
Meteor.subscribe("directory");
Template.boards.items = function() {
    return Boards.find({}, {
        sort: {
            'submittedOn': -1
        }
    });

    
};





Template.board.events({
    'click .like': function (event, tmpl) {
        var curlike = Likes.findOne({
            muser: Meteor.userId(), 
            board: tmpl.data._id
        });
        //console.log('curlike ' + curlike);
        if(!curlike) {
            Likes.insert({
                muser: Meteor.userId(), 
                board: tmpl.data._id
            })
        }
        
    }
});
Template.boards.events({
    'click .delete': function(event, tmpl) {
        Boards.remove({_id:this._id});
        console.log('delete' + this._id);
    },
    'click .panel-title': function (event, tmpl) {
        console.log('panel title ' + this._id)
    }
    
});
Template.add_inline.events({
    'click .save': function(event, tmpl) {
        var title = tmpl.find('.title').value;
        var content = tmpl.find('.content').value;
        var date = tmpl.find('.date').value;
        
        console.log('clicked savee');
        Boards.insert({
            'title': title,
            'content': content,
            'date': date,
            'submittedOn': new Date(),
            'submittedById': Meteor.userId()
        });
    }
});
Template.add_inline.rendered = function() {
    $('.datetimepicker').datetimepicker();
}


Template.board.numlikes = function() {
    return Likes.find({board: this._id}).count();
}

Template.board.likesthis = function() {
    var doeslike = Likes.findOne({muser:Meteor.userId(), board: this._id});

    if(doeslike) {
        return "you like this";
    }
}
Template.board.ownerName = function() {
    var board =  Boards.findOne({_id: this._id});
    var id = board.submittedById;
    var user = Meteor.users.findOne({_id: id});
    return user.emails[0].address
    //return board.title;
    //return userId;
    //Meteor.users.findOne({_id: this._id}) + " aaa";
}



Handlebars.registerHelper("prettyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});




Template.messages.messages = function() {
    return Messages.find({

    }, {
      sort: {
        timestamp: -1,

      },
      limit: 20
    });
};



Template.input.events({
    'click #send': function(event, tmpl) {
      var message = $('#newMessage').val();
      var username = $('#username').val();
      var boardid = tmpl.data._id;
      if (!message || !username) {
        alert('Fill out both fields yo!');
      }
      Meteor.saveMessage({
        message: message,
        username: username,
        boardid: boardid
      });
    }
});



Meteor.saveMessage = function(content) {
    var username = content.username;
    var message = content.message;
    var boardid = content.boardid;
    if (!username || !message) {
      return;
    }
    Messages.insert({
      username: username,
      message: message,
      boardid: boardid,
      timestamp: Date.now()
    }, function(err, id) {
      if (err) {
        alert('Something definitely went wrong!');
      }
      if (id) {
        $('#newMessage').val('');
        $('#username').val('');
      }
    });
};