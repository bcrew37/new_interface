(function (Factory) {

    class Modal {
        constructor() {
            this.modals = {}
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")
            this.Data = Factory.getClass("Data")
            this.Http = Factory.getClass("Http")

            this.init("newTodo", document.querySelector('[data-modal="newTodo"]'),
                d => {
                    if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                    return "done"
                },
                d => {
                    let modal = this.modals["newTodo"].node,
                        name = modal.querySelector('[data-role="name"]'),
                        description = modal.querySelector('[data-role="description"]'),
                        files = modal.querySelector('[data-role="files"]'),
                        performers = modal.querySelector('[data-role="performers"]'),
                        deadline = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-deadline"]')),
                        control = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-control"]')),
                        submit = modal.querySelector('[data-event="submit"]'),
                        pList = [{ name: "Andry", imgPath: "./img/Picture.png", id: "1325110" }]

                    files.innerHTML = ""
                    d.forEach(f => {
                        let file = f.closest("tr"),
                            fileName = file.querySelector(".name").innerHTML.trim(),
                            fileExt = file.querySelector(".extension").innerHTML.trim()

                        $(files).append(`
                        <div class="file" data-file-id="${'1324'}">
                            <img class="img" src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                            <span class="name">
                                ${fileName}
                            </span>
                            <span class="extension"> ${fileExt} </span>
                        </div>`)
                    })

                    submit.onclick = () => {
                        if (description.innerHTML.length > 2024) return this.Alert.render("warning", "Опис не більше 2024 символів")
                        if (performers.querySelectorAll(".performer").length == 0) return this.Alert.render("warning", "Оберіть виконавців")
                        if (name.value.length == 0 || name.length > 232) return this.Alert.render("warning", "Укажіть назву, або назва більша за 232 символа")

                        this.Http.post("/test", {
                            name: name.value.trim(),
                            description: description.innerHTML.trim(),
                            performers: Array.from(performers.querySelectorAll(".performer"), p => p.dataset.performerId),
                            documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId),
                            control: control.getDate(), deadline: deadline.getDate()
                        }, () => this.Alert.render("success", "Задачу створено."), $(modal).modal("hide"))
                    }

                })

            this.init("existTodo", document.querySelector('[data-modal="existTodo"]'),
                d => {
                    if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                    return "done"
                },
                d => {
                    let modal = this.modals["existTodo"].node,
                        files = modal.querySelector('[data-role="files"]'),
                        submit = modal.querySelector('[data-event="submit"]'),
                        todos = modal.querySelector('[data-role="todos"]')

                    files.innerHTML = ""
                    d.forEach(f => {
                        let file = f.closest("tr"),
                            fileName = file.querySelector(".name").innerHTML.trim(),
                            fileExt = file.querySelector(".extension").innerHTML.trim()

                        $(files).append(`
                            <div class="file" data-file-id="${'1324'}">
                                <img class="img" src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                                <span class="name">
                                    ${fileName}
                                </span>
                                <span class="extension"> ${fileExt} </span>
                            </div>`)
                    })

                    this.Data.get("Todos").then(data => {
                        data.list.forEach(t => {

                        })
                    })

                    submit.onclick = () => {
                        this.Http.post("/test", {
                        }, () => this.Alert.render("success", "Файли додані!"), $(modal).modal("hide"))
                    }
                })
        }

        render(name, data) {
            this.modals[name].render(data)
        }

        init(name, node, conditions, render) {
            this.modals[name] = {
                render: (data) => {
                    if (conditions(data) == "done") {
                        $(node).modal("show"); render(data)
                    }
                }, node
            }
        }
    }

    Factory.setSingletone("Modal", Modal)

})(window.Factory);

