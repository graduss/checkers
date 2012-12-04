Checkers = new Meteor.Collection("checkers");
if (Meteor.is_client) {
	Template.board.rows = function(){
		var rows = [];
		for(var i=1; i<=8; i++){
			rows.push({rowNum:i})
		}
		return rows;
	};
	Template.row.cells = function(){
		var check = Checkers.find({}).fetch();
		var cells = [];
		for(var i=1; i<=8; i++){
			cells.push({background: (Math.pow(-1,i+this.rowNum)>0)?"whiteCell":"blackCell",
						check: seachChecker(this.rowNum,i,check)});
		}
		return cells;
	};
        Template.checker.select = function(){
            return Session.equals("select",this._id)?"border: 1px solid coral;":"";
        };
        Template.checker.events = {
            "mousedown" : function(){
                Session.set("select", this._id);
            },
            "mouseup" : function(){
                Session.set("select", null);
            }
        };
	function seachChecker(v,h,checkers){
		for(var i=0; i<checkers.length; i++){
			if(checkers[i].v == v && checkers[i].h == h) return checkers[i];
		}
		return null;
	};
}
