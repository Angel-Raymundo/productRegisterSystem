<?php
class Users_Model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function userExists($userName, $email) {
    $userName = $this->db->escape_str($userName);
    $email    = $this->db->escape_str($email);

    $query = $this->db->query("CALL sp_userExists('$userName', '$email')");
    $row   = $query->row_array();

    while (mysqli_more_results($this->db->conn_id)) {
        mysqli_next_result($this->db->conn_id);
    }

    return $row['total'] > 0;
}

public function getUser($userName, $password) {
    $userName = $this->db->escape_str($userName);
    $password = $this->db->escape_str($password);

    $query = $this->db->query("CALL sp_getUsers('$userName', '$password')");
    $row   = $query->row_array();

    while (mysqli_more_results($this->db->conn_id)) {
        mysqli_next_result($this->db->conn_id);
    }

    return !empty($row) ? $row : false;
}

   public function addUser($userName, $email, $password) {
    $userName = $this->db->escape_str($userName);
    $email    = $this->db->escape_str($email);
    $password = $this->db->escape_str($password);

    $query = $this->db->query(
        "CALL sp_addUser('$userName', '$email', '$password', '2')"
    );

    $result = $query->result_array();
    $query->free_result();

    while (mysqli_more_results($this->db->conn_id)) {
        mysqli_next_result($this->db->conn_id);
    }

    return !empty($result) ? $result[0] : false;
}
}