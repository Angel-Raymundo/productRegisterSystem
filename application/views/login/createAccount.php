<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account</title>
    <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/bootstrap/css/bootstrap.min.css">
    <style>
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            font-family: 'Segoe UI', sans-serif;
        }
        .login-card {
            background: #ffffff;
            border-radius: 1rem;
            box-shadow: 0 1rem 3rem rgba(0,0,0,.3);
            overflow: hidden;
        }
        .login-card .card-header {
            background: #0d6efd;
            color: #fff;
            text-align: center;
            padding: 1.5rem;
            position: relative;
        }
        .login-card .card-header h1 {
            font-weight: 700;
            font-size: 1.5rem;
            margin: 0;
        }
        .back-link {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
            font-size: 1.3rem;
            text-decoration: none;
        }
        .back-link:hover {
            color: #e0e0e0;
        }
        .login-card .card-body {
            padding: 2rem;
        }
        .btn-create {
            background: #0d6efd;
            border: none;
            font-weight: 600;
            letter-spacing: .5px;
        }
        .btn-create:hover {
            background: #0b5ed7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div class="login-card">
                    <div class="card-header">
                        <a href="<?php echo site_url('login/Login/index'); ?>" class="back-link">&larr;</a>
                        <h1>Create a new Account</h1>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="inptUsername">Username</label>
                                <input type="text" class="form-control" name="inptUsername" id="inptUsername" placeholder="Type your Username">
                            </div>
                            <div class="form-group">
                                <label for="inptEmail">Email</label>
                                <input type="text" class="form-control" name="inptEmail" id="inptEmail" placeholder="Type your email">
                            </div>
                            <div class="form-group">
                                <label for="inptPass">Password</label>
                                <input type="password" class="form-control" name="inptPass" id="inptPass" placeholder="Type your password">
                            </div>
                            <div class="form-group">
                                <label for="inptPassConfirm">Confirm Password</label>
                                <input type="password" class="form-control" name="inptPassConfirm" id="inptPassConfirm" placeholder="Type your password again">
                            </div>
                            <button type="submit" id="btnCreate" class="btn btn-create btn-primary btn-block mt-3">Create account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>