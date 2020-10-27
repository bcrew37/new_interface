(function (Factory) {

    class Data {
        constructor() {
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")
            this.keys = new Map([])
            this.paths = {}

            this.init({
                "/test": "Files",
                "/notifications?list=1": "Notifications",
                "/todos": "Todos",
                "/pList": "Performers"
            })
        }

        // _setCookie(name, value, options = {}) {
        //     options = {
        //         path: '/',
        //         ...options
        //     };

        //     if (options.expires instanceof Date) {
        //         options.expires = options.expires.toUTCString();
        //     }

        //     let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        //     for (let optionKey in options) {
        //         updatedCookie += "; " + optionKey;
        //         let optionValue = options[optionKey];
        //         if (optionValue !== true) {
        //             updatedCookie += "=" + optionValue;
        //         }
        //     }

        //     document.cookie = updatedCookie;
        // }

        // _getCookie(name) {
        //     let matches = document.cookie.match(new RegExp(
        //         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        //     ));
        //     return matches ? decodeURIComponent(matches[1]) : undefined;
        // }

        // _getData(url, key, resolve) {
        //     return this.Http.get(url, data => {
        //         resolve(data)
        //         this._setCookie(key, url, { "max-age": 1800 })
        //         sessionStorage.setItem(key, JSON.stringify(data))
        //     })
        // }

        init(obj) {
            for (let key in obj) {
                let val = obj[key]
                this.paths[val] = key
                this.keys.set(val, new Promise((resolve, reject) => {
                    this.Http.get(key, data => {
                        resolve(data)
                    })
                }))
            }
        }

        get(key) {
            return this.keys.get(key)
        }

        update(key) {
            return new Promise((resolve, reject) => {
                this.Http.get(this.paths[key], data => resolve(data))
            })
        }

    }

    Factory.setSingletone("Data", Data)

})(window.Factory);



