<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductSystem extends CI_Controller {

	public function getBrands(){
        $this->load->model('productStore/Brands_Model');

        $registerResult = $this->Brands_Model->getBrands();
    
        echo json_encode($registerResult);
    }

	public function getCpus(){
        $this->load->model('productStore/Cpus_Model');

        $registerResult = $this->Cpus_Model->getCpus();
    
        echo json_encode($registerResult);
    }

    	public function getGraphCards(){
        $this->load->model('productStore/GraphCards_Model');

        $registerResult = $this->GraphCards_Model->getGraphCards();
    
        echo json_encode($registerResult);
    }
}
