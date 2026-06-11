<?php
class Rel_PC_Disk_Model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function addRelPcDisk($IdPC, $IdDisk)
    {
        $query  = $this->db->query(
            "call sp_addRelPcDisk(?, ?);",
            array($IdPC, $IdDisk)
        );
        $result = $query->result_array();
        $query->free_result();
        while (mysqli_more_results($this->db->conn_id)) {
            mysqli_next_result($this->db->conn_id);
        }
        return $result;
    }

    public function deleteRelByPC($IdPC)
    {
        $query  = $this->db->query(
            "call sp_deleteRelPcDisk(?);",
            array($IdPC)
        );
        $result = $query->result_array();
        $query->free_result();
        while (mysqli_more_results($this->db->conn_id)) {
            mysqli_next_result($this->db->conn_id);
        }
        return $result;
    }
}
