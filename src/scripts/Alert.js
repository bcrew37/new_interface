(function (Factory) {

    class Alert {
        constructor() {
            this.alerts = {}

            this._init("warning", `
            <div style="display: none" class="alert alert-warning alert-dismissible" role="alert">
                <strong></strong>
                <msg></msg>
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> `)
            this._init("success", `
            <div style="display: none" class="alert alert-success alert-dismissible" role="alert">
                <strong>Успішно! </strong>
                <msg></msg>
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
            this._init("danger", `
            <div class="alert alert-danger alert-dismissible" role="alert">
                <strong></strong>
                <msg></msg>
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
            this._init("confirm", `
            <div class="alert alert-primary alert-dismissible" role="alert">
                <strong></strong>
                <msg></msg>
                <button class="text-primary ml-3">
                    Підтвердити
                </button>
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        }

        render(alertClass, msg, obj = {}) {
            let alert = this.alerts[alertClass]
            $("alerts").prepend(alert); alert = document.querySelector("alerts .alert")
            let interval = setTimeout(() => this._close(alert, obj), 7000)
            alert.querySelector(".close").onclick = () => {
                this._close(alert, obj); clearTimeout(interval)
            }
            alert.querySelector("msg").innerHTML = msg; $(alert).slideDown(100)
            if (obj.confirm) {
                let button = alert.querySelector("button")
                if (button) button.onclick = () => {
                    obj.confirm(); alert.classList.add("confirm"); this._close(alert, obj)
                }
            }
        }

        _init(alertClass, template) {
            this.alerts[alertClass] = template
        }

        _close(alert, obj) {
            if (obj.unConfirm && !alert.classList.contains("confirm")) obj.unConfirm()
            $(alert).slideUp(100, () => $(alert).remove())
        }
    }

    Factory.setSingletone("Alert", Alert)

})(window.Factory);

