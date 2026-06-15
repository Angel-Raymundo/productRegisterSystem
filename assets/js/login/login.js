$("#btnLogin").on("click", function (e) {
    e.preventDefault();
    $(".is-invalid").removeClass("is-invalid");
    $(".invalid-feedback").remove();

    var userName = $("#inptUser").val().trim();
    var password = $("#inptPass").val().trim();

    if (!userName) {
        setError("#inptUser", "Username is required.");
    }
    if (!password) {
        setError("#inptPass", "Password is required.");
    }
    if ($(".is-invalid").length > 0) return;

    var $btn = $("#btnLogin");
    $btn.prop("disabled", true).text("Logging in...");

    $.ajax({
        url: base_url + "login/UsersSystem/authenticate",
        type: "POST",
        dataType: "json",
        data: { userName, password },
        success: function (response) {
            if (response.success) {
                window.location.href = response.redirect;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.message || "Login failed.",
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
            $btn.prop("disabled", false).text("Login");
        },
    });
});

function setError(selector, message) {
    $(selector)
        .addClass("is-invalid")
        .after('<div class="invalid-feedback">' + message + "</div>");
}