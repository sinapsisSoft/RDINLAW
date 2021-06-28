clientId = 0;

function getClientCalendar(){
  email = document.getElementById("User_email").innerHTML;
  getDataClient(email,0);
  setTimeout(() => {
    getDataEvent('',0);
  }, 1500);
}

//**Function get Client ID **/
function getDataClient(dataSetEvent, typeSend) {
  try {
    loadPageView();
    var xhttp = new XMLHttpRequest();
    var JsonData;
    xhttp.open("POST", ajaxCalendar, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(xhttp.responseText);
        if (json.length != 0) {
          if (typeSend == 0) {
            clientId = json[0]["Client_id"];
          }   
        } else {
          enableScroll();
        }
      }
    };    
    if (typeSend == 0) {
      JsonData = '{"GET":"GET_CLIENT_ID","User_email":"' + dataSetEvent + '"}';
    }  

    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
    enableScroll();
  }
}

//**Function get Event **/
function getDataEvent(dataSetEvent, typeSend) {
  try {
    loadPageView();
    var xhttp = new XMLHttpRequest();
    var JsonData;
    xhttp.open("POST", ajaxCalendar, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(xhttp.responseText);
        if (json.length != 0) {
          if (typeSend == 0) {
            setCalendar(json);
            enableScroll();            
          }   
        } else {
          setCalendar(json);
          enableScroll();
        }
      }
    };    
    if (typeSend == 0) {
      JsonData = '{"GET":"GET_EVENT_CLIENT","Client_id":"' + clientId + '"}';
    }  

    xhttp.send(JsonData);
  } catch (error) {
    console.error(error);
    enableScroll();
  }
}

function setCalendar(json) {    
  var jsonData = [];
  var objDate = new Date();
  var day = objDate.getDate();
  var month = objDate.getMonth();
  var year = objDate.getFullYear();
  var getDate = year + "-" + (month + 1) + "-" + day;
  var calendarEl = document.getElementById('calendar');
  $.each(json, function(idx, e){
    jsonData.push({
      id: "" + e.id + "",
      title: "" + e.title + "",
      start: "" + e.start + "",
      end: "" + e.end + "",
      color: "" + e.color + ""
    })
  });
  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    defaultDate: getDate,
    editable: false,
    eventLimit: true,
    selectable: true,
    selectHelper: true,
    navLinks: true, // can click day/week names to navigate views
    eventClick: function (arg) {
      $('#calendarModal #Event_id').val(arg.event.id);
      $('#calendarModal #Event_title').val(arg.event.title);
      $('#calendarModal #Event_color').val(arg.event.borderColor);
      $('#calendarModal #Event_start').val(moment(arg.event.start).format('YYYY-MM-DD HH:mm:ss'));
      $('#calendarModal #Event_end').val(moment(arg.event.end).format('YYYY-MM-DD HH:mm:ss'));
      document.getElementById('Event_info').scrollIntoView({behavior: "smooth"});
    },
    events: jsonData    
  }); 
  calendar.render();
}

$("#calendarModal").on('hidden.bs.modal', function () {
  objForm = document.getElementById("calendarInfo");
  for (let i = 0; i < objForm.length; i++) {
    objForm[i].value = "";
  }
});
