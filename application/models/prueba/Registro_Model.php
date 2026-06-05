<?php
    class Registro_Model extends CI_Model{
        public function __construct(){
            parent::__construct();
            $this->load->database();
        }

        public function registrarPersona($persona){
            $query=$this->db->query("call sp_addPersona('".$persona."');");

            $result= $query->result_array();
            
            $query->free_result();

              while (mysqli_more_results($this->db->conn_id)) {
        mysqli_next_result($this->db->conn_id);
    }

            return $result;
        }

    }
?>