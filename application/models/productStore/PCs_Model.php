<?php
    class PCs_Model extends CI_Model{
        public function __construct(){
            parent::__construct();
            $this->load->database();
        }

        public function getPCs(){
            $query = $this->db->query("call sp_getPCs();");

            $result= $query->result_array();

            $query->free_result();

              while (mysqli_more_results($this->db->conn_id)) {
              mysqli_next_result($this->db->conn_id);
    }

            return $result;
        }

       public function addPC($Name, $Brand, $Graph, $Ram, $Cpu, $Price)
{
    $query = $this->db->query("call sp_addPC('" . $Name . "','" . $Brand . "','" . $Graph . "','" . $Ram . "','" . $Cpu . "','" . $Price . "');");

    $result = $query->result_array();

    $query->free_result();

    while (mysqli_more_results($this->db->conn_id)) {
        mysqli_next_result($this->db->conn_id);
    }

    return $result;
}

    }
?>