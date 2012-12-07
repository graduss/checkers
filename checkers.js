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
		var cells = [];
		for(var i=1; i<=8; i++){
			cells.push({background: (Math.pow(-1,i+this.rowNum)>0)?"whiteCell":"blackCell"});
		}
		return cells;
	};
    /*Template.checker.select = function(){
        return Session.equals("select",this._id)?"border: 1px solid coral;":"";
    };*/
        Template.board.showChecker = function(){
            var checkers = Checkers.find({}).fetch();
            var checkersNum = checkers.length;
            if (checkersNum == 0) return {};
            var TableGeometry = getBoardGeometry();
            for (var i=0; i<checkersNum; i++){
                checkers[i].v = TableGeometry.top + Math.round(TableGeometry.height*checkers[i].v/100);
                checkers[i].h = TableGeometry.left + Math.round(TableGeometry.width*checkers[i].h/100);
                checkers[i].w = Math.round(TableGeometry.width*0.9/8);
            }
            return checkers;
        }
        Template.checker.events = {
            "mousedown" : function(event){
				var id = this._id, color = this.color;
				var x0 = event.pageX, y0 = event.pageY;
				var TableGeometry = getBoardGeometry();
				var p0 = $("#"+id).offset();
                $("body").mousemove(function(event){
					var dx = event.pageX-x0, dy = event.pageY-y0;
					Checkers.update(id,{
						color : color,
						v : (p0.top+dy-TableGeometry.top)*100/TableGeometry.height,
						h : (p0.left+dx-TableGeometry.left)*100/TableGeometry.width
					});
					return false;
				});
            },
            "mouseup" : function(){
                $("body").unbind("mousemove");
            }
        };
		Template.refresh.events = {
			"click" : function() {
				Checkers.remove({});
				var i,j, TabeGeometry = getBoardGeometry();
				var step = TabeGeometry.width/8+2;
				for (i=0; i<3; i++){
					for (j=0; j<4; j++){
						Checkers.insert({
							v : step*i*100/TabeGeometry.width,
							h : step*100*((Math.pow(-1,i)<0)?(2*j):(2*j+1))/TabeGeometry.width,
							color : "bleck"
						});
					}
				}
				for (i=5; i<8; i++){
					for (j=0; j<4; j++){
						Checkers.insert({
							v : step*i*100/TabeGeometry.width,
							h : step*100*((Math.pow(-1,i)<0)?(2*j):(2*j+1))/TabeGeometry.width,
							color : "white"
						});
					}
				}
			}
		};
		function getBoardGeometry(){
			var table = $("table");
            var offsetT = table.offset();
			var cell = table.children().eq(0).children().eq(1).children().eq(1);
			var offsetC = cell.offset();
			var width = cell.width()*8;
            var TableGeometry = {
                top : offsetT.top + offsetC.top,
                left : offsetT.left + offsetC.left,
                width : width,
                height : width
            };
			return TableGeometry;
		}
}
