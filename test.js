if (Meteor.isClient) {
  Template.board.setCell = function () {
	var j = 0, i = 0;
	var str;
	str = Template.cell({
		x: 20,
		y: 20,
		fill: "none"
	});
	return str;
  }
}