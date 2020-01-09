var year=2018;
var month;


function nextMonth(){
    month++;
    if(month>11){
        month=11;
    }
}

function previousMonth(){
    month--;
    if(month<0){
        month=0;
    }
}




$("document").ready(function() {

    month=0;

    $("#btnPrevious").click(function(){
        previousMonth();
        window.alert(month);
        //redraw();
    });
    $("#btnNext").click(function(){
        nextMonth();
        window.alert(month);
        //redraw();
    });
});
