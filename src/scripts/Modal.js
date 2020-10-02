(function (Factory) {

    class Modal {
        constructor() {
            this.modals = {}
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")

            this.init("newTodo", document.querySelector('[data-modal="newTodo"]'), data => {
                const modal = this.modals["newTodo"].node
                let files = modal.querySelector('[data-role="files"]'),
                    submit = modal.querySelector('[data-event="submit"]')

                // files
                files.innerHTML = ""
                data.forEach(node => {
                    let file = node.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim()

                    $(files).append(`
                    <div class="file" data-file-id="211441">
                        <img class="img" src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                        <span class="name">
                            ${fileName}
                        </span>
                        <span class="extension"> ${fileExt} </span>
                        <span data-event="dismiss"><i class="fa fa-trash"></i></span>
                    </div>`)
                })

                // date picker
                let deadline = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-deadline"]')),
                    control = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-control"]'))

                // submit
                submit.onclick = () => {
                    let performers = modal.querySelectorAll('[data-role="performers"] .performer'),
                        description = modal.querySelector('[data-role="description"]').innerHTML.trim(),
                        name = modal.querySelector('[data-role="name"]').value.trim()

                    if (description.length > 2024) return this.Alert.render("warning", "Опис не більше 2024 символів")
                    if (performers.length == 0) return this.Alert.render("warning", "Оберіть виконавців")
                    if (name.length == 0 || name.length > 232) return this.Alert.render("warning", "Укажіть назву, або назва більша за 232 символа")

                    this.Http.post("/test", {
                        description,
                        performers: performers.map(p => p.dataset.performerId)
                    }, (data) => {
                        this.Alert.render("success", "Задачу створено."), $(modal).modal("hide")
                        console.log(performers)
                    })
                }

            });

        }

        render(modalName, data) {
            if (data.length == 0) return this.Alert.render("warning", "Оберіть файли...")
            if (data.length > 1) return this.Alert.render("danger", "Не більше 1 файлу!...")
            this.modals[modalName].render(data)
        }

        init(modalName, selector, render) {
            this.modals[modalName] = {
                render: (data) => {
                    $(selector).modal("show")
                    render(data)
                },
                node: selector
            }
        }
    }

    Factory.setSingletone("Modal", Modal)

})(window.Factory);

