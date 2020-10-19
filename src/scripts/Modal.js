(function (Factory) {

    class Modal {
        constructor() {
            this.modals = {}
            this.Http = Factory.getClass("Http")
            this.Alert = Factory.getClass("Alert")
            this.Data = Factory.getClass("Data")
            this.Split = Factory.getClass("Split")
            this.Loader = Factory.getClass("Loader")
            this.Regexp = Factory.getClass("Regexp")

            this.init("newTodo", document.querySelector('[data-modal="newTodo"]'), d => {
                if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                return "done"
            }, d => {
                // Variables
                let modal = this.modals["newTodo"].node,
                    name = modal.querySelector('[data-role="name"]'),
                    description = modal.querySelector('[data-role="description"]'),
                    files = modal.querySelector('[data-role="files"]'),
                    performers = modal.querySelector('[data-role="performers"]'),
                    deadline = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-deadline"]')),
                    control = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-control"]')),
                    submit = modal.querySelector('[data-event="submit"]'),
                    pList = new Map(), pageNum = 0, pagBtn = modal.querySelector('[data-event="pagination"]')

                // Performers
                pagBtn.style.display = "flex"
                const renderPerformers = (data, clear = true) => {
                    if (clear) performers.innerHTML = ""
                    data.forEach(p => {
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
                        performers.querySelector(`[data-performer-id="${p.id}"] .form-check-input`).onclick = e => {
                            let pId = e.target.closest(".performer").dataset.performerId
                            if (e.target.checked == true) {
                                pList.set(pId, p); pList.get(pId).checked = true
                            } else {
                                pList.get(pId).checked = false; pList.delete(pId)
                            }
                        }
                    }); $(performers).find('[data-src]').Lazy({
                        effect: 'fadeIn',
                        autoDestroy: true,
                        effectTime: 200,
                        threshold: performers.scrollHeight,
                        visibleOnly: false,
                        onError: function (element) {
                            console.log('error loading ' + element.data('src'));
                        }
                    })
                }; this.Data.get("Performers").then(result => {
                    let data = this.Split.split(result, 10); renderPerformers(data[0])
                    let findForm = Factory.getClass("Finder", modal.querySelector(".findPerformer"), result, data[0]);
                    findForm.subscribe((result) => {
                        $(performers).animate({
                            scrollTop: 0
                        }, 100, () => renderPerformers(result))
                        pageNum = 0; if (result == data[0]) {
                            pagBtn.style.display = "flex"
                        } else pagBtn.style.display = "none"
                    });
                    pagBtn.onclick = () => {
                        if (data.length - 1 !== pageNum) {
                            pageNum += 1; renderPerformers(data[pageNum], false);
                            if (data.length - 1 == pageNum) pagBtn.style.display = "none"
                        } else return
                        $(performers).animate({
                            scrollTop: performers.scrollHeight
                        }, 100)
                    }
                })

                // Files    
                files.innerHTML = ""
                d.forEach(f => {
                    let file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim(),
                        fileId = file.dataset.fileId

                    $(files).append(`
                        <div class="file" data-file-id="${fileId}">
                            <img class="img" data-src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                            <span class="name">
                                ${fileName}
                            </span>
                            <span class="extension"> ${fileExt} </span>
                        </div>`)
                }); $(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    autoDestroy: true,
                    effectTime: 200,
                    threshold: files.scrollHeight,
                    visibleOnly: false,
                    onError: function (element) {
                        console.log('error loading ' + element.data('src'));
                    }
                })

                // Confirm
                submit.onclick = () => {
                    if (description.innerHTML.length > 2024) return this.Alert.render("warning", "Опис не більше 2024 символів")
                    if (name.value.length == 0 || name.length > 232) return this.Alert.render("warning", "Укажіть назву, або назва більша за 232 символа")
                    if (pList.size == 0) return this.Alert.render("warning", "Оберіть виконвців...")

                    let performers = []; for (let key of pList.keys()) {
                        performers.push(key); pList.get(key).checked = false; pList.delete(key)
                    }

                    $(modal).modal("hide"); this.Loader.show("infinity")

                    this.Http.post("/test", {
                        name: name.value.trim(),
                        description: description.innerHTML.trim(),
                        performers: performers,
                        documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId),
                        control: control.getDate(), deadline: deadline.getDate()
                    }, () => {

                        this.Loader.hide(); setTimeout(() => {
                            this.Alert.render("success", "Задачу створено.")
                        }, 400)
                        console.log({
                            name: name.value.trim(),
                            description: description.innerHTML.trim(),
                            performers: performers,
                            documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId),
                            control: control.getDate(), deadline: deadline.getDate()
                        })
                        $(modal).modal("hide"); name.value = ""; description.innerHTML = ""
                    })
                }
            })

            this.init("existTodo", document.querySelector('[data-modal="existTodo"]'), d => {
                if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                return "done"
            }, d => {
                let modal = this.modals["existTodo"].node,
                    files = modal.querySelector('[data-role="files"]'),
                    submit = modal.querySelector('[data-event="submit"]'),
                    todos = modal.querySelector('[data-role="todos"]'),
                    tList = new Map(), pageNum = 0, pagBtn = modal.querySelector('[data-event="pagination"]')

                // Todos
                pagBtn.style.display = "flex"
                const renderTodos = (data, clear = true) => {
                    if (clear) todos.innerHTML = ""

                    data.forEach(t => {
                        let status; switch (t.status) {
                            case "inProgress":
                                status = "В процесі"
                                break;
                            case "new":
                                status = "Нове"
                                break;
                            case "overdue":
                                status = "Дедлайн простротечнно"
                                break;
                            case "completed":
                                status = "Завершено"
                                break;
                            default:
                                status = "Не відомий статус"
                                break
                        }

                        $(todos).append(`
                        <div class="todo" data-todo-id="${t.id}">
                            <img data-placement="top" data-toggle="tooltip" title="${t.manager.firstName} ${t.manager.lastName}" data-src="${t.manager.imgPath}" alt="">
                            <div class="body">
                                <div class="name">
                                   ${t.name}
                                </div>
                                <span data-placement="top" data-toggle="tooltip" title="${status}" class="status ${t.status}"></span>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input position-static" type="checkbox" />
                            </div>
                        </div>`)
                        todos.querySelector(`[data-todo-id="${t.id}"] .form-check-input`).onclick = e => {
                            let tId = e.target.closest(".todo").dataset.todoId
                            if (e.target.checked == true) {
                                tList.set(tId, t); tList.get(tId).checked = true
                            } else {
                                tList.get(tId).checked = false; tList.delete(tId)
                            }
                        }
                    })

                    $(todos).find('[data-src]').Lazy({
                        effect: 'fadeIn',
                        autoDestroy: true,
                        effectTime: 200,
                        threshold: todos.scrollHeight,
                        visibleOnly: false,
                        onError: function (element) {
                            console.log('error loading ' + element.data('src'));
                        }
                    })

                    $(todos).find('[data-toggle="tooltip"]').tooltip()
                }; this.Data.get("Todos").then(result => {
                    result = result.list
                    let data = this.Split.split(result, 10); renderTodos(data[0])
                    let findForm = Factory.getClass("Finder", modal.querySelector(".findTodo"), result, data[0]);
                    findForm.subscribe((result) => {
                        $(todos).animate({
                            scrollTop: 0
                        }, 100, () => renderTodos(result))
                        pageNum = 0; if (result == data[0]) {
                            pagBtn.style.display = "flex"
                        } else pagBtn.style.display = "none"
                    });
                    pagBtn.onclick = () => {
                        if (data.length - 1 !== pageNum) {
                            pageNum += 1; renderTodos(data[pageNum], false);
                            if (data.length - 1 == pageNum) pagBtn.style.display = "none"
                        } else return
                        $(todos).animate({
                            scrollTop: todos.scrollHeight
                        }, 100)
                    }
                })

                // Files    
                files.innerHTML = ""
                d.forEach(f => {
                    let file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim(),
                        fileId = file.dataset.fileId

                    $(files).append(`
                            <div class="file" data-file-id="${fileId}">
                                <img class="img" data-src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                                <span class="name">
                                    ${fileName}
                                </span>
                                <span class="extension"> ${fileExt} </span>
                            </div>`)
                }); $(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    autoDestroy: true,
                    effectTime: 200,
                    threshold: files.scrollHeight,
                    visibleOnly: false,
                    onError: function (element) {
                        console.log('error loading ' + element.data('src'));
                    }
                })

                // Confirm
                submit.onclick = () => {
                    if (tList.size == 0) return this.Alert.render("warning", "Оберіть завдання.")

                    let todos = []; for (let key of tList.keys()) {
                        todos.push(key); tList.get(key).checked = false; tList.delete(key)
                    }; $(modal).modal("hide"); this.Loader.show("infinity")

                    this.Http.post("/test", {
                        todos: todos,
                        documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId)
                    }, () => {
                        this.Loader.hide(); setTimeout(() => {
                            this.Alert.render("success", "Файли додано.")
                        }, 400)
                        console.log({
                            todos: todos,
                            documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId)
                        })
                    })
                }
            })

            this.init("uploadFiles", document.querySelector('[data-modal="uploadFiles"]'), () => {
                return "done"
            }, () => {
                let modal = this.modals["uploadFiles"].node,
                    files = modal.querySelector('[data-role="files"]'),
                    form = modal.querySelector('[data-event="uploadFiles"]'),
                    submit = modal.querySelector('[data-event="submit"]'),
                    fList = () => files.querySelectorAll(".file"); let data = new Map(); form.value = ""

                files.innerHTML = ""
                const Alert = this.Alert
                form.onchange = function () {
                    if (this.files.length > 6 || this.files.length > 6 - fList().length) return Alert.render("danger",
                        `${6 - fList().length ? `не більше ніж: ${6 - fList().length} файлів` : `Максимальна кількість файлів!`}`);

                    for (let i = 0; i < this.files.length; i++) {
                        const f = this.files[i]
                        let name = f.name.substr(0, f.name.lastIndexOf("."))
                        if (data.has(encodeURIComponent(name))) {
                            Alert.render("warning", `файл з таким ім'ям: ${name} - вже завантажено`)
                        } else {
                            let ext = f.name.substr(f.name.lastIndexOf("."))

                            $(files).prepend(`
                            <div class="file" data-file-id="${encodeURIComponent(name)}">
                                <img class="img" src="./img/docs-img/${ext.substr(1)}.png" alt="" />
                                <span class="name">
                                    ${encodeURIComponent(name)}
                                </span>
                                <span class="extension"> ${ext} </span>
                                <i data-event="dismiss" class="fas fa-trash"></i>
                            </div>`)

                            files.querySelector('.file [data-event="dismiss"]').onclick = e => {
                                let file = $(files).find(e.target.closest(".file"))

                                file.slideUp(100, () => file.remove())
                                data.delete(encodeURIComponent(name))
                            }

                            data.set(encodeURIComponent(name), f)
                        }

                    }
                    form.value = ""
                }

                // Confirm
                submit.onclick = () => {
                    if (data.size == 0 || data.size > 6) return this.Alert.render("warning", "Оберіть файли")
                    let formData = new FormData()
                    data.forEach(f => formData.append("files", f))
                    $(modal).modal("hide"); this.Loader.show("infinity")

                    this.Http.post("/test", formData, () => {
                        this.Loader.hide(); setTimeout(() => {
                            this.Alert.render("success", "Файли завантажено.")
                        }, 400)
                    }, {
                        headers: {
                            "Content-Type": false,
                            "cache": false,
                            "processData": false,
                        }
                    })
                }
            })

            this.init("shareFiles", document.querySelector('[data-modal="shareFiles"]'), d => {
                if (d.length == 0) return this.Alert.render("warning", "Оберіть файли...")
                if (d.length > 6) return this.Alert.render("warning", "Не більше 6 файлів")
                return "done"
            }, d => {
                let modal = this.modals["shareFiles"].node,
                    files = modal.querySelector('[data-role="files"]'),
                    submit = modal.querySelector('[data-event="submit"]'),
                    msg = modal.querySelector('[data-name="message"]'),
                    email = modal.querySelector('[data-name="email"]')

                files.innerHTML = ""
                d.forEach(f => {
                    let file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim(),
                        fileId = file.dataset.fileId

                    $(files).append(`
                            <div class="file" data-file-id="${fileId}">
                                <img class="img" data-src="./img/docs-img/${fileExt.substr(1)}.png" alt="" />
                                <span class="name">
                                    ${fileName}
                                </span>
                                <span class="extension"> ${fileExt} </span>
                            </div>`)
                }); $(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    autoDestroy: true,
                    effectTime: 200,
                    threshold: files.scrollHeight,
                    visibleOnly: false,
                    onError: function (element) {
                        console.log('error loading ' + element.data('src'));
                    }
                })

                // Confirm
                submit.onclick = () => {
                    if (email.value.trim().length == 0) return this.Alert.render("warning", "Введіть електронну адресу")
                    if (!this.Regexp.email.test(email.value.trim())) return this.Alert.render("warning", "Невірний формат електронної адреси")

                    $(modal).modal("hide"); this.Loader.show("infinity")

                    this.Http.post("/test", {
                        documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId), msg: msg.innerHTML.trim(), email: email.value.trim()
                    }, () => {
                        this.Loader.hide(); setTimeout(() => {
                            this.Alert.render("success", "Файли відправлено.")
                            console.log({ documents: Array.from(files.querySelectorAll(".file"), f => f.dataset.fileId), msg: msg.innerHTML.trim(), email: email.value.trim() })
                        }, 400)
                    }, {
                        headers: {
                            "Content-Type": false,
                            "cache": false,
                            "processData": false,
                        }
                    })
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

