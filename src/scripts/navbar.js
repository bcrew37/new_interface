(function (Factory) {

    class Navbar {

        constructor() {
            this.elements = {}

            this.init({
                "charts": document.querySelectorAll('[data-event="charts"]'),
                "files": document.querySelectorAll('[data-event="files"]'),
                "settigns": document.querySelectorAll('[data-event="settings"]'),
                'clPanel': document.querySelectorAll('[data-event="clPanel"]'),
                "boards": document.querySelectorAll('[data-event="boards"]'),
                "profileImg": document.querySelectorAll('[data-event="profileImg"]'),
                "econfig": document.querySelectorAll('[data-event="enterpriseCongfig"]'),
                "uconfig": document.querySelectorAll('[data-event="userConfig"]'),
            })

            this.elements["profileImg"].sub(() => {
                $(".modals #upload-docs").modal("show")
            })
        }

        init(obj) {
            for (let key in obj) {
                this.elements[key] = { observers: [] }

                let sub = function () {
                    for (let i = 0; i < arguments.length; i++) {
                        let f = arguments[i]
                        this.elements[key].observers.push(f)
                    }
                }.bind(this)

                this.elements[key].sub = sub;

                let unsub = function () {
                    for (let i = 0; i < arguments.length; i++) {
                        let f = arguments[i]
                        this.elements[key].observers = constructor
                            .elements[key]
                            .observers
                            .filter(m => m !== f)
                    }
                }.bind(this);

                this.elements[key].unsub = unsub;

                this.elements[key].style = function (css) {
                    this[key].forEach(node => {
                        for (let key in css) {
                            node.style[key] = css[key]
                        }
                    })
                }.bind(obj)

                this.elements[key].active = () => obj[key].forEach(node => {
                    let activeNode = node.closest(".nav-rail").querySelector(".active")
                    if (activeNode) {
                        activeNode.classList.remove("active")
                        node.classList.add("active")
                    } else {
                        node.classList.add("active")
                    }
                })

                obj[key].forEach(
                    node => {
                        node.addEventListener(
                            "click",
                            () => this.elements[key]
                                .observers
                                .forEach(f => f())
                        )
                    }
                )
            }
        }
    }

    Factory.setSingletone("Navbar", Navbar)

})(window.Factory);

