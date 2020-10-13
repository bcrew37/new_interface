(function (Factory) {

    class Modal {
        constructor() {
            this.modals = {}
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")
            this.Data = Factory.getClass("Data")
            this.Http = Factory.getClass("Http")
            this.Split = Factory.getClass("Split")

            this.init("newTodo", document.querySelector('[data-modal="newTodo"]'), d => {
                if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                return "done"
            }, d => {
                let modal = this.modals["newTodo"].node,
                    name = modal.querySelector('[data-role="name"]'),
                    description = modal.querySelector('[data-role="description"]'),
                    files = modal.querySelector('[data-role="files"]'),
                    performers = modal.querySelector('[data-role="performers"]'),
                    deadline = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-deadline"]')),
                    control = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-control"]')),
                    submit = modal.querySelector('[data-event="submit"]'), pList = new Map(), pageNum = 0

                // { --- Performers

                const renderPerformers = data => {
                    performers.innerHTML = ""
                    data.forEach(p => {
                        setTimeout(() => {
                            $(performers).append(`
                            <div class="performer" data-performer-id="${p.id}">
                                <div class="user-block">
                                    <img class="img" data-src="${p.imgPath}" alt="" />
                                    <span class="name">${p.name}</span>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input position-static" type="checkbox" ${p.checked == true ? "checked" : ``}/>
                                </div>
                            </div>`)
                            $(performers).find('[data-src]').Lazy({
                                effect: 'fadeIn',
                                effectTime: 350,
                                visibleOnly: true,
                                onError: function (element) {
                                    console.log('error loading ' + element.data('src'));
                                }
                            })
                            performers.querySelector(`[data-performer-id="${p.id}"] .form-check-input`).onclick = e => {
                                let pId = e.target.closest(".performer").dataset.performerId
                                if (e.target.checked == true) {
                                    pList.set(pId, p); pList.get(pId).checked = true
                                } else {
                                    pList.get(pId).checked = false; pList.delete(pId)
                                }
                            }
                        }, 0)
                    })
                }; this.Data.get("Performers").then(result => {
                    let data = this.Split.split(result, 10)
                    renderPerformers(data[0])
                    let findForm = Factory.getClass("Finder", modal.querySelector(".findPerformer"), result, data[0]);
                    findForm.subscribe(renderPerformers)
                })

                // }
                // { --- Files

                files.innerHTML = ""
                d.forEach(f => {
                    let file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim()

                    $(files).append(`
                        <div class="file" data-file-id="${'1324'}">
                            <img class="img" data-src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                            <span class="name">
                                ${fileName}
                            </span>
                            <span class="extension"> ${fileExt} </span>
                        </div>`)
                }); $(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    effectTime: 350,
                    visibleOnly: true,
                    onError: function (element) {
                        console.log('error loading ' + element.data('src'));
                    }
                })

                // }
                // { --- Confirm

                submit.onclick = () => {
                    if (description.innerHTML.length > 2024) return this.Alert.render("warning", "Опис не більше 2024 символів")
                    if (name.value.length == 0 || name.length > 232) return this.Alert.render("warning", "Укажіть назву, або назва більша за 232 символа")

                    let performers = []; for (let key of pList.keys()) {
                        performers.push(key); pList.get(key).checked = false; pList.delete(key)
                    }
                    if (!performers.length > 0) return this.Alert.render("warning", "Оберіть виконвців...")

                    this.Http.post("/test", {
                        name: name.value.trim(),
                        description: description.innerHTML.trim(),
                        performers: performers,
                        documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId),
                        control: control.getDate(), deadline: deadline.getDate()
                    }, () => {
                        console.log({
                            name: name.value.trim(),
                            description: description.innerHTML.trim(),
                            performers: performers,
                            documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId),
                            control: control.getDate(), deadline: deadline.getDate()
                        })
                        this.Alert.render("success", "Задачу створено.")
                        $(modal).modal("hide"); name.value = ""
                    })
                }

                // }

            })

            this.init("existTodo", document.querySelector('[data-modal="existTodo"]'), d => {
                if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                return "done"
            }, d => {
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
                        <img class="img" data-src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                        <span class="name">
                            ${fileName}
                        </span>
                        <span class="extension"> ${fileExt} </span>
                    </div>`)

                }); $(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    effectTime: 350,
                    visibleOnly: true,
                    onError: function (element) {
                        console.log('error loading ' + element.data('src'));
                    }
                })

                this.Data.get("Todos").then(data => {
                    console.log(this.Split.split(data.list, 10))
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
                    if (conditions(data) == "done") $(node).modal("show"); setTimeout(() => render(data), 200)
                }, node
            }
        }
    }

    Factory.setSingletone("Modal", Modal)

})(window.Factory);

