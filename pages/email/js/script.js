document.addEventListener('DOMContentLoaded', function() {
    const recoveryForm = document.getElementById('recoveryForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const spinner = document.getElementById('spinner');
    const messageDiv = document.getElementById('message');

    recoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación del formulario
        if (!recoveryForm.checkValidity()) {
            e.stopPropagation();
            recoveryForm.classList.add('was-validated');
            return;
        }

        // Mostrar spinner y cambiar texto del botón
        submitBtn.disabled = true;
        submitText.textContent = 'Enviando...';
        spinner.classList.remove('d-none');
        
        // Ocultar mensajes anteriores
        messageDiv.classList.add('d-none');
        
        // Obtener datos del formulario
        const formData = new FormData(recoveryForm);
        
        // Enviar datos con AJAX
        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Mostrar mensaje de respuesta
            messageDiv.textContent = data.message;
            messageDiv.classList.remove('d-none');
            messageDiv.classList.remove('alert-success', 'alert-danger');
            
            if (data.success) {
                messageDiv.classList.add('alert-success');
                recoveryForm.reset();
                recoveryForm.classList.remove('was-validated');
            } else {
                messageDiv.classList.add('alert-danger');
            }
        })
        .catch(error => {
            messageDiv.textContent = 'Error al conectar con el servidor.';
            messageDiv.classList.remove('d-none');
            messageDiv.classList.add('alert-danger');
        })
        .finally(() => {
            // Restaurar botón
            submitBtn.disabled = false;
            submitText.textContent = 'Enviar Enlace';
            spinner.classList.add('d-none');
        });
    });
});