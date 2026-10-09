// Minimal, self-contained $.notify replacement (jQuery 4 compatible).
// The original notify.js plugin is not jQuery-4 compatible, so $.notify was
// undefined and every successful save/delete threw
// "TypeError: $.notify is not a function". This shows a small transient
// top-center message and throws nothing. Dependency-free (plain DOM).
(function ($) {
    if (!$ || typeof $.notify === "function") { return; }
    $.notify = function (message, options) {
        options = options || {};
        var el = document.createElement("div");
        el.className = "app-notify " + (options.className || "");
        el.setAttribute("role", "alert");
        el.textContent = (message == null) ? "" : String(message);
        el.style.cssText =
            "position:fixed;top:1rem;left:50%;transform:translateX(-50%);" +
            "z-index:2000;padding:.5rem 1rem;border-radius:.25rem;color:#fff;" +
            "background:" + (options.className === "success" ? "#198754" : "#0d6efd") + ";" +
            "box-shadow:0 .25rem .75rem rgba(0,0,0,.2);font-size:.95rem;";
        document.body.appendChild(el);
        setTimeout(function () {
            if (el && el.parentNode) { el.parentNode.removeChild(el); }
        }, 3000);
        return el;
    };
})(window.jQuery);
