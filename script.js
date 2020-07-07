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
console.log("Hello world");
function ChoosePlayer(player){
    if(!player){
        computer=true;
        document.getElementById('opponent-comp').className='active';
		document.getElementById("choose_opponent").style.display = 'none';
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
		document.getElementById("start-game").style.display = 'block';
		console.log("Easy Level chosen");
    }
    else{
        document.getElementById('level-hard').className='active';
		document.getElementById("choose_level").style.display = 'none';
		document.getElementById("start-game").style.display = 'block';
		console.log("Level chosen");
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
	document.getElementById("start-game").style.display = 'none';
	document.getElementById("welcome").style.display = 'none';
	//document.getElementById("start_playing").style.display = 'block';
}



