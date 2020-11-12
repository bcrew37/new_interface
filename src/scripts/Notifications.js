(function (Factory) {

    class Notifications {
        render(selector) {
            this.selector = selector
            this.Http = Factory.getClass("Http")
            this.Data = Factory.getClass("Data")

            let wrapper = this.selector.querySelector(".notifications-wrapper"),
                list = this.selector.querySelector(".notifications-list"),
                btn = this.selector.querySelector('[data-event="toggle"]')

            this.Data.get("Notifications").then(data => {
                let counter = 0
                let splitData = Factory.getClass("Split").split(data.list, 10)

                const renderNotifications = data => {
                    data.forEach(n => {
                        $(list).append(`
                    <div class="notification"}>
                        <img src="${n.imgPath}" alt="" />
                        <div class="body">
                            <div class="name">
                            ${n.performer}
                            </div>
                            <div class="msg">
                                ${(n.todo) ? `<a data-todo-id="${n.todo.id}" role="button" class="link">${n.todo.name.substr(0, 32)}... -</a>` : ""}
                                "${n.title.substr(0, 256)}..."
                            </div>
                            <div class="meta">${n.date}</div>
                        </div>
                    </div>`)


                        if (n.todo) {
                            list.querySelector(".notification:last-child .link").onclick = e => {
                                Factory.getClass("Modal").render("todoInfo", e.target)
                            }
                        }
                    })
                }

                wrapper.querySelector('[data-event="more"]').onclick = () => {
                    if (splitData[counter + 1]) {
                        counter++; renderNotifications(splitData[counter])
                    }
                }

                renderNotifications(splitData[0])

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

