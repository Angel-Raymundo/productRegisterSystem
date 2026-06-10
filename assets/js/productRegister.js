$(document).ready(function () {
	$("#createRam").hide();
	$("#slctRam").hide();
	$("#createDisk").hide();
	$("#slctDisk").hide();
	$("#btnAddDisk").hide();
	getBrands();
	getCpus();
	getGraphCards();
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

$("#ramOptions").on('change', function () {
	var opt = parseInt($(this).val());

	if (opt == 1) {
		$("#slctRam").show();
		$("#createRam").hide();

	}

	if (opt == 2) {
		$("#slctRam").hide();
		$("#createRam").show();

	}

});

$("#slctDiskOptions").on('change', function () {
	var opt = parseInt($(this).val());
	console.log("Discoooooooooooos", opt)
	var diskNumber = parseInt($("#diskNumber").val());
	var disks = $("#disks").children().length;

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
	var opt = parseInt($("#slctDiskOptions").val());

if (opt == 1) {
	var val = $("#slctDisk").val();
		$("#disks").append(`<label">${val}</label>`)
	}

	if (opt == 2) {
		var val = $("#createDisk").val();
		$("#disks").append(`<label">${val}</label>`)
	}

	

	var diskNumber = parseInt($("#diskNumber").val());
	var disks = $("#disks").children().length;

	if (diskNumber == disks) {
		$("#btnAddDisk").hide();
	}
});