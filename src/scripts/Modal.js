(function (Factory) {

    class Modal {
        constructor() {
            this.modals = {}
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")

            this.init("newTodo", document.querySelector('[data-modal="newTodo"]'), d => {
                {   // Validation
                    if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                    if (d.length > 1) return this.Alert.render("danger", "Не більше 1 файлу!...")
                }

                const modal = this.modals["newTodo"].node
                const files = modal.querySelector('[data-role="files"]'),
                    submit = modal.querySelector('[data-event="submit"]')

                const deadline = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-deadline"]')), control = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-control"]'))

                files.innerHTML = ""
                d.forEach(node => {
                    let file = node.closest("tr"), fileName = file.querySelector(".name").innerHTML.trim(), fileExt = file.querySelector(".extension").innerHTML.trim()
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

                submit.onclick = () => {
                    const performers = modal.querySelectorAll('[data-role="performers"] .performer'),
                        description = modal.querySelector('[data-role="description"]').innerHTML.trim(),
                        name = modal.querySelector('[data-role="name"]').value.trim()

                    {   // Validation
                        if (description.length > 2024) return this.Alert.render("warning", "Опис не більше 2024 символів")
                        if (performers.length == 0) return this.Alert.render("warning", "Оберіть виконавців")
                        if (name.length == 0 || name.length > 232) return this.Alert.render("warning", "Укажіть назву, або назва більша за 232 символа")
                    }

                    this.Http.post("/test", {
                        description,
                        performers: Array.from(performers, p => p.dataset.performerId),
                        documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId),
                        control: control.getDate(), deadline: deadline.getDate()
                    }, data => this.Alert.render("success", "Задачу створено."), $(modal).modal("hide"))
                }

            });


        }

        render(name, data) {
            this.modals[name].render(data)
        }

        init(name, node, render) {
            this.modals[name] = {
                render: (data) => {
                    $(node).modal("show"); render(data)
                }, node
            }
        }
    }

    Factory.setSingletone("Modal", Modal)

})(window.Factory);

