(function (Factory) {

    class Observer {

        constructor() {
            this.observers = []
        }

        subscribe(f) {
            this.observers.push(f)
        }

        unsubscribe(f) {
            this.observers = this.observers.filter(cf => cf !== f1)
        }

        broadcast(data) {
            this.observers.forEach(f => f(data));
        }

    }

    Factory.setPrototype("Observer", Observer)

})(window.Factory) 