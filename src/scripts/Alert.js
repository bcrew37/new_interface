(function (Factory) {

    class Alert {
        constructor() {
            this.alerts = {}

            this.init("warning", ".alert-warning")
            this.init("success", ".alert-success")
            this.init("danger", ".alert-danger")
        }

        render(alertClass, msg) {
            this.clear()
            setTimeout(() => {
                let alert = this.alerts[alertClass]
                alert.style.display = "block"
                alert.classList.add("show")
                alert.querySelector("msg").innerHTML = msg
            }, 150)
        }

        init(alertClass, selector) {
            let alert = document.querySelector(`alerts ${selector}`)
            this.alerts[alertClass] = alert
            alert.querySelector(".close").addEventListener("click", () => this.clear())
        }

        clear() {
            let alert = document.querySelector("alerts .show")
            if (alert) {
                alert.classList.remove("show")
                setTimeout(() => alert.style.display = "none", 150)
            }
        }
    }

    Factory.setSingletone("Alert", Alert)

})(window.Factory);

