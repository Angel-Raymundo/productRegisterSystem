<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductRegister extends MY_Controller {

	public function index()
	{
		$this->load->view('productRegister/registerIndex');
	}
}
