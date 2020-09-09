// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
showInPopup = (url, title) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            $("#events-modal .modal-body").html(res);
            $("#events-modal .modal-title").html(title);
            $("#events-modal").modal('show');
        }

    })
}

showEvent = (url, title) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            $("#eventModal .modal-body").html(res);
            $("#eventModal .modal-title").html(title);
            $("#eventModal").modal('show');
        }
    })
}



jQueryAjaxPost = form => {
    try {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.isValid) {
                    $("#view-all").html(res.html);
                    $("#events-modal .modal-body").html('');
                    $("#events-modal .modal-title").html('');
                    $("#events-modal").modal('hide');
                    $.notify('submitted successfully', { globalPosition: 'top center', className: 'success' });
                }
                else
                    $("#events-modal .modal-body").html(res.html);
            },
            error: function (err) {
                console.log(err);
            }
        })

    } catch (e) {
        console.log(e);
    }

    //To prevent default form submit
    return false;
}


jQueryAjaxDelete = form => {
    if (confirm('Are you sure you want to delete this?')) {
        try {
            $.ajax({
                type: 'POST',
                url: form.action,
                data: new FormData(form),
                contentType: false,
                processData: false,
                success: function (res) {
                    $("#view-all").html(res.html);
                    $.notify('deleted successfully', { globalPosition: 'top center', className: 'success' });
                },
                error: function (err) {
                    console.log(err);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    //To prevent default form submit
    return false;
}