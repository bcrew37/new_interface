(function (Factory) {

    class History {

        constructor() {
            this.Navbar = Factory.getClass("Navbar")
            this.Content = Factory.getClass("Content")

            this.Content.init({
                "/charts": document.querySelector('#templates [data-content="charts"]'),
                "/files": document.querySelector('#templates [data-content="files"]'),
                "/": document.querySelector('#templates [data-content="boards"]'),
                "/clPanel": document.querySelector('#templates [data-content="clPanel"]'),
            })

            this.Navbar.elements["files"].sub(
                () => this.set({ title: "Файли", url: "/files" }),
                () => this.Navbar.elements["files"].active()
            )

            this.Navbar.elements["boards"].sub(
                () => this.set({ title: "Дошки", url: "/" }),
                () => this.Navbar.elements["boards"].active()
            )

            if (history.state == null) {
                this.set({
                    title: "Дошки",
                    url: "/"
                })
            } else this.set(history.state)
        }

        set(data) {
            history.pushState(data, data.title, data.url)
            this.Content.render(data.url)
        }

    }

    Factory.setSingletone("History", History)

})(window.Factory);

