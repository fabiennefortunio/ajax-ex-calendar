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

function redraw(){
    var calendar=$("#calendar");
    var day;

    var d=new Date(year,month,1);
    var m=moment(d);
    var daysInMonth=m.daysOfMonth();
    var dayOfWeek=m.day();
    var i;

    var html="<table class='calendar'><tr>";

    for(i=0;i<dayOfWeek;i++){
        html=html+"<td><td>";
    }

    for(i=0;i<daysInMonth;i++){
        html=html+"<td >"+i+"</td>";
        m.add(1,'days');
        dayOfWeek=m.day();
        if(dayOfWeek==0){
            html=html+"</tr><tr>";
        }
    }

    html=htm
    calendar.innerHTML=html;

}


$("document").ready(function() {

    month=0;

    $("#btnPrevious").click(function(){
        previousMonth();
        window.alert(month);

        redraw();
    });
    $("#btnNext").click(function(){
        nextMonth();
        window.alert(month);
        redraw();
    });
});
