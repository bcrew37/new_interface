(function (Factory) {

    class Pagination {

        constructor() {
            this.Http = Factory.getClass("Http")
            this.Loader = Factory.getClass("Loader")

            if (!String.prototype.splice) {
                /**
                 * {JSDoc}
                 *
                 * The splice() method changes the content of a string by removing a range of
                 * characters and/or adding new characters.
                 *
                 * @this {String}
                 * @param {number} start Index at which to start changing the string.
                 * @param {number} delCount An integer indicating the number of old chars to remove.
                 * @param {string} newSubStr The String that is spliced in.
                 * @return {string} A new string with the spliced substring.
                 */
                String.prototype.splice = function (start, delCount, newSubStr) {
                    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
                };
            }
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
                let url = formatUrl(path, n);
                this.Http.get(url, data => { Handler.render(data) })
            }

            nextPage.onclick = () => changePage(num + 1)
            previousPage.onclick = () => changePage(num - 1)
            lastPage.onclick = () => changePage(maxpages)
            firstPage.onclick = () => changePage(1)
        }

        formatUrl(url, insertPath) {
            let startIdx = url.indexOf('?');
            if (startIdx < 0) {
                url = url + "/" + insertPath;
            } else {
                url = url.splice(startIdx, 0, "/" + insertPath);
            }
            return url;
        }

        init(selector, path, handler) {
            let url = this.formatUrl(path, "maxpages");
            this.Http.get(url, n => {
                let num = 1,
                    maxpages = n
                this.render(selector, path, num, maxpages, handler)
            })
        }

    }

    Factory.setSingletone("Pagination", Pagination)

})(window.Factory);



