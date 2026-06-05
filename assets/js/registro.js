
$(document).ready(function () {
    ObtenerRegistrosPersonas();	
});

function ObtenerRegistrosPersonas() {
    $('#tablaPersonas').DataTable({
        destroy: true, 
        ajax: {
            url: base_url + "Registro/ObtenerRegistrosPersonas",
            type: "POST",
            dataSrc: "" 
        },
        columns: [
            { data: "PersonaId" },
            { data: "Persona_Nombre" }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        }
    });
}

$("#btn-registrar").click(function () {
	let nombre = $("#txt-nombre").val();

	$.ajax({
		url: base_url+"Registro/RegistroNombre", 
		type: "POST", 
		dataType: "json", 
        data:{
            "nombrePersona":nombre.toUpperCase(),
        },
		success: function (respuesta) {

			Swal.fire({
  				title: "Usuario "+ respuesta[0].Persona_Nombre +" registrado",
			  	icon: "success",
			  	draggable: true
			});

			$('#tablaPersonas').DataTable().ajax.reload();

		},
		error: function (xhr, status, error) {
			console.log("Error en la petición: " + error);
		},
		complete: function () {
			console.log("Petición finalizada."); 
		},
	});
});
