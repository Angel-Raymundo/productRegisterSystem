<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ProductSystem extends CI_Controller
{

    public function getBrands()
    {
        $this->load->model('productStore/Brands_Model');

        $registerResult = $this->Brands_Model->getBrands();

        echo json_encode($registerResult);
    }

    public function getCpus()
    {
        $this->load->model('productStore/Cpus_Model');

        $registerResult = $this->Cpus_Model->getCpus();

        echo json_encode($registerResult);
    }

    public function getGraphCards()
    {
        $this->load->model('productStore/GraphCards_Model');

        $registerResult = $this->GraphCards_Model->getGraphCards();

        echo json_encode($registerResult);
    }

    public function getRams()
    {
        $this->load->model('productStore/RamMemories_Model');

        $registerResult = $this->RamMemories_Model->getRams();

        echo json_encode($registerResult);
    }

    public function addRamSize()
    {
        $ramSize = $this->input->post("ramSize");
        $this->load->model('productStore/RamMemories_Model');

        $registerResult = $this->RamMemories_Model->addRam($ramSize);

        echo json_encode($registerResult);
    }

    public function getDisks()
    {
        $this->load->model('productStore/HardDisks_Model');

        $registerResult = $this->HardDisks_Model->getDisks();

        echo json_encode($registerResult);
    }

    public function addDiskStorage()
    {
        $diskStorage = $this->input->post("diskStorage");
        $this->load->model('productStore/HardDisks_Model');

        $registerResult = $this->HardDisks_Model->addDisk($diskStorage);

        echo json_encode($registerResult);
    }

    public function getPCs()
    {
        $this->load->model('productStore/PCs_Model');

        $registerResult = $this->PCs_Model->getPCs();

        echo json_encode($registerResult);
    }

    public function addPC()
    {
        $pcName = $this->input->post("pcName");
        $pcBrand = $this->input->post("pcBrand");
        $pcGraph = $this->input->post("pcGraph");
        $pcRam = $this->input->post("pcRam");
        $pcCpu = $this->input->post("pcCpu");
        $pcPrice = $this->input->post("pcPrice");
        $this->load->model('productStore/PCs_Model');

        $registerResult = $this->PCs_Model->addPC($pcName, $pcBrand, $pcGraph, $pcRam, $pcCpu, $pcPrice);

        echo json_encode($registerResult);
    }

    public function addRelPcDisk()
    {
        $IdPC = $this->input->post("idPC");
        $IdDisk = $this->input->post("idDisk");
        $this->load->model('productStore/Rel_PC_Disk_Model');

        $registerResult = $this->Rel_PC_Disk_Model->addRelPcDisk($IdPC, $IdDisk);

        echo json_encode($registerResult);
    }
}
