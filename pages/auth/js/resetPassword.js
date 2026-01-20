document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('resetPasswordForm');
  const newPassword = document.getElementById('new_password');
  const confirmPassword = document.getElementById('confirm_password');
  const strengthBar = document.getElementById('passwordStrengthBar');
  const alertManager = new AlertManager('alert-container', 6000);

  if (newPassword === null) return;
  // Validación de fortaleza de contraseña
  newPassword.addEventListener('input', function () {

    const password = this.value;
    let strength = 0;

    // Longitud mínima
    if (password.length >= 8) strength += 20;

    // Contiene mayúsculas
    if (/[A-Z]/.test(password)) strength += 20;

    // Contiene minúsculas
    if (/[a-z]/.test(password)) strength += 20;

    // Contiene números
    if (/[0-9]/.test(password)) strength += 20;

    // Contiene caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    // Actualizar barra de fortaleza
    strengthBar.style.width = strength + '%';

    // Cambiar color según fortaleza
    if (strength < 40) {
      strengthBar.style.backgroundColor = '#dc3545'; // Rojo
    } else if (strength < 80) {
      strengthBar.style.backgroundColor = '#ffc107'; // Amarillo
    } else {
      strengthBar.style.backgroundColor = '#28a745'; // Verde
    }
  });

  // Validación de coincidencia de contraseñas
  confirmPassword.addEventListener('input', function () {
    if (this.value !== newPassword.value) {
      this.classList.add('is-invalid');
    } else {
      this.classList.remove('is-invalid');

    }
  });

  // Validación del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (newPassword.value !== confirmPassword.value) {

      confirmPassword.classList.add('is-invalid');
      return false;
    }

    // Aquí podrías añadir más validaciones
    if (newPassword.value.length < 8) {

      newPassword.classList.add('is-invalid');
      return false;
    }
    LoadingScreen.show('Validando Información...');
    const formData = {
      User_id: document.getElementById('user_id').value,
      User_password: newPassword.value,
      PUT: "CHANGE_PASSWORD"
    };

    // Aquí iría la lógica para enviar los datos al servidor

    fetch(ajaxUserUpdateById, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.Id_row > 0) {
          // Contraseña cambiada con éxito

          alertManager.showSuccess("Contraseña actualizada con éxito", 4000, true);
          LoadingScreen.hide();
          fadeOut('main-container', 2500, () => {

            window.location.href = '../auth/';
          });

        } else {
          // Manejar errores

          alertManager.showError("Error al actualizar la contraseña: ", 2000, true);
          fadeIn('main-container', 1000, () => {
            LoadingScreen.hide();
            form.reset();
          });
        }
      })
      .catch(error => {
        // console.error('Error:', error);
        alertManager.showError("Error al actualizar la contraseña: " + error.message, 2000, true);
        fadeIn('main-container', 500, () => {
          LoadingScreen.hide();
        });
      });

  });
});