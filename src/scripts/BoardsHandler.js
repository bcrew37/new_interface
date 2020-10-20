(function (Factory) {

    class FilesHandler {

        constructor() {
            this.Modal = Factory.getClass("Modal")

            this.init("#newTodo", () => this.Modal.render("newTodo"))

            this.Data = Factory.getClass("Data")
            this.Data.get("Todos").then(data => this.render(data))
            this.Dropdown = Factory.getClass("Dropdown")
            Factory.getClass("Notifications").render(document.querySelector(".tool-bar .notifications"))
        }

        init(selector, callback) {
            document.querySelector(`${selector}`).addEventListener("click", () => callback())
        }

        _table = document.querySelector(".body tbody")
        render(data = []) {
            this._table.innerHTML = ""
            data.forEach(t => {
                let performers = ''; for (let i = 0; i < t.performers.length; i++) {
                    let p = t.performers[i];
                    if (i < 5) performers += `<div data-placement="auto" data-toggle="tooltip" title="${p.firstName} ${p.lastName}" class="performer"><img data-src="${p.imgPath}"/></div>`
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
                    default:
                        status = "Не відомий статус"
                        break
                }; $(this._table).append(`
                <tr class="table-row" data-todo-id="${t.id}">
                    <td>
                        <div class="td-wrapper">
                            <img data-placement="auto" data-toggle="tooltip" title="${t.manager.firstName} ${t.manager.lastName}" data-name="manager" data-src="${t.manager.imgPath}" alt="" />
                            <span class="name">
                               ${t.name}
                            </span>
                        </div>
                    </td>
                    <td data-name="date" class=="control">${t.controlDate}</td>
                    <td data-name="date" class="deadline">           
                        <div class="calendar drop-down">
                            <button data-event="toggle">
                                <span>
                                    <span data-name="selectedDate">00.00.0000</span>
                                    <i class="fa fa-caret-down"></i>
                                </span>
                            </button>
                            <div class="drop-down_menu">
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
                        <div className="status"></div>
                        <span class="status-name">${status}</span>
                    </td>
                    <td>
                        <div data-name="performers">
                            ${performers}
                        </div>
                    </td>
                </tr>`)
                let deadline = Factory.getClass("Datepicker", this._table.querySelector(`[data-todo-id="${t.id}"] .deadline .calendar`), t.deadlineDate, () => {

                })

            }); $(this._table).find('[data-src]').Lazy({
                effect: 'fadeIn',
                effectTime: 200,
                threshold: this._table.scrollHeight,
                visibleOnly: false,
                onError: function (element) {
                    console.log('error loading ' + element.data('src'));
                },
                autoDestroy: true
            })
            this.Dropdown.init(this._table, { single: true })
            $(this._table).find('[data-toggle="tooltip"]').tooltip()
        }

    }

    Factory.setSingletone("FilesHandler", FilesHandler)

})(window.Factory);
