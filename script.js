var p1_score=0;
var p2_score=0;
var computer=false;
var p1_symb='X';
var p2_symb='O';
var current_player='X';
var cross=false;
var easy=true;
var game_start=false;
var tie=0;
var initboard;
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const boxes = document.querySelectorAll('.box');
//Assuming if player chooses computer as opponent,computer will always be the second player.

function ChoosePlayer(player){
    if(!player){
        computer=true;
    }
    document.getElementById("choose_opponent").style.display = 'none';
    document.getElementById("choose_symbol").style.display = 'block';
}
function ChooseSymbol(symbol){
    if(!symbol)
    {
        p1_symb='O';
        p2_symb='X';
    }
    document.getElementById("choose_symbol").style.display = 'none';
    document.getElementById("choose_level").style.display = 'block';
}
function ChooseLevel(level){
    if(!level){
        easy=false;
    }
    document.getElementById("choose_level").style.display = 'none';
    document.getElementById("start_button").style.display = 'block';
}
Play();
function Play(){
    initboard = Array.from(Array(9).keys());
    for(let i=0;i<boxes.length;i++){
        boxes[i].innerText = '';
        boxes[i].style.opacity = 0.6;
        boxes[i].addEventListener('click', getClickID, false);
    }
}
function toggle_player(){
    current_player = current_player === p1_symb ? p2_symb : p1_symb;
    return current_player;
}
function display_winner(game_won){
    let elem;
	let time_step = 200;
	for( let i = 0; i < game_won.combo.length; i++ ){

		setTimeout(() => {elem = game_won.combo[i];
		document.getElementById(elem).style.opacity = 1;
		document.getElementById(elem).style.webkitAnimationName = 'glow' ;
		document.getElementById(elem).style.webkitAnimationDuration = '2s';
		console.log('Delay')}, i*time_step);
	}
	setTimeout(() => {alert('Player '+game_won.player+' won!!');}, time_step*4);
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('click', getClickID, false);
	}
}
function checkGameWon(board, player){
    let result = [];
    for(let i=0; i<boxes.length; i++){
        var item = board[i];
        if(item === player){
            result = result.concat(i);
        }
    }
    let game_won = null;
    for(let i=0; i<winCombos.length; i++){
        win = winCombos[i];
        if(win.every((elem)=> result.indexOf(elem) > -1)){
            game_won = {index:i, player:player, combo:win};
            display_winner(game_won);
        }
    }
}

function fillbox(boxID, player){
    if(initboard[boxID] != p1_symb && initboard[boxID] != p2_symb){
        initboard[boxID] = player;
        boxes[boxID].innerText = player;
        toggle_player();
        checkGameWon(initboard, player);
    }
}
function getClickID(box){
    fillbox(box.target.id, current_player);
}
function StartGame(){
    game_start=true;
	document.getElementById("start_button").style.display = 'none';
    document.getElementById("welcome").style.display = 'none';
    document.getElementsByClassName("start_menu")[0].style.display = 'none';
    document.getElementsByClassName("start_playing")[0].style.display = 'block';

}
function Back(){
    document.getElementsByClassName("start_menu")[0].style.display = 'block';
    document.getElementById("welcome").style.display = 'block';
    document.getElementById("choose_opponent").style.display = 'block';
    document.getElementsByClassName("start_playing")[0].style.display = 'none';
}
