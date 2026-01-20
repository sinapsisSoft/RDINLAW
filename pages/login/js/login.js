
(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });


  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }



})(jQuery);

//**************************//
//Author: LAURA GRISALES
//Date: 14/09/2020
//Description : funtions data Login
//************GET DATA FORM**************//
function sendData(idForm) {
 alert();
    let objForm = document.getElementById(idForm);
    let jSon = "";
    //loadPageView();
    if (validatorForm(idForm)) {
        jSon = getDataForm(idForm);
        setLogin(jSon);
    } else {
        createModalAlert("Error al realizar el registro", 3, 4000);
    }
    // console.log(jSon);
}
//************GET DATA SERVER**************//
function setLogin(dataSetUser) {
  
  try {
      dataSetUser = '{"POST":"LOGIN",' + dataSetUser + "}";
      debugger;
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", ajaxUserLogin, true);
      xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
              var jsonObj = JSON.parse(xhttp.responseText);
              //console.log(jsonObj);
              if (jsonObj[0]["User_id"] != undefined) {
                  createModalAlert("Bienvenido", 1, 6000);
                  
                  let storage = new StoragePage();
                  storage.setData(jsonObj);
                  storage.loginStorage(jsonObj);
                  //storage.getStorage();
                  locationPage("../dashboard",1000);
              } else {
                  createModalAlert("Valide la información", 3, 4000);
              }

          }
      };

      xhttp.send(dataSetUser);
  } catch (error) {
      console.error(error);
  }
}