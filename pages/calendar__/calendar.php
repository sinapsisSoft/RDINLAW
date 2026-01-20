 <!-- Calendar modal -->
 <div class="modal fade" id="calendarModal" tabindex="-1" aria-labelledby="calendarLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-scrollable modal-xl">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="calendarModalLabel">Calendario</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
       </div>
       <div class="modal-body my-custom-scrollbar">
         <div class="row">
           <div id='calendar' class="col-8"></div>
           <div id="selectEvent" class="col-4">
             <div id="eventInfo">
               <form id="calendarInfo">
                 <h3 id="Event_info">Información del evento</h3>
                 <div class="form-row"> <input type="hidden" class="id" name="Event_id" id="Event_id" value="0">
                   <div class="col-12"> <label for="Event_title">Título</label> <input type="text" class="form-control" name="Event_title" id="Event_title" readonly> </div> <input type="hidden" name="Event_color" id="Event_color" class="form-group">
                   <div class="col-12"> <label for="Event_start">Fecha Inicial</label> <input type="text" class="form-control" name="Event_start" id="Event_start" readonly> </div>
                   <div class="col-12"> <label for="Event_end">Fecha Final</label> <input type="text" class="form-control" name="Event_end" id="Event_end" readonly> </div>
                 </div>
                 <div class="mt-4 col-12"> <button type="button" class="btn btn-warning" id="addEventView" name="Crear">Crear <button type="button" onclick="deleteEvent('calendarInfo');" class="btn btn-danger" id="delete" name="Eliminar" style="display: none;">Eliminar </button> </div>
               </form>
             </div>
           </div>
           <div id="addEvent" class="col-4" style="display: none;">
             <form class="form-horizontal" method="POST" id="addForm" onsubmit="addEvent(this);return false">
               <h3 id="Event_info">Crear evento</h3>
               <div class="form-row"> <input type="hidden" class="id" name="Event_id" id="Event_id" value="0">
                 <div class="col-12"> <label for="Event_title">Titulo</label> <input type="text" class="form-control" name="Event_title" id="Event_title" required> </div>
                 <div class="mt-2 col-12"> <label for="Event_color">Color</label> <input type="color" name="Event_color" id="Event_color" class="form-group" placeholder="Color" required> </div>
                 <div class="col-12"> <label for="Event_start">Fecha Inicial</label> <input type="datetime-local" class="form-control" name="Event_start" id="Event_start" placeholder="Inicio" required> </div>
                 <div class="col-12"> <label for="Event_end">Fecha Final</label> <input type="datetime-local" class="form-control" name="Event_end" id="Event_end" placeholder="Fin" required> </div>
               </div>
               <div class="mt-4 col-12"> <button id="closeAddEvent" type="button" class="btn btn-secondary">Cerrar</button> <button type="submit" class="btn btn-primary">Guardar</button> </div>
             </form>
           </div>
         </div>
       </div>
       <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div>
     </div>
   </div>
 </div><!-- Fin Calendar Modal -->