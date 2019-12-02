/*18342077
南樟
首先会在游戏开始时设置位置，
然后通过随机与剩下的图片进行交换使得整个拼图打乱，
之后再考虑是否可还原，
最后成功拼出来后会有文字提示成功。
*/
var begin=0;
var win=false;
var position =[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var flag=0;

window.onload = function() {
    var picture1;
    var blank1;
    var creations = document.createDocumentFragment();
    for(var i = 0; i < 4; ++i)
        for(var j = 0;j < 4; ++j){
            if(i == 3 & j == 3)
            break;
            picture1 = document.createElement("div");
            picture1.id ="picture"+(4 * i  + j + 1);
            picture1.className ="picture row"+ i +" col" + j;
            picture1.addEventListener("click",move);
            creations.appendChild(picture1);
        }
        blank1 = document.createElement("div");
        blank1.id = "blank";
        blank1.className = "blank row3 col3";

        creations.appendChild(blank1); 
        document.getElementById("map").appendChild(creations);
		document.getElementById("start").onclick = start;
		document.getElementById("recover").onclick = recover;
}
function start() {
	flag=1;
	for (var i = 0; i < 4; i++) { 
		for (var j = 0; j < 4; j++) {
			if(i==3&&j==3)
				break;
			position[i][j] = 4*i+j+1;	
		}
	}
	position[3][3] = 0;
	var r;
	var hold;
	do{ 
		for (var i = 14; i >= 0; i--) {
			r = Math.round(Math.random()*i);
			hold = position[Math.floor(i/4)][i%4];
			position[Math.floor(i/4)][i%4] = position[Math.floor(r/4)][r%4];
			position[Math.floor(r/4)][r%4] = hold;
		}
	}while(!isvalid())	

	var picture = document.getElementsByClassName("picture"); 
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(i==3&&j==3)
				break;
			picture[4*i+j].id = "picture"+position[i][j];
			picture[4*i+j].className = "picture row"+ i +" col"+ j;	
		}
	}
	var blank = document.getElementsByClassName("blank");
	blank[0].className = "blank row3 col3";
	blank[0].id = "blank";
}
function isvalid() { 
	var count = 0;
	for (var i = 0; i < 15; i++) {
		for (var j = i+1; j < 15; j++) {
			if (position[Math.floor(i/4)][i%4] > position[Math.floor(j/4)][j%4]) 
				count++;
		}
	}
	if (count%2 == 0) 
		return true;
	else 
		return false;
}
function recover() {
	flag=0;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if(i==3&&j==3)
				break;
			position[i][j] = 4*i+j+1;
		}
	}
	position[3][3] = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(i==3&&j==3){
				var a = document.getElementsByClassName("row3 col3")[0];
				a.className="blank row3 col3";
				var a = document.getElementsByClassName("blank row3 col3")[0];
				a.id="blank"
				break;
			}
			var a = document.getElementsByClassName("row"+ i +" col"+ j)[0];
			a.className="picture row"+ i +" col"+ j;
			a.id="picture"+position[i][j];
		}
	}
}
// 	for (i = 0; i < 4; i++) {
// 		for (j = 0; j < 4; j++) {
// 			if(i==3&&j==3)
// 				break;
// 			position[i][j] = 4*i+j+1;	
// 	}
// 	position[3][3] = 0;
// for (var i = 0; i < 4; i++) {
// 	for (var j = 0; j < 4; j++) {
// 		if(i==3&&j==3){
// 			var x = document.getElementsByClassName("row3 col3")[0];
// 			x.className="blank row3 col3";
// 			var x = document.getElementsByClassName("blank row3 col3")[0];
// 			x.id="blank"
// 			break;
// 		}
// 		var x = document.getElementsByClassName("row"+ i +" col"+ j)[0];
// 		x.className="picture row"+ i +" col"+ j;
// 		x.id="picture"+position[i][j];
// 	}
// }
// 
function move(event) {
	var x=0,y=0;
	var blank_x=0,blank_y=0;
	if(flag == 0||event.target.id == "blank")return;
	for(var i=0;i<4;++i)
		for(var j=0;j<4;++j){
		if("picture"+position[i][j]==event.target.id){
			x=i;
			y=j;
		}
		if(position[i][j]==0){
			blank_x=i;
			blank_y=j;
		}
	}
	if (blank_x == x) { 
		if (y-blank_y== -1||y-blank_y == 1) {
			position[blank_x][blank_y]=position[x][y];
			position[x][y]=0;
			var blank2 = document.getElementById("blank");
			blank2.className = "blank row" + x + " col" + y;
			event.target.className = "picture row" + blank_x + " col" + blank_y;
		} 
	} 
	else if (blank_y == y) {
		if (x-blank_x == -1||x-blank_x == 1) {
			position[blank_x][blank_y]=position[x][y];
			position[x][y]=0;
			var blank2 = document.getElementById("blank");
			blank2.className = "blank row" + x + " col" + y;
			event.target.className = "picture row" + blank_x + " col" + blank_y;
		}
	}
	var bo=true;
	for(var i=0;i<4;++i)
		for(var j=0;j<4;++j)
		if(i==3&&j==3)break;
		else if(position[i][j] != i*4+j+1)return;
	if(bo)document.getElementById("information").textContent = "You win!";
}