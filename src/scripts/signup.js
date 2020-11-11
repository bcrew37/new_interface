(function (Factory) {

    class Signup {
        constructor() {
            this.Alert = Factory.getClass("Alert")
            this.Regexp = Factory.getClass("Regexp")
            this.Loader = Factory.getClass("Loader")
            this.Http = Factory.getClass("Http")

            this.SNPField = $("#SNPField")
            this.pass1Field = $("#pass1Field")
            this.pass2Field = $("#pass2Field")
            this.rmme = document.querySelector("#rmme")

            $("#signup").on("click", e => this.signup(e))
        }

        signup(e) {
            e.preventDefault()

            if (this.SNPField.val().length == 0) return this.Alert.render("warning", "Введіть повне ім`я");
            if (this.pass1Field.val().length == 0) return this.Alert.render("warning", "Введіть пароль");
            if (this.pass1Field.val().length < 8) return this.Alert.render("warning", "Пароль має бути не менше ніж 8 символів");
            if (this.pass1Field.val() !== this.pass2Field.val()) return this.Alert.render("warning", "Паролі не співпадають");
            this.Loader.show("infinity")

            this.Http.post("/try", {
                password: this.pass1Field.val(),
                fullname: this.SNPField.val(),
                rememberMe: this.rmme.checked
            }, res => {
                console.log({
                    password: this.pass1Field.val(),
                    fullname: this.SNPField.val(),
                    rememberMe: this.rmme.checked
                })

                this.Loader.hide(() => {
                    if (res.success) {
                        window.location.href = "/"
                    } else this.Alert.render("danger", `Сталася помилка ${res.msg.substr(0, 32)}`)
                })
            })

        }
    }

    Factory.setSingletone("Signup", Signup)

})(window.Factory);
