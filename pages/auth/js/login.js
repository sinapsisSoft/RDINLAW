/** */
// Validación del formulario de login
(function () {
    'use strict'
    // Uso de la clase

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated')
        }, false)
    })
})();
const storage = new AppStorage();
const alertManager = new AlertManager('alert-container', 6000);

// Manejo del envío del formulario de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    LoadingScreen.show('Validando Información...');
    if (this.checkValidity()) {
        // Aquí iría la lógica para enviar los datos al servidor
        const formData = {
            Platform_id: document.getElementById('Platform_id').value,
            User_email: document.getElementById('User_email').value,
            Login_password: document.getElementById('Login_password').value
        };

        checkLogin(formData);
    } else {
        console.log(this.validationMessage);
        alertManager.showError('Por favor, complete todos los campos', 2000, dismissible = true);
    }
});

// Manejo del modal de cambio de contraseña
document.getElementById('sendResetLink').addEventListener('click', function () {
    const emailInput = document.getElementById('reset_email');
    const email = emailInput.value;
    if (!emailInput.checkValidity()) {
        emailInput.classList.add('is-invalid');
        return;
    }
    LoadingScreen.show('Validando Información...');
    // Aquí iría la lógica para enviar el correo de recuperación
    const formData = {
        User_email: email,
        GET: "GET_USER_BY_EMAIL"
    };

    fetch(ajaxUserByEmail, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data["User_id"]);
            if (data["User_id"] != 0) {

                fetch('../../pages/email/send_email.php?email=' + email+ '&id=' + data["User_id"])
                    .then(response => response.json())
                    .then(data => {
                        //console.log(data);

                        emailInput.classList.remove('is-invalid');
                        emailInput.value = '';
                        emailInput.enabled = false;
                        alertManager.showSuccess(`Se ha enviado un enlace de recuperación a ${email} (simulación)`, 1000, dismissible = true);
                        fadeOut('main-container', 1500, () => {
                           
                            window.location.href = '../auth/';
                        });
                    })
                    .catch(error => {
                        alertManager.showError("Error al enviar el correo de recuperación", 4000, true);
                        console.error('Error:', error);
                         fadeIn('main-container', 500, () => {
                            LoadingScreen.hide();
                        });
                    }).finally(() => {
                        LoadingScreen.hide();
                        emailInput.enabled = true;
                    });

            } else {
                alertManager.showError(`El correo ${email} no está registrado`, 4000, true);
                emailInput.classList.add('is-invalid');
            }
        })
        .catch(error => {

            console.error('Error:', error);
            fadeIn('main-container', 500, () => {
                LoadingScreen.hide();
            });
        }).finally(() => {
            
        });



});
function checkLogin(dataSetUser) {

    dataSetUser.POST = "LOGIN";
   // console.log(typeof dataSetUser);
    fetch(ajaxUserLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSetUser)
    }).then(response => response.json())
        .then(data => {
            //console.log('Success:', data);
            if (data[0]["User_id"] != undefined) {

                fetch('../../config/auth.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "type": "login",
                        "User_id": 2,
                        "User_name": "DOCUMENTALES",
                        "User_email": "documentos@rescatefinanciero.com",
                        "Platform_id": 1
                    })
                }).then(response => response.json())
                    .then(data => {
                        //console.log('Login response:', data);
                        if (data.success) {

                            alertManager.showSuccess(`Bienvenido a la aplicación Dendrite`, 6000, true);
                            storage.clear();
                            storage.setItem(KEY_STORAGE, data.token);
                            fadeOut('main-container', 500, () => {
                                LoadingScreen.hide();
                                window.location.href = '../dashboard/';
                            });

                        } else {
                            alertManager.showError("Error al iniciar sesión", 4000, true);
                            fadeIn('main-container', 500, () => {
                                LoadingScreen.hide();
                            });
                        }
                    });


            } else {

                alertManager.showError("Valide la información", 4000, true);
                fadeIn('main-container', 500, () => {
                    LoadingScreen.hide();
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alertManager.showError("Error en la conexión", 4000, true);
            fadeIn('main-container', 500, () => {
                LoadingScreen.hide();
            });
        });

}