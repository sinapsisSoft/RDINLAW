
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

function loginIn(id) {
  let user = document.getElementById('email');
  let pass = document.getElementById('pass');
  if (user.value == 'admin@sinapsist.com.co' && pass.value == '1234') {
    toastr.success("Bienvenido al sistema", {
      "closeButton": true,
      "progressBar": true,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
    });
    setTimeout("location.href='process.html'", 3000);
  }
  else {
    toastr.error("Usuario o contraseña inválido, intenta nuevamente", "Error al ingresar", {
      "closeButton": true,
      "progressBar": true,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
    });
    cleanForm(id);
  }
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