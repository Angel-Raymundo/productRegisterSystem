<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="<?php echo base_url(); ?>libraries/bootstrap/css/bootstrap.min.css">
      <script>
        var base_url = "<?php echo base_url(); ?>";
    </script>
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
            padding: 2rem 1.5rem;
        }
        .login-card .card-header h1 {
            font-weight: 700;
            font-size: 1.8rem;
            margin-bottom: .25rem;
        }
        .login-card .card-header h2 {
            font-size: .95rem;
            font-weight: 300;
            opacity: .9;
        }
        .login-card .card-body {
            padding: 2rem;
        }
        .btn-login {
            background: #0d6efd;
            border: none;
            font-weight: 600;
            letter-spacing: .5px;
        }
        .btn-login:hover {
            background: #0b5ed7;
        }
        .create-link {
            text-decoration: none;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div class="login-card">
                    <div class="card-header">
                        <h1>PC Store</h1>
                        <h2>The PC that you dreamed is waiting for you!</h2>
                    </div>
                    <div class="card-body">
                        <h4 class="text-center mb-4">Login</h4>
                        <form>
                            <div class="form-group">
                                <label for="inptUser">User</label>
                                <input type="text" class="form-control" name="inptUser" id="inptUser" placeholder="Type your Username or email">
                            </div>
                            <div class="form-group">
                                <label for="inptPass">Password</label>
                                <input type="password" class="form-control" name="inptPass" id="inptPass" placeholder="Type your password">
                            </div>
                            <button type="submit" id="btnLogin" class="btn btn-login btn-primary btn-block mt-3">Login</button>
                            <div class="text-center mt-3">
                                <a href="<?php echo site_url('login/CreateAccount/index'); ?>" class="create-link">Create a new account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="<?php echo base_url(); ?>libraries/jquery/jquery.js"></script>
    <script src="<?php echo base_url(); ?>libraries/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo base_url(); ?>libraries/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/login/login.js"></script>
</body>
</html>