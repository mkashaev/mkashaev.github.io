


// $(document).ready(function() {
//   $("#opt1").click(function() {
//     game.removeMenu();
//   });
//   $("td").click(function() {
//     game.loop(this);
//   });
// });

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  var game = new Game()
 
  var opt1 = document.getElementById("opt1")
  console.log(typeof opt1)
  opt1.addEventListener('click', function() {
    game.removeMenu()
  })

  var tdList = document.getElementsByTagName("td")
  for (var i = 0; i < tdList.length; i++) {
    tdList[i].addEventListener('click', function() {
      game.loop(this)
    })
  }
}


function Game() {
  this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  this.iter = 0;
  this.round = 0;
}

Game.prototype.removeMenu = function () {
  $(".options, p").remove();
  $("td, table").css("visibility", "visible");
}

Game.prototype.signBlock = function(sign) {
  return "<div style='font-size: 500%; text-align: center'>"+ sign + "</div>";
}

Game.prototype.reset = function() {
  this.round = 0;
  this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  // var tdList = document.getElementsByTagName()
  $("td").html("");
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
    $(element).html(this.signBlock("X"));
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
    var selector = "#" + index;
    $(selector).html(this.signBlock("O"));
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


// let move = (element, player, sign) => {
//   if (board[element.id] != "P" && board[element.id] != "C") {


//     round++
//     let index = minmax(board, coPlayer).index
//     let selector = "#" + index
//     $(selector).html(signBlock(computerSign))
//     board[index] = coPlayer
    
//     if (winning(board, coPlayer)) {
//       setTimeout(() => {
//         alert("You lose")
//         reset()
//       }, 0)
//       return
//     }

//     if (round === 0) {
//       setTimeout(() => {
//         alert("Tie")
//         reset()
//       }, 0)
//       return
//     }
//   }
// } 

// to make empty field
// let reset = () => {
//   round = 0
//   board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
//   $("td").html("")
// }


// let minmax = (reboard, player) => {
//   iter++
//   let array = available(reboard)
//   if (winning(reboard, huPlayer)) {
//     return {score: -10}
//   }
//   if (winning(reboard, coPlayer)) {
//     return {score: 10}
//   }
//   if (array.length === 0) {
//     return {score: 0}
//   }

//   let moves = []
//   for (let i = 0; i < array.length; i++) {
//     let move = {}
//     move.index = reboard[array[i]]
//     reboard[array[i]] = player

//     if (player == coPlayer) {
//       let g = minmax(reboard, huPlayer)
//       move.score = g.score
//     } else {
//       let g = minmax(reboard, coPlayer)
//       move.score = g.score
//     }
//     reboard[array[i]] = move.index
//     moves.push(move)
//   }

//   let bestMove
//   if (player === coPlayer) {
//     let bestScore = -10000
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score
//         bestMove = i
//       }
//     }
//   } else {
//     let bestScore = 10000
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score
//         bestMove = i
//       }
//     }
//   }
//   return moves[bestMove]
// }
  
// available spots



// let available = (reboard) => {
//   return reboard.filter(s => s !== "P" && s !== "C")
// }


// winning combinations




// let winning = (board, player) => {
//   if (
//     (board[0] == player && board[1] == player && board[2] == player) ||
//     (board[3] == player && board[4] == player && board[5] == player) ||
//     (board[6] == player && board[7] == player && board[8] == player) ||
//     (board[0] == player && board[3] == player && board[6] == player) ||
//     (board[1] == player && board[4] == player && board[7] == player) ||
//     (board[2] == player && board[5] == player && board[8] == player) ||
//     (board[0] == player && board[4] == player && board[8] == player) ||
//     (board[2] == player && board[4] == player && board[6] == player)
//   ) return true
//   return false
// }