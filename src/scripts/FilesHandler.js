(function (Factory) {

    class FilesHandler {

        constructor() {
            this.Selector = Factory.getClass("Selector", {
                on: (target) => this.select(target),
                off: (target) => this.unselect(target),
                selector: document.querySelectorAll('.body .table-row input[type="checkbox"]')
            })

            this.Modal = Factory.getClass("Modal")
            const d = this.Selector.selected
            this.init("#newTodo", () => this.Modal.render("newTodo", d))
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
            document.querySelector(`${selector}`).addEventListener("click", () => callback())
        }

    }

    Factory.setSingletone("FilesHandler", FilesHandler)

})(window.Factory);

