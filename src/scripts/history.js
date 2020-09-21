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

            this.Navbar.elements["files"].sub(() => this.set({
                title: "Чарти",
                url: "/files",
            }))
            this.Navbar.elements["boards"].sub(() => this.set({
                title: "Дошки",
                url: "/?boardId=2134",
            }))

            this.set(history.state, location.pathname)
        }

        set(data, url) {
            history.pushState(data, data.title, url)
            this.Content.render(url)
            console.log("URL set to - ", url, history.state)
        }

    }

    Factory.setSingletone("History", History)

})(window.Factory);

