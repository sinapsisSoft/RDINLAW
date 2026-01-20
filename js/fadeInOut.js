function fadeIn(elementId, duration = 400, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento con ID ${elementId} no encontrado`);
        return;
    }

    element.style.display = '';
    element.style.opacity = 0;

    let start = null;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        element.style.opacity = opacity;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else if (callback) {
            callback();
        }
    };

    window.requestAnimationFrame(step);
}
/**
 * Función para ocultar gradualmente un elemento (fadeOut)
 * @param {string} elementId - ID del elemento a ocultar
 * @param {number} [duration=400] - Duración en milisegundos (opcional)
 */
function fadeOut(elementId, duration = 400, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento con ID ${elementId} no encontrado`);
        return;
    }

    // Guardar el display original para restaurarlo en fadeIn
    if (!element.dataset.originalDisplay) {
        element.dataset.originalDisplay = window.getComputedStyle(element).display;
    }

    let start = null;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(1 - progress / duration, 0);
        element.style.opacity = opacity;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            element.style.display = 'none';
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    window.requestAnimationFrame(step);
}

/**
 * Función para alternar la visibilidad con efecto fade (toggle)
 * @param {string} elementId - ID del elemento a alternar
 * @param {number} [duration=400] - Duración en milisegundos (opcional)
 */
function fadeToggle(elementId, duration = 400, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento con ID ${elementId} no encontrado`);
        return;
    }

    if (window.getComputedStyle(element).display === 'none') {
        fadeIn(elementId, duration, callback);
    } else {
        fadeOut(elementId, duration, callback);
    }
}
