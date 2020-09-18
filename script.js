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
		computer=false;
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
	else{
		easy=true;
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
	document.getElementById('player2').className = 'score';
	document.getElementById('player1').className = 'score';
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

function SuggestedMove(){
	
	if(checkGameWon('X', initboard, 1) || checkGameWon('O', initboard, 1) || checkGameDraw(initboard, 1) )
		return;
	
	let min = current_player === p1_symb ? p2_symb : p1_symb;
	let max = current_player === p1_symb ? p1_symb : p2_symb;
	let box_id;
	//if(computer)
	//box_id = minimax_computer(initboard, current_player, 0, min, max).fill_loc;
	//else
		
	
    box_id = minimax_2player(initboard, current_player, 0, min, max).fill_loc;
	boxes[box_id].style.opacity = 1;
	//console.log(box_id);
}
function fillbox(boxID, player){
		//for removing suggested box
		for(let i=0; i<9; i++)
		boxes[i].style.opacity = 0.6;
        initboard[boxID] = player;
        boxes[boxID].innerText = player;

		var check = checkGameWon(initboard, player,false);
		if(!check)
			checkGameDraw(initboard,0);
}


//---------------------------Driver Code-------------------------------

function Play(){
    initboard = Array.from(Array(9).keys());
	change_scoreboard();
	current_player = p1_symb;
	for(let i=0;i<boxes.length;i++){
		boxes[i].removeEventListener('click', getClickIDEasy, false);
		boxes[i].removeEventListener('click', getClickID, false);
	}
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
		//console.log("first one");
		fillbox(computer_corner_move(initboard, easy),computer_player);
	}
	if(!computer)
	display_move();
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
function checkGameDraw(board, check){
	let time_step = 200;
	var draw = true;
	for(let i=0; i<board.length; i++){
		if(board[i] === 'X' || board[i] === 'O');
		else{
			draw = false;
			break;
		}
	}
	if(check)
		return draw;
	
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
		//document.getElementById(elem).style.webkitAnimationName = 'glow' ;
		//document.getElementById(elem).style.webkitAnimationDuration = '2s';
		//console.log('Delay')
		}, i*time_step);
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
		//document.getElementById(elem).style.webkitAnimationName = 'glow' ;
		//document.getElementById(elem).style.webkitAnimationDuration = '2s';
		//console.log('Delay')
		}, i*time_step);
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

function display_move(){
	//console.log("display"+current_player);
	if(current_player === p1_symb){
		document.getElementById('player2').className = 'score';
		document.getElementById('player1').className = 'score-current';
	}
	else{
		document.getElementById('player1').className = 'score';
		document.getElementById('player2').className = 'score-current';
	}
}
function getClickID(box){
	//console.log("on click 2 player");
    fillbox(box.target.id, current_player);
	boxes[box.target.id].removeEventListener('click', getClickID, false);
	toggle_player();
	display_move();
}
function toggle_player(){
    current_player = current_player === p1_symb ? p2_symb : p1_symb;
    return current_player;
}

/*-----------------------------Against Computer-----------------------------*/

function getClickIDEasy(box){
	//console.log("on click human player");
    fillbox(box.target.id, human_player);
	boxes[box.target.id].removeEventListener('click', getClickIDEasy, false);
	if(!checkGameWon(initboard, human_player,true) && empty_loc(initboard).length)
	{
		let boxID = computer_move(initboard, easy);
		//console.log("computer move");
		fillbox(boxID, computer_player);
		boxes[boxID].removeEventListener('click', getClickIDEasy, false);
	}
}
function computer_move(board, easy){
	if(easy){
		return random_move(board);
	}
	else{
		return minimax(initboard, computer_player).fill_loc;
	}
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
	//console.log("Selected---");
	let randomId = Math.floor(Math.random() * empty.length );
	return empty[randomId];
}
function computer_corner_move(board, easy){
	//console.log("HERE");
	if(easy){
		return random_move(board);
	}
	else{
		let corner=[0, 2, 4, 6, 8];
		var cornerID = Math.floor(Math.random()*corner.length);
		return corner[cornerID];
	}
}
// Suggestion for 2 player
function minimax_2player(board, player,depth, minimizer, maximizer){
	
	let empty = empty_loc(board);
	let move = {};
	//check if max can win after 1 move
	for(let i=0; i<empty.length; i++){
		move.fill_loc = board[empty[i]];
		board[empty[i]] = maximizer;
		if(checkGameWon(board, maximizer, true)){
			move.score = 10;
			return move;
		}
		board[empty[i]] = move.fill_loc;
	}
	//check if min can win after 1 move
	move={};
	for(let i=0;i<empty.length; i++){
		move.fill_loc = board[empty[i]];
		board[empty[i]] = minimizer;
		if(checkGameWon(board, minimizer, true)){
			move.score = 10;
			return move;
		}
		board[empty[i]] = move.fill_loc;
	}
	//normal minimax
	return minimax(board, player, 0, minimizer, maximizer);
}
//Suggestion for human against computer
function minimax_computer(board, player,depth, minimizer, maximizer){
	let empty = empty_loc(board);
	var possible_moves = [];
	if(checkGameWon(board, maximizer, true)){
		return {score: 10-depth};
	}
	else if(checkGameWon(board, minimizer, true)){
		return {score: -10+depth};
	}
	else if(empty.length === 0){
		return {score: 0};
	}
	for(let i=0; i<empty.length; i++){
		let move = {};
		move.fill_loc = board[empty[i]];
		board[empty[i]] = player;

		if(player === maximizer){
			let result = minimax_computer(board, maximizer, depth+1, minimizer, maximizer);
			move.score = result.score;
		}
		else if(player === minimizer){
			let result = minimax_computer(board, minimizer,depth+1, minimizer, maximizer);
			move.score = result.score;
		}
		board[empty[i]] = move.fill_loc;
		possible_moves.push(move);
	}
	let best_move = -1;
	if(player === maximizer){
		best_move_score = -1000;
		for(let i=0; i<possible_moves.length; i++){
			if(possible_moves[i].score > best_move_score){
				best_move_score = possible_moves[i].score;
				best_move = i;
			}
		}
	}
	else if(player === minimizer){
		best_move_score = 1000;
		for(let i=0; i<possible_moves.length; i++){
			if(possible_moves[i].score < best_move_score){
				best_move_score = possible_moves[i].score;
				best_move = i;
			}
		}
	}

	return possible_moves[best_move];
}

function minimax(board, player) {
	var empty = empty_loc(board);
	//console.log(empty.length);
	//console.log('Inside');

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
		//console.log(board);

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

	//console.log('Possible moves :')
	//console.log(possible_moves[best_move]);
	return possible_moves[best_move];
}
