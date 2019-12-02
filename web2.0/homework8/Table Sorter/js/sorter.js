/* 18342077
    南樟
*/ 
var result = new Array();
var trA;
var tbodyA;
var index;

$(document).ready(function(){
    init();
});

function sorts() {
    result.sort();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var bodyT = $(trA[j]).find("td");
            if (bodyT[index].innerHTML == result[i]) {
                tbodyA.append(trA[j]);
            }
        }
    }
}

function desorts() {
    result.sort();
    for (var i = 2; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            var bodyT = $(trA[j]).find("td");
            if (bodyT[index].innerHTML == result[i]) {
                tbodyA.append(trA[j]);
            }
        }
    }
}

function init(){
    $("th").click(function(){
        trA = $(this).parents("table").find("tbody tr");
        tbodyA = $(this).parents("table").find("tbody");
        index = $(this).index();
        result.length=0;
        $(trA).find("td").each(function(){
            if($(this).index()==index)
                result.push($(this).text());
        })
        if ($(this).hasClass("ascend")) {
            $('th').removeClass();
            $(this).addClass("descend");
            desorts();
        } else {
            $('th').removeClass();
            $(this).addClass("ascend");
            sorts();
        }
    })
}
