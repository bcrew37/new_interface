(function () {

    document.querySelectorAll("[title]").forEach(element => {
        element.setAttribute("data-toggle", "tooltip")
        element.setAttribute("data-placement", "auto")
    })
    $('[data-toggle="tooltip"]').tooltip()

})() 