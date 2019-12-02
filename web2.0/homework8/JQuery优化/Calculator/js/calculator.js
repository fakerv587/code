 var ans=""
 var now=""
 var flag=0;

  function clear(){
     now="";
     ans="";
     $('#input').val(now);
     $('#output').val(ans);
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
$(document).ready(function(){
    $("#number0").click(function(){$("#input").val($('#input').val()+"0");});
    $("#number1").click(function(){$("#input").val($('#input').val()+"1");});
    $("#number2").click(function(){$("#input").val($('#input').val()+"2");});
    $("#number3").click(function(){$("#input").val($('#input').val()+"3");});
    $("#number4").click(function(){$("#input").val($('#input').val()+"4");});
    $("#number5").click(function(){$("#input").val($('#input').val()+"5");});
    $("#number6").click(function(){$("#input").val($('#input').val()+"6");});
    $("#number7").click(function(){$("#input").val($('#input').val()+"7");});
    $("#number8").click(function(){$("#input").val($('#input').val()+"8");});
    $("#number9").click(function(){$("#input").val($('#input').val()+"9");});
    $("#jia").click(function(){$("#input").val($('#input').val()+"+");});
    $("#jian").click(function(){$("#input").val($('#input').val()+"-");});
    $("#cheng").click(function(){$("#input").val($('#input').val()+"*");});
    $("#chu").click(function(){$("#input").val($('#input').val()+"/");});
    $("#left").click(function(){$("#input").val($('#input').val()+"(");});
    $("#right").click(function(){$("#input").val($('#input').val()+")");});
    $("#dian").click(function(){$("#input").val($('#input').val()+".");});
    $("#clear").click(function(){$("#input").val("");});
    $("#erase").click(function(){
        var now1=$("#input").val();
        now1=now1.substring(0,now1.length-1);
        $("#input").val(now1);
    });
    $("#equal").click(function(){
        now=$("#input").val();
        check();
        if(!flag){
            eval("ans ="+now);
            ans=ans.toFixed(3);
            $("#input").val(now);
            $("#output").val(ans);
        }
    });
});