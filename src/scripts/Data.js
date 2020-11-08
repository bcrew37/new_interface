(function (Factory) {

    class Data {
        constructor() {
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")
            this.Cookie = Factory.getClass("Cookie")

            this.keys = new Map([])

            this.init({
                "/test": "Files",
                "/notifications?list=1": "Notifications",
                "/todos": "Todos",
                "/pList": "Performers",
                "/departments": "Departments",
                "/enterprises": "Enterprises"
            })
        }

        init(obj) {
            for (let path in obj) {
                let key = obj[path],
                    cookie = this.Cookie.get(key)

                this.keys.set(key, new Promise((resolve, reject) => {
                    let data = sessionStorage.getItem(key)
                    if (data && cookie) {
                        resolve(JSON.parse(data))
                    } else {
                        this.Http.get(path, data => {
                            this.Cookie.set(key, path, { "max-age": 600 })
                            sessionStorage.setItem(key, JSON.stringify(data))
                            resolve(data)
                        })
                    }
                }))

            }
        }

        get(key) {
            return this.keys.get(key)
        }

        update(key) {
            let path = this.Cookie.get(key)
            return new Promise((resolve, reject) => {
                this.Http.get(path, data => {
                    this.Cookie.set(key, path, { "max-age": 900 })
                    sessionStorage.setItem(key, JSON.stringify(data))
                    resolve(data)
                })
            })
        }

    }

    Factory.setSingletone("Data", Data)

})(window.Factory);



