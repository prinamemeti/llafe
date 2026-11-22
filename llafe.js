var height = 6; //guesses
var width =5; //word length

var row = 0;
var column = 0;

var gameOver = false;

const WORDS = [
    "SHAUM", "BEQAR", "BARUT", "KACOJ", "BATAK", "SHKOP", "TRAUP", "THAJK", "THAJR", "PRAJT", "LIBER", "GJELI", "THESI",
    "FAJKE", "KSHAU", "HAZER", "TOMEL", "FSHOJ", "KRAJS", "HAMOM", "DOLLM", "FRAJK", "HUPET", "KUSHT", "RAUSH", "XHOMI", "KOMET", 
    "OMBEL", "TORTE", "HEKER", "LETER", "KASHT", "HAXHI"

];

function getTodaysWord() {
  const start = new Date(2024, 0, 1); 
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayNumber = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return WORDS[dayNumber % WORDS.length];
}

var word = getTodaysWord();

window.onload = function(){
    initialize()
}

function initialize(){
    for(let r = 0; r<height; r++){
        for(let c= 0; c< width; c++){
            let tile = document.createElement("span");
            tile.id=r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = ""
            document.getElementById("board").appendChild(tile);

        }
    }

document.addEventListener("keyup", (e) => {
    if (gameOver) return;
    if("KeyA" <=e.code && e.code <="KeyZ"){
        if (column < width){
            let currentTile = document.getElementById(row.toString()+ "-" + column.toString())
            if(currentTile.innerText == ""){
                currentTile.innerText = e.code[3];
                column = column + 1;
            }
        }
    }
    else if (e.code == "Backspace"){
        if(0<column && column <= width){
            column = column -1;
        }
        let currentTile = document.getElementById(row.toString()+ "-" + column.toString())
        currentTile.innerText=""; 
    }
    else if (e.code == "Enter"){
        update();
        // row = row + 1;
        // column = 0
    }

    if(!gameOver && row == height){
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }

})

}

function update(){
    let guess = "";
    document.getElementById("answer").innerText = "";
    for (let c=0; c<width; c++){
        let currentTile = document.getElementById(row.toString()+ "-" + c.toString());
        let letter = currentTile.innerText;
        guess += letter;
    }

    if (!WORDS.includes(guess)){
        document.getElementById("answer").innerText = "Not a valid guess";
        return;
    }

    let correct = 0;
    let letterCount = {};
    for (let i=0; i<word.length; i++) {
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }
    for (let c=0; c< width; c++){
        let currentTile = document.getElementById(row.toString()+ "-" + c.toString());
        let letter = currentTile.innerText;
        if (word[c] == letter){
            currentTile.classList.add("correct");
            correct = correct + 1;
            letterCount[letter] -= 1;
        }
        if (correct == width){
            gameOver = true;
        }
    }
 //check wrong positions
    for (let c=0; c< width; c++){
        let currentTile = document.getElementById(row.toString()+ "-" + c.toString());
        let letter = currentTile.innerText;

        if (!currentTile.classList.contains("correct")) {
            if (word.includes(letter) && letterCount[letter] > 0) {
                currentTile.classList.add("present");
                letterCount[letter] -= 1;
            } else {
                currentTile.classList.add("absent");
            }
        }
    }


    row = row + 1;
    column = 0
}