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
        }

        render(alertClass, msg) {
            let alert = this.alerts[alertClass]
            $("alerts").prepend(alert); alert = document.querySelector("alerts .alert")
            let interval = setTimeout(() => this._close(alert), 5000)
            alert.querySelector(".close").onclick = () => {
                this._close(alert); clearTimeout(interval)
            }
            alert.querySelector("msg").innerHTML = msg; $(alert).slideDown(100)
        }

        _init(alertClass, template) {
            this.alerts[alertClass] = template
        }

        _close(alert) {
            $(alert).slideUp(100, () => $(alert).remove())
        }
    }

    Factory.setSingletone("Alert", Alert)

})(window.Factory);

