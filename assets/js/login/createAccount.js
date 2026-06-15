$("#btnCreate").on("click", function () {
    $(".is-invalid").removeClass("is-invalid");
    $(".invalid-feedback").remove();

    var userName = $("#inptUsername").val().trim();
    var email    = $("#inptEmail").val().trim();
    var password = $("#inptPass").val().trim();
    var passConfirm = $("#inptPassConfirm").val().trim();

    var errors = [];

    if (!userName) {
        setError("#inptUsername", "Username is required.");
    } else if (userName.length < 3) {
        setError("#inptUsername", "Minimum 3 characters.");
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        setError("#inptEmail", "Email is required.");
    } else if (!emailRegex.test(email)) {
        setError("#inptEmail", "Invalid email format.");
    }

    if (!password) {
        setError("#inptPass", "Password is required.");
    } else if (password.length < 8) {
        setError("#inptPass", "Minimum 8 characters.");
    }

    if (!passConfirm) {
        setError("#inptPassConfirm", "Please confirm your password.");
    } else if (password !== passConfirm) {
        setError("#inptPassConfirm", "Passwords do not match.");
    }

    if ($(".is-invalid").length > 0) return;

    var $btn = $("#btnCreate");
    $btn.prop("disabled", true).text("Creating...");

    $.ajax({
        url: base_url + "login/UsersSystem/addUser",
        type: "POST",
        dataType: "json",
        data: { userName, email, password },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Account Created!",
                    text: "User registered successfully",
                    timer: 2000,
                    showConfirmButton: false,
                }).then(function () {
                    window.location.href = base_url + "login/Login/index";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.message || "Account creation failed",
                });
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Server error: " + error,
            });
        },
        complete: function () {
            $btn.prop("disabled", false).text("Create account");
        },
    });
});

function setError(selector, message) {
    $(selector)
        .addClass("is-invalid")
        .after('<div class="invalid-feedback">' + message + "</div>");
}