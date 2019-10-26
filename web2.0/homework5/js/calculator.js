var ans=""
var now=""
var flag=0;

function reset(){
    if(ans!=""){
        ans="";
        now="";
        document.getElementById("output").value=ans;
    }
    if(now.length>20)alert("That's to long");
}

function show(){
    document.getElementById("input").value = now;
	ans="";
	document.getElementById("output").value = ans;
}

function check(){
    flag=0;
}

function clear(){
    now="";
    ans="";
    document.getElementById("input").value=now;
    document.getElementById("output").value=ans;
}
function check(){
    if(now[0]=='*'||now[0]=='/'||now[0]=='+'){
        alert("There must be a number in the first place");
        clear();
        flag=1;
        return ;
    }
    else if(now[now.length-1]=='-'||now[now.length-1]=='/'||now[now.length-1]=='*'||now[now.length-1]=='+') {
        alert("There must be a number in the last place");
        clear();
        flag=1;
        return ;
    }
    var left=0;
    var right=0;
    for(var i=0; i<now.length;++i){
        if(now[i]=='(')left++;
        if(now[i]==')')right++;
        if(i>0&&now[i]==')'&&now[i-1]=='('){
            alert("There is a empty bracekt");
            clear();
            flag=1;
            return ;
        }
    }
    if(left!=right){
        alert("The leftbracket is not the same as the rightbracket");
        clear();
        flag=1;
        return ;
    }
    for(var i=0; i<now.length;++i){
        if((i>0)&&(now[i]=='+'||now[i]=='-'||now[i]=='*'||now[i]=='/')&&(now[i-1]=='+'||now[i-1]=='-'||now[i-1]=='*'||now[i-1]=='/')){
            alert("There are too many operators");
            clear();
            flag=1;
            return ;
        }
    }
    var num=0;
    for(var i=0; i<now.length;++i){
        if(now[i]=='.'){
            num++;
            if(num>1){
                for(var j=i-1;j>=0;--j){
                    if(now[j]=='.'){
                        alert("There is too much dot");
                        clear();
                        return;
                    }
                    else if(now[j]=='+'||now[j]=='-'||now[j]=='*'||now[j]=='/')break;
                }
            }
        }
    }

}
window.onload = function(){
    document.getElementById("number0").onclick=function(){
        reset();
        now+='0';
        show();
    }
    document.getElementById("number1").onclick=function(){
        reset();
        now+='1';
        show();
    }
    document.getElementById("number2").onclick=function(){
        reset();
        now+='2';
        show();
    }
    document.getElementById("number3").onclick=function(){
        reset();
        now+='3';
        show();
    }
    document.getElementById("number4").onclick=function(){
        reset();
        now+='4';
        show();
    }
    document.getElementById("number5").onclick=function(){
        reset();
        now+='5';
        show();
    }
    document.getElementById("number6").onclick=function(){
        reset();
        now+='6';
        show();
    }
    document.getElementById("number7").onclick=function(){
        reset();
        now+='7';
        show();
    }
    document.getElementById("number8").onclick=function(){
        reset();
        now+='8';
        show();
    }
    document.getElementById("number9").onclick=function(){
        reset();
        now+='9';
        show();
    }
    document.getElementById("jia").onclick=function(){
        reset();
        now+='+';
        show();
    }
    document.getElementById("jian").onclick=function(){
        reset();
        now+='-';
        show();
    }
    document.getElementById("cheng").onclick=function(){
        reset();
        now+='*';
        show();
    }
    document.getElementById("chu").onclick=function(){
        reset();
        now+='/';
        show();
    }
    document.getElementById("dian").onclick=function(){
        reset();
        now+='.';
        show();
    }
    document.getElementById("left").onclick=function(){
        reset();
        now+='(';
        show();
    }
    document.getElementById("right").onclick=function(){
        reset();
        now+=')';
        show();
    }
    document.getElementById("clear").onclick=function(){
        clear();
    }
    document.getElementById("erase").onclick=function(){
        if (now.length>0)
        now = now.substring(0 , now.length-1);
        show();
    }
    document.getElementById("equal").onclick=function(){
        check();
        if(!flag){
            eval("ans = "+ now);
			ans =ans.toFixed(3);
			document.getElementById("input").value = now;
            document.getElementById("output").value = ans;
        }
    }
}
