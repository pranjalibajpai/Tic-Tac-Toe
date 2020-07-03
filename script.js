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
    }
    else {
        document.getElementById('opponent-crew').className='active';
    }
}
function ChooseSymbol(cross){
    if(!cross)
    {
        p1_symb='O';
        p2_symb='X';
        document.getElementById('symbol-naught').className='active';
    }
    else{
        document.getElementById('symbol-cross').className='active';
    }
}
function ChooseLevel(easy){
    if(easy){
        document.getElementById('level-easy').className='active';
    }
    else{
        document.getElementById('level-hard').className='active';
    }
}
function StartGame(){
    game_start=true;
    document.getElementsByClassName('start-menu')[0].style.display="none";
    document.getElementsByTagName('body')[0].className='board';
}
