if (Meteor.isClient) {
  Template.board.setCell = [
            {x:20,y:20,fill:"black"},
            {x:50,y:20,fill:"none"}
        ];
	Template.board.appendCell = function () {
		var ns = "http://www.w3.org/2000/svg";
		var cell = document.createElementNS(ns,"rect");
		cell.setAttribute("x",this.x);
		cell.setAttribute("y",this.y);
		cell.setAttribute("width",30);
		cell.setAttribute("height",30);
		cell.setAttribute("fill",this.fill);
		$("<svg>").append(cell);
	};
}
