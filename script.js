var p1_score=0;
var p2_score=0;
var computer=false;
var p1_symb='X';
var p2_symb='O';
var current_player='X';
var human_player='X';
var computer_player='O';
var cross=false;
var easy=true;
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
	human_player=p1_symb;
	computer_player=p2_symb;
    document.getElementById("choose_symbol").style.display = 'none';
	if(computer){
		document.getElementById("choose_starting_player_comp").style.display = 'block';
	}
	else{
		document.getElementById("choose_starting_player").style.display = 'block';
	}
}
function ChooseStartingPlayer(player1){
	if(!player1){
		p1_symb= p1_symb === 'X' ? 'O' : 'X';
		p2_symb= p2_symb === 'O' ? 'X' : 'O';
		human_player=p2_symb;
		computer_player=p1_symb;
	}
	if(computer){
		document.getElementById("choose_starting_player_comp").style.display = 'none';
		document.getElementById("choose_level").style.display = 'block';
	}
	else{
		document.getElementById("choose_starting_player").style.display = 'none';
		document.getElementById("choose_level").style.display = 'none';
		document.getElementById("start_button").style.display = 'block';
	}
}
function ChooseLevel(level){
    if(!level){
        easy=false;
    }
    document.getElementById("choose_level").style.display = 'none';
    document.getElementById("start_button").style.display = 'block';
}
function StartGame(){
	document.getElementById("start_button").style.display = 'none';
    document.getElementById("welcome").style.display = 'none';
    document.getElementsByClassName("start_menu")[0].style.display = 'none';
    document.getElementsByClassName("start_playing")[0].style.display = 'block';
	Play();
}
function Play(){
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('click', getClickID, false);
	}
	current_player = p1_symb;
    initboard = Array.from(Array(9).keys());
	if(computer && easy)
	computer_easy_game();
	else if(computer && !easy)
	computer_hard_game();
	else
	two_player_game();
}
function computer_easy_game(){
	console.log("computer easy game");
	for(let i=0;i<boxes.length;i++){
        boxes[i].innerText = '';
        boxes[i].style.opacity = 0.6;
        boxes[i].addEventListener('click', getClickIDEasy, false);
    }
	console.log(human_player);
	//first move by computer if it is starting player
	if(computer_player === p1_symb){
		random_move();
	}
}
function computer_hard_game(){

}
function two_player_game(){
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
function fillbox(boxID, player){
    if(initboard[boxID] != p1_symb && initboard[boxID] != p2_symb){
        initboard[boxID] = player;
        boxes[boxID].innerText = player;
        toggle_player();
		var check = checkGameWon(initboard, player);
		if(!check)
		checkGameDraw(initboard);
    }
}
function getClickID(box){
    fillbox(box.target.id, current_player);
}
function fillboxeasy(boxID){
	if(computer){
		//console.log("HERE");
	    if(initboard[boxID] !== 'X' && initboard[boxID] !== 'O'){
			//humna move
	        initboard[boxID] = human_player;
	        boxes[boxID].innerText = human_player;
			// after human move
			var check = checkGameWon(initboard, human_player);
			if(!check){
				checkGameDraw(initboard);
				random_move();
				var comp_check = checkGameWon(initboard, computer_player);
				if(!comp_check)
				checkGameDraw(initboard);
			}
		}
	}
}
function random_move(){
	if(computer){
		let empty=[];
		//console.log("Empty cells");
		for(let i=0;i<boxes.length; i++){
			if(initboard[i] !== 'X' && initboard[i] !== 'O'){
				//console.log(i);
				empty.push(i);
			}
		}
		//console.log("Selected---");
		var randomId = Math.floor(Math.random() * empty.length );
		var cell = empty[randomId];
		//console.log(cell);
		initboard[cell] = computer_player;
		boxes[cell].innerText = computer_player;
	}
}
function getClickIDEasy(box){
    fillboxeasy(box.target.id, human_player);
}
function display_winner(game_won){
    let elem;
	let time_step = 200;
	if(p1_symb === game_won.player)
	p1_score++;
	else {
		p2_score++;
	}
	document.getElementById("p1").innerText= p1_score;
	document.getElementById("p2").innerText = p2_score;
	for( let i = 0; i < game_won.combo.length; i++ ){
		setTimeout(() => {elem = game_won.combo[i];
		document.getElementById(elem).style.opacity = 1;
		console.log('Delay')}, i*time_step);
	}
	document.getElementById("message").style.display = 'block';
	if(computer){
			if(game_won.player === human_player)
			document.getElementById("message").innerText = "You won...";
			else
			document.getElementById("message").innerText = "You lost...";
	}
	else{
		if(game_won.player === p1_symb)
		document.getElementById("message").innerText = "Hurray !  Player 1  won...";
		else
		document.getElementById("message").innerText = "Hurray !  Player 2  won...";
	}
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
			return true;
        }
    }
	return false;
}
function checkGameDraw(board){
	let time_step = 200;
	var draw = true;
	for(let i=0; i<board.length; i++){
		if(board[i] === 'X' || board[i] === 'O');
		else{
			draw = false;
			break;
		}
	}
	if(draw){
		tie++;
		document.getElementById("tie").innerText = tie;
		document.getElementById("message").style.display = 'block';
		document.getElementById("message").innerText = "Ugh !  It was a draw...";
		for (let i = 0; i < boxes.length; i++) {
			boxes[i].removeEventListener('click', getClickID, false);
		}
	}
}
function Update(){
	computer=false;
	p1_score=0;
	p2_score=0;
	tie=0;
	p1_symb='X';
	p2_symb='O';
	human_player='X';
	computer_player='O';
    cross=false;
	easy=true;
	document.getElementById("p1").innerText= p1_score;
	document.getElementById("tie").innerText = tie;
	document.getElementById("p2").innerText = p2_score;
}
function Back(){
	document.getElementById("message").style.display = 'none';
    document.getElementsByClassName("start_menu")[0].style.display = 'block';
    document.getElementById("welcome").style.display = 'block';
    document.getElementById("choose_opponent").style.display = 'block';
    document.getElementsByClassName("start_playing")[0].style.display = 'none';
	Update();
	Play();
}
function Reset(){
	Play();
	current_player = p1_symb;
	document.getElementById("message").style.display = 'none';
}
