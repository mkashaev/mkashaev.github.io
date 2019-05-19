


$(document).ready(function() {
  $("#opt1").click(function() {
    removeMenu()
    computerSign = "O"
    humanSign = "X"
  });
  $("#opt2").click(function() {
    removeMenu()
  });

  $("td").click(function() {
    move(this, huPlayer, humanSign);
  });
});

  
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let huPlayer = "P";
let coPlayer = "C";
let iter = 0;
let round = 0;

let computerSign = "X"
let humanSign = "O"


let removeMenu = () => {
  $(".options, p").remove()
  $("td, table").css("visibility", "visible");
}

let signBlock = (sign) => {
  return `<div style='font-size: 500%; text-align: center'>${sign}</div>`
}


let move = (element, player, sign) => {
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++
    $(element).html(signBlock(sign))

    board[element.id] = player

    if (winning(board, player)) {
      setTimeout(() => {
        alert("You win")
        reset()
      }, 0)
      return
    }

    if (round > 8) {
      setTimeout(() => {
        alert("Tie")
        reset()
      }, 0)
      return
    }

    round++
    let index = minmax(board, coPlayer).index
    let selector = "#" + index
    $(selector).html(signBlock(computerSign))
    board[index] = coPlayer;
    
    if (winning(board, coPlayer)) {
      setTimeout(() => {
        alert("You lose")
        reset()
      }, 0)
      return
    }

    if (round === 0) {
      setTimeout(() => {
        alert("Tie")
        reset()
      }, 0)
      return
    }
  }
} 

// to make empty field
let reset = () => {
  round = 0
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  $("td").html("")
}


let minmax = (reboard, player) => {
  iter++
  let array = available(reboard)
  if (winning(reboard, huPlayer)) {
    return {score: -10}
  }
  if (winning(reboard, coPlayer)) {
    return {score: 10}
  }
  if (array.length === 0) {
    return {score: 0}
  }

  let moves = []
  for (let i = 0; i < array.length; i++) {
    let move = {}
    move.index = reboard[array[i]]
    reboard[array[i]] = player

    if (player == coPlayer) {
      let g = minmax(reboard, huPlayer);
      move.score = g.score
    } else {
      let g = minmax(reboard, coPlayer);
      move.score = g.score
    }
    reboard[array[i]] = move.index
    moves.push(move)
  }

  let bestMove;
  if (player === coPlayer) {
    let bestScore = -10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove];
}
  
// available spots
let available = (reboard) => {
  return reboard.filter(s => s !== "P" && s !== "C")
}


// winning combinations
let winning = (board, player) => {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) return true
  return false
}