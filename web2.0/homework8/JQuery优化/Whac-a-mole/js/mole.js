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
			$('#scoreoutput').val(score);
		}
		else{
			event.target.id = "wrong";	
			if(score>0)score-=1; 
			wrong=event.target;           
			a = window.setTimeout(reset,100);
			$('#scoreoutput').val(score);
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
		$('#scoreoutput').val(score);
		$('#timeoutput').val(time);
		clock = window.setInterval(countdown,1000);
		$('#state').val("Gaming");
	}
	else if (start == 1) {
		alert("Game Over! Your scoure is " + score);
		$('#state').val("");
		$('#score').val("0");
		$('#time').val("0");
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
	$("#timeoutput").val(time);
	if(time <= 0){
		alert("Game Over! Your scoure is " + score);
		$('#state').val("Game Over");
		$('#score').val("0");
		$('#time').val("0");
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

$(document).ready(function(){
	var hole;
	var gamemap = $('#gamemap');
	for(var i = 0; i < 6; ++i){        
		for(var j = 0; j < 10; ++j){
			var hole=$('<div></div>');
			hole.attr('class','holes');
			gamemap.append(hole);
			hole.click(panduan);
		}
	}
	hole_total = $(".holes");
	$('#button1').click(startgame);
	$('#gamemap').mouseover( function(){
		this.className="change";
	})
})