Checkers = new Meteor.Collection("checkers");
if (Meteor.is_client) {
    Template.board.rendered = function () {
        appendCell(0,0);
		//appendCheckers();
    };
	Meteor.render(appendCheckers);
    function appendCell(i,j){
        var cell;
        if (i < 8) {
            if (j < 8) {
                cell = createCell.apply({
                    x : (6 + j*50),
                    y : (6 + i*50),
                    fill : ((Math.pow(-1, i+j)>0)?"none":"black")
                });
                $("svg").append(cell);
                appendCell(i,j+1);
            }else{
                j = 0;
                appendCell(i+1,j);
            }
        }
    }
    function createCell() {
        var ns = "http://www.w3.org/2000/svg";
        var cell = document.createElementNS(ns,"rect");
        cell.setAttribute("x",this.x);
        cell.setAttribute("y",this.y);
        cell.setAttribute("width",50);
        cell.setAttribute("height",50);
        cell.setAttribute("fill",this.fill);
        return cell;
    }
	function appendCheckers(){
		var _checkers = Checkers.find({}).fetch();
		for(var i=0; i<_checkers.linght; i++){
			$("svg").append(createChecker.append(_checkers[i]));
		};
	};
	function createChecker(){
		var ns = "http://www.w3.org/2000/svg";
        var checker = document.createElementNS(ns,"circle");
        checker.setAttribute("cx",31+this.v*50);
		checker.setAttribute("cy",31+this.h*50);
		checker.setAttribute("r",40);
		checker.setAttribute("fill",this.color);
		return checker;
	}
	/*function insertCheckrs () {
		for(var i=0; i<24; i++){
			Checkers.insert({
				v : (i==0)?0:
					(i==8)?
			});
		}
	}*/
}
