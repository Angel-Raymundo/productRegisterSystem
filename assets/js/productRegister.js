$(document).ready(function () {
	getBrands();
    getCpus();
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

			// const options = response.map(
			// 	(item) => `<option value="${item.idBrand}">${item.brandName}</option>`,
			// );

			// $select.append(options.join(""));
		},
		error: function (xhr, status, error) {
			console.error("Error al obtener marcas:", error);
		},
	});
}