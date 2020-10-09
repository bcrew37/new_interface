(function (Factory) {

    class Data {
        constructor() {
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")
            this.keys = new Map([])

            this.init("/test", "Files")
            this.init("/notifications", "Notifications")
            this.init("/todos", "Todos")
        }

        _setCookie(name, value, options = {}) {
            options = {
                path: '/',
                ...options
            };

            if (options.expires instanceof Date) {
                options.expires = options.expires.toUTCString();
            }

            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }

            document.cookie = updatedCookie;
        }

        _getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        _getData(url, key, resolve) {
            return this.Http.get(url, data => {
                resolve(data)
                this._setCookie(key, url, { "max-age": 1800 })
                sessionStorage.setItem(key, JSON.stringify(data))
            })
        }

        init(url, key) {
            this.keys.set(key, new Promise((resolve, reject) => {
                if (this._getCookie(key)) {
                    if (sessionStorage.getItem(key)) {
                        resolve(JSON.parse(sessionStorage.getItem(key)))
                    } else {
                        this._getData(url, key, resolve)
                    }
                } else {
                    this._getData(url, key, resolve)
                }
            }))
        }

        get(key) {
            return this.keys.get(key)
        }

        update(key) {
            let url = this._getCookie(key)
            return new Promise((resolve, reject) => {
                this._getData(url, key, resolve)
            })
        }

    }

    Factory.setSingletone("Data", Data)

})(window.Factory);



