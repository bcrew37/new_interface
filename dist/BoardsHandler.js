"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var BoardsHandler = function () {
        function BoardsHandler() {
            var _this = this;

            _classCallCheck(this, BoardsHandler);

            this.Modal = Factory.getClass("Modal");

            this.Data = Factory.getClass("Data");
            this.Loader = Factory.getClass("Loader");
            this.Http = Factory.getClass("Http");
            this.Dropdown = Factory.getClass("Dropdown");
            this.Alert = Factory.getClass("Alert");
            this._table = document.querySelector(".body tbody");

            this.init("#newTodo", function () {
                return _this.Modal.render("newTodo");
            });
            this.Data.get("Todos").then(function (data) {
                return _this.render(data);
            });

            Factory.getClass("Pagination").init(".pagination", "/task/list", "BoardsHandler");
            Factory.getClass("Notifications").render(document.querySelector(".tool-bar .notifications"));

            this.Data.get("Departments").then(function (data) {
                var list = document.querySelector("#departmentsList");
                data.forEach(function (d) {
                    $(list).prepend("\n                        <button class=\"dropdown-item\" href=\"#\">" + d.name + "</button>\n                    ");list.querySelector(".dropdown-item").onclick = function () {
                        _this.Loader.show("infinity");
                        list.closest(".dropdown").querySelector("#selected-option").innerHTML = d.name;
                        _this.Http.get("/task/list/1?depId=" + d.id, function (data) {
                            return _this.render(data);
                        });
                        Factory.getClass("Pagination").init(".pagination", "/task/list?depId=" + d.id, "BoardsHandler");
                    };
                });
                list.querySelector('[data-event="alldeps"]').onclick = function () {
                    _this.Loader.show("infinity");
                    list.closest(".dropdown").querySelector("#selected-option").innerHTML = "Усі";
                    _this.Data.get("Todos").then(function (data) {
                        return _this.render(data);
                    });
                    Factory.getClass("Pagination").init(".pagination", "/task/list", "BoardsHandler");
                };
            });

            var filterByStatus = function filterByStatus(status) {
                _this.Http.get("/task/list" + (status ? "/" + status : ""), function (data) {
                    return _this.render(data);
                });
                Factory.getClass("Pagination").init(".pagination", "/task/list" + (status ? "/" + status : ""), "BoardsHandler");
            };

            var statusFilter = this._table.closest(".body").querySelector("thead #boardFilterByStatus");
            statusFilter.querySelector('[value="new"]').onclick = function () {
                return filterByStatus("NEW");
            };
            statusFilter.querySelector('[value="inProgress"]').onclick = function () {
                return filterByStatus("INPROGRESS");
            };
            statusFilter.querySelector('[value="ovedue"]').onclick = function () {
                return filterByStatus("OVERDUE");
            };
            statusFilter.querySelector('[value="completed"]').onclick = function () {
                return filterByStatus("COMPLETED");
            };
            statusFilter.querySelector('[value="onhold"]').onclick = function () {
                return filterByStatus("ONHOLD");
            };
            statusFilter.querySelector('[value="all"]').onclick = function () {
                return filterByStatus();
            };
        }

        _createClass(BoardsHandler, [{
            key: "init",
            value: function init(selector, callback) {
                document.querySelector("" + selector).addEventListener("click", function () {
                    return callback();
                });
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                this._table.innerHTML = "";
                data.forEach(function (t) {
                    var performers = '';for (var i = 0; i < t.performerIds.length; i++) {
                        var p = Factory.getClass("User").get(t.performerIds[i]);

                        if (i < 5) performerIds += "<div data-placement=\"auto\" data-toggle=\"tooltip\" title=\"" + p.name + "\" class=\"performer\"><img data-src=\"" + p.imgPath + "\"/></div>";
                        if (i == t.performerIds.length - 1 && i > 5) performers += "<span class=\"ml-3\">" + (t.performerIds.length - 5) + " + </span>";
                    };var status = Factory.getClass("Lang").get(status);

                    var manager = Factory.getClass("User").get(t.ownerId);
                    $(_this2._table).append("\n                <tr class=\"table-row todo\" data-todo-id=\"" + t.id + "\">\n                    <td>\n                        <div class=\"td-wrapper\">\n                            <img data-placement=\"auto\" data-toggle=\"tooltip\" title=\"" + manager.name + "\" data-name=\"manager\" data-src=\"" + manager.imgPath + "\" alt=\"\" />\n                            <button title=\"\u043D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0434\u043B\u044F \u0431\u0456\u043B\u044C\u0448 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0457 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u0457\" class=\"name\">\n                               " + t.name + "\n                            </button>\n                        </div>\n                    </td>\n                    <td data-name=\"date\" class=\"control\">\n                        <div class=\"calendar drop-down\">\n                            <button data-event=\"toggle\">\n                                <span>\n                                    <span data-name=\"selectedDate\">00.00.0000</span>\n                                </span>\n                            </button>\n                            <div style=\"display:none\" class=\"drop-down_menu\">\n                                <div class=\"control w-100 d-flex justify-content-between align-items-center\"\n                                    style=\"padding: 12px\">\n                                    <i class=\"fa fa-caret-left\" data-event=\"previous\"></i>\n                                    <div class=\"d-flex\">\n                                        <span data-name=\"pickerMonth\" class=\"mr-1\">\u041A\u0432\u0456\u0442\u0435\u043D\u044C</span>\n                                        <span data-name=\"pickerYear\" class=\"ml-1\">2020</span>\n                                    </div>\n                                    <i class=\"fa fa-caret-right\" data-event=\"next\"></i>\n                                </div>\n                                <table class=\"date-picker\" valign=\"center\">\n                                    <thead>\n                                        <tr>\n                                            <td class=\"week-day\">\n                                                <div>\u041F\u043D</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0412\u0442</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0421\u0440</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0427\u0442</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u041F\u0442</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0421\u0431</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u041D\u0434</div>\n                                            </td>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <td>\n                                                <div class=\"date-item active\">1</div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </td>\n                    <td data-name=\"date\" class=\"deadline\">           \n                        <div class=\"calendar drop-down\">\n                            <button data-event=\"toggle\">\n                                <span>\n                                    <span data-name=\"selectedDate\">00.00.0000</span>\n                                </span>\n                            </button>\n                            <div style=\"display:none\" class=\"drop-down_menu\">\n                                <div class=\"control w-100 d-flex justify-content-between align-items-center\"\n                                    style=\"padding: 12px\">\n                                    <i class=\"fa fa-caret-left\" data-event=\"previous\"></i>\n                                    <div class=\"d-flex\">\n                                        <span data-name=\"pickerMonth\" class=\"mr-1\">\u041A\u0432\u0456\u0442\u0435\u043D\u044C</span>\n                                        <span data-name=\"pickerYear\" class=\"ml-1\">2020</span>\n                                    </div>\n                                    <i class=\"fa fa-caret-right\" data-event=\"next\"></i>\n                                </div>\n                                <table class=\"date-picker\" valign=\"center\">\n                                    <thead>\n                                        <tr>\n                                            <td class=\"week-day\">\n                                                <div>\u041F\u043D</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0412\u0442</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0421\u0440</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0427\u0442</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u041F\u0442</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u0421\u0431</div>\n                                            </td>\n                                            <td class=\"week-day\">\n                                                <div>\u041D\u0434</div>\n                                            </td>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <td>\n                                                <div class=\"date-item active\">1</div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </td>\n                    <td data-name=\"status\">\n                        <div class=\"status " + t.status + "\"></div>\n                        <span class=\"status-name\">" + status + "</span>\n                    </td>\n                    <td>\n                        <div data-name=\"performers\">\n                            " + performers + "\n                        </div>\n                    </td>\n                </tr>");
                    var deadline = Factory.getClass("Datepicker", _this2._table.querySelector("[data-todo-id=\"" + t.id + "\"] .deadline .calendar"), t.deadlineDate, function (target) {
                        _this2.Alert.render("confirm", "Дату дедлайну буде змінено. Ви впевнені?", {
                            confirm: function confirm() {
                                _this2.Loader.show("infinity");
                                _this2.Http.post("/task/modify/deadline", { date: deadline.getDate(), taskId: t.id }, function (res) {
                                    _this2.Loader.hide(function () {
                                        console.log({ date: deadline.getDate() });
                                        if (res.success) {
                                            _this2.Alert.render("success", "Дату змінено.");
                                        } else {
                                            _this2.Alert.render("danger", "Сталася помилка." + res.msg.substr(0, 32) + "...");
                                            deadline.set(t.deadlineDate);
                                        }
                                    });
                                });
                            },
                            unConfirm: function unConfirm() {
                                deadline.set(t.deadlineDate);
                            }

                        });
                    });
                    var control = Factory.getClass("Datepicker", _this2._table.querySelector("[data-todo-id=\"" + t.id + "\"] .control .calendar"), t.controlDate, function (target) {
                        _this2.Alert.render("confirm", "Дату контролю буде змінено. Ви впевнені?", {
                            confirm: function confirm() {
                                _this2.Loader.show("infinity");
                                _this2.Http.post("/task/modify/control", { date: control.getDate(), taskId: t.id }, function (res) {
                                    _this2.Loader.hide(function () {
                                        console.log({ date: control.getDate() });
                                        if (res.success) {
                                            _this2.Alert.render("success", "Дату змінено.");
                                        } else {
                                            _this2.Alert.render("danger", "Сталася помилка." + res.msg.substr(0, 32) + "...");
                                            control.set(t.controlDate);
                                        }
                                    });
                                });
                            },
                            unConfirm: function unConfirm() {
                                control.set(t.controlDate);
                            }

                        });
                    });
                    _this2._table.querySelector("[data-todo-id=\"" + t.id + "\"] .td-wrapper .name").onclick = function (e) {
                        _this2.Modal.render("todoInfo", e.target.closest(".todo"));
                    };
                });$(this._table).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    effectTime: 200,
                    threshold: this._table.scrollHeight,
                    visibleOnly: false,
                    onError: function onError(element) {
                        console.log('error loading ' + element.data('src'));
                    },
                    autoDestroy: true
                });
                this.Data.get("User").then(function (user) {
                    if (user.role == "MANAGER" || user.role == "G_MANAGER" || user.role == "ADMIN") _this2.Dropdown.init(_this2._table.closest(".body"), { single: true });
                });
                $(this._table).find('[data-toggle="tooltip"]').tooltip();
                this.Loader.hide();
            }
        }]);

        return BoardsHandler;
    }();

    Factory.setSingletone("BoardsHandler", BoardsHandler);
})(window.Factory);