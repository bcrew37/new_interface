(function (Factory) {
    class Content {

        constructor() {
            this.templates = {}
            this.content = document.getElementById("root")
            this.Loader = Factory.getClass("Loader")
        }

        render(url) {
            this.content.style.opacity = 0
            this.Loader.show("infinity")
            let template = this.templates[url].content.cloneNode(true)
            setTimeout(() => {
                this.content.innerHTML = ""
                this.content.append(template)
                this.content.style.opacity = 1
            }, 100)
        }

        init(obj) {
            for (let url in obj) {
                this.templates[url] = obj[url]
            }
        }

    }

    Factory.setSingletone("Content", Content)

})(window.Factory);

