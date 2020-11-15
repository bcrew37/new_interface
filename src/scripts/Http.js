(function (Factory) {

    class Http {
        constructor() {
            this.Alert = Factory.getClass("Alert")
        }

        get(url, callback) {
            (async () => {
                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    })

                    if (response.ok) {
                        const result = await response.json()
                        console.log(result)
                        callback(result)
                    } else console.error("Not al ok...")
                } catch (error) {
                    console.error(error)
                }
            })()
        }

        post(url, body, callback, options = {}) {
            console.log(body)
                (async () => {
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            body: JSON.stringify(body),
                            ...options
                        })

                        if (response.ok) {
                            const result = await response.json()
                            if (callback) callback(result)
                        } else console.error("Not al ok...")
                    } catch (error) {
                        throw console.error("Oops! " + error)
                    }
                })()
        }
    }

    Factory.setSingletone("Http", Http)

})(window.Factory);

