(function (Factory) {

    class Loader {
        constructor() {
            this.loaders = {}
            this._init("infinity", document.querySelector("progress-bars .indeterminate"))
        }

        show(name) {
            let loader = this.loaders[name]; this.hide()
            loader.classList.add("active")
            $(loader).fadeIn(100)
        }

        hide() {
            let loader = document.querySelector("progress-bars .active")
            if (loader) {
                loader.classList.remove("active"); $(loader).fadeOut(100)
            }
        }

        _init(name, selector) {
            this.loaders[name] = selector
        }
    }

    Factory.setSingletone("Loader", Loader)

})(window.Factory);
