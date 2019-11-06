var start=false;
var complete=false;
var f=true;
function Over(event) {
	if(start == true) {
		document.getElementById('score').innerText = "You Lose!";
        document.getElementById('score').className = "scoreShow";
		event.target.className = "red";
		start = false;
	}
}
function Out(event) {
	event.target.className = "backwall";
}
window.onload =function(){
    var qiang=document.getElementById('qiang');
    qiang.addEventListener("mouseover",Over);
    qiang.addEventListener("mouseout",Out);
    document.getElementById('s').onmouseover=function(){
        start=true;
        complete=true;
        f=false;
        document.getElementById('score').innerText="Start!";
        document.getElementById('score').className="scoreShow";
    }
    document.getElementById('t').onmouseover=function(){
        if(start==true){
            if(f==true)document.getElementById('score').innerText="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
            else  document.getElementById('score').innerText="You win!";
        }
        else{
            document.getElementById('score').innerText="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
        }
        start = false;
        document.getElementById('score').class="scoreShow";
    }
    document.getElementById('map1').onmouseleave = function() {
        f = true;
        document.getElementById('score').innerText="";
	}

}