function ChooseSymbol()
{
  document.getElementById('player').innerHTML="Choose your symbol :";
  var first=document.getElementsByClassName('pbutton')[0];
  var second=document.getElementsByClassName('pbutton')[1];
  first.innerHTML="X";
  second.innerHTML="O";
  first.onclick=function(){ChooseLevel};
  second.onclick=function(){ChooseLevel};
}
function ChooseLevel()
{
  document.getElementById('player').innerHTML="Choose level :";
  var first=document.getElementsByClassName('pbutton')[0];
  var second=document.getElementsByClassName('pbutton')[1];
  first.innerHTML="Easy";
  second.innerHTML="Hard";
}
