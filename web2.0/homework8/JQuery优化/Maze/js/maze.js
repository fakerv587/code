var start=false;
var complete=false;
var f=true;

$('document').ready(function(){
    var qiang=$('.qiang');
    qiang.mouseover(function(){
        if(start == true) {
            $('#score').text("You Lose!");
            event.target.className = "red";
            start = false;
        }
    })
    qiang.mouseout(function(){
        event.target.className = "backwall";
    })
    $('.s').mouseover(function(){
        start=true;
        complete=true;
        f=false;
        $('#score').text("Start!");
        $('#score').className="scoreShow";
    })
    $('.t').mouseover(function(){
        if(start==true){
            if(f==true)$('#score').text("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
            else  $('#score').text("You win!");
        }
        else{
            $('#score').text("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
        }
        start = false;
        $('#score').className="scoreShow";
    })
    $('.map1').mouseleave(function(){
        f = true;
        $('#score').innerText="";        
    })
})