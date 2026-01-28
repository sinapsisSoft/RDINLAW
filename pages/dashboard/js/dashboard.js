(function () {
  'use strict';
  // Your code here
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize your scripts here
    console.log('Dashboard page scripts loaded');
    getDataConsolidated();
  });
})();




function getDataConsolidated() {
  let dataSetUser = { "GET": "GET_PROCESS_COUNT", "User_id": document.getElementById('User_id').value, "Name":""};
  //console.log(dataSetUser);
  fetch(ajaxProcess, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSetUser)
  }).then(response => response.json())
    .then(data => {
      //console.log('Success:', data[0].total_requests);
      document.getElementById('total_proceedings').textContent = data[0].total_process;
      document.getElementById('total_requests').textContent = data[0].total_requests;
      document.getElementById('total_calendar').textContent = data[0].total_events;
    })
    .catch((error) => {
      console.error('Error:', error);
      alertManager.showError("Error en la conexión", 4000, dismissible = true);
    });

}
