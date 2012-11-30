Checkers = new Meteor.Collection("checkers");
if (Meteor.is_client) {
	Template.board.rows = function(){
		var rows = [];
		for(var i=1; i<=8; i++){
			rows.push({rowNum:i})
		}
		return rows;
	}
	Template.row.cells = function(){
		var cells = [];
		for(var i=1; i<=8; i++){
			cells.push({background:(Math.pow(-1,i+this.rowNum)>0)?"whiteCell":"blackCell"});
		}
		return cells;
	}
}
