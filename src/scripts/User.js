(function (Factory) {

    class User {

        constructor() {
            this.Cookie = Factory.getClass("Cookie")
            this.Http = Factory.getClass("Http")
        }

        get(callback) {
            let user = this.Cookie.get("User");
            if (!user) {
                this.Http.get("/myinfo", data => {
                    this.Cookie.set("User", JSON.stringify(data), { "max-age": 1800 }); callback(data)
                })
            } else callback(user)
        }
    }

    Factory.setSingletone("User", User)

})(window.Factory);

