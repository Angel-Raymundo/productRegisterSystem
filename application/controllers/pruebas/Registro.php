<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Registro extends MY_Controller {

	public function RegistroNombre(){
        $nombre = $this->input->post("nombrePersona");
        $this->load->model('prueba/Registro_Model');

        $registerResult = $this->Registro_Model->registrarPersona($nombre);
    
        echo json_encode($registerResult);
    }

    public function ObtenerRegistrosPersonas(){
        $this->load->model('prueba/Personas_Model');
        $getResult = $this->Personas_Model->obtenerRegistrosPersonas();

        echo json_encode($getResult);

    }
}
