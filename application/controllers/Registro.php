<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Registro extends CI_Controller {

	public function RegistroNombre(){
        $nombre = $this->input->post("nombrePersona");
        $this->load->model('Registro_Model');

        $registerResult = $this->Registro_Model->registrarPersona($nombre);
        
        //  $allResults = [
        //     'personas' => $getResult,
        //     'registro' => $registerResult
        // ];

        echo json_encode($registerResult);
    }

    public function ObtenerRegistrosPersonas(){
        $this->load->model('Personas_Model');
        $getResult = $this->Personas_Model->obtenerRegistrosPersonas();

        echo json_encode($getResult);

    }
}
