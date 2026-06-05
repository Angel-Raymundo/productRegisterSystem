<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Ejercicios</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>libraries/bootstrap/css/bootstrap.min.css">
	<style>
		#piraResul,
		#lblCantidad {
			font-family: monospace;
			font-size: 16px;
			display: block;
			white-space: pre-wrap;
		}
	</style>
</head>

<body class="bg-light">
	<div class="container my-5">

		<div class="text-center mb-5">
			<h1 class="display-4 font-weight-bold text-primary">Página de Ejercicios</h1>
			<p class="text-muted">Prácticas de lógica y programación</p>
		</div>

		<div class="row justify-content-center">

			<div class="col-md-10 col-lg-8">

				<div class="card shadow-sm mb-4">
					<div class="card-body">
						<h3 class="card-title text-secondary h5 mb-3">Operaciones</h3>
						<div class="form-inline justify-content-center flex-wrap" style="gap: 10px;">
							<select name="tipoOpe" id="tipoOpe" class="form-control">
								<option value="suma">Suma</option>
								<option value="resta">Resta</option>
								<option value="multi">Multiplicación</option>
								<option value="divi">División</option>
							</select>
							<input type="text" name="numero" id="num1" class="form-control text-center" style="width: 80px;" placeholder="0">
							<input type="text" name="numero" id="num2" class="form-control text-center" style="width: 80px;" placeholder="0">
							<button id="opeBtn" class="btn btn-primary">Calcular</button>
						</div>
						<div class="text-center mt-3">
							<span class="badge badge-success p-2 px-3" id="resul">Esperando operación...</span>
						</div>
					</div>
				</div>

				<div class="card shadow-sm mb-4">
					<div class="card-body">
						<h3 class="card-title text-secondary h5 mb-3">Conversiones</h3>
						<div class="form-inline justify-content-center flex-wrap" style="gap: 10px;">
							<select name="conv1" id="conv1" class="form-control">
								<option value="dec">Decimal</option>
								<option value="bin">Binario</option>
								<option value="hex">Hexadecimal</option>
								<option value="oct">Octal</option>
							</select>
							<span class="text-muted">a</span>
							<select name="conv2" id="conv2" class="form-control">
								<option value="dec">Decimal</option>
								<option value="bin">Binario</option>
								<option value="hex">Hexadecimal</option>
								<option value="oct">Octal</option>
							</select>
							<input type="text" name="base" id="convBase" class="form-control text-center" style="width: 120px;" placeholder="Valor">
							<button id="convBtn" class="btn btn-primary">Calcular</button>
						</div>
						<div class="text-center mt-3">
							<span class="badge badge-info p-2 px-3" id="convResul">Esperando conversión...</span>
						</div>
					</div>
				</div>

				<div class="card shadow-sm mb-4">
					<div class="card-body">
						<h3 class="card-title text-secondary h5 mb-3">Fibonacci</h3>
						<div class="form-inline justify-content-center flex-wrap" style="gap: 10px;">
							<input type="text" name="fibo" id="fibo" class="form-control text-center" style="width: 150px;" placeholder="Límite o posición">
							<button id="fiboBtn" class="btn btn-primary">Calcular</button>
						</div>
						<div class="text-center mt-3">
							<div id="fiboResul" class="alert alert-secondary d-inline-block m-0 py-2 px-3">Resultado...</div>
						</div>
					</div>
				</div>

				<div class="card shadow-sm mb-4">
					<div class="card-body">
						<h3 class="card-title text-secondary h5 mb-3">Pirámides</h3>
						<div class="form-inline justify-content-center flex-wrap mb-3" style="gap: 10px;">
							<input type="text" name="pira" id="pira" class="form-control text-center" style="width: 120px;" placeholder="Ej: 5 o -5">
							<button id="piraBtn" class="btn btn-primary">Crear</button>
						</div>
						<div class="d-flex justify-content-center">
							<div id="piraResul" class="bg-dark text-warning p-3 rounded text-left d-inline-block"></div>
						</div>
					</div>
				</div>

				<div class="card shadow-sm mb-4">
					<div class="card-body">
						<h3 class="card-title text-secondary h5 mb-3">Ordenar Cantidades</h3>

						<div class="form-inline justify-content-center flex-wrap mb-3" style="gap: 10px;">
							<input type="text" name="cant" id="cant" class="form-control text-center" style="width: 120px;" placeholder="Número">
							<select name="orden" id="orden" class="form-control">
								<option value="asc">Ascendente</option>
								<option value="desc">Descendente</option>
							</select>
							<button id="agregarBtn" class="btn btn-success">Agregar</button>
							<button id="ordenarBtn" class="btn btn-primary">Ordenar</button>
							<button id="limpiarBtn" class="btn btn-danger">Limpiar</button>
						</div>

						<div class="text-center">
							<div id="alerta" class="text-danger small mb-2 font-weight-bold"></div>
							<div id="lblCantidad" class="alert alert-warning d-inline-block m-0 py-2 px-3"></div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
	<script src="<?php echo base_url(); ?>libraries/jquery/jquery.js"></script>
	<script src="<?php echo base_url(); ?>assets/js/ejercicios.js"></script>
</body>

</html>