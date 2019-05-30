function Game() {
  this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  this.iter = 0;
  this.round = 0;
}

Game.prototype.removeMenu = function () {
  // $(".options, p").remove();
  var options = document.getElementsByClassName("options");
  options[0].parentNode.removeChild(options[0]);
  var pList = document.getElementsByTagName("p");
  pList[0].parentNode.removeChild(pList[0]);
  
  // $("td, table").css("visibility", "visible");
  var tdList = document.getElementsByTagName("td");
  for (var i = 0; i < tdList.length; i++) {
    tdList[i].style.visibility = "visible";
  }
  var table = document.getElementsByTagName("table");
  table[0].style.visibility = "visible";
}

Game.prototype.signBlock = function(sign) {
  return "<div style='font-size: 500%; text-align: center'>"+ sign + "</div>";
}

Game.prototype.reset = function() {
  this.round = 0;
  this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  
  // $("td").html("");
  var tdList = document.getElementsByTagName("td");
  for (var i = 0; i < tdList.length; i++) {
    tdList[i].innerHTML = ""
  }
}

Game.prototype.availabe = function() {
  return this.board.filter(function(s) {
    return s !== "X" && s !== "O";
  })
}

Game.prototype.winning = function(player) {
  if (
    (this.board[0] == player && this.board[1] == player && this.board[2] == player) ||
    (this.board[3] == player && this.board[4] == player && this.board[5] == player) ||
    (this.board[6] == player && this.board[7] == player && this.board[8] == player) ||
    (this.board[0] == player && this.board[3] == player && this.board[6] == player) ||
    (this.board[1] == player && this.board[4] == player && this.board[7] == player) ||
    (this.board[2] == player && this.board[5] == player && this.board[8] == player) ||
    (this.board[0] == player && this.board[4] == player && this.board[8] == player) ||
    (this.board[2] == player && this.board[4] == player && this.board[6] == player)
  ) return true;
  return false;
}

Game.prototype.randomMove = function() {
  var clearCells = this.board.filter(function(elem){
    return typeof elem === "number";
  })
  return clearCells[Math.floor(Math.random() + clearCells.length-1)];
}


Game.prototype.loop = function(element) {
  if (this.board[element.id] !== "X" && this.board[element.id] !== "O") {
    this.round++;
    
    // $(element).html(this.signBlock("X"));
    element.innerHTML = this.signBlock("X")
    
    this.board[element.id] = "X";

    

    var _this = this;
    if (this.winning("X")) {
      setTimeout(function() {
        alert("You win");
        _this.reset();
      }, 0);
      return;
    }

    if (this.round > 8) {
      setTimeout(function() {
        alert("Tie");
        _this.reset();
      }, 0);
      return;
    }

    this.round++;
    var index = this.randomMove();
    
    // var selector = "#" + index;
    // $(selector).html(this.signBlock("O"));
    var elem = document.getElementById(index);
    elem.innerHTML = this.signBlock("O");
    
    this.board[index] = "O";

    if (this.winning("O")) {
      setTimeout(function() {
        alert("You lose");
        _this.reset();
      }, 0);
      return;
    }
  }
}

module.exports = Game