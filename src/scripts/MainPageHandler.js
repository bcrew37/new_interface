// Navigation scrolling //

(function (Factory) {

    class Nav {
        constructor() {
            $("#scrollTTM").on("click", () => this.scrollTo("#TM"))
            $("#scrollTFM").on("click", () => this.scrollTo("#FM"))
            $("#scrollTCB").on("click", () => this.scrollTo("#CB"))
            $("#scrollTCP").on("click", () => this.scrollTo("#CP"))
            $("#scrollTPL").on("click", () => this.scrollTo("#PL"))
        }

        scrollTo(element) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(element).offset().top - 122
            }, 400);
        }
    }

    Factory.setSingletone("Nav", Nav)

})(window.Factory);

// Authentication //

(function (Factory) {

    class Auth {
        constructor() {
            this.Regexp = Factory.getClass("Regexp")
            this.Http = Factory.getClass("Http")
            this.Loader = Factory.getClass("Loader")
            this.Alert = Factory.getClass("Alert")

            $("#suwf").on("click", e => this.signupWF(e))
            $("#suwg").on("click", e => this.signupWG(e))
            $("#su").on("click", e => this.signup(e))
        }

        signup(e) {
            const efield = $(".signup-form__input").val()

            if (!this.Regexp.email.test(efield)) return;
            sessionStorage.setItem("email", efield)
            e.preventDefault();

            this.Loader.show("infinity")
            this.Http.post("/try", { email: efield }, res => {
                this.Loader.hide(() => {
                    if (res.success) {
                        window.location.href = "/confirm"
                    } else this.Alert.render("danger", `Сталася помилка: ${res.msg.substr(0, 32)}`)
                })
            })

        }

        signupWF(e) {

        }

        signupWG(e) {

        }
    }

    Factory.setSingletone("Auth", Auth)

})(window.Factory);



