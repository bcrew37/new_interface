(function (window) {

    class Factory {

        constructor() {
            this.classes = new Map([])
        }

        setPrototype(className, classConstructor) {
            this.classes.set(className, (args) => new classConstructor(args))
        }

        setSingletone(className, classConstructor) {
            this.classes.set(className, new classConstructor)
        }

        getClass = (className, ...args) => {
            let constructor = this.classes.get(className)
            if (typeof constructor == "function") {
                return constructor(...args)
            } else return constructor || console.error(`Oops! not possible to read class: ${className}`)
        }

    }

    window.Factory = new Factory()
})(window)

