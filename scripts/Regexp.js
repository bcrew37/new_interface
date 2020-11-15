(function (Factory) {

    class Regexp {
        constructor() {
            this.email = /\S+@\S/
        }
    }

    Factory.setSingletone("Regexp", Regexp)

})(window.Factory);
