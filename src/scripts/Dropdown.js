(function (Factory) {

    class Dropdown {
        constructor() {
            document.querySelectorAll(".drop-down").forEach(node => {
                let btn = node.querySelector('[data-event="toggle"]')
                if (btn) {
                    btn.addEventListener("click", () => (!node.classList.contains("active")) ? this.open(node) : this.close(node))
                    window.addEventListener("click", (e) => {
                        let target = e.target.closest(".drop-down")
                        if (target) { return } else this.close(node)
                    })
                }
            })
        }

        open(node) {
            let menu = node.querySelector(".drop-down_menu")
            menu.style.display = "block"
            menu.style.opacity = 1
            node.classList.add("active")
        }

        close(node) {
            let menu = node.querySelector(".drop-down_menu")
            menu.style.opacity = 0
            menu.style.display = "none"
            node.classList.remove("active")
        }
    }

    Factory.setSingletone("Dropdown", Dropdown)

})(window.Factory);

