(function (Factory) {

    class Notifications {
        render(selector) {
            this.selector = selector
            this.Http = Factory.getClass("Http")
            this.Data = Factory.getClass("Data")

            let wrapper = this.selector.querySelector(".notifications-wrapper"),
                list = this.selector.querySelector(".notifications-list"),
                btn = this.selector.querySelector('[data-event="toggle"]')

            list.innerHtml = ""
            this.Data.get("Notifications").then(data => {
                data.list.forEach(n => $(list).append(`
                <div class="notification">
                    <img src="${n.imgPath}" alt="" />
                    <div class="body">
                        <div class="name">
                           ${n.performer}
                        </div>
                        <div class="msg">
                            ${(n.task) ? `<a role="button" class="link">${n.task.name.slice(0, 16)}... -</a>` : ""}
                            "${n.title.slice(0, 256)}..."
                        </div>
                        <div class="meta">${n.date}</div>
                    </div>
                </div>`))
                if (data.numOfNew) this.selector.dataset.amount = data.numOfNew
            })

            btn.addEventListener("click", () => (wrapper.classList.contains("active")) ? this._close(wrapper) : this._open(wrapper))
            window.addEventListener("click", e => {
                if (e.target.closest(".notifications")) { return } else this._close(wrapper)
            })
        }

        _open(target) {
            $(target).fadeIn(100)
            target.classList.add("active")
            if (this.selector.dataset.amount) {
                this.selector.removeAttribute("data-amount")
                this.Http.post("/test", { read: true })
                this.Data.get("Notifications").then(data => {
                    data.numOfNew = 0
                    sessionStorage.setItem("Notifications", JSON.stringify(data))
                })
            }
        }

        _close(target) {
            $(target).fadeOut(100)
            target.classList.remove("active")
        }
    }

    Factory.setPrototype("Notifications", Notifications)


})(window.Factory);

