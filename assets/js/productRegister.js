$(document).ready(function () {
	$("#createRam").hide();
	$("#slctRam").hide();
	$("#createDisk").hide();
	$("#slctDisk").hide();
	$("#btnAddDisk").hide();
	$("#btnAddRam").hide();
	getBrands();
	getCpus();
	getGraphCards();
	getRams();
	getHardDisks();
});

function getBrands() {
	const $select = $("#slctBrand");

	$.ajax({
		url: `${base_url}products/ProductSystem/getBrands`,
		type: "POST",
		dataType: "json",

		success: function (response) {
			console.log(response);

			const options = response.map(
				(item) => `<option value="${item.idBrand}">${item.brandName}</option>`,
			);

			$select.append(options.join(""));
		},
		error: function (xhr, status, error) {
			console.error("Error al obtener marcas:", error);
		},
	});
}

function getCpus() {
	const $select = $("#slctCpu");

	$.ajax({
		url: `${base_url}products/ProductSystem/getCpus`,
		type: "POST",
		dataType: "json",

		success: function (response) {
			console.log(response);

			const options = response.map(
				(item) => `<option value="${item.idCpu}">${item.cpuName}</option>`,
			);

			$select.append(options.join(""));
		},
		error: function (xhr, status, error) {
			console.error("Error al obtener CPUs:", error);
		},
	});
}

function getGraphCards() {
	const $select = $("#slctGraph");

	$.ajax({
		url: `${base_url}products/ProductSystem/getGraphCards`,
		type: "POST",
		dataType: "json",

		success: function (response) {
			console.log(response);

			const options = response.map(
				(item) => `<option value="${item.idGraphCard}">${item.graphName}</option>`,
			);

			$select.append(options.join(""));
		},
		error: function (xhr, status, error) {
			console.error("Error al obtener CPUs:", error);
		},
	});
}

function getRams(){
	const $select = $("#slctRam");

	$.ajax({
		url: `${base_url}products/ProductSystem/getRams`,
		type: "POST",
		dataType: "json",

		success: function (response) {
			console.log(response);

			const options = response.map(
				(item) => `<option value="${item.idRam}">${item.size}</option>`,
			);

			$select.append(options.join(""));
		},
		error: function (xhr, status, error) {
			console.error("Error al obtener RAMs:", error);
		},
	});
}

function addPC(name, idBrand, idGraph, idRam, idCpu, pcPrice){
	$.ajax({
		url: `${base_url}products/ProductSystem/addPc`,
		type: "POST",
		dataType: "json",
		data:{
			"pcName": name,
			"idBrand": idBrand,
			"idGraph": idGraph,
			"idRam": idRam,
			"idCpu": idCpu,
			"pcPrice": pcPrice,
		},
		success: function (response) {
			console.log("add PC",response)
		},
		error: function (xhr, status, error) {
			console.log("Error en la petición: " + error);
		},
		complete: function () {
			console.log("Petición finalizada."); 
		},
	});
}

function getHardDisks(){
	const $select = $("#slctDisk");

	$.ajax({
		url: `${base_url}products/ProductSystem/getDisks`,
		type: "POST",
		dataType: "json",

		success: function (response) {
			console.log(response);

			const options = response.map(
				(item) => `<option value="${item.idDisk}">${item.diskStorage}</option>`,
			);

			$select.append(options.join(""));
		},
		error: function (xhr, status, error) {
			console.error("Error al obtener Disks:", error);
		},
	});
}


$("#slctBrand").on('change', function(){
	let brand = $("#slctBrand option:selected").text();
	$("#tdBrand").text(brand);
});

$("#slctCpu").on('change', function(){
	let cpu = $("#slctCpu option:selected").text();
	$("#tdCpu").text(cpu);
});

$("#slctGraph").on('change', function(){
	let graph = $("#slctGraph option:selected").text();
	$("#tdGraph").text(graph);
});

$("#slctRamOptions").on('change', function () {
	let opt = parseInt($(this).val());

	if (opt == 1) {
		$("#slctRam").show();
		$("#createRam").hide();
	}

	if (opt == 2) {
		$("#slctRam").hide();
		$("#createRam").show();
	}

	$("#btnAddRam").show();
});

$("#btnAddRam").on('click', function () {
	let opt = parseInt($("#slctRamOptions").val());

if (opt == 1) {
	let val = $("#slctRam").val();
		$("#tdRam").append(`<label">${val}</label>`)
	}

	if (opt == 2) {
		let val = $("#createRam").val();
		$("#tdRam").text(val);
	}

});

$("#slctDiskOptions").on('change', function () {
	let opt = parseInt($(this).val());
	let diskNumber = parseInt($("#diskNumber").val());
	let disks = $("#tdDisk").children().length;

	if (diskNumber != disks) {
		$("#btnAddDisk").show();
	}

	if (opt == 1) {
		$("#slctDisk").show();
		$("#createDisk").hide();
	}

	if (opt == 2) {
		$("#slctDisk").hide();
		$("#createDisk").show();
	}

});

$("#btnAddDisk").on('click', function () {
	let opt = parseInt($("#slctDiskOptions").val());

if (opt == 1) {
	let val = $("#slctDisk").val();
		$("#tdDisk").append(`<label">${val}</label>`)
	}

	if (opt == 2) {
		let val = $("#createDisk").val();
		$("#tdDisk").append(`<label">${val}</label><br>`)
	}

	

	let diskNumber = parseInt($("#diskNumber").val());
	let disks = $("#tdDisk").children().length;

	if (diskNumber == disks) {
		$("#btnAddDisk").hide();
	}
});

