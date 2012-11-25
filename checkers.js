if (Meteor.isClient) {
  Template.body.created = function() {
      document.body.appendChild(Template.board());
  };
  Template.board.setCell = [
            {x:20,y:20,fill:"black"},
            {x:50,y:20,fill:"none"}
        ];
}
