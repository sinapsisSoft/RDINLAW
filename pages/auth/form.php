 <form id="loginForm">
     <input type="hidden" id="Platform_id" name="Platform_id" value="1">
     <div class="form-floating mb-3">
         <i class="fas fa-envelope input-icon"></i>
         <input type="email" class="form-control" id="User_email" name="User_email"
             placeholder="Correo electrónico" required>
         <label for="User_email">Correo electrónico</label>
         <div class="invalid-feedback">
             Por favor ingresa un correo electrónico válido.
         </div>
     </div>
     <div class="form-floating mb-3">
         <i class="fas fa-lock input-icon"></i>
         <input type="password" class="form-control" id="Login_password" name="Login_password"
             required placeholder="Contraseña" minlength=8 maxlength="15" pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$" autocomplete="off" title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.">
             <!-- <input type="password" class="form-control" id="Login_password" name="Login_password"
             required placeholder="Contraseña" minlength=8 maxlength="15"  autocomplete="off" title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."> -->
         <label for="Login_password">Contraseña</label>
         <div class="invalid-feedback">
             La contraseña debe tener al menos 6 caracteres.
         </div>
     </div>
     <div class="forgot-password">
         <a href="#" data-bs-toggle="modal" data-bs-target="#passwordModal" title="¿Olvidaste tu contraseña?">
             <lord-icon class="lord-icon"
                 style="width: 30px; height: 30px;padding-top:0px"
                 src="../assets/startbootstrap-sb-admin/assets/img/icons/json/wired-outline-500-fingerprint-security-hover-pinch.json"
                 trigger="hover"
                 stroke="light"
                 state="hover-pinch"
                 href="index.html">
             </lord-icon><strong style="line-height: 2;position: absolute;">¿Olvidaste tu contraseña?</strong>
         </a>
     </div>
     <button type="submit" class="btn btn-primary w-100 py-2 btn-login" title="Iniciar Sesión">
         <a class="nav-link" style="display:inline;" href="#">
             <lord-icon class="lord-icon"
                 style="width: 30px;height: 30px; position: relative;left: 0pc;top: 0.1pc;"
                 src="../assets/startbootstrap-sb-admin/assets/img/icons/json/system-solid-161-trending-flat-hover-ternd-flat-4.json"
                 trigger="hover"
                 stroke="light"
                 state="hover-pinch"
                 colors="primary:#FFFFFF,secondary:#b4b4b4"
                 href="index.html">
             </lord-icon></a>
         <strong style="line-height: 0;  position: relative;  bottom: 5px;">Iniciar Sesión</strong>
     </button>
 </form>