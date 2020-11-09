(function (Factory) {
    const Loader = Factory.getClass("Loader");

    class BoardsHandler {

        constructor() {
            this.Modal = Factory.getClass("Modal")

            this.Data = Factory.getClass("Data")
            this.Loader = Factory.getClass("Loader")
            this.Http = Factory.getClass("Http")
            this.Dropdown = Factory.getClass("Dropdown")
            this.Alert = Factory.getClass("Alert")
            this._table = document.querySelector(".body tbody")

            this.init("#newTodo", () => this.Modal.render("newTodo"))
            this.Data.get("Todos").then(data => this.render(data))

            Factory.getClass("Pagination").init(".pagination", "/todos", "BoardsHandler")
            Factory.getClass("Notifications").render(document.querySelector(".tool-bar .notifications"))

            this.Data.get("Departments").then(data => {
                let list = document.querySelector("#departmentsList")
                data.forEach(d => {
                    $(list).prepend(`
                        <button class="dropdown-item" href="#">${d.name}</button>
                    `); list.querySelector(".dropdown-item").onclick = () => {
                        this.Loader.show("infinity")
                        list.closest(".dropdown").querySelector("#selected-option").innerHTML = d.name
                        this.Http.get(`/todos/${d.id}`, data => this.render(data))
                    }
                })
                list.querySelector('[data-event="alldeps"]').onclick = () => {
                    this.Loader.show("infinity")
                    list.closest(".dropdown").querySelector("#selected-option").innerHTML = "Усі"
                    this.Data.get("Todos").then(data => this.render(data))
                }
            })

            const filterByStatus = (status = '') => {
                this.Http.get(`/todos/${status}`, data => this.render(data))
            }

            let statusFilter = this._table.closest(".body").querySelector("thead #boardFilterByStatus")
            statusFilter.querySelector('[value="new"]').onclick = () => filterByStatus("new")
            statusFilter.querySelector('[value="inProgress"]').onclick = () => filterByStatus("inProgress")
            statusFilter.querySelector('[value="ovedue"]').onclick = () => filterByStatus("overdue")
            statusFilter.querySelector('[value="completed"]').onclick = () => filterByStatus("completed")
            statusFilter.querySelector('[value="onhold"]').onclick = () => filterByStatus("onhold")
            statusFilter.querySelector('[value="all"]').onclick = () => filterByStatus()
        }

        init(selector, callback) {
            document.querySelector(`${selector}`).addEventListener("click", () => callback())
        }

        render(data = []) {
            this._table.innerHTML = ""
            data.forEach(t => {
                let performers = ''; for (let i = 0; i < t.performers.length; i++) {
                    let p = t.performers[i];
                    if (i < 5) performers += `<div data-placement="auto" data-toggle="tooltip" title="${p.name}" class="performer"><img data-src="${p.imgPath}"/></div>`
                    if (i == t.performers.length - 1 && i > 5) performers += `<span class="ml-3">${t.performers.length - 5} + </span>`
                }; let status; switch (t.status) {
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
                    case "onhold":
                        status = "Відкладено"
                        break;
                    default:
                        status = "Не відомий статус"
                        break
                }; $(this._table).append(`
                <tr class="table-row todo" data-todo-id="${t.id}">
                    <td>
                        <div class="td-wrapper">
                            <img data-placement="auto" data-toggle="tooltip" title="${t.manager.name}" data-name="manager" data-src="${t.manager.imgPath}" alt="" />
                            <button title="натисніть для більш детальної інформації" class="name">
                               ${t.name}
                            </button>
                        </div>
                    </td>
                    <td data-name="date" class="control">
                        <div class="calendar drop-down">
                            <button data-event="toggle">
                                <span>
                                    <span data-name="selectedDate">00.00.0000</span>
                                </span>
                            </button>
                            <div style="display:none" class="drop-down_menu">
                                <div class="control w-100 d-flex justify-content-between align-items-center"
                                    style="padding: 12px">
                                    <i class="fa fa-caret-left" data-event="previous"></i>
                                    <div class="d-flex">
                                        <span data-name="pickerMonth" class="mr-1">Квітень</span>
                                        <span data-name="pickerYear" class="ml-1">2020</span>
                                    </div>
                                    <i class="fa fa-caret-right" data-event="next"></i>
                                </div>
                                <table class="date-picker" valign="center">
                                    <thead>
                                        <tr>
                                            <td class="week-day">
                                                <div>Пн</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Вт</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Ср</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Чт</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Пт</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Сб</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Нд</div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="date-item active">1</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td data-name="date" class="deadline">           
                        <div class="calendar drop-down">
                            <button data-event="toggle">
                                <span>
                                    <span data-name="selectedDate">00.00.0000</span>
                                </span>
                            </button>
                            <div style="display:none" class="drop-down_menu">
                                <div class="control w-100 d-flex justify-content-between align-items-center"
                                    style="padding: 12px">
                                    <i class="fa fa-caret-left" data-event="previous"></i>
                                    <div class="d-flex">
                                        <span data-name="pickerMonth" class="mr-1">Квітень</span>
                                        <span data-name="pickerYear" class="ml-1">2020</span>
                                    </div>
                                    <i class="fa fa-caret-right" data-event="next"></i>
                                </div>
                                <table class="date-picker" valign="center">
                                    <thead>
                                        <tr>
                                            <td class="week-day">
                                                <div>Пн</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Вт</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Ср</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Чт</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Пт</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Сб</div>
                                            </td>
                                            <td class="week-day">
                                                <div>Нд</div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="date-item active">1</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td data-name="status">
                        <div class="status ${t.status}"></div>
                        <span class="status-name">${status}</span>
                    </td>
                    <td>
                        <div data-name="performers">
                            ${performers}
                        </div>
                    </td>
                </tr>`)
                let deadline = Factory.getClass("Datepicker", this._table.querySelector(`[data-todo-id="${t.id}"] .deadline .calendar`), t.deadlineDate, target => {
                    this.Alert.render("confirm", "Дату дедлайну буде змінено. Ви впевнені?", {
                        confirm: () => {
                            this.Loader.show("infinity")
                            this.Http.post("/try", { date: deadline.getDate() }, res => {
                                this.Loader.hide(() => {
                                    console.log({ date: deadline.getDate() })
                                    if (res.success) {
                                        this.Alert.render("success", "Дату змінено.")
                                    } else {
                                        this.Alert.render("danger", "Сталася помилка.")
                                        deadline.set(t.deadlineDate)
                                    }
                                })
                            })
                        },
                        unConfirm: () => {
                            deadline.set(t.deadlineDate)
                        }

                    })
                })
                let control = Factory.getClass("Datepicker", this._table.querySelector(`[data-todo-id="${t.id}"] .control .calendar`), t.controlDate, target => {
                    this.Alert.render("confirm", "Дату контролю буде змінено. Ви впевнені?", {
                        confirm: () => {
                            this.Loader.show("infinity")
                            this.Http.post("/try", { date: control.getDate() }, res => {
                                this.Loader.hide(() => {
                                    console.log({ date: control.getDate() })
                                    if (res.success) {
                                        this.Alert.render("success", "Дату змінено.")
                                    } else {
                                        this.Alert.render("danger", "Сталася помилка.")
                                        control.set(t.controlDate)
                                    }
                                })
                            })
                        },
                        unConfirm: () => {
                            control.set(t.controlDate)
                        }

                    })
                })
                this._table.querySelector(`[data-todo-id="${t.id}"] .td-wrapper .name`).onclick = e => {
                    this.Modal.render("todoInfo", e.target.closest(".todo"))
                }

            }); $(this._table).find('[data-src]').Lazy({
                effect: 'fadeIn',
                effectTime: 200,
                threshold: this._table.scrollHeight,
                visibleOnly: false,
                onError: function (element) {
                    console.log('error loading ' + element.data('src'));
                },
                autoDestroy: true,
                onFinishedAll: () => {
                    Loader.hide()
                }
            });
            this.Dropdown.init(this._table.closest(".body"), { single: true })
            $(this._table).find('[data-toggle="tooltip"]').tooltip()
        }

    }

    Factory.setSingletone("BoardsHandler", BoardsHandler)

})(window.Factory);

