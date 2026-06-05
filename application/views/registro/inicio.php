<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script> var base_url="<?php echo base_url();?>";</script>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>libraries/DataTables/datatables.min.css">
</head>
<body class="bg-light">
    <div class="container mt-5">

        <div class="row justify-content-center">
            <div class="col-md-8">

                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Registro de Personas</h4>
                    </div>

                    <div class="card-body">

                        <div class="form-row">
                            <div class="col-md-9">
                                <input
                                    type="text"
                                    id="txt-nombre"
                                    class="form-control"
                                    placeholder="Ingrese un nombre">
                            </div>

                            <div class="col-md-3">
                                <button
                                    id="btn-registrar"
                                    class="btn btn-success btn-block">
                                    Registrar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="card shadow mt-4">

                    <div class="card-header bg-dark text-white">
                        <h5 class="mb-0">Usuarios Registrados</h5>
                    </div>

                    <div class="card-body">

                        <div class="table-responsive">

                            <table id="tablaPersonas" class="table table-striped table-hover table-bordered mb-0">

                                <thead class="thead-dark">
                                    <tr>
                                        <th width="100">ID</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>

                                <tbody id="tblPersonas">
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    </div>


    <script src="<?php echo base_url(); ?>libraries/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="<?php echo base_url(); ?>libraries/jquery/jquery.js"></script>
    <script src="<?php echo base_url(); ?>libraries/DataTables/datatables.min.js"></script>
	<script src="<?php echo base_url(); ?>assets/js/registro.js"></script>
</body>
</html>