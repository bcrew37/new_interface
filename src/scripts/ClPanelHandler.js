(function (Factory) {
    const Loader = Factory.getClass("Loader");
    Loader.hide()

    class ClPanel {

        constructor() {
            this.Dropdown = Factory.getClass("Dropdown")
            this.Dropdown.init(document.querySelector(".departments"))
        }

    }

    Factory.setSingletone("ClPanel", ClPanel)

})(window.Factory);

