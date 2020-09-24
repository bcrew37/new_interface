(function (Factory) {

    class FilesHandler {

        constructor() {
            this.Selector = Factory.getClass("Selector", {
                selector: ".body .table-row",
                on: (target) => this.select(target),
                off: (target) => this.unselect(target),
                length: 4
            })
        }

        select(target) {
            target.style.background = "green"
        }

        unselect(target) {
            target.setAttribute("style", "")
            console.log(this.Selector.selected)
        }

    }

    Factory.setSingletone("FilesHandler", FilesHandler)

})(window.Factory);

