(function (Factory) {

    class Selector {

        constructor(obj) {
            this.selected = []
            // Obj: block, selectors, callback, clearFunction

            this.obj = obj
            document.querySelector(`${obj.block} ${obj.selectors}`)
                .forEach(node => node.addEventListener("click",
                    (e) => {
                        let target = e.target.closest(obj.selectors)
                        this.selected.push(target)
                        if (obj.callbak) obj.callback(target)
                    }))
        }

        clear() {
            this.selected = []
            document.querySelector(`${this.obj.block} ${this.obj.selectors}`)
                .forEach(node => node.addEventListener("click",
                    (e) => {
                        let target = e.target.closest(this.obj.selectors)
                        target.setAttribute("style", "")
                        if (this.obj.clearFunction) this.obj.clearFunction(target)
                    }))
        }

    }

    Factory.setPrototype("Selector", Selector)

})(window.Factory);
