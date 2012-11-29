if (Meteor.isClient) {
    Template.board.rendered = function () {
        appendCell(0,0);
    };
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
}
