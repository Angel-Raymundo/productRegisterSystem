<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register System</title>
    <script> var base_url="<?php echo base_url();?>";</script>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>libraries/DataTables/datatables.min.css">
</head>
<body>
    <h1>Create your own PC</h1>
    <div>
        <select name="brands" id="slctBrand">
            <option value="default" disabled selected>--- Select a brand ---</option>
        </select>
        <select name="cpus" id="slctCpu">
            <option value="default" disabled selected>--- Select a Cpu ---</option>
        </select>
        <select name="graphCards" id="slctGraph">
            <option value="default" disabled selected>--- Select a Graph Card ---</option>
        </select>
    </div>

    <script src="<?php echo base_url(); ?>libraries/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="<?php echo base_url(); ?>libraries/jquery/jquery.js"></script>
    <script src="<?php echo base_url(); ?>libraries/DataTables/datatables.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/productRegister.js"></script>
</body>
</html>