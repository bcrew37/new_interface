(function (Factory) {

    class FilesHandler {

        constructor() {
            this.Modal = Factory.getClass("Modal")
            this.Selector = Factory.getClass("Selector", { on: target => this._select(target), off: target => this._unselect(target) })

            this.init("#newTodo", () => this.Modal.render("newTodo", this.Selector.selected))
            this.Data = Factory.getClass("Data")
            this.Data.get("Files").then(data => this.render(data))

            Factory.getClass("Notifications").render(document.querySelector(".tool-bar .notifications"))

            this.init("#existTodo", () => this.Modal.render("existTodo", this.Selector.selected))
        }

        _select(target) {
            target.checked = true
            target.closest(".table-row").classList.add("active")
        }

        _unselect(target) {
            target.checked = false
            target.closest(".table-row").classList.remove("active")
        }

        init(selector, callback) {
            document.querySelector(`${selector}`).addEventListener("click", () => callback())
        }

        _table = document.querySelector(".body tbody")
        render(data = []) {
            this._table.innerHTML = ""
            data.forEach(f => $(this._table).append(`
                <tr class="table-row">
                    <td>
                        <div class="td-wrapper">
                            <img src="./img/docs-img/${f.extName.substr(1)}.png" alt="" />
                            <span class="name">
                               ${f.name}
                            </span>
                            <span class="extension">
                                ${f.extName}
                            </span>
                        </div>
                    </td>
                    <td data-name="date">${f.date}</td>
                    <td data-name="performer">${f.performer}</td>
                    <td data-name="task-count"><a href="">Задачі: ${f.taskCount}</a></td>
                    <td data-name="tools">
                        <div class="td-wrapper">
                            <div class="form-check">
                                <input class="form-check-input position-static" type="checkbox" />
                            </div>
                            <i class="fa fa-cloud-download"></i>
                        </div>
                    </td>
                </tr>`
            ))
            this.Selector.init(document.querySelectorAll('.body .table-row input[type="checkbox"]'))
        }

    }

    Factory.setSingletone("FilesHandler", FilesHandler)

})(window.Factory);

