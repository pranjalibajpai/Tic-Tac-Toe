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
		document.getElementById("choose_opponent").style.display = 'none';
		document.getElementById("choose_starting_player_comp").style.display = 'block';
    }
    else{
	document.getElementById("choose_opponent").style.display = 'none';
    document.getElementById("choose_starting_player").style.display = 'block';
	}
}

function ChooseStartingPlayer(player1){
	if(!computer){
		if(!player1){
		p1_symb = 'O';
		p2_symb = 'X';
		}
		else{
		p1_symb = 'X';
		p2_symb = 'O';	
		}
		document.getElementById("choose_starting_player").style.display = 'none';
		document.getElementById("start_button").style.display = 'block';
	}
	else{
		p1_symb = 'X';	//assuming computer
		p2_symb = 'O';
		if(!player1)
		{			
			current_player = 'X';
		}
		else{
			current_player = 'O';
		}
		document.getElementById("choose_starting_player_comp").style.display = 'none';
		document.getElementById("choose_symbol").style.display = 'block';
	}
	
}
function ChooseSymbol(symbol){
    if(current_player == 'X')	//first is comp
    {
        if(!symbol)
		{
			p1_symb = 'X';
			p2_symb = 'O';
		}
		else 
		{
			p1_symb = 'O';
			p2_symb = 'X';
		}
		human_player=p2_symb;
		computer_player=p1_symb;
		
    }
	else
	{
		if(!symbol)
		{
			p1_symb = 'O';
			p2_symb = 'X';
		}
		else 
		{
			p1_symb = 'X';
			p2_symb = 'O';
		}
		human_player=p1_symb;
		computer_player=p2_symb;
	}
	current_player = p1_symb;
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

function StartGame(){
	document.getElementById("start_button").style.display = 'none';
    document.getElementById("welcome").style.display = 'none';
    document.getElementsByClassName("start_menu")[0].style.display = 'none';
    document.getElementsByClassName("start_playing")[0].style.display = 'block';
	Play();
	
}
function change_scoreboard(){
	if(computer)
	{
		document.getElementById("player1").innerText = 'Player';
		document.getElementById("player2").innerText = 'Computer';
	}
	else{
		document.getElementById("player1").innerText = 'Player 1';
		document.getElementById("player2").innerText = 'Player 2';
	}
	
}

function Update(){
	p1_score=0;
	p2_score=0;
	tie=0;
	document.getElementById("p1").innerText= p1_score;
	document.getElementById("tie").innerText = tie;
	document.getElementById("p2").innerText = p2_score;
}

function Back(){
	Update();
	document.getElementById("message").style.display = 'none';
    document.getElementsByClassName("start_menu")[0].style.display = 'block';
    document.getElementById("welcome").style.display = 'block';
    document.getElementById("choose_opponent").style.display = 'block';
    document.getElementsByClassName("start_playing")[0].style.display = 'none';
}
function Reset(){
	Play();
	document.getElementById("message").style.display = 'none';
}

function fillbox(boxID, player){
        initboard[boxID] = player;
        boxes[boxID].innerText = player;
		
		var check = checkGameWon(initboard, player,false);
		if(!check)
			checkGameDraw(initboard);
}


//---------------------------Driver Code-------------------------------


function Play(){
    initboard = Array.from(Array(9).keys());
	change_scoreboard();
	current_player = p1_symb;
    for(let i=0;i<boxes.length;i++){
        boxes[i].innerText = '';
        boxes[i].style.opacity = 0.6;
        if(computer)
			boxes[i].addEventListener('click', getClickIDEasy, false);
		else
			boxes[i].addEventListener('click', getClickID, false);
    }
	if(computer && computer_player == p1_symb)
	{
		fillbox(computer_move(initboard, easy),computer_player);
	}
}
/*---------------------------Check Game Won/Draw-----------------------------*/

function checkGameWon(board, player, check){
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
            
			if(check)							//only checks no display
				return true;
			
			else{
			if(computer)
				display_winner_comp(game_won);
			else
				display_winner(game_won);;
			return true;
			}
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
		document.getElementById("message").innerText = "Ugh !  It's a draw...";
	}
}

/*----------------------------Displaying winner------------------------------*/

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
		document.getElementById(elem).style.webkitAnimationName = 'glow' ;
		document.getElementById(elem).style.webkitAnimationDuration = '2s';
		console.log('Delay')}, i*time_step);
	}
	
	document.getElementById("message").style.display = 'block';
	if(game_won.player === p1_symb)
		document.getElementById("message").innerText = "Hurray !  Player 1  won...";
	else
		document.getElementById("message").innerText = "Hurray !  Player 2  won...";
	
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('click', getClickID, false);
	}
}

function display_winner_comp(game_won){
    let elem;
	let time_step = 200;
	if(human_player === game_won.player)
	p1_score++;
	else {
		p2_score++;
	}
	document.getElementById("p1").innerText= p1_score;
	document.getElementById("p2").innerText = p2_score;
	for( let i = 0; i < game_won.combo.length; i++ ){
		setTimeout(() => {elem = game_won.combo[i];
		document.getElementById(elem).style.opacity = 1;
		document.getElementById(elem).style.webkitAnimationName = 'glow' ;
		document.getElementById(elem).style.webkitAnimationDuration = '2s';
		console.log('Delay')}, i*time_step);
	}
	document.getElementById("message").style.display = 'block';
	if(game_won.player === human_player)
	document.getElementById("message").innerText = "Hurray !  You Won...";
	else
	document.getElementById("message").innerText = "Bad luck !  You Lose...";
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('click', getClickIDEasy, false);
	}
}

/*----------------------------Two-Player-------------------------------------*/

function getClickID(box){
    fillbox(box.target.id, current_player);
	boxes[box.target.id].removeEventListener('click', getClickID, false);
	toggle_player();
}

function toggle_player(){
    current_player = current_player === p1_symb ? p2_symb : p1_symb;
    return current_player;
}


/*-----------------------------Against Computer-----------------------------*/

function getClickIDEasy(box){
    fillbox(box.target.id, human_player);
	boxes[box.target.id].removeEventListener('click', getClickIDEasy, false);
	if(!checkGameWon(initboard, human_player,true) && empty_loc(initboard).length)
	{
		let boxID = computer_move(initboard, easy);
		fillbox(boxID, computer_player);
		boxes[boxID].removeEventListener('click', getClickIDEasy, false);	
	}
}

function computer_move(board, easy){
	if(easy){
		return random_move(board);
	}	
	return minimax(initboard, computer_player).fill_loc;
}

function empty_loc(board){
	let empty=[];
	//console.log("Empty cells");
	for(let i=0;i<boxes.length; i++){
		if(board[i] !== 'X' && board[i] !== 'O'){
			empty.push(i);
			//console.log(i);
			
		}
	}
	return empty;
}

function random_move(board){
	empty  = empty_loc(board);
	console.log("Selected---");
	let randomId = Math.floor(Math.random() * empty.length );	
	return empty[randomId];		
}

function minimax(board, player) {
	var empty = empty_loc(board);
	console.log(empty.length);
	console.log('Inside');

	if (checkGameWon(board, human_player,true)) {
		return {score: -1};
	} 
	else if (checkGameWon(board, computer_player,true)) {
		return {score: 1};
	} 
	else if (empty.length === 0 ) {
		return {score: 0};
	}
	
	var possible_moves = [];
	for (let i = 0; i < empty.length; i++) {
		var move = {};	//object type
		move.fill_loc = board[empty[i]];
		board[empty[i]] = player;	//assuming 
		console.log(board);
		
		if (player == computer_player) {
			let result = minimax(board, human_player);
			move.score = result.score;
		} 
		else {
			let result = minimax(board, computer_player);
			move.score = result.score;
		}

		board[empty[i]] = move.fill_loc;	// clearing assumption
		possible_moves.push(move);
	}

	let best_move = -1;
	if(player === computer_player) {
	best_move_score = -100;
		for(let i = 0; i < possible_moves.length; i++) {
			if (possible_moves[i].score > best_move_score) {
				best_move_score = possible_moves[i].score;
				best_move = i ;
			}
		}
	}
	else {
	best_move_score = 100;
		for(let i = 0; i < possible_moves.length; i++) {
			if (possible_moves[i].score < best_move_score) {
				best_move_score = possible_moves[i].score;
				best_move = i ;
			}
		}
	}
	
	
	
	console.log('Possible moves :')
	console.log(possible_moves[best_move]);
	return possible_moves[best_move];
}



