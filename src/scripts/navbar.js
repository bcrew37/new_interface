(function (Factory) {

    class Navbar {

        constructor() {
            this.elements = {}

            this.init({
                charts: document.querySelectorAll('[data-event="charts"]'),
                files: document.querySelectorAll('[data-event="files"]'),
                settigns: document.querySelectorAll('[data-event="settings"]'),
                clPanel: document.querySelectorAll('[data-event="clPanel"]'),
                boards: document.querySelectorAll('[data-event="boards"]'),
                profileImg: document.querySelectorAll('[data-event="profileImg"]'),
            })
        }

        init(obj) {
            for (let key in obj) {
                let constructor = this

                this.elements[key] = { observers: [] }

                this.elements[key].sub = function () {
                    for (let i = 0; i < arguments.length; i++) {
                        let f = arguments[i]
                        constructor.elements[key].observers.push(f)
                    }
                }

                this.elements[key].unsub = function () {
                    for (let i = 0; i < arguments.length; i++) {
                        let f = arguments[i]
                        constructor.elements[key].observers = constructor.elements[key].observers.filter(m => m !== f)
                    }
                }

                this.elements[key].style = (css) => obj[key].forEach(node => {
                    for (let key in css) node.style[key] = css[key]
                })

                obj[key].forEach(node => node.addEventListener("click", () => this.elements[key].observers.forEach(f => f())))
            }
        }
    }

    Factory.setSingletone("Navbar", Navbar)

})(window.Factory);

