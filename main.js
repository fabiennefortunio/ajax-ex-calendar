var year=2018;
var month;
var festivitiesList=[];


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


function isFestivity(m){
    var i;
    for(i=0;i<festivitiesList.length;i++){
        if(festivitiesList[i].date.date()==m.date()){
            return i;
        }
    }
    return -1;
}

function redraw(){
    var calendar=$("#calendar");
    var title=$("#current_month")
    var day;

    var d=new Date(year,month,1);
    var m=moment(d);
    var daysInMonth=m.daysInMonth();
    var dayOfWeek=m.day();
    var i;
    var f;

    title.empty();
    title.append(m.format("MMMM YYYY"));
    calendar.empty();

    var html="<table class='calendar' border='1' class='calendarTable'><tr>";



    for(i=0;i<dayOfWeek;i++){
        html=html+"<td></td>";
    }

    for(i=0;i<daysInMonth;i++){
        f=isFestivity(m);
        if(f>=0){
            html=html+"<td class='festivityDay'>"+(i+1)+"</td>";
        }
        else{
            html=html+"<td class='nonFestivityDay'>"+(i+1)+"</td>";
        }
        m.add(1,'days');
        dayOfWeek=m.day();
        if(dayOfWeek==0){
            html=html+"</tr><tr>";
        }
    }
    if(m.day()>0){
        for(i=m.day();i<7;i++){
            html=html+"<td></td>";
        }
        html=html+"</tr>";
    }
    html=html+"</table>";

    calendar.append(html);

}


$("document").ready(function() {

    month=0;

    $("#btnPrevious").click(function(){
        previousMonth();
        loadFestivities();
        redraw();
    });
    $("#btnNext").click(function(){
        nextMonth();
        loadFestivities();
        redraw();
    });

    loadFestivities();
    redraw();
});

//llamada ajax
function loadFestivities(){
    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/holidays',
        'data': {
            'year': 2018,
            'month': month+1
        },
        'method': 'GET',
        'dataType': 'json',
        'success': function(data_response,status,hrq) {
            var i;
            if(status=="success"){
                if(data_response.success){
                    festivitiesList=data_response.response;
                    for(i =0;i<festivitiesList.length;i++){
                        festivitiesList[i].date=moment(festivitiesList[i].date);
                    }
                }
                else{
                    console.log("Error en la peticion");
                }
            }
            else{
                console.log("Error en la comucniacion con el servidor.");
            }
        }
    });
}
