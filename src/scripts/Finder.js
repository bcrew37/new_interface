(function (Factory) {

    class Finder extends Factory.getClass("Observer -g") {
        constructor([selector, data]) {
            super()
            this.Http = Factory.getClass("Http")
            this.fieldFind = selector.querySelector('[data-name="field"]')
            this.lastVal

            selector.onsubmit = e => {
                e.preventDefault()
                let val = this.fieldFind.value.trim().toLowerCase(),
                    response = []

                if (this.lastVal == "" && val == "" || this.lastVal == val) return
                this.lastVal = val
                data.forEach(k => {
                    if (k.name.trim().toLowerCase().indexOf(val) !== -1) response.push(k)
                }); this.broadcast(response)

                this.fieldFind.value = ""

            }
        }
    }

    Factory.setPrototype("Finder", Finder)

})(window.Factory);

