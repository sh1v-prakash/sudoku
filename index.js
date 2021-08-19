window.onload = function () {
  startGame();
};

let start = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
  "71258369463971425884526917352143698736792841549817532618469753225384176997635284-",
];

var result = [];
var new_res = [];

function startGame() {
  let board = start[0];
  display(board);
}

function display(board) {
  for (let itr = 0; itr <= board.length - 1; itr++) {
    var childNode;
    if (board[itr] === "-") {
      childNode = document.createElement("input");
      childNode.maxLength = 1;
      result[itr] = 0;
    } else {
      childNode = document.createElement("div");
      childNode.innerText = board[itr];
      childNode.classList.add("static");
      result[itr] = board[itr];
    }
    var parentNode = document.getElementById(`${itr}`);

    if (parentNode) parentNode.appendChild(childNode);
  }
  console.log(result);
}

function validate() {
  console.log("validate");
  var input = [];

  for (var itr = 0; itr < 81; itr++) {
    {
      if (result[itr] == 0) {
        input = document.getElementById(itr).firstChild.value;
        result[itr] = input;
      }
    }
  }

  while (result.length) new_res.push(result.splice(0, 9));
  console.log(new_res);
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (!isLegal(row, col, new_res[row][col])) {
        document.getElementById("result").innerText = 'Sorry!Try again'
        return;
      }
    }
  }
  document.getElementById("result").innerText = 'You win'
}

function isLegal(row, col, value) {
    console.log(row,col)
  // check row
  for (var i = col; i < 8; i++) {
    console.log(value, new_res[row][i + 1]);
    if (value == new_res[row][i + 1] || new_res[row][i + 1] == "") {
        console.log('false')
      return false;
    }
  }
  console.log("row success");

  // check column
  for (var i = row; i < 8 ; i++) {
    console.log(value, new_res[i + 1][col]);
    if (value == new_res[i + 1][col]) {
        console.log('false')
      return false;
    }
  }
  console.log("col success");

  //check grid 3X3
    var row_offset = Math.floor(row / 3) * 3;
    var col_offset = Math.floor(col / 3) * 3;
    for (var i = row_offset; i <= 2 + row_offset; i ++) {
      for (var j = col_offset; j <= 2 + col_offset; j++) {
          if(i==row&&j==col)
            continue;
        console.log(value, new_res[i][j]);
        if (value == new_res[i][j] || new_res[i][j] == "") {
          return false;
        }
      }
    }
  console.log("grid success");
  return true;
}
