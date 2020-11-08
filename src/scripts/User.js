(function (Factory) {

    class User {

        constructor() {
            this.Cookie = Factory.getClass("Cookie")
            this.Http = Factory.getClass("Http")
        }

        get(callback) {
            let user = JSON.parse(sessionStorage.getItem("User"))
            if (!user) {
                this.Http.get("/myinfo", data => {
                    sessionStorage.setItem("User", JSON.stringify(data)); callback(data)
                })
            } else callback(user)
        }
    }

    Factory.setSingletone("User", User)

})(window.Factory);

