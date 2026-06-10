<?php
    class Rel_PC_Disk_Model extends CI_Model{
        public function __construct(){
            parent::__construct();
            $this->load->database();
        }

    //     public function getRelations(){
    //         $query = $this->db->query("call sp_getPCs();");

    //         $result= $query->result_array();

    //         $query->free_result();

    //           while (mysqli_more_results($this->db->conn_id)) {
    //           mysqli_next_result($this->db->conn_id);
    // }

    //         return $result;
    //     }

       public function addRelPcDisk($IdPC, $IdDisk)
{
    $query = $this->db->query("call sp_addRelPcDisk('" . $IDPC . "','" . $IdDisk . "');");

    $result = $query->result_array();

    $query->free_result();

    while (mysqli_more_results($this->db->conn_id)) {
        mysqli_next_result($this->db->conn_id);
    }

    return $result;
}

    }
?>