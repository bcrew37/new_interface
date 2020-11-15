(function (Factory) {

    class Selector {

        constructor([obj]) {
            this.selected = []

            // Obj: on, off, selector, length
            this.obj = obj
            if (this.obj.selector) {
                this.obj.selector
                    .forEach(node => {
                        node.addEventListener("click", (e) => {
                            let target = $(e.target).parent(this.obj.selector); (!target.hasClass("active")) ? this.on(target[0]) : this.off(target[0])
                        })
                    })
            }
        }

        init(selector) {
            selector
                .forEach(node => {
                    node.addEventListener("click", () => {
                        (!node.classList.contains("active")) ? this.on(node) : this.off(node)
                    })
                })
        }

        clear(callback) {
            this.selected = []
            this.obj.selector
                .forEach(node => {
                    if (node.classList.contains("active")) node.classList.remove("active")
                    callback(node)
                })
        }

        off(target) {
            this.selected = this.selected.filter(node => node !== target)
            target.classList.remove("active")
            if (this.obj.off) this.obj.off(target)
        }

        on(target) {
            if (this.obj.length && this.selected.length > this.obj.length - 1) this.off(this.selected[this.selected.length - 1])
            this.selected.push(target)
            target.classList.add("active")
            if (this.obj.on) this.obj.on(target)
        }

    }

    Factory.setPrototype("Selector", Selector)

})(window.Factory);
