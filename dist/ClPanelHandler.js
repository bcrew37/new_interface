"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var ClPanel = function () {
        function ClPanel() {
            var _this = this;

            _classCallCheck(this, ClPanel);

            this.Dropdown = Factory.getClass("Dropdown");
            this.Data = Factory.getClass("Data");
            this.Loader = Factory.getClass("Loader");
            this._table = $(".departments");
            this.Lang = Factory.getClass("Lang");
            this.Alert = Factory.getClass("Alert");
            this.Http = Factory.getClass("Http");

            Factory.getClass("Notifications").render(document.querySelector(".tool-bar .notifications"));
            this.Data.get("Performers").then(function (list) {
                return _this.render(list);
            });

            var input = document.querySelector(".create-department__input"),
                btn = document.querySelector(".create-department__button");
            btn.onclick = function () {
                if (input.value.trim().length == 0) return;
                if (input.value.trim().length > 64) return _this.Alert.render("warning", "Назва не більше 64 символів");
                _this.Loader.show("infinity");
                _this.Http.get("/departments/create?name=" + input.value.trim(), function (res) {
                    input.value = "";
                    _this.Loader.hide(function () {
                        if (res.success) {
                            _this.Alert.render("success", "Відділ створено.");
                            _this.Data.update("Performers").then(function (data) {
                                return _this.render(data);
                            });
                        } else _this.Alert.render("danger", "Сталася помилка.");
                    });
                });
            };
        }

        _createClass(ClPanel, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                this._table.html("");

                list.sort(function (a, b) {
                    var nameA = a.department ? a.department.name : a.department,
                        nameB = b.department ? b.department.name : b.department;
                    if (nameA || nameB) {
                        if (nameA > nameB) return 1;
                        if (nameB > nameA) return -1;
                    };return 0;
                });

                var changeRole = function changeRole(e) {
                    var btn = e.target;

                    if (btn.closest('td').querySelector('[data-event="toggle"]').innerText.trim() == btn.innerText.trim()) return;

                    var userId = btn.closest(".department__user").dataset.userId,
                        value = btn.innerText.trim(),
                        role = Object.keys(_this2.Lang.words).find(function (key) {
                        return _this2.Lang.words[key] === value;
                    });

                    btn.style.pointerEvents = "none";
                    _this2.Alert.render("confirm", "Роль буде змінено. Ви впевнені?", {
                        confirm: function confirm() {
                            _this2.Loader.show("infinity");
                            _this2.Http.post("/performers/modify/role", { performerId: userId, role: role }, function (res) {
                                _this2.Loader.hide(function () {
                                    btn.style.pointerEvents = "auto";
                                    console.log({ userId: userId, role: role });
                                    if (res.success) {
                                        _this2.Alert.render("success", "Роль змінено.");
                                        btn.closest('td').querySelector('[data-event="toggle"]').innerText = value;
                                    } else {
                                        _this2.Alert.render("danger", "Сталася помилка.");
                                    }
                                });
                            });
                        },
                        unConfirm: function unConfirm() {
                            btn.style.pointerEvents = "auto";
                        }
                    });
                };

                var changeDep = function changeDep(e) {
                    var btn = e.target;

                    if (btn.closest('td').querySelector('[data-event="toggle"]').innerText.trim() == btn.innerText.trim()) return;

                    var userId = btn.closest(".department__user").dataset.userId,
                        value = btn.dataset.depId;

                    btn.style.pointerEvents = "none";
                    _this2.Alert.render("confirm", "Відділ буде змінено. Ви впевнені?", {
                        confirm: function confirm() {
                            _this2.Loader.show("infinity");
                            _this2.Http.post("/performers/modify/department", { performerId: userId, departmentId: value }, function (res) {
                                btn.style.pointerEvents = "auto";
                                console.log({ performerId: userId, value: value });
                                _this2.Loader.hide(function () {
                                    if (res.success) {
                                        _this2.Alert.render("success", "Відділ змінено.");
                                        _this2.Data.update("Performers").then(function (data) {
                                            return _this2.render(data);
                                        });
                                    } else {
                                        _this2.Alert.render("danger", "Сталася помилка.");
                                    }
                                });
                            });
                        },
                        unConfirm: function unConfirm() {
                            btn.style.pointerEvents = "auto";
                        }
                    });
                };

                var removeUser = function removeUser(e) {
                    var btn = e.target,
                        userId = btn.closest(".department__user").dataset.userId;
                    btn.style.pointerEvents = "none";
                    _this2.Alert.render("confirm", "Користувача буде видалено з системи. Ви впевнені?", {
                        confirm: function confirm() {
                            _this2.Loader.show("infinity");
                            _this2.Http.post("/performers/remove", { performerId: userId }, function (res) {
                                _this2.Loader.hide(function () {
                                    btn.style.pointerEvents = "auto";
                                    console.log({ userId: userId });
                                    if (res.success) {
                                        _this2.Alert.render("success", "Користувача видалено.");
                                        var user = $(btn.closest('tr'));
                                        console.log(user.next(), user.prev());
                                        if (!user.next().hasClass("department__user") && !user.prev().hasClass("department__user")) {
                                            user.before("   \n                                        <tr class=\"department__no-assigned\">\n                                        <td>\n                                             \u041D\u0435\u043C\u0430\u0454 \u0443\u0447\u0430\u0441\u043D\u0438\u043A\u0456\u0432...\n                                         </td>\n                                        </tr>");
                                        }
                                        user.slideDown(400, function () {
                                            return user.remove();
                                        });
                                        _this2.Data.update("Performers");
                                    } else {
                                        _this2.Alert.render("danger", "Сталася помилка.");
                                    }
                                });
                            });
                        },
                        unConfirm: function unConfirm() {
                            btn.style.pointerEvents = "auto";
                        }
                    });
                };

                var removeDep = function removeDep(e) {
                    var depId = e.target.closest('[data-department-id]').dataset.departmentId,
                        btn = e.target;
                    btn.style.pointerEvents = "none";
                    _this2.Alert.render("confirm", "Відділ буде видалено. Ви впевнені?", {
                        confirm: function confirm() {
                            _this2.Loader.show("infinity");
                            _this2.Http.get("/departments/remove?departmentId=" + depId, function (res) {
                                btn.style.pointerEvents = "auto";
                                console.log({ depId: depId });
                                _this2.Loader.hide(function () {
                                    if (res.success) {
                                        _this2.Alert.render("success", "Відділ видалено.");
                                        _this2.Data.update("Performers").then(function (data) {
                                            return _this2.render(data);
                                        });
                                    } else _this2.Alert.render("danger", "Сталася помилка.");
                                });
                            });
                        },
                        unConfirm: function unConfirm() {
                            btn.style.pointerEvents = "auto";
                        }
                    });
                };

                var lastDep = void 0;list.forEach(function (u) {
                    if (u.department) {
                        if (lastDep !== u.department.name) {
                            lastDep = u.department.name;
                            _this2._table.append(" \n                    <tr data-department-id=\"" + u.department.id + "\" class=\"department__name\">\n                        <td>\n                            " + u.department.name + "\n                            <div class=\"drop-down d-inline-block\">\n                                <button data-event=\"toggle\">\n                                    <i class=\"department__management fa fa-ellipsis-h\"></i>\n                                </button>\n                                <div class=\"drop-down_menu\">\n                                    <div class=\"drop-down__list\">\n                                         <div value=\"delete\" class=\"item\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</div>\n                                    </div>\n                                </div>\n                            </div>\n                        </td>\n                        <td>\n                    </tr>");
                            _this2._table[0].querySelector("[data-department-id=\"" + u.department.id + "\"] [value=\"delete\"]").onclick = function (e) {
                                return removeDep(e);
                            };
                        }
                    } else {
                        _this2._table.append(" \n                    <tr class=\"department__name\"><td>\u041D\u0435\u0440\u043E\u0437\u043F\u043E\u0434\u0456\u043B\u0435\u043D\u0456</td><td>\n                    </tr>");
                    }

                    _this2._table.append(" \n                <tr class=\"department__user\" data-user-id=" + u.id + ">\n                <td>\n                    <div class=\"td-wrapper\">\n                        <img data-src=\"" + u.imgPath + "\" alt=\"\">\n                        " + u.name + "\n                    </div>>>\n                </td>\n                <td>" + u.email + "</td>\n                <td>\n                    " + u.registrationDate + "\n                </td>\n                <td>\n                    <div class=\"drop-down\">\n                    <button data-event=\"toggle\">\n                        " + _this2.Lang.get(u.role) + "\n                    </button>\n                    <div class=\"drop-down_menu\">\n                        <div class=\"drop-down__list roleList\">\n                            <div data-value=\"GMANAGER\" class=\"item\">\u0413\u043E\u043B\u043E\u0432\u043D\u0438\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440</div>\n                            <div data-value=\"MANAGER\" class=\"item\">\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440</div>\n                            <div data-value=\"SECRETARY\" class=\"item\">\u0421\u0435\u043A\u0440\u0435\u0442\u0430\u0440</div>\n                            <div data-value=\"PERFORMER\" class=\"item\">\u0412\u0438\u043A\u043E\u043D\u0430\u0432\u0435\u0446\u044C</div>\n                        </div>\n                    </div>\n                </div>\n                </td>\n                <td>\n                    <div class=\"drop-down\">\n                        <button data-event=\"toggle\">\n                            " + (u.department ? u.department.name : "Нерозподілено") + "\n                        </button>\n                        <div class=\"drop-down_menu\">\n                            <div class=\"drop-down__list depList\">\n\n                            </div>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <i class=\"deaprtment__remove-user fa fa-trash\"></i>\n                </td>\n                </tr>");
                    var user = _this2._table[0].querySelector("[data-user-id=\"" + u.id + "\"]");

                    user.querySelector('.deaprtment__remove-user').onclick = function (e) {
                        return removeUser(e);
                    };
                    user.querySelector('[data-value="G_MANAGER"]').onclick = function (e) {
                        return changeRole(e);
                    };
                    user.querySelector('[data-value="MANAGER"]').onclick = function (e) {
                        return changeRole(e);
                    };
                    user.querySelector('[data-value="SECRETARY"]').onclick = function (e) {
                        return changeRole(e);
                    };
                    user.querySelector('[data-value="PERFORMER"]').onclick = function (e) {
                        return changeRole(e);
                    };
                });

                this.Data.update("Departments").then(function (data) {
                    var depList = '';
                    data.forEach(function (d) {
                        var dep = _this2._table[0].querySelector("[data-department-id=\"" + d.id + "\"]");
                        if (!dep) {
                            _this2._table.append(" \n                        <tr data-department-id=\"" + d.id + "\" class=\"department__name\">\n                            <td>\n                                " + d.name + "\n                                <div class=\"drop-down d-inline-block\">\n                                    <button data-event=\"toggle\">\n                                        <i class=\"department__management fa fa-ellipsis-h\"></i>\n                                    </button>\n                                    <div class=\"drop-down_menu\">\n                                        <div class=\"drop-down__list\">\n                                            <div value=\"delete\" class=\"item\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </td>\n                            <td>\n                        </tr>");

                            _this2._table[0].querySelector("[data-department-id=\"" + d.id + "\"] [value=\"delete\"]").onclick = function (e) {
                                return removeDep(e);
                            };

                            _this2._table.append("     \n                        <tr class=\"department__no-assigned\">\n                            <td>\n                                 \u041D\u0435\u043C\u0430\u0454 \u0443\u0447\u0430\u0441\u043D\u0438\u043A\u0456\u0432...\n                             </td>\n                        </tr>");

                            _this2.Dropdown.init(document.querySelector("[data-department-id=\"" + d.id + "\"]"), { single: true });
                        }
                        depList += "<div data-department-id=\"" + d.id + "\" class=\"item\">" + d.name + "</div>";
                    });
                    _this2._table[0].querySelectorAll(".depList").forEach(function (list) {
                        $(list).append(depList);
                        list.querySelectorAll('[data-department-id]').forEach(function (d) {
                            return d.onclick = function (e) {
                                return changeDep(e);
                            };
                        });
                    });
                });

                this.Dropdown.init(document.querySelector(".departments"), { single: true });
                this._table.find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    effectTime: 200,
                    threshold: this._table.scrollHeight,
                    visibleOnly: false,
                    onError: function onError(element) {
                        console.log('error loading ' + element.data('src'));
                    },
                    autoDestroy: true
                });
                this.Loader.hide();
            }
        }]);

        return ClPanel;
    }();

    Factory.setSingletone("ClPanel", ClPanel);
})(window.Factory);