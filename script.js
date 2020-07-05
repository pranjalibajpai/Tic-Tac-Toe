var p1_score=0;
var p2_score=0;
var computer=false;
var p1_symb='X';
var p2_sym='O';
var player=false;
var cross=false;
var level=false;
var game_start=false;
//Assuming if player chooses computer as opponent,computer will always be the second player.

function ChoosePlayer(player){
    if(!player){
        computer=true;
        document.getElementById('opponent-comp').className='active';
		document.getElementById("choose_opponent").style.display = 'block';
		document.getElementById("choose_symbol").style.display = 'block';
    }
    else {
        document.getElementById('opponent-crew').className='active';
		document.getElementById("choose_opponent").style.display = 'none';
		document.getElementById("choose_symbol").style.display = 'block';
    }
}

function ChooseSymbol(cross){
    if(!cross)
    {
        p1_symb='O';
        p2_symb='X';
        document.getElementById('symbol-naught').className='active';
		document.getElementById("choose_symbol").style.display = 'none';
		document.getElementById("choose_level").style.display = 'block';
    }
    else{
        document.getElementById('symbol-cross').className='active';
		document.getElementById("choose_symbol").style.display = 'none';
		document.getElementById("choose_level").style.display = 'block';
    }
}
function ChooseLevel(easy){
    if(easy){
        document.getElementById('level-easy').className='active';
		document.getElementById("choose_level").style.display = 'none';
		document.getElementById("start_game").style.display = 'block';
		
    }
    else{
        document.getElementById('level-hard').className='active';
		document.getElementById("choose_level").style.display = 'none';
		document.getElementById("start_game").style.display = 'block';
		
    }
}
/*function afterchooseplayer()
{
	document.getElementById("choose_opponent").style.display = 'none';
	document.getElementById("choose_symbol").style.display = 'block';
}

function afterchoosesymbol()
{
	document.getElementById("choose_symbol").style.display = 'none';
	document.getElementById("choose_level").style.display = 'block';
}
*/
function StartGame(){
    game_start=true;
	document.getElementById("start_game").style.display = 'none';
	document.getElementById("welcome").style.display = 'none';
	document.getElementById("start_playing").style.display = 'block';
}

function Play(){
	let currentPlayer = "X";
	const boxes = document.getElementsByClassName("box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener("click", function() {
			if (boxes[i].innerHTML.trim() == "" && game_start) {
				boxes[i].innerHTML = currentPlayer;
				currentPlayer = currentPlayer == "X" ? "O" : "X";
			}
		}
	}
		
}
