/* 18342077
   南樟*/
var hole_total;
var start = 0; 
var score = 0; 
var time = 30; 
var pos = -1;  
var clock;
var a;
var wrong;
var old_pos=-2;
function panduan(element){
	if(start == 1){                         
		if(event.target.id  == "appear"){   
			hole_total[pos].id = "t";
			score++;
			a = window.setTimeout(update,100);
			document.getElementById("scoreoutput").value = score;
		}
		else{
			event.target.id = "wrong";	
			if(score>0)score-=1; 
			wrong=event.target;           
			a = window.setTimeout(reset,100);
			document.getElementById("scoreoutput").value = score;
		}
	}
	else if(start == 0 || start == -1){
	}
}
function startgame(){
	if(start == 0){
		start = 1;
		pos = Math.round(Math.random()*60);
		pos = pos % 60;
		hole_total[pos].id = "appear";
		document.getElementById("scoreoutput").value = score;
		document.getElementById("timeoutput").value = time;
		clock = window.setInterval(countdown,1000);
		document.getElementById("state").value = "Gaming";
	}
	else if (start == 1) {
		alert("Game Over! Your scoure is " + score);
        document.getElementById("state").value = "";
        document.getElementById("scoreoutput").value="0";
        document.getElementById("timeoutput").value="0";
		hole_total[pos].id = "";
		pos = -1;
		time = 30;
		start = 0;
		score = 0;
		clearInterval(clock);
		clearTimeout(a);
	}
}
function countdown(element){
	time--;
	document.getElementById("timeoutput").value = time;
	if(time <= 0){
		alert("Game Over! Your scoure is " + score);
        document.getElementById("state").value = "Game over";
        document.getElementById("score").value="0";
        document.getElementById("time").value="0";
		hole_total[pos].id = "";
		pos = -1;
		time = 30;
		start = 0;
		score = 0;
		clearInterval(clock);
		clearTimeout(a);
	}
}
function update(element){
	hole_total[pos].id = "";
	pos = Math.round(Math.random()*60);
	pos = pos % 60;
	if(old_pos==pos)
		a = window.setTimeout(update,0);
	hole_total[pos].id = "appear";
	old_pos=pos;
}

function reset(element){
	wrong.id="";
}
window.onload = function() {
	var hole;
	var gamemap = document.getElementById("gamemap");
	for(var i = 0; i < 6; ++i){        
		for(var j = 0; j < 10; ++j){
			hole = document.createElement("div");
			hole.className = "holes";
			gamemap.appendChild(hole);
			hole.addEventListener('click',panduan);
		}
	}
	hole_total = document.getElementsByClassName("holes");
	document.getElementById("button1").onclick = startgame;
	document.getElementById("gamemap").onmouseover = function(){
		this.className = "change";
	}
}
