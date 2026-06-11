<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ProductSystem extends CI_Controller
{

    public function getBrands()
    {
        $this->load->model('productStore/Brands_Model');
        echo json_encode($this->Brands_Model->getBrands());
    }

    public function getCpus()
    {
        $this->load->model('productStore/Cpus_Model');
        echo json_encode($this->Cpus_Model->getCpus());
    }

    public function getGraphCards()
    {
        $this->load->model('productStore/GraphCards_Model');
        echo json_encode($this->GraphCards_Model->getGraphCards());
    }

    public function getRams()
    {
        $this->load->model('productStore/RamMemories_Model');
        echo json_encode($this->RamMemories_Model->getRams());
    }

    public function addRamSize()
    {
        $ramSize = $this->input->post('ramSize');
        $this->load->model('productStore/RamMemories_Model');
        echo json_encode($this->RamMemories_Model->addRam($ramSize));
    }

    public function getDisks()
    {
        $this->load->model('productStore/HardDisks_Model');
        echo json_encode($this->HardDisks_Model->getDisks());
    }

    public function addDiskStorage()
    {
        $diskStorage = $this->input->post('diskStorage');
        $this->load->model('productStore/HardDisks_Model');
        echo json_encode($this->HardDisks_Model->addDisk($diskStorage));
    }

    public function getPCs()
    {
        $this->load->model('productStore/PCs_Model');
        echo json_encode($this->PCs_Model->getPCs());
    }

    public function addPC()
    {
        $pcName  = $this->input->post('pcName');
        $idBrand = $this->input->post('idBrand');
        $idGraph = $this->input->post('idGraph');
        $idRam   = $this->input->post('idRam');
        $idCpu   = $this->input->post('idCpu');
        $pcPrice = $this->input->post('pcPrice');

        $this->load->model('productStore/PCs_Model');
        echo json_encode($this->PCs_Model->addPC($pcName, $idBrand, $idGraph, $idRam, $idCpu, $pcPrice));
    }

    public function updatePC()
    {
        $idComputer = $this->input->post('idComputer');
        $pcName     = $this->input->post('pcName');
        $idBrand    = $this->input->post('idBrand');
        $idGraph    = $this->input->post('idGraph');
        $idRam      = $this->input->post('idRam');
        $idCpu      = $this->input->post('idCpu');
        $pcPrice    = $this->input->post('pcPrice');

        $this->load->model('productStore/PCs_Model');
        echo json_encode($this->PCs_Model->updatePC($idComputer, $pcName, $idBrand, $idGraph, $idRam, $idCpu, $pcPrice));
    }

    public function deletePC()
    {
        $idComputer = $this->input->post('idComputer');
        $this->load->model('productStore/PCs_Model');
        echo json_encode($this->PCs_Model->deletePC($idComputer));
    }

    public function addRelPcDisk()
    {
        $idPC   = $this->input->post('idPC');
        $idDisk = $this->input->post('idDisk');
        $this->load->model('productStore/Rel_PC_Disk_Model');
        echo json_encode($this->Rel_PC_Disk_Model->addRelPcDisk($idPC, $idDisk));
    }

    public function deleteRelPcDisk()
    {
        $idPC = $this->input->post('idPC');
        $this->load->model('productStore/Rel_PC_Disk_Model');
        echo json_encode($this->Rel_PC_Disk_Model->deleteRelByPC($idPC));
    }
}
