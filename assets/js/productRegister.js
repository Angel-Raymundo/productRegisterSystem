var editMode = false;
var editPcId = null;
var ramSelected = null;
var disksAdded = [];

var dtPCs = null;

$(document).ready(function () {

	$("#wrapSlctRam").hide();
	$("#wrapCreateRam").hide();
	$("#wrapBtnRam").hide();
	$("#wrapDiskOptions").hide();
	$("#wrapSlctDisk").hide();
	$("#wrapCreateDisk").hide();
	$("#wrapBtnDisk").hide();
	$("#btnCancelEdit").hide();

	getBrands();
	getCpus();
	getGraphCards();
	getRams();
	getHardDisks();

	initPCsTable();
	loadPCs();

	bindFormEvents();
});

function bindFormEvents() {

	$("#txtPcName").on("input", function () {
		var val = $("#txtPcName").val().trim();
		$("#tdName").text(val || "—");
	});

	$("#txtPrice").on("input", function () {
		var val = parseFloat($(this).val());
		$("#tdPrice").text(isNaN(val) ? "—" : "$" + val.toFixed(2));
	});

	$("#slctBrand").on("change", function () {
		$("#tdBrand").text($(this).find("option:selected").text());
	});

	$("#slctCpu").on("change", function () {
		$("#tdCpu").text($(this).find("option:selected").text());
	});

	$("#slctGraph").on("change", function () {
		$("#tdGraph").text($(this).find("option:selected").text());
	});

	$("#slctRamOptions").on("change", function () {
		var opt = parseInt($(this).val());
		ramSelected = null;
		$("#tdRam").text("—");

		if (opt === 1) {
			$("#wrapSlctRam").show();
			$("#wrapCreateRam").hide();
		} else {
			$("#wrapSlctRam").hide();
			$("#wrapCreateRam").show();
		}
		$("#wrapBtnRam").show();
	});

	$("#btnAddRam").on("click", function () {
		var opt = parseInt($("#slctRamOptions").val());

		if (opt === 1) {
			var id = $("#slctRam").val();
			var text = $("#slctRam option:selected").text();
			if (!id || id === "") {
				showWarning("Please select a RAM from the list.");
				return;
			}
			ramSelected = { id: id, text: text };

		} else {
			var size = parseInt($("#createRam").val());
			if (isNaN(size) || size <= 0) {
				showWarning("Please enter a valid RAM size (number greater than 0).");
				return;
			}
			ramSelected = { id: null, text: size + " GB", newSize: size };
		}

		$("#tdRam").text(ramSelected.text);
		showSuccess("RAM confirmed: " + ramSelected.text);
	});

	$("#diskNumber").on("input", function () {
		var n = parseInt($(this).val());
		disksAdded = [];
		renderDisksPreview();

		if (!isNaN(n) && n >= 1) {
			$("#wrapDiskOptions").show();
		} else {
			$("#wrapDiskOptions").hide();
			$("#wrapSlctDisk").hide();
			$("#wrapCreateDisk").hide();
			$("#wrapBtnDisk").hide();
		}
	});

	$("#slctDiskOptions").on("change", function () {
		var opt = parseInt($(this).val());

		if (opt === 1) {
			$("#wrapSlctDisk").show();
			$("#wrapCreateDisk").hide();
		} else {
			$("#wrapSlctDisk").hide();
			$("#wrapCreateDisk").show();
		}

		var diskNumber = parseInt($("#diskNumber").val());
		if (disksAdded.length < diskNumber) {
			$("#wrapBtnDisk").show();
		}
	});

	$("#btnAddDisk").on("click", function () {
		var opt = parseInt($("#slctDiskOptions").val());
		var diskNumber = parseInt($("#diskNumber").val());

		if (isNaN(diskNumber) || diskNumber <= 0) {
			showWarning("Please indicate how many disks the PC will have.");
			return;
		}

		if (disksAdded.length >= diskNumber) {
			showWarning("You have already added the maximum number of disks (" + diskNumber + ").");
			return;
		}

		if (opt === 1) {
			var id = $("#slctDisk").val();
			var text = $("#slctDisk option:selected").text();
			if (!id || id === "") {
				showWarning("Please select a disk from the list.");
				return;
			}
			var existe = disksAdded.some(function (d) { return d.id === id && d.id !== null; });
			if (existe) {
				showWarning("This disk has already been added.");
				return;
			}
			disksAdded.push({ id: id, text: text });

		} else {
			var storage = parseInt($("#createDisk").val());
			if (isNaN(storage) || storage <= 0) {
				showWarning("Please enter a valid disk capacity (number greater than 0).");
				return;
			}
			disksAdded.push({ id: null, text: storage + " GB", newStorage: storage });
		}

		renderDisksPreview();

		if (disksAdded.length >= diskNumber) {
			$("#wrapBtnDisk").hide();
			showSuccess("All disks have been added.");
		}
	});

	$("#btnCreatePC").on("click", function () {
		if (editMode) {
			updatePC();
		} else {
			createPC();
		}
	});

	$("#btnCancelEdit").on("click", function () {
		cancelEdit();
	});

	$("#btnConfirmDelete").on("click", function () {
		var id = $(this).data("id");
		deletePC(id);
	});
}

function renderDisksPreview() {
	var $td = $("#tdDisk");
	$td.empty();

	if (disksAdded.length === 0) {
		$td.text("—");
		return;
	}

	disksAdded.forEach(function (disk, index) {
		var badge = $('<span class="badge badge-secondary disk-badge mr-1"></span>')
			.text(disk.text);
		var removeBtn = $('<span class="remove-disk text-danger" title="Remove">✕</span>');
		removeBtn.on("click", function () {
			disksAdded.splice(index, 1);
			renderDisksPreview();
			var diskNumber = parseInt($("#diskNumber").val());
			if (disksAdded.length < diskNumber) {
				$("#wrapBtnDisk").show();
			}
		});
		badge.append(removeBtn);
		$td.append(badge);
	});
}

function validateForm() {
	var errors = [];

	if (!$("#txtPcName").val().trim()) {
		errors.push("PC Name is required.");
	}
	if (!$("#slctBrand").val()) {
		errors.push("Please select a brand.");
	}
	if (!$("#slctCpu").val()) {
		errors.push("Please select a CPU.");
	}
	if (!$("#slctGraph").val()) {
		errors.push("Please select a graphics card.");
	}
	if (!ramSelected) {
		errors.push("Please confirm the RAM (click 'Confirm RAM').");
	}

	var diskNumber = parseInt($("#diskNumber").val());
	if (isNaN(diskNumber) || diskNumber <= 0) {
		errors.push("Please indicate the number of hard disks (minimum 1).");
	} else if (disksAdded.length < diskNumber) {
		errors.push("Missing disks to add (" + disksAdded.length + "/" + diskNumber + " added).");
	}

	var price = parseFloat($("#txtPrice").val());
	if (isNaN(price) || price <= 0) {
		errors.push("Please enter a valid price greater than 0.");
	}

	if (errors.length > 0) {
		Swal.fire({
			icon: "warning",
			title: "Incomplete Fields",
			html: "<ul class='text-left'><li>" + errors.join("</li><li>") + "</li></ul>",
		});
		return false;
	}
	return true;
}

function createPC() {
	if (!validateForm()) return;

	setBtnLoading(true);

	if (ramSelected.id === null) {
		addNewRam(ramSelected.newSize, function (newRamId) {
			ramSelected.id = newRamId;
			doAddPC();
		});
	} else {
		doAddPC();
	}
}

function doAddPC() {
	var pcName = $("#txtPcName").val().trim();
	var idBrand = $("#slctBrand").val();
	var idGraph = $("#slctGraph").val();
	var idRam = ramSelected.id;
	var idCpu = $("#slctCpu").val();
	var pcPrice = parseFloat($("#txtPrice").val());

	$.ajax({
		url: base_url + "products/ProductSystem/addPC",
		type: "POST",
		dataType: "json",
		data: {
			pcName: pcName,
			idBrand: idBrand,
			idGraph: idGraph,
			idRam: idRam,
			idCpu: idCpu,
			pcPrice: pcPrice,
		},
		success: function (response) {
			if (response && response[0] && response[0].idComputer) {
				var newPcId = response[0].idComputer;
				addDisksSequentially(newPcId, disksAdded.slice(), function () {
					setBtnLoading(false);
					Swal.fire({
						icon: "success",
						title: "PC Created!",
						text: "The PC was successfully registered.",
						timer: 2000,
						showConfirmButton: false,
					});
					resetForm();
					loadPCs();
				});
			} else {
				setBtnLoading(false);
				showError("Could not retrieve the created PC ID. Please check the server.");
			}
		},
		error: function (xhr, status, error) {
			setBtnLoading(false);
			showError("Error creating PC: " + error);
		},
	});
}

function addDisksSequentially(pcId, diskQueue, onComplete) {
	if (diskQueue.length === 0) {
		onComplete();
		return;
	}

	var disk = diskQueue.shift();

	if (disk.id === null) {
		addNewDisk(disk.newStorage, function (newDiskId) {
			linkDiskToPC(pcId, newDiskId, function () {
				addDisksSequentially(pcId, diskQueue, onComplete);
			});
		});
	} else {
		linkDiskToPC(pcId, disk.id, function () {
			addDisksSequentially(pcId, diskQueue, onComplete);
		});
	}
}

function addNewRam(size, onSuccess) {
	$.ajax({
		url: base_url + "products/ProductSystem/addRamSize",
		type: "POST",
		dataType: "json",
		data: { ramSize: size },
		success: function (response) {
			if (response && response[0] && response[0].idRam) {
				$("#slctRam").append(
					'<option value="' + response[0].idRam + '">' + response[0].size + ' GB</option>'
				);
				onSuccess(response[0].idRam);
			} else {
				showError("Error creating RAM.");
				setBtnLoading(false);
			}
		},
		error: function (xhr, status, error) {
			showError("Error creating RAM: " + error);
			setBtnLoading(false);
		},
	});
}

function addNewDisk(storage, onSuccess) {
	$.ajax({
		url: base_url + "products/ProductSystem/addDiskStorage",
		type: "POST",
		dataType: "json",
		data: { diskStorage: storage },
		success: function (response) {
			if (response && response[0] && response[0].idDisk) {
				$("#slctDisk").append(
					'<option value="' + response[0].idDisk + '">' + response[0].diskStorage + ' GB</option>'
				);
				onSuccess(response[0].idDisk);
			} else {
				showError("Error creating disk.");
				setBtnLoading(false);
			}
		},
		error: function (xhr, status, error) {
			showError("Error creating disk: " + error);
			setBtnLoading(false);
		},
	});
}

function linkDiskToPC(pcId, diskId, onSuccess) {
	$.ajax({
		url: base_url + "products/ProductSystem/addRelPcDisk",
		type: "POST",
		dataType: "json",
		data: { idPC: pcId, idDisk: diskId },
		success: function (response) {
			onSuccess();
		},
		error: function (xhr, status, error) {
			console.error("Error linking disk " + diskId + ": " + error);
			onSuccess();
		},
	});
}

function getBrands() {
	$.ajax({
		url: base_url + "products/ProductSystem/getBrands",
		type: "POST",
		dataType: "json",
		success: function (response) {
			var options = response.map(function (item) {
				return '<option value="' + item.idBrand + '">' + item.brandName + '</option>';
			});
			$("#slctBrand").append(options.join(""));
		},
		error: function () { console.error("Error retrieving brands"); },
	});
}

function getCpus() {
	$.ajax({
		url: base_url + "products/ProductSystem/getCpus",
		type: "POST",
		dataType: "json",
		success: function (response) {
			var options = response.map(function (item) {
				return '<option value="' + item.idCpu + '">' + item.cpuName + '</option>';
			});
			$("#slctCpu").append(options.join(""));
		},
		error: function () { console.error("Error retrieving CPUs"); },
	});
}

function getGraphCards() {
	$.ajax({
		url: base_url + "products/ProductSystem/getGraphCards",
		type: "POST",
		dataType: "json",
		success: function (response) {
			var options = response.map(function (item) {
				return '<option value="' + item.idGraphCard + '">' + item.graphName + '</option>';
			});
			$("#slctGraph").append(options.join(""));
		},
		error: function () { console.error("Error retrieving graphics cards"); },
	});
}

function getRams() {
	$.ajax({
		url: base_url + "products/ProductSystem/getRams",
		type: "POST",
		dataType: "json",
		success: function (response) {
			var options = response.map(function (item) {
				return '<option value="' + item.idRam + '">' + item.size + ' GB</option>';
			});
			$("#slctRam").append(options.join(""));
		},
		error: function () { console.error("Error retrieving RAMs"); },
	});
}

function getHardDisks() {
	$.ajax({
		url: base_url + "products/ProductSystem/getDisks",
		type: "POST",
		dataType: "json",
		success: function (response) {
			var options = response.map(function (item) {
				return '<option value="' + item.idDisk + '">' + item.diskStorage + ' GB</option>';
			});
			$("#slctDisk").append(options.join(""));
		},
		error: function () { console.error("Error retrieving disks"); },
	});
}

function initPCsTable() {
	dtPCs = $("#tblPCs").DataTable({
		language: {
			url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/en-GB.json",
		},
		columns: [
			{ data: "idComputer" },
			{ data: "computerName" },
			{ data: "brandName" },
			{ data: "cpuName" },
			{ data: "graphName" },
			{ data: "ramSize", render: function (d) { return d + " GB"; } },
			{ data: "disks" },
			{ data: "price", render: function (d) { return "$" + parseFloat(d).toFixed(2); } },
			{ data: "registerDate" },
			{
				data: null,
				orderable: false,
				render: function (row) {
					return (
						'<button class="btn btn-sm btn-warning mr-1 btn-edit" data-id="' + row.idComputer + '" title="Edit">' +
						'Edit</button>' +
						'<button class="btn btn-sm btn-danger btn-delete" data-id="' + row.idComputer + '" data-name="' + row.computerName + '" title="Delete">' +
						'Delete</button>'
					);
				},
			},
		],
		order: [[0, "desc"]],
	});

	$("#tblPCs tbody").on("click", ".btn-edit", function () {
		var id = $(this).data("id");
		startEdit(id);
	});

	$("#tblPCs tbody").on("click", ".btn-delete", function () {
		var id = $(this).data("id");
		var name = $(this).data("name");
		$("#modalPcName").text(name);
		$("#btnConfirmDelete").data("id", id);
		$("#modalDelete").modal("show");
	});
}

function loadPCs() {
	$.ajax({
		url: base_url + "products/ProductSystem/getPCs",
		type: "POST",
		dataType: "json",
		success: function (response) {
			var pcsMap = {};
			response.forEach(function (row) {
				if (!pcsMap[row.idComputer]) {
					pcsMap[row.idComputer] = {
						idComputer: row.idComputer,
						computerName: row.computerName,
						brandName: row.brandName,
						graphName: row.graphName,
						ramSize: row.ramSize,
						cpuName: row.cpuName,
						price: row.price,
						registerDate: row.registerDate,
						diskIds: [],
						disks: [],
					};
				}
				if (row.diskStorage) {
					pcsMap[row.idComputer].diskIds.push(row.idDisk);
					pcsMap[row.idComputer].disks.push(row.diskStorage + " GB");
				}
			});

			var rows = Object.values(pcsMap).map(function (pc) {
				pc.disks = pc.disks.length ? pc.disks.join(", ") : "No disks";
				return pc;
			});

			dtPCs.clear().rows.add(rows).draw();
		},
		error: function (xhr, status, error) {
			showError("Error loading PC list: " + error);
		},
	});
}

function startEdit(pcId) {
	var allRows = dtPCs.rows().data().toArray();
	var pc = allRows.find(function (r) { return r.idComputer == pcId; });

	if (!pc) {
		showError("Record not found.");
		return;
	}

	editMode = true;
	editPcId = pcId;

	$("#formTitle").html("Editing PC: <em>" + pc.computerName + "</em>");
	$("#btnCreatePC").text("Save changes").removeClass("btn-success").addClass("btn-primary");
	$("#btnCancelEdit").show();

	$("#txtPcName").val(pc.computerName).trigger("input");
	$("#txtPrice").val(parseFloat(pc.price)).trigger("input");

	setSelectValue("#slctBrand", pc.brandName, "text");
	setSelectValue("#slctCpu", pc.cpuName, "text");
	setSelectValue("#slctGraph", pc.graphName, "text");

	ramSelected = { id: null, text: pc.ramSize + " GB" };
	$("#slctRam option").each(function () {
		if ($(this).text().trim() === pc.ramSize + " GB") {
			ramSelected.id = $(this).val();
		}
	});
	$("#tdRam").text(pc.ramSize + " GB");

	disksAdded = [];
	if (pc.diskIds && pc.diskIds.length) {
		var diskTexts = pc.disks !== "No disks" ? pc.disks.split(", ") : [];
		pc.diskIds.forEach(function (diskId, i) {
			disksAdded.push({ id: String(diskId), text: diskTexts[i] || diskId });
		});
	}
	renderDisksPreview();

	$("html, body").animate({ scrollTop: 0 }, 400);

	Swal.fire({
		icon: "info",
		title: "Edit Mode",
		text: "Modify fields and press 'Save changes'.",
		timer: 2500,
		showConfirmButton: false,
	});
}

// Helper: seleccionar option por texto visible
function setSelectValue(selector, text, by) {
	$(selector + " option").each(function () {
		if ($(this).text().trim() === text.trim()) {
			$(selector).val($(this).val()).trigger("change");
			return false;
		}
	});
}

function updatePC() {
	if (!validateForm()) return;
	setBtnLoading(true);

	var step = function (onRamReady) {
		if (ramSelected.id === null) {
			addNewRam(ramSelected.newSize, function (newId) {
				ramSelected.id = newId;
				onRamReady();
			});
		} else {
			onRamReady();
		}
	};

	step(function () {
		$.ajax({
			url: base_url + "products/ProductSystem/updatePC",
			type: "POST",
			dataType: "json",
			data: {
				idComputer: editPcId,
				pcName:  $("#txtPcName").val().trim(),
				idBrand: $("#slctBrand").val(),
				idGraph: $("#slctGraph").val(),
				idRam: ramSelected.id,
				idCpu: $("#slctCpu").val(),
				pcPrice: parseFloat($("#txtPrice").val()),
			},
			success: function (response) {
				$.ajax({
					url: base_url + "products/ProductSystem/deleteRelPcDisk",
					type: "POST",
					dataType: "json",
					data: { idPC: editPcId },
					complete: function () {
						addDisksSequentially(editPcId, disksAdded.slice(), function () {
							setBtnLoading(false);
							Swal.fire({
								icon: "success",
								title: "PC Updated!",
								timer: 2000,
								showConfirmButton: false,
							});
							cancelEdit();
							loadPCs();
						});
					},
				});
			},
			error: function (xhr, status, error) {
				setBtnLoading(false);
				showError("Error updating PC: " + error);
			},
		});
	});
}

function deletePC(pcId) {
	$.ajax({
		url: base_url + "products/ProductSystem/deletePC",
		type: "POST",
		dataType: "json",
		data: { idComputer: pcId },
		success: function (response) {
			$("#modalDelete").modal("hide");
			Swal.fire({
				icon: "success",
				title: "PC Deleted",
				text: "The record has been deactivated.",
				timer: 2000,
				showConfirmButton: false,
			});
			loadPCs();
		},
		error: function (xhr, status, error) {
			$("#modalDelete").modal("hide");
			showError("Error deleting PC: " + error);
		},
	});
}

function cancelEdit() {
	editMode = false;
	editPcId = null;
	resetForm();
	$("#formTitle").html("Create New PC");
	$("#btnCreatePC").text("Create PC").removeClass("btn-primary").addClass("btn-success");
	$("#btnCancelEdit").hide();
}

function resetForm() {
	$("#txtPcName").val("");
	$("#txtPrice").val("");

	$("#slctBrand").val("").trigger("change");
	$("#slctCpu").val("").trigger("change");
	$("#slctGraph").val("").trigger("change");
	$("#slctRamOptions").val("");
	$("#slctRam").val("");
	$("#slctDiskOptions").val("");
	$("#slctDisk").val("");
	$("#diskNumber").val("");
	$("#createRam").val("");
	$("#createDisk").val("");

	ramSelected = null;
	disksAdded = [];

	$("#wrapSlctRam").hide();
	$("#wrapCreateRam").hide();
	$("#wrapBtnRam").hide();
	$("#wrapDiskOptions").hide();
	$("#wrapSlctDisk").hide();
	$("#wrapCreateDisk").hide();
	$("#wrapBtnDisk").hide();

	$("#tdName").text("—");
	$("#tdBrand").text("—");
	$("#tdCpu").text("—");
	$("#tdGraph").text("—");
	$("#tdRam").text("—");
	$("#tdDisk").text("—");
	$("#tdPrice").text("—");
}

function setBtnLoading(loading) {
	if (loading) {
		$("#btnCreatePC").prop("disabled", true).text("Processing...");
	} else {
		var label = editMode ? "Save changes" : "Create PC";
		$("#btnCreatePC").prop("disabled", false).text(label);
	}
}

function showWarning(msg) {
	Swal.fire({ icon: "warning", title: "Warning", text: msg });
}

function showError(msg) {
	Swal.fire({ icon: "error", title: "Error", text: msg });
}

function showSuccess(msg) {
	Swal.fire({ icon: "success", title: "Success", text: msg, timer: 1500, showConfirmButton: false });
}
