(function (Factory) {

    class Selector {

        constructor(obj) {
            this.selected = []
            // Obj: selector, on, off, length

            this.obj = obj
            document.querySelectorAll(`${this.obj.selector}`)
                .forEach(node => node.addEventListener("click",
                    (e) => {
                        let target = e.target.closest(this.obj.selector);
                        (!target.classList.contains("active")) ? this.on(target) : this.off(target)
                    }))
        }

        clear(callback) {
            this.selected = []
            document.querySelectorAll(`${this.obj.selector}`)
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
            if (this.selected.length > this.obj.length - 1) this.off(this.selected[this.selected.length - 1])
            this.selected.push(target)
            target.classList.add("active")
            if (this.obj.on) this.obj.on(target)
        }

    }

    Factory.setPrototype("Selector", Selector)

})(window.Factory);
