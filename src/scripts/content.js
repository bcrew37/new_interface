(function (Factory) {

    class Content {

        constructor() {
            this.templates = {}
            this.content = document.getElementById("root")
        }

        render(url) {
            this.content.style.opacity = 0
            let template = this.templates[url].content.cloneNode(true)
            setTimeout(() => {
                this.content.innerHTML = ""
                this.content.append(template)
                this.content.style.opacity = 1
            }, 200)
        }

        init(obj) {
            for (let url in obj) {
                this.templates[url] = obj[url]
            }
        }

    }

    Factory.setSingletone("Content", Content)

})(window.Factory);

