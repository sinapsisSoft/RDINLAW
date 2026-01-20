 <!-- Modal para cambio de contraseña -->
 <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
   <div class="modal-dialog">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="passwordModalLabel">
           <a class="nav-link" href="#">
             <lord-icon class="lord-icon"
               style="width: 30px;height: 30px; position: relative;left: 0pc;top: 0.4pc;"
               src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-18-autorenew-hover-autorenew.json"
               trigger="hover"
               stroke="light"
               state="hover-pinch"
               href="index.html">
             </lord-icon><strong>Cambiar Contraseña</strong>
           </a>
         </h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" title="Close" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         <form id="passwordForm" novalidate>
           <div class="mb-3">
             <label for="reset_email" class="form-label">Correo electrónico</label>
             <div class="input-group">
               <span class="input-group-text">
                 <a class="nav-link" href="#">
                   <lord-icon class="lord-icon"
                     style="width: 30px;height: 30px; position: relative;left: 0pc;top: 0.2pc;"
                     src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-regular-59-email-hover-email.json"
                     trigger="hover"
                     stroke="light"
                     state="hover-pinch"
                     colors="primary:#000000,secondary:#b4b4b4"
                     href="index.html">
                   </lord-icon>
                 </a>
               </span>
               <input type="email" class="form-control" id="reset_email"
                 placeholder="Ingresa tu correo electrónico" required>
               <div class="invalid-feedback">
                 Por favor ingresa un correo electrónico válido.
               </div>
             </div>
           </div>
         </form>
         <div class="alert alert-info mt-3">
           <i class="fas fa-info-circle"></i> Te enviaremos un enlace para restablecer tu contraseña.
         </div>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" title="Cancelar" data-bs-dismiss="modal">Cancelar</button>
         <button type="submit" title="Enviar Enlace" class="btn btn-primary" style="padding: 2px; padding-left:1px;" id="sendResetLink">
           <lord-icon class="lord-icon"
             style="width: 30px;height: 30px; position: relative;left: 0pc;top: 0.1pc;"
             src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-solid-161-trending-flat-hover-ternd-flat-4.json"
             trigger="hover"
             stroke="light"
             state="hover-pinch"
             colors="primary:#FFFFFF,secondary:#b4b4b4"
             href="index.html">
           </lord-icon><strong style="bottom: 6px;position: relative; padding-left: 6px;padding-right: 6px;">Enviar Enlace</strong>
         </button>
       </div>
     </div>
   </div>
 </div>