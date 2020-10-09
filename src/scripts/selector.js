(function (Factory) {

    class Selector {

        constructor(obj = {}) {
            this.selected = []

            // Obj: on, off, selector, length
            this.obj = obj
            if (this.obj.selector) {
                this.obj.selector
                    .forEach(node => {
                        node.addEventListener("click", (e) => {
                            let target = $(e.target).parent(this.obj.selector); (!target.hasClass("active")) ? this._on(target[0]) : this._off(target[0])
                        })
                    })
            }
        }

        init(selector) {
            selector
                .forEach(node => {
                    node.addEventListener("click", (e) => {
                        let target = $(e.target).parent(selector); (!target.hasClass("active")) ? this._on(target[0]) : this._off(target[0])
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

        _off(target) {
            this.selected = this.selected.filter(node => node !== target)
            target.classList.remove("active")
            if (this.obj.off) this.obj.off(target)
        }

        _on(target) {
            if (this.obj.length && this.selected.length > this.obj.length - 1) this._off(this.selected[this.selected.length - 1])
            this.selected.push(target)
            target.classList.add("active")
            if (this.obj.on) this.obj.on(target)
        }

    }

    Factory.setPrototype("Selector", Selector)

})(window.Factory);
