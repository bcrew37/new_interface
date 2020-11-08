
(function (Factory) {

    class Dropdown {
        constructor() {
            document.querySelectorAll(".drop-down").forEach(n => {
                let btn = n.querySelector('[data-event="toggle"]')
                if (btn) {
                    btn.addEventListener("click", (e) => (!n.classList.contains("active")) ? this.open(n) : this.close(n))
                }
                window.addEventListener("click", e => {
                    if (e.target.closest(".drop-down")) { return } else this.close(n)
                })
            })

        }

        open(n) {
            let m = n.querySelector(".drop-down_menu")
            if (m) { m.style.display = "block"; m.style.opacity = 1; }
            n.classList.add("active")
        }

        close(n) {
            let m = n.querySelector(".drop-down_menu")
            if (m) { m.style.opacity = 0; m.style.display = "none"; }
            n.classList.remove("active")
        }

        init(selector, options = {}) {
            selector.querySelectorAll(".drop-down").forEach(n => {
                let btn = n.querySelector('[data-event="toggle"]')

                if (btn) {
                    btn.addEventListener("click", (e) => {
                        if (!n.classList.contains("active")) {
                            if (options.single) {
                                let active = selector.querySelector(".active"); if (active) this.close(active);
                            }; this.open(n)
                        } else this.close(n)

                    })
                }

                window.addEventListener("click", e => {
                    if (e.target.closest(".drop-down")) { return } else this.close(n)
                })
            })

        }
    }

    Factory.setSingletone("Dropdown", Dropdown)

})(window.Factory);

