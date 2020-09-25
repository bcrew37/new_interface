(function (Factory) {

    class FilesHandler {

        constructor() {
            this.Selector = Factory.getClass("Selector", {
                selector: '.body .table-row input[type="checkbox"]',
                on: (target) => this.select(target),
                off: (target) => this.unselect(target),
            })

            this.init("#newTodo", (e) => $('[data-modal="newTodo"]').modal("show"))
            this.init("#existTodo", (e) => $('[data-modal="existTodo"]').modal("show"))
            this.init("#shareDoc", (e) => $('[data-modal="shareDoc"]').modal("show"))
            this.init("#uploadDoc", (e) => $('[data-modal="uploadDoc"]').modal("show"))
            this.init("#downloadDoc ", (e) => {

            })
        }

        select(target) {
            target.checked = true
            target.closest(".table-row").classList.add("active")
        }

        unselect(target) {
            target.checked = false
            target.closest(".table-row").classList.remove("active")
        }

        init(selector, callback) {
            document.querySelector(`${selector}`).addEventListener("click", (e) => callback(e))
        }

    }

    Factory.setSingletone("FilesHandler", FilesHandler)

})(window.Factory);

