(function (Factory) {

    class History {

        constructor() {
            this.Navbar = Factory.getClass("Navbar")
            this.Content = Factory.getClass("Content")

            this.Content.init({
                "/charts": document.querySelector('templates [data-content="charts"]'),
                "/files": document.querySelector('templates [data-content="files"]'),
                "/boards": document.querySelector('templates [data-content="boards"]'),
                "/clPanel": document.querySelector('templates [data-content="clPanel"]'),
            })

            this.Navbar.elements["files"].sub(
                () => this.push({ title: "Файли", url: "/files" }),
            )

            this.Navbar.elements["boards"].sub(
                () => this.push({ title: "Дошки", url: "/boards" }),
            )

            this.Navbar.elements["clPanel"].sub(
                () => this.push({ title: "Панель управління", url: "/clPanel" }),
            )

            if (history.state == null) {
                this.set({ title: "Дошки", url: "/boards" })
            } else this.set(history.state)

            window.onpopstate = (e) => {
                if (e.state) {
                    this.set(e.state)
                } else return
            }
        }

        render(data) {
            this.Content.render(data.url)
            this.Navbar.elements[data.url.substring(1)].active()
            document.title = data.title
        }

        push(data) {
            history.pushState(data, data.title, data.url)
            this.render(data)
        }

        set(data) {
            history.replaceState(data, data.title, data.url)
            this.render(data)
        }

    }

    Factory.setSingletone("History", History)

})(window.Factory);

