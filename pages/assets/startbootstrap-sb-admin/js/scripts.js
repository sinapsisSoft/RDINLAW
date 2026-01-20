/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
    activeMenuLink();
});

function activeMenuLink() {
    let url = location.href;
    let url1 = url.split("/");
    let url2 = url1[4];
    let newUrl = "../"+url1[5];
       // let newUrl = "../"+url1[6];
    // console.log(url2);
    //console.log(url1[6]);
    let sidenav = document.getElementById("sidenavAccordion");

    let getLinks = sidenav.getElementsByTagName("a");

    for (let i = 0; i < getLinks.length; i++) {

         let link= getLinks[i].getAttribute("href");
            // console.log(link);
            // console.log(newUrl);
            if (link === newUrl) {
                getLinks[i].classList.add("active");
                // console.log(getLinks[i]);
                break;
            }
            else {
                getLinks[i].classList.remove("active");
            }

    }
}
function closeSession() {
    let respuesta = confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (respuesta) {
    const storage = new AppStorage();
        // Si el usuario hace clic en "Aceptar"
        // Se redirige a la página de cierre de sesión
        storage.removeItem(KEY_STORAGE);
        window.location.href = "../../php/class/closeSession.php";
    } else {
        // Si el usuario hace clic en "Cancelar"
        // Se ejecuta el código para cancelar la acción
        console.log("Acción cancelada");
    }
}