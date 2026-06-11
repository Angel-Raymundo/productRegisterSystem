<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register System</title>
    <script>
        var base_url = "<?php echo base_url(); ?>";
    </script>
    <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/DataTables/datatables.min.css">
    <style>
        body {
            padding: 20px;
            background: #f8f9fa;
        }

        .section-card {
            background: #fff;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
        }

        .section-card h4 {
            font-weight: 600;
            margin-bottom: 18px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 8px;
            color: #343a40;
        }

        .preview-table th {
            background: #343a40;
            color: #fff;
        }

        .preview-table td {
            vertical-align: middle;
        }

        #tdDisk .badge,
        #tdRam .badge {
            margin: 2px;
            font-size: .85rem;
        }

        .disk-badge {
            position: relative;
        }

        .disk-badge .remove-disk {
            cursor: pointer;
            margin-left: 4px;
            font-weight: bold;
        }

        #tblPCs_wrapper .dataTables_filter input {
            border-radius: 4px;
            border: 1px solid #ced4da;
            padding: 4px 8px;
        }

        .status-badge {
            font-size: .8rem;
        }
    </style>
</head>

<body>

    <div class="section-card">
        <h4 id="formTitle">Create New PC</h4>

        <div class="form-row">
            <div class="form-group col-md-4">
                <label>PC Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="txtPcName" placeholder="E.g. Gaming Pro 2024">
            </div>
            <div class="form-group col-md-4">
                <label>Brand <span class="text-danger">*</span></label>
                <select class="form-control" id="slctBrand">
                    <option value="" disabled selected>--- Select a brand ---</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label>Price ($) <span class="text-danger">*</span></label>
                <input type="number" class="form-control" id="txtPrice" placeholder="0.00" min="0" step="0.01">
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-4">
                <label>CPU <span class="text-danger">*</span></label>
                <select class="form-control" id="slctCpu">
                    <option value="" disabled selected>--- Select a CPU ---</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label>Graphics Card <span class="text-danger">*</span></label>
                <select class="form-control" id="slctGraph">
                    <option value="" disabled selected>--- Select a Graphics Card ---</option>
                </select>
            </div>
        </div>

        <hr>

        <div class="form-row align-items-end">
            <div class="form-group col-md-4">
                <label>RAM Memory <span class="text-danger">*</span></label>
                <select class="form-control" id="slctRamOptions">
                    <option value="" disabled selected>--- Select an option ---</option>
                    <option value="1">Choose existing RAM</option>
                    <option value="2">Create new RAM</option>
                </select>
            </div>
            <div class="form-group col-md-3" id="wrapSlctRam" style="display:none;">
                <label>Available RAM</label>
                <select class="form-control" id="slctRam">
                    <option value="" disabled selected>--- Select size ---</option>
                </select>
            </div>
            <div class="form-group col-md-3" id="wrapCreateRam" style="display:none;">
                <label>New Size (GB)</label>
                <input type="number" class="form-control" id="createRam" placeholder="E.g. 32" min="1">
            </div>
            <div class="form-group col-md-2" id="wrapBtnRam" style="display:none;">
                <button class="btn btn-outline-primary btn-block" id="btnAddRam">
                    <i>＋</i> Confirm RAM
                </button>
            </div>
        </div>

        <div class="form-row align-items-end">
            <div class="form-group col-md-3">
                <label>Number of Disks <span class="text-danger">*</span></label>
                <input type="number" class="form-control" id="diskNumber" placeholder="E.g. 2" min="1" max="4">
            </div>
            <div class="form-group col-md-3" id="wrapDiskOptions" style="display:none;">
                <label>Disk Option</label>
                <select class="form-control" id="slctDiskOptions">
                    <option value="" disabled selected>--- Select an option ---</option>
                    <option value="1">Choose existing disk</option>
                    <option value="2">Create new disk</option>
                </select>
            </div>
            <div class="form-group col-md-2" id="wrapSlctDisk" style="display:none;">
                <label>Available Disk</label>
                <select class="form-control" id="slctDisk">
                    <option value="" disabled selected>--- Select disk ---</option>
                </select>
            </div>
            <div class="form-group col-md-2" id="wrapCreateDisk" style="display:none;">
                <label>Capacity (GB)</label>
                <input type="number" class="form-control" id="createDisk" placeholder="E.g. 500" min="1">
            </div>
            <div class="form-group col-md-2" id="wrapBtnDisk" style="display:none;">
                <button class="btn btn-outline-primary btn-block" id="btnAddDisk">
                    <i>＋</i> Add disk
                </button>
            </div>
        </div>

        <h6 class="mt-2 text-muted">PC Preview</h6>
        <div class="table-responsive">
            <table class="table table-bordered preview-table" id="tblNewPC">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>CPU</th>
                        <th>Graphics Card</th>
                        <th>RAM</th>
                        <th>Disk(s)</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="tdName">—</td>
                        <td id="tdBrand">—</td>
                        <td id="tdCpu">—</td>
                        <td id="tdGraph">—</td>
                        <td id="tdRam">—</td>
                        <td id="tdDisk">—</td>
                        <td id="tdPrice">—</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="text-right mt-2">
            <button class="btn btn-secondary mr-2" id="btnCancelEdit" style="display:none;">
                Cancel edit
            </button>
            <button class="btn btn-success px-4" id="btnCreatePC">
                Create PC
            </button>
        </div>
    </div>

    <div class="section-card">
        <h4>Registered PCs</h4>
        <div class="table-responsive">
            <table id="tblPCs" class="table table-striped table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>CPU</th>
                        <th>Graphics Card</th>
                        <th>RAM (GB)</th>
                        <th>Disk(s) (GB)</th>
                        <th>Price</th>
                        <th>Registration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="tblPCsBody"></tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modalDelete" tabindex="-1">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">Delete PC</h5>
                    <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body text-center">
                    <p>Are you sure you want to delete <strong id="modalPcName"></strong>?</p>
                    <small class="text-muted">This action will deactivate the record.</small>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-danger btn-sm" id="btnConfirmDelete">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <script src="<?php echo base_url(); ?>libraries/jquery/jquery.js"></script>
    <script src="<?php echo base_url(); ?>libraries/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo base_url(); ?>libraries/DataTables/datatables.min.js"></script>
    <script src="<?php echo base_url(); ?>libraries/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/productRegister.js"></script>
</body>

</html>