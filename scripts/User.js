(function (Factory) {

    class User {

        constructor() {
            this.Data = Factory.getClass("Data")
            this.userList = new Map()
            this.Data.get("Performers").then(data => {
                data.forEach(u => {
                    setTimeout(() => {
                        this.userList.set(u.id, u)
                    }, 0)
                })
            })
        }

        get(id) {
            return this.userList.get(id)
        }

    }

    Factory.setSingletone("User", User)

})(window.Factory);



