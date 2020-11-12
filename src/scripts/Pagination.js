(function (Factory) {

    class Pagination {

        constructor() {
            this.Http = Factory.getClass("Http")
            this.Loader = Factory.getClass("Loader")
        }

        render(selector, path, num, maxpages, handler) {
            let container = document.querySelector(selector),
                cpage = container.querySelector(".current-page"),
                nextPage = container.querySelector(".next-page"),
                previousPage = container.querySelector(".previous-page"),
                firstPage = container.querySelector(".first-page"),
                lastPage = container.querySelector(".last-page"),
                Handler = Factory.getClass(handler)

            cpage.innerHTML = num

            const changePage = n => {
                if (n > maxpages || n < 1) return
                if (parseInt(cpage.innerText) == n) return
                num = n; cpage.innerHTML = n
                this.Loader.show("infinity")
                this.Http.get(`${path}/${n}`, data => { Handler.render(data) })
            }

            nextPage.onclick = () => changePage(num + 1)
            previousPage.onclick = () => changePage(num - 1)
            lastPage.onclick = () => changePage(maxpages)
            firstPage.onclick = () => changePage(1)
        }

        init(selector, path, handler) {
            this.Http.get(`${path}/maxpages`, n => {
                let num = 1,
                    maxpages = 5
                this.render(selector, path, num, maxpages, handler)
            })
        }

    }

    Factory.setSingletone("Pagination", Pagination)

})(window.Factory);



