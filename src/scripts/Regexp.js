(function (Factory) {

    class Regexp {
        email = /\S+@\S+/
    }

    Factory.setSingletone("Regexp", Regexp)

})(window.Factory);
