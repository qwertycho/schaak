const board = document.getElementById("boardContainer");

const WIDTH = 8;
const HEIGHT = 8;
const ASCII_START = 97;

for(let y = 0; y < HEIGHT; y++){
  for(let x = 0; x < WIDTH; x++){
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = `tile-${x}:${y}`;
    tile.classList.add(getColor(x, y));
    tile.addEventListener("click", select);
    tile.innerHTML = `${String.fromCharCode(ASCII_START + x)} : ${y + 1} `
    board.appendChild(tile);
  }
}
function getColor(x, y){
  let index = x + y;
  if(index % 2 == 0){
    return "bg-light";
  }
  return "bg-secondary";
}

function select(event){
  console.log(event.target.id)
  let x = Number(event.target.id.substring(5, 6));
  let y = Number(event.target.id.substring(7, 8));
  simServer(convertToIndex(x, y));
}
function convertToXY(index){
  let y = Math.floor(index / WIDTH);
  let x = index % WIDTH;
  return [x, y];
}

function convertToIndex(x, y){
  let index = y * WIDTH;
  index += x;
  return index;
}

function makeMove(start, end){
  start = convertToXY(start);
  end = convertToXY(end);
  let startStyle = document.getElementById(`tile-${start[0]}:${start[1]}`).style.backgroundImage;
  document.getElementById(`tile-${start[0]}:${start[1]}`).style.backgroundImage = "";
  document.getElementById(`tile-${end[0]}:${end[1]}`).style.backgroundImage = startStyle;
}

let move1 = null;
let move2 = null;
function simServer(index){
  if(move1 == null){
    move1 = index;
  } else if(move2 == null){
    move2 = index;
  } else{
    move1 = null;
    move2 = null;
    simServer(index);
  }
  if(move1 != null && move2 != null){
    makeMove(move1, move2);
  }
}

const chessPieces = {

  "K": {
    wImage: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
    bImage: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
  },
  "Q": {
    wImage: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
    bImage: "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
  },
  "R": {
    wImage: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
    bImage: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
  },
  "N": {
    wImage: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
    bImage: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
  },
  "B": {
    wImage: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
    bImage: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
  },
  "P": {
    wImage: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
    bImage: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
  }

}


function loadBlack(){
  for(let x = 0; x < WIDTH; x++){
    document.getElementById(`tile-${x}:1`).style.backgroundImage = `url(${chessPieces["P"].bImage})`;
  }
   document.getElementById(`tile-0:0`).style.backgroundImage = `url(${chessPieces["R"].bImage})`;``
   document.getElementById(`tile-7:0`).style.backgroundImage = `url(${chessPieces["R"].bImage})`;``
   document.getElementById(`tile-1:0`).style.backgroundImage = `url(${chessPieces["N"].bImage})`;``
   document.getElementById(`tile-6:0`).style.backgroundImage = `url(${chessPieces["N"].bImage})`;``
   document.getElementById(`tile-2:0`).style.backgroundImage = `url(${chessPieces["B"].bImage})`;``
   document.getElementById(`tile-5:0`).style.backgroundImage = `url(${chessPieces["B"].bImage})`;``
   document.getElementById(`tile-3:0`).style.backgroundImage = `url(${chessPieces["K"].bImage})`;``
   document.getElementById(`tile-4:0`).style.backgroundImage = `url(${chessPieces["Q"].bImage})`;``
}

function loadWhite(){
  for(let x = 0; x < WIDTH; x++){
    document.getElementById(`tile-${x}:6`).style.backgroundImage = `url(${chessPieces["P"].wImage})`;
  }
   document.getElementById(`tile-0:7`).style.backgroundImage = `url(${chessPieces["R"].wImage})`;``
   document.getElementById(`tile-7:7`).style.backgroundImage = `url(${chessPieces["R"].wImage})`;``
   document.getElementById(`tile-1:7`).style.backgroundImage = `url(${chessPieces["N"].wImage})`;``
   document.getElementById(`tile-6:7`).style.backgroundImage = `url(${chessPieces["N"].wImage})`;``
   document.getElementById(`tile-2:7`).style.backgroundImage = `url(${chessPieces["B"].wImage})`;``
   document.getElementById(`tile-5:7`).style.backgroundImage = `url(${chessPieces["B"].wImage})`;``
   document.getElementById(`tile-3:7`).style.backgroundImage = `url(${chessPieces["K"].wImage})`;``
   document.getElementById(`tile-4:7`).style.backgroundImage = `url(${chessPieces["Q"].wImage})`;``
}

function loadBoard(){
  loadWhite();
  loadBlack();
}

loadBoard();
