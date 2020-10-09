(function (Factory) {

    class Observer {

        constructor() {
            this.observers = {}
        }

        subscribe(key, f) {
            let observers = this.observers[key]
            if (observers) { this.observers[key].push(f) } else this.observers[key] = [f]
        }

        unsubscribe(key, rf) {
            let observers = this.observers[key]
            if (observers) observers = observers.filter(ef => ef !== rf)
        }

        broadcast(key, data) {
            let observers = this.observers[key]
            if (observers) observers.forEach(f => f(data));
        }

    }

    Factory.setPrototype("Observer", Observer)

})(window.Factory) 