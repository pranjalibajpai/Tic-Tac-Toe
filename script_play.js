
const p1_symb = 'O';
const p2_symb = 'X';
var initboard;
var current_player = p1_symb;

function toggle_player(){
	current_player = current_player === p1_symb ? p2_symb : p1_symb;
	return current_player;
}
 
/*console.log(toggle_player());
console.log(toggle_player());
console.log(toggle_player());
*/

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
console.log(boxes.length);
Play();

function Play()
{
	initboard = Array.from(Array(9).keys());
	console.log(initboard);
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].innerText = '';
		boxes[i].style.opacity = 0.6;
		boxes[i].addEventListener('click', getClickID, false);
	}
}

function getClickID(box){
	//console.log(box.target.id)
	fillbox(box.target.id, current_player);
	
}

function fillbox(boxID, player){
	if(initboard[boxID] != p1_symb && initboard[boxID]!= p2_symb){
	initboard[boxID] = player;
	boxes[boxID].innerText = player;
	toggle_player();
	checkGameWon(initboard, player);
	}
}

function checkGameWon(board, player){
	let plays = board.reduce((a, e, i) =>  (e === player) ? a.concat(i) : a, []);
	//console.log(plays);
	let game_won = null;
	for(let i = 0; i < winCombos.length ; i++){
		win = winCombos[i];
		if(win.every((elem)=> plays.indexOf(elem) > -1)){
			game_won = {index:i, player:player, combo:win};
			console.log(game_won);
			//alert('Player '+player+' won!!')
			display_winner(game_won)
			break;
		}
	}
	return game_won;	
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