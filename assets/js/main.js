/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
    var $window = $(window),
        $body = $("body"),
        $sidebar = $("#sidebar");

    // Breakpoints.
    breakpoints({
        xlarge: ["1281px", "1680px"],
        large: ["981px", "1280px"],
        medium: ["737px", "980px"],
        small: ["481px", "736px"],
        xsmall: [null, "480px"],
    });

    // Hack: Enable IE flexbox workarounds.
    if (browser.name == "ie") $body.addClass("is-ie");

    // Play initial animations on page load.
    $window.on("load", function () {
        window.setTimeout(function () {
            $body.removeClass("is-preload");
        }, 100);
    });

    // Forms.

    // Hack: Activate non-input submits.
    $("form").on("click", ".submit", function (event) {
        // Stop propagation, default.
        event.stopPropagation();
        event.preventDefault();

        // Submit form.
        $(this).parents("form").submit();
    });

    // Sidebar.
    if ($sidebar.length > 0) {
        var $sidebar_a = $sidebar.find("a");

        $sidebar_a
            .addClass("scrolly")
            .on("click", function () {
                var $this = $(this);

                // External link? Bail.
                if ($this.attr("href").charAt(0) != "#") return;

                // Deactivate all links.
                $sidebar_a.removeClass("active");

                // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                $this.addClass("active").addClass("active-locked");
            })
            .each(function () {
                var $this = $(this),
                    id = $this.attr("href"),
                    $section = $(id);

                // No section for this link? Bail.
                if ($section.length < 1) return;

                // Scrollex.
                $section.scrollex({
                    mode: "middle",
                    top: "-20vh",
                    bottom: "-20vh",
                    initialize: function () {
                        // Deactivate section.
                        $section.addClass("inactive");
                    },
                    enter: function () {
                        // Activate section.
                        $section.removeClass("inactive");

                        // No locked links? Deactivate all links and activate this section's one.
                        if ($sidebar_a.filter(".active-locked").length == 0) {
                            $sidebar_a.removeClass("active");
                            $this.addClass("active");
                        }

                        // Otherwise, if this section's link is the one that's locked, unlock it.
                        else if ($this.hasClass("active-locked"))
                            $this.removeClass("active-locked");
                    },
                });
            });
    }

    // Scrolly.
    $(".scrolly").scrolly({
        speed: 1000,
        offset: function () {
            // If <=large, >small, and sidebar is present, use its height as the offset.
            if (
                breakpoints.active("<=large") &&
                !breakpoints.active("<=small") &&
                $sidebar.length > 0
            )
                return $sidebar.height();

            return 0;
        },
    });

    // Spotlights.
    $(".spotlights > section")
        .scrollex({
            mode: "middle",
            top: "-10vh",
            bottom: "-10vh",
            initialize: function () {
                // Deactivate section.
                $(this).addClass("inactive");
            },
            enter: function () {
                // Activate section.
                $(this).removeClass("inactive");
            },
        })
        .each(function () {
            var $this = $(this),
                $image = $this.find(".image"),
                $img = $image.find("img"),
                x;

            // Assign image.
            $image.css("background-image", "url(" + $img.attr("src") + ")");

            // Set background position.
            if ((x = $img.data("position")))
                $image.css("background-position", x);

            // Hide <img>.
            $img.hide();
        });

    // Features.
    $(".features").scrollex({
        mode: "middle",
        top: "-20vh",
        bottom: "-20vh",
        initialize: function () {
            // Deactivate section.
            $(this).addClass("inactive");
        },
        enter: function () {
            // Activate section.
            $(this).removeClass("inactive");
        },
    });
})(jQuery);

$(function () {
    $(".js-check-all").on("click", function () {
        if ($(this).prop("checked")) {
            $('th input[type="checkbox"]').each(function () {
                $(this).prop("checked", true);
                $(this).closest("tr").addClass("active");
            });
        } else {
            $('th input[type="checkbox"]').each(function () {
                $(this).prop("checked", false);
                $(this).closest("tr").removeClass("active");
            });
        }
    });

    $('th[scope="row"] input[type="checkbox"]').on("click", function () {
        if ($(this).closest("tr").hasClass("active")) {
            $(this).closest("tr").removeClass("active");
        } else {
            $(this).closest("tr").addClass("active");
        }
    });
});

// Función para generar un número aleatorio entre min y max
function getRandomPercentage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para asignar valores aleatorios a las barras de progreso y valores de porcentaje
function asignarValoresAleatorios() {
    const barrasDeProgreso = document.querySelectorAll(".skill-per");

    barrasDeProgreso.forEach((barra) => {
        const porcentaje = getRandomPercentage(0, 100);
        barra.style.width = porcentaje + "%";

        // Define los colores según los rangos especificados
        let color = "";
        if (porcentaje >= 0 && porcentaje < 20) {
            color = "rgb(231, 135, 1)";
        } else if (porcentaje >= 20 && porcentaje < 40) {
            color = "rgb(255 197 0)";
        } else if (porcentaje >= 40 && porcentaje < 60) {
            color = "rgb(254 255 0)";
        } else if (porcentaje >= 60 && porcentaje < 80) {
            color = "rgb(160 255 0)";
        } else {
            color = "rgb(0 209 33)";
        }

        barra.style.backgroundColor = color;

        // Actualiza el valor de porcentaje visible
        const contenedor = barra.parentElement;
        const porcentajeElement = contenedor.querySelector(".tooltipsg");
        porcentajeElement.textContent = porcentaje + "%";
    });
}

// Llamar a la función para asignar valores aleatorios al cargar la página
asignarValoresAleatorios();

// Paso a paso registro
var current_fs, next_fs, previous_fs;
var animating;

$(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.hide();

    animating = false;
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    $("#progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");

    previous_fs.show();
    current_fs.hide();

    animating = false;
});

// validaciones campos
document.addEventListener("DOMContentLoaded", function () {
    var nextButton1 = document.getElementById("next1");
    var nextButton2 = document.getElementById("next2");
    var submitButton = document.querySelector("button.button-save");

    nextButton1.disabled = true;
    nextButton1.style.opacity = 0.5;
    nextButton2.disabled = true;
    nextButton2.style.opacity = 0.5;
    submitButton.disabled = true;
    submitButton.style.opacity = 0.5;

    var fieldset1 = document.getElementById("fieldset1");
    var fieldset2 = document.getElementById("fieldset2");
    var fieldset3 = document.getElementById("fieldset3");

    fieldset1.addEventListener("input", function () {
        var isComplete = validateFieldset(fieldset1);
        nextButton1.disabled = !isComplete;
        nextButton1.style.opacity = isComplete ? 1 : 0.5;
    });

    fieldset2.addEventListener("input", function () {
        var isComplete = validateFieldset(fieldset2);
        nextButton2.disabled = !isComplete;
        nextButton2.style.opacity = isComplete ? 1 : 0.5;
    });

    fieldset3.addEventListener("input", function () {
        var isComplete = validateFieldset(fieldset3);
        submitButton.disabled = !isComplete;
        submitButton.style.opacity = isComplete ? 1 : 0.5;
    });

    function validateFieldset(fieldset) {
        var inputs = fieldset.querySelectorAll(
            "input[required], select[required]"
        );
        var isComplete = true;

        inputs.forEach(function (input) {
            var isValid = input.checkValidity(); // Verificar validez del campo según el patrón

            if (input.value.trim() === "" || !isValid) {
                isComplete = false;
            }
        });

        return isComplete;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var btnSave = document.getElementById("btnsave");
    var linkInsideButton = btnSave.querySelector("a");

    if (btnSave && linkInsideButton) {
        btnSave.addEventListener("click", function (event) {
            event.preventDefault(); // Prevenir la acción predeterminada del botón
            window.location.href = linkInsideButton.getAttribute("href");
        });
    }
});
