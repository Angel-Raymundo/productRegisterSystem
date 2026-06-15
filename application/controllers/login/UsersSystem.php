<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsersSystem extends CI_Controller {

    public function addUser() {
        $userName = $this->input->post("userName");
        $email    = $this->input->post("email");
        $password = $this->input->post("password");

        $this->load->model('login/Users_Model');

        $exists = $this->Users_Model->userExists($userName, $email);
        if ($exists) {
            echo json_encode(['success' => false, 'message' => 'user or email already registered.']);
            return;
        }

        $registerResult = $this->Users_Model->addUser($userName, $email, $password);

      if ($registerResult && isset($registerResult['idUser'])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error creating account.']);
}
    }

    public function authenticate() {
        $userName = trim($this->input->post("userName"));
        $password = $this->input->post("password");

        if (empty($userName) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'All fields are required.']);
            return;
        }

        $this->load->model('login/Users_Model');

        $user = $this->Users_Model->getUser($userName, $password);

        if ($user) {
            $this->session->set_userdata([
                'logged_in'    => true,
                'idUser'       => $user['idUser'],
                'userName'     => $user['userName'],
                'userType'     => $user['fk_idUserType'],
            ]);

            if ($user['fk_idUserType'] == 1) {
                echo json_encode(['success' => true, 'redirect' => base_url('products/ProductRegister/index')]);
            } else {
                echo json_encode(['success' => true, 'redirect' => base_url('pruebas/Ejercicios/index')]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
        }
    }

    public function logout() {
        $this->session->sess_destroy();
        redirect('login/Login/index');
    }
}