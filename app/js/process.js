function sendMail(id){  
  toastr.success("Solicitud enviada con éxito", "Gracias por comunicarte con nosotros", {
    "closeButton": true,
    "progressBar": true,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
  });
  cleanForm(id);
  closeModal();
}

function cleanForm(id) {
  objForm = document.getElementById(id);
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].type == 'checkbox') {
      objForm[i].checked = false;
    }
    else {
      objForm[i].value = "";
    }
  }
}

function closeModal(){
  $('#requests').modal('hide');
}