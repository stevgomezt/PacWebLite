// Iconos valido e invalido
document.addEventListener("DOMContentLoaded", function () {
    var inputs = document.querySelectorAll("input[required], select[required]");

    inputs.forEach(function (input) {
        var icon = input.parentNode.querySelector(".icons-form");
        var validationMessage = input.parentNode.querySelector(
            ".validation-message"
        );

        input.addEventListener("input", function () {
            updateIcon(this, icon);
            updateValidationMessage(this, validationMessage);
        });
    });

    function updateIcon(input, icon) {
        if (input.value.trim() === "") {
            icon.className = "icons-form fa-solid fa-circle-exclamation";
            icon.textContent = "";
            input.classList.remove("valid");
        } else if (input.checkValidity()) {
            icon.className = "icons-form valid fa-solid fa-check";
            icon.textContent = "";
            input.classList.add("valid");
        } else {
            icon.className = "icons-form fa-solid fa-circle-exclamation";
            icon.textContent = "";
            input.classList.remove("valid");
        }
    }

    function updateValidationMessage(input, validationMessage) {
        if (!input.checkValidity()) {
            validationMessage.textContent = input.validationMessage;
        } else {
            validationMessage.textContent = "";
        }
    }
});

{
    /* <i class="fa-solid fa-circle-exclamation"></i> */
}
